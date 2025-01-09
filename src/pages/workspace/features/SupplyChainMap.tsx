import { Map } from "lucide-react";
import { FeatureLayout } from "@/components/workspace/features/FeatureLayout";

const SupplyChainMap = () => {
  return (
    <FeatureLayout
      icon={Map}
      title="Supply Chain Mapping"
      description="Visualize your supply chain with real-time tracking and blockchain verification for transparency."
    >
      <div className="space-y-4">
        <p>Supply Chain Map dashboard content coming soon...</p>
      </div>
    </FeatureLayout>
  );
};

export default SupplyChainMap;