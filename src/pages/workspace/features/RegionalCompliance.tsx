import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Globe2, AlertTriangle, CheckCircle2, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { FeatureLayout } from "@/components/workspace/features/FeatureLayout";
import { RegionComplianceTable } from "@/components/workspace/compliance/regional/RegionComplianceTable";
import { RegionComplianceMap } from "@/components/workspace/compliance/regional/RegionComplianceMap";
import { ComplianceAlerts } from "@/components/workspace/compliance/ComplianceAlerts";
import { supabase } from "@/integrations/supabase/client";

const RegionalCompliance = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const { data: complianceData, isLoading } = useQuery({
    queryKey: ['regional-compliance'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('compliance_automation_rules')
        .select('*')
        .eq('rule_type', 'regional')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const getComplianceScore = () => {
    if (!complianceData?.length) return 0;
    const compliantRules = complianceData.filter(rule => rule.status === 'compliant').length;
    return Math.round((compliantRules / complianceData.length) * 100);
  };

  return (
    <FeatureLayout
      icon={Globe2}
      title="Regional Compliance"
      description="Monitor and manage compliance requirements across different regions and jurisdictions"
    >
      <div className="space-y-6">
        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Overall Compliance
              </CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Progress value={getComplianceScore()} className="h-2" />
                <p className="text-2xl font-bold">{getComplianceScore()}%</p>
                <p className="text-xs text-muted-foreground">
                  Across all regions
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Active Regions
              </CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-2xl font-bold">
                  {complianceData?.length || 0}
                </p>
                <p className="text-xs text-muted-foreground">
                  Monitored jurisdictions
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Actions
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Badge variant="destructive">
                  {complianceData?.filter(rule => rule.status === 'non_compliant').length || 0} Issues
                </Badge>
                <p className="text-xs text-muted-foreground mt-2">
                  Requiring attention
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="map">Compliance Map</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <RegionComplianceTable data={complianceData} isLoading={isLoading} />
          </TabsContent>

          <TabsContent value="map" className="space-y-4">
            <RegionComplianceMap data={complianceData} isLoading={isLoading} />
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4">
            <ComplianceAlerts />
          </TabsContent>
        </Tabs>
      </div>
    </FeatureLayout>
  );
};

export default RegionalCompliance;