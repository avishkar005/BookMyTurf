import { CalendarDays, Home, LogOut, MapPin, Search, Trophy } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { clearSession, getSession } from '../lib/auth'

export default function UserDashboard() {
  const navigate = useNavigate()
  const session = getSession()

  function handleLogout() {
    clearSession()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-deepgreen-700 px-6 py-8 text-offwhite">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-widest2 text-emerald-300/80">
              User Dashboard
            </p>
            <h1 className="mt-2 font-display text-3xl font-semibold">
              Welcome, {session?.name || 'Player'}
            </h1>
            <p className="mt-2 text-white/60">
              Search turfs, manage bookings, and track your sports activity.
            </p>
          </div>

          <div className="flex gap-3">
            <Link to="/" className="btn-secondary">
              <Home size={16} />
              Home
            </Link>
            <button onClick={handleLogout} className="btn-primary">
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </header>

        <section className="grid gap-5 md:grid-cols-3">
          <div className="glass-card p-6">
            <Search className="text-emerald-300" />
            <h2 className="mt-4 text-xl font-semibold">Find Turf</h2>
            <p className="mt-2 text-sm text-white/60">
              Search available grounds by sport, location, and timing.
            </p>
          </div>

          <div className="glass-card p-6">
            <CalendarDays className="text-emerald-300" />
            <h2 className="mt-4 text-xl font-semibold">My Bookings</h2>
            <p className="mt-2 text-sm text-white/60">
              View upcoming, completed, and cancelled bookings.
            </p>
          </div>

          <div className="glass-card p-6">
            <Trophy className="text-emerald-300" />
            <h2 className="mt-4 text-xl font-semibold">Activity</h2>
            <p className="mt-2 text-sm text-white/60">
              Keep track of your favorite sports and recent sessions.
            </p>
          </div>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-2">
          <div className="glass-card p-6">
            <h2 className="text-2xl font-semibold">Upcoming Booking</h2>
            <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <p className="font-semibold">Football Turf - Evening Slot</p>
              <p className="mt-2 flex items-center gap-2 text-sm text-white/60">
                <MapPin size={16} />
                Green Arena, Mumbai
              </p>
              <p className="mt-2 text-sm text-white/60">
                Today, 7:00 PM - 8:00 PM
              </p>
            </div>
          </div>

          <div className="glass-card p-6">
            <h2 className="text-2xl font-semibold">Recommended Turfs</h2>
            <div className="mt-5 space-y-4">
              {['Cricket Box Turf', 'Badminton Court', 'Basketball Arena'].map(
                (item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <span>{item}</span>
                    <button className="rounded-full bg-emerald-300 px-4 py-2 text-sm font-semibold text-deepgreen-700">
                      Book
                    </button>
                  </div>
                ),
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}