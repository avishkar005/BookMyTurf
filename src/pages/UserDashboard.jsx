import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { clearSession, getSession } from "../lib/auth";

import Sidebar from "../components/user/dashboard/Sidebar";
import Header from "../components/user/dashboard/Header";
import Hero from "../components/user/dashboard/Hero";
import DashboardWidgets from "../components/user/dashboard/DashboardWidgets";

import {
  getUserBookings,
  listenTurfs,
} from "../services/firestore";

export default function UserDashboard() {
  const navigate = useNavigate();
  const session = getSession();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [turfs, setTurfs] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  function handleLogout() {
    clearSession();
    navigate("/login", { replace: true });
  }

  useEffect(() => {
    if (!session?.uid) return;

    async function loadBookings() {
      const data = await getUserBookings(session.uid);
      setBookings(data);
    }

    loadBookings();

    const unsubscribe = listenTurfs((data) => {
      setTurfs(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [session]);

  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar
        session={session}
        onLogout={handleLogout}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="min-h-screen">
        <div className="mx-auto max-w-7xl p-6">
          <Header
            session={session}
            onMenuClick={() => setSidebarOpen(true)}
          />

          <div className="mt-6">
            <Hero
              session={session}
            />
          </div>

          <div className="mt-8">
            <DashboardWidgets
              turfs={turfs}
              bookings={bookings}
              loading={loading}
            />
          </div>
        </div>
      </main>
    </div>
  );
}