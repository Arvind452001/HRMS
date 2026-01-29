// src/routes/Redirect.jsx
import { Navigate } from "react-router-dom";

const Redirect = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === "hr") {
    return <Navigate to="/hr/dashboard" replace />;
  }

  if (user.role === "employee") {
    return <Navigate to="/employee/dashboard" replace />;
  }

  return <Navigate to="/login" replace />;
};

export default Redirect;
