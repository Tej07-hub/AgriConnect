import axios from "axios";

const API = axios.create({
  baseURL: "https://agriconnect-5ofk.onrender.com/api",
});

// Attach customer JWT
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("customerToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Get customer addresses
export const getMyAddresses = async () => {
  const response = await API.get("/address");
  return response.data;
};

// Add address
export const addAddress = async (addressData) => {
  const response = await API.post("/address", addressData);
  return response.data;
};

// Update address
export const updateAddress = async (addressId, addressData) => {
  const response = await API.put(
    `/address/${addressId}`,
    addressData
  );

  return response.data;
};

// Delete address
export const deleteAddress = async (addressId) => {
  const response = await API.delete(
    `/address/${addressId}`
  );

  return response.data;
};

export default API;

