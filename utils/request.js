const getToken = () => {
  const cookies = useCookie("auth_token_tenant_user");
  const adminCookies = useCookie("auth_token_tenant_admin");

  if(cookies.value) return cookies.value
  else return adminCookies.value;
};
export const useAxios = async (url, opts = {}) => {
  const config = useRuntimeConfig();
  console.log(opts);
  try {
    const res = await $fetch(url, {
      key: String(Math.random()),
      baseURL: config.public.api,
      method: opts.method || "GET",
      params: opts?.params,
      query: opts?.query,
      body: opts?.body,
      headers: {
        ...opts?.headers,
        tenant_id: useTenant() ? `tenant_${useTenant()}`: null,
        authorization: getToken(),
      },
      immediate: true,
    });
    console.log(res);
    return res;
  } catch (err) {
    console.error("Error fetching data:", err);
    throw err;
  }
};
