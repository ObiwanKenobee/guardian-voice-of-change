import {
  Cloud,
  Server,
  Database,
  Signal,
  AlertTriangle,
  ServerCog,
  BellRing,
  Shield,
  Globe,
  NetworkIcon,
  CloudCog,
} from "lucide-react";
import { FeatureLayout } from "@/components/workspace/features/FeatureLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const mockData = [
  { time: "00:00", cpu: 45, memory: 60, network: 30 },
  { time: "04:00", cpu: 55, memory: 65, network: 35 },
  { time: "08:00", cpu: 75, memory: 80, network: 60 },
  { time: "12:00", cpu: 85, memory: 85, network: 70 },
  { time: "16:00", cpu: 70, memory: 75, network: 55 },
  { time: "20:00", cpu: 60, memory: 70, network: 40 },
];

const features = [
  {
    title: "Multi-Cloud Architecture",
    icon: CloudCog,
    description: "Global redundancy across AWS, Azure, and Google Cloud",
    status: "Active",
  },
  {
    title: "AI & IoT Integration",
    icon: NetworkIcon,
    description: "Real-time data ingestion and predictive analytics",
    status: "Operational",
  },
  {
    title: "Blockchain Security",
    icon: Shield,
    description: "Immutable ledgers for ethical sourcing verification",
    status: "Secure",
  },
  {
    title: "Edge Computing",
    icon: Server,
    description: "Ultra-low latency for mission-critical data",
    status: "Optimized",
  },
];

const chartConfig = {
  cpu: {
    label: "CPU Usage",
    theme: {
      light: "var(--color-blue-500)",
      dark: "var(--color-blue-400)",
    },
  },
  memory: {
    label: "Memory Usage",
    theme: {
      light: "var(--color-green-500)",
      dark: "var(--color-green-400)",
    },
  },
  network: {
    label: "Network Traffic",
    theme: {
      light: "var(--color-purple-500)",
      dark: "var(--color-purple-400)",
    },
  },
};

const CloudInfrastructure = () => {
  const { data: metricsData, isLoading } = useQuery({
    queryKey: ["infrastructure-metrics"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("analytics_metrics")
        .select("*")
        .eq("metric_type", "infrastructure")
        .order("timestamp", { ascending: false })
        .limit(6);

      if (error) {
        console.error("Error fetching metrics:", error);
        return null;
      }

      return data;
    },
  });

  return (
    <FeatureLayout
      icon={Cloud}
      title="Guardian-IO Cloud Infrastructure"
      description="Powering a Secure, Scalable, and Intelligent Ecosystem for Ethical Supply Chains"
    >
      <div className="space-y-6">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-2">🚀 Infrastructure Overview</h2>
          <p className="text-muted-foreground">
            Guardian-IO's cloud infrastructure is built for high-performance, security, and seamless
            scalability, ensuring real-time supply chain tracking, AI-driven analytics, and
            decentralized data integrity.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{feature.title}</CardTitle>
                <feature.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">{feature.description}</p>
                <Badge variant="outline" className="bg-green-500/10 text-green-500">
                  {feature.status}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
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

          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Performance metrics will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Security details will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="bg-primary/5 border-primary/10">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">The Future of Ethical Supply Chains</h3>
            </div>
            <p className="text-muted-foreground">
              Designed to support millions of users, Guardian-IO optimizes carbon footprint through
              green cloud computing & AI-driven efficiency models. Our infrastructure ensures
              seamless scalability while maintaining the highest standards of security and
              performance.
            </p>
          </CardContent>
        </Card>
      </div>
    </FeatureLayout>
  );
};

export default CloudInfrastructure;
