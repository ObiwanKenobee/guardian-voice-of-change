import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Camera, Map, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const mockData = [
  { date: '2024-01', sightings: 45 },
  { date: '2024-02', sightings: 52 },
  { date: '2024-03', sightings: 48 },
  { date: '2024-04', sightings: 61 },
  { date: '2024-05', sightings: 55 },
];

const CameraTraps = () => (
  <div className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Cameras</CardTitle>
          <Camera className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">24</div>
          <p className="text-xs text-muted-foreground">4 requiring maintenance</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Coverage Area</CardTitle>
          <Map className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,250 ha</div>
          <p className="text-xs text-muted-foreground">85% of target area</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Alerts</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3</div>
          <p className="text-xs text-muted-foreground">2 high priority</p>
        </CardContent>
      </Card>
    </div>

    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Wildlife Sightings Trend</CardTitle>
        <CardDescription>Monthly wildlife activity captured by camera traps</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sightings" stroke="#2563eb" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  </div>
);

export const WildlifeMonitoring = () => {
  const [activeTab, setActiveTab] = useState("camera-traps");
  const { toast } = useToast();

  const { data: analyticsData, isLoading } = useQuery({
    queryKey: ['wildlife-analytics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('analytics_metrics')
        .select('*')
        .eq('metric_type', 'wildlife')
        .order('timestamp', { ascending: false })
        .limit(10);

      if (error) throw error;
      return data;
    },
  });

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Your report is being generated and will download shortly.",
    });
    // Implement actual export logic here
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Wildlife Monitoring</CardTitle>
          <CardDescription>Track and analyze wildlife activity in protected areas</CardDescription>
        </div>
        <Button onClick={handleExport} variant="outline">Export Data</Button>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="camera-traps">Camera Traps</TabsTrigger>
            <TabsTrigger value="patrols">Patrol Reports</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="camera-traps">
            <CameraTraps />
          </TabsContent>
          
          <TabsContent value="patrols">
            <div className="p-4 text-center text-muted-foreground">
              Patrol reports feature coming soon
            </div>
          </TabsContent>
          
          <TabsContent value="alerts">
            <div className="p-4 text-center text-muted-foreground">
              Alerts dashboard coming soon
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};