import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Shield, Lock, Activity, AlertTriangle, Server, Cloud, Database, UserCheck, Network } from "lucide-react";
import { motion } from "framer-motion";
import { FeatureLayout } from "@/components/workspace/features/FeatureLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";

type SecurityIncidentType = Database['public']['Tables']['security_incidents']['Row'];
type SecurityIncidentInsert = Database['public']['Tables']['security_incidents']['Insert'];

interface SecurityIncidentForm {
  title: string;
  description: string | null;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'investigating' | 'resolved' | 'closed';
  category: 'breach' | 'malware' | 'phishing' | 'ddos' | 'other';
  affected_systems: string | null;
  mitigation_steps: string | null;
}

const Cybersecurity = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<SecurityIncidentType | null>(null);
  const { toast } = useToast();

  const form = useForm<SecurityIncidentForm>({
    defaultValues: {
      title: "",
      description: "",
      severity: "low",
      status: "open",
      category: "other",
      affected_systems: "",
      mitigation_steps: ""
    }
  });

  const { data: incidents, isLoading, refetch } = useQuery({
    queryKey: ['security-incidents'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('security_incidents')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const handleSubmit = async (values: SecurityIncidentForm) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const submissionData: SecurityIncidentInsert = {
        ...values,
        user_id: user.id,
        reported_by: user.id
      };

      if (selectedIncident) {
        const { error } = await supabase
          .from('security_incidents')
          .update(submissionData)
          .eq('id', selectedIncident.id);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Security incident updated successfully"
        });
      } else {
        const { error } = await supabase
          .from('security_incidents')
          .insert(submissionData);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Security incident reported successfully"
        });
      }
      setIsDialogOpen(false);
      refetch();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while saving the incident"
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('security_incidents')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({
        title: "Success",
        description: "Security incident deleted successfully"
      });
      refetch();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete security incident"
      });
    }
  };

  return (
    <FeatureLayout
      icon={Shield}
      title="Cybersecurity Command Center"
      description="Advanced security monitoring and incident response platform"
    >
      <div className="space-y-6">
        {/* Security Overview Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Threat Level</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Progress value={12} className="h-2" />
                <p className="text-2xl font-bold text-green-500">Low</p>
                <p className="text-xs text-muted-foreground">Current security status</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Threats</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-2xl font-bold">3</p>
                <p className="text-xs text-muted-foreground">Being monitored</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">System Health</CardTitle>
              <Server className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Progress value={98} className="h-2" />
                <p className="text-2xl font-bold">98%</p>
                <p className="text-xs text-muted-foreground">Systems operational</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Compliance</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Compliant
                </Badge>
                <p className="text-xs text-muted-foreground mt-2">
                  All standards met
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="incidents" className="space-y-4">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="incidents">Incidents</TabsTrigger>
              <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <Button onClick={() => {
              setSelectedIncident(null);
              form.reset();
              setIsDialogOpen(true);
            }}>
              Report Incident
            </Button>
          </div>

          <TabsContent value="incidents">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {incidents?.map((incident) => (
                <motion.div
                  key={incident.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{incident.title}</CardTitle>
                          <CardDescription>{incident.category}</CardDescription>
                        </div>
                        <Badge className={
                          incident.severity === 'critical' ? 'bg-red-100 text-red-800' :
                          incident.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                          incident.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }>
                          {incident.severity}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-sm">{incident.description}</p>
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedIncident(incident);
                              form.reset({
                                title: incident.title,
                                description: incident.description,
                                severity: incident.severity,
                                status: incident.status,
                                category: incident.category,
                                affected_systems: incident.affected_systems,
                                mitigation_steps: incident.mitigation_steps
                              });
                              setIsDialogOpen(true);
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(incident.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="monitoring">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Network Activity</CardTitle>
                  <CardDescription>Real-time network monitoring</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["Firewall", "IDS/IPS", "VPN", "DNS"].map((system) => (
                      <div key={system} className="flex justify-between items-center">
                        <span>{system}</span>
                        <Badge variant="outline" className="bg-green-100">Active</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                  <CardDescription>Infrastructure status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Database", icon: Database, status: "Optimal" },
                      { name: "Cloud Services", icon: Cloud, status: "Good" },
                      { name: "Network", icon: Network, status: "Optimal" },
                      { name: "Security", icon: Lock, status: "Good" }
                    ].map((system) => (
                      <div key={system.name} className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <system.icon className="h-4 w-4" />
                          <span>{system.name}</span>
                        </div>
                        <Badge variant="outline" className="bg-green-100">{system.status}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Incident Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {selectedIncident ? "Edit Security Incident" : "Report Security Incident"}
              </DialogTitle>
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
                        <Input placeholder="Incident title" {...field} />
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
                        <Textarea placeholder="Detailed description of the incident" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="severity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Severity</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select severity" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="critical">Critical</SelectItem>
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
                            <SelectItem value="breach">Data Breach</SelectItem>
                            <SelectItem value="malware">Malware</SelectItem>
                            <SelectItem value="phishing">Phishing</SelectItem>
                            <SelectItem value="ddos">DDoS</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="affected_systems"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Affected Systems</FormLabel>
                      <FormControl>
                        <Input placeholder="List affected systems" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mitigation_steps"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mitigation Steps</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Steps taken to mitigate the incident" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button type="submit">
                    {selectedIncident ? "Update" : "Report"} Incident
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

export default Cybersecurity;
