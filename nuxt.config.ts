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
  compatibilityDate: "2025-07-15",
  content: {
    markdown: {
      remarkPlugins: [],
      rehypePlugins: [],
      markdownit: {
        plugins: ["markdown-it-attrs"]
      }
    },
    preview: {
      api: "https://api.nuxt.studio"
    }
  },
  css: ["~/assets/css/main.scss"],
  devtools: { enabled: true },
  experimental: {
    inlineRouteRules: true
  },

  modules: [
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/ui"
  ],

  runtimeConfig: {
    githubToken: process.env.GITHUB_PAT
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
