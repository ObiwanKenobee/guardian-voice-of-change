
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

type PartnerApplication = Database['public']['Tables']['partner_applications']['Insert'];
type PartnerApplicationResponse = Database['public']['Tables']['partner_applications']['Row'];

export const partnerApplicationService = {
  // Create a new partner application
  async submitApplication(application: Omit<PartnerApplication, 'id' | 'created_at' | 'updated_at' | 'status'>) {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data, error } = await supabase
      .from('partner_applications')
      .insert({
        ...application,
        user_id: user?.id,
        status: 'pending'
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Read all applications for the current user
  async getApplications() {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data, error } = await supabase
      .from('partner_applications')
      .select('*')
      .eq('user_id', user?.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Read a single application by ID
  async getApplicationById(id: string) {
    const { data, error } = await supabase
      .from('partner_applications')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  // Update an application
  async updateApplication(id: string, updates: Partial<Omit<PartnerApplication, 'id' | 'created_at' | 'updated_at'>>) {
    const { data, error } = await supabase
      .from('partner_applications')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete an application
  async deleteApplication(id: string) {
    const { error } = await supabase
      .from('partner_applications')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};
