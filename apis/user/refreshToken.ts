import { IResponse } from "@/types/base";

import { axiosInstance } from "../axiosInstance";

export const refreshAccessToken = async () => {
  try {
    const response = await axiosInstance.post<
      IResponse<{ accessToken: string }>
    >("/users/refresh", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.data || response.status !== 200) {
      throw new Error("Failed to refresh token");
    }

    // Store the new access token in local storage
    localStorage.setItem("accessToken", response.data.data.accessToken);
    return response.data.data.accessToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
};
