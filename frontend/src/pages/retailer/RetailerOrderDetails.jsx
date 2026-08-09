import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Package,
  Clock,
  Settings,
  Truck,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import API from "../../services/api";
import { getImageUrl } from "../../utils/imageUrl";

const RetailerOrderDetails = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);

  // ==========================
  // Load Order
  // ==========================

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get(
        `/orders/retailer/${orderId}`
      );

      setOrder(response.data);

    } catch (err) {
      console.error(
        "Failed to load retailer order:",
        err
      );

      if (err.response?.status === 401) {
        navigate("/retailer/login", {
          replace: true,
        });
        return;
      }

      if (err.response?.status === 403) {
        setError(
          "You are not allowed to view this order."
        );
        return;
      }

      setError("Failed to load order details.");

    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Update Status
  // ==========================

  const updateStatus = async (status) => {
    try {
      setUpdating(true);

      await API.patch(
        `/orders/${orderId}/status`,
        {
          status,
        }
      );

      await fetchOrder();

    } catch (err) {
      console.error(
        "Failed to update order status:",
        err
      );

      alert("Failed to update order status.");

    } finally {
      setUpdating(false);
    }
  };

  // ==========================
  // Status Icon
  // ==========================

  const getStatusIcon = (status) => {
    switch (status) {
      case "PLACED":
        return <Clock size={18} />;

      case "PROCESSING":
        return <Settings size={18} />;

      case "SHIPPED":
        return <Truck size={18} />;

      case "DELIVERED":
        return <CheckCircle size={18} />;

      case "CANCELLED":
        return <XCircle size={18} />;

      default:
        return <Package size={18} />;
    }
  };

  // ==========================
  // Status Color
  // ==========================

  const getStatusColor = (status) => {
    switch (status) {
      case "PLACED":
        return "bg-blue-100 text-blue-700";

      case "PROCESSING":
        return "bg-yellow-100 text-yellow-700";

      case "SHIPPED":
        return "bg-purple-100 text-purple-700";

      case "DELIVERED":
        return "bg-green-100 text-green-700";

      case "CANCELLED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // ==========================
  // Loading
  // ==========================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">

        <div className="text-center">

          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-green-600 border-t-transparent" />

          <p className="mt-4 text-gray-600">
            Loading order details...
          </p>

        </div>

      </div>
    );
  }

  // ==========================
  // Error
  // ==========================

  if (error || !order) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">

        <div className="rounded-2xl bg-white p-10 text-center shadow">

          <XCircle
            size={50}
            className="mx-auto text-red-500"
          />

          <h2 className="mt-5 text-xl font-bold text-gray-800">
            {error || "Order not found"}
          </h2>

          <button
            onClick={() =>
              navigate("/retailer/orders")
            }
            className="mt-6 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
          >
            Back to Orders
          </button>

        </div>

      </div>
    );
  }

  const status = order.status?.toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ==========================
          Header
      ========================== */}

      <header className="border-b bg-white shadow-sm">

        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">

          <button
            onClick={() =>
              navigate("/retailer/orders")
            }
            className="flex items-center gap-2 font-medium text-gray-700 hover:text-green-600"
          >
            <ArrowLeft size={20} />

            Back to Orders
          </button>

          <h1 className="text-xl font-bold text-gray-900">
            Order Details
          </h1>

          <div className="w-32" />

        </div>

      </header>

      {/* ==========================
          Main
      ========================== */}

      <main className="mx-auto max-w-6xl px-6 py-10">

        {/* Order Summary */}

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Order ID
              </p>

              <h2 className="mt-1 text-3xl font-bold text-gray-900">
                #{order.orderId}
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                {order.orderDate
                  ? new Date(
                      order.orderDate
                    ).toLocaleString()
                  : ""}
              </p>

            </div>

            <div
              className={`flex w-fit items-center gap-2 rounded-full px-4 py-2 font-semibold ${getStatusColor(
                status
              )}`}
            >
              {getStatusIcon(status)}

              {status}
            </div>

          </div>

        </div>

        {/* ==========================
            Products
        ========================== */}

        <div className="mt-8 rounded-2xl border bg-white shadow-sm">

          <div className="border-b p-6">

            <h2 className="text-xl font-bold text-gray-900">
              Products in This Order
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Products belonging to your store.
            </p>

          </div>

          <div className="divide-y">

            {order.items?.map((item) => (

              <div
                key={item.productId}
                className="flex gap-5 p-6"
              >

                {/* Image */}

                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">

                  <img
                    src={getImageUrl(
                      item.imageUrl
                    )}
                    alt={item.productName}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "/product-placeholder.jpg";
                    }}
                  />

                </div>

                {/* Details */}

                <div className="flex-1">

                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.productName ||
                      `Product #${item.productId}`}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Category:{" "}
                    {item.category || "N/A"}
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Price: ₹{item.price}
                  </p>

                </div>

                {/* Subtotal */}

                <div className="text-right">

                  <p className="text-lg font-bold text-green-700">
                    ₹{item.subtotal}
                  </p>

                  <span
                    className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>

                </div>

              </div>

            ))}

          </div>

          {/* Total */}

          <div className="border-t bg-gray-50 p-6">

            <div className="flex items-center justify-between">

              <span className="text-lg font-semibold text-gray-700">
                Retailer Total
              </span>

              <span className="text-2xl font-bold text-green-700">
                ₹{order.totalAmount}
              </span>

            </div>

          </div>

        </div>

        {/* ==========================
            Status Management
        ========================== */}

        {status !== "DELIVERED" &&
          status !== "CANCELLED" && (

          <div className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold text-gray-900">
              Update Order Status
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Update the status after processing the order.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">

              {status === "PLACED" && (
                <button
                  disabled={updating}
                  onClick={() =>
                    updateStatus("PROCESSING")
                  }
                  className="rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-white hover:bg-yellow-600 disabled:bg-gray-400"
                >
                  Start Processing
                </button>
              )}

              {status === "PROCESSING" && (
                <button
                  disabled={updating}
                  onClick={() =>
                    updateStatus("SHIPPED")
                  }
                  className="rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white hover:bg-purple-700 disabled:bg-gray-400"
                >
                  Mark as Shipped
                </button>
              )}

              {status === "SHIPPED" && (
                <button
                  disabled={updating}
                  onClick={() =>
                    updateStatus("DELIVERED")
                  }
                  className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
                >
                  Mark as Delivered
                </button>
              )}

            </div>

          </div>
        )}

      </main>

    </div>
  );
};

export default RetailerOrderDetails;


