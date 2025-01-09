import { SignUpFormData } from "@/types/auth";
import { supabase } from "@/integrations/supabase/client";

export const handleSignUpSubmission = async (formData: SignUpFormData) => {
  const { error } = await supabase.auth.signUp({
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

  if (error) throw error;
};