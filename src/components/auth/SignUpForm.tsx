import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SignUpFormData } from "@/types/auth";
import { validateSignUpForm } from "@/utils/validation";
import PersonalInfoFields from "./PersonalInfoFields";
import OrganizationFields from "./OrganizationFields";
import { ArrowLeft } from "lucide-react";
import { signUpUser } from "@/integrations/supabase/client";
import { AuthError } from "@supabase/supabase-js";

const SignUpForm = () => {
  const [formData, setFormData] = useState<SignUpFormData>({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    organization: "",
    industry: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const errors = validateSignUpForm(formData);
    if (Object.keys(errors).length > 0) {
      setError(errors.general || "Please fill in all required fields correctly");
      setLoading(false);
      return;
    }

    try {
      const metadata = {
        full_name: formData.fullName,
        organization: formData.organization,
        industry: formData.industry,
        role: formData.role,
      };

      await signUpUser(formData.email, formData.password, metadata);
      
      toast({
        title: "Account created successfully!",
        description: "Welcome to Guardian IO. Let's get started with your journey.",
      });
      
      navigate('/workspace', { 
        replace: true,
        state: { showOnboarding: true }
      });
    } catch (error: any) {
      const authError = error as AuthError;
      let errorMessage = "An unexpected error occurred";
      
      if (authError.message) {
        switch (authError.message) {
          case "User already registered":
            errorMessage = "This email is already registered. Please sign in instead.";
            break;
          case "Password should be at least 6 characters":
            errorMessage = "Password must be at least 6 characters long.";
            break;
          case "Invalid email":
            errorMessage = "Please enter a valid email address.";
            break;
          default:
            errorMessage = authError.message;
        }
      }
      
      setError(errorMessage);
      toast({
        title: "Error creating account",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-4">
        <Link to="/" className="flex items-center text-primary hover:text-primary/80 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <PersonalInfoFields
          email={formData.email}
          password={formData.password}
          confirmPassword={formData.confirmPassword}
          fullName={formData.fullName}
          onChange={handleInputChange}
        />

        <OrganizationFields
          organization={formData.organization}
          industry={formData.industry}
          role={formData.role}
          onInputChange={handleInputChange}
          onSelectChange={handleSelectChange}
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Creating account..." : "Sign Up"}
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;