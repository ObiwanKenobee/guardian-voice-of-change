import { useEffect, useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { WorkspaceSidebar } from "@/components/workspace/WorkspaceSidebar";
import { WorkspaceHeader } from "@/components/workspace/WorkspaceHeader";
import { supabase } from "@/integrations/supabase/client";
import OnboardingTour from "@/components/OnboardingTour";
import ProfileSetup from "@/components/ProfileSetup";
import { TooltipProvider } from "@/components/ui/tooltip";

const Workspace = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showProfileSetup, setShowProfileSetup] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/sign-in", { replace: true });
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (!profile || !profile.full_name) {
        setShowProfileSetup(true);
      } else if (location.state?.showOnboarding && !localStorage.getItem("onboarding_complete")) {
        setShowOnboarding(true);
      }
    };

    checkAuth();
  }, [navigate, location.state]);

  const handleStartTour = () => {
    localStorage.setItem("onboarding_complete", "true");
    setShowOnboarding(false);
    toast({
      title: "Welcome aboard!",
      description: "You're all set to start exploring Guardian IO.",
    });
  };

  return (
    <TooltipProvider>
      <div className="flex min-h-screen overflow-hidden bg-background">
        <WorkspaceSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <WorkspaceHeader />
          <main className="flex-1 overflow-auto p-4 md:p-6 bg-background/95">
            <div className="container mx-auto max-w-7xl">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
      {showOnboarding && (
        <OnboardingTour 
          open={showOnboarding}
          onClose={() => setShowOnboarding(false)}
          onStartTour={handleStartTour}
        />
      )}
      {showProfileSetup && (
        <ProfileSetup 
          open={showProfileSetup}
          onClose={() => setShowProfileSetup(false)}
          onComplete={() => setShowProfileSetup(false)}
        />
      )}
    </TooltipProvider>
  );
};

export default Workspace;