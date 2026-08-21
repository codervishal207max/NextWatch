import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isAuth = localStorage.getItem("nw_auth") === "true";
  if (!isAuth) return <Navigate to="/login" replace />;
  return children;
}

export default ProtectedRoute;
