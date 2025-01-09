import { Cloud } from "lucide-react";
import { FeatureLayout } from "@/components/workspace/features/FeatureLayout";

const CloudInfrastructure = () => {
  return (
    <FeatureLayout
      icon={Cloud}
      title="Cloud Infrastructure"
      description="Enterprise-grade cloud infrastructure ensures global coverage with 99.99% uptime SLA."
    >
      <div className="space-y-4">
        <p>Cloud Infrastructure dashboard content coming soon...</p>
      </div>
    </FeatureLayout>
  );
};

export default CloudInfrastructure;