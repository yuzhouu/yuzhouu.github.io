import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.mdoc", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    lang: z.enum(["en", "zh-CN"]).default("en"),
    draft: z.boolean().default(false),
  }),
});

const timeline = defineCollection({
  loader: glob({ pattern: "**/*.mdoc", base: "./src/content/timeline" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    publishedAt: z.coerce.date(),
    lang: z.enum(["en", "zh-CN", "ja"]).default("en"),
    draft: z.boolean().default(false),
    spotifyTrackId: z
      .string()
      .regex(/^[A-Za-z0-9]{22}$/)
      .optional(),
  }),
});

export const collections = { posts, timeline };
