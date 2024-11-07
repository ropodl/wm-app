<script setup>
useHead({
  title: "Community Driven Waste Recycling",
});

const snackbar = useSnackbarStore();
</script>
<template>
  <v-app>
    <NuxtLayout>
      <v-main>
        <NuxtPage />
      </v-main>
      <v-snackbar
        v-model="snackbar.snackbar.show"
        location="bottom right"
      >
        {{ snackbar.snackbar.title }}
      </v-snackbar>
    </NuxtLayout>
  </v-app>
</template>
<style lang="scss">
.list-style-none {
  list-style: none;
}
</style>
