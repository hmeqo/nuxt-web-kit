// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4
  },

  devtools: { enabled: true },
  compatibilityDate: "2025-03-12",

  modules: ["../src", "nuxt-csurf"],

  typescript: {
    tsConfig: "../global.tsconfig.json"
  }
})
