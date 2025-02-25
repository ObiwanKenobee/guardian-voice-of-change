import { useState } from "react";
import { HandHeart, Leaf, UserCheck, Shield, Plus, Pencil, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FeatureLayout } from "@/components/workspace/features/FeatureLayout";
import { useEthicalSourcing } from "@/hooks/use-ethical-sourcing";
import { EthicalSourcingHero } from "@/components/workspace/ethical-sourcing/EthicalSourcingHero";
import { ImpactMetricsGrid } from "@/components/workspace/ethical-sourcing/ImpactMetricsGrid";
import { InitiativesTab } from "@/components/workspace/ethical-sourcing/InitiativesTab";

const EthicalSourcingAdvisor = () => {
  const [activeTab, setActiveTab] = useState("overview");
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

  return (
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
                onEdit={(initiative) => {
                  // TODO: Implement edit dialog
                  console.log('Edit initiative:', initiative);
                }}
                onCreate={() => {
                  // TODO: Implement create dialog
                  console.log('Create new initiative');
                }}
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
              {supplierAssessments?.map((supplier) => (
                <Card key={supplier.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h3 className="font-medium">{supplier.name}</h3>
                        <div className="flex items-center gap-2">
                          <Progress value={supplier.score} className="w-32 h-2" />
                          <span className="text-sm text-muted-foreground">
                            {supplier.score}% Compliant
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge 
                          variant={supplier.status === 'compliant' ? 'default' : 'destructive'}
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
                        {supplier.riskAreas.map((area) => (
                          <Badge key={area} variant="secondary">{area}</Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="metrics">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Dashboard</CardTitle>
                <CardDescription>
                  Real-time monitoring of ethical sourcing compliance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card className="bg-green-50 dark:bg-green-900/10">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold">Labor Standards</h3>
                          <Badge variant="secondary">96% Compliant</Badge>
                        </div>
                        <Progress value={96} className="h-2" />
                      </CardContent>
                    </Card>
                    <Card className="bg-blue-50 dark:bg-blue-900/10">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold">Environmental</h3>
                          <Badge variant="secondary">92% Compliant</Badge>
                        </div>
                        <Progress value={92} className="h-2" />
                      </CardContent>
                    </Card>
                    <Card className="bg-purple-50 dark:bg-purple-900/10">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold">Fair Trade</h3>
                          <Badge variant="secondary">89% Compliant</Badge>
                        </div>
                        <Progress value={89} className="h-2" />
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </FeatureLayout>
  );
};

export default EthicalSourcingAdvisor;
