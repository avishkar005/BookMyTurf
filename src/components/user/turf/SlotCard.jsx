import { useState } from "react";
import { getSession } from "../../../lib/auth";
import { createBooking } from "../../../services/firestore";

export default function SlotCard({ turf, sport }) {
  const [selectedSlot, setSelectedSlot] = useState("");

  const session = getSession();

  const [showForm, setShowForm] = useState(false);

  const [loading, setLoading] = useState(false);

  const [bookingSaved, setBookingSaved] = useState(false);

  const [form, setForm] = useState({
    name: session?.name || "",
    phone: "",
    players: "",
    bookingDate: "",
    note: "",
  });

  function openBookingForm() {
    if (!selectedSlot) {
      alert("Please select a slot.");
      return;
    }

    setShowForm(true);
  }

  async function submitBooking() {
    if (loading) return;

    if (
      !form.name ||
      !form.phone ||
      !form.players ||
      !form.bookingDate
    ) {
      alert("Please fill all required details.");
      return;
    }

    setLoading(true);

    await createBooking({
      bookingId: Date.now().toString(),

      userId: session.uid,

      ownerId: turf.ownerId,

      ownerName: turf.ownerName,

      ownerPhone: turf.ownerPhone,

      turfId: turf.id,

      turfName: turf.name,

      turfImage: turf.images?.[0] || "",

      turfAddress: turf.address,

      turfCity: turf.city,

      rating: turf.rating,

      sportId: sport.id,

      sportName: sport.name,

      slot: selectedSlot,

      bookingDate: form.bookingDate,

      customerName: form.name,

      customerPhone: form.phone,

      customerEmail: session.email,

      players: Number(form.players),

      note: form.note,

      price: sport.price,

      status: "Pending",

      paymentStatus: "Pending",

      createdAt: new Date().toISOString(),

      updatedAt: new Date().toISOString(),
    });

    setLoading(false);

    setBookingSaved(true);

    setShowForm(false);

    setSelectedSlot("");

    setForm({
      name: session?.name || "",
      phone: "",
      players: "",
      bookingDate: "",
      note: "",
    });
  }

  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Select Booking Slot
          </h2>

          <p className="mt-2 text-slate-500">
            {turf.name} • {sport.name}
          </p>
        </div>

        <div className="rounded-xl bg-emerald-50 px-5 py-4">
          <p className="text-sm text-slate-500">
            Booking Price
          </p>

          <h3 className="text-3xl font-bold text-emerald-600">
            ₹{Number(sport.price || 0)}
          </h3>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="mb-4 text-lg font-semibold text-slate-800">
          Available Time Slots
        </h3>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(sport.slots || []).map((slot) => (
            <button
              key={slot}
              onClick={() => setSelectedSlot(slot)}
              className={`rounded-xl border px-5 py-4 text-center font-medium transition ${
                selectedSlot === slot
                  ? "border-emerald-600 bg-emerald-600 text-white"
                  : "border-slate-300 bg-white text-slate-700 hover:border-emerald-500 hover:bg-emerald-50"
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      {selectedSlot && (
        <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
          <h3 className="text-lg font-semibold text-slate-800">
            Booking Summary
          </h3>

          <div className="mt-4 space-y-2 text-slate-600">
            <p>
              <strong>Turf:</strong> {turf.name}
            </p>

            <p>
              <strong>Sport:</strong> {sport.name}
            </p>

            <p>
              <strong>Slot:</strong> {selectedSlot}
            </p>

            <p>
              <strong>Amount:</strong> ₹{Number(sport.price || 0)}
            </p>
          </div>
        </div>
      )}

      {showForm && !bookingSaved && (
        <div className="mt-8 rounded-2xl border p-6">
          <h3 className="mb-5 text-xl font-bold">
            Booking Details
          </h3>

          <input
            className="mb-4 w-full rounded-xl border p-3"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          <input
            className="mb-4 w-full rounded-xl border p-3"
            placeholder="Mobile Number"
            value={form.phone}
            onChange={(e) =>
              setForm({
                ...form,
                phone: e.target.value,
              })
            }
          />

          <input
            type="number"
            className="mb-4 w-full rounded-xl border p-3"
            placeholder="Number of Players"
            value={form.players}
            onChange={(e) =>
              setForm({
                ...form,
                players: e.target.value,
              })
            }
          />

          <input
            type="date"
            className="mb-4 w-full rounded-xl border p-3"
            value={form.bookingDate}
            onChange={(e) =>
              setForm({
                ...form,
                bookingDate: e.target.value,
              })
            }
          />

          <textarea
            rows={4}
            className="mb-5 w-full rounded-xl border p-3"
            placeholder="Special Note (optional)"
            value={form.note}
            onChange={(e) =>
              setForm({
                ...form,
                note: e.target.value,
              })
            }
          />

          <button
            onClick={submitBooking}
            disabled={loading}
            className="w-full rounded-xl bg-emerald-600 py-4 font-semibold text-white"
          >
            {loading ? "Submitting..." : "Submit Booking"}
          </button>
        </div>
      )}

      {bookingSaved && (
        <div className="mt-8 rounded-2xl bg-green-50 p-6">
          <h2 className="text-xl font-bold text-green-700">
            Booking Submitted Successfully
          </h2>

          <p className="mt-2">
            Your booking has been sent to the owner.
          </p>

          <button
            className="mt-6 w-full rounded-xl bg-green-600 py-4 text-white font-semibold"
            onClick={() => {
              const message = `Hello ${turf.ownerName},

Customer : ${form.name}

Phone : ${form.phone}

Players : ${form.players}

Date : ${form.bookingDate}

Sport : ${sport.name}

Slot : ${selectedSlot}

Amount : ₹${sport.price}

Please confirm my booking.`;

              window.open(
                `https://wa.me/${turf.ownerPhone}?text=${encodeURIComponent(message)}`,
                "_blank"
              );
            }}
          >
            Continue to WhatsApp
          </button>
        </div>
      )}

      <button
        onClick={openBookingForm}
        disabled={!selectedSlot}
        className={`mt-8 w-full rounded-xl py-4 text-lg font-semibold text-white transition ${
          selectedSlot
            ? "bg-emerald-600 hover:bg-emerald-700"
            : "bg-slate-300 cursor-not-allowed"
        }`}
      >
        Book Now
      </button>
    </div>
  );
}