import { defineEventHandler } from "h3"
import matter from "gray-matter"

export default defineEventHandler(async () => {
  const rawList = (await $fetch(
    "https://api.github.com/repos/aromig/recipes/contents"
  )) as Array<{ name: string; download_url: string }>

  const recipes = await Promise.all(
    rawList
      .filter((file) => file.name.endsWith(".md"))
      .filter((file) => file.name !== "README.md")
      .map(async (file) => {
        const raw = await $fetch(file.download_url)
        const parsed = matter(raw)

        return {
          title: parsed.data.title || file.name.replace(".md", ""),
          description: parsed.data.description || "",
          coverImage: parsed.data.coverImage || "",
          slug: file.name.replace(".md", ""),
          tags: parsed.data.tags || [],
          content: parsed.content
        }
      })
  )

  return recipes
})
