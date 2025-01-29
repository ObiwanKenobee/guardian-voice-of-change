import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, ClipboardCheck } from "lucide-react";
import { RiskManagementDashboard } from "./RiskManagementDashboard";
import { ComplianceAutomationDashboard } from "./ComplianceAutomationDashboard";

const EnterpriseIntegration = () => {
  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Enterprise Integration</h2>
          <p className="text-muted-foreground">
            Manage risk and compliance across your enterprise systems
          </p>
        </div>
      </div>

      <Tabs defaultValue="risk" className="space-y-4">
        <TabsList>
          <TabsTrigger value="risk" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Risk Management
          </TabsTrigger>
          <TabsTrigger value="compliance" className="flex items-center gap-2">
            <ClipboardCheck className="h-4 w-4" />
            Compliance Automation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="risk" className="space-y-4">
          <RiskManagementDashboard />
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <ComplianceAutomationDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnterpriseIntegration;