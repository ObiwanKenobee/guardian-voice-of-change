
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      ethical_sourcing_initiatives: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description?: string;
          category: string;
          status: 'planned' | 'in_progress' | 'completed' | 'on_hold';
          impact_level: 'low' | 'medium' | 'high' | 'very_high';
          start_date?: string;
          end_date?: string;
          target_metrics: Json;
          current_metrics: Json;
          budget?: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['ethical_sourcing_initiatives']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['ethical_sourcing_initiatives']['Insert']>;
      };
      supplier_assessments: {
        Row: {
          id: string;
          user_id: string;
          supplier_name: string;
          status: 'pending' | 'approved' | 'at_risk' | 'suspended';
          compliance_score: number;
          risk_areas: string[];
          last_audit_date?: string;
          next_audit_date?: string;
          certification_details: Json;
          contact_information: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['supplier_assessments']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['supplier_assessments']['Insert']>;
      };
      ethical_impact_metrics: {
        Row: {
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
        };
        Insert: Omit<Database['public']['Tables']['ethical_impact_metrics']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['ethical_impact_metrics']['Insert']>;
      };
    };
  };
}
