import vuetifyOpts from "./utils/vuetify.js";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: "2024-04-03",
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  modules: [
    "nuxt-multi-tenancy",
    "vuetify-nuxt-module",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@formkit/auto-animate",
    "pinia-plugin-persistedstate/nuxt",
  ],
  pinia: {
    storesDirs: ["./stores/**/**"],
  },
  vuetify: {
    vuetifyOptions: vuetifyOpts,
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern",
        },
      },
    },
  },
  runtimeConfig: {
    public: {
      api: process.env.API_BASE_URL,
    },
  },
  experimental: {
    viewTransition: true,
  },
  piniaPluginPersistedstate: {
    storage: "localStorage",
  },
  multiTenancy: {
    tenantDynamicRoute: "site",
    rootDomains: ["wm.local"],
    sites: ["lord"],
  },
});
