import { useEffect, useState } from "react";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  RefreshCw,
  Eye,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import API from "../../services/api";

function RetailerOrders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(null);

  // =====================================================
  // GET RETAILER ORDERS
  // =====================================================

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/orders/retailer");

      setOrders(response.data);

    } catch (error) {
      console.error(
        "Failed to load retailer orders:",
        error
      );

      if (error.response?.status === 401) {
        navigate("/retailer/login", {
          replace: true,
        });
        return;
      }

      setError("Failed to load orders.");

    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // UPDATE ORDER STATUS
  // =====================================================

  const updateStatus = async (orderId, status) => {
    try {
      setUpdating(orderId);

      await API.patch(
        `/orders/${orderId}/status`,
        {
          status: status,
        }
      );

      await fetchOrders();

    } catch (error) {
      console.error(
        "Failed to update order status:",
        error
      );

      if (error.response?.status === 401) {
        navigate("/retailer/login", {
          replace: true,
        });
        return;
      }

      alert("Failed to update order status.");

    } finally {
      setUpdating(null);
    }
  };

  // =====================================================
  // VIEW ORDER DETAILS
  // =====================================================

  const viewOrderDetails = (orderId) => {
    navigate(`/retailer/orders/${orderId}`);
  };

  // =====================================================
  // STATUS ICON
  // =====================================================

  const getStatusIcon = (status) => {
    switch (status?.toUpperCase()) {

      case "PLACED":
        return <Clock size={18} />;

      case "PROCESSING":
        return <Package size={18} />;

      case "SHIPPED":
        return <Truck size={18} />;

      case "DELIVERED":
        return <CheckCircle size={18} />;

      case "CANCELLED":
        return <Clock size={18} />;

      default:
        return <Package size={18} />;
    }
  };

  // =====================================================
  // STATUS STYLE
  // =====================================================

  const getStatusStyle = (status) => {
    switch (status?.toUpperCase()) {

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

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">

        <div className="text-center">

          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-green-600 border-t-transparent" />

          <p className="mt-4 text-gray-600">
            Loading orders...
          </p>

        </div>

      </div>
    );
  }

  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <div className="min-h-screen bg-gray-50">

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="border-b bg-white shadow-sm">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div>

            <h1 className="text-2xl font-bold text-gray-900">
              Orders
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage orders containing your products.
            </p>

          </div>

          <button
            type="button"
            onClick={fetchOrders}
            className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 transition hover:border-green-600 hover:text-green-600"
          >

            <RefreshCw size={18} />

            Refresh

          </button>

        </div>

      </header>

      {/* =================================================
          MAIN
      ================================================= */}

      <main className="mx-auto max-w-7xl px-6 py-8">

        {/* ERROR */}

        {error && (
          <div className="mb-6 rounded-xl bg-red-100 p-4 text-red-700">
            {error}
          </div>
        )}

        {/* EMPTY */}

        {!error && orders.length === 0 && (

          <div className="rounded-2xl border bg-white p-12 text-center shadow-sm">

            <Package
              size={50}
              className="mx-auto text-gray-300"
            />

            <h2 className="mt-5 text-xl font-semibold text-gray-700">
              No Orders Yet
            </h2>

            <p className="mt-2 text-gray-500">
              Orders containing your products will appear here.
            </p>

          </div>

        )}

        {/* =================================================
            ORDERS
        ================================================= */}

        <div className="space-y-6">

          {orders.map((order) => (

            <div
              key={order.orderId}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >

              {/* =================================================
                  ORDER HEADER
              ================================================= */}

              <div className="flex flex-col gap-4 border-b pb-5 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <p className="text-sm text-gray-500">
                    Order ID
                  </p>

                  <h2 className="text-xl font-bold text-gray-900">
                    #{order.orderId}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">

                    {order.orderDate
                      ? new Date(
                          order.orderDate
                        ).toLocaleString()
                      : "Date unavailable"}

                  </p>

                </div>

                {/* STATUS */}

                <div
                  className={`flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${getStatusStyle(
                    order.status
                  )}`}
                >

                  {getStatusIcon(order.status)}

                  {order.status}

                </div>

              </div>

              {/* =================================================
                  ORDER INFORMATION
              ================================================= */}

              <div className="mt-6 grid gap-6 md:grid-cols-3">

                {/* CUSTOMER */}

                <div>

                  <p className="text-sm text-gray-500">
                    Customer ID
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    #{order.customerId}
                  </p>

                </div>

                {/* TOTAL */}

                <div>

                  <p className="text-sm text-gray-500">
                    Total Amount
                  </p>

                  <p className="mt-1 text-xl font-bold text-green-700">
                    ₹{order.totalAmount}
                  </p>

                </div>

                {/* PAYMENT */}

                <div>

                  <p className="text-sm text-gray-500">
                    Payment
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {order.paymentMethod || "N/A"}
                  </p>

                </div>

              </div>

              {/* =================================================
                  ACTIONS
              ================================================= */}

              <div className="mt-6 flex flex-wrap gap-3 border-t pt-6">

                {/* VIEW DETAILS */}

                <button
                  type="button"
                  onClick={() =>
                    viewOrderDetails(order.orderId)
                  }
                  className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 transition hover:border-green-600 hover:text-green-600"
                >

                  <Eye size={18} />

                  View Details

                </button>

                {/* =================================================
                    PLACED → PROCESSING
                ================================================= */}

                {order.status === "PLACED" && (

                  <button
                    type="button"
                    disabled={
                      updating === order.orderId
                    }
                    onClick={() =>
                      updateStatus(
                        order.orderId,
                        "PROCESSING"
                      )
                    }
                    className="rounded-xl bg-yellow-500 px-5 py-3 font-semibold text-white transition hover:bg-yellow-600 disabled:cursor-not-allowed disabled:bg-gray-400"
                  >

                    {updating === order.orderId
                      ? "Updating..."
                      : "Start Processing"}

                  </button>

                )}

                {/* =================================================
                    PROCESSING → SHIPPED
                ================================================= */}

                {order.status === "PROCESSING" && (

                  <button
                    type="button"
                    disabled={
                      updating === order.orderId
                    }
                    onClick={() =>
                      updateStatus(
                        order.orderId,
                        "SHIPPED"
                      )
                    }
                    className="rounded-xl bg-purple-600 px-5 py-3 font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                  >

                    {updating === order.orderId
                      ? "Updating..."
                      : "Mark as Shipped"}

                  </button>

                )}

                {/* =================================================
                    SHIPPED → DELIVERED
                ================================================= */}

                {order.status === "SHIPPED" && (

                  <button
                    type="button"
                    disabled={
                      updating === order.orderId
                    }
                    onClick={() =>
                      updateStatus(
                        order.orderId,
                        "DELIVERED"
                      )
                    }
                    className="rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                  >

                    {updating === order.orderId
                      ? "Updating..."
                      : "Mark as Delivered"}

                  </button>

                )}

              </div>

            </div>

          ))}

        </div>

      </main>

    </div>
  );
}

export default RetailerOrders;