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
  
  const { toast } = useToast();

  const submitMutation = useMutation({
    mutationFn: () => {
      if (!formData.partnership_type) {
        throw new Error("Please select a partnership type");
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
          <Input
            id="contact_email"
            name="contact_email"
            type="email"
            value={formData.contact_email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            required
            className="mt-1"
          />
        </div>

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
        disabled={submitMutation.isPending}
      >
        {submitMutation.isPending ? "Submitting..." : "Become a Partner 🚀"}
      </Button>
    </form>
  );
};
