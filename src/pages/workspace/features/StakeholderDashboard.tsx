import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { FeatureLayout } from "@/components/workspace/features/FeatureLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, BarChart3, Globe, Shield, MessageSquare } from "lucide-react";

interface StakeholderMetrics {
  totalStakeholders: number;
  activeEngagements: number;
  complianceScore: number;
  recentInteractions: number;
}

const StakeholderDashboard = () => {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ["stakeholder-metrics"],
    queryFn: async () => {
      const { data: partners } = await supabase
        .from("partners")
        .select("*")
        .eq("status", "active");

      const { data: collaborationMetrics } = await supabase
        .from("collaboration_metrics")
        .select("*")
        .order("timestamp", { ascending: false })
        .limit(30);

      return {
        totalStakeholders: partners?.length || 0,
        activeEngagements: collaborationMetrics?.length || 0,
        complianceScore: 85, // This would come from a real calculation
        recentInteractions: collaborationMetrics?.filter(m => 
          new Date(m.timestamp) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        ).length || 0
      } as StakeholderMetrics;
    }
  });

  return (
    <FeatureLayout
      icon={Users}
      title="Stakeholder Management"
      description="Build trust and drive sustainable success through effective stakeholder engagement"
    >
      <div className="space-y-6">
        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Stakeholders</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics?.totalStakeholders || 0}</div>
              <p className="text-xs text-muted-foreground">Across all categories</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Engagements</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics?.activeEngagements || 0}</div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics?.complianceScore || 0}%</div>
              <p className="text-xs text-muted-foreground">ESG standards met</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Recent Interactions</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics?.recentInteractions || 0}</div>
              <p className="text-xs text-muted-foreground">Past 7 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="mapping" className="space-y-4">
          <TabsList>
            <TabsTrigger value="mapping">Stakeholder Mapping</TabsTrigger>
            <TabsTrigger value="engagement">Engagement Tracking</TabsTrigger>
            <TabsTrigger value="analytics">Predictive Analytics</TabsTrigger>
            <TabsTrigger value="compliance">ESG & Compliance</TabsTrigger>
          </TabsList>

          <TabsContent value="mapping" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Stakeholder Map</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center bg-muted rounded-lg">
                  <p className="text-muted-foreground">Stakeholder mapping visualization will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="engagement" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Engagement Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center bg-muted rounded-lg">
                  <p className="text-muted-foreground">Engagement tracking data will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Predictive Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center bg-muted rounded-lg">
                  <p className="text-muted-foreground">AI-powered predictive analytics will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>ESG Compliance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center bg-muted rounded-lg">
                  <p className="text-muted-foreground">ESG and compliance metrics will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </FeatureLayout>
  );
};

export default StakeholderDashboard;