import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { DashboardGrid } from "@/components/workspace/DashboardGrid";
import { VirtualRoundtables } from "@/components/workspace/collaboration/VirtualRoundtables";
import { CommunityInsights } from "@/components/workspace/collaboration/CommunityInsights";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleRefresh = () => {
    // Reload the current route
    navigate(".", { replace: true });
    toast.success("Dashboard refreshed");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleRefresh}
          className="gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>
      
      <DashboardGrid />
      <VirtualRoundtables />
      <CommunityInsights />
    </div>
  );
};

export default Dashboard;