import { defineStore } from "pinia";

export const useUserStore = defineStore(
  "user-store",
  () => {
    const user = ref({});
    const token = ref("");
    const role = ref("");
    const cookie = useCookie("auth_token");

    function setUser(value) {
      user.value = value;
    }

    function setRole(value) {
      role.value = value;
    }

    function logOut(){
      navigateTo("/login",{
        replace: true
      });
      user.value = {};
      role.value = "";
      token.value = "";
      cookie.value = null;
    }

    return {
      user,
      token,
      setUser,
      setRole,
      logOut
    };
  },
  {
    persist: true,
  }
);
