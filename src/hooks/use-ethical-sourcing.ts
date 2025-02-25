import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Initiative {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  category: string;
  status: 'planned' | 'active' | 'completed' | 'paused';
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

  // Initiatives
  const {
    data: initiatives,
    isLoading: isLoadingInitiatives,
    error: initiativesError,
  } = useQuery<Initiative[]>({
    queryKey: ["initiatives"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("initiatives")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        toast.error(`Failed to fetch initiatives: ${error.message}`);
        throw new Error(error.message);
      }
      return data || [];
    },
  });

  const createInitiativeMutation = useMutation<Initiative, Error, Omit<Initiative, 'id' | 'user_id' | 'created_at' | 'updated_at'>>({
    mutationFn: async (newInitiative) => {
      const { data, error } = await supabase
        .from("initiatives")
        .insert([{ ...newInitiative, user_id: supabase.auth.user()?.id }])
        .select()
        .single();

      if (error) {
        toast.error(`Failed to create initiative: ${error.message}`);
        throw new Error(error.message);
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["initiatives"] });
      toast.success("Initiative created successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to create initiative: ${error.message}`);
    },
  });

  const updateInitiativeMutation = useMutation<Initiative, Error, Initiative>({
    mutationFn: async (updatedInitiative) => {
      const { data, error } = await supabase
        .from("initiatives")
        .update(updatedInitiative)
        .eq("id", updatedInitiative.id)
        .select()
        .single();

      if (error) {
        toast.error(`Failed to update initiative: ${error.message}`);
        throw new Error(error.message);
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["initiatives"] });
      toast.success("Initiative updated successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to update initiative: ${error.message}`);
    },
  });

  const deleteInitiativeMutation = useMutation<void, Error, string>({
    mutationFn: async (id) => {
      const { error } = await supabase.from("initiatives").delete().eq("id", id);
      if (error) {
        toast.error(`Failed to delete initiative: ${error.message}`);
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["initiatives"] });
      toast.success("Initiative deleted successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to delete initiative: ${error.message}`);
    },
  });

  // Supplier Assessments
  const {
    data: supplierAssessments,
    isLoading: isLoadingSupplierAssessments,
    error: supplierAssessmentsError,
  } = useQuery<SupplierAssessment[]>({
    queryKey: ["supplierAssessments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("supplier_assessments")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        toast.error(`Failed to fetch supplier assessments: ${error.message}`);
        throw new Error(error.message);
      }
      return data || [];
    },
  });

  const createSupplierAssessmentMutation = useMutation<SupplierAssessment, Error, Omit<SupplierAssessment, 'id' | 'user_id' | 'created_at' | 'updated_at'>>({
    mutationFn: async (newAssessment) => {
      const { data, error } = await supabase
        .from("supplier_assessments")
        .insert([{ ...newAssessment, user_id: supabase.auth.user()?.id }])
        .select()
        .single();

      if (error) {
        toast.error(`Failed to create supplier assessment: ${error.message}`);
        throw new Error(error.message);
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supplierAssessments"] });
      toast.success("Supplier assessment created successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to create supplier assessment: ${error.message}`);
    },
  });

  const updateSupplierAssessmentMutation = useMutation<SupplierAssessment, Error, SupplierAssessment>({
    mutationFn: async (updatedAssessment) => {
      const { data, error } = await supabase
        .from("supplier_assessments")
        .update(updatedAssessment)
        .eq("id", updatedAssessment.id)
        .select()
        .single();

      if (error) {
        toast.error(`Failed to update supplier assessment: ${error.message}`);
        throw new Error(error.message);
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supplierAssessments"] });
      toast.success("Supplier assessment updated successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to update supplier assessment: ${error.message}`);
    },
  });

  const deleteSupplierAssessmentMutation = useMutation<void, Error, string>({
    mutationFn: async (id) => {
      const { error } = await supabase.from("supplier_assessments").delete().eq("id", id);
      if (error) {
        toast.error(`Failed to delete supplier assessment: ${error.message}`);
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["supplierAssessments"] });
      toast.success("Supplier assessment deleted successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to delete supplier assessment: ${error.message}`);
    },
  });

  // Impact Metrics
  const {
    data: impactMetrics,
    isLoading: isLoadingImpactMetrics,
    error: impactMetricsError,
  } = useQuery<ImpactMetric[]>({
    queryKey: ["impactMetrics"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("impact_metrics")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        toast.error(`Failed to fetch impact metrics: ${error.message}`);
        throw new Error(error.message);
      }
      return data || [];
    },
  });

  const createImpactMetricMutation = useMutation<ImpactMetric, Error, Omit<ImpactMetric, 'id' | 'user_id' | 'created_at' | 'updated_at'>>({
    mutationFn: async (newMetric) => {
      const { data, error } = await supabase
        .from("impact_metrics")
        .insert([{ ...newMetric, user_id: supabase.auth.user()?.id }])
        .select()
        .single();

      if (error) {
        toast.error(`Failed to create impact metric: ${error.message}`);
        throw new Error(error.message);
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["impactMetrics"] });
      toast.success("Impact metric created successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to create impact metric: ${error.message}`);
    },
  });

  const updateImpactMetricMutation = useMutation<ImpactMetric, Error, ImpactMetric>({
    mutationFn: async (updatedMetric) => {
      const { data, error } = await supabase
        .from("impact_metrics")
        .update(updatedMetric)
        .eq("id", updatedMetric.id)
        .select()
        .single();

      if (error) {
        toast.error(`Failed to update impact metric: ${error.message}`);
        throw new Error(error.message);
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["impactMetrics"] });
      toast.success("Impact metric updated successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to update impact metric: ${error.message}`);
    },
  });

  const deleteImpactMetricMutation = useMutation<void, Error, string>({
    mutationFn: async (id) => {
      const { error } = await supabase.from("impact_metrics").delete().eq("id", id);
      if (error) {
        toast.error(`Failed to delete impact metric: ${error.message}`);
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["impactMetrics"] });
      toast.success("Impact metric deleted successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to delete impact metric: ${error.message}`);
    },
  });

  return {
    initiatives: initiatives || [],
    isLoadingInitiatives,
    supplierAssessments: supplierAssessments || [],
    isLoadingSupplierAssessments,
    impactMetrics: impactMetrics || [],
    isLoadingImpactMetrics,
    createInitiative: createInitiativeMutation,
    updateInitiative: updateInitiativeMutation,
    deleteInitiative: deleteInitiativeMutation,
    createSupplierAssessment: createSupplierAssessmentMutation,
    updateSupplierAssessment: updateSupplierAssessmentMutation,
    deleteSupplierAssessment: deleteSupplierAssessmentMutation,
    createImpactMetric: createImpactMetricMutation,
    updateImpactMetric: updateImpactMetricMutation,
    deleteImpactMetric: deleteImpactMetricMutation,
  };
}
