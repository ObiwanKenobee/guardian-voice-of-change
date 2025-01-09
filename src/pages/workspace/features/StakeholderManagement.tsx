import { Users } from "lucide-react";
import { FeatureLayout } from "@/components/workspace/features/FeatureLayout";

const StakeholderManagement = () => {
  return (
    <FeatureLayout
      icon={Users}
      title="Stakeholder Management"
      description="Simplify relationships with suppliers, regulators, and stakeholders using integrated collaboration tools."
    >
      <div className="space-y-4">
        <p>Stakeholder Management dashboard content coming soon...</p>
      </div>
    </FeatureLayout>
  );
};

export default StakeholderManagement;