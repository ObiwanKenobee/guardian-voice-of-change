
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Map as RiskMap } from "@/components/workspace/Map";
import { AlertTriangle, Map } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface RiskZone {
  id: string;
  location: string;
  risk_level: "high" | "medium" | "low";
  description: string;
  timestamp: string;
}

export const SatelliteMonitoring = () => {
  const [riskZones, setRiskZones] = useState<RiskZone[]>([]);

  useEffect(() => {
    // Initial fetch of risk zones
    const fetchRiskZones = async () => {
      const { data, error } = await supabase
        .from('risk_zones')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching risk zones:', error);
        toast.error("Failed to fetch risk zones");
        return;
      }

      setRiskZones(data);
    };

    fetchRiskZones();

    // Subscribe to real-time risk zone updates with secure options
    const channel = supabase
      .channel('risk-zones')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'risk_zones'
        },
        (payload) => {
          setRiskZones(current => [...current, payload.new as RiskZone]);
          toast.success("New Risk Zone Detected", {
            description: `${payload.new.location}: ${payload.new.description}`
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Map className="h-5 w-5" />
            Satellite Monitoring
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] rounded-lg overflow-hidden">
            <RiskMap />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {riskZones.map((zone) => (
          <Card key={zone.id} className="bg-white">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h4 className="font-medium">{zone.location}</h4>
                  <p className="text-sm text-muted-foreground">
                    {zone.description}
                  </p>
                </div>
                <Badge className={getRiskLevelColor(zone.risk_level)}>
                  {zone.risk_level.toUpperCase()}
                </Badge>
              </div>
              <div className="mt-4 flex items-center text-sm text-muted-foreground">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Detected {new Date(zone.timestamp).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
