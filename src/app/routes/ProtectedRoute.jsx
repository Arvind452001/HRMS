import { Navigate, Outlet } from "react-router-dom"

export default function ProtectedRoute({ allowed }) {
  const user = JSON.parse(localStorage.getItem("user"))

  // not logged in
  if (!user?.token) {
    return <Navigate to="/login" replace />
  }

  // role not allowed
  if (allowed && !allowed.includes(user.role)) {
    return <Navigate to="/login" replace />
    // or /unauthorized
  }

  return <Outlet />
}
