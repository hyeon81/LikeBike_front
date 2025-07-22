import { axiosInstance } from "../axiosInstance";

const updateScore = async (score: number) => {
  try {
    const response = await axiosInstance.put("/users/score", {
      points: score,
    });

    if (response.status < 200 || response.status >= 300) {
      throw new Error("Failed to update score");
    }
    return response.data;
  } catch (error) {
    console.error("Error updating score:", error);
    throw new Error("Failed to update score");
  }
};

export default updateScore;
