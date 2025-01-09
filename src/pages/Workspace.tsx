import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { WorkspaceSidebar } from "@/components/workspace/WorkspaceSidebar";
import { WorkspaceHeader } from "@/components/workspace/WorkspaceHeader";
import { DashboardGrid } from "@/components/workspace/DashboardGrid";
import { supabase } from "@/integrations/supabase/client";

const Workspace = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Authentication required",
          description: "Please sign in to access the workspace",
          variant: "destructive",
        });
        navigate("/sign-in");
      }
    };

    checkAuth();
  }, [navigate, toast]);

  return (
    <div className="h-screen flex dark:bg-background">
      <WorkspaceSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <WorkspaceHeader />
        <main className="flex-1 overflow-auto p-6">
          <DashboardGrid />
        </main>
      </div>
    </div>
  );
};

export default Workspace;