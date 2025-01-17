import { useEffect, useState } from "react";
import { useNavigate, useLocation, Routes, Route, Navigate } from "react-router-dom";
import { toast } from "sonner";
import { WorkspaceHeader } from "@/components/workspace/WorkspaceHeader";
import { WorkspaceSidebar } from "@/components/workspace/WorkspaceSidebar";
import { supabase } from "@/integrations/supabase/client";
import OnboardingTour from "@/components/OnboardingTour";
import ProfileSetup from "@/components/ProfileSetup";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";

// Import workspace pages
import Dashboard from "./workspace/Dashboard";
import Analytics from "./workspace/Analytics";
import SupplyChain from "./workspace/SupplyChain";
import Wildlife from "./workspace/Wildlife";
import Compliance from "./workspace/Compliance";
import Collaboration from "./workspace/Collaboration";
import Partners from "./workspace/Partners";
import Settings from "./workspace/Settings";
import ESGReporting from "./workspace/ESGReporting";

const Workspace = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showProfileSetup, setShowProfileSetup] = useState(false);

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
      if (event === 'TOKEN_REFRESHED') return;
      
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
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-background">
          <div className="flex-1 flex flex-col">
            <WorkspaceHeader />
            <main className="flex-1 overflow-hidden">
              <div className="flex h-full">
                <div className="flex-1 overflow-auto">
                  <div className="container mx-auto p-6">
                    <Routes>
                      <Route index element={<Navigate to="dashboard" replace />} />
                      <Route path="dashboard" element={<Dashboard />} />
                      <Route path="analytics" element={<Analytics />} />
                      <Route path="supply-chain" element={<SupplyChain />} />
                      <Route path="wildlife" element={<Wildlife />} />
                      <Route path="compliance" element={<Compliance />} />
                      <Route path="collaboration" element={<Collaboration />} />
                      <Route path="partners" element={<Partners />} />
                      <Route path="settings" element={<Settings />} />
                      <Route path="esg-reporting" element={<ESGReporting />} />
                    </Routes>
                  </div>
                </div>
                <WorkspaceSidebar />
              </div>
            </main>
          </div>
        </div>

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
      </SidebarProvider>
    </TooltipProvider>
  );
};

export default Workspace;