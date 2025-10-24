<script setup lang="ts">
const route = useRoute()
const fullPath = `/blog/${Array.isArray(route.params.slug) ? route.params.slug.join("/") : route.params.slug}`

const { data: post } = await useAsyncData(
  () => fullPath,
  () => queryCollection("blog").where("path", "=", fullPath).first()
)

useHead({
  title: post.value?.title || "Blog Post",
  meta: [
    {
      name: "description",
      content: post.value?.description || "A blog post"
    }
  ]
})
</script>

<template>
  <section v-if="post">
    <header>
      <img
        v-if="post.cover"
        :src="post.cover"
        alt="Cover image"
        class="cover"
        loading="lazy"
      />
      <h1>{{ post.title }}</h1>
    </header>
    <p class="excerpt">{{ post.description }}</p>
    <article>
      <small>{{ new Date(post.date).toLocaleDateString() }}</small>
      <ContentRenderer :value="post" />
    </article>
  </section>
  <p v-else>Post not found.</p>
</template>

<style lang="scss" scoped>
.cover {
  object-fit: cover;
  object-position: center;
  width: 100%;
  max-height: 400px;
  border: 1px solid #444;
  box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.25);
}
.excerpt {
  background-color: #efefef;
  display: block;
  padding: 10px;
  border-left: 4px solid #ccc;
}
article {
  font-size: smaller;
}
</style>
