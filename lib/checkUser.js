// lib/checkUser.js
import { currentUser } from "@clerk/nextjs/server";
import supabase from "@/lib/supabaseClient";

export const checkUser = async () => {
  const user = await currentUser();
  if (!user) return null;

  try {
    // Check if user already exists
    const { data: existingUsers, error: findError } = await supabase
      .from("User")
      .select("*")
      .eq("clerkUserId", user.id)
      .limit(1)
      .single();

    if (findError && findError.code !== "PGRST116") {
      // Not "No rows found", but an actual error
      throw findError;
    }

    if (existingUsers) return existingUsers;

    const name = `${user.firstName || ""} ${user.lastName || ""}`.trim();

    // Create new user
    const { data: newUser, error: insertError } = await supabase
      .from("User")
      .insert([
        {
          clerkUserId: user.id,
          name: name || "Unnamed User",
          imageUrl: user.imageUrl || "",
          email: user.emailAddresses[0]?.emailAddress || "",
        },
      ])
      .select()
      .single();

    if (insertError) throw insertError;

    return newUser;
  } catch (error) {
    console.error("Error checking/creating user:", error);
    return null;
  }
};
