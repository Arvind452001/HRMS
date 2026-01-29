import { Navigate, Outlet } from "react-router-dom"

export default function PublicRoute() {
  const user = JSON.parse(localStorage.getItem("user"))

  // already logged in → redirect by role
  if (user?.token) {
    return <Navigate to={`/${user.role}`} replace />
  }

  return <Outlet />
}
