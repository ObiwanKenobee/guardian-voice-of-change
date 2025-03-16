
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { getRoleDashboardPath } from "@/utils/roleBasedRouting";

const AuthCallback = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the auth code from the URL
        const hash = window.location.hash;
        const query = new URLSearchParams(window.location.search);
        
        if (query.get('error')) {
          throw new Error(query.get('error_description') || 'Authentication error');
        }
        
        // Get session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          throw sessionError;
        }
        
        if (session) {
          // Get user metadata
          const role = session.user?.user_metadata?.role;
          const industry = session.user?.user_metadata?.industry;
          
          if (!role || !industry) {
            // If role or industry is not set, we need to collect this information
            toast.success("Authentication successful!", {
              description: "Please complete your profile information.",
            });
            navigate('/complete-profile', { 
              replace: true,
              state: { 
                action: 'oauth-complete',
                userId: session.user.id
              }
            });
            return;
          }
          
          // Determine the correct dashboard path
          const dashboardPath = getRoleDashboardPath(role, industry);
          
          toast.success("Authentication successful!", {
            description: "Redirecting to your dashboard.",
          });
          
          // Redirect to the dashboard
          navigate(dashboardPath, { replace: true });
        } else {
          // If we don't have a session but no error, it could mean we're still processing
          // the auth callback. Just display a loading message.
          console.log("No session yet, but no error either. Waiting...");
        }
      } catch (err: any) {
        console.error("OAuth callback error:", err);
        setError(err.message || "Authentication failed. Please try again.");
        toast.error("Authentication failed", {
          description: err.message || "Please try again or use another method to sign in.",
        });
        navigate('/sign-in', { replace: true });
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
      <div className="text-center p-8 max-w-md">
        {error ? (
          <div className="space-y-4">
            <h1 className="text-2xl font-semibold text-destructive">Authentication Error</h1>
            <p className="text-muted-foreground">{error}</p>
            <button 
              onClick={() => navigate('/sign-in')}
              className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
            >
              Back to Sign In
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
            <h1 className="text-2xl font-semibold">Processing your sign-in...</h1>
            <p className="text-muted-foreground">Please wait while we authenticate your account.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthCallback;
