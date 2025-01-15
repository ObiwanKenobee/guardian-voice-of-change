import { useEffect, useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { toast } from "sonner";
import { WorkspaceHeader } from "@/components/workspace/WorkspaceHeader";
import { supabase } from "@/integrations/supabase/client";
import OnboardingTour from "@/components/OnboardingTour";
import ProfileSetup from "@/components/ProfileSetup";
import { TooltipProvider } from "@/components/ui/tooltip";

const Workspace = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Session error:", sessionError);
          await supabase.auth.signOut();
          navigate("/sign-in", { replace: true });
          return;
        }

        if (!session) {
          navigate("/sign-in", { replace: true });
          return;
        }

        // Check if user has completed profile setup
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (profileError) {
          console.error("Profile error:", profileError);
          return;
        }

        if (!profile || !profile.full_name) {
          setShowProfileSetup(true);
        } else if (location.state?.showOnboarding && !localStorage.getItem("onboarding_complete")) {
          setShowOnboarding(true);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        toast.error("Authentication error. Please sign in again.");
        navigate("/sign-in", { replace: true });
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'TOKEN_REFRESHED') {
        return;
      }
      
      if (event === 'SIGNED_OUT' || !session) {
        toast.error("Session expired. Please sign in again.");
        navigate("/sign-in", { replace: true });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, location.state]);

  return (
    <TooltipProvider>
      <div className="flex flex-col min-h-screen bg-background">
        <WorkspaceHeader onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        {/* Main content area */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="container mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>

        {/* Modals and overlays */}
        {showOnboarding && (
          <OnboardingTour 
            open={showOnboarding}
            onClose={() => setShowOnboarding(false)}
            onStartTour={() => {
              localStorage.setItem("onboarding_complete", "true");
              setShowOnboarding(false);
              toast.success("Welcome aboard! You're all set to start exploring Guardian IO.");
            }}
          />
        )}
        {showProfileSetup && (
          <ProfileSetup 
            open={showProfileSetup}
            onClose={() => setShowProfileSetup(false)}
            onComplete={() => {
              setShowProfileSetup(false);
              setShowOnboarding(true);
            }}
          />
        )}
      </div>
    </TooltipProvider>
  );
};

export default Workspace;