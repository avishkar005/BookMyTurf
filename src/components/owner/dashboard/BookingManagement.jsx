import { useEffect, useMemo, useState } from "react";
import { getSession } from "../../../lib/auth";
import { listenOwnerBookings, updateBookingStatus } from "../../../services/firestore";

export default function BookingManagement() {
  const session = getSession();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.uid) {
      setLoading(false);
      return;
    }

    const unsubscribe = listenOwnerBookings(
      session.uid,
      (data) => {
        setBookings(
          data.sort(
            (a, b) =>
              new Date(b.createdAt || 0) -
              new Date(a.createdAt || 0)
          )
        );
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [session]);

  const totalRevenue = useMemo(() => {
    return bookings
      .filter((b) => b.status === "Confirmed")
      .reduce(
        (sum, booking) => sum + Number(booking.price || 0),
        0
      );
  }, [bookings]);

  const pending = bookings.filter(
    (booking) => booking.status === "Pending"
  ).length;

  const confirmed = bookings.filter(
    (booking) => booking.status === "Confirmed"
  ).length;

  const completed = bookings.filter(
    (booking) => booking.status === "Completed"
  ).length;

  return (
    <div className="space-y-6">

      {/* Top Cards */}

      <div className="grid gap-5 md:grid-cols-3">

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Total Bookings
          </p>

          <h2 className="mt-2 text-4xl font-bold text-slate-800">
            {bookings.length}
          </h2>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Pending
          </p>

          <h2 className="mt-2 text-4xl font-bold text-orange-500">
            {pending}
          </h2>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Revenue
          </p>

          <h2 className="mt-2 text-4xl font-bold text-emerald-600">
            ₹{totalRevenue}
          </h2>
        </div>

      </div>

      {/* Booking List */}

      <div className="rounded-3xl bg-white shadow-sm">

        <div className="border-b p-6">
          <h2 className="text-2xl font-bold text-slate-800">
            Recent Bookings
          </h2>
        </div>

        {loading ? (
          <div className="p-10 text-center text-slate-500">
            Loading...
          </div>
        ) : bookings.length === 0 ? (
          <div className="p-10 text-center text-slate-500">
            No bookings yet.
          </div>
        ) : (
          <div className="divide-y">

            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="p-6"
              >

                <div className="flex flex-wrap items-center justify-between gap-6">

                  <div>

                    {booking.turfImage && (
                      <img
                        src={booking.turfImage}
                        alt={booking.turfName}
                        className="mb-4 h-36 w-full rounded-xl object-cover"
                      />
                    )}

                    <p className="mb-2 text-xs text-slate-400">
                      Booking ID : {booking.bookingId}
                    </p>

                    <h3 className="text-lg font-bold text-slate-800">
                      {booking.customerName}
                    </h3>

                    <p className="mt-1 text-slate-500">
                      {booking.customerPhone}
                    </p>

                    <p className="mt-3 text-slate-600">
                      Turf :
                      {" "}
                      {booking.turfName}
                    </p>

                    <p className="text-slate-600">
                      Sport :
                      {" "}
                      {booking.sportName}
                    </p>

                    <p className="text-slate-600">
                      Slot :
                      {" "}
                      {booking.slot}
                    </p>

                    <p className="text-slate-600">
                      Players :
                      {" "}
                      {booking.players}
                    </p>

                    <p className="text-slate-600">
                      Date :
                      {" "}
                      {new Date(booking.bookingDate).toLocaleDateString()}
                    </p>

                  </div>

                  <div className="text-right">

                    <div className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                      ₹{Number(booking.price || 0)}
                    </div>

                    <div
                      className={`mt-4 rounded-full px-4 py-2 text-sm font-semibold ${
                        booking.status === "Confirmed"
                          ? "bg-green-100 text-green-700"
                          : booking.status === "Completed"
                          ? "bg-blue-100 text-blue-700"
                          : booking.status === "Cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {booking.status}
                    </div>

                    {booking.status === "Pending" && (
                      <button
                        onClick={() =>
                          updateBookingStatus(
                            booking.id,
                            "Confirmed"
                          )
                        }
                        className="mt-4 w-full rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white"
                      >
                        Confirm
                      </button>
                    )}

                    {booking.status === "Pending" && (
                      <button
                        onClick={() =>
                          updateBookingStatus(
                            booking.id,
                            "Cancelled"
                          )
                        }
                        className="mt-3 w-full rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white"
                      >
                        Cancel
                      </button>
                    )}

                    {booking.status === "Confirmed" && (
                      <button
                        onClick={() =>
                          updateBookingStatus(
                            booking.id,
                            "Completed"
                          )
                        }
                        className="mt-3 w-full rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
                      >
                        Mark Completed
                      </button>
                    )}

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}