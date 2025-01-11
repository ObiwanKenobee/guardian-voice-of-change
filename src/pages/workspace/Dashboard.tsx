import { AIAgents } from "@/components/workspace/dashboard/AIAgents";
import { GlobalOverview } from "@/components/workspace/dashboard/GlobalOverview";
import { QuickActions } from "@/components/workspace/dashboard/QuickActions";
import { WelcomeHeader } from "@/components/workspace/dashboard/WelcomeHeader";
import { WorkspaceSidebar } from "@/components/workspace/WorkspaceSidebar";

const Dashboard = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <WorkspaceSidebar />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="space-y-8">
          <WelcomeHeader />
          <div className="grid gap-6">
            <GlobalOverview />
            <QuickActions />
            <AIAgents />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;