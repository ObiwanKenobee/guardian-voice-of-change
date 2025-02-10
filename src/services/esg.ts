
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  ESGMetric,
  ESGInitiative,
  ESGReport,
  ESGStakeholderEngagement,
} from "@/types/esg";

export const esgService = {
  // ESG Metrics
  async getMetrics(): Promise<ESGMetric[]> {
    const { data, error } = await supabase
      .from('esg_metrics')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to fetch ESG metrics');
      throw error;
    }

    return data;
  },

  async createMetric(metric: Omit<ESGMetric, 'id' | 'user_id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('esg_metrics')
      .insert([metric])
      .select()
      .single();

    if (error) {
      toast.error('Failed to create ESG metric');
      throw error;
    }

    toast.success('ESG metric created successfully');
    return data;
  },

  async updateMetric(id: string, metric: Partial<ESGMetric>) {
    const { data, error } = await supabase
      .from('esg_metrics')
      .update(metric)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      toast.error('Failed to update ESG metric');
      throw error;
    }

    toast.success('ESG metric updated successfully');
    return data;
  },

  async deleteMetric(id: string) {
    const { error } = await supabase
      .from('esg_metrics')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Failed to delete ESG metric');
      throw error;
    }

    toast.success('ESG metric deleted successfully');
  },

  // ESG Initiatives
  async getInitiatives(): Promise<ESGInitiative[]> {
    const { data, error } = await supabase
      .from('esg_initiatives')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to fetch ESG initiatives');
      throw error;
    }

    return data;
  },

  async createInitiative(initiative: Omit<ESGInitiative, 'id' | 'user_id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('esg_initiatives')
      .insert([initiative])
      .select()
      .single();

    if (error) {
      toast.error('Failed to create ESG initiative');
      throw error;
    }

    toast.success('ESG initiative created successfully');
    return data;
  },

  async updateInitiative(id: string, initiative: Partial<ESGInitiative>) {
    const { data, error } = await supabase
      .from('esg_initiatives')
      .update(initiative)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      toast.error('Failed to update ESG initiative');
      throw error;
    }

    toast.success('ESG initiative updated successfully');
    return data;
  },

  async deleteInitiative(id: string) {
    const { error } = await supabase
      .from('esg_initiatives')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Failed to delete ESG initiative');
      throw error;
    }

    toast.success('ESG initiative deleted successfully');
  },

  // ESG Reports
  async getReports(): Promise<ESGReport[]> {
    const { data, error } = await supabase
      .from('esg_reports')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to fetch ESG reports');
      throw error;
    }

    return data;
  },

  async createReport(report: Omit<ESGReport, 'id' | 'user_id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('esg_reports')
      .insert([report])
      .select()
      .single();

    if (error) {
      toast.error('Failed to create ESG report');
      throw error;
    }

    toast.success('ESG report created successfully');
    return data;
  },

  async updateReport(id: string, report: Partial<ESGReport>) {
    const { data, error } = await supabase
      .from('esg_reports')
      .update(report)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      toast.error('Failed to update ESG report');
      throw error;
    }

    toast.success('ESG report updated successfully');
    return data;
  },

  async deleteReport(id: string) {
    const { error } = await supabase
      .from('esg_reports')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Failed to delete ESG report');
      throw error;
    }

    toast.success('ESG report deleted successfully');
  },

  // ESG Stakeholder Engagements
  async getStakeholderEngagements(): Promise<ESGStakeholderEngagement[]> {
    const { data, error } = await supabase
      .from('esg_stakeholder_engagements')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to fetch stakeholder engagements');
      throw error;
    }

    return data;
  },

  async createStakeholderEngagement(engagement: Omit<ESGStakeholderEngagement, 'id' | 'user_id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('esg_stakeholder_engagements')
      .insert([engagement])
      .select()
      .single();

    if (error) {
      toast.error('Failed to create stakeholder engagement');
      throw error;
    }

    toast.success('Stakeholder engagement created successfully');
    return data;
  },

  async updateStakeholderEngagement(id: string, engagement: Partial<ESGStakeholderEngagement>) {
    const { data, error } = await supabase
      .from('esg_stakeholder_engagements')
      .update(engagement)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      toast.error('Failed to update stakeholder engagement');
      throw error;
    }

    toast.success('Stakeholder engagement updated successfully');
    return data;
  },

  async deleteStakeholderEngagement(id: string) {
    const { error } = await supabase
      .from('esg_stakeholder_engagements')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Failed to delete stakeholder engagement');
      throw error;
    }

    toast.success('Stakeholder engagement deleted successfully');
  }
};
