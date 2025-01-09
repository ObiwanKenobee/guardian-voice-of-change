import { AlertTriangle } from "lucide-react";
import { FeatureLayout } from "@/components/workspace/features/FeatureLayout";

const RiskManagement = () => {
  return (
    <FeatureLayout
      icon={AlertTriangle}
      title="Risk Management"
      description="Stay ahead with predictive analytics and early warning systems for comprehensive risk assessment."
    >
      <div className="space-y-4">
        <p>Risk Management dashboard content coming soon...</p>
      </div>
    </FeatureLayout>
  );
};

export default RiskManagement;