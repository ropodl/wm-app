import { useAdminUserStore } from "~/stores/admin/user";

export default defineNuxtRouteMiddleware((to, from) => {
  // const token = useCookie("auth_token_tenant_admin");
  // const adminUser = useAdminUserStore();

  // const checkAdminRole = (arg) => {
  //   return arg.some((role)=> arg.includes(role)
  //   )
  // }

  // if (!token.value && checkAdminRole(['','user'])) {
  //   return navigateTo("/auth/login", {
  //     replace: true,
  //   });
  // }
});
