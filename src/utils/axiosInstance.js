import axios from "axios";
import Swal from "sweetalert2";
import { baseURL } from "./baseUrlConfig";

/* ================= Axios Instance ================= */
const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ================= Request Interceptor ================= */
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token
    const token = localStorage.getItem("technoToken");

    // Attach token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ================= Response Interceptor ================= */
axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const status = error.response?.status;

    // Handle Unauthorized Error
    if (status === 401) {
      // Remove stored data
      localStorage.removeItem("technoToken");
      localStorage.removeItem("technoUser");

      // Show alert
      await Swal.fire({
        icon: "warning",
        title: "Session Expired",
        text: "Please login again",
        confirmButtonText: "OK",
        allowOutsideClick: false,
      });

      // Redirect to login
      window.location.href = "/login";
    }

    // Handle Server Error
    if (status === 500) {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Something went wrong on server",
      });
    }

    // Handle Network Error
    if (!error.response) {
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Please check your internet connection/ login again",
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;