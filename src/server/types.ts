import type {Database} from "./database"


// Export each type from the Supabase-generated file, for use in trpc routes and react components.
export type PurchaseRecord = Database["public"]["Tables"]["PurchaseRecord"]["Row"];
export type EmissionRecord = Database["public"]["Tables"]["EmissionRecord"]["Row"];
export type Organization = Database["public"]["Tables"]["Organization"]["Row"];
export type Product = Database["public"]["Tables"]["Product"]["Row"];
export type User = Database["public"]["Tables"]["User"]["Row"];
export type OrgRelation = Database["public"]["Tables"]["OrgRelation"]["Row"];
export type UserOrganization = Database["public"]["Tables"]["UserOrganization"]["Row"];