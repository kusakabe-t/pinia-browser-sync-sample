import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,
  typescript: {
    strict: true,
  },
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],
  // NOTE: https://tailwindcss.nuxtjs.org/options/
  tailwindcss: {
    configPath: 'tailwind.config.js',
  },
})
