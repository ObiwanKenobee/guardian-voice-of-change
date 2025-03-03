
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
import { AlertCircle, Check, Loader2 } from "lucide-react";

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
  
  const { toast } = useToast();

  const submitMutation = useMutation({
    mutationFn: () => {
      if (!formData.partnership_type) {
        throw new Error("Please select a partnership type");
      }
      
      // Don't submit if email validation failed
      if (emailError) {
        throw new Error(emailError);
      }
      
      return partnerApplicationService.submitApplication({
        ...formData,
        partnership_type: formData.partnership_type,
      });
    },
    onSuccess: () => {
      toast({
        title: "Application submitted successfully",
        description: "We'll review your application and get back to you soon.",
      });
      setFormData({
        company_name: "",
        contact_email: "",
        partnership_type: "",
        description: "",
        expertise: "",
      });
      setEmailValidationResult(null);
      setEmailError(null);
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
    submitMutation.mutate();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
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
            className="mt-1"
          />
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
              className="mt-1"
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
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select partnership type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="consulting">Consulting</SelectItem>
              <SelectItem value="research">Research</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
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
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="description">Additional Information</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Any additional information you'd like to share"
            className="mt-1"
          />
        </div>
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
