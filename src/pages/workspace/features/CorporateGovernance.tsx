import { useState } from "react";
import { Building2, Shield, TrendingUp, FileCheck, Users, Globe } from "lucide-react";
import { FeatureLayout } from "@/components/workspace/features/FeatureLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { RealTimeMonitoring } from "@/components/workspace/esg/RealTimeMonitoring";
import { ComplianceChecks } from "@/components/workspace/esg/ComplianceChecks";
import { Benchmarking } from "@/components/workspace/esg/Benchmarking";

const CorporateGovernance = () => {
  const { data: complianceData } = useQuery({
    queryKey: ['compliance-checks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('esg_compliance_checks')
        .select('*')
        .order('last_checked_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const { data: riskAssessments } = useQuery({
    queryKey: ['risk-assessments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('risk_assessments')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  return (
    <FeatureLayout
      icon={Building2}
      title="Corporate Governance"
      description="Empowering organizations with AI-driven risk management, ESG integration, and automation."
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Compliance Score
              </CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Progress value={85} className="h-2" />
                <p className="text-2xl font-bold">85%</p>
                <p className="text-xs text-muted-foreground">
                  Based on {complianceData?.length || 0} checks
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Risk Level
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  Moderate
                </Badge>
                <p className="text-xs text-muted-foreground mt-2">
                  {riskAssessments?.length || 0} active assessments
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                ESG Score
              </CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Progress value={78} className="h-2" />
                <p className="text-2xl font-bold">78/100</p>
                <p className="text-xs text-muted-foreground">
                  +5 points this quarter
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Stakeholder Trust
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  High
                </Badge>
                <p className="text-xs text-muted-foreground mt-2">
                  Based on recent surveys
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="risk">Risk Management</TabsTrigger>
            <TabsTrigger value="esg">ESG Integration</TabsTrigger>
            <TabsTrigger value="automation">Automation</TabsTrigger>
            <TabsTrigger value="regulatory">Regulatory Hub</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Governance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complianceData?.slice(0, 3).map((check) => (
                    <div key={check.id} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">{check.framework}</p>
                        <p className="text-sm text-muted-foreground">{check.requirement}</p>
                      </div>
                      <Badge
                        variant={check.status === 'compliant' ? 'default' : 'destructive'}
                      >
                        {check.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="risk" className="space-y-4">
            <div className="grid gap-4">
              {riskAssessments?.slice(0, 3).map((assessment) => (
                <Card key={assessment.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h3 className="font-medium">{assessment.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {assessment.description}
                        </p>
                      </div>
                      <Badge
                        variant={assessment.risk_level === 'low' ? 'default' : 'destructive'}
                      >
                        {assessment.risk_level}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="esg" className="space-y-4">
            <div className="grid gap-6">
              <RealTimeMonitoring />
              <div className="grid gap-6 md:grid-cols-2">
                <ComplianceChecks />
                <Benchmarking />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="automation" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Governance Automation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">Automated Compliance Checks</p>
                      <p className="text-sm text-muted-foreground">Daily monitoring and alerts</p>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">Board Report Generation</p>
                      <p className="text-sm text-muted-foreground">Monthly reports automated</p>
                    </div>
                    <Badge>Scheduled</Badge>
                  </div>
                  <div className="flex items-center justify-between pb-2">
                    <div>
                      <p className="font-medium">Policy Enforcement</p>
                      <p className="text-sm text-muted-foreground">AI-driven monitoring</p>
                    </div>
                    <Badge variant="secondary">In Progress</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="regulatory" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Regulatory Intelligence Hub</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">GDPR Compliance</p>
                      <p className="text-sm text-muted-foreground">Data protection requirements</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Compliant</Badge>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">ESG Reporting Standards</p>
                      <p className="text-sm text-muted-foreground">Sustainability disclosures</p>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">In Review</Badge>
                  </div>
                  <div className="flex items-center justify-between pb-2">
                    <div>
                      <p className="font-medium">Financial Regulations</p>
                      <p className="text-sm text-muted-foreground">SEC requirements</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Compliant</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </FeatureLayout>
  );
};

export default CorporateGovernance;