export const useAxios = async (url, opts = {}) => {
  const cookie = useCookie("auth_token");
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
        authorization: `Bearer ${cookie.value}`,
      },
      immediate: true,
    });
    return res;
  } catch (err) {
    console.error("Error fetching data:", err);
    throw err;
  }
};
