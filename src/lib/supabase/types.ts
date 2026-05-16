export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string | null;
          full_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          user_id: string;
          asin: string | null;
          title: string;
          image: string | null;
          price: number | null;
          bsr: number | null;
          estimated_sales: number | null;
          category: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          asin?: string | null;
          title: string;
          image?: string | null;
          price?: number | null;
          bsr?: number | null;
          estimated_sales?: number | null;
          category?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          asin?: string | null;
          title?: string;
          image?: string | null;
          price?: number | null;
          bsr?: number | null;
          estimated_sales?: number | null;
          category?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      keywords: {
        Row: {
          id: string;
          user_id: string;
          keyword: string;
          search_volume_est: number | null;
          competition: string | null;
          cpc_est: number | null;
          relevance: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          keyword: string;
          search_volume_est?: number | null;
          competition?: string | null;
          cpc_est?: number | null;
          relevance?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          keyword?: string;
          search_volume_est?: number | null;
          competition?: string | null;
          cpc_est?: number | null;
          relevance?: number | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      listings: {
        Row: {
          id: string;
          user_id: string;
          asin: string | null;
          title: string | null;
          bullets: Json;
          description: string | null;
          backend_keywords: string | null;
          score: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          asin?: string | null;
          title?: string | null;
          bullets?: Json;
          description?: string | null;
          backend_keywords?: string | null;
          score?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          asin?: string | null;
          title?: string | null;
          bullets?: Json;
          description?: string | null;
          backend_keywords?: string | null;
          score?: number | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

