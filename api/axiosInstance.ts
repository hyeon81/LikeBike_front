import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 1000,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_JWT}`,
  },
});
