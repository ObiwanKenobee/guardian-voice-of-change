import { Users } from "lucide-react";
import { FeatureLayout } from "@/components/workspace/features/FeatureLayout";
import { StakeholderDashboard } from "@/components/workspace/stakeholder/StakeholderDashboard";

const StakeholderManagement = () => {
  return (
    <FeatureLayout
      icon={Users}
      title="Stakeholder Management"
      description="Manage relationships with suppliers, regulators, and stakeholders using integrated collaboration tools."
    >
      <StakeholderDashboard />
    </FeatureLayout>
  );
};

export default StakeholderManagement;