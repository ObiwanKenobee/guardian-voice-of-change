import { Fingerprint } from "lucide-react";
import { FeatureLayout } from "@/components/workspace/features/FeatureLayout";

const BiometricSecurity = () => {
  return (
    <FeatureLayout
      icon={Fingerprint}
      title="Biometric Security"
      description="World ID technology provides state-of-the-art biometric verification for secure identity management."
    >
      <div className="space-y-4">
        <p>Biometric Security dashboard content coming soon...</p>
      </div>
    </FeatureLayout>
  );
};

export default BiometricSecurity;