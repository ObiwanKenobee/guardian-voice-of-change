import { Building2, Shield, TrendingUp, FileCheck, Users } from "lucide-react";
import { FeatureLayout } from "@/components/workspace/features/FeatureLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GovernanceOverview } from "@/components/workspace/governance/GovernanceOverview";
import { PolicyList } from "@/components/workspace/governance/PolicyList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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
      description="Drive ethical leadership, regulatory excellence, and sustainable business success."
    >
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid grid-cols-4 lg:grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="policies">Policies</TabsTrigger>
          <TabsTrigger value="risk">Risk Management</TabsTrigger>
          <TabsTrigger value="esg">ESG Integration</TabsTrigger>
          <TabsTrigger value="automation" className="hidden lg:block">Automation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">98%</div>
                <p className="text-xs text-muted-foreground">+2% from last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Risk Level</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Low</div>
                <p className="text-xs text-muted-foreground">Based on {riskAssessments?.length || 0} assessments</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Policies</CardTitle>
                <FileCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">3 pending reviews</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Stakeholder Trust</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">High</div>
                <p className="text-xs text-muted-foreground">Based on recent surveys</p>
              </CardContent>
            </Card>
          </div>
          <GovernanceOverview />
        </TabsContent>
        
        <TabsContent value="policies" className="space-y-4">
          <PolicyList />
        </TabsContent>
        
        <TabsContent value="risk" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Risk Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riskAssessments?.slice(0, 5).map((assessment) => (
                  <div key={assessment.id} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">{assessment.title}</p>
                      <p className="text-sm text-muted-foreground">{assessment.description}</p>
                    </div>
                    <div className="text-sm">
                      Risk Level: <span className="font-medium">{assessment.risk_level}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="esg" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>ESG Compliance Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceData?.slice(0, 5).map((check) => (
                  <div key={check.id} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">{check.framework}</p>
                      <p className="text-sm text-muted-foreground">{check.requirement}</p>
                    </div>
                    <div className="text-sm">
                      Status: <span className="font-medium">{check.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="automation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Governance Automation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Automated governance processes and compliance monitoring tools.
                </p>
                {/* Placeholder for future automation features */}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </FeatureLayout>
  );
};

export default CorporateGovernance;