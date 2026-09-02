import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_TMDB_API_BASE_URL || "https://api.themoviedb.org/3";
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN;
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 15000,
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Prefer Bearer token (v4 API) if provided
    if (ACCESS_TOKEN) {
      config.headers.Authorization = `Bearer ${ACCESS_TOKEN}`;
    } else if (API_KEY) {
      // Fallback to query param API Key (v3 API)
      config.params = {
        ...config.params,
        api_key: API_KEY,
      };
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      console.error(
        `[TMDB API Error] ${error.response.status}:`,
        error.response.data
      );
    } else if (error.request) {
      console.error("[TMDB Network Error] No response received:", error.message);
    } else {
      console.error("[TMDB Request Error]:", error.message);
    }
    return Promise.reject(error);
  }
);
