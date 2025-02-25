
import { useState } from "react";
import { HandHeart, Shield, Plus, PencilLine, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FeatureLayout } from "@/components/workspace/features/FeatureLayout";
import { useEthicalSourcing, ImpactMetric } from "@/hooks/use-ethical-sourcing";
import { EthicalSourcingHero } from "@/components/workspace/ethical-sourcing/EthicalSourcingHero";
import { ImpactMetricsGrid } from "@/components/workspace/ethical-sourcing/ImpactMetricsGrid";
import { InitiativesTab } from "@/components/workspace/ethical-sourcing/InitiativesTab";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { ImpactMetricDialog } from "@/components/workspace/ethical-sourcing/ImpactMetricDialog";

const EthicalSourcingAdvisor = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [metricDialogOpen, setMetricDialogOpen] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<ImpactMetric | undefined>();
  
  const {
    initiatives,
    isLoadingInitiatives,
    initiativesError,
    createInitiative,
    updateInitiative,
    deleteInitiative,
    supplierAssessments,
    isLoadingSupplierAssessments,
    supplierAssessmentsError,
    createSupplierAssessment,
    updateSupplierAssessment,
    deleteSupplierAssessment,
    impactMetrics,
    isLoadingImpactMetrics,
    impactMetricsError,
    createImpactMetric,
    updateImpactMetric,
    deleteImpactMetric,
  } = useEthicalSourcing();

  const handleMetricSubmit = async (data: any) => {
    try {
      if (selectedMetric) {
        await updateImpactMetric.mutateAsync({ ...data, id: selectedMetric.id });
      } else {
        await createImpactMetric.mutateAsync(data);
      }
      setMetricDialogOpen(false);
      setSelectedMetric(undefined);
    } catch (error) {
      console.error("Error submitting metric:", error);
    }
  };

  const handleEditMetric = (metric: ImpactMetric) => {
    setSelectedMetric(metric);
    setMetricDialogOpen(true);
  };

  return (
    <TooltipProvider>
      <FeatureLayout
        icon={HandHeart}
        title="Ethical Sourcing Advisor"
        description="AI-powered insights and recommendations for sustainable and ethical sourcing practices"
      >
        <div className="space-y-8">
          <EthicalSourcingHero />

          {isLoadingImpactMetrics ? (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="h-[120px]" />
                </Card>
              ))}
            </div>
          ) : impactMetricsError ? (
            <Card className="bg-destructive/10">
              <CardContent className="p-6 text-center text-destructive">
                Failed to load impact metrics
              </CardContent>
            </Card>
          ) : (
            <ImpactMetricsGrid metrics={impactMetrics} />
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="initiatives">
                Initiatives
                {initiatives.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {initiatives.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="suppliers">
                Supplier Assessment
                {supplierAssessments.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {supplierAssessments.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="metrics">Impact Metrics</TabsTrigger>
            </TabsList>

            <TabsContent value="initiatives" className="space-y-6">
              {isLoadingInitiatives ? (
                <Card className="animate-pulse">
                  <CardContent className="h-[300px]" />
                </Card>
              ) : initiativesError ? (
                <Card className="bg-destructive/10">
                  <CardContent className="p-6 text-center text-destructive">
                    Failed to load initiatives
                  </CardContent>
                </Card>
              ) : (
                <InitiativesTab
                  initiatives={initiatives}
                  onDelete={(id) => deleteInitiative.mutate(id)}
                  onEdit={updateInitiative.mutate}
                  onCreate={createInitiative.mutate}
                />
              )}
            </TabsContent>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Supply Chain Overview</CardTitle>
                  <CardDescription>
                    Real-time visibility into your ethical sourcing network
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                      <CardContent className="pt-6">
                        <h3 className="font-semibold mb-4">Global Impact</h3>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">Carbon Footprint</span>
                              <span className="text-sm text-green-600">-28%</span>
                            </div>
                            <Progress value={72} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">Fair Labor</span>
                              <span className="text-sm text-green-600">94%</span>
                            </div>
                            <Progress value={94} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">Local Communities</span>
                              <span className="text-sm text-green-600">88%</span>
                            </div>
                            <Progress value={88} className="h-2" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <h3 className="font-semibold mb-4">Supply Chain Health</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Shield className="h-5 w-5 text-green-500" />
                              <span>Verified Suppliers</span>
                            </div>
                            <span className="font-medium">1,240+</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Shield className="h-5 w-5 text-primary" />
                              <span>Production Facilities</span>
                            </div>
                            <span className="font-medium">890</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Shield className="h-5 w-5 text-primary" />
                              <span>Distribution Centers</span>
                            </div>
                            <span className="font-medium">156</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="suppliers">
              <div className="grid gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <div>
                      <CardTitle>Supplier Assessments</CardTitle>
                      <CardDescription>Manage and track supplier compliance and risk</CardDescription>
                    </div>
                    <Button onClick={() => {/* Add supplier dialog logic */}}>
                      <Plus className="h-4 w-4 mr-2" />
                      New Assessment
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {isLoadingSupplierAssessments ? (
                      <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                          <Card key={i} className="animate-pulse">
                            <CardContent className="h-[100px]" />
                          </Card>
                        ))}
                      </div>
                    ) : supplierAssessmentsError ? (
                      <Card className="bg-destructive/10">
                        <CardContent className="p-6 text-center text-destructive">
                          Failed to load supplier assessments
                        </CardContent>
                      </Card>
                    ) : (
                      <div className="space-y-4">
                        {supplierAssessments?.map((supplier) => (
                          <Card key={supplier.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-6">
                              <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                  <h3 className="font-medium">{supplier.supplier_name}</h3>
                                  <div className="flex items-center gap-2">
                                    <Progress value={supplier.compliance_score} className="w-32 h-2" />
                                    <span className="text-sm text-muted-foreground">
                                      {supplier.compliance_score}% Compliant
                                    </span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-4">
                                  <Badge 
                                    variant={supplier.status === 'approved' ? 'default' : 'destructive'}
                                    className="capitalize"
                                  >
                                    {supplier.status}
                                  </Badge>
                                  <Button variant="outline" size="sm">View Details</Button>
                                </div>
                              </div>
                              <div className="mt-4">
                                <p className="text-sm text-muted-foreground">Risk Areas:</p>
                                <div className="flex gap-2 mt-2">
                                  {supplier.risk_areas.map((area) => (
                                    <Badge key={area} variant="secondary">{area}</Badge>
                                  ))}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="metrics">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Impact Metrics</CardTitle>
                      <CardDescription>Track and measure your ethical sourcing impact</CardDescription>
                    </div>
                    <Button onClick={() => setMetricDialogOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      New Metric
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {isLoadingImpactMetrics ? (
                    <div className="grid gap-4 md:grid-cols-2">
                      {[...Array(4)].map((_, i) => (
                        <Card key={i} className="animate-pulse">
                          <CardContent className="h-[120px]" />
                        </Card>
                      ))}
                    </div>
                  ) : impactMetricsError ? (
                    <Card className="bg-destructive/10">
                      <CardContent className="p-6 text-center text-destructive">
                        Failed to load impact metrics
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="grid gap-4 md:grid-cols-2">
                      {impactMetrics.map((metric) => (
                        <Card key={metric.id} className="group">
                          <CardHeader className="flex flex-row items-start justify-between pb-2">
                            <div>
                              <CardTitle className="text-lg">{metric.metric_name}</CardTitle>
                              <CardDescription>{metric.category}</CardDescription>
                            </div>
                            <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEditMetric(metric)}
                              >
                                <PencilLine className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => deleteImpactMetric.mutate(metric.id)}
                                className="text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Current Value</span>
                                <span className="font-medium">{metric.metric_value}</span>
                              </div>
                              {metric.metric_target && (
                                <div className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">Target</span>
                                  <span className="font-medium">{metric.metric_target}</span>
                                </div>
                              )}
                              {metric.change_percentage !== undefined && (
                                <div className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">Change</span>
                                  <span className={`font-medium ${metric.change_percentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {metric.change_percentage >= 0 ? '+' : ''}{metric.change_percentage}%
                                  </span>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </FeatureLayout>
      <ImpactMetricDialog
        open={metricDialogOpen}
        onOpenChange={setMetricDialogOpen}
        onSubmit={handleMetricSubmit}
        initialData={selectedMetric}
        isLoading={createImpactMetric.isPending || updateImpactMetric.isPending}
      />
    </TooltipProvider>
  );
};

export default EthicalSourcingAdvisor;
