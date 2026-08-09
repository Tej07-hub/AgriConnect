import { useEffect, useState } from "react";
import {
  Search,
  LogOut,
  ShoppingCart,
  Package,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import API from "../../services/customerAuthService";
import { logoutCustomer } from "../../utils/customerAuth";
import { getImageUrl } from "../../utils/imageUrl";
import {
  addToCart,
  getMyCart,
} from "../../services/cartService";

const CustomerHome = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [addingProduct, setAddingProduct] = useState(null);
  const [cartMessage, setCartMessage] = useState("");
  const [cartCount, setCartCount] = useState(0);

  // ==========================
  // Initial Load
  // ==========================

  useEffect(() => {
    fetchProducts();
    fetchCartCount();
  }, []);

  // ==========================
  // Search / Filter
  // ==========================

  useEffect(() => {
    const keyword = search.toLowerCase().trim();

    const filtered = products.filter((product) => {
      return (
        product.name?.toLowerCase().includes(keyword) ||
        product.category?.toLowerCase().includes(keyword)
      );
    });

    setFilteredProducts(filtered);
  }, [search, products]);

  // ==========================
  // Fetch Products
  // ==========================

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/products/customer");

      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error("Failed to load products:", error);

      if (error.response?.status === 401) {
        logoutCustomer();

        navigate("/customer/login", {
          replace: true,
        });

        return;
      }

      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Fetch Cart Count
  // ==========================

  const fetchCartCount = async () => {
    try {
      const cart = await getMyCart();

      const count = cart.reduce(
        (total, item) => total + item.quantity,
        0
      );

      setCartCount(count);
    } catch (error) {
      console.error("Failed to load cart count:", error);

      if (error.response?.status === 401) {
        logoutCustomer();

        navigate("/customer/login", {
          replace: true,
        });
      }
    }
  };

  // ==========================
  // Add Product To Cart
  // ==========================

  const handleAddToCart = async (productId) => {
    try {
      setAddingProduct(productId);
      setCartMessage("");

      await addToCart(productId, 1);

      // Update cart badge immediately
      await fetchCartCount();

      setCartMessage(
        "Product added to cart successfully."
      );

      setTimeout(() => {
        setCartMessage("");
      }, 3000);
    } catch (error) {
      console.error(
        "Failed to add product to cart:",
        error
      );

      if (error.response?.status === 401) {
        logoutCustomer();

        navigate("/customer/login", {
          replace: true,
        });

        return;
      }

      setCartMessage(
        "Failed to add product to cart."
      );

      setTimeout(() => {
        setCartMessage("");
      }, 3000);
    } finally {
      setAddingProduct(null);
    }
  };

  // ==========================
  // Logout
  // ==========================

  const handleLogout = () => {
    logoutCustomer();

    navigate("/customer/login", {
      replace: true,
    });
  };

  // ==========================
  // Loading
  // ==========================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">

          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-green-600 border-t-transparent" />

          <p className="mt-4 font-medium text-gray-600">
            Loading products...
          </p>

        </div>
      </div>
    );
  }

  // ==========================
  // UI
  // ==========================

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ==========================
          Header
      ========================== */}

      <header className="sticky top-0 z-50 border-b bg-white shadow-sm">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          {/* Logo */}

          <button
            type="button"
            onClick={() =>
              navigate("/customer/home")
            }
            className="text-left"
          >
            <h1 className="text-2xl font-bold text-green-700">
              AgriConnect
            </h1>

            <p className="text-sm text-gray-500">
              Agricultural Marketplace
            </p>
          </button>

          {/* Right Side */}

          <div className="flex items-center gap-3">

            {/* My Orders */}

            <button
              type="button"
              onClick={() =>
                navigate("/customer/orders")
              }
              className="hidden items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 font-medium text-gray-700 transition hover:border-green-600 hover:text-green-600 sm:flex"
            >
              <Package size={20} />

              My Orders
            </button>

            {/* Cart */}

            <button
              type="button"
              onClick={() =>
                navigate("/customer/cart")
              }
              className="relative rounded-lg p-2 transition hover:bg-gray-100"
              title="Cart"
            >
              <ShoppingCart
                size={24}
                className="text-gray-700"
              />

              {/* Cart Count */}

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-xs font-bold text-white">
                  {cartCount > 99
                    ? "99+"
                    : cartCount}
                </span>
              )}
            </button>

            {/* Logout */}

            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-2 font-medium text-red-600 transition hover:text-red-700"
            >
              <LogOut size={20} />

              <span className="hidden sm:inline">
                Logout
              </span>
            </button>

          </div>

        </div>

      </header>

      {/* ==========================
          Main
      ========================== */}

      <main className="mx-auto max-w-7xl px-6 py-8">

        {/* Heading */}

        <div className="mb-8">

          <h2 className="text-3xl font-bold text-gray-900">
            Find Agricultural Products
          </h2>

          <p className="mt-2 text-gray-500">
            Browse products available from retailers.
          </p>

        </div>

        {/* ==========================
            Cart Message
        ========================== */}

        {cartMessage && (
          <div className="mb-6 rounded-xl border border-green-200 bg-green-100 px-5 py-4 font-medium text-green-700">
            {cartMessage}
          </div>
        )}

        {/* ==========================
            Search
        ========================== */}

        <div className="relative mb-8">

          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search by product name or category..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full rounded-xl border bg-white py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-green-500"
          />

        </div>

        {/* ==========================
            Error
        ========================== */}

        {error && (
          <div className="mb-6 rounded-lg bg-red-100 p-4 text-red-700">
            {error}
          </div>
        )}

        {/* ==========================
            Product Count
        ========================== */}

        {!error && (
          <p className="mb-5 text-gray-500">
            {filteredProducts.length} product
            {filteredProducts.length !== 1
              ? "s"
              : ""}{" "}
            found
          </p>
        )}

        {/* ==========================
            Empty State
        ========================== */}

        {filteredProducts.length === 0 &&
        !error ? (

          <div className="rounded-xl bg-white p-12 text-center shadow-sm">

            <h3 className="text-xl font-semibold text-gray-600">
              No Products Found
            </h3>

            <p className="mt-2 text-gray-500">
              Try searching for another product or
              category.
            </p>

          </div>

        ) : (

          /* ==========================
             Products
          ========================== */

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {filteredProducts.map((product) => (

              <div
                key={product.productId}
                className="overflow-hidden rounded-xl bg-white shadow-sm transition hover:shadow-lg"
              >

                {/* Product Image */}

                <div className="h-52 overflow-hidden bg-gray-100">

                  <img
                    src={getImageUrl(
                      product.imageUrl
                    )}
                    alt={product.name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "/product-placeholder.jpg";
                    }}
                  />

                </div>

                {/* Product Details */}

                <div className="p-5">

                  {/* Product Name */}

                  <h3 className="text-lg font-bold text-gray-900">
                    {product.name}
                  </h3>

                  {/* Category */}

                  <p className="mt-1 text-sm text-gray-500">
                    {product.category}
                  </p>

                  {/* Price */}

                  <p className="mt-4 text-xl font-bold text-green-700">
                    ₹{product.price}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Per {product.unit}
                  </p>

                  {/* Stock */}

                  <div className="mt-3">

                    {product.stock > 0 ? (

                      <span className="font-medium text-green-600">
                        In Stock:{" "}
                        {product.stock}
                      </span>

                    ) : (

                      <span className="font-medium text-red-600">
                        Out of Stock
                      </span>

                    )}

                  </div>

                  {/* Add To Cart */}

                  <button
                    type="button"
                    disabled={
                      product.stock <= 0 ||
                      addingProduct ===
                        product.productId
                    }
                    onClick={() =>
                      handleAddToCart(
                        product.productId
                      )
                    }
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                  >

                    <ShoppingCart size={20} />

                    {addingProduct ===
                    product.productId
                      ? "Adding..."
                      : product.stock > 0
                      ? "Add to Cart"
                      : "Out of Stock"}

                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </main>

    </div>
  );
};

export default CustomerHome;