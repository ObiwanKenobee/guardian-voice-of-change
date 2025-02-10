
import { GlobalOverview } from "@/components/workspace/dashboard/GlobalOverview";
import { QuickActions } from "@/components/workspace/dashboard/QuickActions";
import { WelcomeHeader } from "@/components/workspace/dashboard/WelcomeHeader";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 animate-fade-in">
      <WelcomeHeader />
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        {/* Main Content Area - Takes 2 columns */}
        <div className="xl:col-span-2">
          <GlobalOverview />
        </div>

        {/* Quick Actions - Takes 1 column */}
        <div className="xl:col-span-1">
          <QuickActions />
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
