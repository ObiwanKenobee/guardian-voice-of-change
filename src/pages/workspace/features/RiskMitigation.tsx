import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, AlertTriangle, Shield, Map, LineChart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Map as RiskMap } from "@/components/workspace/Map";

interface RiskScore {
  category: string;
  score: number;
  status: 'low' | 'medium' | 'high';
  recommendations: string[];
}

export const RiskMitigation = () => {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState<string>("global");

  const { data: riskScores, isLoading } = useQuery({
    queryKey: ['risk-scores', selectedRegion],
    queryFn: async () => {
      // Simulate API call to get risk scores
      const scores: RiskScore[] = [
        {
          category: "Human Rights",
          score: 75,
          status: "medium",
          recommendations: [
            "Implement enhanced supplier auditing",
            "Establish local monitoring teams",
            "Develop worker feedback channels"
          ]
        },
        {
          category: "Environmental Impact",
          score: 85,
          status: "low",
          recommendations: [
            "Monitor carbon emissions",
            "Implement waste reduction programs",
            "Assess water usage impact"
          ]
        },
        {
          category: "Modern Slavery",
          score: 65,
          status: "high",
          recommendations: [
            "Strengthen supplier vetting process",
            "Increase supply chain transparency",
            "Implement worker protection policies"
          ]
        }
      ];
      return scores;
    }
  });

  const getStatusColor = (status: 'low' | 'medium' | 'high') => {
    switch (status) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-red-100 text-red-800';
    }
  };

  const handleSimulateScenario = () => {
    toast.success("Scenario simulation completed. New recommendations generated.");
  };

  const handleEnableAlerts = () => {
    toast.success("Risk alerts enabled for selected categories");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/workspace/dashboard")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Risk Mitigation AI Agent</h1>
            <p className="text-muted-foreground">
              AI-powered risk assessment and mitigation recommendations
            </p>
          </div>
        </div>
        <Button onClick={handleEnableAlerts}>Enable Crisis Alerts</Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Risk Overview</TabsTrigger>
          <TabsTrigger value="scenarios">Scenario Planning</TabsTrigger>
          <TabsTrigger value="monitoring">Live Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {isLoading ? (
              Array(3).fill(0).map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-20 bg-muted rounded" />
                  </CardContent>
                </Card>
              ))
            ) : (
              riskScores?.map((score, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{score.category}</span>
                      <Badge className={getStatusColor(score.status)}>
                        {score.status.toUpperCase()}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Risk Score</span>
                        <span className="font-medium">{score.score}%</span>
                      </div>
                      <Progress value={score.score} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Recommendations</h4>
                      <ul className="text-sm space-y-1">
                        {score.recommendations.map((rec, i) => (
                          <li key={i} className="text-muted-foreground">
                            • {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="scenarios" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scenario Planning</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Supply Chain Disruption</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button onClick={handleSimulateScenario}>
                      Run Simulation
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Regulatory Changes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button onClick={handleSimulateScenario}>
                      Run Simulation
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Map className="h-5 w-5" />
                  Satellite Monitoring
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] rounded-lg overflow-hidden">
                  <RiskMap />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Active Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-red-50 text-red-700 rounded-lg">
                    <AlertTriangle className="h-5 w-5" />
                    <div>
                      <p className="font-medium">High Risk Activity Detected</p>
                      <p className="text-sm">Unusual patterns detected in Region A</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-yellow-50 text-yellow-700 rounded-lg">
                    <AlertTriangle className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Potential Compliance Issue</p>
                      <p className="text-sm">Labor practice concerns in Region B</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5" />
                  Real-time Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Risk Level</span>
                      <span className="font-medium text-red-600">High</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Monitoring Coverage</span>
                      <span className="font-medium text-green-600">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Alert Response Time</span>
                      <span className="font-medium text-yellow-600">Medium</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RiskMitigation;