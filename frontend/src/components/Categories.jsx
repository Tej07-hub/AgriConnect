import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { getAllCategories } from "../services/categoryService";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      setLoading(true);
      setError("");

      const response = await getAllCategories();
      setCategories(response.data);
    } catch (err) {
      console.error(err);
      setError("Unable to load categories.");
    } finally {
      setLoading(false);
    }
  }

  // Loading State
  if (loading) {
    return (
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14">
            <div className="h-4 w-28 animate-pulse rounded bg-gray-200"></div>
            <div className="mt-4 h-10 w-80 animate-pulse rounded bg-gray-200"></div>
            <div className="mt-4 h-5 w-96 animate-pulse rounded bg-gray-200"></div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-3xl border border-gray-200"
              >
                <div className="h-56 animate-pulse bg-gray-200"></div>

                <div className="space-y-4 p-6">
                  <div className="h-6 w-2/3 animate-pulse rounded bg-gray-200"></div>
                  <div className="h-4 w-full animate-pulse rounded bg-gray-200"></div>
                  <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error State
  if (error) {
    return (
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-3xl font-bold text-red-600">
            Something went wrong
          </h2>

          <p className="mt-3 text-gray-600">{error}</p>

          <button
            onClick={fetchCategories}
            className="mt-8 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  // Empty State
  if (categories.length === 0) {
    return (
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            No Categories Available
          </h2>

          <p className="mt-4 text-gray-600">
            Categories will appear here once they are added by the administrator.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="mb-14 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-green-600">
              Categories
            </p>

            <h2 className="mt-2 text-4xl font-bold text-gray-900">
              Browse by Category
            </h2>

            <p className="mt-3 max-w-2xl text-gray-600">
              Discover fresh agricultural products across multiple categories.
            </p>
          </div>

          <button className="hidden items-center gap-2 rounded-xl border border-gray-300 px-5 py-3 font-medium text-gray-700 transition hover:border-green-600 hover:text-green-600 md:flex">
            View All
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <div
              key={category.categoryId}
              className="group cursor-pointer overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="h-56 overflow-hidden bg-gray-100">
                <img
                  src={`http://localhost:8080/uploads/${category.imageUrl}`}
                  alt={category.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.src = "/category-placeholder.jpg";
                  }}
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  {category.name}
                </h3>

                <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                  {category.description}
                </p>

                <button className="mt-6 flex items-center gap-2 font-medium text-green-600 transition group-hover:gap-3">
                  Explore
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Categories;


