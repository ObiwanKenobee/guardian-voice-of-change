import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertTriangle, Leaf, Shield, BarChart3 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CameraTraps } from "@/components/workspace/wildlife/components/CameraTraps";
import { PatrolReports } from "@/components/workspace/wildlife/components/PatrolReports";
import { AlertsDashboard } from "@/components/workspace/wildlife/components/AlertsDashboard";
import { RiskHeatmap } from "@/components/workspace/wildlife/components/RiskHeatmap";
import { useToast } from "@/hooks/use-toast";

const WildlifeProtection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleGenerateReport = () => {
    toast({
      title: "Generating Report",
      description: "Your wildlife impact report is being generated.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/workspace/dashboard')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Wildlife Protection AI Agent</h2>
          <p className="text-muted-foreground">
            Monitor and protect wildlife in your operational areas
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Trafficking Alerts
            </CardTitle>
            <CardDescription>
              Real-time monitoring of suspicious activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="font-semibold text-2xl">12</div>
              <p className="text-sm text-muted-foreground">
                Active alerts in high-risk areas
              </p>
              <Button className="w-full" variant="secondary">
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-green-500" />
              Biodiversity Impact
            </CardTitle>
            <CardDescription>
              Assessment of supply chain effects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="font-semibold text-2xl">85%</div>
              <p className="text-sm text-muted-foreground">
                Positive biodiversity score
              </p>
              <Button 
                className="w-full" 
                variant="secondary"
                onClick={handleGenerateReport}
              >
                Generate Report
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-500" />
              Conservation Partners
            </CardTitle>
            <CardDescription>
              Active partnerships and opportunities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="font-semibold text-2xl">8</div>
              <p className="text-sm text-muted-foreground">
                Active conservation partnerships
              </p>
              <Button className="w-full" variant="secondary">
                Find Partners
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <RiskHeatmap />

        <Card>
          <CardHeader>
            <CardTitle>Predictive Impact Analysis</CardTitle>
            <CardDescription>
              Estimated effects on threatened species
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Species Affected</p>
                  <p className="text-2xl font-bold">24</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Risk Level</p>
                  <p className="text-2xl font-bold text-amber-500">Medium</p>
                </div>
              </div>
              <Button className="w-full">Generate Full Report</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6">
        <CameraTraps />
        <PatrolReports />
        <AlertsDashboard />
      </div>
    </div>
  );
};

export default WildlifeProtection;