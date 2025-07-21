import { ACCESS_TOKEN } from "@/constant/storageName";
import axios from "axios";
import { refreshAccessToken } from "./user/refreshToken";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 1000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // 경로가 signin, signup, oauth가 아닌 경우에만 토큰을 헤더에 추가
    // 토큰 없으면 리퀘스트 안보냄
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      return config; // 토큰이 없으면 요청을 보내지 않음
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 에러 처리 및 토큰 재발급
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // const originalRequest = error.config;

    // if (
    //   error.response &&
    //   error.response.status === 401 &&
    //   !originalRequest._retry
    // ) {
    //   originalRequest._retry = true;

    //   try {
    //     const newAccessToken = await refreshAccessToken();

    //     // 토큰 업데이트 후 재요청
    //     axiosInstance.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
    //     originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

    //     return axiosInstance(originalRequest);
    //   } catch (refreshError) {
    //     localStorage.removeItem(ACCESS_TOKEN);
    //     console.error("Token refresh failed:", refreshError);
    //     // 여기서 로그인 페이지로 리다이렉트하거나 사용자에게 알림을 표시
    //     // window.location.href = "/signin";
    //     return Promise.reject(refreshError);
    //   }
    // }
    if (error.response && error.response.status === 401) {
      // localStorage.removeItem(ACCESS_TOKEN);
      console.error("Unauthorized access - token removed");
      // 여기서 로그인 페이지로 리다이렉트하거나 사용자에게 알림을 표시
    }

    return Promise.reject(error);
  }
);
