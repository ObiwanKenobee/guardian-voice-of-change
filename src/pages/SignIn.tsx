import { Link } from "react-router-dom";
import { Shield, ArrowLeft } from "lucide-react";
import SignInForm from "@/components/auth/SignInForm";

const SignIn = () => {
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
        <div className="w-full max-w-md space-y-8 bg-background/95 backdrop-blur-sm rounded-lg shadow-lg p-6 sm:p-8">
          <div className="text-center">
            <div className="flex justify-center">
              <Shield className="h-12 w-12 text-primary" />
            </div>
            <h2 className="mt-6 text-2xl font-bold">Welcome Back</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign in to your account to continue
            </p>
          </div>

          <SignInForm />

          <div className="space-y-4 text-center text-sm">
            <p>
              <Link to="/forgot-password" className="text-primary hover:underline">
                Forgot your password?
              </Link>
            </p>
            <p className="text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/sign-up" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;