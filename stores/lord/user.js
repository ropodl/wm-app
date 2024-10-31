import { defineStore } from "pinia";

export const useLordUserStore = defineStore("lord-user", () => {
  const user = ref({});
  const token = ref("");

  function setUser(value) {
    user.value = value;
  }

  function setToken(value){
    token.value = value;
  }

  return {
    setUser,
    setToken,
    user
  };
}, {
  persist: true
});
