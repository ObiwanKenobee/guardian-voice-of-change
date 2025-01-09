import { useEffect } from "react";
import { BarChart3, LineChart, PieChart, TrendingUp, Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const AdvancedAnalytics = () => {
  const { toast } = useToast();

  const { data: metrics, isLoading: metricsLoading } = useQuery({
    queryKey: ['advanced-analytics-metrics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('analytics_metrics')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(10);
      
      if (error) throw error;
      return data;
    }
  });

  const { data: reports, isLoading: reportsLoading } = useQuery({
    queryKey: ['advanced-analytics-reports'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('analytics_reports')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const handleExportData = () => {
    toast({
      title: "Export Started",
      description: "Your analytics data is being prepared for export.",
    });
  };

  return (
    <div className="h-full flex flex-col gap-6 p-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Advanced Analytics</h1>
          <p className="text-muted-foreground">
            Deep insights and predictive analytics for your environmental impact data
          </p>
        </div>
        <Button onClick={handleExportData} variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export Data
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Impact Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89.3</div>
            <p className="text-xs text-muted-foreground">+4.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Carbon Offset</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4K</div>
            <p className="text-xs text-muted-foreground">Tons CO2 equivalent</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.2%</div>
            <p className="text-xs text-muted-foreground">Across all metrics</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="metrics" className="flex-1">
        <TabsList>
          <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="metrics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Environmental Impact Metrics</CardTitle>
              <CardDescription>Real-time monitoring of key environmental indicators</CardDescription>
            </CardHeader>
            <CardContent>
              {metricsLoading ? (
                <p>Loading metrics...</p>
              ) : (
                <div className="space-y-4">
                  {metrics?.map((metric, index) => (
                    <div key={index} className="flex items-center justify-between border-b pb-2">
                      <span>{metric.metric_name}</span>
                      <span className="font-medium">{metric.metric_value}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="predictions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Predictive Analytics</CardTitle>
              <CardDescription>AI-powered forecasting and trend analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <span>Projected Carbon Emissions</span>
                  <span className="font-medium text-green-600">-12% Expected Reduction</span>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <span>Resource Optimization</span>
                  <span className="font-medium text-blue-600">+8% Efficiency Gain</span>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <span>Waste Management</span>
                  <span className="font-medium text-yellow-600">15% Improvement Potential</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics Reports</CardTitle>
              <CardDescription>Comprehensive analysis and insights</CardDescription>
            </CardHeader>
            <CardContent>
              {reportsLoading ? (
                <p>Loading reports...</p>
              ) : (
                <div className="space-y-4">
                  {reports?.map((report, index) => (
                    <div key={index} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <h4 className="font-medium">{report.title}</h4>
                        <p className="text-sm text-muted-foreground">{report.description}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedAnalytics;