import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Bell,
  CalendarDays,
  IndianRupee,
  LayoutDashboard,
  LineChart,
  LogOut,
  Menu,
  Search,
  Sparkles,
  Star,
  Users,
  X,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { clearSession, getSession } from '../../lib/auth'
import {
  addTurf,
  updateTurf,
  deleteTurf,
  listenOwnerTurfs,
  listenOwnerBookings,
  getOwnerEarnings,
  updateBookingStatus as updateBookingStatusFirestore,
} from '../../services/firestore'
import {
  ActivityFeed,
  AiInsights,
  AnalyticsSection,
  BookingManagement,
  CalendarView,
  CustomerInsights,
  EarningsDashboard,
  HeroOverview,
  NotificationCenter,
  ReviewsRatings,
  TurfManagement,
} from '../../components/owner/dashboard/DashboardWidgets'

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'analytics', label: 'Analytics', icon: LineChart },
  { id: 'turfs', label: 'Turfs', icon: Search },
  { id: 'bookings', label: 'Bookings', icon: CalendarDays },
  { id: 'calendar', label: 'Calendar', icon: CalendarDays },
  { id: 'earnings', label: 'Earnings', icon: IndianRupee },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'reviews', label: 'Reviews', icon: Star },
  { id: 'ai-insights', label: 'AI Insights', icon: Sparkles },
  { id: 'notifications', label: 'Notifications', icon: Bell },
]

export default function OwnerDashboard() {
  const navigate = useNavigate()
  const session = getSession()

  const [activeSection, setActiveSection] = useState(
    localStorage.getItem("owner_active_section") || "overview"
  )
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [headerQuery, setHeaderQuery] = useState('')

  const [turfsList, setTurfsList] = useState([])
  const [bookingsList, setBookingsList] = useState([])
  const [customersList, setCustomersList] = useState([])
  const [notificationsList, setNotificationsList] = useState([])
  const [activityList, setActivityList] = useState([])
  const [earnings, setEarnings] = useState(0)

  useEffect(() => {
    const saved = localStorage.getItem("owner_active_section");

    if (saved) {
      setActiveSection(saved);
    }
  }, []);

  function logActivity(message) {
    setActivityList((prev) => [message, ...prev].slice(0, 12))
  }

  function handleLogout() {
    clearSession()
    navigate('/login', { replace: true })
  }

  function goTo(sectionId) {
    setActiveSection(sectionId)
    localStorage.setItem("owner_active_section", sectionId)
    setMobileNavOpen(false)
  }

  useEffect(() => {
    if (!session?.uid) return

    const unsubscribeTurfs = listenOwnerTurfs(session.uid, (data) => {
      setTurfsList(data)
    })

    const unsubscribeBookings = listenOwnerBookings(session.uid, (data) => {
      setBookingsList(data)
    })

    async function loadEarnings() {
      const data = await getOwnerEarnings(session.uid)
      setEarnings(data)
    }

    loadEarnings()

    return () => {
      unsubscribeTurfs()
      unsubscribeBookings()
    }
  }, [session])

  async function handleAddTurf(turf) {
    await addTurf({
      ...turf,
      ownerId: session.uid,
    })
    logActivity(`Added new turf: ${turf.name}`)
  }

  async function removeTurf(id) {
    const turf = turfsList.find((t) => t.id === id)
    await deleteTurf(id)
    if (turf) logActivity(`Removed turf: ${turf.name}`)
  }

  async function editTurf(id, updates) {
    await updateTurf(id, updates)
    logActivity(`Updated turf: ${updates.name || turfsList.find((t) => t.id === id)?.name}`)
  }

  async function updateBookingStatus(id, status) {
    await updateBookingStatusFirestore(id, status)

    const booking = bookingsList.find((b) => b.id === id)
    if (booking) {
      logActivity(`Booking ${status.toLowerCase()} for ${booking.customer || booking.userName}`)
    }
  }

  function addCustomer(customer) {
    const newCustomer = { bookings: 0, spend: 'Rs. 0', ...customer }
    setCustomersList((prev) => [newCustomer, ...prev])
    logActivity(`Added customer: ${newCustomer.name}`)
  }

  function removeCustomer(name) {
    setCustomersList((prev) => prev.filter((c) => c.name !== name))
    logActivity(`Removed customer: ${name}`)
  }

  function dismissNotification(title) {
    setNotificationsList((prev) => prev.filter((n) => n.title !== title))
  }

  const headerResults = useMemo(() => {
    if (!headerQuery.trim()) return []
    const q = headerQuery.toLowerCase()
    const matches = []

    turfsList.forEach((t) => {
      if (
        t.name.toLowerCase().includes(q) ||
        t.sports
          ?.map((s) => s.name)
          .join(' ')
          .toLowerCase()
          .includes(q)
      ) {
        matches.push({ type: 'Turf', label: t.name, section: 'turfs' })
      }
    })
    bookingsList.forEach((b) => {
      if (b.customer.toLowerCase().includes(q) || b.turf.toLowerCase().includes(q)) {
        matches.push({ type: 'Booking', label: `${b.customer} · ${b.turf}`, section: 'bookings' })
      }
    })
    customersList.forEach((c) => {
      if (c.name.toLowerCase().includes(q)) {
        matches.push({ type: 'Customer', label: c.name, section: 'customers' })
      }
    })

    return matches.slice(0, 6)
  }, [headerQuery, turfsList, bookingsList, customersList])

  const dashboardStats = useMemo(() => {
    const totalRevenue = Number(earnings || 0)

    const pendingBookings = bookingsList.filter(
      (b) => b.status === 'Pending'
    ).length

    const confirmedBookings = bookingsList.filter(
      (b) => b.status === 'Confirmed'
    ).length

    return [
      {
        label: 'Turfs',
        value: turfsList.length,
      },
      {
        label: 'Bookings',
        value: bookingsList.length,
      },
      {
        label: 'Pending',
        value: pendingBookings,
      },
      {
        label: 'Confirmed',
        value: confirmedBookings,
      },
      {
        label: 'Customers',
        value: customersList.length,
      },
      {
        label: 'Revenue',
        value: `₹${totalRevenue}`,
      },
    ]
  }, [turfsList, bookingsList, customersList, earnings])

  return (
    <div className="min-h-screen bg-white text-emerald-950">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.10),transparent_34%),radial-gradient(circle_at_20%_15%,rgba(110,231,183,0.14),transparent_28%)]" />

      <div className="relative mx-auto flex max-w-[1600px]">
        {/* Sidebar */}
        <aside className="sticky top-0 hidden h-screen w-72 flex-col border-r border-emerald-100 bg-emerald-50/60 p-5 backdrop-blur-xl xl:flex">
          <div className="mb-10 shrink-0">
            <p className="font-display text-2xl font-bold text-emerald-900">
              BookMy<span className="text-emerald-500">Turf</span>
            </p>
            <p className="mt-2 text-sm text-emerald-700/60">Owner platform</p>
          </div>

          <nav className="flex-1 space-y-2 overflow-y-auto pb-6 pr-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => goTo(item.id)}
                className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                  activeSection === item.id
                    ? 'bg-emerald-400 text-white'
                    : 'text-emerald-700/70 hover:bg-emerald-100 hover:text-emerald-900'
                }`}
              >
                <item.icon size={17} />
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Mobile sidebar */}
        <AnimatePresence>
          {mobileNavOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-emerald-950/40 xl:hidden"
              onClick={() => setMobileNavOpen(false)}
            >
              <motion.aside
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="flex h-full w-72 flex-col border-r border-emerald-100 bg-white p-5"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="mb-8 flex shrink-0 items-center justify-between">
                  <p className="font-display text-xl font-bold text-emerald-900">
                    BookMy<span className="text-emerald-500">Turf</span>
                  </p>
                  <button onClick={() => setMobileNavOpen(false)} className="text-emerald-700/70">
                    <X size={20} />
                  </button>
                </div>
                <nav className="flex-1 space-y-2 overflow-y-auto pb-6 pr-1">
                  {NAV_ITEMS.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => goTo(item.id)}
                      className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                        activeSection === item.id
                          ? 'bg-emerald-400 text-white'
                          : 'text-emerald-700/70 hover:bg-emerald-100 hover:text-emerald-900'
                      }`}
                    >
                      <item.icon size={17} />
                      {item.label}
                    </button>
                  ))}
                </nav>
              </motion.aside>
            </motion.div>
          )}
        </AnimatePresence>

        <main className="min-w-0 flex-1 px-4 py-5 md:px-8 lg:px-10">
          <header className="mb-6 flex flex-col gap-4 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileNavOpen(true)}
                className="rounded-xl border border-emerald-100 bg-white p-2 text-emerald-700 xl:hidden"
              >
                <Menu size={20} />
              </button>
              <div>
                <p className="text-sm text-emerald-700/60">Welcome back</p>
                <h2 className="text-xl font-semibold text-emerald-900">{session?.name || 'Turf Owner'}</h2>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative min-w-0 md:min-w-[320px]">
                <label className="flex items-center gap-3 rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-emerald-700/60">
                  <Search size={18} />
                  <input
                    value={headerQuery}
                    onChange={(e) => setHeaderQuery(e.target.value)}
                    placeholder="Search bookings, turfs, customers"
                    className="w-full bg-transparent text-sm text-emerald-900 outline-none placeholder:text-emerald-700/35"
                  />
                </label>

                {headerResults.length > 0 && (
                  <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-2xl">
                    {headerResults.map((r) => (
                      <button
                        key={`${r.type}-${r.label}`}
                        onClick={() => {
                          goTo(r.section)
                          setHeaderQuery('')
                        }}
                        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm text-emerald-800 hover:bg-emerald-50"
                      >
                        <span>{r.label}</span>
                        <span className="text-xs uppercase tracking-widest2 text-emerald-500/80">{r.type}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={handleLogout}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-500"
              >
                <LogOut size={17} />
                Logout
              </button>
            </div>
          </header>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {activeSection === 'overview' && (
                <div className="space-y-6">
                  <HeroOverview onAction={goTo} />
                  <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
                    {dashboardStats.map((item) => (
                      <div
                        key={item.label}
                        className="rounded-3xl bg-white p-6 shadow-sm"
                      >
                        <p className="text-sm text-slate-500">
                          {item.label}
                        </p>
                        <h2 className="mt-3 text-4xl font-bold text-emerald-600">
                          {item.value}
                        </h2>
                      </div>
                    ))}
                  </section>
                </div>
              )}

              {activeSection === 'analytics' && <AnalyticsSection />}

              {activeSection === 'turfs' && (
                <TurfManagement
                  turfs={turfsList}
                  onAdd={handleAddTurf}
                  onRemove={removeTurf}
                  onEdit={editTurf}
                />
              )}

              {activeSection === 'bookings' && (
  <BookingManagement
    bookings={bookingsList}
    onStatusChange={updateBookingStatus}
    key={bookingsList.length}
  />
)}

             {activeSection === 'calendar' && (
  <CalendarView bookings={bookingsList} />
)}

              {activeSection === 'earnings' && (
                <EarningsDashboard
                  earnings={earnings}
                  bookings={bookingsList}
                />
              )}

              {activeSection === 'customers' && (
                <CustomerInsights
                  customers={customersList}
                  onAdd={addCustomer}
                  onRemove={removeCustomer}
                />
              )}

              {activeSection === 'reviews' && <ReviewsRatings />}

              {activeSection === 'ai-insights' && <AiInsights />}

              {activeSection === 'notifications' && (
                <div className="space-y-6">
                  <NotificationCenter notifications={notificationsList} onDismiss={dismissNotification} />
                  <ActivityFeed items={activityList} />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}