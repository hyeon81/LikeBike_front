import { ACCESS_TOKEN } from "@/constant/storageName";
import axios from "axios";
import { refreshAccessToken } from "./user/refreshToken";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 1000,
});

axiosInstance.interceptors.response.use(
  (response) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      response.config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete response.config.headers.Authorization;
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 401 에러이고, 재시도하지 않은 경우 -> refresh 토큰 요청
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();

        axiosInstance.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
