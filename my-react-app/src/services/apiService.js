import axios from "axios";
import { navigateTo } from "../utils/navigation";

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      localStorage.removeItem("token");
      navigateTo("/");
    }
    return Promise.reject(err);
  }
);

export const getApi = (url, config = {}) => api.get(url, config);
export const postApi = (url, data = {}, config = {}) =>
  api.post(url, data, config);
export const putApi = (url, data = {}, config = {}) =>
  api.put(url, data, config);
export const deleteApi = (url, config = {}) =>
  api.delete(url, config);

export default api;
