import { axiosInstance } from "../axiosInstance";

const getLevel = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`/users/${userId}/level`);

    if (response.status < 200 || response.status >= 300) {
      throw new Error("Failed to get user level");
    }
    return response.data;
  } catch (error) {
    console.error("Error getting user level:", error);
    throw new Error("Failed to get user level");
  }
};
