import axios from "axios";
import { BASE_URL } from "./apiPaths";
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,

  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accesstoken = localStorage.getItem("token");
    if (accesstoken) {
      config.headers.Authorization = `Bearer ${accesstoken}`;
    }
    // Allow dynamic Content-Type (do not force JSON)
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.error("Unauthorized , Redirect to login page");
        window.location.href = "/login";
      } else if (error.response.status === 500) {
        console.error("server error , please try again");
      } else if (error.code === "ECONNABORTED") {
        console.error("Request timed out, please try again");
      }

      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
