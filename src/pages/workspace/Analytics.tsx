import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, LineChart, PieChart, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface Metric {
  metric_name: string;
  metric_value: number;
  metric_type: string;
}

interface Report {
  id: string;
  title: string;
  description: string | null;
  report_type: string;
  data: any;
  created_at: string;
}

const Analytics = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  const { data: metrics, isLoading: metricsLoading } = useQuery({
    queryKey: ['analytics-metrics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('analytics_metrics')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(10);
      
      if (error) throw error;
      return data as Metric[];
    }
  });

  const { data: reports, isLoading: reportsLoading } = useQuery({
    queryKey: ['analytics-reports'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('analytics_reports')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Report[];
    }
  });

  const handleExportReport = async (reportId: string) => {
    try {
      const report = reports?.find(r => r.id === reportId);
      if (!report) return;

      const blob = new Blob([JSON.stringify(report.data, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `report-${report.title.toLowerCase().replace(/\s+/g, '-')}.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast({
        title: "Report exported",
        description: "Your report has been downloaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "There was an error exporting your report.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="h-full flex flex-col gap-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
        <p className="text-muted-foreground text-lg">
          Analyze and visualize your environmental impact data
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {metricsLoading ? (
              <p>Loading metrics...</p>
            ) : metrics?.slice(0, 3).map((metric, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{metric.metric_name}</CardTitle>
                  {index === 0 && <BarChart3 className="h-4 w-4 text-muted-foreground" />}
                  {index === 1 && <LineChart className="h-4 w-4 text-muted-foreground" />}
                  {index === 2 && <PieChart className="h-4 w-4 text-muted-foreground" />}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.metric_value}</div>
                  <p className="text-xs text-muted-foreground">{metric.metric_type}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-4">
            {reportsLoading ? (
              <p>Loading reports...</p>
            ) : reports?.map((report) => (
              <Card key={report.id}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>{report.title}</CardTitle>
                    <CardDescription>{report.description}</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleExportReport(report.id)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    Type: {report.report_type}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Created: {new Date(report.created_at).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="trends" className="h-full">
          <Card>
            <CardHeader>
              <CardTitle>Trend Analysis</CardTitle>
              <CardDescription>Long-term environmental impact trends</CardDescription>
            </CardHeader>
            <CardContent>
              {metricsLoading ? (
                <p>Loading trends...</p>
              ) : (
                <div className="space-y-4">
                  {metrics?.map((metric, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span>{metric.metric_name}</span>
                      <span className="font-medium">{metric.metric_value}</span>
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

export default Analytics;