import axios from "axios";

const API = axios.create({
  baseURL: "https://agriconnect-5ofk.onrender.com/api",
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("retailerToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;