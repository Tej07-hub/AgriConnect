import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Package,
  Eye,
  XCircle,
  Clock,
  CheckCircle,
  Truck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  getMyOrders,
  getOrderItems,
  cancelOrder,
} from "../../services/orderService";

import { logoutCustomer } from "../../utils/customerAuth";
import { getImageUrl } from "../../utils/imageUrl";

const Orders = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loadingItems, setLoadingItems] = useState(false);
  const [cancelling, setCancelling] = useState(null);

  const [error, setError] = useState("");

  useEffect(() => {
    loadOrders();
  }, []);

  // ==========================
  // Load Orders
  // ==========================

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getMyOrders();

      setOrders(data);
    } catch (error) {
      console.error("Failed to load orders:", error);

      if (error.response?.status === 401) {
        logoutCustomer();

        navigate("/customer/login", {
          replace: true,
        });

        return;
      }

      setError("Failed to load your orders.");
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // View Order Details
  // ==========================

  const handleViewOrder = async (order) => {
    try {
      setSelectedOrder(order);
      setLoadingItems(true);

      const items = await getOrderItems(order.orderId);

      setOrderItems(items);
    } catch (error) {
      console.error("Failed to load order items:", error);

      if (error.response?.status === 401) {
        logoutCustomer();

        navigate("/customer/login", {
          replace: true,
        });

        return;
      }

      setError("Failed to load order details.");
    } finally {
      setLoadingItems(false);
    }
  };

  // ==========================
  // Cancel Order
  // ==========================

  const handleCancelOrder = async (orderId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmCancel) {
      return;
    }

    try {
      setCancelling(orderId);
      setError("");

      const updatedOrder = await cancelOrder(orderId);

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderId === orderId
            ? updatedOrder
            : order
        )
      );

      if (selectedOrder?.orderId === orderId) {
        setSelectedOrder(updatedOrder);
      }
    } catch (error) {
      console.error("Failed to cancel order:", error);

      if (error.response?.status === 401) {
        logoutCustomer();

        navigate("/customer/login", {
          replace: true,
        });

        return;
      }

      setError(
        error.response?.data?.message ||
          "Unable to cancel this order."
      );
    } finally {
      setCancelling(null);
    }
  };

  // ==========================
  // Status Icon
  // ==========================

  const getStatusIcon = (status) => {
    switch (status) {
      case "DELIVERED":
        return <CheckCircle size={18} />;

      case "SHIPPED":
        return <Truck size={18} />;

      case "PROCESSING":
        return <Package size={18} />;

      case "CANCELLED":
        return <XCircle size={18} />;

      default:
        return <Clock size={18} />;
    }
  };

  // ==========================
  // Status Style
  // ==========================

  const getStatusStyle = (status) => {
    switch (status) {
      case "DELIVERED":
        return "bg-green-100 text-green-700";

      case "SHIPPED":
        return "bg-blue-100 text-blue-700";

      case "PROCESSING":
        return "bg-yellow-100 text-yellow-700";

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

          <p className="mt-4 font-medium text-gray-600">
            Loading your orders...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}

      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <button
            onClick={() =>
              navigate("/customer/home")
            }
            className="text-2xl font-bold text-green-700"
          >
            AgriConnect
          </button>

          <button
            onClick={() =>
              navigate("/customer/home")
            }
            className="flex items-center gap-2 font-medium text-gray-600 hover:text-green-600"
          >
            <ArrowLeft size={18} />
            Continue Shopping
          </button>

        </div>
      </header>

      {/* Main */}

      <main className="mx-auto max-w-7xl px-6 py-10">

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            My Orders
          </h1>

          <p className="mt-2 text-gray-500">
            Track and manage your AgriConnect orders.
          </p>
        </div>

        {/* Error */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {/* Empty */}

        {orders.length === 0 ? (
          <div className="rounded-2xl border bg-white p-14 text-center shadow-sm">

            <Package
              size={55}
              className="mx-auto text-gray-400"
            />

            <h2 className="mt-5 text-2xl font-bold text-gray-800">
              No Orders Yet
            </h2>

            <p className="mt-2 text-gray-500">
              Your placed orders will appear here.
            </p>

            <button
              onClick={() =>
                navigate("/customer/home")
              }
              className="mt-6 rounded-xl bg-green-600 px-7 py-3 font-semibold text-white hover:bg-green-700"
            >
              Browse Products
            </button>

          </div>
        ) : (

          <div className="grid gap-8 lg:grid-cols-3">

            {/* Orders List */}

            <div className="space-y-5 lg:col-span-2">

              {orders.map((order) => (

                <div
                  key={order.orderId}
                  className={`rounded-2xl border bg-white p-6 shadow-sm transition ${
                    selectedOrder?.orderId === order.orderId
                      ? "border-green-500"
                      : "border-gray-200"
                  }`}
                >

                  <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

                    <div>

                      <p className="text-sm text-gray-500">
                        Order ID
                      </p>

                      <h2 className="text-xl font-bold text-gray-900">
                        #{order.orderId}
                      </h2>

                      <p className="mt-1 text-sm text-gray-500">
                        {new Date(
                          order.orderDate
                        ).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>

                    </div>

                    <div
                      className={`flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${getStatusStyle(
                        order.status
                      )}`}
                    >
                      {getStatusIcon(order.status)}

                      {order.status}
                    </div>

                  </div>

                  <div className="mt-6 border-t pt-5">

                    <div className="flex items-center justify-between">

                      <div>
                        <p className="text-sm text-gray-500">
                          Total Amount
                        </p>

                        <p className="text-2xl font-bold text-green-600">
                          ₹
                          {Number(
                            order.totalAmount
                          ).toFixed(2)}
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          handleViewOrder(order)
                        }
                        className="flex items-center gap-2 rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 hover:border-green-600 hover:text-green-600"
                      >
                        <Eye size={18} />
                        View Details
                      </button>

                    </div>

                  </div>

                  {/* Cancel */}

                  {order.status === "PLACED" && (
                    <button
                      onClick={() =>
                        handleCancelOrder(
                          order.orderId
                        )
                      }
                      disabled={
                        cancelling ===
                        order.orderId
                      }
                      className="mt-5 flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700 disabled:text-gray-400"
                    >
                      <XCircle size={17} />

                      {cancelling === order.orderId
                        ? "Cancelling..."
                        : "Cancel Order"}
                    </button>
                  )}

                </div>

              ))}

            </div>

            {/* Order Details */}

            <aside className="h-fit rounded-2xl border bg-white p-6 shadow-sm lg:sticky lg:top-24">

              {!selectedOrder ? (

                <div className="py-12 text-center">

                  <Package
                    size={45}
                    className="mx-auto text-gray-300"
                  />

                  <h3 className="mt-4 font-semibold text-gray-700">
                    Select an order
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    Click "View Details" to see your products.
                  </p>

                </div>

              ) : (

                <>
                  <div className="flex items-center justify-between">

                    <div>
                      <p className="text-sm text-gray-500">
                        Order
                      </p>

                      <h2 className="text-xl font-bold">
                        #{selectedOrder.orderId}
                      </h2>
                    </div>

                    <div
                      className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                        selectedOrder.status
                      )}`}
                    >
                      {getStatusIcon(
                        selectedOrder.status
                      )}

                      {selectedOrder.status}
                    </div>

                  </div>

                  <div className="my-6 border-t" />

                  {loadingItems ? (

                    <div className="py-10 text-center">
                      <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-green-600 border-t-transparent" />

                      <p className="mt-3 text-sm text-gray-500">
                        Loading products...
                      </p>
                    </div>

                  ) : (

                    <div className="space-y-5">

                      {orderItems.map((item) => (

                        <div
                          key={item.orderItemId}
                          className="flex gap-4"
                        >

                          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">

                            {item.imageUrl ? (
                              <img
                                src={getImageUrl(
                                  item.imageUrl
                                )}
                                alt=""
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <Package
                                size={25}
                                className="m-auto mt-5 text-gray-400"
                              />
                            )}

                          </div>

                          <div className="min-w-0 flex-1">

                            <p className="truncate font-semibold text-gray-900">
                              {item.productName ||
                                `Product #${item.productId}`}
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                              Quantity:{" "}
                              {item.quantity}
                            </p>

                            <p className="text-sm text-gray-500">
                              Price: ₹
                              {Number(
                                item.price
                              ).toFixed(2)}
                            </p>

                          </div>

                        </div>

                      ))}

                    </div>

                  )}

                  <div className="my-6 border-t" />

                  <div className="flex justify-between">

                    <span className="font-semibold text-gray-700">
                      Total
                    </span>

                    <span className="text-xl font-bold text-green-600">
                      ₹
                      {Number(
                        selectedOrder.totalAmount
                      ).toFixed(2)}
                    </span>

                  </div>

                </>

              )}

            </aside>

          </div>

        )}

      </main>

    </div>
  );
};

export default Orders;


