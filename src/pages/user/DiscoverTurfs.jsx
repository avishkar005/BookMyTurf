import { useEffect, useMemo, useState } from "react";
import {
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

import Header from "../../components/user/dashboard/Header";
import Sidebar from "../../components/user/dashboard/Sidebar";
import Breadcrumb from "../../components/user/common/Breadcrumb";
import TurfCard from "../../components/user/turf/TurfCard";

import { clearSession, getSession } from "../../lib/auth";
import { listenTurfs } from "../../services/firestore";

export default function DiscoverTurfs() {
  const navigate = useNavigate();
  const session = getSession();
  const { city } = useParams();
  const [searchParams] = useSearchParams();
  const selectedSport = searchParams.get("sport");

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [turfs, setTurfs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = listenTurfs((data) => {
      setTurfs(
        data.filter((turf) => turf.isActive !== false)
      );
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredTurfs = useMemo(() => {
    let result = [...turfs];

    result.sort((a, b) => {
      const aTime = a.createdAt?.seconds || 0;
      const bTime = b.createdAt?.seconds || 0;
      return bTime - aTime;
    });

    if (city) {
      result = result.filter(
        (turf) =>
          (turf.city || "").toLowerCase().trim() ===
          decodeURIComponent(city).toLowerCase().trim()
      );
    }

    if (selectedSport) {
      result = result.filter((turf) =>
        (turf.sports || []).some(
          (sport) =>
            sport.name?.toLowerCase() ===
            selectedSport.toLowerCase()
        )
      );
    }

    return result;
  }, [turfs, city, selectedSport]);

  function handleLogout() {
    clearSession();
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar
        session={session}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={handleLogout}
      />

      <main className="min-h-screen">
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
                ...(city
                  ? [
                      {
                        label: decodeURIComponent(city),
                      },
                    ]
                  : []),
              ]}
            />
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                {selectedSport
                  ? `${selectedSport} Turfs`
                  : city
                  ? `${decodeURIComponent(city)} Turfs`
                  : "Discover Turfs"}
              </h1>

              <p className="mt-2 text-slate-500">
                {filteredTurfs.length} turf
                {filteredTurfs.length !== 1 ? "s" : ""} available
              </p>
            </div>

            <button
              onClick={() => navigate("/user-dashboard")}
              className="rounded-xl border border-slate-300 px-5 py-3 font-medium hover:bg-slate-100"
            >
              Back
            </button>
          </div>

          {loading ? (
            <div className="mt-10 rounded-2xl bg-white p-10 text-center shadow-sm">
              <h2 className="text-xl font-semibold text-slate-700">
                Loading Turfs...
              </h2>
            </div>
          ) : filteredTurfs.length === 0 ? (
            <div className="mt-10 rounded-2xl bg-white p-10 text-center shadow-sm">
              <h2 className="text-xl font-semibold text-slate-700">
                No turfs found
              </h2>

              <p className="mt-3 text-slate-500">
                Try selecting another location.
              </p>
            </div>
          ) : (
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredTurfs.map((turf) => (
                <TurfCard
                  key={turf.id}
                  turf={turf}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}