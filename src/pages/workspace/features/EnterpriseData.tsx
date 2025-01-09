import { Database } from "lucide-react";
import { FeatureLayout } from "@/components/workspace/features/FeatureLayout";

const EnterpriseData = () => {
  return (
    <FeatureLayout
      icon={Database}
      title="Enterprise Data Integration"
      description="Integrate seamlessly with existing enterprise systems like SAP, Oracle, or custom ERP solutions."
    >
      <div className="space-y-4">
        <p>Enterprise Data Integration dashboard content coming soon...</p>
      </div>
    </FeatureLayout>
  );
};

export default EnterpriseData;