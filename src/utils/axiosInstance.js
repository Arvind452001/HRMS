import axios from "axios";

/* ================= Axios Instance ================= */
const axiosInstance = axios.create({
  // baseURL: "http://localhost:3000/api",

  baseURL: "https://hrms-server-app.onrender.com/api",

  headers: {
    "Content-Type": "application/json",
  },
});

/* ================= Request Interceptor ================= */
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token directly (no JSON.parse)
    const token = localStorage.getItem("technoToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;