export const useAdminUserStore = defineStore(
  "admin-user-store",
  () => {
    const user = ref({});
    const role = ref("");
    const token = ref("");
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

      user.value = {};
      role.value = "";
      token.value = "";
      localStorage.removeItem("admin-user-store");
      cookie.value = null;
    }

    return {
      user,
      role,
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
