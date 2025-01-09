import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CameraTraps } from "./components/CameraTraps";
import { PatrolReports } from "./components/PatrolReports";
import { AlertsDashboard } from "./components/AlertsDashboard";

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
            <PatrolReports />
          </TabsContent>
          
          <TabsContent value="alerts">
            <AlertsDashboard />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};