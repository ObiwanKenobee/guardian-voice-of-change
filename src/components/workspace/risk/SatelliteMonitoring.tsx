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
  riskLevel: "high" | "medium" | "low";
  description: string;
  timestamp: string;
}

export const SatelliteMonitoring = () => {
  const [riskZones, setRiskZones] = useState<RiskZone[]>([
    {
      id: "1",
      location: "Region A",
      riskLevel: "high",
      description: "Deforestation activity detected",
      timestamp: new Date().toISOString(),
    },
    {
      id: "2",
      location: "Region B",
      riskLevel: "medium",
      description: "Unusual industrial activity",
      timestamp: new Date().toISOString(),
    },
  ]);

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

  useEffect(() => {
    // Subscribe to real-time risk zone updates
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
          toast({
            title: "New Risk Zone Detected",
            description: `${payload.new.location}: ${payload.new.description}`,
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

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
                <Badge className={getRiskLevelColor(zone.riskLevel)}>
                  {zone.riskLevel.toUpperCase()}
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