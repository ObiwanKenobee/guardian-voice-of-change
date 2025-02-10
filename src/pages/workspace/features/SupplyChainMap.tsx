import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Map, Shield, AlertTriangle, Factory, Boxes, Network } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FeatureLayout } from "@/components/workspace/features/FeatureLayout";
import { SupplyChainMapView } from "@/components/workspace/supply-chain/SupplyChainMapView";
import { SupplyChainControls } from "@/components/workspace/supply-chain/SupplyChainControls";
import { EnterpriseSystemsList } from "@/components/workspace/enterprise/EnterpriseSystemsList";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

type RiskZone = Database["public"]["Tables"]["risk_zones"]["Row"];

interface RiskAlertDisplay {
  id: string;
  title: string;
  risk_level: string;
  location: { lat: number; lng: number };
  description: string;
}

const SupplyChainMap = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("map");

  const { data: riskZones, isLoading: alertsLoading } = useQuery({
    queryKey: ['risk-alerts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('risk_zones')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (error) throw error;
      return data as RiskZone[];
    }
  });

  // Transform risk zones into the display format
  const riskAlerts: RiskAlertDisplay[] = riskZones?.map(zone => ({
    id: zone.id,
    title: `Risk Alert: ${zone.location}`, // Create a title from location
    risk_level: zone.risk_level,
    location: typeof zone.coordinates === 'object' ? zone.coordinates as { lat: number; lng: number } : { lat: 0, lng: 0 },
    description: zone.description
  })) || [];

  return (
    <FeatureLayout
      icon={Map}
      title="Supply Chain Mapping"
      description="Real-time supply chain visualization with blockchain verification and AI-driven analytics"
    >
      <div className="space-y-6 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Key Metrics */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Suppliers Tracked</CardTitle>
              <Factory className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">342</div>
              <p className="text-xs text-muted-foreground">Across 27 countries</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Routes</CardTitle>
              <Network className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs text-muted-foreground">98% on schedule</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94.2%</div>
              <p className="text-xs text-muted-foreground">+2.1% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Risk Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{alertsLoading ? "..." : riskAlerts?.length || 0}</div>
              <p className="text-xs text-muted-foreground">Active alerts requiring attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
          {/* Map and Controls */}
          <div className="lg:col-span-2 space-y-4">
            <SupplyChainControls />
            <Card>
              <CardContent className="p-0">
                <SupplyChainMapView />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Risk Alerts */}
            <Card>
              <CardHeader>
                <CardTitle>Risk Alerts</CardTitle>
                <CardDescription>Real-time supply chain disruption alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alertsLoading ? (
                    <p className="text-sm text-muted-foreground">Loading alerts...</p>
                  ) : riskAlerts?.map((alert) => (
                    <div key={alert.id} className="flex items-start space-x-4">
                      <AlertTriangle className={`h-5 w-5 flex-shrink-0 ${
                        alert.risk_level === 'high' ? 'text-destructive' :
                        alert.risk_level === 'medium' ? 'text-yellow-500' :
                        'text-muted-foreground'
                      }`} />
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-medium truncate">{alert.title}</p>
                          <Badge variant={
                            alert.risk_level === 'high' ? 'destructive' :
                            alert.risk_level === 'medium' ? 'default' :
                            'secondary'
                          }>
                            {alert.risk_level}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">{alert.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Enterprise Integration */}
            <Card className="hidden sm:block">
              <CardHeader>
                <CardTitle>Enterprise Systems</CardTitle>
                <CardDescription>Connected ERP and logistics systems</CardDescription>
              </CardHeader>
              <CardContent>
                <EnterpriseSystemsList />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </FeatureLayout>
  );
};

export default SupplyChainMap;
