export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      analytics_metrics: {
        Row: {
          id: string
          metric_name: string
          metric_type: string
          metric_value: number
          timestamp: string
          user_id: string
        }
        Insert: {
          id?: string
          metric_name: string
          metric_type: string
          metric_value: number
          timestamp?: string
          user_id: string
        }
        Update: {
          id?: string
          metric_name?: string
          metric_type?: string
          metric_value?: number
          timestamp?: string
          user_id?: string
        }
        Relationships: []
      }
      analytics_reports: {
        Row: {
          created_at: string
          data: Json
          description: string | null
          id: string
          report_type: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          data: Json
          description?: string | null
          id?: string
          report_type: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          data?: Json
          description?: string | null
          id?: string
          report_type?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      biodiversity_reports: {
        Row: {
          data: Json
          generated_at: string
          id: string
          impact_score: number
          report_type: string
          risk_level: string
          species_affected: number
          status: string
          title: string
          user_id: string
        }
        Insert: {
          data?: Json
          generated_at?: string
          id?: string
          impact_score: number
          report_type: string
          risk_level: string
          species_affected: number
          status?: string
          title: string
          user_id: string
        }
        Update: {
          data?: Json
          generated_at?: string
          id?: string
          impact_score?: number
          report_type?: string
          risk_level?: string
          species_affected?: number
          status?: string
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      collaboration_metrics: {
        Row: {
          contract_status: string
          engagement_score: number
          id: string
          intelligence_shared: number
          partner_id: string
          timestamp: string
          user_id: string
        }
        Insert: {
          contract_status: string
          engagement_score: number
          id?: string
          intelligence_shared?: number
          partner_id: string
          timestamp?: string
          user_id: string
        }
        Update: {
          contract_status?: string
          engagement_score?: number
          id?: string
          intelligence_shared?: number
          partner_id?: string
          timestamp?: string
          user_id?: string
        }
        Relationships: []
      }
      community_insights: {
        Row: {
          content: string
          created_at: string
          id: string
          insight_type: string
          sentiment_score: number | null
          source: string | null
          topic: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          insight_type: string
          sentiment_score?: number | null
          source?: string | null
          topic: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          insight_type?: string
          sentiment_score?: number | null
          source?: string | null
          topic?: string
          updated_at?: string
        }
        Relationships: []
      }
      compliance_automation_rules: {
        Row: {
          created_at: string
          criteria: Json
          description: string | null
          framework: string
          frequency: string
          id: string
          last_run_at: string | null
          name: string
          next_run_at: string | null
          rule_type: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          criteria?: Json
          description?: string | null
          framework: string
          frequency: string
          id?: string
          last_run_at?: string | null
          name: string
          next_run_at?: string | null
          rule_type: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          criteria?: Json
          description?: string | null
          framework?: string
          frequency?: string
          id?: string
          last_run_at?: string | null
          name?: string
          next_run_at?: string | null
          rule_type?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      custom_metrics: {
        Row: {
          configuration: Json | null
          created_at: string | null
          data_source: string
          description: string | null
          id: string
          is_active: boolean | null
          metric_type: Database["public"]["Enums"]["metric_type"]
          name: string
          updated_at: string | null
          user_id: string | null
          visualization_type: Database["public"]["Enums"]["visualization_type"]
        }
        Insert: {
          configuration?: Json | null
          created_at?: string | null
          data_source: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          metric_type: Database["public"]["Enums"]["metric_type"]
          name: string
          updated_at?: string | null
          user_id?: string | null
          visualization_type: Database["public"]["Enums"]["visualization_type"]
        }
        Update: {
          configuration?: Json | null
          created_at?: string | null
          data_source?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          metric_type?: Database["public"]["Enums"]["metric_type"]
          name?: string
          updated_at?: string | null
          user_id?: string | null
          visualization_type?: Database["public"]["Enums"]["visualization_type"]
        }
        Relationships: []
      }
      custom_reports: {
        Row: {
          created_at: string | null
          date_range: Json
          description: string | null
          export_format: string
          id: string
          metrics: Json
          name: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          date_range: Json
          description?: string | null
          export_format: string
          id?: string
          metrics: Json
          name: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          date_range?: Json
          description?: string | null
          export_format?: string
          id?: string
          metrics?: Json
          name?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      dashboard_preferences: {
        Row: {
          created_at: string
          id: string
          layout: Json | null
          updated_at: string
          user_id: string | null
          widgets: string[] | null
        }
        Insert: {
          created_at?: string
          id?: string
          layout?: Json | null
          updated_at?: string
          user_id?: string | null
          widgets?: string[] | null
        }
        Update: {
          created_at?: string
          id?: string
          layout?: Json | null
          updated_at?: string
          user_id?: string | null
          widgets?: string[] | null
        }
        Relationships: []
      }
      esg_benchmarks: {
        Row: {
          average_value: number
          id: string
          industry: string
          metric_name: string
          unit: string
          updated_at: string
        }
        Insert: {
          average_value: number
          id?: string
          industry: string
          metric_name: string
          unit: string
          updated_at?: string
        }
        Update: {
          average_value?: number
          id?: string
          industry?: string
          metric_name?: string
          unit?: string
          updated_at?: string
        }
        Relationships: []
      }
      esg_compliance_checks: {
        Row: {
          details: Json | null
          framework: string
          id: string
          last_checked_at: string
          next_check_at: string | null
          requirement: string
          status: string
          user_id: string
        }
        Insert: {
          details?: Json | null
          framework: string
          id?: string
          last_checked_at?: string
          next_check_at?: string | null
          requirement: string
          status: string
          user_id: string
        }
        Update: {
          details?: Json | null
          framework?: string
          id?: string
          last_checked_at?: string
          next_check_at?: string | null
          requirement?: string
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      esg_metrics: {
        Row: {
          id: string
          metric_name: string
          metric_type: string
          metric_value: number
          source: string | null
          timestamp: string
          unit: string
          user_id: string
        }
        Insert: {
          id?: string
          metric_name: string
          metric_type: string
          metric_value: number
          source?: string | null
          timestamp?: string
          unit: string
          user_id: string
        }
        Update: {
          id?: string
          metric_name?: string
          metric_type?: string
          metric_value?: number
          source?: string | null
          timestamp?: string
          unit?: string
          user_id?: string
        }
        Relationships: []
      }
      forum_posts: {
        Row: {
          author_id: string
          category: string
          content: string
          created_at: string
          id: string
          title: string
          updated_at: string
        }
        Insert: {
          author_id: string
          category: string
          content: string
          created_at?: string
          id?: string
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string
          category?: string
          content?: string
          created_at?: string
          id?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          attachment_url: string | null
          content: string
          created_at: string
          id: string
          read: boolean | null
          sender_id: string
          thread_id: string
        }
        Insert: {
          attachment_url?: string | null
          content: string
          created_at?: string
          id?: string
          read?: boolean | null
          sender_id: string
          thread_id: string
        }
        Update: {
          attachment_url?: string | null
          content?: string
          created_at?: string
          id?: string
          read?: boolean | null
          sender_id?: string
          thread_id?: string
        }
        Relationships: []
      }
      partner_applications: {
        Row: {
          company_name: string
          contact_email: string
          created_at: string
          description: string | null
          expertise: string | null
          id: string
          partnership_type: Database["public"]["Enums"]["partnership_type"]
          status: Database["public"]["Enums"]["application_status"] | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          company_name: string
          contact_email: string
          created_at?: string
          description?: string | null
          expertise?: string | null
          id?: string
          partnership_type: Database["public"]["Enums"]["partnership_type"]
          status?: Database["public"]["Enums"]["application_status"] | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          company_name?: string
          contact_email?: string
          created_at?: string
          description?: string | null
          expertise?: string | null
          id?: string
          partnership_type?: Database["public"]["Enums"]["partnership_type"]
          status?: Database["public"]["Enums"]["application_status"] | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      partners: {
        Row: {
          contact_email: string | null
          created_at: string
          description: string | null
          id: string
          industry: string | null
          location: string | null
          logo_url: string | null
          name: string
          partnership_type: string
          status: Database["public"]["Enums"]["partner_status"] | null
          updated_at: string
          website_url: string | null
        }
        Insert: {
          contact_email?: string | null
          created_at?: string
          description?: string | null
          id?: string
          industry?: string | null
          location?: string | null
          logo_url?: string | null
          name: string
          partnership_type: string
          status?: Database["public"]["Enums"]["partner_status"] | null
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          contact_email?: string | null
          created_at?: string
          description?: string | null
          id?: string
          industry?: string | null
          location?: string | null
          logo_url?: string | null
          name?: string
          partnership_type?: string
          status?: Database["public"]["Enums"]["partner_status"] | null
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          focus_areas: string[] | null
          full_name: string | null
          id: string
          industry: Database["public"]["Enums"]["industry_type"] | null
          logo_url: string | null
          organization: string | null
          role: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          focus_areas?: string[] | null
          full_name?: string | null
          id: string
          industry?: Database["public"]["Enums"]["industry_type"] | null
          logo_url?: string | null
          organization?: string | null
          role?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          focus_areas?: string[] | null
          full_name?: string | null
          id?: string
          industry?: Database["public"]["Enums"]["industry_type"] | null
          logo_url?: string | null
          organization?: string | null
          role?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      risk_assessments: {
        Row: {
          category: string
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          impact_score: number
          mitigation_plan: string | null
          probability_score: number
          risk_level: string
          status: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          impact_score: number
          mitigation_plan?: string | null
          probability_score: number
          risk_level: string
          status?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          impact_score?: number
          mitigation_plan?: string | null
          probability_score?: number
          risk_level?: string
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      risk_zones: {
        Row: {
          coordinates: Json
          created_at: string
          description: string
          id: string
          location: string
          risk_level: Database["public"]["Enums"]["risk_level"]
          status: string
          timestamp: string
          updated_at: string
          user_id: string
        }
        Insert: {
          coordinates?: Json
          created_at?: string
          description: string
          id?: string
          location: string
          risk_level: Database["public"]["Enums"]["risk_level"]
          status?: string
          timestamp?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          coordinates?: Json
          created_at?: string
          description?: string
          id?: string
          location?: string
          risk_level?: Database["public"]["Enums"]["risk_level"]
          status?: string
          timestamp?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      roundtable_participants: {
        Row: {
          joined_at: string
          roundtable_id: string
          user_id: string
        }
        Insert: {
          joined_at?: string
          roundtable_id: string
          user_id: string
        }
        Update: {
          joined_at?: string
          roundtable_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "roundtable_participants_roundtable_id_fkey"
            columns: ["roundtable_id"]
            isOneToOne: false
            referencedRelation: "virtual_roundtables"
            referencedColumns: ["id"]
          },
        ]
      }
      sensor_metrics: {
        Row: {
          alert_count: number
          data_integrity_score: number
          id: string
          location: Json
          sensor_id: string
          timestamp: string
          uptime_percentage: number
          user_id: string
        }
        Insert: {
          alert_count?: number
          data_integrity_score: number
          id?: string
          location: Json
          sensor_id: string
          timestamp?: string
          uptime_percentage: number
          user_id: string
        }
        Update: {
          alert_count?: number
          data_integrity_score?: number
          id?: string
          location?: Json
          sensor_id?: string
          timestamp?: string
          uptime_percentage?: number
          user_id?: string
        }
        Relationships: []
      }
      supply_chain_nodes: {
        Row: {
          created_at: string
          id: string
          latitude: number
          location_type: string
          longitude: number
          metadata: Json | null
          name: string
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          latitude: number
          location_type: string
          longitude: number
          metadata?: Json | null
          name: string
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          latitude?: number
          location_type?: string
          longitude?: number
          metadata?: Json | null
          name?: string
          status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      supply_chain_routes: {
        Row: {
          created_at: string
          destination_id: string
          id: string
          metadata: Json | null
          origin_id: string
          route_type: string
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          destination_id: string
          id?: string
          metadata?: Json | null
          origin_id: string
          route_type: string
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          destination_id?: string
          id?: string
          metadata?: Json | null
          origin_id?: string
          route_type?: string
          status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "supply_chain_routes_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "supply_chain_nodes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "supply_chain_routes_origin_id_fkey"
            columns: ["origin_id"]
            isOneToOne: false
            referencedRelation: "supply_chain_nodes"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          assignee_id: string | null
          created_at: string
          created_by: string
          description: string | null
          due_date: string | null
          has_dependencies: boolean | null
          id: string
          priority: string | null
          status: Database["public"]["Enums"]["task_status"] | null
          title: string
          updated_at: string
        }
        Insert: {
          assignee_id?: string | null
          created_at?: string
          created_by: string
          description?: string | null
          due_date?: string | null
          has_dependencies?: boolean | null
          id?: string
          priority?: string | null
          status?: Database["public"]["Enums"]["task_status"] | null
          title: string
          updated_at?: string
        }
        Update: {
          assignee_id?: string | null
          created_at?: string
          created_by?: string
          description?: string | null
          due_date?: string | null
          has_dependencies?: boolean | null
          id?: string
          priority?: string | null
          status?: Database["public"]["Enums"]["task_status"] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      virtual_roundtables: {
        Row: {
          created_at: string
          description: string | null
          host_id: string
          id: string
          max_participants: number | null
          scheduled_for: string
          status: string
          title: string
          topic: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          host_id: string
          id?: string
          max_participants?: number | null
          scheduled_for: string
          status?: string
          title: string
          topic: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          host_id?: string
          id?: string
          max_participants?: number | null
          scheduled_for?: string
          status?: string
          title?: string
          topic?: string
          updated_at?: string
        }
        Relationships: []
      }
      wildlife_alerts: {
        Row: {
          created_at: string
          description: string | null
          id: string
          location: Json
          risk_level: string
          status: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          location: Json
          risk_level: string
          status?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          location?: Json
          risk_level?: string
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      application_status: "pending" | "approved" | "rejected"
      industry_type:
        | "manufacturing"
        | "retail"
        | "technology"
        | "agriculture"
        | "transportation"
        | "energy"
        | "healthcare"
        | "other"
      metric_type: "wildlife" | "supply_chain" | "sensor" | "collaboration"
      partner_status: "active" | "inactive" | "pending"
      partnership_type: "technology" | "consulting" | "research" | "other"
      risk_level: "high" | "medium" | "low"
      task_status: "todo" | "in_progress" | "done"
      user_role:
        | "Supply Chain Manager"
        | "ESG Officer"
        | "CSR Leader"
        | "Sustainability Director"
        | "Operations Manager"
        | "Other"
      visualization_type:
        | "bar"
        | "line"
        | "pie"
        | "heatmap"
        | "radar"
        | "area"
        | "gauge"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
