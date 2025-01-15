import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReportGeneration } from "@/components/workspace/esg/reporting/ReportGeneration";
import { BenchmarkingTools } from "@/components/workspace/esg/reporting/BenchmarkingTools";
import { ComplianceAlerts } from "@/components/workspace/esg/reporting/ComplianceAlerts";
import { SDGDashboard } from "@/components/workspace/esg/reporting/SDGDashboard";
import { ScenarioAnalysis } from "@/components/workspace/esg/reporting/ScenarioAnalysis";

const ESGReporting = () => {
  return (
    <div className="h-full flex flex-col gap-6 p-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">ESG Reporting & Compliance AI</h1>
        <p className="text-muted-foreground text-lg">
          Automated ESG reporting and compliance monitoring with AI-driven insights
        </p>
      </div>

      <Tabs defaultValue="reports" className="flex-1">
        <TabsList>
          <TabsTrigger value="reports">Report Generation</TabsTrigger>
          <TabsTrigger value="benchmarking">Benchmarking</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Alerts</TabsTrigger>
          <TabsTrigger value="sdg">SDG Dashboard</TabsTrigger>
          <TabsTrigger value="scenarios">Scenario Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="reports" className="mt-6">
          <ReportGeneration />
        </TabsContent>
        
        <TabsContent value="benchmarking" className="mt-6">
          <BenchmarkingTools />
        </TabsContent>
        
        <TabsContent value="compliance" className="mt-6">
          <ComplianceAlerts />
        </TabsContent>
        
        <TabsContent value="sdg" className="mt-6">
          <SDGDashboard />
        </TabsContent>
        
        <TabsContent value="scenarios" className="mt-6">
          <ScenarioAnalysis />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ESGReporting;