import { useNavigate } from "react-router-dom";

export default function TurfCard({ turf }) {
  const navigate = useNavigate();

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      <img
        src={
          turf.images?.[0] ||
          turf.image ||
          "/images/default-turf.jpg"
        }
        alt={turf.name}
        className="h-56 w-full object-cover"
      />

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-slate-800">
              {turf.name}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {turf.address}
            </p>

            <p className="text-sm text-slate-500">
              {turf.city}
            </p>

            <p className="mt-2 text-sm text-slate-600">
              Owner : {turf.ownerName || turf.owner || "-"}
            </p>

            <p className="text-sm text-slate-600">
              Contact : {turf.ownerPhone || turf.phone || "-"}
            </p>
          </div>

          <div className="rounded-lg bg-emerald-100 px-3 py-2">
            <span className="font-semibold text-emerald-700">
              {Number(turf.rating || 0).toFixed(1)}
            </span>
          </div>
        </div>

        <div className="mt-5">
          <p className="mb-2 text-sm font-semibold text-slate-700">
            Available Sports
          </p>

          <div className="flex flex-wrap gap-2">
            {(turf.sports || []).map((sport) => (
              <span
                key={sport.id}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
              >
                {sport.name}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500">
              Starting From
            </p>

            <p className="text-xl font-bold text-emerald-600">
              ₹
              {turf.sports?.length
                ? Math.min(...turf.sports.map((sport) => Number(sport.price)))
                : 0}
            </p>
          </div>

          <button
            onClick={() => navigate(`/user/turf/${turf.id}`)}
            className="rounded-xl bg-emerald-600 px-5 py-2.5 font-medium text-white transition hover:bg-emerald-700"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}