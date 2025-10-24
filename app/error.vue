<template>
  <div class="error-page">
    <h1>{{ error.statusCode }}</h1>
    <p>{{ error.message || 'Page not found' }}</p>
    <NuxtLink to="/">Go back home</NuxtLink>
  </div>
</template>

<script setup>
defineProps(['error'])
</script>

<style scoped>
.error-page {
  text-align: center;
  padding: 50px;
}
</style>