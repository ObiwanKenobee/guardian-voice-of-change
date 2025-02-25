
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Shield, 
  AlertTriangle, 
  Users, 
  FileCheck, 
  MessageSquare, 
  Building2,
  Globe,
  Book,
  ChartBar,
  Calendar,
  Plus 
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { FeatureLayout } from "@/components/workspace/features/FeatureLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RiskAssessment {
  id: string;
  title: string;
  risk_level: string;
  description: string;
  impact_score: number;
  category: string;
  status: string;
}

const HumanRightsMonitor = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState<RiskAssessment | null>(null);

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      risk_level: "low",
      category: "human_rights",
      impact_score: 0,
      status: "active"
    }
  });

  const { data: riskAssessments, isLoading, refetch } = useQuery({
    queryKey: ['human-rights-risks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('risk_assessments')
        .select('*')
        .eq('category', 'human_rights')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as RiskAssessment[];
    }
  });

  const handleSubmit = async (values: any) => {
    try {
      if (selectedAssessment) {
        await supabase
          .from('risk_assessments')
          .update(values)
          .eq('id', selectedAssessment.id);
        toast.success("Assessment updated successfully");
      } else {
        await supabase
          .from('risk_assessments')
          .insert([values]);
        toast.success("Assessment created successfully");
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
      toast.success("Assessment deleted successfully");
      refetch();
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const getComplianceScore = () => {
    if (!riskAssessments?.length) return 0;
    const lowRiskCount = riskAssessments.filter(risk => risk.risk_level === 'low').length;
    return Math.round((lowRiskCount / riskAssessments.length) * 100);
  };

  return (
    <FeatureLayout
      icon={Shield}
      title="Human Rights Monitor"
      description="Comprehensive monitoring and automation for ethical supply chains and human rights compliance"
    >
      <div className="space-y-6">
        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Compliance Score
              </CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Progress value={getComplianceScore()} className="h-2" />
                <p className="text-2xl font-bold">{getComplianceScore()}%</p>
                <p className="text-xs text-muted-foreground">
                  Overall compliance rate
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Active Cases
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-2xl font-bold">
                  {riskAssessments?.filter(r => r.status === 'active').length || 0}
                </p>
                <p className="text-xs text-muted-foreground">
                  Cases requiring attention
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Communities Protected
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-2xl font-bold">12.5K+</p>
                <p className="text-xs text-muted-foreground">
                  People benefiting directly
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Policy Adherence
              </CardTitle>
              <FileCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  96% Compliance
                </Badge>
                <p className="text-xs text-muted-foreground mt-2">
                  Global standards met
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="assessments">Risk Assessments</TabsTrigger>
            <TabsTrigger value="training">Training & Education</TabsTrigger>
            <TabsTrigger value="reporting">Reporting</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Assessments</CardTitle>
                  <CardDescription>Latest human rights risk evaluations</CardDescription>
                </div>
                <Button onClick={() => {
                  setSelectedAssessment(null);
                  form.reset();
                  setDialogOpen(true);
                }}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Assessment
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {isLoading ? (
                    <p>Loading assessments...</p>
                  ) : (
                    riskAssessments?.map((assessment) => (
                      <motion.div
                        key={assessment.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-all"
                      >
                        <div className="space-y-1">
                          <p className="font-medium">{assessment.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {assessment.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge
                            variant={assessment.risk_level === 'high' ? 'destructive' : 'outline'}
                          >
                            {assessment.risk_level.toUpperCase()}
                          </Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedAssessment(assessment);
                              form.reset(assessment);
                              setDialogOpen(true);
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(assessment.id)}
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

          <TabsContent value="assessments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Risk Assessment Framework</CardTitle>
                <CardDescription>
                  Comprehensive evaluation of human rights risks across operations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  {['Supply Chain', 'Labor Practices', 'Community Impact', 'Environmental Justice'].map((area) => (
                    <Card key={area}>
                      <CardHeader>
                        <CardTitle className="text-lg">{area}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Progress value={Math.random() * 100} className="mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Assessment completion status
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="training" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Educational Resources</CardTitle>
                <CardDescription>Training materials and awareness programs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    {
                      title: "Human Rights Fundamentals",
                      progress: 85,
                      participants: 234
                    },
                    {
                      title: "Supply Chain Ethics",
                      progress: 92,
                      participants: 156
                    },
                    {
                      title: "Cultural Sensitivity",
                      progress: 78,
                      participants: 189
                    }
                  ].map((course) => (
                    <Card key={course.title}>
                      <CardContent className="pt-6">
                        <h3 className="font-semibold">{course.title}</h3>
                        <Progress value={course.progress} className="my-2" />
                        <p className="text-sm text-muted-foreground">
                          {course.participants} participants
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reporting" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Reporting & Documentation</CardTitle>
                <CardDescription>
                  Generate and manage human rights compliance reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    "Monthly Compliance Summary",
                    "Stakeholder Impact Report",
                    "Risk Assessment Documentation",
                    "Training Completion Records"
                  ].map((report) => (
                    <div key={report} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileCheck className="h-5 w-5 text-muted-foreground" />
                        <span>{report}</span>
                      </div>
                      <Button variant="outline">Generate Report</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Assessment Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{selectedAssessment ? 'Edit' : 'Create'} Risk Assessment</DialogTitle>
              <DialogDescription>
                {selectedAssessment 
                  ? 'Update the details of this risk assessment.'
                  : 'Add a new human rights risk assessment.'}
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
                        <Input placeholder="Assessment title" {...field} />
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
                  name="impact_score"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Impact Score (0-100)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="0" 
                          max="100" 
                          {...field}
                          onChange={e => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">
                    {selectedAssessment ? 'Update' : 'Create'} Assessment
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

export default HumanRightsMonitor;
