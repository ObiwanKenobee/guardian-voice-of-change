import { Activity } from "lucide-react";
import { FeatureLayout } from "@/components/workspace/features/FeatureLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnalyticsHeader } from "@/components/workspace/analytics/AnalyticsHeader";
import { PerformanceAlert } from "@/components/workspace/analytics/PerformanceAlert";
import { StatCards } from "@/components/workspace/analytics/StatCards";
import { PerformanceChart } from "@/components/workspace/analytics/charts/PerformanceChart";
import { SensorChart } from "@/components/workspace/analytics/charts/SensorChart";
import { MetricsCharts } from "@/components/workspace/analytics/charts/MetricsCharts";
import { CustomMetrics } from "@/components/workspace/analytics/CustomMetrics";

const PerformanceAnalytics = () => {
  return (
    <FeatureLayout
      icon={Activity}
      title="Performance Analytics"
      description="Gain actionable insights into your conservation and ethical supply chain efforts."
    >
      <div className="space-y-6">
        <AnalyticsHeader />
        <PerformanceAlert />
        <StatCards />

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
            <TabsTrigger value="custom">Custom Metrics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <PerformanceChart />
          </TabsContent>
          
          <TabsContent value="details" className="space-y-4">
            <SensorChart />
            <MetricsCharts />
          </TabsContent>
          
          <TabsContent value="comparison" className="space-y-4">
            <PerformanceChart />
            <MetricsCharts />
          </TabsContent>

          <TabsContent value="custom" className="space-y-4">
            <CustomMetrics />
          </TabsContent>
        </Tabs>
      </div>
    </FeatureLayout>
  );
};

export default PerformanceAnalytics;