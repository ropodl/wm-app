<script setup>
const route = useRoute();

const pages = ref([
  {
    title: "Latest",
    to: "/posts",
  },
  {
    title: "Recommendation",
    to: "/posts/recommendation",
  },
]);
</script>
<template>
  <v-main>
    <NuxtLayout name="user" />
    <v-container>
      <v-row>
        <v-col class="pb-0" cols="12">
          <v-card class="pa-1" style="width: max-content">
            <v-tabs density="compact" hide-slider rounded="lg">
              <template v-for="{ title, to } in pages">
                <v-tab
                  :to
                  rounded="lg"
                  class="px-12"
                  :variant="route.fullPath === to ? 'tonal' : 'text'"
                >
                  {{ title }}
                </v-tab>
              </template>
            </v-tabs>
          </v-card>
        </v-col>
        <v-col cols="12">
          <NuxtPage />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
