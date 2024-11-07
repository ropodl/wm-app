export const useAdminUserStore = defineStore("admin-user-store", () => {
  const user = ref({});
  const role = ref("");

  function setUser(value) {
    user.value = value;
  }
  function setRole(value) {
    role.value = value;
  }

  return {
    user,
    role,
    setUser,
    setRole,
  };
}, {
  persist: true
});
