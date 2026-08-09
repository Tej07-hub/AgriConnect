import { useState } from "react";
import {
  uploadProductImage,
  addProduct,
} from "../../services/productService";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    unit: "Kg",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      let imageUrl = "";

      // Upload Image
      if (image) {
        imageUrl = await uploadProductImage(image);
      }

      // Create Product
      await addProduct({
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        imageUrl,
      });

      setSuccess("Product added successfully!");

      // Reset Form
      setForm({
        name: "",
        description: "",
        category: "",
        price: "",
        stock: "",
        unit: "Kg",
      });

      setImage(null);
      setPreview("");
    } catch (err) {
      console.error(err);
      setError("Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Add Product</h1>

        <p className="text-gray-500 mt-2">
          Add a new product to your inventory.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow p-8"
      >
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left */}
          <div>
            <label className="font-medium">Product Image</label>

            <div className="mt-3">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-72 object-cover rounded-xl border"
                />
              ) : (
                <div className="w-full h-72 border-2 border-dashed rounded-xl flex items-center justify-center text-gray-400">
                  No Image Selected
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="mt-4"
              />
            </div>
          </div>

          {/* Right */}
          <div className="space-y-5">
            <div>
              <label>Product Name</label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-3 mt-2"
              />
            </div>

            <div>
              <label>Description</label>

              <textarea
                rows={4}
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-3 mt-2"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label>Category</label>

                <input
                  type="text"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg p-3 mt-2"
                />
              </div>

              <div>
                <label>Unit</label>

                <select
                  name="unit"
                  value={form.unit}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 mt-2"
                >
                  <option>Kg</option>
                  <option>Gram</option>
                  <option>Piece</option>
                  <option>Dozen</option>
                  <option>Packet</option>
                  <option>Litre</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label>Price</label>

                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg p-3 mt-2"
                />
              </div>

              <div>
                <label>Stock</label>

                <input
                  type="number"
                  name="stock"
                  value={form.stock}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg p-3 mt-2"
                />
              </div>
            </div>

            {success && (
              <div className="bg-green-100 text-green-700 p-3 rounded-lg">
                {success}
              </div>
            )}

            {error && (
              <div className="bg-red-100 text-red-700 p-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-700 hover:bg-green-800 disabled:bg-gray-400 text-white rounded-xl py-3 font-semibold transition"
            >
              {loading ? "Adding Product..." : "Add Product"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;

