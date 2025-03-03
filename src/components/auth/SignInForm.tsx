
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, AlertCircle, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { SignInFormHeader } from "./SignInFormHeader";
import { SignInFormFields } from "./SignInFormFields";
import { SignInFormFooter } from "./SignInFormFooter";
import { signInSchema, SignInValues } from "./types";
import { validateEmail, EmailValidationResult } from "@/utils/emailValidation";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailValidationResult, setEmailValidationResult] = useState<EmailValidationResult | null>(null);
  const [isValidatingEmail, setIsValidatingEmail] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onEmailBlur = async (email: string) => {
    if (!email || !form.formState.dirtyFields.email) return;
    
    setIsValidatingEmail(true);
    try {
      const result = await validateEmail(email);
      setEmailValidationResult(result);
      
      if (!result.is_valid_format) {
        form.setError('email', { 
          type: 'manual', 
          message: 'This email has an invalid format' 
        });
      } else if (!result.deliverable) {
        form.setError('email', { 
          type: 'manual', 
          message: 'This email may not be deliverable' 
        });
      } else if (result.disposable) {
        form.setError('email', { 
          type: 'manual', 
          message: 'Please avoid using disposable email addresses' 
        });
      } else {
        form.clearErrors('email');
      }
    } catch (error) {
      console.error('Email validation error:', error);
    } finally {
      setIsValidatingEmail(false);
    }
  };

  const onSubmit = async (values: SignInValues) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) throw error;

      if (data.session) {
        toast({
          title: "Welcome back!",
          description: "Successfully signed in to your account.",
        });
        navigate("/workspace/dashboard", { replace: true });
      } else {
        throw new Error("No session created after sign in");
      }
    } catch (error: any) {
      console.error("Sign in error:", error);
      toast({
        title: "Error signing in",
        description: error.message || "Please check your credentials and try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 animate-gradient-x">
      <Link 
        to="/" 
        className="fixed top-4 left-4 inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>
      
      <div className="container max-w-lg mx-auto p-4 h-screen flex items-center justify-center">
        <Card className="w-full">
          <SignInFormHeader />
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <SignInFormFields 
                  form={form} 
                  onEmailBlur={onEmailBlur}
                  isValidatingEmail={isValidatingEmail}
                  emailValidationResult={emailValidationResult}
                />
                
                {emailValidationResult && emailValidationResult.deliverable && !emailValidationResult.disposable && (
                  <Alert className="bg-green-50 text-green-800 border-green-200">
                    <Check className="h-4 w-4 text-green-500" />
                    <AlertDescription>Email validation successful!</AlertDescription>
                  </Alert>
                )}
                
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </form>
            </Form>
            <SignInFormFooter />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
