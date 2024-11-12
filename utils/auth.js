export default {
    baseURL: `http://localhost:8000/api/v1/auth/`,
    globalAppMiddleware: true,
    provider: {
      type: "local",
      endpoints: {
        signIn: {
          path: "login",
          method: "post",
        },
        getSession: { path: "session", method: "get" },
      },
    },
    sessionRefresh: {
      enablePeriodically: false,
      enableOnWindowFocus: false,
    }
  }