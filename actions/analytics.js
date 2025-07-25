"use server";

import { auth } from "@clerk/nextjs/server";
import supabase from "@/lib/supabaseClient";

export async function getAnalytics(period = "30d") {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // Get the user from Supabase
  const { data: users, error: userError } = await supabase
    .from("user")
    .select("*")
    .eq("clerkUserId", userId)
    .limit(1)
    .single();

  if (userError || !users) throw new Error("User not found");

  const user = users;

  // Calculate start date
  const startDate = new Date();
  switch (period) {
    case "7d":
      startDate.setDate(startDate.getDate() - 7);
      break;
    case "15":
      startDate.setDate(startDate.getDate() - 15);
      break;
    case "30":
    default:
      startDate.setDate(startDate.getDate() - 30);
      break;
  }

  // Fetch entries from Supabase
  const { data: entries, error: entryError } = await supabase
    .from("entry")
    .select("*")
    .eq("userId", user.id)
    .gte("createdAt", startDate.toISOString())
    .order("createdAt", { ascending: true });

  if (entryError || !entries) throw new Error("Failed to fetch entries");

  // Group and calculate mood data
  const moodData = entries.reduce((acc, entry) => {
    const date = entry.createdAt.split("T")[0];
    if (!acc[date]) {
      acc[date] = {
        totalScore: 0,
        count: 0,
        entries: [],
      };
    }
    acc[date].totalScore += entry.moodScore;
    acc[date].count += 1;
    acc[date].entries.push(entry);
    return acc;
  }, {});

  const analyticsData = Object.entries(moodData).map(([date, data]) => ({
    date,
    averageScore: Number((data.totalScore / data.count).toFixed(1)),
    entryCount: data.count,
  }));

  const overallStats = {
    totalEntries: entries.length,
    averageScore: Number(
      (
        entries.reduce((acc, entry) => acc + entry.moodScore, 0) /
        entries.length
      ).toFixed(1)
    ),
    mostFrequentMood: Object.entries(
      entries.reduce((acc, entry) => {
        acc[entry.mood] = (acc[entry.mood] || 0) + 1;
        return acc;
      }, {})
    ).sort((a, b) => b[1] - a[1])[0]?.[0],
    dailyAverage: Number(
      (
        entries.length / (period === "7d" ? 7 : period === "15d" ? 15 : 30)
      ).toFixed(1)
    ),
  };

  return {
    success: true,
    data: {
      timeline: analyticsData,
      stats: overallStats,
    },
  };
}
