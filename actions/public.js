"use server";

import { unstable_cache } from "next/cache";

// Fetches a Pixabay illustration image based on a query
export async function getPixabayImage(query) {
  try {
    const res = await fetch(
      `https://pixabay.com/api/?q=${encodeURIComponent(query)}&key=${process.env.NEXT_PUBLIC_PIXABAY_API_KEY}&min_width=1280&min_height=720&image_type=illustration&category=feelings`
    );

    if (!res.ok) throw new Error(`Pixabay API error: ${res.statusText}`);

    const data = await res.json();
    return data.hits?.[0]?.largeImageURL || null;
  } catch (error) {
    console.error("Pixabay API Error:", error);
    return null;
  }
}

// Caches a daily advice prompt from Advice Slip API
export const getDailyPrompt = unstable_cache(
  async () => {
    try {
      const res = await fetch("https://api.adviceslip.com/advice", {
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Advice API error");

      const data = await res.json();
      return data.slip?.advice || "What's on your mind today?";
    } catch (error) {
      console.error("Advice API Error:", error);
      return "What's on your mind today?";
    }
  },
  ["daily-prompt"],
  {
    revalidate: 86400, // revalidate once a day
    tags: ["daily-prompt"],
  }
);
