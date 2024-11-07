import vuetifyOpts from "./utils/vuetify.js";
import authOpts from "./utils/auth.js"
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
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
    "@sidebase/nuxt-auth",
  ],
  pinia: {
    storesDirs: ["./stores/**/**"],
  },
  multiTenancy: {
    tenantDynamicRoute: "site",
    rootDomains: ["wm.local"],
    sites: ["lord"],
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
  auth: authOpts
});
