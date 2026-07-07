import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listenTurfs } from "../../../services/firestore";

export default function DashboardWidgets() {
  const navigate = useNavigate();

  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);

  const sports = [
    { name: "Football", image: "/images/football.jpg" },
    { name: "Cricket", image: "/images/cricket.jpg" },
    { name: "Badminton", image: "/images/badminton.jpg" },
    { name: "Basketball", image: "/images/basketball.jpg" },
    { name: "Volleyball", image: "/images/volleyball.jpg" },
    { name: "Box Cricket", image: "/images/cricket.jpg" },
    { name: "Snooker", image: "/images/snooker.jpg" },
  ];

  useEffect(() => {
    const unsubscribe = listenTurfs((data) => {
      const activeTurfs = data.filter((turf) => turf.isActive !== false);

      setRecommended(activeTurfs.slice(0, 6));
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="space-y-10">
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-800">
            Popular Sports
          </h2>

          <button
            onClick={() => navigate("/user/discover")}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            View All
          </button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {sports.map((sport) => (
            <div
              key={sport.name}
              onClick={() =>
                navigate(`/user/discover?sport=${encodeURIComponent(sport.name)}`)
              }
              className="cursor-pointer overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <img
                src={sport.image}
                alt={sport.name}
                className="h-52 w-full object-cover"
              />

              <div className="p-5">
                <h3 className="text-lg font-semibold text-slate-800">
                  {sport.name}
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Find nearby {sport.name.toLowerCase()} turfs
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-800">
            Recommended Turfs
          </h2>

          <button
            onClick={() => navigate("/user/discover")}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-slate-100"
          >
            Browse All
          </button>
        </div>

        {loading ? (
          <div className="rounded-2xl bg-white p-10 text-center text-slate-400">
            Loading Turfs...
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {recommended.map((turf) => (
              <div
                key={turf.id}
                onClick={() => navigate(`/user/turf/${turf.id}`)}
                className="cursor-pointer overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <img
                  src={turf.images?.[0] || "/images/default-turf.jpg"}
                  alt={turf.name}
                  className="h-56 w-full object-cover"
                />

                <div className="space-y-3 p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-800">
                      {turf.name}
                    </h3>

                    <span className="rounded bg-emerald-100 px-2 py-1 text-sm font-medium text-emerald-700">
                      {Number(turf.rating || 0).toFixed(1)}
                    </span>
                  </div>

                  <p className="text-sm text-slate-500">
                    {turf.address}
                  </p>

                  <p className="text-sm text-slate-500">
                    {turf.city}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {(turf.sports || []).slice(0, 3).map((sport) => (
                      <span
                        key={sport.id}
                        className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium"
                      >
                        {sport.name}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/user/turf/${turf.id}`);
                    }}
                    className="mt-2 w-full rounded-xl bg-emerald-600 py-3 font-semibold text-white hover:bg-emerald-700"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}