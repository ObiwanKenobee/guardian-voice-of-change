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
      partner_status: "active" | "inactive" | "pending"
      partnership_type: "technology" | "consulting" | "research" | "other"
      task_status: "todo" | "in_progress" | "done"
      user_role:
        | "Supply Chain Manager"
        | "ESG Officer"
        | "CSR Leader"
        | "Sustainability Director"
        | "Operations Manager"
        | "Other"
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
