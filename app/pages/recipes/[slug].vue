<script setup lang="ts">
import MarkdownIt from "markdown-it"
const md = new MarkdownIt()

const route = useRoute()
const slug = computed(() => route.params.slug as string)

interface Recipe {
  title: string
  description: string
  coverImage: string
  slug: string
  content: string
  tags?: string[]
}

const {
  data: recipe,
  pending,
  error
} = await useAsyncData<Recipe[]>(
  () => `recipe-${slug.value}`,
  () => $fetch(`/api/recipes/${slug.value}`),
  { watch: [slug] }
)

const html = computed(() =>
  recipe.value.content ? md.render(recipe.value.content) : ""
)
const meta = computed(() => ({
  title: recipe.value ? recipe.value.frontmatter.title : "Recipe",
  description: recipe.value
    ? recipe.value.frontmatter.description
    : "Delicious recipe",
  coverImage: recipe.value ? recipe.value.frontmatter.coverImage : "",
  tags: recipe.value ? recipe.value.frontmatter.tags : []
}))

useHead({
  title: recipe.value.frontmatter.title || "Recipe"
})
</script>

<template>
  <div>
    <section :key="slug">
      <div v-if="pending">
        <div class="spinner"></div>
        <p>Loading recipe...</p>
      </div>

      <div v-else-if="error || !recipe || !recipe.content">
        <p>Recipe not found or failed to load.</p>
      </div>

      <div v-else>
        <div v-html="html" class="markdown" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.markdown {
  padding: 1rem;
  line-height: 1.6;
  font-size: 1rem;
}

.markdown h1,
.markdown h2 {
  margin-top: 1.5rem;
  font-weight: bold;
}

.markdown img {
  max-width: 100%;
  border-radius: 8px;
  margin: 1rem 0;
}

.markdown ul {
  padding-left: 1.2rem;
  list-style-type: disc;
}

img {
  max-width: 100%;
  margin-bottom: 1rem;
  border-radius: 8px;
}
</style>
