import { useMemo, useState } from 'react'
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
  activity as defaultActivity,
  bookings as defaultBookings,
  kpis,
  notifications as defaultNotifications,
  topCustomers as defaultCustomers,
  turfs as defaultTurfs,
} from '../../data/ownerDashboardData'
import {
  ActivityFeed,
  AiInsights,
  AnalyticsSection,
  BookingManagement,
  CalendarView,
  CustomerInsights,
  EarningsDashboard,
  HeroOverview,
  KpiCard,
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

  const [activeSection, setActiveSection] = useState('overview')
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [headerQuery, setHeaderQuery] = useState('')

  // Lifted, mutable state so Add/Remove/Search are actually functional
  const [turfsList, setTurfsList] = useState(defaultTurfs)
  const [bookingsList, setBookingsList] = useState(defaultBookings)
  const [customersList, setCustomersList] = useState(defaultCustomers)
  const [notificationsList, setNotificationsList] = useState(defaultNotifications)
  const [activityList, setActivityList] = useState(defaultActivity)

  function logActivity(message) {
    setActivityList((prev) => [message, ...prev].slice(0, 12))
  }

  function handleLogout() {
    clearSession()
    navigate('/login')
  }

  function goTo(sectionId) {
    setActiveSection(sectionId)
    setMobileNavOpen(false)
  }

  // ---- Turf CRUD ----
  function addTurf(turf) {
    const newTurf = {
      id: Date.now(),
      occupancy: 0,
      status: 'Active',
      image: '/images/football.jpg',
      ...turf,
    }
    setTurfsList((prev) => [newTurf, ...prev])
    logActivity(`Added new turf: ${newTurf.name}`)
  }

  function removeTurf(id) {
    const turf = turfsList.find((t) => t.id === id)
    setTurfsList((prev) => prev.filter((t) => t.id !== id))
    if (turf) logActivity(`Removed turf: ${turf.name}`)
  }

  // ---- Booking actions ----
  function updateBookingStatus(id, status) {
    setBookingsList((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b)),
    )
    const booking = bookingsList.find((b) => b.id === id)
    if (booking) logActivity(`Booking ${status.toLowerCase()} for ${booking.customer}`)
  }

  // ---- Customer CRUD ----
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

  // ---- Global header search -> jumps to the right section ----
  const headerResults = useMemo(() => {
    if (!headerQuery.trim()) return []
    const q = headerQuery.toLowerCase()
    const matches = []

    turfsList.forEach((t) => {
      if (t.name.toLowerCase().includes(q) || t.sport.toLowerCase().includes(q)) {
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

  return (
    <div className="min-h-screen bg-[#03110d] text-offwhite">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(45,212,191,0.16),transparent_34%),radial-gradient(circle_at_20%_15%,rgba(52,211,153,0.14),transparent_28%)]" />

      <div className="relative mx-auto flex max-w-[1600px]">
        {/* Sidebar */}
        <aside className="sticky top-0 hidden h-screen w-72 border-r border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl xl:block">
          <div className="mb-10">
            <p className="font-display text-2xl font-bold text-white">
              BookMy<span className="text-emerald-300">Turf</span>
            </p>
            <p className="mt-2 text-sm text-white/45">Owner platform</p>
          </div>

          <nav className="space-y-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => goTo(item.id)}
                className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                  activeSection === item.id
                    ? 'bg-emerald-300 text-deepgreen-700'
                    : 'text-white/60 hover:bg-white/[0.05] hover:text-white'
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
              className="fixed inset-0 z-40 bg-black/60 xl:hidden"
              onClick={() => setMobileNavOpen(false)}
            >
              <motion.aside
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="h-full w-72 border-r border-white/10 bg-[#03110d] p-5"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="mb-8 flex items-center justify-between">
                  <p className="font-display text-xl font-bold text-white">
                    BookMy<span className="text-emerald-300">Turf</span>
                  </p>
                  <button onClick={() => setMobileNavOpen(false)} className="text-white/60">
                    <X size={20} />
                  </button>
                </div>
                <nav className="space-y-2">
                  {NAV_ITEMS.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => goTo(item.id)}
                      className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                        activeSection === item.id
                          ? 'bg-emerald-300 text-deepgreen-700'
                          : 'text-white/60 hover:bg-white/[0.05] hover:text-white'
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
          <header className="mb-6 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileNavOpen(true)}
                className="rounded-xl border border-white/10 bg-white/[0.04] p-2 text-white xl:hidden"
              >
                <Menu size={20} />
              </button>
              <div>
                <p className="text-sm text-white/45">Welcome back</p>
                <h2 className="text-xl font-semibold text-white">{session?.name || 'Turf Owner'}</h2>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative min-w-0 md:min-w-[320px]">
                <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white/50">
                  <Search size={18} />
                  <input
                    value={headerQuery}
                    onChange={(e) => setHeaderQuery(e.target.value)}
                    placeholder="Search bookings, turfs, customers"
                    className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35"
                  />
                </label>

                {headerResults.length > 0 && (
                  <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 overflow-hidden rounded-2xl border border-white/10 bg-[#06201a] shadow-2xl">
                    {headerResults.map((r) => (
                      <button
                        key={`${r.type}-${r.label}`}
                        onClick={() => {
                          goTo(r.section)
                          setHeaderQuery('')
                        }}
                        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm text-white/75 hover:bg-white/[0.06]"
                      >
                        <span>{r.label}</span>
                        <span className="text-xs uppercase tracking-widest2 text-emerald-300/70">{r.type}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={handleLogout}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-300 px-5 py-3 text-sm font-bold text-deepgreen-700 transition hover:bg-white"
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
                  <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
                    {kpis.map((item, index) => (
                      <KpiCard key={item.label} item={item} index={index} />
                    ))}
                  </section>
                </div>
              )}

              {activeSection === 'analytics' && <AnalyticsSection />}

              {activeSection === 'turfs' && (
                <TurfManagement turfs={turfsList} onAdd={addTurf} onRemove={removeTurf} />
              )}

              {activeSection === 'bookings' && (
                <BookingManagement bookings={bookingsList} onUpdateStatus={updateBookingStatus} />
              )}

              {activeSection === 'calendar' && <CalendarView />}

              {activeSection === 'earnings' && <EarningsDashboard />}

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
