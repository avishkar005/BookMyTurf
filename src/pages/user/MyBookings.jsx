import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/user/dashboard/Header";
import Sidebar from "../../components/user/dashboard/Sidebar";
import Breadcrumb from "../../components/user/common/Breadcrumb";

import { clearSession, getSession } from "../../lib/auth";
import { getUserBookings } from "../../services/firestore";

export default function MyBookings() {
  const navigate = useNavigate();
  const session = getSession();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  function handleLogout() {
    clearSession();
    navigate("/login");
  }

  useEffect(() => {
    async function loadBookings() {
      if (!session?.uid) {
        setLoading(false);
        return;
      }

      const data = await getUserBookings(session.uid);

      setBookings(
        data.sort(
          (a, b) =>
            new Date(b.createdAt || 0) -
            new Date(a.createdAt || 0)
        )
      );
      setLoading(false);
    }

    loadBookings();
  }, [session]);

  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar
        session={session}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={handleLogout}
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
                  label: "My Bookings",
                },
              ]}
            />
          </div>

          <div className="mt-8">
            <h1 className="text-3xl font-bold text-slate-800">
              My Bookings
            </h1>

            <p className="mt-2 text-slate-500">
              View all your booking requests.
            </p>
          </div>

          {loading ? (
            <div className="mt-10 rounded-2xl bg-white p-12 text-center shadow-sm">
              <h2 className="text-xl font-semibold text-slate-700">
                Loading bookings...
              </h2>
            </div>
          ) : bookings.length === 0 ? (
            <div className="mt-10 rounded-2xl bg-white p-12 text-center shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-700">
                No bookings found
              </h2>

              <button
                onClick={() => navigate("/user/discover")}
                className="mt-6 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700"
              >
                Discover Turfs
              </button>
            </div>
          ) : (
            <div className="mt-8 space-y-6">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="rounded-2xl bg-white p-6 shadow-sm"
                >
                  {booking.turfImage && (
                    <img
                      src={booking.turfImage}
                      alt={booking.turfName}
                      className="mb-4 h-40 w-full rounded-xl object-cover"
                    />
                  )}

                  <div className="flex flex-wrap items-start justify-between gap-6">
                    <div>
                      <h2 className="text-xl font-semibold text-slate-800">
                        {booking.turfName}
                      </h2>

                      <p className="mt-2 text-slate-500">
                        {booking.sportName}
                      </p>

                      <p className="mt-2 text-slate-500">
                        {booking.turfAddress}
                      </p>

                      <p className="mt-2 text-slate-500">
                        {booking.turfCity}
                      </p>

                      <p className="mt-2 text-slate-500">
                        {new Date(booking.bookingDate).toLocaleDateString()}
                      </p>

                      <p className="mt-2 text-slate-500">
                        {booking.slot}
                      </p>

                      <p className="mt-2 text-slate-500">
                        Players : {booking.players}
                      </p>

                      {booking.note && (
                        <p className="mt-2 text-slate-500">
                          Note : {booking.note}
                        </p>
                      )}
                    </div>

                    <div className="text-right">
                      <p className="mb-2 text-xs text-slate-400">
                        Booking ID : {booking.bookingId}
                      </p>

                      <span
                        className={`rounded-full px-4 py-2 text-sm font-semibold ${
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
                      </span>

                      <h3 className="mt-6 text-3xl font-bold text-slate-800">
                        ₹{Number(booking.price || 0)}
                      </h3>

                      <p className="mt-2 text-sm text-slate-500">
                        <span
                          className={`font-semibold ${
                            booking.paymentStatus === "Paid"
                              ? "text-green-600"
                              : "text-orange-600"
                          }`}
                        >
                          Payment : {booking.paymentStatus}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}