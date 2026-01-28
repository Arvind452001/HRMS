// app/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom"
import Login from "../../pages/Login"
import ProtectedRoute from "./ProtectedRoute"
import HRLayout from "../layouts/HRLayout"
import EmployeeLayout from "../layouts/EmployeeLayout"

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* HR */}
      <Route element={<ProtectedRoute allowed={["hr"]} />}>
        <Route path="/hr/*" element={<HRLayout />} />
      </Route>

      {/* Employee */}
      <Route element={<ProtectedRoute allowed={["employee"]} />}>
        <Route path="/employee/*" element={<EmployeeLayout />} />
      </Route>
    </Routes>
  )
}
