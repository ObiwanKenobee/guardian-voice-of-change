import { Building2, BookOpen } from "lucide-react";
import { FeatureLayout } from "@/components/workspace/features/FeatureLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GovernanceOverview } from "@/components/workspace/governance/GovernanceOverview";
import { PolicyList } from "@/components/workspace/governance/PolicyList";

const CorporateGovernance = () => {
  return (
    <FeatureLayout
      icon={Building2}
      title="Corporate Governance"
      description="Manage organizational policies, compliance, and board-level reporting."
    >
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="policies">Policies</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <GovernanceOverview />
        </TabsContent>
        
        <TabsContent value="policies" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Corporate Policies</h2>
              <p className="text-muted-foreground">
                View and manage organizational policies and procedures
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4" />
              <span className="text-sm text-muted-foreground">4 Active Policies</span>
            </div>
          </div>
          <PolicyList />
        </TabsContent>
      </Tabs>
    </FeatureLayout>
  );
};

export default CorporateGovernance;