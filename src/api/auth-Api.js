import axiosInstance from "../utils/axiosInstance";

export const signupUser = async (data) => {
  try {
    const response = await axiosInstance.post("/auth/signup", data);
    return response.data;
  } catch (err) {
    throw err.response?.data || { success: false, message: err.message };
  }
};

export const loginUser = async (data) => {
  try {
    const response = await axiosInstance.post("/auth/login", data);
    return response.data;
  } catch (err) {
    throw err.response?.data || { success: false, message: err.message };
  }
};
