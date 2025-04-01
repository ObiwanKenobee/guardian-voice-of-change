
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, AlertTriangle, Leaf, Shield, TreeDeciduous } from "lucide-react";
import { WildlifeStats } from "@/components/workspace/wildlife/WildlifeStats";
import { WildlifeMonitoring } from "@/components/workspace/wildlife/WildlifeMonitoring";
import { ConservationProjects } from "@/components/workspace/wildlife/ConservationProjects";
import { AlertsDashboard } from "@/components/workspace/wildlife/components/AlertsDashboard";
import { PatrolReports } from "@/components/workspace/wildlife/components/PatrolReports";
import { RiskHeatmap } from "@/components/workspace/wildlife/components/RiskHeatmap";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Wildlife = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Your report is being generated and will download shortly.",
    });
  };

  const generateReportMutation = useMutation({
    mutationFn: async (type: 'impact' | 'full') => {
      // Simulating a report generation request
      toast({
        title: "Report Generating",
        description: `Your ${type} report is being generated.`,
      });
      
      return { success: true, type };
    },
    onSuccess: (data) => {
      toast({
        title: "Report Generated",
        description: `Your ${data.type} report has been generated successfully.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to generate report. Please try again.",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="h-full flex flex-col gap-6 p-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/workspace/dashboard')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Wildlife Protection</h1>
        <p className="text-muted-foreground text-lg">
          Monitor and protect wildlife in your operational areas
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Trafficking Alerts
            </CardTitle>
            <CardDescription>
              Real-time monitoring of suspicious activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="font-semibold text-2xl">12</div>
              <p className="text-sm text-muted-foreground">
                Active alerts in high-risk areas
              </p>
              <Button className="w-full" variant="secondary" onClick={handleExport}>
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-green-500" />
              Biodiversity Impact
            </CardTitle>
            <CardDescription>
              Assessment of supply chain effects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="font-semibold text-2xl">85%</div>
              <p className="text-sm text-muted-foreground">
                Positive biodiversity score
              </p>
              <Button 
                className="w-full" 
                variant="secondary"
                onClick={() => generateReportMutation.mutate('impact')}
                disabled={generateReportMutation.isPending}
              >
                Generate Report
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-500" />
              Conservation Partners
            </CardTitle>
            <CardDescription>
              Active partnerships and opportunities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="font-semibold text-2xl">8</div>
              <p className="text-sm text-muted-foreground">
                Active conservation partnerships
              </p>
              <Button 
                className="w-full" 
                variant="secondary"
                onClick={() => navigate('/workspace/partners')}
              >
                Find Partners
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="flex-1">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="conservation">Conservation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <WildlifeStats />
        </TabsContent>
        
        <TabsContent value="monitoring" className="h-full">
          <WildlifeMonitoring />
        </TabsContent>
        
        <TabsContent value="conservation" className="h-full">
          <ConservationProjects />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Wildlife;
