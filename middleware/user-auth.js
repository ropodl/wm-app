export default defineNuxtRouteMiddleware((to, from) => {
  const user = useUserStore();

  if (user.role !== "user") {
    navigateTo("/login");
  }
});
