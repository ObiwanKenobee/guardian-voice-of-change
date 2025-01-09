import { motion } from "framer-motion";
import { Globe, LineChart, Shield, Database } from "lucide-react";
import { RealTimeMonitoring } from "@/components/workspace/esg/RealTimeMonitoring";
import { ComplianceChecks } from "@/components/workspace/esg/ComplianceChecks";
import { Benchmarking } from "@/components/workspace/esg/Benchmarking";
import { FeatureLayout } from "@/components/workspace/features/FeatureLayout";

const ESGIntegration = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <FeatureLayout
        icon={Globe}
        title="ESG Integration Dashboard"
        description="Monitor and manage your Environmental, Social, and Governance metrics in real-time."
      >
        <div className="grid gap-6">
          <RealTimeMonitoring />
          <div className="grid gap-6 md:grid-cols-2">
            <ComplianceChecks />
            <Benchmarking />
          </div>
        </div>
      </FeatureLayout>
    </motion.div>
  );
};

export default ESGIntegration;