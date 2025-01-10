import { DashboardGrid } from "@/components/workspace/DashboardGrid";
import { VirtualRoundtables } from "@/components/workspace/collaboration/VirtualRoundtables";
import { CommunityInsights } from "@/components/workspace/collaboration/CommunityInsights";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <DashboardGrid />
      <VirtualRoundtables />
      <CommunityInsights />
    </div>
  );
};

export default Dashboard;