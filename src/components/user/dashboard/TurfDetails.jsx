import {
  ArrowLeft,
  MapPin,
  Phone,
  Star,
  Users,
} from "lucide-react"

export default function TurfDetails({
  turf,
  onBack,
  onSelectSport,
}) {
  if (!turf) return null

  return (
    <div className="space-y-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-slate-700 shadow transition hover:bg-slate-100"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <div className="overflow-hidden rounded-3xl bg-white shadow-md">
        <img
          src={turf.image}
          alt={turf.name}
          className="h-80 w-full object-cover"
        />

        <div className="p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-800">
                {turf.name}
              </h1>

              <div className="mt-3 flex items-center gap-2 text-slate-600">
                <MapPin size={18} />

                <span>
                  {turf.address}, {turf.city}
                </span>
              </div>

              <div className="mt-2 flex items-center gap-2 text-slate-600">
                <Phone size={18} />

                <span>{turf.phone}</span>
              </div>

              <div className="mt-2 text-slate-600">
                Owner :{" "}
                <span className="font-semibold">
                  {turf.owner}
                </span>
              </div>
            </div>

            <div className="rounded-2xl bg-yellow-100 px-5 py-4">
              <div className="flex items-center gap-2">
                <Star
                  size={20}
                  className="fill-yellow-500 text-yellow-500"
                />

                <span className="text-2xl font-bold text-yellow-700">
                  {turf.rating}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="mb-6 text-3xl font-bold text-slate-800">
              Available Sports
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              {turf.sports.map((sport) => (
                <div
                  key={sport.id}
                  className="rounded-2xl border border-slate-200 p-6 transition hover:border-emerald-500 hover:shadow-lg"
                >
                  <h3 className="text-2xl font-bold text-slate-800">
                    {sport.name}
                  </h3>

                  <div className="mt-4 flex items-center gap-2 text-slate-600">
                    <Users size={18} />

                    Capacity :
                    <span className="font-semibold">
                      {sport.capacity}
                    </span>
                  </div>

                  <div className="mt-3 text-lg font-semibold text-emerald-600">
                    ₹{sport.price} / hour
                  </div>

                  <button
                    onClick={() => onSelectSport(sport)}
                    className="mt-6 w-full rounded-xl bg-emerald-500 py-3 font-semibold text-white transition hover:bg-emerald-600"
                  >
                    View Available Slots
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}