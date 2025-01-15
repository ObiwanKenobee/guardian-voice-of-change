import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import SignInForm from "@/components/auth/SignInForm";
import AuthHeader from "@/components/auth/AuthHeader";

const SignIn = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Session check error:", error);
          await supabase.auth.signOut();
          return;
        }
        if (session) {
          navigate('/workspace', { replace: true });
        }
      } catch (error) {
        console.error("Session check failed:", error);
      }
    };
    checkSession();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 animate-gradient-x flex flex-col">
      <Link 
        to="/" 
        className="p-4 text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>
      
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md space-y-8 bg-background/95 backdrop-blur-sm rounded-lg shadow-lg p-6 sm:p-8 animate-fade-in">
          <AuthHeader 
            title="Welcome Back to Guardian IO"
            description="Your command center for sustainable enterprise solutions awaits."
          />
          
          <SignInForm />

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/sign-up" className="text-primary hover:text-primary/90">
                Sign up now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;