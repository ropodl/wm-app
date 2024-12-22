import { defineStore } from "pinia";

export const useApperanceStore = defineStore(
  "apperanceStore",
  () => {
    const theme = useTheme();

    const dark = ref(false);
    const compact = ref("default");

    watch(dark, (val) => {
      theme.global.name.value = val ? "dark" : "light";
    });

    return {
      dark,
      compact,
    };
  },
  {
    persist: true,
  }
);
