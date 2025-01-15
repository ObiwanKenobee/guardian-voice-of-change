import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { AuthError, AuthApiError } from "@supabase/supabase-js";
import { Alert, AlertDescription } from "@/components/ui/alert";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check if user is already signed in
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Session check error:", error);
          // Clear any existing session data if there's an error
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Auth error:", error);
        setAuthError(getErrorMessage(error));
        return;
      }

      if (data.user) {
        // Ensure we have a valid session before redirecting
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
          throw sessionError;
        }

        if (sessionData.session) {
          toast({
            title: "Welcome back!",
            description: "Successfully signed in to your account.",
          });
          navigate("/workspace", { replace: true });
        } else {
          throw new Error("No session created after sign in");
        }
      }
    } catch (error) {
      console.error("Sign in error:", error);
      setAuthError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getErrorMessage = (error: AuthError) => {
    if (error instanceof AuthApiError) {
      switch (error.message) {
        case "Email not confirmed":
          return "Please check your email and confirm your account before signing in.";
        case "Invalid login credentials":
          return "Invalid email or password. Please check your credentials and try again.";
        case "refresh_token_not_found":
          return "Your session has expired. Please sign in again.";
        default:
          return error.message;
      }
    }
    return "An unexpected error occurred. Please try again.";
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 animate-gradient-x flex flex-col">
      <Link 
        to="/" 
        className="p-4 text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>
      
      <div className="flex-1 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 bg-background/95 backdrop-blur-sm rounded-lg shadow-lg p-6 sm:p-8 animate-fade-in">
          <div className="text-center">
            <div className="flex justify-center">
              <Shield className="h-12 w-12 text-primary animate-scale-in hover:scale-110 transition-transform duration-200" />
            </div>
            <h2 className="mt-6 text-2xl sm:text-3xl font-bold gradient-text animate-fade-in delay-100">
              Welcome Back to Guardian IO
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground animate-fade-in delay-200">
              Your command center for sustainable enterprise solutions awaits.
            </p>
          </div>

          {authError && (
            <Alert variant="destructive" className="animate-fade-in">
              <AlertDescription>{authError}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6 animate-fade-in delay-300">
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="mt-1"
                  disabled={isLoading}
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="mt-1"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  disabled={isLoading}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-muted-foreground">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link to="/forgot-password" className="text-primary hover:text-primary/90">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/sign-up" className="text-primary hover:text-primary/90">
                  Sign up now
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;