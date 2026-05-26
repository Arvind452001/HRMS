import axiosInstance from "../utils/axiosInstance";

// Apply Leave
export const applyLeaveApi = async (data) => {
  try {
    const response = await axiosInstance.post(
      "/leave/apply-leave",
      data
    );
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: err.message };
  }
};

// Get My Leaves
export const getMyLeavesApi = async () => {
  try {
    const response = await axiosInstance.get(
      "/leave/get-my-leaves"
    );
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: err.message };
  }
};

// Cancel Leave
export const cancelLeaveApi = async (leaveId) => {
  try {
    const response = await axiosInstance.patch(
      `/leave/cancel-leave/${leaveId}`
    );
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: err.message };
  }
};


// Get All Leaves (HR)
export const getAllLeaveApi = async (params = {}) => {
  try {
    const response = await axiosInstance.get("/admin/leaves/pending", {
      params,
    });

    return response.data;
  } catch (err) {
    throw err.response?.data || { message: err.message };
  }
};


export const updateLeaveStatusApi = async (leaveId, payload) => {
  try {
    const response = await axiosInstance.patch(
      `/admin/leaves/${leaveId}/status`,
      payload
    );
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: err.message };
  }
};