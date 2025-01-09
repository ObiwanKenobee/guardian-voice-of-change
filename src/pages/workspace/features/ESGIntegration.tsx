import { Globe } from "lucide-react";
import { FeatureLayout } from "@/components/workspace/features/FeatureLayout";

const ESGIntegration = () => {
  return (
    <FeatureLayout
      icon={Globe}
      title="Global ESG Integration"
      description="Unite Fortune 500 supply chains with seamless ESG data integration. Real-time monitoring and automated compliance checks."
    >
      <div className="space-y-4">
        <p>ESG Integration features and dashboard will be implemented here.</p>
      </div>
    </FeatureLayout>
  );
};

export default ESGIntegration;