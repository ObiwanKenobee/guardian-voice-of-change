import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Database } from "@/lib/database.types";

export interface Initiative {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  category: string;
  status: 'planned' | 'in_progress' | 'completed' | 'on_hold';
  impact_level: 'low' | 'medium' | 'high' | 'very_high';
  start_date?: string;
  end_date?: string;
  target_metrics: Record<string, any>;
  current_metrics: Record<string, any>;
  budget?: number;
  created_at: string;
  updated_at: string;
}

export interface SupplierAssessment {
  id: string;
  user_id: string;
  supplier_name: string;
  status: 'pending' | 'approved' | 'at_risk' | 'suspended';
  compliance_score: number;
  risk_areas: string[];
  last_audit_date?: string;
  next_audit_date?: string;
  certification_details: Record<string, any>;
  contact_information: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface ImpactMetric {
  id: string;
  user_id: string;
  metric_name: string;
  metric_value: number;
  metric_target?: number;
  category: string;
  measurement_date: string;
  comparison_period?: string;
  change_percentage?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export function useEthicalSourcing() {
  const queryClient = useQueryClient();

  const getUserId = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");
    return user.id;
  };

  const {
    data: initiatives,
    isLoading: isLoadingInitiatives,
    error: initiativesError,
  } = useQuery({
    queryKey: ["ethical-sourcing-initiatives"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ethical_sourcing_initiatives")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        toast.error(`Failed to fetch initiatives: ${error.message}`);
        throw error;
      }
      return (data || []) as Initiative[];
    },
  });

  const createInitiative = useMutation({
    mutationFn: async (newInitiative: Omit<Initiative, "id" | "user_id" | "created_at" | "updated_at">) => {
      const userId = await getUserId();
      const { data, error } = await supabase
        .from("ethical_sourcing_initiatives")
        .insert([{ ...newInitiative, user_id: userId }])
        .select()
        .single();

      if (error) {
        toast.error(`Failed to create initiative: ${error.message}`);
        throw error;
      }
      return data as Initiative;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ethical-sourcing-initiatives"] });
      toast.success("Initiative created successfully");
    }
  });

  const updateInitiative = useMutation({
    mutationFn: async (initiative: Partial<Initiative> & { id: string }) => {
      const { id, ...updates } = initiative;
      const { data, error } = await supabase
        .from("ethical_sourcing_initiatives")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data as Initiative;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ethical-sourcing-initiatives"] });
      toast.success("Initiative updated successfully");
    }
  });

  const deleteInitiative = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("ethical_sourcing_initiatives")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ethical-sourcing-initiatives"] });
      toast.success("Initiative deleted successfully");
    }
  });

  const {
    data: supplierAssessments,
    isLoading: isLoadingSupplierAssessments,
    error: supplierAssessmentsError,
  } = useQuery({
    queryKey: ["supplier-assessments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("supplier_assessments")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        toast.error(`Failed to fetch supplier assessments: ${error.message}`);
        throw error;
      }
      return (data || []) as SupplierAssessment[];
    },
  });

  const createSupplierAssessment = useMutation({
    mutationFn: async (assessment: Omit<SupplierAssessment, "id" | "user_id" | "created_at" | "updated_at">) => {
      const userId = await getUserId();
      const { data, error } = await supabase
        .from("supplier_assessments")
        .insert([{ ...assessment, user_id: userId }])
        .select()
        .single();

      if (error) throw error;
      return data as SupplierAssessment;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supplier-assessments"] });
      toast.success("Supplier assessment created successfully");
    }
  });

  const updateSupplierAssessment = useMutation({
    mutationFn: async (assessment: Partial<SupplierAssessment> & { id: string }) => {
      const { id, ...updates } = assessment;
      const { data, error } = await supabase
        .from("supplier_assessments")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data as SupplierAssessment;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supplier-assessments"] });
      toast.success("Supplier assessment updated successfully");
    }
  });

  const deleteSupplierAssessment = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("supplier_assessments")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supplier-assessments"] });
      toast.success("Supplier assessment deleted successfully");
    }
  });

  const {
    data: impactMetrics,
    isLoading: isLoadingImpactMetrics,
    error: impactMetricsError,
  } = useQuery({
    queryKey: ["ethical-impact-metrics"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ethical_impact_metrics")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        toast.error(`Failed to fetch impact metrics: ${error.message}`);
        throw error;
      }
      return (data || []) as ImpactMetric[];
    },
  });

  const createImpactMetric = useMutation({
    mutationFn: async (metric: Omit<ImpactMetric, "id" | "user_id" | "created_at" | "updated_at">) => {
      const userId = await getUserId();
      const { data, error } = await supabase
        .from("ethical_impact_metrics")
        .insert([{ ...metric, user_id: userId }])
        .select()
        .single();

      if (error) throw error;
      return data as ImpactMetric;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ethical-impact-metrics"] });
      toast.success("Impact metric created successfully");
    }
  });

  const updateImpactMetric = useMutation({
    mutationFn: async (metric: Partial<ImpactMetric> & { id: string }) => {
      const { id, ...updates } = metric;
      const { data, error } = await supabase
        .from("ethical_impact_metrics")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data as ImpactMetric;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ethical-impact-metrics"] });
      toast.success("Impact metric updated successfully");
    }
  });

  const deleteImpactMetric = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("ethical_impact_metrics")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ethical-impact-metrics"] });
      toast.success("Impact metric deleted successfully");
    }
  });

  return {
    initiatives: initiatives || [],
    isLoadingInitiatives,
    initiativesError,
    createInitiative,
    updateInitiative,
    deleteInitiative,

    supplierAssessments: supplierAssessments || [],
    isLoadingSupplierAssessments,
    supplierAssessmentsError,
    createSupplierAssessment,
    updateSupplierAssessment,
    deleteSupplierAssessment,

    impactMetrics: impactMetrics || [],
    isLoadingImpactMetrics,
    impactMetricsError,
    createImpactMetric,
    updateImpactMetric,
    deleteImpactMetric,
  };
}
