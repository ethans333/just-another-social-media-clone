import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

setToken(localStorage.getItem("accessToken") || "");

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      return refreshToken()
        .then((response) => {
          console.log(response);
          localStorage.setItem("accessToken", response.data.access);
          setToken(response.data.access);

          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${response.data.access}`;

          return api(originalRequest);
        })
        .catch((refreshError) => {
          console.error("Refresh token failed:", refreshError);
          window.location.href = "/login";
        });
    }

    // handle global error
    return Promise.reject(err);
  }
);

function refreshToken() {
  return api.post("/token/refresh/", {
    refresh: localStorage.getItem("refreshToken"),
  });
}

function setToken(token: string) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default api;
