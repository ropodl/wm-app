export default defineNuxtRouteMiddleware((to, from) => {
  const lord = useLordUserStore();
  const { user } = lord;
  const token = useCookie("auth_token_lord");

  if (!token.value && user.name) {
    return navigateTo("/login", {
      replace: true,
    });
  }
});
