import { Navigate, Route, Routes } from 'react-router-dom'
import App from './App'
import Login from './pages/Login'
import Signup from './pages/Signup'
import UserDashboard from './pages/UserDashboard'
import OwnerDashboard from './pages/owner/OwnerDashboard'
import { getSession } from './lib/auth'

function ProtectedRoute({ children, role }) {
  const session = getSession()

  if (!session) {
    return <Navigate to="/login" replace />
  }

  if (role && session.role !== role) {
    return (
      <Navigate
        to={session.role === 'owner' ? '/owner-dashboard' : '/user-dashboard'}
        replace
      />
    )
  }

  return children
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/user-dashboard"
        element={
          <ProtectedRoute role="user">
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/owner-dashboard"
        element={
          <ProtectedRoute role="owner">
            <OwnerDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

