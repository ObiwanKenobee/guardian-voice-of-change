import { AIAgents } from "@/components/workspace/dashboard/AIAgents";
import { GlobalOverview } from "@/components/workspace/dashboard/GlobalOverview";
import { QuickActions } from "@/components/workspace/dashboard/QuickActions";
import { WelcomeHeader } from "@/components/workspace/dashboard/WelcomeHeader";

const Dashboard = () => {
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

      <AIAgents />
    </div>
  );
};

export default Dashboard;