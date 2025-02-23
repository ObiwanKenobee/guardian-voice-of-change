
import { useState } from "react";
import { Leaf, BarChart3, Globe, AlertTriangle, ArrowUpDown, TreePine, Wind, Droplets, Factory, Car, Building2 } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CarbonDataForm } from "@/components/workspace/carbon-footprint/CarbonDataForm";
import { CarbonDataList } from "@/components/workspace/carbon-footprint/CarbonDataList";
import { CarbonAnalytics } from "@/components/workspace/carbon-footprint/CarbonAnalytics";
import { CarbonReports } from "@/components/workspace/carbon-footprint/CarbonReports";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const emissionCategories = [
  {
    icon: <Factory className="h-6 w-6" />,
    title: "Industrial Emissions",
    value: "14.2",
    change: "-12%",
    unit: "tCO₂e",
  },
  {
    icon: <Car className="h-6 w-6" />,
    title: "Transportation",
    value: "8.7",
    change: "-8%",
    unit: "tCO₂e",
  },
  {
    icon: <Building2 className="h-6 w-6" />,
    title: "Building Operations",
    value: "5.3",
    change: "-15%",
    unit: "tCO₂e",
  },
];

const sustainabilityInitiatives = [
  {
    icon: <TreePine className="h-6 w-6" />,
    title: "Forest Conservation",
    description: "Protecting and restoring natural carbon sinks through reforestation projects.",
    impact: "High",
    type: "Nature-based",
  },
  {
    icon: <Wind className="h-6 w-6" />,
    title: "Renewable Energy",
    description: "Transitioning to 100% renewable energy sources across operations.",
    impact: "Very High",
    type: "Energy",
  },
  {
    icon: <Droplets className="h-6 w-6" />,
    title: "Water Management",
    description: "Implementing advanced water recycling and conservation systems.",
    impact: "Medium",
    type: "Resource",
  },
];

const CarbonFootprint = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("entries");

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-4"
      >
        <div className="inline-block p-2 bg-primary/10 rounded-full">
          <Leaf className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold">Carbon Footprint Management</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Transform your environmental impact with AI-powered carbon tracking, real-time monitoring,
          and actionable sustainability insights.
        </p>
      </motion.div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {emissionCategories.map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="space-y-0 pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    {category.icon}
                    {category.title}
                  </CardTitle>
                  <Badge 
                    variant={category.change.startsWith('-') ? 'default' : 'destructive'}
                    className="text-xs"
                  >
                    {category.change}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {category.value} {category.unit}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="entries">Data Entries</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">Add New Entry</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add Carbon Footprint Entry</DialogTitle>
                <DialogDescription>
                  Record your carbon emissions data for accurate tracking and analysis.
                </DialogDescription>
              </DialogHeader>
              <CarbonDataForm onSuccess={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        <TabsContent value="entries" className="space-y-6">
          <CarbonDataList />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <CarbonAnalytics />
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <CarbonReports />
        </TabsContent>
      </Tabs>

      {/* Sustainability Initiatives */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Active Initiatives</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {sustainabilityInitiatives.map((initiative, index) => (
            <motion.div
              key={initiative.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="text-primary">{initiative.icon}</div>
                    <Badge variant="outline">{initiative.type}</Badge>
                  </div>
                  <CardTitle className="text-lg mt-2">{initiative.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    {initiative.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Impact: {initiative.impact}</Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Insights and Recommendations */}
      <Card className="bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary" />
            AI-Powered Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Emission Reduction Opportunities</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Optimize building HVAC schedules (Potential: -8.3%)</li>
                  <li>• Upgrade to LED lighting systems (Potential: -5.2%)</li>
                  <li>• Implement smart energy management (Potential: -12.1%)</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Sustainability Goals Progress</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 2025 Net Zero Target: 68% Complete</li>
                  <li>• Renewable Energy Transition: 75% Complete</li>
                  <li>• Waste Reduction Program: 82% Complete</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CarbonFootprint;
