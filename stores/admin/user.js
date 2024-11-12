export const useAdminUserStore = defineStore("admin-user-store", () => {
  const user = ref({});
  const role = ref("");
  const token = ref("")
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
    })

    user.value = {};
    role.value = "";
    token.value = "";
    getCookie.value = null;
  }

  return {
    user,
    role,
    setUser,
    setRole,
    logOut
  };
}, {
  persist: true
});
