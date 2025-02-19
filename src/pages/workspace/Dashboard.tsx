
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalOverview } from "@/components/workspace/dashboard/GlobalOverview";
import { QuickActions } from "@/components/workspace/dashboard/QuickActions";
import { WelcomeHeader } from "@/components/workspace/dashboard/WelcomeHeader";
import { Button } from "@/components/ui/button";
import { useESG } from "@/hooks/use-esg";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, TrendingUp, LineChart, Users, Shield, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const Dashboard = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [showBanner, setShowBanner] = useState(false);
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

  const handleESGClick = () => {
    setShowBanner(true);
    setTimeout(() => navigate('/workspace/features/esg-integration'), 2000);
  };

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 animate-fade-in">
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="w-full bg-primary/10 rounded-lg overflow-hidden"
          >
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">ESG Integration Activated</h3>
                  <p className="text-sm text-muted-foreground">
                    Redirecting to ESG Integration Dashboard...
                  </p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-primary animate-bounce" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <WelcomeHeader />
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        {/* Main Content Area - Takes 2 columns on larger screens */}
        <div className="xl:col-span-2 space-y-4">
          <GlobalOverview />
          
          {/* ESG Metrics Overview */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-lg font-semibold">ESG Metrics</CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleESGClick}
                className="hover:bg-primary/10 transition-colors"
              >
                View ESG Integration
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
                    <div key={metric.id} 
                      className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-2 gap-2"
                    >
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
          <Card className="hover:shadow-lg transition-shadow">
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
                    <div key={initiative.id} 
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
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

        {/* Quick Actions - Takes 1 column on larger screens */}
        <div className="xl:col-span-1 space-y-4">
          <QuickActions />
          
          {/* Latest Report */}
          <Card className="hover:shadow-lg transition-shadow">
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
          className="hover:bg-primary/10 transition-colors"
        >
          View All AI Agents
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
