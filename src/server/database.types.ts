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
      EmissionRecord: {
        Row: {
          calculationMethod: string | null
          CO2e: number | null
          comment: string | null
          createdAt: string
          emissionId: string
          productId: string
          recordDate: string | null
          source: string | null
          status: string
          updatedAt: string | null
        }
        Insert: {
          calculationMethod?: string | null
          CO2e?: number | null
          comment?: string | null
          createdAt?: string
          emissionId?: string
          productId: string
          recordDate?: string | null
          source?: string | null
          status: string
          updatedAt?: string | null
        }
        Update: {
          calculationMethod?: string | null
          CO2e?: number | null
          comment?: string | null
          createdAt?: string
          emissionId?: string
          productId?: string
          recordDate?: string | null
          source?: string | null
          status?: string
          updatedAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "EmissionRecord_productId_fkey"
            columns: ["productId"]
            isOneToOne: false
            referencedRelation: "Product"
            referencedColumns: ["productId"]
          },
        ]
      }
      Organization: {
        Row: {
          authId: string | null
          country: string | null
          createdAt: string
          email: string
          organizationId: string
          organizationName: string
          organizationNumber: number | null
          updatedAt: string
        }
        Insert: {
          authId?: string | null
          country?: string | null
          createdAt?: string
          email: string
          organizationId?: string
          organizationName: string
          organizationNumber?: number | null
          updatedAt: string
        }
        Update: {
          authId?: string | null
          country?: string | null
          createdAt?: string
          email?: string
          organizationId?: string
          organizationName?: string
          organizationNumber?: number | null
          updatedAt?: string
        }
        Relationships: []
      }
      OrgRelation: {
        Row: {
          contactEmail: string | null
          contactName: string | null
          createdAt: string
          customerOrgId: string
          id: string
          supplierOrgId: string
          updatedAt: string
        }
        Insert: {
          contactEmail?: string | null
          contactName?: string | null
          createdAt?: string
          customerOrgId: string
          id?: string
          supplierOrgId: string
          updatedAt: string
        }
        Update: {
          contactEmail?: string | null
          contactName?: string | null
          createdAt?: string
          customerOrgId?: string
          id?: string
          supplierOrgId?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "OrgRelation_customerOrgId_fkey"
            columns: ["customerOrgId"]
            isOneToOne: false
            referencedRelation: "Organization"
            referencedColumns: ["organizationId"]
          },
          {
            foreignKeyName: "OrgRelation_supplierOrgId_fkey"
            columns: ["supplierOrgId"]
            isOneToOne: false
            referencedRelation: "Organization"
            referencedColumns: ["organizationId"]
          },
        ]
      }
      Product: {
        Row: {
          comment: string | null
          createdAt: string
          description: string | null
          organizationId: string
          productId: string
          productName: string
          unit: string
          updatedAt: string
        }
        Insert: {
          comment?: string | null
          createdAt?: string
          description?: string | null
          organizationId: string
          productId?: string
          productName: string
          unit: string
          updatedAt: string
        }
        Update: {
          comment?: string | null
          createdAt?: string
          description?: string | null
          organizationId?: string
          productId?: string
          productName?: string
          unit?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "Product_organizationId_fkey"
            columns: ["organizationId"]
            isOneToOne: false
            referencedRelation: "Organization"
            referencedColumns: ["organizationId"]
          },
        ]
      }
      PurchaseRecord: {
        Row: {
          comment: string | null
          createdAt: string
          customerOrgId: string
          productId: string
          purchaseDate: string
          purchaseId: string
          quantity: number
          supplierOrgId: string
          updatedAt: string | null
        }
        Insert: {
          comment?: string | null
          createdAt?: string
          customerOrgId: string
          productId: string
          purchaseDate: string
          purchaseId?: string
          quantity: number
          supplierOrgId: string
          updatedAt?: string | null
        }
        Update: {
          comment?: string | null
          createdAt?: string
          customerOrgId?: string
          productId?: string
          purchaseDate?: string
          purchaseId?: string
          quantity?: number
          supplierOrgId?: string
          updatedAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "PurchaseRecord_customerOrgId_fkey"
            columns: ["customerOrgId"]
            isOneToOne: false
            referencedRelation: "Organization"
            referencedColumns: ["organizationId"]
          },
          {
            foreignKeyName: "PurchaseRecord_productId_fkey"
            columns: ["productId"]
            isOneToOne: false
            referencedRelation: "Product"
            referencedColumns: ["productId"]
          },
          {
            foreignKeyName: "PurchaseRecord_supplierOrgId_fkey"
            columns: ["supplierOrgId"]
            isOneToOne: false
            referencedRelation: "Organization"
            referencedColumns: ["organizationId"]
          },
        ]
      }
      User: {
        Row: {
          authId: string | null
          createdAt: string
          email: string
          id: string
          organizations: string | null
          updatedAt: string | null
        }
        Insert: {
          authId?: string | null
          createdAt?: string
          email: string
          id?: string
          organizations?: string | null
          updatedAt?: string | null
        }
        Update: {
          authId?: string | null
          createdAt?: string
          email?: string
          id?: string
          organizations?: string | null
          updatedAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "User_organizations_fkey"
            columns: ["organizations"]
            isOneToOne: false
            referencedRelation: "Organization"
            referencedColumns: ["organizationId"]
          },
        ]
      }
      UserOrganization: {
        Row: {
          createdAt: string
          id: string
          organizationId: string | null
          role: string
          updatedAt: string | null
          userId: string
        }
        Insert: {
          createdAt?: string
          id?: string
          organizationId?: string | null
          role: string
          updatedAt?: string | null
          userId: string
        }
        Update: {
          createdAt?: string
          id?: string
          organizationId?: string | null
          role?: string
          updatedAt?: string | null
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "UserOrganization_organizationId_fkey"
            columns: ["organizationId"]
            isOneToOne: false
            referencedRelation: "Organization"
            referencedColumns: ["organizationId"]
          },
          {
            foreignKeyName: "UserOrganization_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
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
      [_ in never]: never
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
