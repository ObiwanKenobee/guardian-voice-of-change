
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GlobalOverview } from "@/components/workspace/dashboard/GlobalOverview";
import { QuickActions } from "@/components/workspace/dashboard/QuickActions";
import { WelcomeHeader } from "@/components/workspace/dashboard/WelcomeHeader";
import { Button } from "@/components/ui/button";
import { useESG } from "@/hooks/use-esg";
import { DashboardHeader } from "@/components/workspace/dashboard/DashboardHeader";
import { MetricsOverview } from "@/components/workspace/dashboard/MetricsOverview";
import { LatestReport } from "@/components/workspace/dashboard/LatestReport";

const Dashboard = () => {
  const navigate = useNavigate();
  const [showBanner, setShowBanner] = useState(false);
  const { 
    metrics, 
    isLoadingMetrics,
    initiatives,
    isLoadingInitiatives,
    reports,
    isLoadingReports 
  } = useESG();

  const handleESGClick = () => {
    setShowBanner(true);
    setTimeout(() => navigate('/workspace/features/esg-integration'), 2000);
  };

  return (
    <ScrollArea className="h-[calc(100vh-4rem)] w-full">
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-4 sm:space-y-6 md:space-y-8 animate-fade-in">
          <DashboardHeader showBanner={showBanner} />
          
          <WelcomeHeader />
          
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
            <ScrollArea className="xl:col-span-2 h-[calc(100vh-20rem)]">
              <MetricsOverview 
                metrics={metrics}
                initiatives={initiatives}
                reports={reports}
              />
            </ScrollArea>

            <div className="xl:col-span-1 space-y-4">
              <ScrollArea className="h-[calc(100vh-24rem)]">
                <QuickActions />
                
                <div className="mt-4">
                  <LatestReport 
                    reports={reports}
                    isLoadingReports={isLoadingReports}
                  />
                </div>
              </ScrollArea>
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
    </ScrollArea>
  );
};

export default Dashboard;
