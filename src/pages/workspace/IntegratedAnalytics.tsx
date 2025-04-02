
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAnalytics } from '@/contexts/AnalyticsContext';
import { ActivitySquare, BarChart2, LineChart, PieChart, RefreshCw, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { AnalyticsConnections } from '@/components/workspace/analytics/AnalyticsConnections';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from '@/components/ui/chart';

const IntegratedAnalytics = () => {
  const { 
    modules, 
    connectedModules, 
    getModuleMetrics,
    isInitialized 
  } = useAnalytics();
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState<'modules' | 'unified'>('modules');

  useEffect(() => {
    if (connectedModules.length > 0 && !selectedModule) {
      setSelectedModule(connectedModules[0]);
    }
  }, [connectedModules, selectedModule]);

  useEffect(() => {
    const loadMetrics = async () => {
      if (selectedModule) {
        setIsLoading(true);
        try {
          const data = await getModuleMetrics(selectedModule as any);
          setMetrics(data);
        } catch (error) {
          console.error('Error loading metrics:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    loadMetrics();
  }, [selectedModule, getModuleMetrics]);

  // Aggregate data across all connected modules
  const [aggregatedData, setAggregatedData] = useState<any[]>([]);
  
  useEffect(() => {
    const loadAllModulesData = async () => {
      if (connectedModules.length === 0) return;
      
      setIsLoading(true);
      try {
        const allData: any[] = [];
        
        for (const moduleId of connectedModules) {
          const moduleData = await getModuleMetrics(moduleId);
          allData.push(...moduleData.map(item => ({
            ...item,
            module: modules[moduleId].name
          })));
        }
        
        setAggregatedData(allData);
      } catch (error) {
        console.error('Error loading aggregated data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadAllModulesData();
  }, [connectedModules, getModuleMetrics, modules]);

  // Chart data transforms
  const moduleDistribution = connectedModules.map(moduleId => ({
    name: modules[moduleId].name,
    value: modules[moduleId].metrics,
  }));
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A259FF', '#4BC0C0'];

  // Unified view data
  const unifiedData = Array.from({ length: 12 }, (_, i) => {
    const month = new Date(2023, i, 1).toLocaleString('default', { month: 'short' });
    const result: { [key: string]: any } = { month };
    
    connectedModules.forEach(moduleId => {
      result[modules[moduleId].name] = Math.floor(Math.random() * 100);
    });
    
    return result;
  });

  return (
    <div className="container mx-auto p-4 animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Integrated Analytics</h1>
        <p className="text-muted-foreground">
          Comprehensive cross-module analytics for your sustainability initiatives
        </p>
      </div>

      {connectedModules.length === 0 ? (
        <Alert className="mb-6">
          <ActivitySquare className="h-4 w-4" />
          <AlertTitle>No modules connected</AlertTitle>
          <AlertDescription>
            Connect analytics modules to see integrated data visualization and insights.
          </AlertDescription>
        </Alert>
      ) : (
        <Alert className="mb-6 bg-blue-50 border-blue-200">
          <Zap className="h-4 w-4 text-blue-600" />
          <AlertTitle className="text-blue-700">Analytics Enabled</AlertTitle>
          <AlertDescription className="text-blue-600">
            {connectedModules.length} modules connected to the analytics system
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Analytics Overview</CardTitle>
            <CardDescription>
              Visualization of key performance indicators across all connected modules
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="bar" className="space-y-4">
              <div className="flex justify-between items-center">
                <TabsList>
                  <TabsTrigger value="bar"><BarChart2 className="h-4 w-4 mr-2" /> Bar</TabsTrigger>
                  <TabsTrigger value="line"><LineChart className="h-4 w-4 mr-2" /> Line</TabsTrigger>
                  <TabsTrigger value="pie"><PieChart className="h-4 w-4 mr-2" /> Distribution</TabsTrigger>
                </TabsList>

                <div className="flex gap-2">
                  <Button
                    variant={view === 'modules' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setView('modules')}
                  >
                    Module View
                  </Button>
                  <Button
                    variant={view === 'unified' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setView('unified')}
                  >
                    Unified View
                  </Button>
                </div>
              </div>

              {/* Bar Chart */}
              <TabsContent value="bar" className="h-[350px]">
                {view === 'modules' ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={metrics}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={unifiedData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      {connectedModules.map((moduleId, index) => (
                        <Bar
                          key={moduleId}
                          dataKey={modules[moduleId].name}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </TabsContent>

              {/* Line Chart */}
              <TabsContent value="line" className="h-[350px]">
                {view === 'modules' ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={metrics}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#3B82F6" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={unifiedData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      {connectedModules.map((moduleId, index) => (
                        <Line
                          key={moduleId}
                          type="monotone"
                          dataKey={modules[moduleId].name}
                          stroke={COLORS[index % COLORS.length]}
                          activeDot={{ r: 6 }}
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </TabsContent>

              {/* Pie Chart */}
              <TabsContent value="pie" className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={moduleDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {moduleDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Module Selection</CardTitle>
            <CardDescription>
              Select a module to view detailed analytics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {connectedModules.length > 0 ? (
                connectedModules.map((moduleId) => (
                  <Button
                    key={moduleId}
                    variant={selectedModule === moduleId ? "default" : "outline"}
                    className="w-full justify-start mb-2"
                    onClick={() => setSelectedModule(moduleId)}
                  >
                    {modules[moduleId].name}
                  </Button>
                ))
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  <p>No modules connected</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2"
                    onClick={() => setSelectedModule(null)}
                  >
                    Connect Modules
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <AnalyticsConnections />
      </div>
    </div>
  );
};

export default IntegratedAnalytics;
