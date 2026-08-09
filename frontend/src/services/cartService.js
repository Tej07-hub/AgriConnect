import API from "./customerAuthService";

// ===============================
// Add Product To Cart
// ===============================

export const addToCart = async (productId, quantity = 1) => {
  const response = await API.post("/cart", {
    productId: productId,
    quantity: quantity,
  });

  return response.data;
};

// ===============================
// Get My Cart
// ===============================

export const getMyCart = async () => {
  const response = await API.get("/cart");

  return response.data;
};

// ===============================
// Remove From Cart
// ===============================

export const removeFromCart = async (cartId) => {
  const response = await API.delete(`/cart/${cartId}`);

  return response.data;
};

