import vuetifyOpts from "./utils/vuetify.js";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["vuetify-nuxt-module", "@pinia/nuxt", "@vueuse/nuxt"],
  vuetify: {
    vuetifyOptions: vuetifyOpts,
  },
});
