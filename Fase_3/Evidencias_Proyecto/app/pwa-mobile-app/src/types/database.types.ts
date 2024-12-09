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
      buildings: {
        Row: {
          created_at: string
          direction: string | null
          id: number
          mappedin_map_id: string | null
          name: string | null
          organization_id: number | null
        }
        Insert: {
          created_at?: string
          direction?: string | null
          id?: number
          mappedin_map_id?: string | null
          name?: string | null
          organization_id?: number | null
        }
        Update: {
          created_at?: string
          direction?: string | null
          id?: number
          mappedin_map_id?: string | null
          name?: string | null
          organization_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "buildings_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      devices: {
        Row: {
          created_at: string
          id: number
          in_or_out: Database["public"]["Enums"]["in_or_out"]
          name: string
          observations: string | null
          profile_id: string | null
          qr_uuid: string | null
          room_id: number | null
          status: Database["public"]["Enums"]["device_status"]
          tag_id: number
          type: Database["public"]["Enums"]["device_type"]
        }
        Insert: {
          created_at?: string
          id?: number
          in_or_out: Database["public"]["Enums"]["in_or_out"]
          name: string
          observations?: string | null
          profile_id?: string | null
          qr_uuid?: string | null
          room_id?: number | null
          status: Database["public"]["Enums"]["device_status"]
          tag_id: number
          type: Database["public"]["Enums"]["device_type"]
        }
        Update: {
          created_at?: string
          id?: number
          in_or_out?: Database["public"]["Enums"]["in_or_out"]
          name?: string
          observations?: string | null
          profile_id?: string | null
          qr_uuid?: string | null
          room_id?: number | null
          status?: Database["public"]["Enums"]["device_status"]
          tag_id?: number
          type?: Database["public"]["Enums"]["device_type"]
        }
        Relationships: [
          {
            foreignKeyName: "devices_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "devices_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      favorites: {
        Row: {
          created_at: string
          device_id: number
          id: number
          profile_id: string
        }
        Insert: {
          created_at?: string
          device_id: number
          id?: number
          profile_id?: string
        }
        Update: {
          created_at?: string
          device_id?: number
          id?: number
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorites_device_id_fkey"
            columns: ["device_id"]
            isOneToOne: false
            referencedRelation: "devices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorites_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      floors: {
        Row: {
          building_id: number
          created_at: string
          id: number
          mappedin_floor_id: string | null
          name: string
        }
        Insert: {
          building_id: number
          created_at?: string
          id?: number
          mappedin_floor_id?: string | null
          name: string
        }
        Update: {
          building_id?: number
          created_at?: string
          id?: number
          mappedin_floor_id?: string | null
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "floors_building_id_fkey"
            columns: ["building_id"]
            isOneToOne: false
            referencedRelation: "buildings"
            referencedColumns: ["id"]
          },
        ]
      }
      mappedin_configuration: {
        Row: {
          created_at: string
          id: number
          mappedin_client: string
          mappedin_sec: string
        }
        Insert: {
          created_at?: string
          id?: number
          mappedin_client: string
          mappedin_sec: string
        }
        Update: {
          created_at?: string
          id?: number
          mappedin_client?: string
          mappedin_sec?: string
        }
        Relationships: []
      }
      maps: {
        Row: {
          created_at: string
          floor_id: number
          id: number
          map_image: string
          nota_ale: string | null
        }
        Insert: {
          created_at?: string
          floor_id: number
          id?: number
          map_image: string
          nota_ale?: string | null
        }
        Update: {
          created_at?: string
          floor_id?: number
          id?: number
          map_image?: string
          nota_ale?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "maps_floor_id_fkey"
            columns: ["floor_id"]
            isOneToOne: false
            referencedRelation: "floors"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          description: string
          id: number
          profile_id: string
          title: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: number
          profile_id: string
          title: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: number
          profile_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          created_at: string
          id: number
          logo_url: string | null
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          logo_url?: string | null
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          logo_url?: string | null
          name?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          building_id: number | null
          full_name: string | null
          id: string
          is_active: boolean
          medical_role: Database["public"]["Enums"]["medical_role"]
          observations: string | null
          sex: Database["public"]["Enums"]["sex"]
          updated_at: string | null
        }
        Insert: {
          building_id?: number | null
          full_name?: string | null
          id: string
          is_active?: boolean
          medical_role?: Database["public"]["Enums"]["medical_role"]
          observations?: string | null
          sex?: Database["public"]["Enums"]["sex"]
          updated_at?: string | null
        }
        Update: {
          building_id?: number | null
          full_name?: string | null
          id?: string
          is_active?: boolean
          medical_role?: Database["public"]["Enums"]["medical_role"]
          observations?: string | null
          sex?: Database["public"]["Enums"]["sex"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_building_id_fkey"
            columns: ["building_id"]
            isOneToOne: false
            referencedRelation: "buildings"
            referencedColumns: ["id"]
          },
        ]
      }
      reports: {
        Row: {
          created_at: string
          description: string
          device_id: number
          id: number
          profile_id: string
        }
        Insert: {
          created_at?: string
          description: string
          device_id: number
          id?: number
          profile_id: string
        }
        Update: {
          created_at?: string
          description?: string
          device_id?: number
          id?: number
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bug_reports_device_id_fkey"
            columns: ["device_id"]
            isOneToOne: false
            referencedRelation: "devices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bug_reports_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      rooms: {
        Row: {
          area: string | null
          beacon_id: number
          created_at: string
          floor: number
          id: number
          mappedin_space_id: string | null
          name: string
        }
        Insert: {
          area?: string | null
          beacon_id: number
          created_at?: string
          floor: number
          id?: number
          mappedin_space_id?: string | null
          name: string
        }
        Update: {
          area?: string | null
          beacon_id?: number
          created_at?: string
          floor?: number
          id?: number
          mappedin_space_id?: string | null
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "rooms_floor_fkey"
            columns: ["floor"]
            isOneToOne: false
            referencedRelation: "floors"
            referencedColumns: ["id"]
          },
        ]
      }
      usage_history: {
        Row: {
          created_at: string
          device_id: number
          id: number
          profile_id: string | null
          room_id: number | null
        }
        Insert: {
          created_at?: string
          device_id: number
          id?: number
          profile_id?: string | null
          room_id?: number | null
        }
        Update: {
          created_at?: string
          device_id?: number
          id?: number
          profile_id?: string | null
          room_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "usage_history_device_id_fkey"
            columns: ["device_id"]
            isOneToOne: false
            referencedRelation: "devices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "usage_history_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "usage_history_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      device_status: "available" | "occupied" | "unavailable" | "deleted"
      device_type:
        | "diagnostic"
        | "therapeutic"
        | "surgical"
        | "life_support"
        | "rehabilitation"
        | "home_care"
        | "sterilization_disinfection"
        | "medical_furniture"
        | "communication_management"
      in_or_out: "in" | "out"
      medical_role: "doctor" | "nurse" | "tens" | "admin"
      sex: "male" | "female"
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
