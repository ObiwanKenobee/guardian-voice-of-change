
import { motion } from "framer-motion";
import { Globe, LineChart, Shield, Database, Leaf, Link2, Users, BarChart3, Zap, Plus, Edit, Trash2 } from "lucide-react";
import { RealTimeMonitoring } from "@/components/workspace/esg/RealTimeMonitoring";
import { ComplianceChecks } from "@/components/workspace/esg/ComplianceChecks";
import { Benchmarking } from "@/components/workspace/esg/Benchmarking";
import { FeatureLayout } from "@/components/workspace/features/FeatureLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useESG } from "@/hooks/use-esg";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import type { Initiative } from "@/types/esg";

const features = [
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Real-Time ESG Data Monitoring",
    description: "Live tracking of carbon emissions, resource consumption, and ethical sourcing across global operations.",
    badge: "Enterprise"
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Automated ESG Compliance",
    description: "Seamless adherence to global sustainability frameworks (GRI, SASB, TCFD, CDP, SEC Climate Disclosure).",
    badge: "Premium"
  },
  {
    icon: <Link2 className="h-6 w-6" />,
    title: "Supply Chain Sustainability",
    description: "Blockchain-verified tracking of sustainable supply chain practices and supplier audits.",
    badge: "New"
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Stakeholder Engagement",
    description: "Interactive dashboards for real-time ESG impact visualization and industry comparisons.",
  },
  {
    icon: <Database className="h-6 w-6" />,
    title: "Enterprise Integration",
    description: "Seamless connectivity with SAP, Oracle, Microsoft Dynamics, and enterprise ERP systems.",
    badge: "Fortune 500"
  },
  {
    icon: <Leaf className="h-6 w-6" />,
    title: "Sustainability Intelligence",
    description: "IoT-powered smart monitoring for emissions tracking and environmental impact reduction.",
  }
];

interface InitiativeFormData {
  title: string;
  description: string;
  status: Initiative['status'];
  startDate?: string;
  endDate?: string;
  budget?: number;
  impactScore?: number;
}

const ESGIntegration = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedInitiative, setSelectedInitiative] = useState<Initiative | null>(null);
  const [formData, setFormData] = useState<InitiativeFormData>({
    title: '',
    description: '',
    status: 'planned'
  });

  const { initiatives, createInitiative, updateInitiative, deleteInitiative } = useESG();

  const handleCreate = async () => {
    try {
      await createInitiative.mutateAsync({
        title: formData.title,
        description: formData.description,
        status: formData.status,
        start_date: formData.startDate,
        end_date: formData.endDate,
        budget: formData.budget,
        impact_score: formData.impactScore
      });
      setIsCreateOpen(false);
      resetForm();
      toast.success("Initiative created successfully");
    } catch (error) {
      toast.error("Failed to create initiative");
    }
  };

  const handleEdit = async () => {
    if (!selectedInitiative) return;
    try {
      await updateInitiative.mutateAsync({
        id: selectedInitiative.id,
        initiative: {
          title: formData.title,
          description: formData.description,
          status: formData.status,
          start_date: formData.startDate,
          end_date: formData.endDate,
          budget: formData.budget,
          impact_score: formData.impactScore
        }
      });
      setIsEditOpen(false);
      resetForm();
      toast.success("Initiative updated successfully");
    } catch (error) {
      toast.error("Failed to update initiative");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteInitiative.mutateAsync(id);
      toast.success("Initiative deleted successfully");
    } catch (error) {
      toast.error("Failed to delete initiative");
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      status: 'planned'
    });
    setSelectedInitiative(null);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <FeatureLayout
        icon={Globe}
        title="Global ESG Integration"
        description="Empowering organizations with AI-driven ESG integration, real-time compliance tracking, and sustainability performance benchmarking."
      >
        <div className="space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">
              Driving Sustainability & Compliance
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Transform your ESG strategy with real-time monitoring, automated compliance, and AI-powered insights.
            </p>
          </div>

          {/* Initiatives Management */}
          <Card className="border-primary/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <CardTitle>ESG Initiatives</CardTitle>
                </div>
                <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Plus className="h-4 w-4" />
                      New Initiative
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New ESG Initiative</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <Input 
                        placeholder="Initiative Title"
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      />
                      <Textarea 
                        placeholder="Description"
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      />
                      <Select 
                        value={formData.status}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as Initiative['status'] }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="planned">Planned</SelectItem>
                          <SelectItem value="in_progress">In Progress</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="on_hold">On Hold</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="grid grid-cols-2 gap-4">
                        <Input 
                          type="date"
                          placeholder="Start Date"
                          value={formData.startDate}
                          onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                        />
                        <Input 
                          type="date"
                          placeholder="End Date"
                          value={formData.endDate}
                          onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <Input 
                          type="number"
                          placeholder="Budget"
                          value={formData.budget}
                          onChange={(e) => setFormData(prev => ({ ...prev, budget: parseFloat(e.target.value) }))}
                        />
                        <Input 
                          type="number"
                          placeholder="Impact Score (1-100)"
                          value={formData.impactScore}
                          onChange={(e) => setFormData(prev => ({ ...prev, impactScore: parseFloat(e.target.value) }))}
                        />
                      </div>
                      <Button onClick={handleCreate} className="w-full">Create Initiative</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {initiatives?.map((initiative) => (
                  <Card key={initiative.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{initiative.title}</h3>
                        <p className="text-sm text-muted-foreground">{initiative.description}</p>
                        <div className="flex gap-2 mt-2">
                          <Badge>{initiative.status}</Badge>
                          {initiative.budget && (
                            <Badge variant="outline">Budget: ${initiative.budget}</Badge>
                          )}
                          {initiative.impact_score && (
                            <Badge variant="outline">Impact: {initiative.impact_score}</Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedInitiative(initiative);
                            setFormData({
                              title: initiative.title,
                              description: initiative.description || '',
                              status: initiative.status,
                              startDate: initiative.start_date,
                              endDate: initiative.end_date,
                              budget: initiative.budget,
                              impactScore: initiative.impact_score
                            });
                            setIsEditOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(initiative.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Real-Time Monitoring Dashboard */}
          <Card className="border-primary/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <CardTitle>ESG Performance Dashboard</CardTitle>
                </div>
                <Badge variant="outline" className="bg-primary/10">Live Data</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <RealTimeMonitoring />
            </CardContent>
          </Card>

          {/* Features Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-primary">{feature.icon}</div>
                      {feature.badge && (
                        <Badge variant="outline" className="bg-primary/10">
                          {feature.badge}
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Compliance and Benchmarking Section */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <CardTitle>Compliance Monitoring</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ComplianceChecks />
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  <CardTitle>Industry Benchmarking</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <Benchmarking />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Edit Initiative Dialog */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit ESG Initiative</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <Input 
                placeholder="Initiative Title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              />
              <Textarea 
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              />
              <Select 
                value={formData.status}
                onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as Initiative['status'] }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="planned">Planned</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="on_hold">On Hold</SelectItem>
                </SelectContent>
              </Select>
              <div className="grid grid-cols-2 gap-4">
                <Input 
                  type="date"
                  placeholder="Start Date"
                  value={formData.startDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                />
                <Input 
                  type="date"
                  placeholder="End Date"
                  value={formData.endDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input 
                  type="number"
                  placeholder="Budget"
                  value={formData.budget}
                  onChange={(e) => setFormData(prev => ({ ...prev, budget: parseFloat(e.target.value) }))}
                />
                <Input 
                  type="number"
                  placeholder="Impact Score (1-100)"
                  value={formData.impactScore}
                  onChange={(e) => setFormData(prev => ({ ...prev, impactScore: parseFloat(e.target.value) }))}
                />
              </div>
              <Button onClick={handleEdit} className="w-full">Update Initiative</Button>
            </div>
          </DialogContent>
        </Dialog>
      </FeatureLayout>
    </motion.div>
  );
};

export default ESGIntegration;
