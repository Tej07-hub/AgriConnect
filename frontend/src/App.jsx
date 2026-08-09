import { Routes, Route, Navigate } from "react-router-dom";

// =========================
// AUTH
// =========================

import RetailerLogin from "./pages/auth/RetailerLogin";
import RetailerRegister from "./pages/auth/RetailerRegister";
import CustomerLogin from "./pages/auth/CustomerLogin";

// =========================
// RETAILER
// =========================

import Dashboard from "./pages/retailer/Dashboard";
import DashboardHome from "./pages/retailer/DashboardHome";
import AddProduct from "./pages/retailer/AddProduct";
import MyProducts from "./pages/retailer/MyProducts";
import EditProduct from "./pages/retailer/EditProduct";
import RetailerOrders from "./pages/retailer/RetailerOrders";
import RetailerOrderDetails from "./pages/retailer/RetailerOrderDetails";

// =========================
// CUSTOMER
// =========================

import CustomerHome from "./pages/customer/CustomerHome";
import Cart from "./pages/customer/Cart";
import Checkout from "./pages/customer/Checkout";
import Orders from "./pages/customer/Orders";
import OrderDetails from "./pages/customer/OrderDetails";

// =========================
// COMMON
// =========================

import Home from "./pages/Home";
import Products from "./components/Products";

// =========================
// PROTECTED ROUTES
// =========================

import ProtectedRoute from "./components/auth/ProtectedRoute";
import CustomerProtectedRoute from "./components/auth/CustomerProtectedRoute";


function App() {
  return (
    <Routes>

      {/* =====================================================
          COMMON HOME PAGE
      ===================================================== */}

      <Route
        path="/"
        element={<Home />}
      />


      {/* =====================================================
          PUBLIC PRODUCTS PAGE
      ===================================================== */}

      <Route
        path="/products"
        element={<Products />}
      />


      {/* =====================================================
          CUSTOMER AUTH
      ===================================================== */}

      <Route
        path="/customer/login"
        element={<CustomerLogin />}
      />


      {/* =====================================================
          CUSTOMER HOME
      ===================================================== */}

      <Route
        path="/customer/home"
        element={
          <CustomerProtectedRoute>
            <CustomerHome />
          </CustomerProtectedRoute>
        }
      />


      {/* =====================================================
          CUSTOMER CART
      ===================================================== */}

      <Route
        path="/customer/cart"
        element={
          <CustomerProtectedRoute>
            <Cart />
          </CustomerProtectedRoute>
        }
      />


      {/* =====================================================
          CUSTOMER CHECKOUT
      ===================================================== */}

      <Route
        path="/customer/checkout"
        element={
          <CustomerProtectedRoute>
            <Checkout />
          </CustomerProtectedRoute>
        }
      />


      {/* =====================================================
          CUSTOMER ORDERS
      ===================================================== */}

      <Route
        path="/customer/orders"
        element={
          <CustomerProtectedRoute>
            <Orders />
          </CustomerProtectedRoute>
        }
      />


      {/* =====================================================
          CUSTOMER ORDER DETAILS
      ===================================================== */}

      <Route
        path="/customer/orders/:orderId"
        element={
          <CustomerProtectedRoute>
            <OrderDetails />
          </CustomerProtectedRoute>
        }
      />


      {/* =====================================================
          RETAILER REGISTER
      ===================================================== */}

      <Route
        path="/retailer/register"
        element={<RetailerRegister />}
      />


      {/* =====================================================
          RETAILER LOGIN
      ===================================================== */}

      <Route
        path="/retailer/login"
        element={<RetailerLogin />}
      />


      {/* =====================================================
          RETAILER DASHBOARD
      ===================================================== */}

      <Route
        path="/retailer/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      >

        {/* Dashboard Home */}

        <Route
          index
          element={<DashboardHome />}
        />

        {/* Add Product */}

        <Route
          path="add-product"
          element={<AddProduct />}
        />

        {/* My Products */}

        <Route
          path="products"
          element={<MyProducts />}
        />

        {/* Edit Product */}

        <Route
          path="edit-product/:id"
          element={<EditProduct />}
        />

      </Route>


      {/* =====================================================
          RETAILER ORDERS
      ===================================================== */}

      <Route
        path="/retailer/orders"
        element={
          <ProtectedRoute>
            <RetailerOrders />
          </ProtectedRoute>
        }
      />


      {/* =====================================================
          RETAILER ORDER DETAILS
      ===================================================== */}

      <Route
        path="/retailer/orders/:orderId"
        element={
          <ProtectedRoute>
            <RetailerOrderDetails />
          </ProtectedRoute>
        }
      />


      {/* =====================================================
          FALLBACK
      ===================================================== */}

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />

    </Routes>
  );
}

export default App;

