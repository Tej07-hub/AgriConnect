import axios from "axios";

const API = axios.create({
  baseURL: "https://agriconnect-backend-v5lu.onrender.com/api",
});

// Attach customer JWT
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("customerToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Place Order
export const placeOrder = async (addressId, paymentMethod) => {
  const response = await API.post("/orders/place", {
    addressId,
    paymentMethod,
  });

  return response.data;
};

// Get My Orders
export const getMyOrders = async () => {
  const response = await API.get("/orders");

  return response.data;
};

// Get Order Items
export const getOrderItems = async (orderId) => {
  const response = await API.get(`/orders/${orderId}/items`);

  return response.data;
};

// Cancel Order
export const cancelOrder = async (orderId) => {
  const response = await API.put(`/orders/${orderId}/cancel`);

  return response.data;
};

export default API;


