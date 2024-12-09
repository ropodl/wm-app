// import { defineStore } from 'pinia'

export const useInterestStore = defineStore("interest", () => {
  const interests = ref([]);

  return { interests };
});
