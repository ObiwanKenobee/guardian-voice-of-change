import { Link } from "react-router-dom";
import { Shield } from "lucide-react";
import SignUpForm from "@/components/auth/SignUpForm";

const SignUp = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 animate-gradient-x flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md space-y-8 bg-background/95 backdrop-blur-sm rounded-lg shadow-lg p-6 sm:p-8">
        <div className="text-center">
          <div className="flex justify-center">
            <Shield className="h-12 w-12 text-primary" />
          </div>
          <h2 className="mt-6 text-2xl font-bold">Create an Account</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Join Guardian IO and start your journey
          </p>
        </div>

        <SignUpForm />

        <div className="text-center text-sm">
          <p className="text-muted-foreground">
            Already have an account?{" "}
            <Link to="/sign-in" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;