import { useEffect } from "react";
import { useState } from "react";
import { Eye, EyeOff, Store } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { retailerLogin } from "../../services/authService";
import { saveRetailerLogin } from "../../utils/auth";


const RetailerLogin = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
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
  setLoading(true);

  try {
    const response = await retailerLogin(
      form.email,
      form.password
    );

    if (response.success) {
      localStorage.setItem("retailerToken", response.token);
      localStorage.setItem("retailerId", response.retailerId);

      navigate("/retailer/dashboard", { replace: true });
    } else {
      setError(response.message);
    }
  } catch (err) {
    setError(
      err.response?.data?.message ||
      "Login failed"
    );
  } finally {
    setLoading(false);
  }
};

//useEffect(() => {
 // const token = localStorage.getItem("retailerToken");

 // if (token) {
 //   navigate("/retailer/dashboard", { replace: true });
  //}
//}, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50 flex items-center justify-center p-6">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full">
            <Store className="text-green-700" size={36} />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center">
          Retailer Login
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Welcome back to AgriConnect
        </p>

        {error && (
          <div className="bg-red-100 text-red-700 rounded-lg p-3 mb-5">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

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
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-600 outline-none"
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
                className="w-full border rounded-lg p-3 pr-12 focus:ring-2 focus:ring-green-600 outline-none"
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

          <button
            disabled={loading}
            className="w-full bg-green-700 hover:bg-green-800 text-white rounded-lg py-3 font-semibold transition disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Login"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default RetailerLogin;