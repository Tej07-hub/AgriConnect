import axios from "axios";

const API = axios.create({
  baseURL: "https://agriconnect-5ofk.onrender.com/api",
});

export const getAllCategories = () => {
  return API.get("/categories");
};

