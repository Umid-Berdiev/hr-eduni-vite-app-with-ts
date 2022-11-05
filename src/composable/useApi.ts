import axios from "axios";
import nProgress from "nprogress";
import { useStorage } from "@vueuse/core";
import { useUserStore } from "@/stores/user";

let api: any = null;

nProgress.configure({ showSpinner: false });

export function createApi() {
  // Here we set the base URL for all requests made to the api
  api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    // withCredentials: true,
    // headers: {
    //   "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Credentials": true,
    // },
  });

  // We set an interceptor for each request to
  // include Bearer token to the request if user is logged in
  api.interceptors.request.use((config: any) => {
    const userStore = useUserStore();
    nProgress.start();
    nProgress.set(0.7);

    if (userStore.isLoggedIn) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${userStore.token}`,
        lang: useStorage("locale", "uz").value,
      };
    }

    return config;
  });

  // We set an interceptor for each response to
  // check if user is logged in
  api.interceptors.response.use(
    function (response: any) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      nProgress.done();
      return response;
    },
    function (error: any) {
      const userStore = useUserStore();
      nProgress.done();

      if (error) {
        if (error.response?.status === 401 /* && !originalRequest._retry */) {
          // const token = useStorage("token", "");
          // store.commit("user/setToken", "");
          // store.commit("user/setUser", {});
          // localStorage.setItem("token", "");
          // location.href = "/auth/login";
          userStore.setToken("");
          userStore.setUser(null);
          location.href = "/";
        }

        throw error;
      }
    }
  );

  return api;
}

export function useApi() {
  if (!api) {
    createApi();
  }
  return api;
}
