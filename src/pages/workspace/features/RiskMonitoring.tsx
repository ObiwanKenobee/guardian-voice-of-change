
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AlertTriangle, Shield, LineChart, Users, Building2, Globe, FileCheck, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FeatureLayout } from "@/components/workspace/features/FeatureLayout";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface RiskAlert {
  id: string;
  title: string;
  description: string;
  risk_level: string;
  category: string;
  status: string;
  created_at: string;
}

const RiskMonitoring = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<RiskAlert | null>(null);

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      risk_level: "low",
      category: "operational",
      status: "active"
    }
  });

  const { data: riskAlerts, isLoading, refetch } = useQuery({
    queryKey: ['risk-assessments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('risk_assessments')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as RiskAlert[];
    }
  });

  const handleSubmit = async (values: any) => {
    try {
      if (selectedAlert) {
        await supabase
          .from('risk_assessments')
          .update(values)
          .eq('id', selectedAlert.id);
        toast.success("Risk alert updated successfully");
      } else {
        await supabase
          .from('risk_assessments')
          .insert([values]);
        toast.success("Risk alert created successfully");
      }
      setDialogOpen(false);
      refetch();
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await supabase
        .from('risk_assessments')
        .delete()
        .eq('id', id);
      toast.success("Risk alert deleted successfully");
      refetch();
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const getRiskScore = () => {
    if (!riskAlerts?.length) return 0;
    const lowRiskCount = riskAlerts.filter(risk => risk.risk_level === 'low').length;
    return Math.round((lowRiskCount / riskAlerts.length) * 100);
  };

  return (
    <FeatureLayout
      icon={AlertTriangle}
      title="Risk Monitoring"
      description="Real-time monitoring and assessment of organizational risks"
    >
      <div className="space-y-6">
        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Progress value={getRiskScore()} className="h-2" />
                <p className="text-2xl font-bold">{getRiskScore()}/100</p>
                <p className="text-xs text-muted-foreground">Overall risk rating</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-2xl font-bold">{riskAlerts?.filter(r => r.status === 'active').length || 0}</p>
                <p className="text-xs text-muted-foreground">Across all categories</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Monitored Areas</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-2xl font-bold">24</p>
                <p className="text-xs text-muted-foreground">Global regions</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Mitigation Rate</CardTitle>
              <LineChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  94% Success
                </Badge>
                <p className="text-xs text-muted-foreground mt-2">
                  Risk mitigation effectiveness
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="alerts">Risk Alerts</TabsTrigger>
            <TabsTrigger value="mitigation">Mitigation Plans</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Active Risk Alerts</CardTitle>
                  <CardDescription>Current risk landscape and active threats</CardDescription>
                </div>
                <Button onClick={() => {
                  setSelectedAlert(null);
                  form.reset();
                  setDialogOpen(true);
                }}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Alert
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {isLoading ? (
                    <p>Loading alerts...</p>
                  ) : (
                    riskAlerts?.map((alert) => (
                      <motion.div
                        key={alert.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-all"
                      >
                        <div className="space-y-1">
                          <p className="font-medium">{alert.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {alert.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge
                            variant={alert.risk_level === 'high' ? 'destructive' : 'outline'}
                          >
                            {alert.risk_level.toUpperCase()}
                          </Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedAlert(alert);
                              form.reset(alert);
                              setDialogOpen(true);
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(alert.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Risk Categories</CardTitle>
                <CardDescription>Analysis by risk category and severity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    {
                      category: "Operational Risks",
                      count: 12,
                      trend: "↓",
                      score: 82
                    },
                    {
                      category: "Financial Risks",
                      count: 8,
                      trend: "↑",
                      score: 76
                    },
                    {
                      category: "Strategic Risks",
                      count: 15,
                      trend: "→",
                      score: 89
                    },
                    {
                      category: "External Risks",
                      count: 9,
                      trend: "↓",
                      score: 91
                    }
                  ].map((risk) => (
                    <Card key={risk.category}>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-semibold">{risk.category}</h3>
                          <Badge variant="outline">{risk.count} Alerts</Badge>
                        </div>
                        <Progress value={risk.score} className="mb-2" />
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-muted-foreground">
                            Risk Score: {risk.score}%
                          </p>
                          <span className="text-sm font-medium">
                            Trend: {risk.trend}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mitigation" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Mitigation Plans</CardTitle>
                <CardDescription>Ongoing risk mitigation strategies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Supply Chain Resilience",
                      progress: 75,
                      status: "On Track"
                    },
                    {
                      title: "Cybersecurity Enhancement",
                      progress: 60,
                      status: "In Progress"
                    },
                    {
                      title: "Regulatory Compliance",
                      progress: 90,
                      status: "Near Complete"
                    },
                    {
                      title: "Environmental Risk Management",
                      progress: 45,
                      status: "Ongoing"
                    }
                  ].map((plan) => (
                    <div key={plan.title} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">{plan.title}</h3>
                        <Badge>{plan.status}</Badge>
                      </div>
                      <Progress value={plan.progress} className="mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Progress: {plan.progress}%
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Risk Analytics</CardTitle>
                <CardDescription>Advanced risk analysis and forecasting</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm font-medium">
                        Risk Distribution
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {[
                          { level: "High", percentage: 15 },
                          { level: "Medium", percentage: 35 },
                          { level: "Low", percentage: 50 }
                        ].map((risk) => (
                          <div key={risk.level} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>{risk.level}</span>
                              <span>{risk.percentage}%</span>
                            </div>
                            <Progress value={risk.percentage} />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm font-medium">
                        Trend Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { metric: "Risk Velocity", value: "↑ 2.3%", status: "caution" },
                          { metric: "Risk Exposure", value: "↓ 4.7%", status: "positive" },
                          { metric: "Control Effectiveness", value: "↑ 6.1%", status: "positive" }
                        ].map((trend) => (
                          <div key={trend.metric} className="flex justify-between items-center">
                            <span className="text-sm">{trend.metric}</span>
                            <Badge
                              variant={trend.status === 'positive' ? 'outline' : 'destructive'}
                            >
                              {trend.value}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Risk Alert Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{selectedAlert ? 'Edit' : 'Create'} Risk Alert</DialogTitle>
              <DialogDescription>
                {selectedAlert 
                  ? 'Update the details of this risk alert.'
                  : 'Add a new risk alert to the monitoring system.'}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Risk alert title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Detailed description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="risk_level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Risk Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select risk level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="operational">Operational</SelectItem>
                          <SelectItem value="financial">Financial</SelectItem>
                          <SelectItem value="strategic">Strategic</SelectItem>
                          <SelectItem value="external">External</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">
                    {selectedAlert ? 'Update' : 'Create'} Alert
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </FeatureLayout>
  );
};

export default RiskMonitoring;
