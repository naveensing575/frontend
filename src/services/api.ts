// src/services/api.ts
import axios from "axios";
import { useNotification } from "../context/NotificationContext";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      const notification = useNotification();
      localStorage.removeItem("token");
      notification.setMessage("Your session has expired. Please log in again.");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  roleId: number
) => {
  const response = await api.post("/auth/register", {
    name,
    email,
    password,
    roleId,
  });
  return response.data;
};

export const loginUser = async (email: string, password: string) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

export const getRoles = async () => {
  const response = await api.get("/roles");
  return response.data;
};

export const getMetrics = async () => {
  const response = await api.get("/metrics");
  return response.data;
};

export default api;
