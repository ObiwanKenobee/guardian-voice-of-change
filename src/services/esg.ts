import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type {
  ESGMetricRow,
  InitiativeRow,
  ReportRow,
  ESGStakeholderEngagementRow,
} from "@/types/esg";

export const esgService = {
  // ESG Metrics
  async getMetrics(): Promise<ESGMetricRow[]> {
    const { data: session } = await supabase.auth.getSession();
    if (!session?.session?.user?.id) {
      throw new Error('Not authenticated');
    }

    const { data, error } = await supabase
      .from('esg_metrics')
      .select('*')
      .eq('user_id', session.session.user.id)
      .order('timestamp', { ascending: false });

    if (error) {
      toast.error('Failed to fetch ESG metrics');
      throw error;
    }

    return data;
  },

  async createMetric(metric: Omit<ESGMetricRow, 'id' | 'user_id' | 'timestamp'>) {
    const { data: session } = await supabase.auth.getSession();
    if (!session?.session?.user?.id) {
      throw new Error('Not authenticated');
    }

    const { data, error } = await supabase
      .from('esg_metrics')
      .insert([{
        ...metric,
        user_id: session.session.user.id,
        timestamp: new Date().toISOString(),
      }])
      .select()
      .single();

    if (error) {
      toast.error('Failed to create ESG metric');
      throw error;
    }

    toast.success('ESG metric created successfully');
    return data;
  },

  async updateMetric(id: string, metric: Partial<ESGMetricRow>) {
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
  async getInitiatives(): Promise<ESGInitiativeRow[]> {
    const { data: session } = await supabase.auth.getSession();
    if (!session?.session?.user?.id) {
      throw new Error('Not authenticated');
    }

    const { data, error } = await supabase
      .from('esg_initiatives')
      .select('*')
      .eq('user_id', session.session.user.id)
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to fetch ESG initiatives');
      throw error;
    }

    return data;
  },

  async createInitiative(initiative: Omit<InitiativeRow, 'id' | 'user_id' | 'created_at' | 'updated_at'>) {
    const { data: session } = await supabase.auth.getSession();
    if (!session?.session?.user?.id) {
      throw new Error('Not authenticated');
    }

    const { data, error } = await supabase
      .from('esg_initiatives')
      .insert({
        ...initiative,
        user_id: session.session.user.id,
        status: initiative.status || 'planned',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      toast.error('Failed to create ESG initiative');
      throw error;
    }

    toast.success('ESG initiative created successfully');
    return data;
  },

  async updateInitiative(id: string, initiative: Partial<ESGInitiativeRow>) {
    const { data, error } = await supabase
      .from('esg_initiatives')
      .update({
        ...initiative,
        updated_at: new Date().toISOString(),
      })
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
  async getReports(): Promise<ESGReportRow[]> {
    const { data: session } = await supabase.auth.getSession();
    if (!session?.session?.user?.id) {
      throw new Error('Not authenticated');
    }

    const { data, error } = await supabase
      .from('esg_reports')
      .select('*')
      .eq('user_id', session.session.user.id)
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to fetch ESG reports');
      throw error;
    }

    return data.map(report => ({
      ...report,
      content: typeof report.content === 'string' 
        ? JSON.parse(report.content) 
        : report.content
    })) as ESGReportRow[];
  },

  async createReport(report: Omit<ReportRow, 'id' | 'user_id' | 'created_at' | 'updated_at'>) {
    const { data: session } = await supabase.auth.getSession();
    if (!session?.session?.user?.id) {
      throw new Error('Not authenticated');
    }

    const { data, error } = await supabase
      .from('esg_reports')
      .insert({
        ...report,
        user_id: session.session.user.id,
        status: report.status || 'draft',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      toast.error('Failed to create ESG report');
      throw error;
    }

    const parsedData = {
      ...data,
      content: typeof data.content === 'string' 
        ? JSON.parse(data.content) 
        : data.content
    } as ReportRow;

    toast.success('ESG report created successfully');
    return parsedData;
  },

  async updateReport(id: string, report: Partial<ESGReportRow>) {
    const { data, error } = await supabase
      .from('esg_reports')
      .update({
        ...report,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      toast.error('Failed to update ESG report');
      throw error;
    }

    const parsedData = {
      ...data,
      content: typeof data.content === 'string' 
        ? JSON.parse(data.content) 
        : data.content
    } as ESGReportRow;

    toast.success('ESG report updated successfully');
    return parsedData;
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
  async getStakeholderEngagements(): Promise<ESGStakeholderEngagementRow[]> {
    const { data: session } = await supabase.auth.getSession();
    if (!session?.session?.user?.id) {
      throw new Error('Not authenticated');
    }

    const { data, error } = await supabase
      .from('esg_stakeholder_engagements')
      .select('*')
      .eq('user_id', session.session.user.id)
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to fetch stakeholder engagements');
      throw error;
    }

    return data;
  },

  async createStakeholderEngagement(
    engagement: Omit<ESGStakeholderEngagementRow, 'id' | 'user_id' | 'created_at' | 'updated_at'>
  ) {
    const { data: session } = await supabase.auth.getSession();
    if (!session?.session?.user?.id) {
      throw new Error('Not authenticated');
    }

    const { data, error } = await supabase
      .from('esg_stakeholder_engagements')
      .insert({
        ...engagement,
        user_id: session.session.user.id,
        status: engagement.status || 'planned',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      toast.error('Failed to create stakeholder engagement');
      throw error;
    }

    toast.success('Stakeholder engagement created successfully');
    return data;
  },

  async updateStakeholderEngagement(id: string, engagement: Partial<ESGStakeholderEngagementRow>) {
    const { data, error } = await supabase
      .from('esg_stakeholder_engagements')
      .update({
        ...engagement,
        updated_at: new Date().toISOString(),
      })
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
