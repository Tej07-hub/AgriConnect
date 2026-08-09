import axios from "axios";

const API = axios.create({
  baseURL: "https://agriconnect-5ofk.onrender.com/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("retailerToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const retailerLogin = async (email, password) => {
  const response = await API.post("/retailers/login", {
    email,
    password,
  });

  return response.data;
};

export const getRetailerDashboard = async () => {
  const response = await API.get("/retailers/dashboard");
  return response.data;
};

export default API;

