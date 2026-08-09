import { useState } from "react";
import { Eye, EyeOff, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { customerRegister } from "../services/customerAuthService";

const CustomerRegister = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await customerRegister(form);

      if (response.success) {
        setMessage(response.message || "Customer registered successfully.");

        setTimeout(() => {
          navigate("/customer/login");
        }, 1000);
      } else {
        setError(response.message || "Registration failed");
      }
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
        "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">

      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">

        <div className="flex justify-center mb-5">
          <div className="bg-green-100 p-4 rounded-full">
            <UserRound
              className="text-green-700"
              size={36}
            />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center">
          Become a Customer
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Create your AgriConnect customer account
        </p>

        {error && (
          <div className="bg-red-100 text-red-700 rounded-lg p-3 mb-5">
            {error}
          </div>
        )}

        {message && (
          <div className="bg-green-100 text-green-700 rounded-lg p-3 mb-5">
            {message}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >

          <div>
            <label className="block mb-2 font-medium">
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              required
              value={form.fullName}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Mobile
            </label>

            <input
              type="tel"
              name="mobile"
              required
              value={form.mobile}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={form.password}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 pr-12 outline-none focus:ring-2 focus:ring-green-600"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-3.5 right-4"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block mb-2 font-medium">
              Address
            </label>

            <input
              type="text"
              name="address"
              required
              value={form.address}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              City
            </label>

            <input
              type="text"
              name="city"
              required
              value={form.city}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              State
            </label>

            <input
              type="text"
              name="state"
              required
              value={form.state}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Pincode
            </label>

            <input
              type="text"
              name="pincode"
              required
              value={form.pincode}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div className="md:col-span-2 mt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-700 hover:bg-green-800 text-white rounded-lg py-3 font-semibold transition disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Create Customer Account"}
            </button>
          </div>

        </form>

        <p className="text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/customer/login")}
            className="text-green-700 font-semibold hover:underline"
          >
            Login
          </button>
        </p>

      </div>
    </div>
  );
};

export default CustomerRegister;
