import { Cloud, Server, Database, Signal, AlertTriangle, ServerCog, BellRing } from "lucide-react";
import { FeatureLayout } from "@/components/workspace/features/FeatureLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";

const mockData = [
  { time: "00:00", cpu: 45, memory: 60, network: 30 },
  { time: "04:00", cpu: 55, memory: 65, network: 35 },
  { time: "08:00", cpu: 75, memory: 80, network: 60 },
  { time: "12:00", cpu: 85, memory: 85, network: 70 },
  { time: "16:00", cpu: 70, memory: 75, network: 55 },
  { time: "20:00", cpu: 60, memory: 70, network: 40 },
];

const chartConfig = {
  cpu: {
    label: "CPU Usage",
    theme: {
      light: "var(--color-blue-500)",
      dark: "var(--color-blue-400)"
    }
  },
  memory: {
    label: "Memory Usage",
    theme: {
      light: "var(--color-green-500)",
      dark: "var(--color-green-400)"
    }
  },
  network: {
    label: "Network Traffic",
    theme: {
      light: "var(--color-purple-500)",
      dark: "var(--color-purple-400)"
    }
  }
};

interface ResourceAlert {
  id: string;
  title: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  description: string;
}

const CloudInfrastructure = () => {
  const { toast } = useToast();
  const [activeAlerts, setActiveAlerts] = useState<ResourceAlert[]>([
    {
      id: '1',
      title: 'High CPU Usage',
      severity: 'high',
      timestamp: new Date().toISOString(),
      description: 'Server CPU usage exceeded 85% threshold'
    },
    {
      id: '2',
      title: 'Memory Warning',
      severity: 'medium',
      timestamp: new Date().toISOString(),
      description: 'Available memory below 20% threshold'
    }
  ]);

  // Fetch metrics data
  const { data: metricsData, isLoading } = useQuery({
    queryKey: ['infrastructure-metrics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('analytics_metrics')
        .select('*')
        .eq('metric_type', 'infrastructure')
        .order('timestamp', { ascending: false })
        .limit(6);

      if (error) {
        toast({
          title: "Error fetching metrics",
          description: error.message,
          variant: "destructive",
        });
        return null;
      }

      return data;
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  return (
    <FeatureLayout
      icon={Cloud}
      title="Cloud Infrastructure"
      description="Monitor and manage your cloud infrastructure resources and performance metrics."
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
              <Server className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">75%</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <span className="text-emerald-500">↗</span>
                <span className="ml-1">+2% from last hour</span>
              </div>
            </CardContent>
          </Card>
          <Card className="animate-fade-in delay-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">80%</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <span className="text-rose-500">↘</span>
                <span className="ml-1">+5% from last hour</span>
              </div>
            </CardContent>
          </Card>
          <Card className="animate-fade-in delay-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Network Traffic</CardTitle>
              <Signal className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1.2 GB/s</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <span className="text-emerald-500">↗</span>
                <span className="ml-1">+0.3 GB/s from last hour</span>
              </div>
            </CardContent>
          </Card>
          <Card className="animate-fade-in delay-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-rose-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeAlerts.length}</div>
              <p className="text-xs text-muted-foreground">2 critical issues</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Infrastructure Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={metricsData || mockData}>
                        <XAxis dataKey="time" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                          type="monotone"
                          dataKey="cpu"
                          stroke="var(--color-cpu)"
                          strokeWidth={2}
                        />
                        <Line
                          type="monotone"
                          dataKey="memory"
                          stroke="var(--color-memory)"
                          strokeWidth={2}
                        />
                        <Line
                          type="monotone"
                          dataKey="network"
                          stroke="var(--color-network)"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="resources" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-row items-center space-x-4">
                  <ServerCog className="h-6 w-6 text-primary" />
                  <div>
                    <CardTitle>Compute Resources</CardTitle>
                    <p className="text-sm text-muted-foreground">Virtual machines and containers</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Active VMs</span>
                      <span className="text-sm">12/15</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Container Instances</span>
                      <span className="text-sm">45/50</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Load Balancers</span>
                      <span className="text-sm">2/3</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center space-x-4">
                  <Database className="h-6 w-6 text-primary" />
                  <div>
                    <CardTitle>Storage Resources</CardTitle>
                    <p className="text-sm text-muted-foreground">Databases and object storage</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Database Storage</span>
                      <span className="text-sm">750GB/1TB</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Object Storage</span>
                      <span className="text-sm">2.1TB/5TB</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Backup Storage</span>
                      <span className="text-sm">1.5TB/2TB</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="alerts" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center space-x-4">
                <BellRing className="h-6 w-6 text-primary" />
                <div>
                  <CardTitle>Active Alerts</CardTitle>
                  <p className="text-sm text-muted-foreground">Current infrastructure alerts and warnings</p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeAlerts.map((alert) => (
                    <Card key={alert.id} className="border-l-4 border-l-rose-500">
                      <CardHeader className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-base">{alert.title}</CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            alert.severity === 'high' 
                              ? 'bg-rose-100 text-rose-700' 
                              : alert.severity === 'medium'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-emerald-100 text-emerald-700'
                          }`}>
                            {alert.severity.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          {new Date(alert.timestamp).toLocaleString()}
                        </p>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </FeatureLayout>
  );
};

export default CloudInfrastructure;