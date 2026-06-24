import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  Bell,
  CalendarDays,
  Check,
  Clock,
  Edit,
  Filter,
  IndianRupee,
  LayoutDashboard,
  MessageSquare,
  Plus,
  Search,
  Sparkles,
  Star,
  Trash2,
  TrendingUp,
  Users,
  X,
} from 'lucide-react'
import {
  aiInsights,
  bookingTrendData,
  customerGrowthData,
  peakHoursData,
  revenueData,
  reviews,
  utilizationData,
} from '../../../data/ownerDashboardData'

const chartColors = ['#34d399', '#22d3ee', '#2dd4bf', '#a7f3d0']

export function SectionCard({ title, icon: Icon, action, children, className = '' }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`rounded-2xl border border-white/10 bg-white/[0.045] p-5 shadow-2xl shadow-black/20 backdrop-blur-xl ${className}`}
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {Icon && (
            <span className="rounded-xl border border-emerald-300/20 bg-emerald-300/10 p-2 text-emerald-300">
              <Icon size={18} />
            </span>
          )}
          <h2 className="text-lg font-semibold text-white">{title}</h2>
        </div>
        {action}
      </div>
      {children}
    </motion.section>
  )
}

export function HeroOverview({ onAction }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(52,211,153,0.22),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.025))] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl md:p-8"
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
            <LayoutDashboard size={14} />
            Owner Command Center
          </span>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-white md:text-6xl">
            Run every turf, booking, and rupee from one dashboard.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/65">
            Click any section in the sidebar — or a quick action below — to jump straight there.
          </p>
        </div>
        <QuickActions onAction={onAction} />
      </div>
    </motion.section>
  )
}

export function QuickActions({ onAction }) {
  const actions = [
    { label: 'Add Turf', icon: Plus, section: 'turfs' },
    { label: 'Manage Slots', icon: CalendarDays, section: 'calendar' },
    { label: 'View Earnings', icon: IndianRupee, section: 'earnings' },
  ]

  return (
    <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[420px]">
      {actions.map((action) => (
        <button
          key={action.label}
          onClick={() => onAction?.(action.section)}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-semibold text-white backdrop-blur transition hover:border-emerald-300/40 hover:bg-emerald-300/10"
        >
          <action.icon size={17} />
          {action.label}
        </button>
      ))}
    </div>
  )
}

export function KpiCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="rounded-2xl border border-white/10 bg-white/[0.045] p-5 shadow-xl shadow-black/20 backdrop-blur-xl"
    >
      <p className="text-sm text-white/55">{item.label}</p>
      <div className="mt-3 flex items-end justify-between gap-4">
        <strong className="text-3xl font-semibold text-white">{item.value}</strong>
        <TrendingUp size={20} className="text-emerald-300" />
      </div>
      <p className="mt-3 text-sm text-emerald-200">{item.change}</p>
    </motion.div>
  )
}

export function AnalyticsSection() {
  return (
    <div className="grid gap-5 xl:grid-cols-2">
      <ChartCard title="Revenue Analytics" icon={IndianRupee}>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#34d399" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
            <XAxis dataKey="name" stroke="rgba(255,255,255,0.45)" />
            <YAxis stroke="rgba(255,255,255,0.45)" />
            <Tooltip content={<ChartTooltip />} />
            <Area type="monotone" dataKey="revenue" stroke="#34d399" fill="url(#revenueGradient)" strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Booking Trend" icon={CalendarDays}>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={bookingTrendData}>
            <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
            <XAxis dataKey="name" stroke="rgba(255,255,255,0.45)" />
            <YAxis stroke="rgba(255,255,255,0.45)" />
            <Tooltip content={<ChartTooltip />} />
            <Line type="monotone" dataKey="bookings" stroke="#22d3ee" strokeWidth={3} dot={{ r: 4, fill: '#22d3ee' }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Peak Hours" icon={Clock}>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={peakHoursData}>
            <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
            <XAxis dataKey="hour" stroke="rgba(255,255,255,0.45)" />
            <YAxis stroke="rgba(255,255,255,0.45)" />
            <Tooltip content={<ChartTooltip />} />
            <Bar dataKey="bookings" fill="#2dd4bf" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Turf Utilization" icon={TrendingUp}>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie data={utilizationData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={95} paddingAngle={4}>
              {utilizationData.map((entry, index) => (
                <Cell key={entry.name} fill={chartColors[index % chartColors.length]} />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  )
}

function ChartCard({ title, icon, children }) {
  return (
    <SectionCard title={title} icon={icon}>
      {children}
    </SectionCard>
  )
}

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/95 px-4 py-3 text-sm text-white shadow-xl">
      <p className="font-semibold">{label || payload[0].name}</p>
      <p className="text-emerald-200">{payload[0].value}</p>
    </div>
  )
}

const SPORT_OPTIONS = ['Football', 'Cricket', 'Badminton', 'Basketball', 'Pickleball', 'Swimming']
const SPORT_IMAGE = {
  Football: '/images/football.jpg',
  Cricket: '/images/cricket.jpg',
  Badminton: '/images/badminton.jpg',
  Basketball: '/images/basketball.jpg',
  Pickleball: '/images/pickleball.jpg',
  Swimming: '/images/swimming.jpg',
}

export function TurfManagement({ turfs = [], onAdd, onRemove }) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', sport: 'Football', price: '' })

  const filteredTurfs = useMemo(() => {
    return turfs.filter((turf) => {
      const matchesQuery =
        turf.name.toLowerCase().includes(query.toLowerCase()) ||
        turf.sport.toLowerCase().includes(query.toLowerCase())
      const matchesFilter = filter === 'All' || turf.status === filter
      return matchesQuery && matchesFilter
    })
  }, [query, filter, turfs])

  function handleSubmit(event) {
    event.preventDefault()
    if (!form.name.trim() || !form.price.trim()) return
    onAdd?.({
      name: form.name.trim(),
      sport: form.sport,
      price: form.price.trim(),
      image: SPORT_IMAGE[form.sport] || '/images/football.jpg',
    })
    setForm({ name: '', sport: 'Football', price: '' })
    setShowForm(false)
  }

  return (
    <SectionCard
      title="Turf Management"
      icon={Filter}
      action={
        <button
          onClick={() => setShowForm((v) => !v)}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-300 px-4 py-2 text-sm font-semibold text-deepgreen-700 transition hover:bg-white"
        >
          <Plus size={16} />
          Add Turf
        </button>
      }
    >
      {showForm && (
        <motion.form
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          onSubmit={handleSubmit}
          className="mb-5 grid gap-3 overflow-hidden rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.06] p-4 sm:grid-cols-4"
        >
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Turf name"
            className="rounded-xl border border-white/10 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/35 sm:col-span-2"
          />
          <select
            value={form.sport}
            onChange={(e) => setForm({ ...form, sport: e.target.value })}
            className="rounded-xl border border-white/10 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none"
          >
            {SPORT_OPTIONS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <input
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            placeholder="e.g. Rs. 1,200/hr"
            className="rounded-xl border border-white/10 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/35"
          />
          <button
            type="submit"
            className="sm:col-span-4 rounded-xl bg-emerald-300 px-4 py-2.5 text-sm font-semibold text-deepgreen-700 transition hover:bg-white"
          >
            Save Turf
          </button>
        </motion.form>
      )}

      <div className="mb-5 flex flex-col gap-3 md:flex-row">
        <label className="flex flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white/60">
          <Search size={18} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search turf or sport"
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/40"
          />
        </label>
        <select
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none"
        >
          <option>All</option>
          <option>Active</option>
          <option>Maintenance</option>
        </select>
      </div>

      {filteredTurfs.length === 0 ? (
        <p className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center text-sm text-white/45">
          No turfs match your search.
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {filteredTurfs.map((turf) => (
            <TurfCard key={turf.id} turf={turf} onRemove={onRemove} />
          ))}
        </div>
      )}
    </SectionCard>
  )
}

function TurfCard({ turf, onRemove }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035]"
    >
      <div className="h-36 bg-slate-900">
        <img
          src={turf.image}
          alt={turf.name}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.style.opacity = 0.15
          }}
        />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold text-white">{turf.name}</h3>
            <p className="mt-1 text-sm text-white/55">{turf.sport} · {turf.price}</p>
          </div>
          <span className={`rounded-full px-2.5 py-1 text-xs ${turf.status === 'Active' ? 'bg-emerald-300/10 text-emerald-200' : 'bg-amber-300/10 text-amber-200'}`}>
            {turf.status}
          </span>
        </div>
        <div className="mt-4">
          <div className="mb-2 flex justify-between text-xs text-white/55">
            <span>Occupancy</span>
            <span>{turf.occupancy}%</span>
          </div>
          <div className="h-2 rounded-full bg-white/10">
            <div className="h-2 rounded-full bg-emerald-300" style={{ width: `${turf.occupancy}%` }} />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <button className="rounded-xl border border-white/10 bg-white/[0.04] py-2 text-white/70 transition hover:text-emerald-200">
            <Edit size={16} className="mx-auto" />
          </button>
          <button className="rounded-xl border border-white/10 bg-white/[0.04] py-2 text-white/70 transition hover:text-emerald-200">
            <CalendarDays size={16} className="mx-auto" />
          </button>
          <button
            onClick={() => onRemove?.(turf.id)}
            className="rounded-xl border border-red-400/20 bg-red-400/[0.06] py-2 text-red-300 transition hover:bg-red-400/15"
          >
            <Trash2 size={16} className="mx-auto" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export function BookingManagement({ bookings = [], onUpdateStatus }) {
  const [active, setActive] = useState('Pending')
  const statuses = ['Pending', 'Confirmed', 'Completed', 'Cancelled']
  const visible = bookings.filter((booking) => booking.status === active)

  return (
    <SectionCard title="Booking Management" icon={CalendarDays}>
      <div className="mb-5 flex flex-wrap gap-2">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => setActive(status)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${active === status ? 'bg-emerald-300 text-deepgreen-700' : 'bg-white/[0.05] text-white/65 hover:text-white'}`}
          >
            {status} ({bookings.filter((b) => b.status === status).length})
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center text-sm text-white/45">
          No {active.toLowerCase()} bookings.
        </p>
      ) : (
        <div className="space-y-3">
          {visible.map((booking) => (
            <div key={booking.id} className="grid gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4 md:grid-cols-[1fr_1fr_1fr_auto] md:items-center">
              <div>
                <p className="font-semibold text-white">{booking.customer}</p>
                <p className="text-sm text-white/50">{booking.turf}</p>
              </div>
              <p className="text-sm text-white/60">{booking.time}</p>
              <p className="text-sm font-semibold text-emerald-200">{booking.amount}</p>
              {booking.status === 'Pending' ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => onUpdateStatus?.(booking.id, 'Confirmed')}
                    className="rounded-xl bg-emerald-300 px-3 py-2 text-deepgreen-700"
                  >
                    <Check size={16} />
                  </button>
                  <button
                    onClick={() => onUpdateStatus?.(booking.id, 'Cancelled')}
                    className="rounded-xl bg-red-400/15 px-3 py-2 text-red-200"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <span className="rounded-full bg-white/[0.06] px-3 py-1 text-sm text-white/60">{booking.status}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  )
}

export function CalendarView() {
  const [view, setView] = useState('Daily')
  const slotsByView = {
    Daily: [
      { time: '06:00', title: 'Football training', status: 'Confirmed' },
      { time: '09:00', title: 'School cricket batch', status: 'Confirmed' },
      { time: '13:00', title: 'Maintenance block', status: 'Blocked' },
      { time: '18:00', title: 'Corporate football', status: 'Pending' },
      { time: '21:00', title: 'Open slot', status: 'Available' },
    ],
    Weekly: [
      { time: 'Mon–Fri 6–9 AM', title: 'Recurring training batches', status: 'Confirmed' },
      { time: 'Sat–Sun', title: 'Open community play', status: 'Available' },
    ],
    Monthly: [
      { time: 'Week 1–2', title: 'Corporate league bookings', status: 'Confirmed' },
      { time: 'Week 3', title: 'Annual maintenance', status: 'Blocked' },
    ],
  }

  return (
    <SectionCard title="Calendar View" icon={CalendarDays}>
      <div className="mb-5 flex gap-2">
        {['Daily', 'Weekly', 'Monthly'].map((label) => (
          <button
            key={label}
            onClick={() => setView(label)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${view === label ? 'bg-emerald-300 text-deepgreen-700' : 'bg-white/[0.05] text-white/65 hover:text-white'}`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {slotsByView[view].map((slot) => (
          <div key={slot.time + slot.title} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.035] p-4">
            <div>
              <p className="font-semibold text-white">{slot.time}</p>
              <p className="text-sm text-white/55">{slot.title}</p>
            </div>
            <span className="rounded-full bg-emerald-300/10 px-3 py-1 text-sm text-emerald-200">{slot.status}</span>
          </div>
        ))}
      </div>
    </SectionCard>
  )
}

export function EarningsDashboard() {
  return (
    <SectionCard title="Earnings Dashboard" icon={IndianRupee}>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          ['Daily', 'Rs. 42,500'],
          ['Weekly', 'Rs. 2.48L'],
          ['Monthly', 'Rs. 9.72L'],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
            <p className="text-sm text-white/55">{label}</p>
            <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
            <p className="mt-2 text-sm text-emerald-200">Growth is above target</p>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={revenueData}>
            <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
            <XAxis dataKey="name" stroke="rgba(255,255,255,0.45)" />
            <YAxis stroke="rgba(255,255,255,0.45)" />
            <Tooltip content={<ChartTooltip />} />
            <Area type="monotone" dataKey="revenue" stroke="#34d399" fill="#34d39933" strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </SectionCard>
  )
}

export function CustomerInsights({ customers = [], onAdd, onRemove }) {
  const [query, setQuery] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', bookings: '', spend: '' })

  const filtered = useMemo(
    () => customers.filter((c) => c.name.toLowerCase().includes(query.toLowerCase())),
    [customers, query],
  )

  function handleSubmit(event) {
    event.preventDefault()
    if (!form.name.trim()) return
    onAdd?.({
      name: form.name.trim(),
      bookings: Number(form.bookings) || 0,
      spend: form.spend.trim() || 'Rs. 0',
    })
    setForm({ name: '', bookings: '', spend: '' })
    setShowForm(false)
  }

  return (
    <SectionCard
      title="Customer Insights"
      icon={Users}
      action={
        <button
          onClick={() => setShowForm((v) => !v)}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-300 px-4 py-2 text-sm font-semibold text-deepgreen-700 transition hover:bg-white"
        >
          <Plus size={16} />
          Add Customer
        </button>
      }
    >
      {showForm && (
        <motion.form
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          onSubmit={handleSubmit}
          className="mb-5 grid gap-3 overflow-hidden rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.06] p-4 sm:grid-cols-3"
        >
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Customer name"
            className="rounded-xl border border-white/10 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/35"
          />
          <input
            value={form.bookings}
            onChange={(e) => setForm({ ...form, bookings: e.target.value })}
            placeholder="Bookings"
            type="number"
            className="rounded-xl border border-white/10 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/35"
          />
          <input
            value={form.spend}
            onChange={(e) => setForm({ ...form, spend: e.target.value })}
            placeholder="e.g. Rs. 5,000"
            className="rounded-xl border border-white/10 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/35"
          />
          <button
            type="submit"
            className="sm:col-span-3 rounded-xl bg-emerald-300 px-4 py-2.5 text-sm font-semibold text-deepgreen-700 transition hover:bg-white"
          >
            Save Customer
          </button>
        </motion.form>
      )}

      <label className="mb-5 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white/60">
        <Search size={18} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search customers by name"
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/40"
        />
      </label>

      <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <p className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center text-sm text-white/45">
              No customers found.
            </p>
          ) : (
            filtered.map((customer) => (
              <div
                key={customer.name}
                className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4"
              >
                <div>
                  <p className="font-semibold text-white">{customer.name}</p>
                  <p className="mt-1 text-sm text-white/55">{customer.bookings} bookings · {customer.spend}</p>
                </div>
                <button
                  onClick={() => onRemove?.(customer.name)}
                  className="rounded-xl border border-red-400/20 bg-red-400/[0.06] p-2 text-red-300 transition hover:bg-red-400/15"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))
          )}
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={customerGrowthData}>
            <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
            <XAxis dataKey="name" stroke="rgba(255,255,255,0.45)" />
            <YAxis stroke="rgba(255,255,255,0.45)" />
            <Tooltip content={<ChartTooltip />} />
            <Area type="monotone" dataKey="customers" stroke="#2dd4bf" fill="#2dd4bf33" strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </SectionCard>
  )
}

export function ReviewsRatings() {
  return (
    <SectionCard title="Reviews & Ratings" icon={Star}>
      <div className="mb-5 flex items-center gap-3">
        <strong className="text-5xl text-white">4.8</strong>
        <div>
          <div className="flex text-emerald-300">{[1, 2, 3, 4, 5].map((item) => <Star key={item} size={18} fill="currentColor" />)}</div>
          <p className="mt-1 text-sm text-white/55">Based on 312 reviews</p>
        </div>
      </div>
      <div className="space-y-3">
        {reviews.map((review) => (
          <div key={review.name} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-white">{review.name}</p>
              <span className="text-sm text-emerald-200">{review.rating}.0</span>
            </div>
            <p className="mt-2 text-sm text-white/60">{review.text}</p>
            <button className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-emerald-200">
              <MessageSquare size={15} />
              Reply
            </button>
          </div>
        ))}
      </div>
    </SectionCard>
  )
}

export function AiInsights() {
  return (
    <SectionCard title="AI Insights" icon={Sparkles}>
      <div className="space-y-3">
        {aiInsights.map((insight) => (
          <div key={insight} className="rounded-2xl border border-emerald-300/15 bg-emerald-300/[0.06] p-4 text-sm leading-6 text-emerald-50">
            {insight}
          </div>
        ))}
      </div>
    </SectionCard>
  )
}

export function NotificationCenter({ notifications = [], onDismiss }) {
  return (
    <SectionCard title="Notification Center" icon={Bell}>
      {notifications.length === 0 ? (
        <p className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center text-sm text-white/45">
          You're all caught up.
        </p>
      ) : (
        <div className="space-y-3">
          {notifications.map((item) => (
            <div key={item.title} className="flex items-start justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4">
              <div>
                <p className="font-semibold text-white">{item.title}</p>
                <p className="mt-1 text-sm text-white/55">{item.detail}</p>
              </div>
              <button
                onClick={() => onDismiss?.(item.title)}
                className="rounded-lg p-1 text-white/40 transition hover:text-white"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  )
}

export function ActivityFeed({ items = [] }) {
  return (
    <SectionCard title="Activity Feed" icon={Clock}>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={item + index} className="flex gap-3">
            <span className="mt-1 h-3 w-3 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(52,211,153,0.75)]" />
            <div>
              <p className="text-sm text-white/75">{item}</p>
              <p className="mt-1 text-xs text-white/35">{index + 1} min ago</p>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  )
}
