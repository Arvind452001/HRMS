import axiosInstance from "../utils/axiosInstance";

export const getAllEmployeesApi = async (filters) => {

  try {
    // console.log("responsedddddd")
    const response = await axiosInstance.get("/admin/allEmployees", {
      params: filters,
    });
// console.log("response",response.data.data)
    return response.data;
  } catch (err) {
    throw err.response?.data || { success: false, message: err.message };
  }
};

export const loginApi = async (data) => {
  try {
    const response = await axiosInstance.post("/auth/login", data);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: err.message };
  }
};


export const createVisitorApi = async (data) => {
  try {
    const response = await axiosInstance.post("/visitor/create", data);
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: err.message };
  }
};