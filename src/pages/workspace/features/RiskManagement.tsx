import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AlertTriangle, Plus, Trash2, FileEdit } from "lucide-react";
import { FeatureLayout } from "@/components/workspace/features/FeatureLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { RiskAssessmentForm } from "@/components/workspace/risk/RiskAssessmentForm";
import { useToast } from "@/hooks/use-toast";

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

const RiskManagement = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRisk, setSelectedRisk] = useState<RiskAssessment | null>(null);
  const { toast } = useToast();

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

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('risk_assessments')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete risk assessment"
      });
    } else {
      toast({
        title: "Success",
        description: "Risk assessment deleted successfully"
      });
      refetch();
    }
  };

  const getRiskLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <FeatureLayout
      icon={AlertTriangle}
      title="Risk Management"
      description="Monitor and assess potential risks across your organization"
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Risk Assessments</h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Assessment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>
                  {selectedRisk ? "Edit Risk Assessment" : "New Risk Assessment"}
                </DialogTitle>
              </DialogHeader>
              <RiskAssessmentForm
                initialData={selectedRisk}
                onSuccess={() => {
                  setIsDialogOpen(false);
                  setSelectedRisk(null);
                  refetch();
                }}
              />
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div>Loading risk assessments...</div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {risks?.map((risk) => (
              <Card key={risk.id} className="relative group">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{risk.title}</h3>
                        <p className="text-sm text-muted-foreground">{risk.category}</p>
                      </div>
                      <Badge className={getRiskLevelColor(risk.risk_level)}>
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
                          setSelectedRisk(risk);
                          setIsDialogOpen(true);
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
            ))}
          </div>
        )}
      </div>
    </FeatureLayout>
  );
};

export default RiskManagement;