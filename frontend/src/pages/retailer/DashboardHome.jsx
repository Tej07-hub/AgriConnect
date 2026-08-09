import { useEffect, useState } from "react";
import {
  Package,
  ShoppingCart,
  Clock3,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { getRetailerDashboard } from "../../services/authService";

const DashboardHome = () => {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  // ==========================
  // Load Dashboard
  // ==========================

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getRetailerDashboard();

      setDashboard(data);
    } catch (err) {
      console.error("Failed to load dashboard:", err);

      if (err.response?.status === 401) {
        navigate("/retailer/login", {
          replace: true,
        });
        return;
      }

      setError("Failed to load dashboard.");
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Loading
  // ==========================

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">

          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-green-600 border-t-transparent" />

          <p className="mt-4 font-medium text-gray-600">
            Loading Dashboard...
          </p>

        </div>
      </div>
    );
  }

  // ==========================
  // Error
  // ==========================

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
        {error}
      </div>
    );
  }

  // ==========================
  // Dashboard Cards
  // ==========================

  const cards = [
    {
      title: "Total Products",
      value: dashboard?.totalProducts ?? 0,
      icon: Package,
      color: "bg-blue-500",
    },
    {
      title: "Total Orders",
      value: dashboard?.totalOrders ?? 0,
      icon: ShoppingCart,
      color: "bg-green-500",
    },
    {
      title: "Pending Orders",
      value: dashboard?.pendingOrders ?? 0,
      icon: Clock3,
      color: "bg-yellow-500",
    },
    {
      title: "Completed Orders",
      value: dashboard?.completedOrders ?? 0,
      icon: CheckCircle2,
      color: "bg-emerald-600",
    },
    {
      title: "Low Stock",
      value: dashboard?.lowStockProducts ?? 0,
      icon: AlertTriangle,
      color: "bg-orange-500",
    },
    {
      title: "Out Of Stock",
      value: dashboard?.outOfStockProducts ?? 0,
      icon: XCircle,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="space-y-8">

      {/* ==========================
          Welcome
      ========================== */}

      <div>

        <h1 className="text-3xl font-bold text-gray-900">
          Welcome Back
        </h1>

        <p className="mt-2 text-gray-500">
          Here's what's happening in your store today.
        </p>

      </div>

      {/* ==========================
          Dashboard Cards
      ========================== */}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-2xl bg-white p-6 shadow-md transition hover:shadow-lg"
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-gray-500">
                    {card.title}
                  </p>

                  <h2 className="mt-2 text-4xl font-bold text-gray-900">
                    {card.value}
                  </h2>

                </div>

                <div
                  className={`${card.color} rounded-xl p-4 text-white`}
                >
                  <Icon size={28} />
                </div>

              </div>

            </div>
          );
        })}

      </div>

      {/* ==========================
          Orders Section
      ========================== */}

      <div className="rounded-2xl bg-white p-6 shadow-md">

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <div className="flex items-center gap-3">

              <div className="rounded-xl bg-green-100 p-3 text-green-600">
                <ShoppingCart size={24} />
              </div>

              <div>

                <h2 className="text-xl font-bold text-gray-900">
                  Order Management
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Manage orders containing your products.
                </p>

              </div>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              navigate("/retailer/orders")
            }
            className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
          >
            View Orders

            <ArrowRight size={18} />
          </button>

        </div>

        {/* Order Summary */}

        <div className="mt-6 grid gap-4 sm:grid-cols-3">

          {/* Total */}

          <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">

            <p className="text-sm text-gray-500">
              Total Orders
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              {dashboard?.totalOrders ?? 0}
            </p>

          </div>

          {/* Pending */}

          <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-5">

            <p className="text-sm text-yellow-700">
              Pending Orders
            </p>

            <p className="mt-2 text-3xl font-bold text-yellow-700">
              {dashboard?.pendingOrders ?? 0}
            </p>

          </div>

          {/* Completed */}

          <div className="rounded-xl border border-green-200 bg-green-50 p-5">

            <p className="text-sm text-green-700">
              Completed Orders
            </p>

            <p className="mt-2 text-3xl font-bold text-green-700">
              {dashboard?.completedOrders ?? 0}
            </p>

          </div>

        </div>

      </div>

      {/* ==========================
          Quick Actions
      ========================== */}

      <div>

        <h2 className="mb-4 text-xl font-bold text-gray-900">
          Quick Actions
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {/* Add Product */}

          <button
            type="button"
            onClick={() =>
              navigate(
                "/retailer/dashboard/add-product"
              )
            }
            className="group rounded-2xl border border-gray-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-green-500 hover:shadow-md"
          >

            <div className="flex items-center justify-between">

              <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
                <Package size={24} />
              </div>

              <ArrowRight
                size={20}
                className="text-gray-400 transition group-hover:text-green-600"
              />

            </div>

            <h3 className="mt-5 font-semibold text-gray-900">
              Add Product
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Add a new agricultural product to your store.
            </p>

          </button>

          {/* Manage Products */}

          <button
            type="button"
            onClick={() =>
              navigate(
                "/retailer/dashboard/products"
              )
            }
            className="group rounded-2xl border border-gray-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-green-500 hover:shadow-md"
          >

            <div className="flex items-center justify-between">

              <div className="rounded-xl bg-green-100 p-3 text-green-600">
                <ShoppingCart size={24} />
              </div>

              <ArrowRight
                size={20}
                className="text-gray-400 transition group-hover:text-green-600"
              />

            </div>

            <h3 className="mt-5 font-semibold text-gray-900">
              Manage Products
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              View, edit and manage your products.
            </p>

          </button>

          {/* Manage Orders */}

          <button
            type="button"
            onClick={() =>
              navigate("/retailer/orders")
            }
            className="group rounded-2xl border border-gray-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-green-500 hover:shadow-md"
          >

            <div className="flex items-center justify-between">

              <div className="rounded-xl bg-purple-100 p-3 text-purple-600">
                <Clock3 size={24} />
              </div>

              <ArrowRight
                size={20}
                className="text-gray-400 transition group-hover:text-green-600"
              />

            </div>

            <h3 className="mt-5 font-semibold text-gray-900">
              Manage Orders
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Process and update customer orders.
            </p>

          </button>

        </div>

      </div>

    </div>
  );
};

export default DashboardHome;