import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import { SignUpFormData } from "@/types/auth";
import { validateSignUpForm } from "@/utils/formValidation";
import PersonalInfoFields from "./PersonalInfoFields";
import OrganizationFields from "./OrganizationFields";
import { ArrowLeft } from "lucide-react";

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
      const { error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            organization: formData.organization,
            industry: formData.industry,
            role: formData.role,
          },
        },
      });

      if (signUpError) throw signUpError;

      toast({
        title: "Account created successfully!",
        description: "Welcome to Guardian IO. Let's get started with your journey.",
      });
      navigate('/workspace', { state: { showOnboarding: true }});
    } catch (error: any) {
      setError(error.message);
      toast({
        title: "Error creating account",
        description: error.message,
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
        <div className="space-y-6">
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
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Creating account..." : "Sign Up"}
        </Button>
      </form>

      <div className="text-center text-sm">
        <span className="text-muted-foreground">Already have an account? </span>
        <Link to="/sign-in" className="text-primary hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default SignUpForm;