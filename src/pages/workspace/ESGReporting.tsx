
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BarChart2, FileText, Globe2, LightbulbIcon, Target, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ReportGeneration } from "@/components/workspace/esg/reporting/ReportGeneration";
import { BenchmarkingTools } from "@/components/workspace/esg/reporting/BenchmarkingTools";
import { ComplianceAlerts } from "@/components/workspace/esg/reporting/ComplianceAlerts";
import { SDGDashboard } from "@/components/workspace/esg/reporting/SDGDashboard";
import { ScenarioAnalysis } from "@/components/workspace/esg/reporting/ScenarioAnalysis";

const reportingMetrics = [
  {
    icon: <FileText className="h-5 w-5 text-primary" />,
    title: "Reports Generated",
    value: "124",
    change: "+28%",
    period: "vs. last quarter"
  },
  {
    icon: <TrendingUp className="h-5 w-5 text-primary" />,
    title: "ESG Score",
    value: "85/100",
    change: "+12%",
    period: "YoY improvement"
  },
  {
    icon: <Target className="h-5 w-5 text-primary" />,
    title: "SDG Alignment",
    value: "92%",
    change: "+15%",
    period: "Target achievement"
  }
];

const frameworkSupport = [
  {
    name: "GRI Standards",
    status: "Integrated",
    description: "Comprehensive sustainability reporting framework",
    type: "Core"
  },
  {
    name: "SASB Standards",
    status: "Integrated",
    description: "Industry-specific sustainability metrics",
    type: "Industry"
  },
  {
    name: "TCFD Framework",
    status: "Active",
    description: "Climate-related financial disclosures",
    type: "Climate"
  }
];

const ESGReporting = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col gap-6 p-6">
      {/* Header Section */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate('/workspace/dashboard')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <h1 className="text-3xl font-bold tracking-tight">ESG Reporting & Compliance AI</h1>
          <p className="text-muted-foreground text-lg">
            Transform sustainability reporting with AI-driven insights and automated compliance
          </p>
        </motion.div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {reportingMetrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {metric.title}
                </CardTitle>
                {metric.icon}
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-500 font-medium">{metric.change}</span> {metric.period}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Framework Support */}
      <Card className="bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe2 className="h-5 w-5 text-primary" />
            Supported ESG Frameworks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {frameworkSupport.map((framework) => (
              <Card key={framework.name} className="bg-card">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{framework.name}</h3>
                    <Badge variant="outline">{framework.type}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {framework.description}
                  </p>
                  <Badge 
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    {framework.status}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Features Tabs */}
      <Tabs defaultValue="reports" className="flex-1">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Report Generation
          </TabsTrigger>
          <TabsTrigger value="benchmarking" className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4" />
            Benchmarking
          </TabsTrigger>
          <TabsTrigger value="compliance" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Compliance
          </TabsTrigger>
          <TabsTrigger value="sdg" className="flex items-center gap-2">
            <Globe2 className="h-4 w-4" />
            SDG Tracking
          </TabsTrigger>
          <TabsTrigger value="scenarios" className="flex items-center gap-2">
            <LightbulbIcon className="h-4 w-4" />
            Scenario Analysis
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="reports" className="mt-6 space-y-4">
          <ReportGeneration />
        </TabsContent>
        
        <TabsContent value="benchmarking" className="mt-6 space-y-4">
          <BenchmarkingTools />
        </TabsContent>
        
        <TabsContent value="compliance" className="mt-6 space-y-4">
          <ComplianceAlerts />
        </TabsContent>
        
        <TabsContent value="sdg" className="mt-6 space-y-4">
          <SDGDashboard />
        </TabsContent>
        
        <TabsContent value="scenarios" className="mt-6 space-y-4">
          <ScenarioAnalysis />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ESGReporting;
