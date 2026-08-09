import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getImageUrl } from "../../utils/imageUrl";

import {
  getProductById,
  updateProduct,
  uploadProductImage,
} from "../../services/productService";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    unit: "",
    imageUrl: "",
  });

  // ===============================
  // Load Product
  // ===============================
  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);

      const data = await getProductById(id);

      setProduct(data);
    } catch (error) {
      console.error("Failed to load product:", error);
      alert("Failed to load product.");
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // Handle Input Changes
  // ===============================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ===============================
  // Handle Image Upload
  // ===============================
  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    // Show local preview immediately
    const previewUrl = URL.createObjectURL(file);
    setSelectedImage(previewUrl);

    try {
      setUploadingImage(true);

      // uploadProductImage already creates FormData
      const imageUrl = await uploadProductImage(file);

      setProduct((prev) => ({
        ...prev,
        imageUrl: imageUrl,
      }));

      alert("Image uploaded successfully.");
    } catch (error) {
      console.error("Image upload failed:", error);

      // Remove preview if upload failed
      setSelectedImage(null);

      alert("Failed to upload image.");
    } finally {
      setUploadingImage(false);
    }
  };

  // ===============================
  // Update Product
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setUpdating(true);

      const updatedProduct = {
        ...product,
        price: Number(product.price),
        stock: Number(product.stock),
      };

      await updateProduct(id, updatedProduct);

      alert("Product updated successfully.");

      navigate("/retailer/dashboard/products");
    } catch (error) {
      console.error("Product update failed:", error);

      if (error.response?.status === 403) {
        alert("You are not authorized to update this product.");
      } else if (error.response?.status === 404) {
        alert("Product not found.");
      } else {
        alert("Failed to update product.");
      }
    } finally {
      setUpdating(false);
    }
  };

  // ===============================
  // Loading
  // ===============================
  if (loading) {
    return (
      <div className="flex justify-center items-center h-80">
        <p className="text-lg font-semibold">
          Loading product...
        </p>
      </div>
    );
  }

  // ===============================
  // Page
  // ===============================
  return (
    <div className="max-w-3xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-8">
        Edit Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 space-y-5"
      >

        {/* ===============================
            Product Image
        =============================== */}
        <div className="flex flex-col items-center gap-4">

          {selectedImage || product.imageUrl ? (
            <img
              src={
                selectedImage ||
                getImageUrl(product.imageUrl)
              }
              alt={product.name}
              className="w-48 h-48 rounded-lg border object-cover"
            />
          ) : (
            <div className="w-48 h-48 rounded-lg border flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}

          <input
            type="file"
            accept="image/jpeg,image/png,image/jpg,image/webp"
            onChange={handleImageChange}
            className="w-full"
          />

          {uploadingImage && (
            <p className="text-green-600 font-medium">
              Uploading image...
            </p>
          )}

        </div>

        {/* ===============================
            Product Name
        =============================== */}
        <div>
          <label className="block font-medium mb-2">
            Product Name
          </label>

          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Product Name"
            required
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* ===============================
            Description
        =============================== */}
        <div>
          <label className="block font-medium mb-2">
            Description
          </label>

          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Description"
            rows="4"
            required
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* ===============================
            Category
        =============================== */}
        <div>
          <label className="block font-medium mb-2">
            Category
          </label>

          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            placeholder="Category"
            required
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* ===============================
            Price
        =============================== */}
        <div>
          <label className="block font-medium mb-2">
            Price
          </label>

          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Price"
            min="0"
            required
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* ===============================
            Stock
        =============================== */}
        <div>
          <label className="block font-medium mb-2">
            Stock
          </label>

          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            placeholder="Stock"
            min="0"
            required
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* ===============================
            Unit
        =============================== */}
        <div>
          <label className="block font-medium mb-2">
            Unit
          </label>

          <input
            type="text"
            name="unit"
            value={product.unit}
            onChange={handleChange}
            placeholder="Unit (Kg, Packet, Litre...)"
            required
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* ===============================
            Update Button
        =============================== */}
        <button
          type="submit"
          disabled={updating || uploadingImage}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition"
        >
          {updating
            ? "Updating Product..."
            : "Update Product"}
        </button>

      </form>
    </div>
  );
};

export default EditProduct;

