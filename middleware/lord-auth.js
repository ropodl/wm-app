export default defineNuxtRouteMiddleware((to, from) => {
  const lord = useLordUserStore();
  const { user } = lord;
  const token = useCookie("auth.token");

  if (!token.value || !user.name) {
    return navigateTo("/login", {
      replace: true,
    });
  }
});
