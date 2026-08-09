import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Store, UserPlus } from "lucide-react";

import API from "../../services/api";

function RetailerRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    transactionPassword: "",
    shopName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await API.post(
        "/retailers/register",
        form
      );

      if (response.data.success) {
        setSuccess(
          "Retailer registered successfully. Redirecting to login..."
        );

        setTimeout(() => {
          navigate("/retailer/login");
        }, 1500);
      } else {
        setError(
          response.data.message || "Registration failed."
        );
      }

    } catch (error) {
      console.error("Retailer registration error:", error);

      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError(
          "Unable to register retailer. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">

      <div className="w-full max-w-4xl">

        {/* Back */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 mb-6 transition"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">

          {/* Header */}
          <div className="bg-green-700 px-8 py-8 text-white">

            <div className="flex items-center gap-3">
              <div className="bg-white/10 rounded-xl p-3">
                <Store size={28} />
              </div>

              <div>
                <h1 className="text-3xl font-bold">
                  Become a Retailer
                </h1>

                <p className="mt-1 text-green-100">
                  Join the AgriConnect agricultural marketplace
                </p>
              </div>
            </div>

          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="p-8"
          >

            {/* Personal Information */}
            <div className="mb-8">

              <h2 className="text-xl font-bold text-gray-900">
                Personal Information
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Enter your basic contact information.
              </p>

              <div className="mt-5 grid gap-5 md:grid-cols-2">

                {/* Full Name */}
                <div>
                  <label className="font-medium text-gray-700">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="mt-2 w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                  />
                </div>

                {/* Mobile */}
                <div>
                  <label className="font-medium text-gray-700">
                    Mobile Number
                  </label>

                  <input
                    type="tel"
                    name="mobile"
                    value={form.mobile}
                    onChange={handleChange}
                    placeholder="Enter mobile number"
                    required
                    className="mt-2 w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                  />
                </div>

                {/* Email */}
                <div className="md:col-span-2">
                  <label className="font-medium text-gray-700">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="mt-2 w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                  />
                </div>

              </div>

            </div>


            {/* Shop Information */}
            <div className="mb-8">

              <h2 className="text-xl font-bold text-gray-900">
                Shop Information
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Provide details about your agricultural shop.
              </p>

              <div className="mt-5 grid gap-5 md:grid-cols-2">

                {/* Shop Name */}
                <div className="md:col-span-2">

                  <label className="font-medium text-gray-700">
                    Shop Name
                  </label>

                  <input
                    type="text"
                    name="shopName"
                    value={form.shopName}
                    onChange={handleChange}
                    placeholder="Enter shop name"
                    required
                    className="mt-2 w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                  />

                </div>

                {/* Address */}
                <div className="md:col-span-2">

                  <label className="font-medium text-gray-700">
                    Address
                  </label>

                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Enter complete shop address"
                    rows="3"
                    required
                    className="mt-2 w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                  />

                </div>

                {/* City */}
                <div>

                  <label className="font-medium text-gray-700">
                    City
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="City"
                    required
                    className="mt-2 w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                  />

                </div>

                {/* State */}
                <div>

                  <label className="font-medium text-gray-700">
                    State
                  </label>

                  <input
                    type="text"
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    placeholder="State"
                    required
                    className="mt-2 w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                  />

                </div>

                {/* Pincode */}
                <div>

                  <label className="font-medium text-gray-700">
                    Pincode
                  </label>

                  <input
                    type="text"
                    name="pincode"
                    value={form.pincode}
                    onChange={handleChange}
                    placeholder="Pincode"
                    required
                    className="mt-2 w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                  />

                </div>

              </div>

            </div>


            {/* Security */}
            <div className="mb-8">

              <h2 className="text-xl font-bold text-gray-900">
                Account Security
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Create your login and transaction passwords.
              </p>

              <div className="mt-5 grid gap-5 md:grid-cols-2">

                {/* Password */}
                <div>

                  <label className="font-medium text-gray-700">
                    Login Password
                  </label>

                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Create login password"
                    required
                    minLength={6}
                    className="mt-2 w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                  />

                  <p className="mt-1 text-xs text-gray-500">
                    Minimum 6 characters
                  </p>

                </div>

                {/* Transaction Password */}
                <div>

                  <label className="font-medium text-gray-700">
                    Transaction Password
                  </label>

                  <input
                    type="password"
                    name="transactionPassword"
                    value={form.transactionPassword}
                    onChange={handleChange}
                    placeholder="Create transaction password"
                    required
                    minLength={4}
                    className="mt-2 w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                  />

                  <p className="mt-1 text-xs text-gray-500">
                    Used for transaction verification
                  </p>

                </div>

              </div>

            </div>


            {/* Messages */}

            {error && (
              <div className="mb-5 rounded-xl bg-red-50 border border-red-200 p-4 text-red-700">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-5 rounded-xl bg-green-50 border border-green-200 p-4 text-green-700">
                {success}
              </div>
            )}


            {/* Submit */}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-green-600 py-4 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              <UserPlus size={20} />

              {loading
                ? "Creating Retailer Account..."
                : "Create Retailer Account"}
            </button>


            {/* Login */}

            <p className="mt-6 text-center text-gray-600">

              Already have a retailer account?{" "}

              <Link
                to="/retailer/login"
                className="font-semibold text-green-600 hover:text-green-700"
              >
                Login here
              </Link>

            </p>

          </form>

        </div>

      </div>

    </div>
  );
}

export default RetailerRegister;


