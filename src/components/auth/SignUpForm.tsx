
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SignUpFormData } from "@/types/auth";
import { validateSignUpForm } from "@/utils/validation";
import PersonalInfoFields from "./PersonalInfoFields";
import OrganizationFields from "./OrganizationFields";
import { ArrowLeft, AlertCircle, Check, Loader2 } from "lucide-react";
import { signUpUser } from "@/integrations/supabase/client";
import { AuthError, AuthApiError } from "@supabase/supabase-js";
import { validateEmail, EmailValidationResult } from "@/utils/emailValidation";

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
  const [emailValidationResult, setEmailValidationResult] = useState<EmailValidationResult | null>(null);
  const [isValidatingEmail, setIsValidatingEmail] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Reset email validation when email changes
    if (name === 'email') {
      setEmailValidationResult(null);
    }
  };

  const handleEmailBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const email = e.target.value;
    if (!email) return;
    
    setIsValidatingEmail(true);
    setError(null);
    
    try {
      const result = await validateEmail(email);
      setEmailValidationResult(result);
      
      if (!result.is_valid_format) {
        setError('This email has an invalid format');
      } else if (!result.deliverable) {
        setError('This email may not be deliverable');
      } else if (result.disposable) {
        setError('Please avoid using disposable email addresses');
      }
    } catch (err) {
      console.error('Email validation error:', err);
    } finally {
      setIsValidatingEmail(false);
    }
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getErrorMessage = (error: AuthError) => {
    if (error instanceof AuthApiError) {
      switch (error.message) {
        case "User already registered":
          return "This email is already registered. Please sign in instead.";
        case "Password should be at least 6 characters":
          return "Password must be at least 6 characters long.";
        case "Invalid email":
          return "Please enter a valid email address.";
        case "Email rate limit exceeded":
          return "Too many attempts. Please try again later.";
        default:
          return error.message;
      }
    }
    return "An unexpected error occurred. Please try again.";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Don't proceed if the email doesn't pass validation
    if (emailValidationResult && 
        (!emailValidationResult.is_valid_format || 
         !emailValidationResult.deliverable || 
         emailValidationResult.disposable)) {
      setError("Please fix the email validation issues before submitting");
      setLoading(false);
      return;
    }

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
      
      navigate('/workspace/dashboard', { 
        replace: true,
      });
    } catch (error: any) {
      const errorMessage = getErrorMessage(error);
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

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-4">
        <Link to="/index" className="flex items-center text-primary hover:text-primary/80 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {emailValidationResult && emailValidationResult.deliverable && !emailValidationResult.disposable && (
        <Alert className="bg-green-50 text-green-800 border-green-200">
          <Check className="h-4 w-4 text-green-500" />
          <AlertDescription>Email validation successful!</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <PersonalInfoFields
          email={formData.email}
          password={formData.password}
          confirmPassword={formData.confirmPassword}
          fullName={formData.fullName}
          onChange={handleInputChange}
          onEmailBlur={handleEmailBlur}
          isValidatingEmail={isValidatingEmail}
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
