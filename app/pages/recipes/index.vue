<script setup lang="ts">
import { useRoute, useRouter } from "vue-router"
import { ref, onMounted, computed, watch } from "vue"
import { useDebounce } from "@vueuse/core"

useHead({
  title: "Recipes"
})

const route = useRoute()
const router = useRouter()

interface Recipe {
  title: string
  description: string
  coverImage: string
  slug: string
  tags: string[]
  content: string
}
const fallbackImage =
  "https://placehold.co/600x400/ccc/0077b5/?text=Recipe&font=open-sans"
const recipes = ref<Recipe[]>([])
const loading = ref(true)

const {
  data: recipeList,
  pending,
  error
} = await useAsyncData("recipes", () => $fetch("/api/recipes"))

const search = ref(route.query.q || "")

const debouncedSearch = useDebounce(search, 300)

let debounceTimer: ReturnType<typeof setTimeout>

watch(search, (newVal) => {
  router.replace({ query: { ...route.query, q: newVal } })
  // clearTimeout(debounceTimer)
  // debounceTimer = setTimeout(() => {
  //   debouncedSearch.value = newVal
  // }, 300)
})

const filteredRecipes = computed(() => {
  const query = debouncedSearch.value.toLowerCase().trim()
  if (!query) return recipeList.value

  return recipeList.value.filter((recipe) => {
    const inTitle = recipe.title?.toLowerCase().includes(query) ?? false
    const inDescription =
      recipe.description?.toLowerCase().includes(query) ?? false
    const inTags =
      recipe.tags?.some((tag) => tag.toLowerCase().includes(query)) ?? false
    const inContent = recipe.content?.toLowerCase().includes(query) ?? false
    return inTitle || inDescription || inTags || inContent
  })
})

const isFiltering = ref(false)

watch(search, () => {
  isFiltering.value = true
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    debouncedSearch.value = search.value
    isFiltering.value = false
  }, 300)
})

const isClient = ref(false)

onMounted(() => {
  isClient.value = true
})
</script>

<template>
  <div>
    <div class="search-container">
      <input
        v-model="search"
        type="text"
        placeholder="Search recipes by keyword or tag..."
        class="search-box"
      />
      <p v-if="debouncedSearch && !isFiltering" class="active-filter">
        Showing results for: <strong>{{ debouncedSearch }}</strong>
      </p>
      <p v-else class="searching-indicator" :class="{ active: isFiltering }">
        🔍 Searching recipes...
      </p>
    </div>

    <section class="recipe-grid">
      <div
        v-for="recipe in filteredRecipes"
        :key="recipe.slug"
        class="recipe-card"
      >
        <NuxtLink :to="`/recipes/${recipe.slug}`" class="card-link" prefetch>
          <img
            :src="recipe.coverImage || fallbackImage"
            alt=""
            class="card-image"
          />
          <h2>{{ recipe.title }}</h2>
          <p>{{ recipe.description }}</p>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.recipe-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
}

.recipe-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  transition: box-shadow 0.2s ease;
}

.card-link {
  display: block;
  text-decoration: none;
  color: inherit;
}

.card-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  display: block;
}

.recipe-card h2 {
  margin: 0.5rem;
  font-size: 1.2rem;
}

.recipe-card p {
  margin: 0 0 0.5rem;
  font-size: 0.95rem;
  color: #555;
}

.recipe-card small {
  font-size: 0.85rem;
  color: #888;
}

.recipe-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  & h2 {
    color: #0077b5;
  }
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  color: #555;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 6px solid #eee;
  border-top: 6px solid #0077b5;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.search-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
}

.search-box {
  margin: 1rem auto;
  width: 50%;
  max-width: 400px;
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  outline: none;
  transition:
    border 0.2s,
    box-shadow 0.2s;
}

.search-box:focus {
  border-color: transparent;
  box-shadow: 0 0 0 2px #3b82f6;
}

.searching-indicator {
  height: 1.5rem; /* Reserve space */
  line-height: 1.5rem;
  font-size: 0.95rem;
  color: #0077b5;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.searching-indicator.active {
  opacity: 1;
}

.active-filter {
  height: 1.5rem; /* Reserve space */
  line-height: 1.5rem;
  font-size: 0.95rem;
  color: #0077b5;
}
</style>
