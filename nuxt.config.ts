import vuetifyOpts from "./utils/vuetify.js";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  modules: ["nuxt-multi-tenancy","vuetify-nuxt-module", "@pinia/nuxt", "@vueuse/nuxt"],
  multiTenancy: {
    tenantDynamicRoute: 'site',
    rootDomains: ["wm.local"],
    sites: ["lord"]
  },
  vuetify: {
    vuetifyOptions: vuetifyOpts,
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss : {
          api: "modern"
        }
      }
    }
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.APP_BASE_URL
    }
  },
  experimental: {
    viewTransition: true
  }
});