import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Launch from "../assets/Launch.png";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-slate-50">

      {/* Background Glow */}
      <div className="absolute right-0 top-10 h-[500px] w-[500px] rounded-full bg-green-100/60 blur-3xl" />

      <div className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl flex-col items-center justify-between gap-16 px-6 py-20 lg:flex-row">

        {/* Left */}
        <div className="max-w-2xl">

          <span className="inline-flex rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
            Agriculture Marketplace
          </span>

          <h1 className="mt-8 text-5xl font-extrabold leading-tight tracking-tight text-gray-900 lg:text-7xl">
            Empowering Agriculture
            <br />
            Through{" "}
            <span className="text-green-600">
              Digital Innovation
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-gray-600">
            AgriConnect connects farmers, retailers, and customers through one
            secure platform, making agricultural commerce faster, simpler,
            and more accessible.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap gap-4">

            {/* Explore Products */}
            <button
              type="button"
              onClick={() => navigate("/products")}
              className="flex items-center gap-2 rounded-xl bg-green-600 px-7 py-4 font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-green-700"
            >
              Explore Products
              <ArrowRight size={18} />
            </button>

            {/* Become a Retailer */}
            <button
              type="button"
              onClick={() => navigate("/retailer/register")}
              className="rounded-xl border border-gray-300 bg-white px-7 py-4 font-semibold text-gray-700 transition duration-300 hover:border-green-600 hover:text-green-600"
            >
              Become a Retailer
            </button>

          </div>

          {/* Supporting Text */}
          <div className="mt-10 border-l-4 border-green-600 pl-5">
            <p className="text-gray-600">
              Built for farmers, retailers, and customers with a modern,
              secure, and scalable marketplace experience.
            </p>
          </div>

        </div>

        {/* Right */}
        <div className="flex w-full justify-center lg:w-[45%]">

          <div className="flex h-[520px] w-full max-w-[520px] items-center justify-center rounded-[32px] border border-gray-200 bg-white shadow-xl">

           <img
              src={Launch}
              alt="Agriculture Illustration"
              className="w-[85%]"
            />

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;

