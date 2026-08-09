import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Attach customer JWT automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("customerToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Customer Login
export const customerLogin = async (email, password) => {
  const response = await API.post("/customers/login", {
    email,
    password,
  });

  return response.data;
};

// Customer Registration
export const customerRegister = async (customerData) => {
  const response = await API.post(
    "/customers/register",
    customerData
  );

  return response.data;
};

// Get Customer Profile
export const getCustomerProfile = async () => {
  const response = await API.get("/customers/profile");

  return response.data;
};

// Update Customer Profile
export const updateCustomerProfile = async (customerData) => {
  const response = await API.put(
    "/customers/profile",
    customerData
  );

  return response.data;
};

export default API;


