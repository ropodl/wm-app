// import { defineStore } from "pinia";

export const useLordUserStore = defineStore(
  "lord-user",
  () => {
    const user = ref({});
    const token = ref("");
    const cookies = useCookie("auth_token_lord");
    const isLoggedIn = ref(false);

    function setUser(value) {
      user.value = value;
      isLoggedIn.value = true;
    }

    function setToken(value) {
      token.value = value;
    }

    function logOut() {
      console.log("logging out");
      cookies.value = null;
      localStorage.removeItem("lord-user");
      navigateTo("/login", {
        replace: true,
      });
    }

    return {
      user,
      setUser,
      setToken,
      logOut,
    };
  },
  {
    persist: true,
  }
);
