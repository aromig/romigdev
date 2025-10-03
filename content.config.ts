import { defineContentConfig, defineCollection, z } from "@nuxt/content"

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      source: "blog/**/*.md",
      type: "page",
      schema: z.object({
        title: z.string(),
        excerpt: z.string(),
        date: z.date(),
        cover: z.string()
      })
    }),
    content: defineCollection({
      type: "page",
      source: "*.md"
    })
  }
})
