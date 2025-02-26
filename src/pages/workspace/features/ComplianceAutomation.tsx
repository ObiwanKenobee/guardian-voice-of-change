import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ClipboardCheck, Shield, FileCheck, Bell, BarChart3, Plus, Trash2, Edit2 } from "lucide-react";
import { FeatureLayout } from "@/components/workspace/features/FeatureLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

interface ComplianceRule {
  id: string;
  name: string;
  description: string;
  framework: string;
  rule_type: string;
  frequency: string;
  status: string;
  last_run_at: string | null;
}

interface ComplianceRuleDB {
  id: string;
  name: string;
  description: string;
  framework: string;
  rule_type: string;
  frequency: string;
  status: string;
  last_run_at: string | null;
  created_at: string;
  updated_at: string;
  user_id: string;
  criteria: any;
  next_run_at: string | null;
}

const ComplianceAutomation = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRule, setSelectedRule] = useState<ComplianceRule | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      framework: "iso27001",
      rule_type: "monitoring",
      frequency: "daily",
      status: "active"
    }
  });

  const { data: rules, isLoading, refetch } = useQuery({
    queryKey: ['compliance-rules'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('compliance_automation_rules')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as ComplianceRule[];
    }
  });

  const handleSubmit = async (values: any) => {
    try {
      if (selectedRule) {
        const { error } = await supabase
          .from('compliance_automation_rules')
          .update(values)
          .eq('id', selectedRule.id);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Compliance rule updated successfully"
        });
      } else {
        const { error } = await supabase
          .from('compliance_automation_rules')
          .insert([values]);
        
        if (error) throw error;
        toast({
          title: "Success",
          description: "Compliance rule created successfully"
        });
      }
      setIsDialogOpen(false);
      refetch();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while saving the compliance rule"
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('compliance_automation_rules')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({
        title: "Success",
        description: "Compliance rule deleted successfully"
      });
      refetch();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete compliance rule"
      });
    }
  };

  const getComplianceScore = () => {
    if (!rules?.length) return 0;
    const activeRules = rules.filter(rule => rule.status === 'active').length;
    return Math.round((activeRules / rules.length) * 100);
  };

  return (
    <FeatureLayout
      icon={ClipboardCheck}
      title="Compliance Automation"
      description="Automated compliance monitoring and reporting across multiple frameworks"
    >
      <div className="space-y-6">
        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Progress value={getComplianceScore()} className="h-2" />
                <p className="text-2xl font-bold">{getComplianceScore()}%</p>
                <p className="text-xs text-muted-foreground">Overall compliance rate</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Rules</CardTitle>
              <FileCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-2xl font-bold">
                  {rules?.filter(rule => rule.status === 'active').length || 0}
                </p>
                <p className="text-xs text-muted-foreground">Automated checks</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Alerts</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Badge variant="destructive">
                  {rules?.filter(rule => rule.status === 'failed').length || 0} Issues
                </Badge>
                <p className="text-xs text-muted-foreground mt-2">
                  Requiring attention
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Frameworks</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-2xl font-bold">4</p>
                <p className="text-xs text-muted-foreground">
                  Integrated compliance frameworks
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="rules">Automation Rules</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Compliance Rules</CardTitle>
                  <CardDescription>Manage automated compliance checks</CardDescription>
                </div>
                <Button onClick={() => {
                  setSelectedRule(null);
                  form.reset();
                  setIsDialogOpen(true);
                }}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Rule
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {isLoading ? (
                    <p>Loading compliance rules...</p>
                  ) : (
                    <div className="grid gap-4 md:grid-cols-2">
                      {rules?.map((rule) => (
                        <motion.div
                          key={rule.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <Card className="relative group">
                            <CardContent className="p-6">
                              <div className="space-y-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h3 className="font-semibold">{rule.name}</h3>
                                    <p className="text-sm text-muted-foreground">{rule.framework}</p>
                                  </div>
                                  <Badge className={
                                    rule.status === 'active' 
                                      ? 'bg-green-100 text-green-800' 
                                      : 'bg-red-100 text-red-800'
                                  }>
                                    {rule.status}
                                  </Badge>
                                </div>
                                
                                <p className="text-sm">{rule.description}</p>
                                
                                <div className="space-y-2">
                                  <div className="text-sm">
                                    <span className="font-medium">Type:</span> {rule.rule_type}
                                  </div>
                                  <div className="text-sm">
                                    <span className="font-medium">Frequency:</span> {rule.frequency}
                                  </div>
                                </div>

                                <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      setSelectedRule(rule);
                                      form.reset({
                                        name: rule.name,
                                        description: rule.description,
                                        framework: rule.framework,
                                        rule_type: rule.rule_type,
                                        frequency: rule.frequency,
                                        status: rule.status
                                      });
                                      setIsDialogOpen(true);
                                    }}
                                  >
                                    <Edit2 className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDelete(rule.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rules">
            <Card>
              <CardHeader>
                <CardTitle>Automation Rules Matrix</CardTitle>
                <CardDescription>Overview of rule categories and frameworks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {['ISO 27001', 'GDPR', 'HIPAA', 'SOX'].map((framework) => (
                    <Card key={framework}>
                      <CardHeader>
                        <CardTitle className="text-lg">{framework}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {['Monitoring', 'Reporting', 'Alert', 'Remediation'].map((type) => (
                            <div key={type} className="flex justify-between items-center">
                              <span className="text-sm">{type}</span>
                              <Badge variant="outline">
                                {rules?.filter(r => 
                                  r.framework.toLowerCase() === framework.toLowerCase() && 
                                  r.rule_type.toLowerCase() === type.toLowerCase()
                                ).length || 0}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monitoring">
            <Card>
              <CardHeader>
                <CardTitle>Real-time Monitoring</CardTitle>
                <CardDescription>Live compliance status and alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {rules?.filter(rule => rule.status === 'active').map((rule) => (
                    <Card key={rule.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-center mb-4">
                          <div>
                            <h3 className="font-semibold">{rule.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              Last check: {rule.last_run_at ? new Date(rule.last_run_at).toLocaleString() : 'Never'}
                            </p>
                          </div>
                          <Badge variant="outline">{rule.frequency}</Badge>
                        </div>
                        <Progress 
                          value={Math.random() * 100} 
                          className="h-2" 
                        />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Reports</CardTitle>
                <CardDescription>Generated reports and analytics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Monthly Compliance Summary",
                      date: "2024-03-01",
                      framework: "All Frameworks"
                    },
                    {
                      title: "GDPR Compliance Report",
                      date: "2024-02-28",
                      framework: "GDPR"
                    },
                    {
                      title: "Security Controls Assessment",
                      date: "2024-02-15",
                      framework: "ISO 27001"
                    }
                  ].map((report) => (
                    <div key={report.title} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{report.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          Generated: {new Date(report.date).toLocaleDateString()}
                        </p>
                      </div>
                      <Button variant="outline">Download</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Rule Creation/Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {selectedRule ? "Edit Compliance Rule" : "New Compliance Rule"}
              </DialogTitle>
              <DialogDescription>
                {selectedRule 
                  ? "Update the details of this compliance rule."
                  : "Create a new automated compliance rule."}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rule Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter rule name" {...field} />
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
                        <Textarea placeholder="Describe the compliance rule" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="framework"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Framework</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select framework" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="iso27001">ISO 27001</SelectItem>
                            <SelectItem value="gdpr">GDPR</SelectItem>
                            <SelectItem value="hipaa">HIPAA</SelectItem>
                            <SelectItem value="sox">SOX</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="rule_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rule Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="monitoring">Monitoring</SelectItem>
                            <SelectItem value="reporting">Reporting</SelectItem>
                            <SelectItem value="alert">Alert</SelectItem>
                            <SelectItem value="remediation">Remediation</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="frequency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Frequency</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="hourly">Hourly</SelectItem>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="paused">Paused</SelectItem>
                            <SelectItem value="draft">Draft</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <DialogFooter>
                  <Button type="submit">
                    {selectedRule ? "Update" : "Create"} Rule
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

export default ComplianceAutomation;
