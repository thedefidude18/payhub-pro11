export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          password_hash: string | null
          full_name: string
          avatar_url: string | null
          role: "admin" | "freelancer" | "superfreelancer" | "client"
          status: "active" | "suspended" | "banned"
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          password_hash?: string | null
          full_name: string
          avatar_url?: string | null
          role: "admin" | "freelancer" | "superfreelancer" | "client"
          status?: "active" | "suspended" | "banned"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          password_hash?: string | null
          full_name?: string
          avatar_url?: string | null
          role?: "admin" | "freelancer" | "superfreelancer" | "client"
          status?: "active" | "suspended" | "banned"
          created_at?: string
          updated_at?: string
        }
      }
      freelancers: {
        Row: {
          id: string
          user_id: string
          subdomain: string | null
          subdomain_status: "pending" | "approved" | "rejected"
          business_name: string | null
          bio: string | null
          logo_url: string | null
          banner_url: string | null
          cover_image_url: string | null
          custom_domain: string | null
          commission_rate: number
          total_earnings: number
          total_projects: number
          approval_rating: number
          payout_method: string
          payout_details: any
          branding_settings: any
          notification_settings: any
          is_verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          subdomain?: string | null
          subdomain_status?: "pending" | "approved" | "rejected"
          business_name?: string | null
          bio?: string | null
          logo_url?: string | null
          banner_url?: string | null
          cover_image_url?: string | null
          custom_domain?: string | null
          commission_rate?: number
          total_earnings?: number
          total_projects?: number
          approval_rating?: number
          payout_method?: string
          payout_details?: any
          branding_settings?: any
          notification_settings?: any
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          subdomain?: string | null
          subdomain_status?: "pending" | "approved" | "rejected"
          business_name?: string | null
          bio?: string | null
          logo_url?: string | null
          banner_url?: string | null
          cover_image_url?: string | null
          custom_domain?: string | null
          commission_rate?: number
          total_earnings?: number
          total_projects?: number
          approval_rating?: number
          payout_method?: string
          payout_details?: any
          branding_settings?: any
          notification_settings?: any
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          freelancer_id: string
          client_email: string
          client_name: string | null
          title: string
          description: string | null
          category: string | null
          price: number
          status: "draft" | "preview_sent" | "approved" | "paid" | "delivered" | "cancelled"
          deadline: string | null
          preview_url: string | null
          final_file_url: string | null
          download_token: string | null
          download_expires_at: string | null
          watermark_enabled: boolean
          preview_duration: number | null
          tags: string[] | null
          folder_id: string | null
          version: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          freelancer_id: string
          client_email: string
          client_name?: string | null
          title: string
          description?: string | null
          category?: string | null
          price: number
          status?: "draft" | "preview_sent" | "approved" | "paid" | "delivered" | "cancelled"
          deadline?: string | null
          preview_url?: string | null
          final_file_url?: string | null
          download_token?: string | null
          download_expires_at?: string | null
          watermark_enabled?: boolean
          preview_duration?: number | null
          tags?: string[] | null
          folder_id?: string | null
          version?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          freelancer_id?: string
          client_email?: string
          client_name?: string | null
          title?: string
          description?: string | null
          category?: string | null
          price?: number
          status?: "draft" | "preview_sent" | "approved" | "paid" | "delivered" | "cancelled"
          deadline?: string | null
          preview_url?: string | null
          final_file_url?: string | null
          download_token?: string | null
          download_expires_at?: string | null
          watermark_enabled?: boolean
          preview_duration?: number | null
          tags?: string[] | null
          folder_id?: string | null
          version?: number
          created_at?: string
          updated_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          project_id: string
          freelancer_id: string
          client_email: string
          amount: number
          commission_amount: number
          freelancer_amount: number
          currency: string
          payment_method: string | null
          payment_gateway: string | null
          transaction_id: string | null
          status: "pending" | "completed" | "failed" | "refunded"
          invoice_url: string | null
          receipt_url: string | null
          processed_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          freelancer_id: string
          client_email: string
          amount: number
          commission_amount: number
          freelancer_amount: number
          currency?: string
          payment_method?: string | null
          payment_gateway?: string | null
          transaction_id?: string | null
          status?: "pending" | "completed" | "failed" | "refunded"
          invoice_url?: string | null
          receipt_url?: string | null
          processed_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          freelancer_id?: string
          client_email?: string
          amount?: number
          commission_amount?: number
          freelancer_amount?: number
          currency?: string
          payment_method?: string | null
          payment_gateway?: string | null
          transaction_id?: string | null
          status?: "pending" | "completed" | "failed" | "refunded"
          invoice_url?: string | null
          receipt_url?: string | null
          processed_at?: string | null
          created_at?: string
        }
      }
      comments: {
        Row: {
          id: string
          project_id: string
          client_email: string
          client_name: string | null
          content: string
          timestamp_position: number | null
          page_number: number | null
          coordinates: any | null
          parent_comment_id: string | null
          status: "active" | "resolved" | "deleted"
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          client_email: string
          client_name?: string | null
          content: string
          timestamp_position?: number | null
          page_number?: number | null
          coordinates?: any | null
          parent_comment_id?: string | null
          status?: "active" | "resolved" | "deleted"
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          client_email?: string
          client_name?: string | null
          content?: string
          timestamp_position?: number | null
          page_number?: number | null
          coordinates?: any | null
          parent_comment_id?: string | null
          status?: "active" | "resolved" | "deleted"
          created_at?: string
        }
      }
      activity_logs: {
        Row: {
          id: string
          user_id: string | null
          project_id: string | null
          action: string
          details: any | null
          ip_address: string | null
          user_agent: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          project_id?: string | null
          action: string
          details?: any | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          project_id?: string | null
          action?: string
          details?: any | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
      }
      platform_settings: {
        Row: {
          id: string
          key: string
          value: any
          description: string | null
          updated_by: string | null
          updated_at: string
        }
        Insert: {
          id?: string
          key: string
          value: any
          description?: string | null
          updated_by?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          key?: string
          value?: any
          description?: string | null
          updated_by?: string | null
          updated_at?: string
        }
      }
    }
  }
}
