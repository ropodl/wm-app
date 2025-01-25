<script setup>
useHead({
  title: "Community Driven Waste Recycling",
});

const app = ref(null);
useIsFullScreen(app);

const theme = useTheme();
const snackbar = useSnackbarStore();
const apperance = useApperanceStore();

const { snackbar: toast } = storeToRefs(snackbar);

onMounted(() => {
  if (apperance.dark)
    theme.global.name.value = apperance.dark ? "dark" : "light";
});
</script>
<template>
  <v-app ref="app">
    <NuxtLayout>
      <v-main>
        <NuxtPage />
      </v-main>
    </NuxtLayout>
    <v-snackbar
      v-model="toast.show"
      location="bottom right"
      :color="toast.color"
    >
      {{ toast.text }}
      <template v-slot:actions>
        <v-btn
          icon="mdi-close"
          size="x-small"
          rounded="lg"
          variant="text"
          @click="toast.show = false"
        >
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>
<style lang="scss">
.list-style-none {
  list-style: none;
}
.v-img:not(.v-parallax) {
  transition: all 0.2s;
}
.v-img:not(.v-parallax) .v-img__img {
  transform: scale(1);
  transition: all 0.2s;
}
.v-img:not(.v-parallax).zoom-image .v-img__img {
  transform: scale(1.2);
}
.dark-overlay {
  background: linear-gradient(
    180deg,
    rgba(var(--v-theme-surface), 0) 50%,
    rgba(var(--v-theme-surface), 0.9)
  ) !important;
}
.light-overlay {
  background: linear-gradient(
    180deg,
    rgba(var(--v-theme-surface), 0) 50%,
    rgba(var(--v-theme-surface), 0.9)
  ) !important;
}

.blur {
  backdrop-filter: blur(8px);
}
</style>
