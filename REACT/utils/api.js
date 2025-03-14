import axios from "axios";
import { refreshAccessToken } from "./authService";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    Accept: "application/json",
  },
});

// Add Axios Interceptor to Handle Expired Tokens
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.log("Access token expired. Refreshing...");
      const newAccessToken = await refreshAccessToken();

      if (newAccessToken) {
        error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(error.config); // Retry the request
      }
    }
    return Promise.reject(error);
  }
);

export default api;
