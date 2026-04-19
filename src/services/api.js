import axios from "axios";
import { useAuthStore } from "../store/authStore";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let refreshingPromise = null;

const skipRefreshPaths = [
  "/auth/login",
  "/auth/public-register",
  "/auth/refresh-token",
  "/auth/forgot-password",
  "/auth/reset-password",
];

function shouldSkipRefresh(url = "") {
  return skipRefreshPaths.some((path) => url.includes(path));
}

async function refreshAccessToken() {
  if (!refreshingPromise) {
    refreshingPromise = api
      .post("/auth/refresh-token")
      .then((response) => {
        const token = response.data?.accessToken;
        if (token) {
          useAuthStore.getState().setAccessToken(token);
        }
        return token;
      })
      .finally(() => {
        refreshingPromise = null;
      });
  }

  return refreshingPromise;
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const requestUrl = originalRequest?.url || "";
    const hasAccessToken = Boolean(useAuthStore.getState().accessToken);

    if (
      error.response?.status === 401 &&
      !originalRequest?._retry &&
      hasAccessToken &&
      !shouldSkipRefresh(requestUrl)
    ) {
      originalRequest._retry = true;
      try {
        const refreshed = await refreshAccessToken();
        if (!refreshed) {
          useAuthStore.getState().logout();
          return Promise.reject(error);
        }
        return api(originalRequest);
      } catch {
        useAuthStore.getState().logout();
      }
    }

    return Promise.reject(error);
  },
);

export default api;
