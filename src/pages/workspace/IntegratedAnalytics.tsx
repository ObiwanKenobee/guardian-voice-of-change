
import { useState } from "react";
import { 
  LineChart as RechartsLineChart, 
  Line, 
  BarChart as RechartsBarChart, 
  Bar, 
  PieChart as RechartsPieChart, 
  Pie, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  Cell 
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  LineChart, 
  PieChart, 
  RefreshCw, 
  Download, 
  Filter, 
  Sliders
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

const IntegratedAnalytics = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Sample data
  const overviewData = [
    { name: 'Jan', esg: 65, carbon: 28, compliance: 48 },
    { name: 'Feb', esg: 59, carbon: 25, compliance: 42 },
    { name: 'Mar', esg: 80, carbon: 36, compliance: 61 },
    { name: 'Apr', esg: 81, carbon: 12, compliance: 55 },
    { name: 'May', esg: 56, carbon: 28, compliance: 48 },
    { name: 'Jun', esg: 55, carbon: 29, compliance: 43 },
    { name: 'Jul', esg: 40, carbon: 32, compliance: 39 },
    { name: 'Aug', esg: 75, carbon: 27, compliance: 54 },
    { name: 'Sep', esg: 85, carbon: 18, compliance: 62 },
    { name: 'Oct', esg: 90, carbon: 12, compliance: 70 },
    { name: 'Nov', esg: 92, carbon: 10, compliance: 78 },
    { name: 'Dec', esg: 95, carbon: 8, compliance: 82 },
  ];

  const sourceDistribution = [
    { name: 'ESG Data', value: 35 },
    { name: 'Carbon Tracking', value: 20 },
    { name: 'Compliance', value: 25 },
    { name: 'Supply Chain', value: 15 },
    { name: 'Other Sources', value: 5 },
  ];

  const platformBreakdown = [
    { name: 'ESG Reporting', value: 32 },
    { name: 'Risk Management', value: 24 },
    { name: 'Supplier Analytics', value: 16 },
    { name: 'Compliance Tools', value: 20 },
    { name: 'Custom Analysis', value: 8 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="container mx-auto py-6 space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Integrated Analytics</h1>
          <p className="text-muted-foreground">Cross-module insights and unified data visualization</p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm" variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm" variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button size="sm" variant="default">
            <Sliders className="h-4 w-4 mr-2" />
            Configure
          </Button>
        </div>
      </div>

      <Alert className="bg-blue-50 border-blue-200">
        <AlertDescription className="text-blue-700">
          <strong>New:</strong> Integrated Analytics connects data from across your workspace modules to provide holistic insights. The system automatically normalizes and correlates data from different sources.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="overview" className="flex items-center">
            <LineChart className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="modules">
            <BarChart className="h-4 w-4 mr-2" />
            Module Analysis
          </TabsTrigger>
          <TabsTrigger value="distribution">
            <PieChart className="h-4 w-4 mr-2" />
            Data Distribution
          </TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cross-Module Performance Trend</CardTitle>
              <CardDescription>
                Year-to-date performance metrics across key sustainability areas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={overviewData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="esg" stroke="#0088FE" strokeWidth={2} activeDot={{ r: 8 }} name="ESG Score" />
                    <Line type="monotone" dataKey="carbon" stroke="#00C49F" strokeWidth={2} activeDot={{ r: 8 }} name="Carbon Reduction" />
                    <Line type="monotone" dataKey="compliance" stroke="#FFBB28" strokeWidth={2} activeDot={{ r: 8 }} name="Compliance Rate" />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Data Source Distribution</CardTitle>
                <CardDescription>
                  Breakdown of integrated data sources
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <Pie
                        data={sourceDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {sourceDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Platform Usage Breakdown</CardTitle>
                <CardDescription>
                  Analytics usage by platform module
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={platformBreakdown} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#8884d8">
                        {platformBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Module Analysis Tab - Simplified for brevity */}
        <TabsContent value="modules" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Module Analysis</CardTitle>
              <CardDescription>Detailed insights across platform modules</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center text-muted-foreground">
                <p>Module analysis content would be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Data Distribution Tab - Simplified for brevity */}
        <TabsContent value="distribution" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Distribution</CardTitle>
              <CardDescription>Detailed breakdown of data sources and distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center text-muted-foreground">
                <p>Data distribution content would be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IntegratedAnalytics;
