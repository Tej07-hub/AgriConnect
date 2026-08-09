import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Package,
  Clock,
  Settings,
  Truck,
  CheckCircle,
  XCircle,
  MapPin,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import API from "../../services/customerAuthService";
import { logoutCustomer } from "../../utils/customerAuth";
import { getImageUrl } from "../../utils/imageUrl";

const OrderDetails = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();

  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================
  // Fetch Order
  // ==========================

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      setError("");

      // Get customer's orders
      const ordersResponse = await API.get("/orders");

      const foundOrder = ordersResponse.data.find(
        (item) =>
          Number(item.orderId) === Number(orderId)
      );

      if (!foundOrder) {
        setError("Order not found.");
        return;
      }

      setOrder(foundOrder);

      // Get order items
      const itemsResponse = await API.get(
        `/orders/${orderId}/items`
      );

      setItems(itemsResponse.data);

    } catch (error) {
      console.error(
        "Failed to load order:",
        error
      );

      if (error.response?.status === 401) {
        logoutCustomer();

        navigate("/customer/login", {
          replace: true,
        });

        return;
      }

      if (error.response?.status === 403) {
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
  // Tracking Steps
  // ==========================

  const trackingSteps = [
    {
      status: "PLACED",
      title: "Order Placed",
      description:
        "Your order has been successfully placed.",
      icon: Package,
    },
    {
      status: "PROCESSING",
      title: "Processing",
      description:
        "The retailer is preparing your order.",
      icon: Settings,
    },
    {
      status: "SHIPPED",
      title: "Shipped",
      description:
        "Your order has been handed over for delivery.",
      icon: Truck,
    },
    {
      status: "DELIVERED",
      title: "Delivered",
      description:
        "Your order has been delivered successfully.",
      icon: CheckCircle,
    },
  ];

  // ==========================
  // Status Progress
  // ==========================

  const getStatusIndex = (status) => {
    const index = trackingSteps.findIndex(
      (step) => step.status === status
    );

    return index;
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
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">

        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">

          <XCircle
            size={50}
            className="mx-auto text-red-500"
          />

          <h2 className="mt-5 text-xl font-bold text-gray-800">
            {error || "Order not found"}
          </h2>

          <button
            type="button"
            onClick={() =>
              navigate("/customer/orders")
            }
            className="mt-6 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
          >
            Back to Orders
          </button>

        </div>

      </div>
    );
  }

  const currentStatus =
    order.status?.toUpperCase();

  const currentIndex =
    getStatusIndex(currentStatus);

  const isCancelled =
    currentStatus === "CANCELLED";

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ==========================
          Header
      ========================== */}

      <header className="sticky top-0 z-50 border-b bg-white shadow-sm">

        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

          <button
            type="button"
            onClick={() =>
              navigate("/customer/orders")
            }
            className="flex items-center gap-2 font-medium text-gray-700 transition hover:text-green-600"
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

        {/* ==========================
            Order Header
        ========================== */}

        <div className="mb-8 rounded-2xl border bg-white p-6 shadow-sm">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Order ID
              </p>

              <h2 className="mt-1 text-2xl font-bold text-gray-900">
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

            <div className="text-left sm:text-right">

              <p className="text-sm text-gray-500">
                Total Amount
              </p>

              <p className="mt-1 text-2xl font-bold text-green-700">
                ₹{order.totalAmount}
              </p>

            </div>

          </div>

        </div>

        {/* ==========================
            Tracking
        ========================== */}

        <div className="mb-8 rounded-2xl border bg-white p-6 shadow-sm">

          <h2 className="text-xl font-bold text-gray-900">
            Order Tracking
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Track the progress of your order.
          </p>

          {isCancelled ? (

            <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-6">

              <div className="flex items-center gap-3">

                <XCircle
                  size={28}
                  className="text-red-600"
                />

                <div>

                  <h3 className="font-bold text-red-700">
                    Order Cancelled
                  </h3>

                  <p className="mt-1 text-sm text-red-600">
                    This order has been cancelled.
                  </p>

                </div>

              </div>

            </div>

          ) : (

            <div className="mt-8">

              {trackingSteps.map(
                (step, index) => {

                  const StepIcon = step.icon;

                  const completed =
                    index <= currentIndex;

                  const current =
                    index === currentIndex;

                  return (
                    <div
                      key={step.status}
                      className="relative flex gap-5"
                    >

                      {/* Vertical Line */}

                      {index <
                        trackingSteps.length - 1 && (
                        <div
                          className={`absolute left-5 top-12 h-16 w-0.5 ${
                            index < currentIndex
                              ? "bg-green-600"
                              : "bg-gray-200"
                          }`}
                        />
                      )}

                      {/* Icon */}

                      <div
                        className={`relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${
                          completed
                            ? "bg-green-600 text-white"
                            : "bg-gray-200 text-gray-400"
                        } ${
                          current
                            ? "ring-4 ring-green-100"
                            : ""
                        }`}
                      >
                        <StepIcon size={19} />
                      </div>

                      {/* Text */}

                      <div className="pb-10">

                        <h3
                          className={`font-semibold ${
                            completed
                              ? "text-gray-900"
                              : "text-gray-400"
                          }`}
                        >
                          {step.title}
                        </h3>

                        <p
                          className={`mt-1 text-sm ${
                            completed
                              ? "text-gray-600"
                              : "text-gray-400"
                          }`}
                        >
                          {step.description}
                        </p>

                        {current && (
                          <span className="mt-2 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                            Current Status
                          </span>
                        )}

                      </div>

                    </div>
                  );
                }
              )}

            </div>
          )}

        </div>

        {/* ==========================
            Products
        ========================== */}

        <div className="rounded-2xl border bg-white shadow-sm">

          <div className="border-b p-6">

            <h2 className="text-xl font-bold text-gray-900">
              Ordered Products
            </h2>

          </div>

          <div className="divide-y">

            {items.length === 0 ? (

              <div className="p-8 text-center text-gray-500">
                No products found for this order.
              </div>

            ) : (

              items.map((item) => (

                <div
                  key={item.orderItemId}
                  className="flex gap-4 p-6"
                >

                  {/* Image */}

                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">

                    <img
                      src={getImageUrl(
                        item.imageUrl
                      )}
                      alt={
                        item.productName ||
                        `Product ${item.productId}`
                      }
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src =
                          "/product-placeholder.jpg";
                      }}
                    />

                  </div>

                  {/* Details */}

                  <div className="min-w-0 flex-1">

                    <h3 className="font-semibold text-gray-900">
                      {item.productName ||
                        `Product #${item.productId}`}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Price: ₹{item.price}
                    </p>

                  </div>

                  {/* Subtotal */}

                  <div className="text-right">

                    <p className="font-bold text-green-700">
                      ₹
                      {item.subtotal ??
                        Number(item.price) *
                          Number(item.quantity)}
                    </p>

                  </div>

                </div>

              ))
            )}

          </div>

        </div>

        {/* ==========================
            Delivery Information
        ========================== */}

        <div className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <MapPin
              size={22}
              className="text-green-600"
            />

            <h2 className="text-xl font-bold text-gray-900">
              Delivery Information
            </h2>

          </div>

          <p className="mt-4 text-gray-500">
            Your order will be delivered to the address
            selected during checkout.
          </p>

        </div>

      </main>

    </div>
  );
};

export default OrderDetails;


