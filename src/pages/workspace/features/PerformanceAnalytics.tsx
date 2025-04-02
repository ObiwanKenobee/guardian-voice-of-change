
import { Activity, BarChart2 } from "lucide-react";
import { FeatureLayout } from "@/components/workspace/features/FeatureLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnalyticsHeader } from "@/components/workspace/analytics/AnalyticsHeader";
import { PerformanceAlert } from "@/components/workspace/analytics/PerformanceAlert";
import { StatCards } from "@/components/workspace/analytics/StatCards";
import { PerformanceChart } from "@/components/workspace/analytics/charts/PerformanceChart";
import { SensorChart } from "@/components/workspace/analytics/charts/SensorChart";
import { MetricsCharts } from "@/components/workspace/analytics/charts/MetricsCharts";
import { CustomMetrics } from "@/components/workspace/analytics/CustomMetrics";
import { Button } from "@/components/ui/button";
import { useAnalytics } from "@/contexts/AnalyticsContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const PerformanceAnalytics = () => {
  const { 
    modules, 
    connectModule, 
    isConnecting, 
    connectedModules 
  } = useAnalytics();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const isConnected = connectedModules.includes('performance_analytics' as any);
  
  const handleConnectAnalytics = async () => {
    try {
      await connectModule('performance_analytics' as any);
      toast({
        title: "Analytics Connected",
        description: "Performance Analytics is now integrated with the unified analytics system"
      });
    } catch (error) {
      console.error("Error connecting module:", error);
    }
  };
  
  const handleViewIntegrated = () => {
    navigate('/workspace/integrated-analytics');
  };
  
  return (
    <FeatureLayout
      icon={Activity}
      title="Performance Analytics"
      description="Gain actionable insights into your conservation and ethical supply chain efforts."
    >
      <div className="space-y-6">
        <AnalyticsHeader />
        
        <Card className="bg-blue-50/30 border-blue-100">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <BarChart2 className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-blue-800">Integrated Analytics</CardTitle>
              </div>
            </div>
            <CardDescription className="text-blue-700">
              Connect Performance Analytics to our unified analytics system for cross-module insights
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-sm text-blue-600 mb-4">
              Linking this module with other workspace sections enables comprehensive data breakdowns, 
              unified visualizations, and deeper insights across your sustainability initiatives.
            </p>
          </CardContent>
          <CardFooter className="flex justify-end gap-2 pt-0">
            {isConnected ? (
              <Button onClick={handleViewIntegrated} className="gap-2">
                <BarChart2 className="h-4 w-4" />
                View Integrated Analytics
              </Button>
            ) : (
              <Button 
                onClick={handleConnectAnalytics} 
                className="gap-2"
                disabled={isConnecting}
              >
                {isConnecting ? (
                  <>Connecting...</>
                ) : (
                  <>
                    <BarChart2 className="h-4 w-4" />
                    Connect to Integrated Analytics
                  </>
                )}
              </Button>
            )}
          </CardFooter>
        </Card>
        
        <PerformanceAlert />
        <StatCards />

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
            <TabsTrigger value="custom">Custom Metrics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <PerformanceChart />
          </TabsContent>
          
          <TabsContent value="details" className="space-y-4">
            <SensorChart />
            <MetricsCharts />
          </TabsContent>
          
          <TabsContent value="comparison" className="space-y-4">
            <PerformanceChart />
            <MetricsCharts />
          </TabsContent>

          <TabsContent value="custom" className="space-y-4">
            <CustomMetrics />
          </TabsContent>
        </Tabs>
      </div>
    </FeatureLayout>
  );
};

export default PerformanceAnalytics;
