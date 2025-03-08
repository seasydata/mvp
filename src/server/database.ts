export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      EmissionRecord: {
        Row: {
          createdAt: string
          id: string
          productId: string
          quantityUnit: string
          quantityValue: number
          recordDate: string
          status: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          id?: string
          productId: string
          quantityUnit: string
          quantityValue: number
          recordDate: string
          status: string
          updatedAt: string
        }
        Update: {
          createdAt?: string
          id?: string
          productId?: string
          quantityUnit?: string
          quantityValue?: number
          recordDate?: string
          status?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "EmissionRecord_productId_fkey"
            columns: ["productId"]
            isOneToOne: false
            referencedRelation: "Product"
            referencedColumns: ["id"]
          },
        ]
      }
      Organization: {
        Row: {
          authId: string | null
          country: string | null
          createdAt: string
          id: string
          name: string
          organizationNumber: number | null
          updatedAt: string
        }
        Insert: {
          authId?: string | null
          country?: string | null
          createdAt?: string
          id?: string
          name: string
          organizationNumber?: number | null
          updatedAt: string
        }
        Update: {
          authId?: string | null
          country?: string | null
          createdAt?: string
          id?: string
          name?: string
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
          id: string
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
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "OrgRelation_supplierOrgId_fkey"
            columns: ["supplierOrgId"]
            isOneToOne: false
            referencedRelation: "Organization"
            referencedColumns: ["id"]
          },
        ]
      }
      Product: {
        Row: {
          calculationMethod: string
          createdAt: string
          emissionUnit: string
          emissionValue: number
          id: string
          name: string
          organizationId: string
          description: string | null
          updatedAt: string
        }
        Insert: {
          calculationMethod: string
          createdAt?: string
          emissionUnit: string
          emissionValue: number
          id?: string
          name: string
          organizationId: string
          description?: string | null
          updatedAt: string
        }
        Update: {
          calculationMethod?: string
          createdAt?: string
          emissionUnit?: string
          emissionValue?: number
          id?: string
          name?: string
          organizationId?: string
          description?: string | null
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "Product_organizationId_fkey"
            columns: ["organizationId"]
            isOneToOne: false
            referencedRelation: "Organization"
            referencedColumns: ["id"]
          },
        ]
      }
      PurchaseRecord: {
        Row: {
          createdAt: string
          customerOrgId: string
          id: string
          productId: string
          purchaseDate: string
          quantityUnit: string
          quantityValue: number
          supplierOrgId: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          customerOrgId: string
          id?: string
          productId: string
          purchaseDate: string
          quantityUnit: string
          quantityValue: number
          supplierOrgId: string
          updatedAt: string
        }
        Update: {
          createdAt?: string
          customerOrgId?: string
          id?: string
          productId?: string
          purchaseDate?: string
          quantityUnit?: string
          quantityValue?: number
          supplierOrgId?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "PurchaseRecord_customerOrgId_fkey"
            columns: ["customerOrgId"]
            isOneToOne: false
            referencedRelation: "Organization"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "PurchaseRecord_productId_fkey"
            columns: ["productId"]
            isOneToOne: false
            referencedRelation: "Product"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "PurchaseRecord_supplierOrgId_fkey"
            columns: ["supplierOrgId"]
            isOneToOne: false
            referencedRelation: "Organization"
            referencedColumns: ["id"]
          },
        ]
      }
      User: {
        Row: {
          authId: string
          createdAt: string
          email: string
          id: string
          updatedAt: string
        }
        Insert: {
          authId: string
          createdAt?: string
          email: string
          id: string
          updatedAt: string
        }
        Update: {
          authId?: string
          createdAt?: string
          email?: string
          id?: string
          updatedAt?: string
        }
        Relationships: []
      }
      UserOrganization: {
        Row: {
          createdAt: string
          id: string
          OrganizationId: string | null
          role: string
          updatedAt: string
          userId: string
        }
        Insert: {
          createdAt?: string
          id: string
          OrganizationId?: string | null
          role: string
          updatedAt: string
          userId: string
        }
        Update: {
          createdAt?: string
          id?: string
          OrganizationId?: string | null
          role?: string
          updatedAt?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "UserOrganization_OrganizationId_fkey"
            columns: ["OrganizationId"]
            isOneToOne: false
            referencedRelation: "Organization"
            referencedColumns: ["id"]
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
