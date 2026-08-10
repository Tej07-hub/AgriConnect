import axios from "axios";

const API = axios.create({
  baseURL: "https://agriconnect-backend-v5lu.onrender.com/api",
});

export const getAllCategories = () => {
  return API.get("/categories");
};


