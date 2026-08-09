import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  getMyCart,
  removeFromCart,
} from "../../services/cartService";

import { logoutCustomer } from "../../utils/customerAuth";
import { getImageUrl } from "../../utils/imageUrl";

const Cart = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingItem, setRemovingItem] = useState(null);
  const [error, setError] = useState("");

  // ==========================
  // Load Cart
  // ==========================

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getMyCart();

      setCart(data);

    } catch (error) {
      console.error("Failed to load cart:", error);

      if (error.response?.status === 401) {
        logoutCustomer();

        navigate("/customer/login", {
          replace: true,
        });

        return;
      }

      setError("Failed to load your cart.");

    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Remove Item
  // ==========================

  const handleRemove = async (cartId) => {
    try {
      setRemovingItem(cartId);

      await removeFromCart(cartId);

      setCart((prevCart) =>
        prevCart.filter(
          (item) => item.cartId !== cartId
        )
      );

    } catch (error) {
      console.error("Failed to remove item:", error);

      setError("Failed to remove item from cart.");

    } finally {
      setRemovingItem(null);
    }
  };

  // ==========================
  // Quantity Controls
  // ==========================
  //
  // Your current backend does not have a quantity-update
  // endpoint, so these buttons are UI-only for now.
  // We will connect them to the backend next.
  //

  const increaseQuantity = (cartId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.cartId === cartId
          ? {
              ...item,
              quantity: item.quantity + 1,
              totalPrice:
                Number(item.price) *
                (item.quantity + 1),
            }
          : item
      )
    );
  };

  const decreaseQuantity = (cartId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.cartId === cartId &&
        item.quantity > 1
          ? {
              ...item,
              quantity: item.quantity - 1,
              totalPrice:
                Number(item.price) *
                (item.quantity - 1),
            }
          : item
      )
    );
  };

  // ==========================
  // Grand Total
  // ==========================

  const grandTotal = cart.reduce(
    (total, item) =>
      total + Number(item.totalPrice),
    0
  );

  // ==========================
  // Loading
  // ==========================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">

        <div className="text-center">

          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-green-600 border-t-transparent" />

          <p className="mt-4 font-medium text-gray-600">
            Loading your cart...
          </p>

        </div>

      </div>
    );
  }

  // ==========================
  // Page
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
            onClick={() => navigate("/customer/home")}
            className="text-2xl font-bold text-green-700"
          >
            AgriConnect
          </button>

          {/* Right */}

          <div className="flex items-center gap-4">

            <button
              type="button"
              onClick={() =>
                navigate("/customer/home")
              }
              className="flex items-center gap-2 rounded-lg px-4 py-2 font-medium text-gray-600 transition hover:bg-gray-100 hover:text-green-600"
            >
              <ShoppingCart size={19} />
              Continue Shopping
            </button>

            <button
              type="button"
              onClick={() => {
                logoutCustomer();

                navigate("/customer/login", {
                  replace: true,
                });
              }}
              className="flex items-center gap-2 font-medium text-red-600 hover:text-red-700"
            >
              <LogOut size={19} />
              Logout
            </button>

          </div>

        </div>

      </header>

      {/* ==========================
          Main
      ========================== */}

      <main className="mx-auto max-w-7xl px-6 py-10">

        {/* Back */}

        <button
          type="button"
          onClick={() =>
            navigate("/customer/home")
          }
          className="mb-6 flex items-center gap-2 text-gray-600 transition hover:text-green-600"
        >
          <ArrowLeft size={18} />
          Back to Products
        </button>

        {/* Heading */}

        <div className="mb-8">

          <h1 className="text-4xl font-bold text-gray-900">
            Your Cart
          </h1>

          <p className="mt-2 text-gray-500">
            Review your selected agricultural products.
          </p>

        </div>

        {/* Error */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-100 p-4 text-red-700">
            {error}
          </div>
        )}

        {/* ==========================
            Empty Cart
        ========================== */}

        {cart.length === 0 ? (

          <div className="rounded-2xl border bg-white p-16 text-center shadow-sm">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">

              <ShoppingCart
                size={38}
                className="text-green-600"
              />

            </div>

            <h2 className="mt-6 text-2xl font-bold text-gray-800">
              Your Cart is Empty
            </h2>

            <p className="mx-auto mt-2 max-w-md text-gray-500">
              You haven't added any products yet.
              Browse agricultural products and add
              something to your cart.
            </p>

            <button
              type="button"
              onClick={() =>
                navigate("/customer/home")
              }
              className="mt-7 rounded-xl bg-green-600 px-7 py-3 font-semibold text-white transition hover:bg-green-700"
            >
              Browse Products
            </button>

          </div>

        ) : (

          /* ==========================
             Cart Content
          ========================== */

          <div className="grid gap-8 lg:grid-cols-3">

            {/* ==========================
                Cart Items
            ========================== */}

            <div className="space-y-5 lg:col-span-2">

              {cart.map((item) => (

                <div
                  key={item.cartId}
                  className="flex flex-col gap-5 rounded-2xl border bg-white p-5 shadow-sm sm:flex-row sm:items-center"
                >

                  {/* Image */}

                  <div className="h-32 w-full shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-28 sm:w-28">

                    <img
                      src={getImageUrl(item.imageUrl)}
                      alt={item.productName}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src =
                          "/product-placeholder.jpg";
                      }}
                    />

                  </div>

                  {/* Product Details */}

                  <div className="flex-1">

                    <h3 className="text-xl font-semibold text-gray-900">
                      {item.productName}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      ₹{item.price} per unit
                    </p>

                    {/* Quantity */}

                    <div className="mt-4 flex items-center gap-3">

                      <span className="text-sm font-medium text-gray-600">
                        Quantity
                      </span>

                      <div className="flex items-center overflow-hidden rounded-lg border">

                        <button
                          type="button"
                          onClick={() =>
                            decreaseQuantity(
                              item.cartId
                            )
                          }
                          disabled={
                            item.quantity <= 1
                          }
                          className="p-2 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <Minus size={16} />
                        </button>

                        <span className="min-w-10 px-3 text-center font-semibold">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            increaseQuantity(
                              item.cartId
                            )
                          }
                          className="p-2 transition hover:bg-gray-100"
                        >
                          <Plus size={16} />
                        </button>

                      </div>

                    </div>

                  </div>

                  {/* Price + Remove */}

                  <div className="flex items-center justify-between gap-5 sm:flex-col sm:items-end">

                    <p className="text-xl font-bold text-green-600">
                      ₹
                      {Number(
                        item.totalPrice
                      ).toFixed(2)}
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        handleRemove(item.cartId)
                      }
                      disabled={
                        removingItem === item.cartId
                      }
                      className="flex items-center gap-2 text-sm font-medium text-red-600 transition hover:text-red-700 disabled:opacity-50"
                    >
                      <Trash2 size={17} />

                      {removingItem === item.cartId
                        ? "Removing..."
                        : "Remove"}
                    </button>

                  </div>

                </div>

              ))}

            </div>

            {/* ==========================
                Order Summary
            ========================== */}

            <div className="h-fit rounded-2xl border bg-white p-6 shadow-sm lg:sticky lg:top-28">

              <h2 className="text-xl font-bold text-gray-900">
                Order Summary
              </h2>

              <div className="mt-6 space-y-4">

                <div className="flex justify-between text-gray-600">
                  <span>
                    Items
                  </span>

                  <span>
                    {cart.reduce(
                      (total, item) =>
                        total + item.quantity,
                      0
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>
                    Products
                  </span>

                  <span>
                    {cart.length}
                  </span>
                </div>

                <div className="border-t pt-4">

                  <div className="flex justify-between">

                    <span className="text-lg font-semibold text-gray-900">
                      Total
                    </span>

                    <span className="text-2xl font-bold text-green-600">
                      ₹{grandTotal.toFixed(2)}
                    </span>

                  </div>

                </div>

              </div>

              {/* Checkout */}

              <button
                type="button"
                onClick={() => navigate("/customer/checkout")}
                className="mt-7 w-full rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700"
                >
                Proceed to Checkout
                </button>

              <button
                type="button"
                onClick={() =>
                  navigate("/customer/home")
                }
                className="mt-3 w-full rounded-xl border border-gray-300 py-3 font-semibold text-gray-700 transition hover:border-green-600 hover:text-green-600"
              >
                Continue Shopping
              </button>

            </div>

          </div>

        )}

      </main>

    </div>
  );
};

export default Cart;


