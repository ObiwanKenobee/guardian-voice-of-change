import { ClipboardCheck } from "lucide-react";
import { FeatureLayout } from "@/components/workspace/features/FeatureLayout";

const ComplianceAutomation = () => {
  return (
    <FeatureLayout
      icon={ClipboardCheck}
      title="Compliance Automation"
      description="Monitor and report compliance across multiple regulatory frameworks—all fully automated."
    >
      <div className="space-y-4">
        <p>Compliance Automation dashboard content coming soon...</p>
      </div>
    </FeatureLayout>
  );
};

export default ComplianceAutomation;