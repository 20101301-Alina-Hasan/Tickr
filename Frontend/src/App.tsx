import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { Login, Signup, Dashboard } from './pages'
import { ProtectedRoute } from './components/auth/ProtectedRoute'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App