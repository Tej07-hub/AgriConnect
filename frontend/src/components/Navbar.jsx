import { Link } from "react-router-dom";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
];

function Navbar() {
  const handleAboutClick = () => {
    const footer = document.getElementById("about");

    if (footer) {
      footer.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <header className="w-full bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold tracking-tight text-green-700"
        >
          AgriConnect
        </Link>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-10">

          {navLinks.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="relative text-gray-700 font-medium transition duration-200 hover:text-green-600 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-green-600 after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.name}
            </Link>
          ))}

          {/* About */}
          <button
            type="button"
            onClick={handleAboutClick}
            className="relative text-gray-700 font-medium transition duration-200 hover:text-green-600 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-green-600 after:transition-all after:duration-300 hover:after:w-full"
          >
            About
          </button>

        </nav>

        {/* Right Buttons */}
        <div className="flex items-center gap-3">

          {/* Customer Login */}
          <Link
            to="/customer/login"
            className="rounded-xl border border-gray-300 px-5 py-2 font-medium text-gray-700 transition hover:border-green-600 hover:text-green-600"
          >
            Login
          </Link>

          {/* Retailer Login */}
          <Link
            to="/retailer/login"
            className="rounded-xl bg-green-600 px-5 py-2 font-medium text-white shadow-md transition hover:bg-green-700 hover:shadow-lg"
          >
            Register
          </Link>

        </div>

      </div>
    </header>
  );
}

export default Navbar;

