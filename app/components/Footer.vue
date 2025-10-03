<template>
  <footer class="footer">
    <div class="socials">
      <a
        v-for="link in socialLinks"
        :key="link.name"
        :href="link.url"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="link.name"
      >
        <Icon :name="link.icon" class="icon" />
      </a>
    </div>
    <p>
      &copy; {{ new Date().getFullYear() }} Adam Romig, hosted on
      <a href="https://netlify.com" target="_blank">Netlify</a>
    </p>
  </footer>
</template>

<script setup>
const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/aromig",
    icon: "fa6-brands:github"
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/adamromig",
    icon: "fa6-brands:linkedin"
  },
  {
    name: "Codepen",
    url: "https://codepen.io/aromig",
    icon: "fa6-brands:codepen"
  },
  {
    name: "DEV.to",
    url: "https://dev.to/aromig",
    icon: "fa6-brands:dev"
  }
]
</script>

<style scoped>
.footer {
  padding: 2rem;
  text-align: center;
  background: #f8f8f8;
  border-top: 1px solid #ddd;
}

.socials {
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

a .icon {
  font-size: 1.8rem;
  transition: color 0.3s;
}
</style>
