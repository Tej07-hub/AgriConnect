import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../../components/retailer/ProductCard";

import {
  getMyProducts,
  deleteProduct,
} from "../../services/productService";

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredProducts(filtered);
  }, [search, products]);

  const fetchProducts = async () => {
    try {
      const data = await getMyProducts();

      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(productId);

      setProducts((prev) =>
        prev.filter(
          (product) => product.productId !== productId
        )
      );

      alert("Product deleted successfully.");
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete product.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96 text-xl font-semibold">
        Loading products...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold">
          My Products
        </h1>

        <Link
          to="/retailer/dashboard/add-product"
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg"
        >
          + Add Product
        </Link>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border rounded-lg px-4 py-3 mb-8 focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      {/* Empty State */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20">

          <h2 className="text-2xl font-semibold text-gray-600">
            No Products Found
          </h2>

          <p className="text-gray-500 mt-2">
            Add your first product to get started.
          </p>

          <Link
            to="/retailer/dashboard/add-product"
            className="inline-block mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
          >
            Add Product
          </Link>

        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {filteredProducts.map((product) => (
            <ProductCard
              key={product.productId}
              product={product}
              onDelete={handleDelete}
            />
          ))}

        </div>
      )}

    </div>
  );
};

export default MyProducts;

