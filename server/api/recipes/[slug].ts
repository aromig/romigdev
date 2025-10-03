import { defineEventHandler } from "h3"
import matter from "gray-matter"

export default defineEventHandler(async (event) => {
  const { slug } = event.context.params

  if (!slug || typeof slug !== "string") {
    throw new Error("Invalid slug")
  }

  const url = `https://raw.githubusercontent.com/aromig/recipes/master/${slug}.md`

  try {
    const raw = await $fetch(url)
    const parsed = matter(raw)

    return {
      frontmatter: parsed.data,
      content: parsed.content
    }
  } catch (error) {
    console.error(`Error fetching recipe for slug "${slug}":`, error)
    return { error: "Recipe not found" }
  }
})
