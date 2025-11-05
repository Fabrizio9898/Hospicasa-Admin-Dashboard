import axios from "axios";
import { API_URL } from "../config/envs.config";
import { useAuthStore } from "../store/auth.store";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      if (error.config.url !== "/admin/login") {
        const { logout } = useAuthStore.getState();
        logout();
        window.location.href = "/login?from=out_session";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
