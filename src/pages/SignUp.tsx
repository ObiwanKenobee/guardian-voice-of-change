import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Shield } from "lucide-react";
import SignUpForm from "@/components/auth/SignUpForm";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        navigate('/workspace');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 animate-gradient-x">
      <div className="w-full max-w-md p-8 space-y-8 bg-background/95 backdrop-blur-sm rounded-lg shadow-lg animate-fade-in">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <Shield className="h-12 w-12 text-primary animate-scale-in hover:scale-110 transition-transform duration-200" />
          </div>
          <h1 className="text-2xl font-bold animate-fade-in delay-100">
            Create your Guardian IO account
          </h1>
          <p className="text-muted-foreground animate-fade-in delay-200">
            Join us in building ethical and transparent supply chains
          </p>
        </div>

        <div className="animate-fade-in delay-300">
          <SignUpForm />
        </div>
      </div>
    </div>
  );
};

export default SignUp;