import { useEffect, useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Plus,
  CreditCard,
  ShoppingBag,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  getMyAddresses,
  addAddress,
} from "../../services/addressService";

import {
  placeOrder,
} from "../../services/orderService";

import {
  getMyCart,
} from "../../services/cartService";

import { logoutCustomer } from "../../utils/customerAuth";
import { getImageUrl } from "../../utils/imageUrl";

const Checkout = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [addresses, setAddresses] = useState([]);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);

  const [showAddressForm, setShowAddressForm] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [addressForm, setAddressForm] = useState({
    fullName: "",
    mobile: "",
    house: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    isDefault: false,
  });

  // ==========================
  // Load Checkout Data
  // ==========================

  useEffect(() => {
    loadCheckout();
  }, []);

  const loadCheckout = async () => {
    try {
      setLoading(true);
      setError("");

      const [cartData, addressData] = await Promise.all([
        getMyCart(),
        getMyAddresses(),
      ]);

      setCart(cartData);
      setAddresses(addressData);

      // Automatically select default address
      const defaultAddress = addressData.find(
        (address) => address.isDefault === true
      );

      if (defaultAddress) {
        setSelectedAddress(defaultAddress.addressId);
      } else if (addressData.length > 0) {
        setSelectedAddress(addressData[0].addressId);
      }
    } catch (error) {
      console.error("Failed to load checkout:", error);

      if (error.response?.status === 401) {
        logoutCustomer();

        navigate("/customer/login", {
          replace: true,
        });

        return;
      }

      setError("Failed to load checkout information.");
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Address Form
  // ==========================

  const handleAddressChange = (e) => {
    const { name, value } = e.target;

    setAddressForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();

    try {
      setError("");

      const newAddress = await addAddress(addressForm);

      setAddresses((prev) => [
        ...prev,
        newAddress,
      ]);

      setSelectedAddress(newAddress.addressId);

      setShowAddressForm(false);

      setAddressForm({
        fullName: "",
        mobile: "",
        house: "",
        street: "",
        city: "",
        state: "",
        pincode: "",
        isDefault: false,
      });
    } catch (error) {
      console.error("Failed to add address:", error);

      if (error.response?.status === 401) {
        logoutCustomer();

        navigate("/customer/login", {
          replace: true,
        });

        return;
      }

      setError("Failed to add address.");
    }
  };

  // ==========================
  // Total
  // ==========================

  const grandTotal = cart.reduce(
    (total, item) =>
      total + Number(item.totalPrice),
    0
  );

  // ==========================
  // Place Order
  // ==========================

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      setError("Please select a delivery address.");
      return;
    }

    if (!paymentMethod) {
      setError("Please select a payment method.");
      return;
    }

    try {
      setPlacingOrder(true);
      setError("");

      const order = await placeOrder(
        selectedAddress,
        paymentMethod
      );

      setSuccess(
        `Order #${order.orderId} placed successfully!`
      );

      setTimeout(() => {
        navigate("/customer/orders");
      }, 1500);
    } catch (error) {
      console.error("Failed to place order:", error);

      if (error.response?.status === 401) {
        logoutCustomer();

        navigate("/customer/login", {
          replace: true,
        });

        return;
      }

      setError(
        error.response?.data?.message ||
        "Failed to place order. Please try again."
      );
    } finally {
      setPlacingOrder(false);
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
            Loading checkout...
          </p>
        </div>
      </div>
    );
  }

  // ==========================
  // Empty Cart
  // ==========================

  if (cart.length === 0 && !success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
        <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
          <ShoppingBag
            size={50}
            className="mx-auto text-gray-400"
          />

          <h2 className="mt-5 text-2xl font-bold text-gray-800">
            Your cart is empty
          </h2>

          <p className="mt-2 text-gray-500">
            Add some products before checkout.
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
      </div>
    );
  }

  // ==========================
  // Page
  // ==========================

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
              navigate("/customer/cart")
            }
            className="flex items-center gap-2 text-gray-600 hover:text-green-600"
          >
            <ArrowLeft size={18} />
            Back to Cart
          </button>

        </div>
      </header>

      {/* Main */}

      <main className="mx-auto max-w-7xl px-6 py-10">

        <h1 className="text-4xl font-bold text-gray-900">
          Checkout
        </h1>

        <p className="mt-2 text-gray-500">
          Complete your order securely.
        </p>

        {/* Success */}

        {success && (
          <div className="mt-6 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-5 text-green-700">
            <CheckCircle size={24} />

            <span className="font-semibold">
              {success}
            </span>
          </div>
        )}

        {/* Error */}

        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        <div className="mt-8 grid gap-8 lg:grid-cols-3">

          {/* Left */}

          <div className="space-y-8 lg:col-span-2">

            {/* Address */}

            <section className="rounded-2xl border bg-white p-6 shadow-sm">

              <div className="flex items-center justify-between">

                <div>
                  <h2 className="flex items-center gap-2 text-xl font-bold">
                    <MapPin
                      size={21}
                      className="text-green-600"
                    />
                    Delivery Address
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Select where you want your order delivered.
                  </p>
                </div>

                <button
                  onClick={() =>
                    setShowAddressForm(!showAddressForm)
                  }
                  className="flex items-center gap-2 rounded-lg border border-green-600 px-4 py-2 text-sm font-semibold text-green-600 hover:bg-green-50"
                >
                  <Plus size={17} />
                  Add Address
                </button>

              </div>

              {/* Address Form */}

              {showAddressForm && (
                <form
                  onSubmit={handleAddAddress}
                  className="mt-6 rounded-xl border bg-gray-50 p-5"
                >

                  <h3 className="font-semibold text-gray-800">
                    Add New Address
                  </h3>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">

                    <input
                      name="fullName"
                      placeholder="Full Name"
                      value={addressForm.fullName}
                      onChange={handleAddressChange}
                      required
                      className="rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                    />

                    <input
                      name="mobile"
                      placeholder="Mobile Number"
                      value={addressForm.mobile}
                      onChange={handleAddressChange}
                      required
                      className="rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                    />

                    <input
                      name="house"
                      placeholder="House / Flat / Shop"
                      value={addressForm.house}
                      onChange={handleAddressChange}
                      required
                      className="rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                    />

                    <input
                      name="street"
                      placeholder="Street / Area"
                      value={addressForm.street}
                      onChange={handleAddressChange}
                      required
                      className="rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                    />

                    <input
                      name="city"
                      placeholder="City"
                      value={addressForm.city}
                      onChange={handleAddressChange}
                      required
                      className="rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                    />

                    <input
                      name="state"
                      placeholder="State"
                      value={addressForm.state}
                      onChange={handleAddressChange}
                      required
                      className="rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                    />

                    <input
                      name="pincode"
                      placeholder="Pincode"
                      value={addressForm.pincode}
                      onChange={handleAddressChange}
                      required
                      className="rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 sm:col-span-2"
                    />

                  </div>

                  <button
                    type="submit"
                    className="mt-5 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
                  >
                    Save Address
                  </button>

                </form>
              )}

              {/* Existing Addresses */}

              <div className="mt-6 space-y-4">

                {addresses.length === 0 ? (
                  <div className="rounded-xl border border-dashed p-8 text-center">
                    <MapPin
                      size={35}
                      className="mx-auto text-gray-400"
                    />

                    <p className="mt-3 font-medium text-gray-600">
                      No saved addresses
                    </p>

                    <p className="mt-1 text-sm text-gray-400">
                      Add an address to continue.
                    </p>
                  </div>
                ) : (
                  addresses.map((address) => (

                    <label
                      key={address.addressId}
                      className={`block cursor-pointer rounded-xl border p-5 transition ${
                        selectedAddress === address.addressId
                          ? "border-green-600 bg-green-50"
                          : "border-gray-200 hover:border-green-300"
                      }`}
                    >

                      <div className="flex gap-4">

                        <input
                          type="radio"
                          name="address"
                          checked={
                            selectedAddress ===
                            address.addressId
                          }
                          onChange={() =>
                            setSelectedAddress(
                              address.addressId
                            )
                          }
                          className="mt-1 h-4 w-4 accent-green-600"
                        />

                        <div>

                          <div className="flex items-center gap-3">

                            <h3 className="font-semibold text-gray-900">
                              {address.fullName}
                            </h3>

                            {address.isDefault && (
                              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                Default
                              </span>
                            )}

                          </div>

                          <p className="mt-2 text-sm text-gray-600">
                            {address.house},{" "}
                            {address.street}
                          </p>

                          <p className="text-sm text-gray-600">
                            {address.city},{" "}
                            {address.state} -{" "}
                            {address.pincode}
                          </p>

                          <p className="mt-1 text-sm text-gray-500">
                            Mobile: {address.mobile}
                          </p>

                        </div>

                      </div>

                    </label>

                  ))
                )}

              </div>

            </section>

            {/* Payment */}

            <section className="rounded-2xl border bg-white p-6 shadow-sm">

              <h2 className="flex items-center gap-2 text-xl font-bold">
                <CreditCard
                  size={21}
                  className="text-green-600"
                />
                Payment Method
              </h2>

              <div className="mt-5 space-y-3">

                <label
                  className={`flex cursor-pointer items-center gap-4 rounded-xl border p-5 ${
                    paymentMethod === "COD"
                      ? "border-green-600 bg-green-50"
                      : "border-gray-200"
                  }`}
                >

                  <input
                    type="radio"
                    name="payment"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={(e) =>
                      setPaymentMethod(e.target.value)
                    }
                    className="h-4 w-4 accent-green-600"
                  />

                  <div>
                    <p className="font-semibold text-gray-900">
                      Cash on Delivery
                    </p>

                    <p className="text-sm text-gray-500">
                      Pay when your order arrives.
                    </p>
                  </div>

                </label>

                <label
                  className={`flex cursor-pointer items-center gap-4 rounded-xl border p-5 ${
                    paymentMethod === "ONLINE"
                      ? "border-green-600 bg-green-50"
                      : "border-gray-200"
                  }`}
                >

                  <input
                    type="radio"
                    name="payment"
                    value="ONLINE"
                    checked={
                      paymentMethod === "ONLINE"
                    }
                    onChange={(e) =>
                      setPaymentMethod(e.target.value)
                    }
                    className="h-4 w-4 accent-green-600"
                  />

                  <div>
                    <p className="font-semibold text-gray-900">
                      Online Payment
                    </p>

                    <p className="text-sm text-gray-500">
                      Online payment integration can be added later.
                    </p>
                  </div>

                </label>

              </div>

            </section>

          </div>

          {/* Right: Summary */}

          <aside className="h-fit rounded-2xl border bg-white p-6 shadow-sm lg:sticky lg:top-24">

            <h2 className="text-xl font-bold text-gray-900">
              Order Summary
            </h2>

            <div className="mt-6 space-y-5">

              {cart.map((item) => (

                <div
                  key={item.cartId}
                  className="flex gap-4"
                >

                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">

                    <img
                      src={getImageUrl(item.imageUrl)}
                      alt={item.productName}
                      className="h-full w-full object-cover"
                    />

                  </div>

                  <div className="flex-1">

                    <p className="font-medium text-gray-900">
                      {item.productName}
                    </p>

                    <p className="text-sm text-gray-500">
                      {item.quantity} × ₹
                      {Number(item.price).toFixed(2)}
                    </p>

                  </div>

                  <p className="font-semibold text-gray-900">
                    ₹{Number(item.totalPrice).toFixed(2)}
                  </p>

                </div>

              ))}

            </div>

            <div className="my-6 border-t" />

            <div className="flex justify-between">

              <span className="text-lg font-semibold">
                Total
              </span>

              <span className="text-2xl font-bold text-green-600">
                ₹{grandTotal.toFixed(2)}
              </span>

            </div>

            <button
              type="button"
              onClick={handlePlaceOrder}
              disabled={
                placingOrder ||
                !selectedAddress ||
                cart.length === 0
              }
              className="mt-7 w-full rounded-xl bg-green-600 py-4 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {placingOrder
                ? "Placing Order..."
                : "Place Order"}
            </button>

            <p className="mt-4 text-center text-xs text-gray-500">
              Your order will be securely placed through AgriConnect.
            </p>

          </aside>

        </div>

      </main>

    </div>
  );
};

export default Checkout;