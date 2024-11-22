<script setup>
useHead({
  title: "Community Driven Waste Recycling",
});

const snackbar = useSnackbarStore();
const { snackbar: toast } = storeToRefs(snackbar);
</script>
<template>
  <v-app>
    <NuxtLayout>
      <v-main>
        <!-- <v-btn @click="snackbar.setSnackbar('test', 'error')"></v-btn> -->
        <NuxtPage />
      </v-main>
      <v-snackbar
        v-model="toast.show"
        location="bottom right"
        :color="toast.color"
      >
        {{ toast.text }}
      </v-snackbar>
    </NuxtLayout>
  </v-app>
</template>
<style lang="scss">
.list-style-none {
  list-style: none;
}
</style>
