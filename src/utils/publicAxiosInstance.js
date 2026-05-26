import axios from "axios";
import Swal from "sweetalert2";
import { baseURL } from "./baseUrlConfig";

/* ================= Public Axios ================= */
export const publicAxios = axios.create({
  baseURL: baseURL,

  headers: {
    "Content-Type": "application/json",
  },
});

/* ================= Private Axios ================= */
export const privateAxios = axios.create({
  baseURL: baseURL,

  headers: {
    "Content-Type": "application/json",
  },
});

/* ================= Request Interceptor ================= */
privateAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("technoToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => Promise.reject(error)
);

/* ================= Response Interceptor ================= */
privateAxios.interceptors.response.use(
  (response) => response,

  async (error) => {
    const status = error.response?.status;

    // Unauthorized
    if (status === 401) {
      localStorage.removeItem("technoToken");
      localStorage.removeItem("technoUser");

      await Swal.fire({
        icon: "warning",
        title: "Session Expired",
        text: "Please login again",
        confirmButtonText: "OK",
        allowOutsideClick: false,
      });

      window.location.href = "/login";
    }

    // Server Error
    else if (status === 500) {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Something went wrong",
      });
    }

    // Network Error
    else if (!error.response) {
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Please check your internet connection",
      });
    }

    return Promise.reject(error);
  }
);