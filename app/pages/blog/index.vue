<script setup lang="ts">
const route = useRoute()
const currentPage = computed(() => Number(route.query.page) || 1)
const pageSize = 6

const { data: posts } = await useAsyncData(() =>
  queryCollection("blog").order("date", "DESC").all()
)

const paginatedPosts = computed(() => {
  if (!posts.value) return []
  const start = (currentPage.value - 1) * pageSize
  return posts.value.slice(start, start + pageSize)
})

const totalPages = computed(() => {
  if (!posts.value) return 1
  return Math.ceil(posts.value.length / pageSize)
})

useHead({
  title: "Blog Posts"
})
</script>

<template>
  <section>
    <h1>Recent Articles</h1>
    <!-- Pagination Controls -->
    <nav class="pagination">
      <NuxtLink
        v-for="page in totalPages"
        :key="page"
        :to="{ query: { page } }"
        :class="{ active: page === currentPage }"
      >
        {{ page }}
      </NuxtLink>
    </nav>
    <div class="grid">
      <article v-for="post in paginatedPosts" :key="post.path" class="card">
        <NuxtLink :to="post.path">
          <div class="image-wrapper">
            <img
              v-if="post.cover"
              :src="post.cover"
              alt="Cover image"
              class="cover"
              loading="lazy"
            />
          </div>
          <h2>{{ post.title }}</h2>
          <p class="post_date">
            {{ new Date(post.date).toLocaleDateString() }}
          </p>
          <p class="post_excerpt">{{ post.description }}</p>
        </NuxtLink>
      </article>
    </div>

    <!-- Pagination Controls -->
    <nav class="pagination">
      <NuxtLink
        v-for="page in totalPages"
        :key="page"
        :to="{ query: { page } }"
        :class="{ active: page === currentPage }"
      >
        {{ page }}
      </NuxtLink>
    </nav>
  </section>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}
.card {
  border: 1px solid #ddd;
  padding: 0;
  border-radius: 8px;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  will-change: transform;
  & a {
    color: inherit;
    text-decoration: none;
    width: 100%;
  }
}
.card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  transform: scale(1.03);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  will-change: transform;
}
.image-wrapper {
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: 4px;
  background: #eee;
}
.cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
h2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 1.15rem;
  margin: 0.5rem;
}
p.post_date {
  font-size: 0.875rem;
  color: #999;
  margin: 0 0.5rem;
}
p.post_excerpt {
  font-size: 0.9rem;
  color: #666;
  margin: 0.5rem;
}
.pagination {
  margin: 2rem auto;
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.pagination a {
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  color: inherit;
  text-decoration: none;
}

.pagination a.active {
  background-color: #333;
  color: #fff;
  font-weight: bold;
}

.pagination a:hover {
  background-color: #555;
  color: #fff;
}
</style>
