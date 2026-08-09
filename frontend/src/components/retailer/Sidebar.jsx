import {
  LayoutDashboard,
  PlusSquare,
  Package,
  LogOut,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { logoutRetailer } from "../../utils/auth";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutRetailer();
    navigate("/retailer/login", { replace: true });
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/retailer/dashboard",
    },
    {
      title: "Add Product",
      icon: PlusSquare,
      path: "/retailer/dashboard/add-product",
    },
    {
      title: "My Products",
      icon: Package,
      path: "/retailer/dashboard/products",
    },
  ];

  return (
    <aside className="w-64 bg-white border-r shadow-sm flex flex-col">
      {/* Logo */}
      <div className="h-20 flex items-center justify-center border-b">
        <h1 className="text-2xl font-bold text-green-700">
          AgriConnect
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/retailer/dashboard"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-green-600 text-white"
                    : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                }`
              }
            >
              <Icon size={20} />
              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t p-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-red-500 px-4 py-3 text-white hover:bg-red-600 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

