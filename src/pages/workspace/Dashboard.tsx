
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalOverview } from "@/components/workspace/dashboard/GlobalOverview";
import { QuickActions } from "@/components/workspace/dashboard/QuickActions";
import { WelcomeHeader } from "@/components/workspace/dashboard/WelcomeHeader";
import { Button } from "@/components/ui/button";
import { useESG } from "@/hooks/use-esg";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, TrendingUp, LineChart, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const navigate = useNavigate();
  const { 
    metrics, 
    isLoadingMetrics,
    initiatives,
    isLoadingInitiatives,
    reports,
    isLoadingReports 
  } = useESG();

  const getLatestMetrics = () => {
    if (!metrics.length) return null;
    return metrics.slice(0, 3);
  };

  const getActiveInitiatives = () => {
    if (!initiatives.length) return null;
    return initiatives.filter(i => i.status === 'in_progress').slice(0, 3);
  };

  const getLatestReport = () => {
    if (!reports.length) return null;
    return reports[0];
  };

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 animate-fade-in">
      <WelcomeHeader />
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        {/* Main Content Area - Takes 2 columns */}
        <div className="xl:col-span-2 space-y-4">
          <GlobalOverview />
          
          {/* ESG Metrics Overview */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-lg font-semibold">ESG Metrics</CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/workspace/esg-reporting')}
              >
                View All
              </Button>
            </CardHeader>
            <CardContent>
              {isLoadingMetrics ? (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {getLatestMetrics()?.map((metric) => (
                    <div key={metric.id} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <h4 className="font-medium">{metric.metric_name}</h4>
                        <p className="text-sm text-muted-foreground">{metric.metric_type}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{metric.metric_value}</span>
                        <span className="text-sm text-muted-foreground">{metric.unit}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Active Initiatives */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-lg font-semibold">Active Initiatives</CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/workspace/esg-reporting')}
              >
                Manage
              </Button>
            </CardHeader>
            <CardContent>
              {isLoadingInitiatives ? (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {getActiveInitiatives()?.map((initiative) => (
                    <div key={initiative.id} className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{initiative.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {initiative.start_date && new Date(initiative.start_date).toLocaleDateString()}
                          {initiative.end_date && ` - ${new Date(initiative.end_date).toLocaleDateString()}`}
                        </p>
                      </div>
                      <Badge>{initiative.status}</Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions - Takes 1 column */}
        <div className="xl:col-span-1 space-y-4">
          <QuickActions />
          
          {/* Latest Report */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Latest Report</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingReports ? (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : (
                <div>
                  {getLatestReport() ? (
                    <div className="space-y-2">
                      <h4 className="font-medium">{getLatestReport()?.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        Type: {getLatestReport()?.report_type}
                      </p>
                      <Badge>{getLatestReport()?.status}</Badge>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No reports available</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-end">
        <Button 
          variant="outline"
          onClick={() => navigate('/workspace/ai-agents')}
        >
          View All AI Agents
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
