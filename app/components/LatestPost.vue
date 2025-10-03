<script setup lang="ts">
const { data: latestPost } = await useAsyncData(() =>
  queryCollection("blog").order("date", "DESC").first()
)
</script>

<template>
  <div>
    <h2>Latest Post</h2>
    <article :key="latestPost" class="card">
      <NuxtLink :to="latestPost.path" class="card-body">
        <div class="image-wrapper">
          <img
            v-if="latestPost.cover"
            :src="latestPost.cover"
            alt="Cover image"
            class="cover"
            loading="lazy"
          />
        </div>
        <h3 class="card-title">{{ latestPost.title }}</h3>
        <p class="post_date">
          {{ new Date(latestPost.date).toLocaleDateString() }}
        </p>
        <p class="post_excerpt">{{ latestPost.description }}</p>
      </NuxtLink>
    </article>
  </div>
</template>

<style scoped>
.card {
  width: 75%;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 20px auto;
  transition: width 0.3s ease;
  & a {
    text-decoration: none;
  }
  & a:hover h3 {
    color: #0077b5;
    transition: color 0.3s ease;
  }
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
h3 {
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

@media (max-width: 700px) {
  .card {
    width: 100%;
    margin: 20px 0;
    transition: width 0.3s ease;
  }
}
</style>
