export const useRequest = async (url, opts) => {
  const config = useRuntimeConfig();

  const res = await $fetch(url, {
    key: String(Math.random()),
    baseURL: config.public.api,
    method: opts?.method ? "GET" : opts?.method,
    params: opts?.params,
    query: opts?.query,
    body: opts?.body,
    headers: opts?.headers,
    immediate: true,
  });
  console.log(res);
  return res;
};
