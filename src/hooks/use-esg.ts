
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { esgService } from "@/services/esg";
import type { 
  ESGMetricRow, 
  ESGInitiativeRow, 
  ESGReportRow, 
  ESGStakeholderEngagementRow 
} from "@/types/esg";

export function useESG() {
  const queryClient = useQueryClient();

  // Metrics
  const metrics = useQuery({
    queryKey: ['esg-metrics'],
    queryFn: esgService.getMetrics
  });

  const createMetric = useMutation({
    mutationFn: (metric: Omit<ESGMetricRow, 'id' | 'user_id' | 'timestamp'>) => 
      esgService.createMetric(metric),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['esg-metrics'] });
    }
  });

  const updateMetric = useMutation({
    mutationFn: ({ id, metric }: { id: string; metric: Partial<ESGMetricRow> }) => 
      esgService.updateMetric(id, metric),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['esg-metrics'] });
    }
  });

  const deleteMetric = useMutation({
    mutationFn: (id: string) => esgService.deleteMetric(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['esg-metrics'] });
    }
  });

  // Initiatives
  const initiatives = useQuery({
    queryKey: ['esg-initiatives'],
    queryFn: esgService.getInitiatives
  });

  const createInitiative = useMutation({
    mutationFn: (initiative: Omit<ESGInitiativeRow, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => 
      esgService.createInitiative(initiative),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['esg-initiatives'] });
    }
  });

  const updateInitiative = useMutation({
    mutationFn: ({ id, initiative }: { id: string; initiative: Partial<ESGInitiativeRow> }) => 
      esgService.updateInitiative(id, initiative),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['esg-initiatives'] });
    }
  });

  const deleteInitiative = useMutation({
    mutationFn: (id: string) => esgService.deleteInitiative(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['esg-initiatives'] });
    }
  });

  // Reports
  const reports = useQuery({
    queryKey: ['esg-reports'],
    queryFn: esgService.getReports
  });

  const createReport = useMutation({
    mutationFn: (report: Omit<ESGReportRow, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => 
      esgService.createReport(report),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['esg-reports'] });
    }
  });

  const updateReport = useMutation({
    mutationFn: ({ id, report }: { id: string; report: Partial<ESGReportRow> }) => 
      esgService.updateReport(id, report),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['esg-reports'] });
    }
  });

  const deleteReport = useMutation({
    mutationFn: (id: string) => esgService.deleteReport(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['esg-reports'] });
    }
  });

  // Stakeholder Engagements
  const stakeholderEngagements = useQuery({
    queryKey: ['esg-stakeholder-engagements'],
    queryFn: esgService.getStakeholderEngagements
  });

  const createStakeholderEngagement = useMutation({
    mutationFn: (engagement: Omit<ESGStakeholderEngagementRow, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => 
      esgService.createStakeholderEngagement(engagement),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['esg-stakeholder-engagements'] });
    }
  });

  const updateStakeholderEngagement = useMutation({
    mutationFn: ({ id, engagement }: { id: string; engagement: Partial<ESGStakeholderEngagementRow> }) => 
      esgService.updateStakeholderEngagement(id, engagement),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['esg-stakeholder-engagements'] });
    }
  });

  const deleteStakeholderEngagement = useMutation({
    mutationFn: (id: string) => esgService.deleteStakeholderEngagement(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['esg-stakeholder-engagements'] });
    }
  });

  return {
    // Metrics
    metrics: metrics.data ?? [],
    isLoadingMetrics: metrics.isLoading,
    createMetric,
    updateMetric,
    deleteMetric,

    // Initiatives
    initiatives: initiatives.data ?? [],
    isLoadingInitiatives: initiatives.isLoading,
    createInitiative,
    updateInitiative,
    deleteInitiative,

    // Reports
    reports: reports.data ?? [],
    isLoadingReports: reports.isLoading,
    createReport,
    updateReport,
    deleteReport,

    // Stakeholder Engagements
    stakeholderEngagements: stakeholderEngagements.data ?? [],
    isLoadingStakeholderEngagements: stakeholderEngagements.isLoading,
    createStakeholderEngagement,
    updateStakeholderEngagement,
    deleteStakeholderEngagement
  };
}
