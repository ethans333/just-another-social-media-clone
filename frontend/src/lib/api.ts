import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const noAuthApi = axios.create({ baseURL: "/api" });

setToken(localStorage.getItem("accessToken") || "");

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await noAuthApi.post("/token/refresh/", {
          refresh: localStorage.getItem("refreshToken"),
        });

        const newAccess = response.data.access;
        localStorage.setItem("accessToken", newAccess);
        setToken(newAccess);

        originalRequest.headers["Authorization"] = `Bearer ${newAccess}`;

        return api(originalRequest); // retry original request
      } catch (refreshError) {
        // window.location.href = "/login";
        // localStorage.removeItem("accessToken");
        // localStorage.removeItem("refreshToken");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(err);
  }
);

function setToken(token: string) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default api;
