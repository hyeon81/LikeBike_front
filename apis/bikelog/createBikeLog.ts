import axios from "axios";
import { axiosInstance } from "../axiosInstance";

interface BikeLogReq {
  bike_photo: string;
  safety_gear_photo: string;
}

const createBikeLog = async (body: BikeLogReq) => {
  const formData = new FormData();
  formData.append("bike_photo", body.bike_photo);
  formData.append("safety_gear_photo", body.safety_gear_photo);
  formData.append("description", "자전거 타기 인증");

  const response = await axiosInstance.post("/users/bike-logs", formData);
  if (response.status < 200 || response.status >= 300) {
    throw new Error("Failed to create bike log");
  }
  return response.data;
};

export default createBikeLog;
