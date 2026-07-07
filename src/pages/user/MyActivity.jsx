import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/user/dashboard/Header";
import Sidebar from "../../components/user/dashboard/Sidebar";
import Breadcrumb from "../../components/user/common/Breadcrumb";

import { clearSession, getSession } from "../../lib/auth";

export default function MyActivity() {
  const navigate = useNavigate();
  const session = getSession();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  function handleLogout() {
    clearSession();
    navigate("/login");
  }

  const activities = [
    {
      id: 1,
      title: "Booked Football Turf",
      description: "Green Arena, Pune",
      date: "25 June 2026 • 06:00 PM",
      status: "Completed",
    },
    {
      id: 2,
      title: "Viewed Turf",
      description: "Champion Box, Mumbai",
      date: "24 June 2026 • 08:20 PM",
      status: "Viewed",
    },
    {
      id: 3,
      title: "Booked Cricket Ground",
      description: "Elite Sports Club, Nagpur",
      date: "23 June 2026 • 10:30 AM",
      status: "Upcoming",
    },
    {
      id: 4,
      title: "Cancelled Booking",
      description: "Victory Sports Hub",
      date: "20 June 2026 • 04:15 PM",
      status: "Cancelled",
    },
  ];

  function statusColor(status) {
    switch (status) {
      case "Completed":
        return "bg-emerald-100 text-emerald-700";
      case "Upcoming":
        return "bg-blue-100 text-blue-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar
        session={session}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={handleLogout}
      />

      <main>
        <div className="mx-auto max-w-6xl p-6">
          <Header
            session={session}
            onMenuClick={() => setSidebarOpen(true)}
          />

          <div className="mt-6">
            <Breadcrumb
              items={[
                {
                  label: "Dashboard",
                  path: "/user-dashboard",
                },
                {
                  label: "My Activity",
                },
              ]}
            />
          </div>

          <div className="mt-8">
            <h1 className="text-3xl font-bold text-slate-800">
              My Activity
            </h1>

            <p className="mt-2 text-slate-500">
              Track your recent bookings and activity.
            </p>
          </div>

          <div className="mt-8 space-y-5">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-800">
                      {activity.title}
                    </h2>

                    <p className="mt-2 text-slate-500">
                      {activity.description}
                    </p>

                    <p className="mt-2 text-sm text-slate-400">
                      {activity.date}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-4 py-2 text-sm font-semibold ${statusColor(
                      activity.status
                    )}`}
                  >
                    {activity.status}
                  </span>
                </div>
              </div>
            ))}

            {activities.length === 0 && (
              <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
                <h2 className="text-2xl font-semibold text-slate-700">
                  No activity found
                </h2>

                <button
                  onClick={() => navigate("/user/discover")}
                  className="mt-6 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700"
                >
                  Explore Turfs
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}