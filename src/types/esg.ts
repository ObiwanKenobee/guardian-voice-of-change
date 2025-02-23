
export type ESGCategory = 'environmental' | 'social' | 'governance';
export type ESGStatus = 'on_track' | 'at_risk' | 'off_track';
export type InitiativeStatus = 'planned' | 'in_progress' | 'completed' | 'on_hold';
export type ReportStatus = 'draft' | 'under_review' | 'published';
export type EngagementStatus = 'planned' | 'completed' | 'requires_follow_up';

// Database types that match our schema exactly
export interface ESGMetricRow {
  id: string;
  user_id: string;
  metric_name: string;
  metric_type: string;
  metric_value: number;
  unit: string;
  source?: string;
  timestamp: string;
}

export interface InitiativeRow {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  budget?: number;
  impact_score?: number;
  status: InitiativeStatus;
  created_at: string;
  updated_at: string;
}

export interface ReportRow {
  id: string;
  user_id: string;
  title: string;
  report_type: string;
  content: Record<string, any>; 
  reporting_period?: string;
  published_at?: string;
  status: ReportStatus;
  created_at: string;
  updated_at: string;
}

export interface ESGStakeholderEngagementRow {
  id: string;
  user_id: string;
  stakeholder_name: string;
  engagement_type: string;
  engagement_date?: string;
  summary?: string;
  outcomes?: string;
  follow_up_actions?: string;
  status: EngagementStatus;
  created_at: string;
  updated_at: string;
}

// Aliasing types for better semantic understanding
export type ESGMetric = ESGMetricRow;
export type Initiative = InitiativeRow;
export type Report = ReportRow;
export type StakeholderEngagement = ESGStakeholderEngagementRow;
