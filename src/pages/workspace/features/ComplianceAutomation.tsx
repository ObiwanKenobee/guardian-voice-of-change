import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ComplianceRuleForm } from "@/components/workspace/compliance/automation/ComplianceRuleForm";
import { RulesList } from "@/components/workspace/compliance/automation/RulesList";
import { FeatureLayout } from "@/components/workspace/features/FeatureLayout";
import { ClipboardCheck } from "lucide-react";

const ComplianceAutomation = () => {
  return (
    <FeatureLayout
      icon={ClipboardCheck}
      title="Compliance Automation"
      description="Monitor and report compliance across multiple regulatory frameworks—all fully automated."
    >
      <Tabs defaultValue="rules" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="rules">Active Rules</TabsTrigger>
          <TabsTrigger value="create">Create Rule</TabsTrigger>
        </TabsList>
        <TabsContent value="rules" className="mt-6">
          <RulesList />
        </TabsContent>
        <TabsContent value="create" className="mt-6">
          <ComplianceRuleForm />
        </TabsContent>
      </Tabs>
    </FeatureLayout>
  );
};

export default ComplianceAutomation;