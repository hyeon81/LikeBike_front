import { axiosInstance } from "../axiosInstance";

const getBikeLog = async () => {
  try {
    const response = await axiosInstance.get("/users/bike-logs");
    if (response.status < 200 || response.status >= 300) {
      throw new Error("Failed to fetch bike logs");
    }
    return response?.data?.data;
  } catch (error) {
    console.error("Error fetching bike log:", error);
    throw error;
  }
};

export default getBikeLog;
