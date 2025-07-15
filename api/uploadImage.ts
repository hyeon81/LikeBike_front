import { axiosInstance } from "./axiosInstance";

const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", "test");
  const res = await axiosInstance.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_JWT}`,
    },
  });
  console.log("res", res);
  // return res.data;
};

export default uploadImage;
