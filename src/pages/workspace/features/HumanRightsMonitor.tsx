import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, AlertTriangle, Users, FileCheck, MessageSquare, Building2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { FeatureLayout } from "@/components/workspace/features/FeatureLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

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

  const { data: riskAssessments, isLoading } = useQuery({
    queryKey: ['human-rights-risks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('risk_assessments')
        .select('*')
        .eq('category', 'human_rights')
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (error) throw error;
      return data as RiskAssessment[];
    }
  });

  const getComplianceScore = () => {
    if (!riskAssessments?.length) return 0;
    const lowRiskCount = riskAssessments.filter(risk => risk.risk_level === 'low').length;
    return Math.round((lowRiskCount / riskAssessments.length) * 100);
  };

  return (
    <FeatureLayout
      icon={Shield}
      title="Human Rights Monitor"
      description="Real-time monitoring and compliance automation for ethical supply chains"
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
                  Based on recent assessments
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Active Alerts
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-2xl font-bold">
                  {riskAssessments?.filter(r => r.status === 'active').length || 0}
                </p>
                <p className="text-xs text-muted-foreground">
                  Requiring attention
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Suppliers Monitored
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-2xl font-bold">247</p>
                <p className="text-xs text-muted-foreground">
                  Across 15 countries
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Compliance Rate
              </CardTitle>
              <FileCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  92% Compliant
                </Badge>
                <p className="text-xs text-muted-foreground mt-2">
                  Above industry average
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="risk-monitoring">Risk Monitoring</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="reporting">Reporting</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Risk Assessments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {isLoading ? (
                    <p>Loading assessments...</p>
                  ) : (
                    riskAssessments?.map((assessment) => (
                      <div
                        key={assessment.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="space-y-1">
                          <p className="font-medium">{assessment.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {assessment.description}
                          </p>
                        </div>
                        <Badge
                          variant={assessment.risk_level === 'high' ? 'destructive' : 'outline'}
                        >
                          {assessment.risk_level.toUpperCase()}
                        </Badge>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="risk-monitoring">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">AI-Powered Risk Detection</h3>
                    <Button variant="outline">Configure Alerts</Button>
                  </div>
                  <p className="text-muted-foreground">
                    Real-time monitoring and AI analysis of potential human rights violations
                    across your supply chain network.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Compliance Automation</h3>
                    <Button variant="outline">View Reports</Button>
                  </div>
                  <p className="text-muted-foreground">
                    Automated tracking and verification of compliance with international
                    human rights standards and regulations.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reporting">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Whistleblower System</h3>
                    <Button variant="outline">View Reports</Button>
                  </div>
                  <p className="text-muted-foreground">
                    Secure and anonymous reporting system for workers to report violations
                    and unsafe conditions.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </FeatureLayout>
  );
};

export default HumanRightsMonitor;