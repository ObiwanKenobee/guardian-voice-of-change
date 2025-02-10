
export type ESGCategory = 'environmental' | 'social' | 'governance';
export type ESGStatus = 'on_track' | 'at_risk' | 'off_track';
export type InitiativeStatus = 'planned' | 'in_progress' | 'completed' | 'on_hold';
export type ReportStatus = 'draft' | 'under_review' | 'published';
export type EngagementStatus = 'planned' | 'completed' | 'requires_follow_up';

export interface ESGMetric {
  id: string;
  user_id: string;
  metric_name: string;
  category: ESGCategory;
  value: number;
  unit?: string;
  target?: number;
  date_recorded: string;
  status: ESGStatus;
  created_at: string;
  updated_at: string;
}

export interface ESGInitiative {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  category: ESGCategory;
  status: InitiativeStatus;
  start_date?: string;
  end_date?: string;
  budget?: number;
  impact_score?: number;
  created_at: string;
  updated_at: string;
}

export interface ESGReport {
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

export interface ESGStakeholderEngagement {
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
