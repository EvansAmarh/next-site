"use server";

import { getMoodById, MOODS } from "@/app/lib/moods";
import { auth } from "@clerk/nextjs/server";
import { getPixabayImage } from "./public";
import { supabase } from "@/lib/supabaseClient";
import { revalidatePath } from "next/cache";

export async function createJournalEntry(data) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const { data: user, error: userError } = await supabase
      .from("users")
      .select("id")
      .eq("clerk_user_id", userId)
      .single();

    if (userError || !user) throw new Error("User not found");

    const mood = MOODS[data.mood.toUpperCase()];
    if (!mood) throw new Error("Invalid mood");

    const moodImageUrl = await getPixabayImage(data.moodQuery);

    const { data: entry, error } = await supabase
      .from("entries")
      .insert([
        {
          title: data.title,
          content: data.content,
          mood: mood.id,
          mood_score: mood.score,
          mood_image_url: moodImageUrl,
          user_id: user.id,
          collection_id: data.collection_id || null,
        },
      ])
      .select()
      .single();

    await supabase.from("drafts").delete().eq("user_id", user.id);

    revalidatePath("/dashboard");
    return entry;
  } catch (error) {
    console.error("CreateJournalEntry error:", error);
    throw error;
  }
}

export async function getJournalEntries({ collection_id, orderBy = "desc" } = {}) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const { data: user, error: userError } = await supabase
      .from("users")
      .select("id")
      .eq("clerk_user_id", userId)
      .single();

    if (userError || !user) throw new Error("User not found");

    const query = supabase
      .from("entries")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: orderBy === "asc" });

    if (collection_id === "unorganized") query.is("collection_id", null);
    else if (collection_id) query.eq("collection_id", collection_id);

    const { data: entries, error } = await query;
    if (error) throw new Error(error.message);

    const entriesWithMoodData = entries.map((entry) => ({
      ...entry,
      mood_data: getMoodById(entry.mood),
    }));

    return { success: true, data: { entries: entriesWithMoodData } };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function getJournalEntry(id) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const { data: user } = await supabase
      .from("users")
      .select("id")
      .eq("clerk_user_id", userId)
      .single();

    if (!user) throw new Error("User not found");

    const { data: entry, error } = await supabase
      .from("entries")
      .select("*")
      .eq("id", id)
      .eq("user_id", user.id)
      .single();

    if (error || !entry) throw new Error("Entry not found");
    return entry;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteJournalEntry(id) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const { data: user } = await supabase
      .from("users")
      .select("id")
      .eq("clerk_user_id", userId)
      .single();

    const { error } = await supabase
      .from("entries")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) throw new Error(error.message);

    revalidatePath("/dashboard");
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateJournalEntry(data) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const { data: user } = await supabase
      .from("users")
      .select("id")
      .eq("clerk_user_id", userId)
      .single();

    const { data: existingEntry } = await supabase
      .from("entries")
      .select("*")
      .eq("id", data.id)
      .eq("user_id", user.id)
      .single();

    if (!existingEntry) throw new Error("Entry not found");

    const mood = MOODS[data.mood.toUpperCase()];
    if (!mood) throw new Error("Invalid mood");

    let moodImageUrl = existingEntry.mood_image_url;
    if (existingEntry.mood !== mood.id)
      moodImageUrl = await getPixabayImage(data.moodQuery);

    const { data: updatedEntry, error } = await supabase
      .from("entries")
      .update({
        title: data.title,
        content: data.content,
        mood: mood.id,
        mood_score: mood.score,
        mood_image_url: moodImageUrl,
        collection_id: data.collection_id || null,
      })
      .eq("id", data.id)
      .select()
      .single();

    if (error) throw new Error(error.message);

    revalidatePath("/dashboard");
    revalidatePath(`/journal/${data.id}`);
    return updatedEntry;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getDraft() {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const { data: user } = await supabase
      .from("users")
      .select("id")
      .eq("clerk_user_id", userId)
      .single();

    const { data: draft, error } = await supabase
      .from("drafts")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (error) throw new Error(error.message);
    return { success: true, data: draft };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function saveDraft(data) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const { data: user } = await supabase
      .from("users")
      .select("id")
      .eq("clerk_user_id", userId)
      .single();

    const { data: draft, error } = await supabase
      .from("drafts")
      .upsert(
        {
          user_id: user.id,
          title: data.title,
          content: data.content,
          mood: data.mood,
        },
        { onConflict: ["user_id"] }
      )
      .select()
      .single();

    if (error) throw new Error(error.message);

    revalidatePath("/dashboard");
    return { success: true, data: draft };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
