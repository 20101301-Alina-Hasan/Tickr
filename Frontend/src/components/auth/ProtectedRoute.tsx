import { Navigate, Outlet } from "react-router-dom"

export const ProtectedRoute = () => {
    const token = localStorage.getItem("access")

    return token ? <Outlet /> : <Navigate to="/login" replace />
}
