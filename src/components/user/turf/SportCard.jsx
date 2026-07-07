import { useNavigate } from "react-router-dom";

export default function SportCard({ turf, sport }) {
  const navigate = useNavigate();

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      <img
        src={sport.image || "/images/default-sport.jpg"}
        alt={sport.name}
        className="h-56 w-full object-cover"
      />

      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-800">
              {sport.name}
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              👥 {sport.capacity || 0} Players
            </p>
          </div>

          <div className="rounded-lg bg-emerald-100 px-4 py-2">
            <span className="text-lg font-bold text-emerald-700">
              ₹{sport.price}
            </span>
          </div>
        </div>

        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-700">
              Available Slots
            </h3>

            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              {sport.slots?.length || 0} Slots
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {(sport.slots || []).slice(0, 4).map((slot) => (
              <span
                key={slot}
                className="rounded-lg bg-slate-100 px-3 py-2 text-xs text-slate-700"
              >
                {slot}
              </span>
            ))}

            {(sport.slots || []).length > 4 && (
              <span className="rounded-lg bg-slate-100 px-3 py-2 text-xs text-slate-500">
                +{sport.slots.length - 4} More
              </span>
            )}
          </div>
        </div>

        <button
          onClick={() =>
            navigate(`/user/turf/${turf.id}/sport/${sport.id}`)
          }
          className="mt-8 w-full rounded-xl bg-emerald-600 py-3 font-semibold text-white transition hover:bg-emerald-700"
        >
          Book This Sport
        </button>
      </div>
    </div>
  );
}