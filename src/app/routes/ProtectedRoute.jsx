// app/routes/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../../auth/AuthContext"

const ProtectedRoute = ({ allowed }) => {
  const { user } = useAuth()

  if (!user) return <Navigate to="/login" />
  if (!allowed.includes(user.role)) return <Navigate to="/login" />

  return <Outlet />
}

export default ProtectedRoute
