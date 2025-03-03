
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Database } from "@/integrations/supabase/types";
import { partnerApplicationService } from "@/services/partnerApplications";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { validateEmail, EmailValidationResult } from "@/utils/emailValidation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Check, Loader2, ShieldAlert } from "lucide-react";
import { sanitizeInput, validatePattern, securityPatterns } from "@/utils/security";
import { useCsrfProtection } from "@/hooks/useCsrfProtection";
import { useSecurityContext } from "@/components/security/SecurityProvider";

type PartnershipType = Database['public']['Enums']['partnership_type'];

type FormData = {
  company_name: string;
  contact_email: string;
  partnership_type: PartnershipType | "";
  description: string;
  expertise: string;
};

export const PartnerApplicationForm = () => {
  const [formData, setFormData] = useState<FormData>({
    company_name: "",
    contact_email: "",
    partnership_type: "",
    description: "",
    expertise: "",
  });
  const [emailValidationResult, setEmailValidationResult] = useState<EmailValidationResult | null>(null);
  const [isValidatingEmail, setIsValidatingEmail] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  
  const { toast } = useToast();
  const { csrfToken } = useCsrfProtection();
  const { isRateLimited, resetRateLimit } = useSecurityContext();

  // Check for field validation
  const validateField = (name: string, value: string): string | null => {
    switch (name) {
      case "company_name":
        if (!value.trim()) return "Company name is required";
        if (!validatePattern(value, securityPatterns.alphanumeric)) 
          return "Company name contains invalid characters";
        return value.length < 2 ? "Company name is too short" : null;
      
      case "contact_email":
        if (!value.trim()) return "Email is required";
        if (!validatePattern(value, securityPatterns.email)) 
          return "Email format is invalid";
        return null;
      
      case "expertise":
        if (!value.trim()) return "Expertise is required";
        if (!validatePattern(value, securityPatterns.noScript)) 
          return "Expertise contains invalid characters";
        return null;
      
      case "description":
        if (value && !validatePattern(value, securityPatterns.noScript)) 
          return "Description contains invalid characters";
        return null;
      
      default:
        return null;
    }
  };

  const submitMutation = useMutation({
    mutationFn: () => {
      // Check for rate limiting to prevent spamming
      if (isRateLimited('partner_form_submit')) {
        throw new Error("Too many submission attempts. Please try again later.");
      }

      // Validate all fields before submission
      const errors: Record<string, string> = {};
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'partnership_type') {
          if (!value) errors[key] = "Please select a partnership type";
        } else {
          const error = validateField(key, value);
          if (error) errors[key] = error;
        }
      });

      // Don't submit if there are any validation errors
      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        throw new Error("Please correct the errors in the form");
      }
      
      // Don't submit if email validation failed
      if (emailError) {
        throw new Error(emailError);
      }
      
      if (!formData.partnership_type) {
        throw new Error("Please select a partnership type");
      }
      
      // Sanitize all text inputs before submission
      const sanitizedData = {
        ...formData,
        company_name: sanitizeInput(formData.company_name),
        contact_email: formData.contact_email.trim(),
        expertise: sanitizeInput(formData.expertise),
        description: sanitizeInput(formData.description),
        partnership_type: formData.partnership_type,
        csrf_token: csrfToken
      };
      
      return partnerApplicationService.submitApplication(sanitizedData);
    },
    onSuccess: () => {
      toast({
        title: "Application submitted successfully",
        description: "We'll review your application and get back to you soon.",
      });
      // Reset the form
      setFormData({
        company_name: "",
        contact_email: "",
        partnership_type: "",
        description: "",
        expertise: "",
      });
      setEmailValidationResult(null);
      setEmailError(null);
      setValidationErrors({});
      // Reset rate limiting after successful submission
      resetRateLimit('partner_form_submit');
    },
    onError: (error) => {
      toast({
        title: "Error submitting application",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors({});
    submitMutation.mutate();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validate field on change
    const error = validateField(name, value);
    setValidationErrors(prev => ({
      ...prev,
      [name]: error || ""
    }));
    
    // Reset email validation when email changes
    if (name === 'contact_email') {
      setEmailValidationResult(null);
      setEmailError(null);
    }
  };

  const handleEmailBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const email = e.target.value;
    if (!email) return;
    
    setIsValidatingEmail(true);
    setEmailError(null);
    
    try {
      const result = await validateEmail(email);
      setEmailValidationResult(result);
      
      if (!result.is_valid_format) {
        setEmailError('This email has an invalid format');
      } else if (!result.deliverable) {
        setEmailError('This email may not be deliverable');
      } else if (result.disposable) {
        setEmailError('Please avoid using disposable email addresses');
      }
    } catch (err) {
      console.error('Email validation error:', err);
    } finally {
      setIsValidatingEmail(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="company_name">Company Name</Label>
          <Input
            id="company_name"
            name="company_name"
            type="text"
            value={formData.company_name}
            onChange={handleInputChange}
            placeholder="Enter your company name"
            required
            className={`mt-1 ${validationErrors.company_name ? 'border-red-500' : ''}`}
          />
          {validationErrors.company_name && (
            <p className="text-sm text-red-500 mt-1">{validationErrors.company_name}</p>
          )}
        </div>

        <div>
          <Label htmlFor="contact_email">Contact Email</Label>
          <div className="relative">
            <Input
              id="contact_email"
              name="contact_email"
              type="email"
              value={formData.contact_email}
              onChange={handleInputChange}
              onBlur={handleEmailBlur}
              placeholder="Enter your email"
              required
              className={`mt-1 ${emailError ? 'border-red-500' : ''}`}
            />
            {isValidatingEmail && (
              <div className="absolute right-3 top-3">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              </div>
            )}
          </div>
          {emailError && (
            <div className="text-sm text-destructive mt-1">
              {emailError}
            </div>
          )}
        </div>

        {emailValidationResult && emailValidationResult.deliverable && !emailValidationResult.disposable && formData.contact_email && (
          <Alert className="bg-green-50 text-green-800 border-green-200">
            <Check className="h-4 w-4 text-green-500" />
            <AlertDescription>Email validation successful!</AlertDescription>
          </Alert>
        )}
        
        {emailError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{emailError}</AlertDescription>
          </Alert>
        )}

        <div>
          <Label htmlFor="partnership_type">Type of Partnership</Label>
          <Select 
            onValueChange={(value: PartnershipType) => setFormData(prev => ({ ...prev, partnership_type: value }))}
            value={formData.partnership_type}
          >
            <SelectTrigger className={`mt-1 ${validationErrors.partnership_type ? 'border-red-500' : ''}`}>
              <SelectValue placeholder="Select partnership type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="consulting">Consulting</SelectItem>
              <SelectItem value="research">Research</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          {validationErrors.partnership_type && (
            <p className="text-sm text-red-500 mt-1">{validationErrors.partnership_type}</p>
          )}
        </div>

        <div>
          <Label htmlFor="expertise">Brief Description of Expertise</Label>
          <Textarea
            id="expertise"
            name="expertise"
            value={formData.expertise}
            onChange={handleInputChange}
            placeholder="Tell us about your expertise and how you'd like to partner with us"
            required
            className={`mt-1 ${validationErrors.expertise ? 'border-red-500' : ''}`}
          />
          {validationErrors.expertise && (
            <p className="text-sm text-red-500 mt-1">{validationErrors.expertise}</p>
          )}
        </div>

        <div>
          <Label htmlFor="description">Additional Information</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Any additional information you'd like to share"
            className={`mt-1 ${validationErrors.description ? 'border-red-500' : ''}`}
          />
          {validationErrors.description && (
            <p className="text-sm text-red-500 mt-1">{validationErrors.description}</p>
          )}
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-md border border-blue-200 flex items-start space-x-3">
        <ShieldAlert className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-blue-700">
          Your data is securely transmitted and stored. We implement strong encryption and security measures to protect your information.
        </p>
      </div>

      <Button 
        type="submit" 
        className="w-full"
        disabled={submitMutation.isPending || !!emailError || isValidatingEmail}
      >
        {submitMutation.isPending ? "Submitting..." : "Become a Partner 🚀"}
      </Button>
    </form>
  );
};
