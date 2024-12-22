export default defineNuxtRouteMiddleware((to, from) => {
  const adminStore = useAdminUserStore();
  if (adminStore.getRole() !== "admin") return navigateTo("/login");
});
