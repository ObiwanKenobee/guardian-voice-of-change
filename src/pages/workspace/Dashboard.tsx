
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalOverview } from "@/components/workspace/dashboard/GlobalOverview";
import { QuickActions } from "@/components/workspace/dashboard/QuickActions";
import { WelcomeHeader } from "@/components/workspace/dashboard/WelcomeHeader";
import { Button } from "@/components/ui/button";
import { useESG } from "@/hooks/use-esg";
import { DashboardHeader } from "@/components/workspace/dashboard/DashboardHeader";
import { MetricsOverview } from "@/components/workspace/dashboard/MetricsOverview";
import { LatestReport } from "@/components/workspace/dashboard/LatestReport";
import { useAuth } from "@/contexts/AuthContext";
import { getRoleDescription } from "@/utils/roleBasedRouting";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Zap, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  const navigate = useNavigate();
  const [showBanner, setShowBanner] = useState(false);
  const { userRole, userIndustry } = useAuth();
  const { 
    metrics, 
    isLoadingMetrics,
    initiatives,
    isLoadingInitiatives,
    reports,
    isLoadingReports 
  } = useESG();

  const roleDescription = getRoleDescription(userRole, userIndustry);

  const handleESGClick = () => {
    setShowBanner(true);
    setTimeout(() => navigate('/workspace/features/esg-integration'), 2000);
  };

  const handleXApiClick = () => {
    navigate('/workspace/x-api-integration');
  };

  const handleIntegratedAnalyticsClick = () => {
    navigate('/workspace/integrated-analytics');
  };

  return (
    <div className="container mx-auto animate-fade-in">
      <div className="space-y-4 sm:space-y-6 md:space-y-8">
        <DashboardHeader showBanner={showBanner} />
        
        <WelcomeHeader />
        
        {userRole && userIndustry && (
          <Alert className="bg-primary/5 border-primary/20">
            <Info className="h-4 w-4 text-primary" />
            <AlertDescription className="text-primary">
              {roleDescription}
            </AlertDescription>
          </Alert>
        )}
        
        {/* New X-API Alert */}
        <Alert className="bg-blue-50 border-blue-200">
          <Zap className="h-4 w-4 text-blue-600" />
          <AlertDescription className="flex justify-between items-center w-full">
            <span className="text-blue-600">
              New X-API Integration System available! Supercharge your ESG compliance with Max Steel-inspired innovations.
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              className="ml-2 border-blue-200 text-blue-600 hover:bg-blue-100"
              onClick={handleXApiClick}
            >
              Explore X-API
            </Button>
          </AlertDescription>
        </Alert>
        
        {/* New Integrated Analytics Alert */}
        <Alert className="bg-green-50 border-green-200">
          <BarChart2 className="h-4 w-4 text-green-600" />
          <AlertDescription className="flex justify-between items-center w-full">
            <span className="text-green-600">
              Connect your workspace modules with our new Integrated Analytics! Get cross-module insights and holistic data visualization.
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              className="ml-2 border-green-200 text-green-600 hover:bg-green-100"
              onClick={handleIntegratedAnalyticsClick}
            >
              Unified Analytics
            </Button>
          </AlertDescription>
        </Alert>
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          <div className="xl:col-span-2 space-y-6">
            <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white">
              <CardHeader className="pb-2">
                <div className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-blue-800">TURBO-X API System</CardTitle>
                </div>
                <CardDescription>
                  AI-Driven ESG Optimization & Smart Compliance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-blue-800">Features</h4>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">✓</span>
                        <span>Real-time ESG API feeds</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">✓</span>
                        <span>Pulls live climate policy changes</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">✓</span>
                        <span>Integrates with global ESG platforms</span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex items-center justify-center border rounded-md p-4 bg-white">
                    <div className="text-center">
                      <AlertCircle className="h-10 w-10 text-blue-500 mx-auto mb-2" />
                      <p className="text-sm font-medium text-blue-700">Access the new X-API system</p>
                      <p className="text-xs text-blue-600 mt-1">Now in beta testing</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleXApiClick}>
                  <Zap className="h-4 w-4 mr-2" />
                  Explore X-API Integration
                </Button>
              </CardFooter>
            </Card>
          
            <MetricsOverview 
              metrics={metrics}
              initiatives={initiatives}
              reports={reports}
            />
          </div>

          <div className="xl:col-span-1 space-y-4">
            <QuickActions />
              
            <div className="mt-4">
              <LatestReport 
                reports={reports}
                isLoadingReports={isLoadingReports}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button 
            variant="outline"
            onClick={() => navigate('/workspace/ai-agents')}
            className="hover:bg-primary/10 transition-colors"
          >
            View All AI Agents
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
