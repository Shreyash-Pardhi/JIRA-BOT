import { z } from "zod";

export const createIssueSchema = z.object({
    title: z
        .string()
        .min(3, "Title must be at least 3 characters"),

    description: z
        .string()
        .min(5, "Description must be at least 5 characters")
        .optional(),

    priority: z.enum(["low", "medium", "high"]).optional(),

    status: z
        .enum(["open", "in-progress", "closed"])
        .optional()
});