import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { WorkspaceSidebar } from "@/components/workspace/WorkspaceSidebar";
import { WorkspaceHeader } from "@/components/workspace/WorkspaceHeader";
import { DashboardGrid } from "@/components/workspace/DashboardGrid";
import { supabase } from "@/integrations/supabase/client";
import OnboardingTour from "@/components/OnboardingTour";
import ProfileSetup from "@/components/ProfileSetup";

const Workspace = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [showOnboarding, setShowOnboarding] = useState(location.state?.showOnboarding ?? false);
  const [showProfileSetup, setShowProfileSetup] = useState(false);

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

  const startTour = () => {
    setShowOnboarding(false);
    setShowProfileSetup(true);
  };

  const completeProfileSetup = () => {
    setShowProfileSetup(false);
    toast({
      title: "Profile setup complete!",
      description: "Your Guardian IO workspace is ready. Let's make an impact together.",
    });
  };

  return (
    <div className="h-screen flex dark:bg-background">
      <WorkspaceSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <WorkspaceHeader />
        <main className="flex-1 overflow-auto p-6">
          <DashboardGrid />
        </main>
      </div>

      <OnboardingTour 
        open={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        onStartTour={startTour}
      />

      <ProfileSetup
        open={showProfileSetup}
        onClose={() => setShowProfileSetup(false)}
        onComplete={completeProfileSetup}
      />
    </div>
  );
};

export default Workspace;