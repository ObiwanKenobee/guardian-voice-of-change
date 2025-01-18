import { CircuitBoard, Battery, Signal, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Sensors = () => {
  const { data: sensors, isLoading } = useQuery({
    queryKey: ['sensors'],
    queryFn: async () => {
      // This would fetch from a sensors table if we had one
      // For now returning mock data
      return [
        {
          id: 1,
          name: "Field Sensor A1",
          type: "Environmental",
          battery: 85,
          signal: 92,
          status: "active",
          lastReading: new Date().toISOString(),
        },
        {
          id: 2,
          name: "Water Quality B2",
          type: "Water",
          battery: 45,
          signal: 78,
          status: "warning",
          lastReading: new Date().toISOString(),
        },
      ];
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Sensor Management</h1>
          <p className="text-muted-foreground">
            Monitor and manage your IoT sensor network
          </p>
        </div>
        <Button>
          <CircuitBoard className="mr-2 h-4 w-4" />
          Add Sensor
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sensors</CardTitle>
            <CircuitBoard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              98% operational
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Battery Status</CardTitle>
            <Battery className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">
              Average battery level
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Network Status</CardTitle>
            <Signal className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Good</div>
            <p className="text-xs text-muted-foreground">
              All nodes connected
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4">
            {sensors?.map((sensor) => (
              <Card key={sensor.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between space-y-0">
                    <div>
                      <h3 className="font-semibold">{sensor.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {sensor.type}
                      </p>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={
                        sensor.status === 'active' 
                          ? "bg-green-500/10 text-green-500"
                          : "bg-yellow-500/10 text-yellow-500"
                      }
                    >
                      {sensor.status.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Battery</span>
                        <span>{sensor.battery}%</span>
                      </div>
                      <Progress value={sensor.battery} className="h-2" />
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Signal Strength</span>
                        <span>{sensor.signal}%</span>
                      </div>
                      <Progress value={sensor.signal} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="alerts">
          <Card>
            <CardHeader>
              <CardTitle>Active Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="font-medium">Low Battery Warning</p>
                    <p className="text-sm text-muted-foreground">
                      Sensor B2 battery below 50%
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No maintenance tasks scheduled</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Sensors;