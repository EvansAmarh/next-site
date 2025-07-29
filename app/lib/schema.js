import { z } from "zod";


export const journalSchema = z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
    mood: z.string().min(1, "Mood is required"),
    collection_id: z.string().optional(),
})

export const collectionSchema = z.object({
    name: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    
})