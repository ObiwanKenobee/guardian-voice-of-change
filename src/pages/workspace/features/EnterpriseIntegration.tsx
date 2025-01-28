import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Network, 
  Shield, 
  Globe, 
  Database,
  AlertTriangle,
  CheckCircle2,
  ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { FeatureLayout } from "@/components/workspace/features/FeatureLayout";
import { EnterpriseSystemsList } from "@/components/workspace/enterprise/EnterpriseSystemsList";
import { ComplianceOverview } from "@/components/workspace/compliance/ComplianceOverview";
import { RiskAssessmentForm } from "@/components/workspace/risk/RiskAssessmentForm";

const EnterpriseIntegration = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const { data: metrics, isLoading } = useQuery({
    queryKey: ['enterprise-metrics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('analytics_metrics')
        .select('*')
        .eq('metric_type', 'enterprise')
        .order('timestamp', { ascending: false })
        .limit(5);

      if (error) throw error;
      return data;
    }
  });

  return (
    <FeatureLayout
      icon={Network}
      title="Enterprise Integration"
      description="Scale your operations with seamless enterprise system integration and compliance management"
    >
      <div className="space-y-6">
        {/* Integration Status Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Connected Systems
              </CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold">12</div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle2 className="mr-1 h-4 w-4 text-green-500" />
                  All systems operational
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Global Coverage
              </CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold">20+</div>
                <div className="text-sm text-muted-foreground">
                  Countries with active operations
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Compliance Score
              </CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Progress value={92} className="h-2" />
                <div className="text-2xl font-bold">92%</div>
                <div className="text-sm text-muted-foreground">
                  Global compliance rating
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="systems">Connected Systems</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="risk">Risk Management</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Enterprise Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Active Integrations</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">SAP ERP</Badge>
                        <Badge variant="secondary">Oracle Cloud</Badge>
                        <Badge variant="secondary">Salesforce</Badge>
                        <Badge variant="secondary">Microsoft Dynamics</Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Recent Alerts</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm">New compliance requirement detected</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span className="text-sm">SAP integration updated successfully</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="systems">
            <EnterpriseSystemsList />
          </TabsContent>

          <TabsContent value="compliance">
            <ComplianceOverview />
          </TabsContent>

          <TabsContent value="risk">
            <Card>
              <CardHeader>
                <CardTitle>Risk Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <RiskAssessmentForm />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </FeatureLayout>
  );
};

export default EnterpriseIntegration;