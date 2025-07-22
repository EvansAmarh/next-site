"use server";

import supabase from "@/lib/supabaseClient";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// Get collections for the current user
export async function getCollections() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // Get user row using Clerk userId
  const { data: user, error: userError } = await supabase
    .from("user")
    .select("id")
    .eq("clerkUserId", userId)
    .single();

  if (userError || !user) throw new Error("User not found");

  // Fetch collections for user
  const { data: collections, error } = await supabase
    .from("collections")
    .select("*")
    .eq("userId", user.id)
    .order("createdAt", { ascending: false });

  if (error) throw new Error(error.message);

  return collections;
}

// Create a new collection
export async function createCollection(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const { data: user, error: userError } = await supabase
    .from("user")
    .select("id")
    .eq("clerkUserId", userId)
    .single();

  if (userError || !user) throw new Error("User not found");

  const { data: collection, error } = await supabase
    .from("collections")
    .insert([
      {
        name: data.name,
        description: data.description,
        userId: user.id,
      },
    ])
    .select()
    .single();

  if (error) throw new Error(error.message);

  revalidatePath("/dashboard");
  return collection;
}

// Delete a collection
export async function deleteCollection(id) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const { data: user, error: userError } = await supabase
    .from("user")
    .select("id")
    .eq("clerkUserId", userId)
    .single();

  if (userError || !user) throw new Error("User not found");

  // Check ownership
  const { data: collection, error: collectionError } = await supabase
    .from("collections")
    .select("id")
    .eq("id", id)
    .eq("userId", user.id)
    .single();

  if (collectionError || !collection) throw new Error("Collection not found");

  // Delete
  const { error } = await supabase.from("collections").delete().eq("id", id);
  if (error) throw new Error(error.message);

  return true;
}
