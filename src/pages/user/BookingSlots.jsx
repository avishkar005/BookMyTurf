import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Header from "../../components/user/dashboard/Header";
import Sidebar from "../../components/user/dashboard/Sidebar";
import Breadcrumb from "../../components/user/common/Breadcrumb";
import SlotCard from "../../components/user/turf/SlotCard";

import { clearSession, getSession } from "../../lib/auth";
import { listenTurfs } from "../../services/firestore";

export default function BookingSlots() {
  const navigate = useNavigate();
  const session = getSession();

  const { id, sportId } = useParams();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [turf, setTurf] = useState(null);
  const [sport, setSport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = listenTurfs((turfs) => {
      const selectedTurf = turfs.find(
        (item) =>
          String(item.id) === String(id) &&
          item.isActive !== false
      );

      if (!selectedTurf) {
        setTurf(null);
        setSport(null);
        setLoading(false);
        return;
      }

      setTurf(selectedTurf);

      const selectedSport = (selectedTurf.sports || []).find(
        (item) => String(item.id) === String(sportId)
      );

      setSport(selectedSport || null);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [id, sportId]);

  function handleLogout() {
    clearSession();
    navigate("/login");
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <h2 className="text-2xl font-semibold text-slate-700">
          Loading...
        </h2>
      </div>
    );
  }

  if (!turf || !sport) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="rounded-2xl bg-white p-10 shadow">
          <h2 className="text-2xl font-bold text-slate-800">
            Booking not found
          </h2>

          <button
            onClick={() => navigate("/user/discover")}
            className="mt-6 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white"
          >
            Back
          </button>
        </div>
      </div>
    );
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
                  label: "Discover",
                  path: "/user/discover",
                },
                {
                  label: turf.name,
                  path: `/user/turf/${turf.id}`,
                },
                {
                  label: sport.name,
                },
              ]}
            />
          </div>

          <div className="mt-8 rounded-3xl bg-white p-8 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div>
                <h1 className="text-3xl font-bold text-slate-800">
                  {sport.name}
                </h1>

                <p className="mt-2 text-slate-500">
                  {turf.name}
                </p>

                <p className="mt-1 text-slate-500">
                  {turf.address}
                </p>
              </div>

              <div className="rounded-xl bg-emerald-50 px-6 py-4">
                <p className="text-sm text-slate-500">
                  Price
                </p>

                <h2 className="text-3xl font-bold text-emerald-600">
                  ₹{Number(sport.price || 0)}
                </h2>

                <p className="text-sm text-slate-500">
                  per slot
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <SlotCard
              turf={turf}
              sport={sport}
              ownerId={turf.ownerId}
              user={session}
            />
          </div>
        </div>
      </main>
    </div>
  );
}