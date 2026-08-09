import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("retailerToken");

  if (!token) {
    return <Navigate to="/retailer/login" replace />;
  }

  return children;
};

export default ProtectedRoute;