import { CalendarDays, Clock, Users } from "lucide-react"

export default function SlotCard({
  turf,
  sport,
  onBack,
}) {
  if (!turf || !sport) return null

  function handleBook(slot) {
    const message = encodeURIComponent(
      `Hello ${turf.owner},

I would like to book a slot.

🏟 Turf: ${turf.name}
🏏 Sport: ${sport.name}
📅 Slot: ${slot}
💰 Price: ₹${sport.price}/hour

Please confirm the booking.`
    )

    window.open(
      `https://wa.me/${turf.phone}?text=${message}`,
      "_blank"
    )
  }

  return (
    <div className="space-y-8">
      <button
        onClick={onBack}
        className="rounded-xl bg-white px-5 py-3 font-semibold text-slate-700 shadow transition hover:bg-slate-100"
      >
        ← Back to Sports
      </button>

      <div className="rounded-3xl bg-white p-8 shadow-md">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-800">
              {sport.name}
            </h1>

            <p className="mt-2 text-slate-500">
              {turf.name}
            </p>
          </div>

          <div className="rounded-2xl bg-emerald-100 px-6 py-4">
            <h2 className="text-3xl font-bold text-emerald-700">
              ₹{sport.price}
            </h2>

            <p className="text-sm text-slate-600">
              Per Hour
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 p-5">
            <div className="flex items-center gap-3">
              <Users className="text-emerald-600" />

              <div>
                <h3 className="font-semibold text-slate-800">
                  Capacity
                </h3>

                <p className="text-slate-500">
                  {sport.capacity}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 p-5">
            <div className="flex items-center gap-3">
              <CalendarDays className="text-emerald-600" />

              <div>
                <h3 className="font-semibold text-slate-800">
                  Available Slots
                </h3>

                <p className="text-slate-500">
                  {sport.slots.length} Slots
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="mb-6 text-3xl font-bold text-slate-800">
            Available Time Slots
          </h2>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {sport.slots.map((slot) => (
              <div
                key={slot}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-emerald-500 hover:bg-white hover:shadow-lg"
              >
                <div className="flex items-center gap-2 text-emerald-600">
                  <Clock size={18} />

                  <span className="font-semibold">
                    {slot}
                  </span>
                </div>

                <div className="mt-4 space-y-2 text-sm text-slate-600">
                  <p>
                    <strong>Price:</strong> ₹{sport.price}/hour
                  </p>

                  <p>
                    <strong>Capacity:</strong> {sport.capacity}
                  </p>

                  <p className="font-semibold text-green-600">
                    ● Available
                  </p>
                </div>

                <button
                  onClick={() => handleBook(slot)}
                  className="mt-5 w-full rounded-xl bg-emerald-500 py-3 font-semibold text-white transition hover:bg-emerald-600"
                >
                  Book on WhatsApp
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}