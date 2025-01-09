import { useEffect, useState } from "react";
import { Shield, AlertTriangle, Globe, FileCheck } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { FeatureLayout } from "@/components/workspace/features/FeatureLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";

interface ComplianceCheck {
  id: string;
  framework: string;
  requirement: string;
  status: 'compliant' | 'non_compliant' | 'pending';
  last_checked_at: string;
  details: any;
}

interface RiskMetric {
  id: string;
  metric_name: string;
  metric_value: number;
  metric_type: string;
  timestamp: string;
}

const DueDiligence = () => {
  const { data: complianceData, isLoading: isLoadingCompliance } = useQuery({
    queryKey: ['compliance-checks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('esg_compliance_checks')
        .select('*')
        .order('last_checked_at', { ascending: false });
      
      if (error) throw error;
      return data as ComplianceCheck[];
    }
  });

  const { data: riskMetrics, isLoading: isLoadingRisk } = useQuery({
    queryKey: ['risk-metrics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('analytics_metrics')
        .select('*')
        .eq('metric_type', 'risk')
        .order('timestamp', { ascending: false });
      
      if (error) throw error;
      return data as RiskMetric[];
    }
  });

  const getComplianceScore = () => {
    if (!complianceData?.length) return 0;
    const compliantChecks = complianceData.filter(check => check.status === 'compliant').length;
    return Math.round((compliantChecks / complianceData.length) * 100);
  };

  return (
    <FeatureLayout
      icon={Shield}
      title="Enhanced Due Diligence"
      description="Automate multi-jurisdictional compliance verification and risk monitoring."
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Compliance Score
              </CardTitle>
              <FileCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Progress value={getComplianceScore()} className="h-2" />
                <p className="text-2xl font-bold">{getComplianceScore()}%</p>
                <p className="text-xs text-muted-foreground">
                  Based on {complianceData?.length || 0} compliance checks
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Active Jurisdictions
              </CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-muted-foreground">
                  Across 3 continents
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Risk Level
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  Moderate
                </Badge>
                <p className="text-xs text-muted-foreground">
                  Based on current metrics
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="compliance" className="space-y-4">
          <TabsList>
            <TabsTrigger value="compliance">Compliance Checks</TabsTrigger>
            <TabsTrigger value="risk">Risk Monitoring</TabsTrigger>
            <TabsTrigger value="jurisdictions">Jurisdictions</TabsTrigger>
          </TabsList>

          <TabsContent value="compliance" className="space-y-4">
            <div className="grid gap-4">
              {isLoadingCompliance ? (
                <Card>
                  <CardContent className="p-6">
                    Loading compliance data...
                  </CardContent>
                </Card>
              ) : (
                complianceData?.map((check) => (
                  <Card key={check.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h3 className="font-medium">{check.framework}</h3>
                          <p className="text-sm text-muted-foreground">
                            {check.requirement}
                          </p>
                        </div>
                        <Badge
                          variant={check.status === 'compliant' ? 'default' : 'destructive'}
                        >
                          {check.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="risk" className="space-y-4">
            <div className="grid gap-4">
              {isLoadingRisk ? (
                <Card>
                  <CardContent className="p-6">
                    Loading risk metrics...
                  </CardContent>
                </Card>
              ) : (
                riskMetrics?.map((metric) => (
                  <Card key={metric.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h3 className="font-medium">{metric.metric_name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Last updated: {new Date(metric.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-2xl font-bold">
                          {metric.metric_value}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="jurisdictions" className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">European Union</h3>
                      <p className="text-sm text-muted-foreground">GDPR, CSRD Compliance</p>
                    </div>
                    <Badge variant="outline">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">United States</h3>
                      <p className="text-sm text-muted-foreground">SEC, CCPA Compliance</p>
                    </div>
                    <Badge variant="outline">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Singapore</h3>
                      <p className="text-sm text-muted-foreground">MAS Guidelines</p>
                    </div>
                    <Badge variant="outline">Active</Badge>
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

export default DueDiligence;