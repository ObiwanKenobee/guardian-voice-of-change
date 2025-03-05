
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Map, Shield, AlertTriangle, Factory, Boxes, Network, Globe, Ship, Truck, Plane } from "lucide-react";
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
import { useIsMobile } from "@/hooks/use-mobile";

type RiskZone = Database["public"]["Tables"]["risk_zones"]["Row"];

interface RiskAlertDisplay {
  id: string;
  title: string;
  risk_level: string;
  location: { lat: number; lng: number };
  description: string;
}

const transportModes = [
  {
    icon: <Ship className="h-4 w-4" />,
    name: "Sea Freight",
    count: 245,
    efficiency: "92%",
  },
  {
    icon: <Plane className="h-4 w-4" />,
    name: "Air Freight",
    count: 78,
    efficiency: "96%",
  },
  {
    icon: <Truck className="h-4 w-4" />,
    name: "Ground Transport",
    count: 523,
    efficiency: "89%",
  },
];

const SupplyChainMap = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("map");
  const isMobile = useIsMobile();

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

  const riskAlerts: RiskAlertDisplay[] = riskZones?.map(zone => ({
    id: zone.id,
    title: `Risk Alert: ${zone.location}`,
    risk_level: zone.risk_level,
    location: typeof zone.coordinates === 'object' ? zone.coordinates as { lat: number; lng: number } : { lat: 0, lng: 0 },
    description: zone.description
  })) || [];

  return (
    <FeatureLayout
      icon={Map}
      title="Supply Chain Command Center"
      description="Real-time supply chain visualization with blockchain verification and AI-driven optimization"
    >
      <div className="space-y-4 sm:space-y-6 w-full max-w-[1400px] mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        {/* Hero Stats */}
        <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2 px-3 sm:px-6">
              <CardTitle className="text-xs sm:text-sm font-medium">Network Health</CardTitle>
              <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
            </CardHeader>
            <CardContent className="px-3 pb-3 sm:px-6 sm:pb-6">
              <div className="text-lg sm:text-2xl font-bold text-primary">98.3%</div>
              <p className="text-xs text-muted-foreground">
                Optimal performance across network
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2 px-3 sm:px-6">
              <CardTitle className="text-xs sm:text-sm font-medium">Sustainability Score</CardTitle>
              <Globe className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
            </CardHeader>
            <CardContent className="px-3 pb-3 sm:px-6 sm:pb-6">
              <div className="text-lg sm:text-2xl font-bold text-primary">A+</div>
              <p className="text-xs text-muted-foreground">
                Leading in sustainable practices
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2 px-3 sm:px-6">
              <CardTitle className="text-xs sm:text-sm font-medium">Active Routes</CardTitle>
              <Network className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
            </CardHeader>
            <CardContent className="px-3 pb-3 sm:px-6 sm:pb-6">
              <div className="text-lg sm:text-2xl font-bold text-primary">846</div>
              <p className="text-xs text-muted-foreground">
                98% on-time delivery rate
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2 px-3 sm:px-6">
              <CardTitle className="text-xs sm:text-sm font-medium">Risk Alerts</CardTitle>
              <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
            </CardHeader>
            <CardContent className="px-3 pb-3 sm:px-6 sm:pb-6">
              <div className="text-lg sm:text-2xl font-bold text-primary">
                {alertsLoading ? "..." : riskAlerts?.length || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                Active alerts requiring attention
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Transportation Modes Overview */}
        <Card>
          <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
            <CardTitle className="text-base sm:text-lg">Transportation Network</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Real-time fleet and shipment tracking</CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
              {transportModes.map((mode) => (
                <Card key={mode.name} className="bg-muted/50">
                  <CardContent className="p-3 sm:p-6">
                    <div className="flex items-center justify-between mb-2 sm:mb-4">
                      <div className="flex items-center gap-2">
                        {mode.icon}
                        <span className="text-xs sm:text-sm font-medium">{mode.name}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">{mode.efficiency}</Badge>
                    </div>
                    <div className="text-lg sm:text-2xl font-bold">{mode.count}</div>
                    <p className="text-xs text-muted-foreground">Active shipments</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-3">
          {/* Map and Controls */}
          <div className="lg:col-span-2 space-y-4">
            <SupplyChainControls />
            <Card>
              <CardContent className="p-0">
                <div className="h-[300px] sm:h-[400px] md:h-[450px]">
                  <SupplyChainMapView />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Risk Alerts */}
            <Card>
              <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
                <CardTitle className="text-base sm:text-lg">Risk Alerts</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Real-time supply chain disruption alerts</CardDescription>
              </CardHeader>
              <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
                <div className="space-y-3 sm:space-y-4">
                  {alertsLoading ? (
                    <p className="text-xs sm:text-sm text-muted-foreground">Loading alerts...</p>
                  ) : riskAlerts?.map((alert) => (
                    <div key={alert.id} className="flex items-start space-x-2 sm:space-x-4">
                      <AlertTriangle className={`h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 ${
                        alert.risk_level === 'high' ? 'text-destructive' :
                        alert.risk_level === 'medium' ? 'text-yellow-500' :
                        'text-muted-foreground'
                      }`} />
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-xs sm:text-sm font-medium truncate">{alert.title}</p>
                          <Badge variant={
                            alert.risk_level === 'high' ? 'destructive' :
                            alert.risk_level === 'medium' ? 'default' :
                            'secondary'
                          } className="text-xs">
                            {alert.risk_level}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {alert.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Enterprise Integration */}
            <Card>
              <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
                <CardTitle className="text-base sm:text-lg">Enterprise Systems</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Connected ERP and logistics systems</CardDescription>
              </CardHeader>
              <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
                <EnterpriseSystemsList />
              </CardContent>
            </Card>

            {/* Sustainability Metrics */}
            <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/10 dark:to-green-900/20">
              <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Globe className="h-4 w-4 sm:h-5 sm:w-5" />
                  Sustainability Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs sm:text-sm font-medium">Carbon Footprint</span>
                      <span className="text-xs sm:text-sm text-green-600">-15% YoY</span>
                    </div>
                    <div className="h-1.5 sm:h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 w-[85%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs sm:text-sm font-medium">Renewable Energy</span>
                      <span className="text-xs sm:text-sm text-green-600">78%</span>
                    </div>
                    <div className="h-1.5 sm:h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 w-[78%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs sm:text-sm font-medium">Waste Reduction</span>
                      <span className="text-xs sm:text-sm text-green-600">92%</span>
                    </div>
                    <div className="h-1.5 sm:h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 w-[92%]" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </FeatureLayout>
  );
};

export default SupplyChainMap;
