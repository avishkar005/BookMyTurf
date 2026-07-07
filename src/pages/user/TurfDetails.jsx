import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Header from "../../components/user/dashboard/Header";
import Sidebar from "../../components/user/dashboard/Sidebar";
import Breadcrumb from "../../components/user/common/Breadcrumb";
import SportCard from "../../components/user/turf/SportCard";

import { clearSession, getSession } from "../../lib/auth";
import { listenTurfs } from "../../services/firestore";

export default function TurfDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const session = getSession();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [turf, setTurf] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = listenTurfs((data) => {
      const selected = data.find(
        (item) =>
          String(item.id) === String(id) &&
          item.isActive !== false
      );

      setTurf(selected || null);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [id]);

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

  if (!turf) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="rounded-2xl bg-white p-10 shadow">
          <h2 className="text-2xl font-bold">
            Turf not found
          </h2>

          <button
            onClick={() => navigate("/user/discover")}
            className="mt-6 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white"
          >
            Back to Discover
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar
        session={session}
        onLogout={handleLogout}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
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
                },
              ]}
            />
          </div>

          <div className="mt-8 overflow-hidden rounded-3xl bg-white shadow">
            <img
              src={
                turf.images?.[0] ||
                turf.image ||
                "/images/default-turf.jpg"
              }
              alt={turf.name}
              className="h-[420px] w-full object-cover"
            />

            <div className="p-8">
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div>
                  <h1 className="text-3xl font-bold text-slate-800">
                    {turf.name}
                  </h1>

                  <p className="mt-3 text-slate-600">
                    {turf.address}
                  </p>

                  <p className="mt-1 text-slate-600">
                    {turf.city}
                  </p>
                </div>

                <div className="rounded-xl bg-emerald-50 px-6 py-4">
                  <p className="text-sm text-slate-500">
                    Rating
                  </p>

                  <h2 className="text-3xl font-bold text-emerald-600">
                    {Number(turf.rating || 0).toFixed(1)}
                  </h2>
                </div>
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-3">
                <div className="rounded-2xl border p-5">
                  <h3 className="font-semibold text-slate-800">
                    Owner
                  </h3>

                  <p className="mt-2 text-slate-600">
                    {turf.ownerName || turf.owner || "-"}
                  </p>
                </div>

                <div className="rounded-2xl border p-5">
                  <h3 className="font-semibold text-slate-800">
                    Contact
                  </h3>

                  <p className="mt-2 text-slate-600">
                    {turf.ownerPhone || turf.phone || "-"}
                  </p>
                </div>

                <div className="rounded-2xl border p-5">
                  <h3 className="font-semibold text-slate-800">
                    Sports
                  </h3>

                  <p className="mt-2 text-slate-600">
                    {turf.sports?.length || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <section className="mt-10">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-800">
                Available Sports
              </h2>

              <p className="mt-2 text-slate-500">
                Select a sport to continue booking.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {(turf.sports || []).map((sport) => (
                <SportCard
                  key={sport.id}
                  turf={turf}
                  sport={sport}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}