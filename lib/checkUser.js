// lib/checkUser.js
import { currentUser } from "@clerk/nextjs/server";
import supabase from "@/lib/supabaseClient";

export const checkUser = async () => {
  const user = await currentUser();
  if (!user) return null;

  try {
    // Check if user exists
    const { data: existingUser, error: findError } = await supabase
      .from("users")
      .select("*")
      .eq("clerkUserId", user.id)
      .limit(1)
      .single();

    if (findError && findError.code !== "PGRST116") {
      throw findError;
    }

    if (existingUser) return existingUser;

    // Create user if not found
    const name = `${user.firstName || ""} ${user.lastName || ""}`.trim();

    const { data: newUser, error: insertError } = await supabase
      .from("users")
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
