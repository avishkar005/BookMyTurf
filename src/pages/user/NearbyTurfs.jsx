import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/user/dashboard/Header";
import Sidebar from "../../components/user/dashboard/Sidebar";
import Breadcrumb from "../../components/user/common/Breadcrumb";
import TurfCard from "../../components/user/turf/TurfCard";

import turfs from "../../data/turfs";
import { clearSession, getSession } from "../../lib/auth";

export default function NearbyTurfs() {
  const navigate = useNavigate();
  const session = getSession();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  function handleLogout() {
    clearSession();
    navigate("/login");
  }

  const nearbyTurfs = useMemo(() => {
    return [...turfs]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 9);
  }, []);

  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar
        session={session}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={handleLogout}
      />

      <main>
        <div className="mx-auto max-w-7xl p-6">
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
                  label: "Nearby Turfs",
                },
              ]}
            />
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                Nearby Turfs
              </h1>

              <p className="mt-2 text-slate-500">
                Explore the highest rated sports venues near you.
              </p>
            </div>

            <button
              onClick={() => navigate("/user/discover")}
              className="rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
            >
              Discover All
            </button>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {nearbyTurfs.map((turf) => (
              <TurfCard
                key={turf.id}
                turf={turf}
              />
            ))}
          </div>

          {nearbyTurfs.length === 0 && (
            <div className="mt-10 rounded-2xl bg-white p-10 text-center shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-700">
                No nearby turfs found
              </h2>

              <p className="mt-3 text-slate-500">
                Try searching from another location.
              </p>

              <button
                onClick={() => navigate("/user/discover")}
                className="mt-6 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700"
              >
                Browse Turfs
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}