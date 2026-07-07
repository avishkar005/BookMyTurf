import { Navigate, Route, Routes } from "react-router-dom";

import App from "./App";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import UserDashboard from "./pages/UserDashboard";
import OwnerDashboard from "./pages/owner/OwnerDashboard";

import DiscoverTurfs from "./pages/user/DiscoverTurfs";
import TurfDetails from "./pages/user/TurfDetails";
import BookingSlots from "./pages/user/BookingSlots";
import MyBookings from "./pages/user/MyBookings";
import NearbyTurfs from "./pages/user/NearbyTurfs";
import Profile from "./pages/user/Profile";
import MyActivity from "./pages/user/MyActivity";

import { getSession } from "./lib/auth";

function ProtectedRoute({ children, role }) {
  const session = getSession();

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  if (role && session.role !== role) {
    return (
      <Navigate
        to={session.role === "owner" ? "/owner-dashboard" : "/user-dashboard"}
        replace
      />
    );
  }

  return children;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}

      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* User */}

      <Route
        path="/user-dashboard"
        element={
          <ProtectedRoute role="user">
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user/discover"
        element={
          <ProtectedRoute role="user">
            <DiscoverTurfs />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user/discover/:city"
        element={
          <ProtectedRoute role="user">
            <DiscoverTurfs />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user/turf/:id"
        element={
          <ProtectedRoute role="user">
            <TurfDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user/turf/:id/sport/:sportId"
        element={
          <ProtectedRoute role="user">
            <BookingSlots />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user/bookings"
        element={
          <ProtectedRoute role="user">
            <MyBookings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user/nearby"
        element={
          <ProtectedRoute role="user">
            <NearbyTurfs />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user/activity"
        element={
          <ProtectedRoute role="user">
            <MyActivity />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user/profile"
        element={
          <ProtectedRoute role="user">
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* Owner */}

      <Route
        path="/owner-dashboard"
        element={
          <ProtectedRoute role="owner">
            <OwnerDashboard />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}