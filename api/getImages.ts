import { axiosInstance } from "./axiosInstance";

export const getImages = async () => {
  const response = await axiosInstance("/files", {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_JWT}`,
      "X-Admin": "true", // Assuming you need admin access to fetch images
    },
  });
  if (response.status === 200) {
    return response?.data?.data;
  } else {
    throw new Error("Failed to fetch images");
  }
};
