export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();
  if (userStore.getRole() !== "user") return navigateTo("/login");
});
