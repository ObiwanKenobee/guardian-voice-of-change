import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ComplianceOverview } from "@/components/workspace/compliance/ComplianceOverview";
import { ComplianceReports } from "@/components/workspace/compliance/ComplianceReports";
import { ComplianceAudits } from "@/components/workspace/compliance/ComplianceAudits";

const Compliance = () => {
  return (
    <div className="h-full flex flex-col gap-6 p-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Compliance Dashboard</h1>
        <p className="text-muted-foreground text-lg">
          Monitor and manage your environmental compliance requirements
        </p>
      </div>

      <Tabs defaultValue="overview" className="flex-1">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="audits">Audits</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <ComplianceOverview />
        </TabsContent>
        
        <TabsContent value="reports" className="h-full">
          <ComplianceReports />
        </TabsContent>
        
        <TabsContent value="audits" className="h-full">
          <ComplianceAudits />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Compliance;