import { useAdminUserStore } from "~/stores/admin/user";

export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie("auth_token");
  const admin = useAdminUserStore();

  console.log(admin.user);

  if(!admin.user && !token){
    navigateTo("/login")
  }
  
});
