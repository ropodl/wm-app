import { defineStore } from "pinia";

export const useApperanceStore = defineStore(
  "apperance-store",
  () => {
    const theme = useTheme();

    const dark = ref(false);
    const density = ref("default");

    watch(dark, (val) => {
      theme.global.name.value = val ? "dark" : "light";
    });

    return {
      dark,
      density,
    };
  },
  {
    persist: true,
  }
);
