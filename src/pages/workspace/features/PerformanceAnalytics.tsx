import { TrendingUp } from "lucide-react";
import { FeatureLayout } from "@/components/workspace/features/FeatureLayout";

const PerformanceAnalytics = () => {
  return (
    <FeatureLayout
      icon={TrendingUp}
      title="Performance Analytics"
      description="Benchmark performance against industry standards with detailed metrics and actionable insights."
    >
      <div className="space-y-4">
        <p>Performance Analytics dashboard content coming soon...</p>
      </div>
    </FeatureLayout>
  );
};

export default PerformanceAnalytics;