
import { useState } from "react";
import { motion } from "framer-motion";
import { HandHeart, Globe, UserCheck, Shield, LineChart, AlertTriangle, Building2, CheckCircle2, Leaf, Scale, Network, Factory } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { FeatureLayout } from "@/components/workspace/features/FeatureLayout";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const impactMetrics = [
  {
    icon: <HandHeart className="h-5 w-5" />,
    title: "Worker Well-being",
    value: "94%",
    change: "+8%",
    description: "Verified fair labor practices"
  },
  {
    icon: <Globe className="h-5 w-5" />,
    title: "Environmental Impact",
    value: "A+",
    change: "+15%",
    description: "Sustainable sourcing score"
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Supply Chain Score",
    value: "96/100",
    change: "+12%",
    description: "Transparency and traceability"
  },
  {
    icon: <Scale className="h-5 w-5" />,
    title: "Fair Trade Ratio",
    value: "89%",
    change: "+18%",
    description: "Certified fair trade sourcing"
  }
];

const sustainabilityInitiatives = [
  {
    icon: <Leaf className="h-6 w-6" />,
    title: "Regenerative Agriculture",
    status: "Active",
    impact: "High",
    metrics: {
      farmers: "12,450+",
      land: "45,000 hectares",
      yield: "+25%"
    }
  },
  {
    icon: <UserCheck className="h-6 w-6" />,
    title: "Worker Empowerment",
    status: "Active",
    impact: "Very High",
    metrics: {
      workers: "28,900+",
      training: "125,000 hours",
      satisfaction: "92%"
    }
  },
  {
    icon: <Network className="h-6 w-6" />,
    title: "Supply Chain Transparency",
    status: "Active",
    impact: "High",
    metrics: {
      suppliers: "1,240+",
      traceability: "98%",
      compliance: "96%"
    }
  }
];

const EthicalSourcingAdvisor = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const { data: supplierAssessments, isLoading } = useQuery({
    queryKey: ['supplier-assessments'],
    queryFn: async () => {
      // In a real implementation, this would fetch from your Supabase database
      const mockData = [
        {
          id: '1',
          name: 'Eco Textiles Co.',
          score: 85,
          status: 'compliant',
          lastAudit: '2024-02-15',
          riskAreas: ['Labor Rights', 'Environmental Impact']
        },
        {
          id: '2',
          name: 'Sustainable Materials Ltd',
          score: 92,
          status: 'compliant',
          lastAudit: '2024-02-10',
          riskAreas: ['Supply Chain Transparency']
        },
        {
          id: '3',
          name: 'Global Manufacturing Inc',
          score: 65,
          status: 'at_risk',
          lastAudit: '2024-01-20',
          riskAreas: ['Working Conditions', 'Environmental Compliance', 'Fair Wages']
        }
      ];
      return mockData;
    }
  });

  return (
    <FeatureLayout
      icon={HandHeart}
      title="Ethical Sourcing Advisor"
      description="AI-powered insights and recommendations for sustainable and ethical sourcing practices"
    >
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block p-3 rounded-full bg-primary/10"
          >
            <HandHeart className="h-12 w-12 text-primary" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold"
          >
            Ethical Sourcing Command Center
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Transform your supply chain with AI-driven insights, real-time monitoring,
            and automated compliance verification
          </motion.p>
        </div>

        {/* Impact Metrics */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {impactMetrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                  <div className="text-primary">{metric.icon}</div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-green-500">{metric.change}</span> {metric.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Sustainability Initiatives */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-primary" />
              Active Sustainability Initiatives
            </CardTitle>
            <CardDescription>
              Real-time tracking of sustainability and social impact programs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              {sustainabilityInitiatives.map((initiative) => (
                <Card key={initiative.title} className="bg-card">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="text-primary">{initiative.icon}</div>
                      <Badge variant="outline" className="bg-green-100 text-green-800">
                        {initiative.status}
                      </Badge>
                    </div>
                    <h3 className="font-semibold mb-2">{initiative.title}</h3>
                    <div className="space-y-2 text-sm">
                      {Object.entries(initiative.metrics).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-muted-foreground capitalize">{key}</span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="suppliers">Supplier Assessment</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Supply Chain Overview</CardTitle>
                <CardDescription>
                  Real-time visibility into your ethical sourcing network
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="font-semibold mb-4">Global Impact</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Carbon Footprint</span>
                            <span className="text-sm text-green-600">-28%</span>
                          </div>
                          <Progress value={72} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Fair Labor</span>
                            <span className="text-sm text-green-600">94%</span>
                          </div>
                          <Progress value={94} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Local Communities</span>
                            <span className="text-sm text-green-600">88%</span>
                          </div>
                          <Progress value={88} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="font-semibold mb-4">Supply Chain Health</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                            <span>Verified Suppliers</span>
                          </div>
                          <span className="font-medium">1,240+</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Factory className="h-5 w-5 text-primary" />
                            <span>Production Facilities</span>
                          </div>
                          <span className="font-medium">890</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Building2 className="h-5 w-5 text-primary" />
                            <span>Distribution Centers</span>
                          </div>
                          <span className="font-medium">156</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="suppliers" className="space-y-6">
            <div className="grid gap-4">
              {supplierAssessments?.map((supplier) => (
                <Card key={supplier.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h3 className="font-medium">{supplier.name}</h3>
                        <div className="flex items-center gap-2">
                          <Progress value={supplier.score} className="w-32 h-2" />
                          <span className="text-sm text-muted-foreground">
                            {supplier.score}% Compliant
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge 
                          variant={supplier.status === 'compliant' ? 'default' : 'destructive'}
                          className="capitalize"
                        >
                          {supplier.status}
                        </Badge>
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground">Risk Areas:</p>
                      <div className="flex gap-2 mt-2">
                        {supplier.riskAreas.map((area) => (
                          <Badge key={area} variant="secondary">{area}</Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Dashboard</CardTitle>
                <CardDescription>
                  Real-time monitoring of ethical sourcing compliance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card className="bg-green-50 dark:bg-green-900/10">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold">Labor Standards</h3>
                          <Badge variant="secondary">96% Compliant</Badge>
                        </div>
                        <Progress value={96} className="h-2" />
                      </CardContent>
                    </Card>
                    <Card className="bg-blue-50 dark:bg-blue-900/10">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold">Environmental</h3>
                          <Badge variant="secondary">92% Compliant</Badge>
                        </div>
                        <Progress value={92} className="h-2" />
                      </CardContent>
                    </Card>
                    <Card className="bg-purple-50 dark:bg-purple-900/10">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold">Fair Trade</h3>
                          <Badge variant="secondary">89% Compliant</Badge>
                        </div>
                        <Progress value={89} className="h-2" />
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5" />
                  AI-Powered Insights
                </CardTitle>
                <CardDescription>
                  Strategic recommendations and risk analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <Card className="bg-primary/5">
                    <CardContent className="pt-6">
                      <h3 className="font-semibold mb-4">Optimization Opportunities</h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-1" />
                          <div>
                            <p className="font-medium">Supply Chain Resilience</p>
                            <p className="text-sm text-muted-foreground">
                              Diversify supplier base in Southeast Asia to reduce regional concentration risk
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
                          <div>
                            <p className="font-medium">Carbon Reduction</p>
                            <p className="text-sm text-muted-foreground">
                              Implement local sourcing strategy to reduce transportation emissions by 35%
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-1" />
                          <div>
                            <p className="font-medium">Worker Well-being</p>
                            <p className="text-sm text-muted-foreground">
                              Expand worker training programs to improve skill development and satisfaction
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </FeatureLayout>
  );
};

export default EthicalSourcingAdvisor;
