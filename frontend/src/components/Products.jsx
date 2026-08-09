import { useEffect, useState } from "react";
import { Search, ShoppingCart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { getAllProducts } from "../services/productService";
import { getImageUrl } from "../utils/imageUrl";

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

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

  async function fetchProducts() {
    try {
      setLoading(true);

      const response = await getAllProducts();

      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error("Failed to load products:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* =========================
          Header
      ========================= */}

      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-16">

          <div className="max-w-3xl">

            <p className="text-sm font-semibold uppercase tracking-widest text-green-600">
              AgriConnect Marketplace
            </p>

            <h1 className="mt-3 text-4xl md:text-5xl font-bold text-gray-900">
              Agricultural Products
            </h1>

            <p className="mt-5 text-lg text-gray-600 leading-8">
              Explore agricultural products available from trusted
              retailers. Find seeds, fertilizers, pesticides and other
              farming essentials in one place.
            </p>

          </div>

        </div>
      </section>


      {/* =========================
          Main
      ========================= */}

      <main className="max-w-7xl mx-auto px-6 py-12">

        {/* Search + Login */}
        <div className="flex flex-col md:flex-row gap-4 justify-between mb-10">

          {/* Search */}
          <div className="relative flex-1">

            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search products by name or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl pl-12 pr-4 py-4 outline-none focus:ring-2 focus:ring-green-500"
            />

          </div>

          {/* Customer Login */}
          <Link
            to="/customer/login"
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-xl font-semibold transition"
          >
            Login to Buy
            <ArrowRight size={18} />
          </Link>

        </div>


        {/* Product Count */}

        {!loading && (
          <div className="mb-6">

            <p className="text-gray-500">
              {filteredProducts.length} product
              {filteredProducts.length !== 1 ? "s" : ""} available
            </p>

          </div>
        )}


        {/* =========================
            Loading
        ========================= */}

        {loading ? (

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

            {[1, 2, 3, 4].map((item) => (

              <div
                key={item}
                className="animate-pulse overflow-hidden rounded-3xl bg-white border border-gray-200"
              >

                <div className="h-60 bg-gray-200" />

                <div className="p-6 space-y-4">

                  <div className="h-4 bg-gray-200 rounded" />

                  <div className="h-6 bg-gray-200 rounded" />

                  <div className="h-4 bg-gray-200 rounded" />

                  <div className="h-10 bg-gray-200 rounded" />

                </div>

              </div>

            ))}

          </div>

        ) : filteredProducts.length === 0 ? (

          /* =========================
              Empty
          ========================= */

          <div className="bg-white rounded-3xl border border-gray-200 p-16 text-center">

            <h2 className="text-2xl font-bold text-gray-800">
              No Products Found
            </h2>

            <p className="mt-3 text-gray-500">
              Try searching with another product name or category.
            </p>

          </div>

        ) : (

          /* =========================
              Products
          ========================= */

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {filteredProducts.map((product) => (

              <div
                key={product.productId}
                className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300"
              >

                {/* Image */}

                <div className="h-60 overflow-hidden bg-gray-100">

                  <img
                    src={getImageUrl(product.imageUrl)}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src =
                        "/product-placeholder.jpg";
                    }}
                  />

                </div>


                {/* Details */}

                <div className="p-6">

                  {/* Category */}

                  <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    {product.category}
                  </span>


                  {/* Product Name */}

                  <h2 className="mt-4 text-xl font-bold text-gray-900">
                    {product.name}
                  </h2>


                  {/* Description */}

                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                    {product.description}
                  </p>


                  {/* Price */}

                  <div className="mt-5">

                    <span className="text-2xl font-bold text-green-600">
                      ₹{product.price}
                    </span>

                    <span className="ml-1 text-sm text-gray-500">
                      / {product.unit}
                    </span>

                  </div>


                  {/* Stock */}

                  <div className="mt-3">

                    {product.stock > 0 ? (

                      <span className="text-sm font-medium text-green-600">
                        In Stock: {product.stock}
                      </span>

                    ) : (

                      <span className="text-sm font-medium text-red-600">
                        Out of Stock
                      </span>

                    )}

                  </div>


                  {/* Action */}

                  <Link
                    to="/customer/login"
                    className={`mt-5 w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition ${
                      product.stock > 0
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    <ShoppingCart size={19} />

                    {product.stock > 0
                      ? "Login to Buy"
                      : "Out of Stock"}

                  </Link>

                </div>

              </div>

            ))}

          </div>

        )}

      </main>

    </div>
  );
}

export default Products;


