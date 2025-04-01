
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Map, Shield, AlertTriangle, Factory, Boxes, Network, Globe, Ship, Truck, Plane } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SupplyChainOverview } from "@/components/workspace/supply-chain/SupplyChainOverview";
import { ShipmentTracking } from "@/components/workspace/supply-chain/ShipmentTracking";
import { SupplierDirectory } from "@/components/workspace/supply-chain/SupplierDirectory";
import { SupplyChainMapView } from "@/components/workspace/supply-chain/SupplyChainMapView";
import { SupplyChainControls } from "@/components/workspace/supply-chain/SupplyChainControls";
import { EnterpriseSystemsList } from "@/components/workspace/enterprise/EnterpriseSystemsList";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";

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

const SupplyChain = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("map");
  const isMobile = useIsMobile();

  // Simulating risk alerts since we don't have actual data yet
  const riskAlerts: RiskAlertDisplay[] = [
    {
      id: "1",
      title: "Port Delays in Rotterdam",
      risk_level: "high",
      location: { lat: 51.9244, lng: 4.4777 },
      description: "Labor strike causing significant delays at Rotterdam port. Estimated impact: 3-5 days on European shipments."
    },
    {
      id: "2",
      title: "Weather Warning - Pacific",
      risk_level: "medium",
      location: { lat: 20.7933, lng: -156.9954 },
      description: "Tropical storm forming near shipping lanes. Potential for 2-3 day delays on trans-Pacific routes."
    },
    {
      id: "3",
      title: "Regulatory Changes - Brazil",
      risk_level: "low",
      location: { lat: -15.7801, lng: -47.9292 },
      description: "New customs declaration requirements for agricultural imports. Documentation updates required."
    }
  ];

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Supply Chain Management</h1>
        <p className="text-muted-foreground text-lg">
          Monitor and optimize your supply chain operations
        </p>
      </div>

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
              {riskAlerts?.length || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Active alerts requiring attention
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="flex-1">
        <TabsList className="grid w-full grid-cols-3 h-12">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tracking">Shipment Tracking</TabsTrigger>
          <TabsTrigger value="suppliers">Supplier Directory</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <SupplyChainOverview />
        </TabsContent>
        
        <TabsContent value="tracking" className="space-y-4">
          <ShipmentTracking />
        </TabsContent>
        
        <TabsContent value="suppliers" className="space-y-4">
          <SupplierDirectory />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupplyChain;
