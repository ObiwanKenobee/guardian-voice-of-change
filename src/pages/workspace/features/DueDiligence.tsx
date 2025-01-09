import { Shield } from "lucide-react";
import { FeatureLayout } from "@/components/workspace/features/FeatureLayout";

const DueDiligence = () => {
  return (
    <FeatureLayout
      icon={Shield}
      title="Enhanced Due Diligence"
      description="Automate multi-jurisdictional compliance verification and risk monitoring."
    >
      <div className="space-y-4">
        <p>Due Diligence dashboard content coming soon...</p>
      </div>
    </FeatureLayout>
  );
};

export default DueDiligence;