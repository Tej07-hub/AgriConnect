import API from "./api";

// ===============================
// Upload Product Image
// ===============================
export const uploadProductImage = async (file) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await API.post(
    "/upload/product-image",
    formData
  );

  return response.data.imageUrl || response.data;
};

// ===============================
// Add Product
// ===============================
export const addProduct = async (product) => {
  const response = await API.post(
    "/products",
    product
  );

  return response.data;
};

// ===============================
// Get All Products
// ===============================
export const getAllProducts = async () => {
  const response = await API.get(
    "/products"
  );

  return response;
};

// ===============================
// Get My Products
// ===============================
export const getMyProducts = async () => {
  const response = await API.get(
    "/products/my-products"
  );

  return response.data;
};

// ===============================
// Get Product By ID
// ===============================
export const getProductById = async (id) => {
  const response = await API.get(
    `/products/${id}`
  );

  return response.data;
};

// ===============================
// Update Product
// ===============================
export const updateProduct = async (id, productData) => {
  const response = await API.put(
    `/products/${id}`,
    productData
  );

  return response.data;
};

// ===============================
// Delete Product
// ===============================
export const deleteProduct = async (id) => {
  const response = await API.delete(
    `/products/${id}`
  );

  return response.data;
};

// ===============================
// Update Product Stock
// ===============================
export const updateProductStock = async (
  productId,
  stock
) => {
  const response = await API.patch(
    `/products/${productId}/stock`,
    {
      stock: Number(stock),
    }
  );

  return response.data;
};


