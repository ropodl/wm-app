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

    function getRole() {
      return user.value.role;
    }

    function logOut() {
      navigateTo("/login", {
        replace: true,
      });
      role.value = "";
      token.value = "";
      cookie.value = null;
      localStorage.removeItem("user-store");
    }

    return {
      user,
      token,
      setUser,
      setRole,
      getRole,
      logOut,
    };
  },
  {
    persist: true,
  }
);
