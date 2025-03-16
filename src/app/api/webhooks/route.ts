// // import { type WebhookEvent } from "@clerk/clerk-sdk-node";
// import { createClient } from "@supabase/supabase-js";
// import { clerkClient } from "@clerk/clerk-sdk-node";
// import { supabase } from "~/server/supabase";


// export default async function handler(req: { method: string; body: WebhookEvent; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): any; new(): any; }; }; }) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method not allowed" });
//   }

//   const payload: WebhookEvent = req.body;

//   // Ensure it's a user.created or user.updated event
//   if (!["user.created", "user.updated"].includes(payload.type)) {
//     return res.status(400).json({ message: "Invalid event type" });
//   }

//   const userId = payload.data.id;
//   const userEmail = payload.data.email_addresses[0]?.email_address;

//   // Fetch organizations from Supabase
//   const { data: organizations, error } = await supabase
//     .from("user_organizations")
//     .select("organization_id")
//     .eq("user_id", userId);

//   if (error) {
//     console.error("Error fetching organizations:", error);
//     return res.status(500).json({ message: "Failed to fetch organizations" });
//   }

//   // Extract organization IDs
//   const organizationIds = organizations.map(org => org.organization_id);

//   // Update Clerk user metadata
//   await clerkClient.users.updateUser(userId, {
//     publicMetadata: { organizations: organizationIds },
//   });

//   return res.status(200).json({ message: "User metadata updated" });
// }
