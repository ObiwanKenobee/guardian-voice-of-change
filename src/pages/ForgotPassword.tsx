import { useState } from "react";
import { Link } from "react-router-dom";
import { Shield, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        setError(error.message);
        return;
      }

      toast.success("Password reset instructions sent to your email");
      setEmail("");
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 animate-gradient-x flex flex-col">
      <Link 
        to="/sign-in" 
        className="p-4 text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Sign In
      </Link>
      
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md space-y-8 bg-background/95 backdrop-blur-sm rounded-lg shadow-lg p-6 sm:p-8">
          <div className="text-center">
            <div className="flex justify-center">
              <Shield className="h-12 w-12 text-primary" />
            </div>
            <h2 className="mt-6 text-2xl font-bold">Reset your password</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter your email address and we'll send you instructions to reset your password.
            </p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
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

            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Sending instructions..." : "Send reset instructions"}
            </Button>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">Remember your password? </span>
              <Link to="/sign-in" className="text-primary hover:underline">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;