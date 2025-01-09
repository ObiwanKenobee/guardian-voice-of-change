import { Map } from "lucide-react";
import { FeatureLayout } from "@/components/workspace/features/FeatureLayout";
import { SupplyChainMapView } from "@/components/workspace/supply-chain/SupplyChainMapView";
import { SupplyChainControls } from "@/components/workspace/supply-chain/SupplyChainControls";

const SupplyChainMap = () => {
  return (
    <FeatureLayout
      icon={Map}
      title="Supply Chain Mapping"
      description="Visualize your supply chain with real-time tracking and blockchain verification for transparency."
    >
      <div className="space-y-4 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <SupplyChainControls />
        <SupplyChainMapView />
      </div>
    </FeatureLayout>
  );
};

export default SupplyChainMap;