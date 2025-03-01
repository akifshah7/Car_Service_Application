import axios from "axios";

const BASE_URL = "http://localhost:8000/api";

// Create an Axios instance
const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request Interceptor (Attach Authorization Token if needed)
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("firebaseToken"); // Assuming you store token in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor (Handle Errors Globally)
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosClient;
