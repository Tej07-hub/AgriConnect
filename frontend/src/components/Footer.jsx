import { Mail, MapPin, Phone } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

function Footer() {
  return (
    <footer
      id="about"
      className="bg-gray-950 text-gray-300 py-16"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold text-white">
              AgriConnect
            </h2>

            <p className="mt-5 leading-7 text-gray-400">
              Connecting farmers, retailers, and customers through
              a modern digital agriculture marketplace.
            </p>

            {/* Social Media */}
            <div className="mt-6 flex gap-4">

              <button
                type="button"
                className="rounded-full bg-gray-800 p-3 transition hover:bg-green-600"
              >
                <FaFacebookF size={18} />
              </button>

              <button
                type="button"
                className="rounded-full bg-gray-800 p-3 transition hover:bg-green-600"
              >
                <FaInstagram size={18} />
              </button>

              <button
                type="button"
                className="rounded-full bg-gray-800 p-3 transition hover:bg-green-600"
              >
                <FaLinkedinIn size={18} />
              </button>

            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white">
              Quick Links
            </h3>

            <ul className="mt-6 space-y-4">

              <li>
                <a
                  href="/"
                  className="hover:text-green-500 transition"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="/customer/login"
                  className="hover:text-green-500 transition"
                >
                  Products
                </a>
              </li>

              <li>
                <a
                  href="/categories"
                  className="hover:text-green-500 transition"
                >
                  Categories
                </a>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => {
                    document.getElementById("about")?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                  className="hover:text-green-500 transition"
                >
                  About
                </button>
              </li>

            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-white">
              Services
            </h3>

            <ul className="mt-6 space-y-4">
              <li>Retail Marketplace</li>
              <li>Order Management</li>
              <li>Inventory Tracking</li>
              <li>Secure Payments</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white">
              Contact
            </h3>

            <div className="mt-6 space-y-5">

              <div className="flex gap-3">
                <MapPin
                  className="mt-1 text-green-500"
                  size={18}
                />

                <span>
                  Nashik, Maharashtra
                </span>
              </div>

              <div className="flex gap-3">
                <Phone
                  className="mt-1 text-green-500"
                  size={18}
                />

                <span>
                  +91 XXXXX XXXXX
                </span>
              </div>

              <div className="flex gap-3">
                <Mail
                  className="mt-1 text-green-500"
                  size={18}
                />

                <span>
                  support@agriconnect.com
                </span>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-14 border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          © 2026 AgriConnect. All rights reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;

