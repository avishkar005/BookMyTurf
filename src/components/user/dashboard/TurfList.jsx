import { MapPin, Star } from "lucide-react"

export default function TurfList({
  turfs,
  onSelectTurf,
}) {
  if (!turfs.length) {
    return (
      <div className="rounded-3xl bg-white p-12 text-center shadow-sm">
        <h2 className="text-2xl font-bold text-slate-700">
          No Turfs Found
        </h2>

        <p className="mt-3 text-slate-500">
          Search using a city or turf name.
        </p>
      </div>
    )
  }

  return (
    <div className="mt-10">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-slate-800">
          Nearby Turfs
        </h2>

        <p className="text-slate-500">
          {turfs.length} Turf{turfs.length > 1 ? "s" : ""} Found
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {turfs.map((turf) => (
          <div
            key={turf.id}
            className="overflow-hidden rounded-3xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
          >
            <img
              src={turf.image}
              alt={turf.name}
              className="h-56 w-full object-cover"
            />

            <div className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-slate-800">
                  {turf.name}
                </h3>

                <div className="flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
                  <Star
                    size={15}
                    fill="currentColor"
                  />
                  {turf.rating}
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-slate-600">
                <MapPin size={17} />

                <span>
                  {turf.address}, {turf.city}
                </span>
              </div>

              <div className="mt-5">
                <h4 className="mb-2 font-semibold text-slate-700">
                  Sports Available
                </h4>

                <div className="flex flex-wrap gap-2">
                  {turf.sports.map((sport) => (
                    <span
                      key={sport.id}
                      className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700"
                    >
                      {sport.name}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onSelectTurf(turf)}
                className="mt-6 w-full rounded-xl bg-emerald-500 py-3 text-base font-semibold text-white transition hover:bg-emerald-600"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}