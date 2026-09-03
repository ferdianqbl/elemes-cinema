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

interface CustomRequestConfig extends InternalAxiosRequestConfig {
  __retryCount?: number;
}

const MAX_RETRIES = 2;
const RETRYABLE_STATUS_CODES = [429, 500, 502, 503, 504];

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config as CustomRequestConfig | undefined;

    // Retry only idempotent GET requests on network errors or transient HTTP status codes
    const isGet = !config?.method || config.method.toUpperCase() === "GET";
    const status = error.response?.status;
    const isRetryable = !status || RETRYABLE_STATUS_CODES.includes(status);

    if (config && isGet && isRetryable) {
      config.__retryCount = config.__retryCount || 0;

      if (config.__retryCount < MAX_RETRIES) {
        config.__retryCount += 1;
        const delay =
          Math.pow(2, config.__retryCount) * 500 + Math.random() * 150;

        await new Promise((resolve) => setTimeout(resolve, delay));
        return apiClient(config);
      }
    }

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
