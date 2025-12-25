// https://nuxt.com/docs/api/configuration/nuxt-config
import Icons from "unplugin-icons/vite"

export default defineNuxtConfig({
  app: {
    head: {
      titleTemplate: "%s | romig.dev",
      link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }]
    },
    pageTransition: { name: "fade", mode: "out-in" }
  },
  colorMode: {
    preference: "dark", // Or 'system' to follow OS, 'dark' for dark
    fallback: "dark" // Fallback if no preference or storage issue
    // ... other options
  },
  compatibilityDate: "2025-07-15",
  content: {
    markdown: {
      remarkPlugins: [],
      rehypePlugins: [],
      markdownit: {
        plugins: ["markdown-it-attrs"]
      }
    }
  },
  css: ["~/assets/css/main.scss"],
  devtools: { enabled: true },
  experimental: {
    inlineRouteRules: true
  },

  fonts: {
    providers: {
      bunny: false
    }
  },

  modules: [
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/ui",
    "nuxt-studio"
  ],

  nitro: {
    prerender: {
      ignore: ["/__nuxt_content/resumeData/sql_dump.txt"],
      routes: ["/"],
      crawlLinks: true
    }
  },

  runtimeConfig: {
    githubToken: process.env.GITHUB_PAT
  },

  studio: {
    dev: true,
    route: "/_studio",
    repository: {
      provider: "github",
      owner: "aromig",
      repo: "romigdev",
      branch: "main"
    }
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/css/variables.scss" as *;`
        }
      }
    },
    plugins: [Icons({ compiler: "vue3", autoInstall: true })]
  }
})
