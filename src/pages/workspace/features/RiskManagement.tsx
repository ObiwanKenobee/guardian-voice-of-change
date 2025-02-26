
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AlertTriangle, Plus, Trash2, FileEdit, Shield, ChartLine, Globe, UserCheck, Target } from "lucide-react";
import { FeatureLayout } from "@/components/workspace/features/FeatureLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

interface RiskAssessment {
  id: string;
  title: string;
  description: string;
  risk_level: string;
  impact_score: number;
  probability_score: number;
  mitigation_plan: string;
  status: string;
  category: string;
  due_date: string;
}

interface RiskFormValues {
  title: string;
  description: string;
  risk_level: string;
  impact_score: string;
  probability_score: string;
  mitigation_plan: string;
  category: string;
  status: string;
  due_date: string;
}

const RiskManagement = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRisk, setSelectedRisk] = useState<RiskAssessment | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();

  const form = useForm<RiskFormValues>({
    defaultValues: {
      title: "",
      description: "",
      risk_level: "low",
      impact_score: "1",
      probability_score: "1",
      mitigation_plan: "",
      category: "operational",
      status: "pending",
      due_date: new Date().toISOString().split('T')[0]
    }
  });

  const { data: risks, isLoading, refetch } = useQuery({
    queryKey: ['risk-assessments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('risk_assessments')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as RiskAssessment[];
    }
  });

  const handleSubmit = async (values: RiskFormValues) => {
    try {
      const submissionData = {
        ...values,
        impact_score: Number(values.impact_score),
        probability_score: Number(values.probability_score)
      };

      if (selectedRisk) {
        const { error } = await supabase
          .from('risk_assessments')
          .update(submissionData)
          .eq('id', selectedRisk.id);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Risk assessment updated successfully"
        });
      } else {
        const { error } = await supabase
          .from('risk_assessments')
          .insert([submissionData]);
        
        if (error) throw error;
        toast({
          title: "Success",
          description: "Risk assessment created successfully"
        });
      }
      setIsDialogOpen(false);
      refetch();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while saving the risk assessment"
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('risk_assessments')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({
        title: "Success",
        description: "Risk assessment deleted successfully"
      });
      refetch();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete risk assessment"
      });
    }
  };

  const getRiskScore = (risk: RiskAssessment) => {
    return (risk.impact_score * risk.probability_score) / 25 * 100;
  };

  const getOverallRiskScore = () => {
    if (!risks?.length) return 0;
    const totalScore = risks.reduce((acc, risk) => acc + getRiskScore(risk), 0);
    return Math.round(totalScore / risks.length);
  };

  const handleEditButtonClick = (risk: RiskAssessment) => {
    setSelectedRisk(risk);
    form.reset({
      title: risk.title,
      description: risk.description,
      risk_level: risk.risk_level,
      impact_score: String(risk.impact_score),
      probability_score: String(risk.probability_score),
      mitigation_plan: risk.mitigation_plan,
      category: risk.category,
      status: risk.status,
      due_date: risk.due_date
    });
    setIsDialogOpen(true);
  };

  return (
    <FeatureLayout
      icon={AlertTriangle}
      title="Risk Management"
      description="Comprehensive risk assessment and mitigation platform"
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
                <Progress value={getOverallRiskScore()} className="h-2" />
                <p className="text-2xl font-bold">{getOverallRiskScore()}/100</p>
                <p className="text-xs text-muted-foreground">Overall risk exposure</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Risks</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-2xl font-bold">
                  {risks?.filter(risk => risk.status === 'active').length || 0}
                </p>
                <p className="text-xs text-muted-foreground">Requiring attention</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Coverage</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-2xl font-bold">92%</p>
                <p className="text-xs text-muted-foreground">Risk areas monitored</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Mitigation Rate</CardTitle>
              <ChartLine className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  87% Effective
                </Badge>
                <p className="text-xs text-muted-foreground mt-2">
                  Risk control success rate
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="assessments">Risk Matrix</TabsTrigger>
            <TabsTrigger value="mitigation">Mitigation</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Risk Assessments</CardTitle>
                  <CardDescription>Manage and monitor risk assessments</CardDescription>
                </div>
                <Button onClick={() => {
                  setSelectedRisk(null);
                  form.reset();
                  setIsDialogOpen(true);
                }}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Assessment
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {isLoading ? (
                    <p>Loading risk assessments...</p>
                  ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {risks?.map((risk) => (
                        <motion.div
                          key={risk.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <Card className="relative group">
                            <CardContent className="p-6">
                              <div className="space-y-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h3 className="font-semibold">{risk.title}</h3>
                                    <p className="text-sm text-muted-foreground">{risk.category}</p>
                                  </div>
                                  <Badge className={
                                    risk.risk_level === 'high' 
                                      ? 'bg-red-100 text-red-800' 
                                      : risk.risk_level === 'medium'
                                      ? 'bg-yellow-100 text-yellow-800'
                                      : 'bg-green-100 text-green-800'
                                  }>
                                    {risk.risk_level}
                                  </Badge>
                                </div>
                                
                                <p className="text-sm">{risk.description}</p>
                                
                                <div className="space-y-2">
                                  <div className="text-sm">
                                    <span className="font-medium">Impact Score:</span> {risk.impact_score}/5
                                  </div>
                                  <div className="text-sm">
                                    <span className="font-medium">Probability Score:</span> {risk.probability_score}/5
                                  </div>
                                </div>

                                <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      handleEditButtonClick(risk);
                                    }}
                                  >
                                    <FileEdit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDelete(risk.id)}
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

          <TabsContent value="assessments">
            <Card>
              <CardHeader>
                <CardTitle>Risk Assessment Matrix</CardTitle>
                <CardDescription>Visualization of risk probability and impact</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm font-medium">Impact Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((level) => (
                          <div key={level} className="flex items-center gap-2">
                            <span className="w-4">{level}</span>
                            <Progress 
                              value={risks?.filter(r => r.impact_score === level).length || 0} 
                              max={risks?.length || 1} 
                              className="h-2"
                            />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm font-medium">Probability Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((level) => (
                          <div key={level} className="flex items-center gap-2">
                            <span className="w-4">{level}</span>
                            <Progress 
                              value={risks?.filter(r => r.probability_score === level).length || 0} 
                              max={risks?.length || 1} 
                              className="h-2"
                            />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mitigation">
            <Card>
              <CardHeader>
                <CardTitle>Risk Mitigation Strategies</CardTitle>
                <CardDescription>Active risk control measures and their effectiveness</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {risks?.filter(risk => risk.mitigation_plan).map((risk) => (
                    <Card key={risk.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-semibold">{risk.title}</h3>
                            <p className="text-sm text-muted-foreground">{risk.category}</p>
                          </div>
                          <Badge variant="outline">{risk.status}</Badge>
                        </div>
                        <p className="text-sm mb-4">{risk.mitigation_plan}</p>
                        <Progress 
                          value={getRiskScore(risk)} 
                          className="h-2 mb-2" 
                        />
                        <p className="text-xs text-muted-foreground">
                          Risk reduction progress
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Risk Analytics Dashboard</CardTitle>
                <CardDescription>Advanced risk analysis and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm font-medium">Category Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {['operational', 'financial', 'strategic', 'external'].map((category) => {
                          const count = risks?.filter(r => r.category === category).length || 0;
                          const percentage = risks?.length ? (count / risks.length) * 100 : 0;
                          
                          return (
                            <div key={category} className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="capitalize">{category}</span>
                                <span>{Math.round(percentage)}%</span>
                              </div>
                              <Progress value={percentage} />
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm font-medium">Risk Status Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {['active', 'mitigated', 'monitoring', 'closed'].map((status) => {
                          const count = risks?.filter(r => r.status === status).length || 0;
                          const percentage = risks?.length ? (count / risks.length) * 100 : 0;
                          
                          return (
                            <div key={status} className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="capitalize">{status}</span>
                                <span>{count} risks</span>
                              </div>
                              <Progress value={percentage} />
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Risk Assessment Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {selectedRisk ? "Edit Risk Assessment" : "New Risk Assessment"}
              </DialogTitle>
              <DialogDescription>
                {selectedRisk 
                  ? "Update the details of this risk assessment."
                  : "Create a new risk assessment entry."}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Risk assessment title" {...field} />
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
                        <Textarea placeholder="Detailed description of the risk" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
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
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="impact_score"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Impact Score (1-5)</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select impact score" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[1, 2, 3, 4, 5].map((score) => (
                              <SelectItem key={score} value={score.toString()}>
                                {score}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="probability_score"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Probability Score (1-5)</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select probability score" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[1, 2, 3, 4, 5].map((score) => (
                              <SelectItem key={score} value={score.toString()}>
                                {score}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="mitigation_plan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mitigation Plan</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Detailed plan for risk mitigation" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button type="submit">
                    {selectedRisk ? "Update" : "Create"} Assessment
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

export default RiskManagement;
