import axiosInstance from "../utils/axiosInstance";

/* ================= Check In ================= */

export const checkInApi = async (data) => {
  try {
    const response = await axiosInstance.post(
      `/employees/check-in`,
      data
    );

    return response.data;
  } catch (err) {
    throw err.response?.data || { success: false, message: err.message };
  }
};


/* ================= Check Out ================= */

export const checkOutApi = async (data) => {
  try {
    localStorage.removeItem("checkInTime");
    const response = await axiosInstance.post(
      `/employees/check-out`,
      data
    );

    return response.data;
  } catch (err) {
    throw err.response?.data || { success: false, message: err.message };
  }
};


/* ================= Get All Attendance ================= */
export const getAllAttendanceApi = async (
  year,
  month
) => {

  try {
console.log('getAllAttendanceApi',year,month)
    const response =
      await axiosInstance.get(
        `/employees/attendance/my`,
        {
          params: {
            year,
            month,
          },
        }
      );

    return response.data;

  } catch (err) {

    throw (
      err.response?.data || {
        success: false,
        message: err.message,
      }
    );
  }
};

/* ================= Get All Attendance ================= */
export const getTodayAttendanceApi = async () => {
  try {
    const response = await axiosInstance.get(
      `/employees/getEmployeesAttendance`
    );

    return response.data;

  } catch (err) {
    throw (
      err.response?.data || {
        success: false,
        message: err.message,
      }
    );
  }
};


/* ================= Get Employee Attendance ================= */

export const getEmployeeAttendanceApi = async (employeeId) => {
  try {
    const response = await axiosInstance.get(
      `/attendance/employee/${employeeId}`
    );

    return response.data;

  } catch (err) {
    throw (
      err.response?.data || {
        success: false,
        message: err.message,
      }
    );
  }
};