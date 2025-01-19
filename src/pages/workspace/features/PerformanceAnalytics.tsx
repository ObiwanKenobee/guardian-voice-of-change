import { LineChart, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Line, Area, AreaChart } from "recharts";
import { Activity, TrendingUp, Target, Award, Download, Settings, Share2, AlertTriangle } from "lucide-react";
import { FeatureLayout } from "@/components/workspace/features/FeatureLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Mock data - replace with actual data from Supabase
const performanceData = [
  { month: "Jan", performance: 65, target: 60 },
  { month: "Feb", performance: 68, target: 65 },
  { month: "Mar", performance: 75, target: 70 },
  { month: "Apr", performance: 78, target: 75 },
  { month: "May", performance: 82, target: 80 },
  { month: "Jun", performance: 85, target: 85 },
];

const sensorData = [
  { date: "2024-01-01", uptime: 98, alerts: 5 },
  { date: "2024-01-02", uptime: 99, alerts: 3 },
  { date: "2024-01-03", uptime: 97, alerts: 7 },
  { date: "2024-01-04", uptime: 100, alerts: 2 },
  { date: "2024-01-05", uptime: 96, alerts: 8 },
];

const chartConfig = {
  performance: {
    label: "Performance",
    theme: {
      light: "#2563eb",
      dark: "#3b82f6"
    }
  },
  target: {
    label: "Target",
    theme: {
      light: "#9333ea",
      dark: "#a855f7"
    }
  }
};

const PerformanceAnalytics = () => {
  const { data: sensorMetrics, isLoading: isLoadingSensorMetrics } = useQuery({
    queryKey: ['sensor-metrics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sensor_metrics')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(10);
      
      if (error) throw error;
      return data;
    }
  });

  const { data: collaborationMetrics, isLoading: isLoadingCollabMetrics } = useQuery({
    queryKey: ['collaboration-metrics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('collaboration_metrics')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(10);
      
      if (error) throw error;
      return data;
    }
  });

  return (
    <FeatureLayout
      icon={Activity}
      title="Performance Analytics"
      description="Gain actionable insights into your conservation and ethical supply chain efforts."
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight">Performance Overview</h2>
            <p className="text-muted-foreground">
              Monitor key performance indicators and optimize for impact
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Customize
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Performance Update</AlertTitle>
          <AlertDescription>
            Your wildlife monitoring efforts reduced poaching incidents by 12% this quarter.
          </AlertDescription>
        </Alert>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Species Protected</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4,567</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89%</div>
              <p className="text-xs text-muted-foreground">+3% from target</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Intelligence Shared</CardTitle>
              <Share2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
              <p className="text-xs text-muted-foreground">Entries this month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Partner Engagement</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78%</div>
              <p className="text-xs text-muted-foreground">Active partners</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={performanceData}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="performance" fill={`var(--color-performance)`} />
                        <Bar dataKey="target" fill={`var(--color-target)`} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="details" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Sensor Network Performance</CardTitle>
                <CardDescription>Monitor IoT sensor network metrics in real-time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={sensorData}>
                      <XAxis dataKey="date" />
                      <YAxis />
                      <ChartTooltip />
                      <Area type="monotone" dataKey="uptime" stroke="#2563eb" fill="#3b82f6" />
                      <Area type="monotone" dataKey="alerts" stroke="#9333ea" fill="#a855f7" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Wildlife Monitoring</CardTitle>
                  <CardDescription>Species activity and protection metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={performanceData}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip />
                        <Line type="monotone" dataKey="performance" stroke="#2563eb" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Supply Chain Compliance</CardTitle>
                  <CardDescription>Track compliance and certification status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={performanceData}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip />
                        <Line type="monotone" dataKey="target" stroke="#9333ea" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="comparison" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance Comparison</CardTitle>
                <CardDescription>Compare metrics across different time periods</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={performanceData}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip />
                      <Bar dataKey="performance" fill="#2563eb" />
                      <Bar dataKey="target" fill="#9333ea" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Year-over-Year Growth</CardTitle>
                  <CardDescription>Compare annual performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={performanceData}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip />
                        <Line type="monotone" dataKey="performance" stroke="#2563eb" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Regional Comparison</CardTitle>
                  <CardDescription>Compare metrics across different regions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={performanceData}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip />
                        <Bar dataKey="performance" fill="#2563eb" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </FeatureLayout>
  );
};

export default PerformanceAnalytics;