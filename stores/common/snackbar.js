import { defineStore } from "pinia";

export const useSnackbarStore = defineStore("snackbarStore", () => {
  const snackbar = ref({
    show: false,
    text: "",
    color: "",
  });

  function setSnackbar(text, color) {
    snackbar.value.show = true;
    snackbar.value.text = text;
    snackbar.value.color = color;
  }

  return {
    snackbar,
    setSnackbar,
  };
});
