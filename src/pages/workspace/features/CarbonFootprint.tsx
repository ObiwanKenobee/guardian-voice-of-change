import { Leaf, BarChart3, Globe, AlertTriangle, ArrowUpDown, Target, Users, FileCheck, Brain, Network } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface EmissionsData {
  id: string;
  timestamp: string;
  value: number;
  source: string;
  type: string;
}

const CarbonFootprint = () => {
  const { toast } = useToast();

  const { data: emissionsData, isLoading } = useQuery({
    queryKey: ['emissions-data'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('esg_metrics')
        .select('*')
        .eq('metric_type', 'carbon_emissions')
        .order('timestamp', { ascending: false })
        .limit(10);

      if (error) throw error;
      return data;
    }
  });

  const features = [
    {
      icon: Globe,
      title: "Real-Time Emissions Tracking",
      description: "Live monitoring across global operations with AI-powered insights",
      badge: "Enterprise"
    },
    {
      icon: FileCheck,
      title: "Compliance & Reporting",
      description: "Automated GHG Protocol compliance and stakeholder reporting",
      badge: "Premium"
    },
    {
      icon: Network,
      title: "Supply Chain Analytics",
      description: "End-to-end emissions tracking and optimization",
      badge: "New"
    },
    {
      icon: Brain,
      title: "Predictive Analytics",
      description: "AI-driven forecasting and optimization recommendations",
      badge: "AI-Powered"
    }
  ];

  return (
    <div className="space-y-8 p-8">
      {/* Hero Section */}
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <Leaf className="h-8 w-8 text-green-500" />
          <h1 className="text-3xl font-bold">Carbon Footprint Management</h1>
        </motion.div>
        <p className="text-muted-foreground text-lg max-w-3xl">
          Enterprise-grade carbon emissions tracking and management platform for Fortune 500 companies.
          Leverage AI-powered insights and real-time monitoring to achieve your sustainability goals.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <feature.icon className="h-6 w-6 text-primary" />
                  <Badge variant="secondary">{feature.badge}</Badge>
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Dashboard */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="supply-chain">Supply Chain</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Real-time Metrics */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Total Emissions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {isLoading ? "Loading..." : "2.5M"}
                  <span className="text-base font-normal text-muted-foreground"> tCO₂e</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="text-green-500">↓ 12%</span> vs. last year
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Reduction Target
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  45%
                  <span className="text-base font-normal text-muted-foreground"> by 2030</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="text-green-500">On track</span> with SBTi goals
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                  Risk Level
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  Low
                  <span className="text-base font-normal text-muted-foreground"> risk</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Based on AI risk assessment
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              onClick={() => {
                toast({
                  title: "Generating report",
                  description: "Your comprehensive carbon report is being generated.",
                });
              }}
            >
              Generate Report
            </Button>
            <Button variant="outline">
              View Historical Data
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Emissions Analytics</CardTitle>
              <CardDescription>
                Detailed breakdown of your carbon emissions by source and location
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <p>Loading analytics...</p>
              ) : (
                <div className="space-y-4">
                  {/* Add your analytics visualization components here */}
                  <p>Analytics content will be displayed here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="supply-chain">
          <Card>
            <CardHeader>
              <CardTitle>Supply Chain Emissions</CardTitle>
              <CardDescription>
                Track and manage Scope 3 emissions across your supply chain
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add your supply chain visualization components here */}
              <p>Supply chain emissions content will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Reports</CardTitle>
              <CardDescription>
                Generate and manage regulatory compliance reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add your reporting components here */}
              <p>Reporting content will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CarbonFootprint;