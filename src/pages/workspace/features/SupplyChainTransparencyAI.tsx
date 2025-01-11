import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Database, Globe, Activity, Zap, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { SupplyChainMapView } from "@/components/workspace/supply-chain/SupplyChainMapView";
import { SupplyChainControls } from "@/components/workspace/supply-chain/SupplyChainControls";

const SupplyChainTransparencyAI = () => {
  const navigate = useNavigate();

  const { data: metrics, isLoading } = useQuery({
    queryKey: ['supply-chain-metrics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('analytics_metrics')
        .select('*')
        .eq('metric_type', 'supply_chain')
        .order('timestamp', { ascending: false })
        .limit(5);

      if (error) throw error;
      return data;
    }
  });

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/workspace/dashboard')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold">Supply Chain Transparency AI</h1>
          <p className="text-muted-foreground">
            Real-time visibility into supply chain activities
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Data Aggregation
            </CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Progress value={85} className="h-2" />
              <p className="text-2xl font-bold">85%</p>
              <p className="text-xs text-muted-foreground">
                Data integration complete
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Risk Mapping
            </CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">3</span>
                <Badge variant="destructive">High Risk Regions</Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Active monitoring in progress
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Compliance Monitoring
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Progress value={92} className="h-2" />
              <p className="text-2xl font-bold">92%</p>
              <p className="text-xs text-muted-foreground">
                Overall compliance score
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="map" className="space-y-6">
        <TabsList>
          <TabsTrigger value="map">Supply Chain Map</TabsTrigger>
          <TabsTrigger value="analytics">Predictive Analytics</TabsTrigger>
          <TabsTrigger value="monitoring">IoT Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="map" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <SupplyChainControls />
              <div className="h-[500px] mt-4">
                <SupplyChainMapView />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Predictive Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="font-medium">Potential Disruptions</p>
                    <ul className="space-y-2">
                      <li className="flex items-center justify-between p-2 bg-muted rounded-lg">
                        <span>Port Congestion Risk</span>
                        <Badge>Medium</Badge>
                      </li>
                      <li className="flex items-center justify-between p-2 bg-muted rounded-lg">
                        <span>Weather Impact</span>
                        <Badge>Low</Badge>
                      </li>
                      <li className="flex items-center justify-between p-2 bg-muted rounded-lg">
                        <span>Political Instability</span>
                        <Badge variant="destructive">High</Badge>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Radio className="h-5 w-5" />
                  IoT Integration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="font-medium">Live Tracking Status</p>
                    <ul className="space-y-2">
                      <li className="flex items-center justify-between p-2 bg-muted rounded-lg">
                        <span>Connected Devices</span>
                        <span className="font-bold">124</span>
                      </li>
                      <li className="flex items-center justify-between p-2 bg-muted rounded-lg">
                        <span>Data Stream Status</span>
                        <Badge variant="success">Active</Badge>
                      </li>
                      <li className="flex items-center justify-between p-2 bg-muted rounded-lg">
                        <span>Last Update</span>
                        <span>2 min ago</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Real-time Monitoring</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                IoT monitoring dashboard coming soon...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupplyChainTransparencyAI;