import { useMemo, useState } from 'react'
import { createOfflineBooking } from '../../../services/firestore'
import { getSession } from '../../../lib/auth'
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
import TurfManagement from "./TurfManagement";

const chartColors = ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0']

export function SectionCard({ title, icon: Icon, action, children, className = '' }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`rounded-2xl border border-emerald-100 bg-white p-5 shadow-xl shadow-emerald-900/5 ${className}`}
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {Icon && (
            <span className="rounded-xl border border-emerald-200 bg-emerald-50 p-2 text-emerald-600">
              <Icon size={18} />
            </span>
          )}
          <h2 className="text-lg font-semibold text-emerald-900">{title}</h2>
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
      className="overflow-hidden rounded-3xl border border-emerald-100 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.12),transparent_34%),linear-gradient(135deg,rgba(16,185,129,0.06),rgba(255,255,255,0.6))] p-6 shadow-xl shadow-emerald-900/5 md:p-8"
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            <LayoutDashboard size={14} />
            Owner Command Center
          </span>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-emerald-950 md:text-6xl">
            Run every turf, booking, and rupee from one dashboard.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-emerald-700/70">
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
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-emerald-200 bg-white px-4 py-3 text-sm font-semibold text-emerald-800 transition hover:border-emerald-400 hover:bg-emerald-50"
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
      className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-lg shadow-emerald-900/5"
    >
      <p className="text-sm text-emerald-700/60">{item.label}</p>
      <div className="mt-3 flex items-end justify-between gap-4">
        <strong className="text-3xl font-semibold text-emerald-950">{item.value}</strong>
        <TrendingUp size={20} className="text-emerald-500" />
      </div>
      <p className="mt-3 text-sm text-emerald-600">{item.change}</p>
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
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(16,185,129,0.12)" vertical={false} />
            <XAxis dataKey="name" stroke="rgba(6,78,59,0.5)" />
            <YAxis stroke="rgba(6,78,59,0.5)" />
            <Tooltip content={<ChartTooltip />} />
            <Area type="monotone" dataKey="revenue" stroke="#10b981" fill="url(#revenueGradient)" strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Booking Trend" icon={CalendarDays}>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={bookingTrendData}>
            <CartesianGrid stroke="rgba(16,185,129,0.12)" vertical={false} />
            <XAxis dataKey="name" stroke="rgba(6,78,59,0.5)" />
            <YAxis stroke="rgba(6,78,59,0.5)" />
            <Tooltip content={<ChartTooltip />} />
            <Line type="monotone" dataKey="bookings" stroke="#0d9488" strokeWidth={3} dot={{ r: 4, fill: '#0d9488' }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Peak Hours" icon={Clock}>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={peakHoursData}>
            <CartesianGrid stroke="rgba(16,185,129,0.12)" vertical={false} />
            <XAxis dataKey="hour" stroke="rgba(6,78,59,0.5)" />
            <YAxis stroke="rgba(6,78,59,0.5)" />
            <Tooltip content={<ChartTooltip />} />
            <Bar dataKey="bookings" fill="#34d399" radius={[10, 10, 0, 0]} />
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
    <div className="rounded-xl border border-emerald-100 bg-white px-4 py-3 text-sm text-emerald-900 shadow-xl">
      <p className="font-semibold">{label || payload[0].name}</p>
      <p className="text-emerald-600">{payload[0].value}</p>
    </div>
  )
}

export { TurfManagement }

export function BookingManagement({
  bookings = [],
  onUpdateStatus,
  onStatusChange,
  onAddOfflineBooking,
}) {
  const [active, setActive] = useState('Pending')
  const statuses = ['Pending', 'Confirmed', 'Completed', 'Cancelled']
  const visible = bookings.filter((booking) => booking.status === active)
  const handleStatus = onStatusChange || onUpdateStatus

  const [showForm, setShowForm] = useState(false)

  const [form, setForm] = useState({
    customer: '',
    phone: '',
    turf: '',
    date: '',
    slot: '',
    price: '',
  })

  return (
    <SectionCard
      title="Booking Management"
      icon={CalendarDays}
      action={
        <button
          onClick={() => setShowForm((v) => !v)}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-600"
        >
          <Plus size={16} />
          Add Offline Booking
        </button>
      }
    >
      <div className="mb-5 flex flex-wrap gap-2">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => setActive(status)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${active === status ? 'bg-emerald-500 text-white' : 'bg-emerald-50 text-emerald-700/70 hover:text-emerald-900'}`}
          >
            {status} ({bookings.filter((b) => b.status === status).length})
          </button>
        ))}
      </div>

      {showForm && (
        <form
          onSubmit={async (e) => {
            e.preventDefault()

            try {
              const session = getSession()

              console.log("SESSION", session)

              if (!session?.uid) {
                alert("Owner session not found.")
                return
              }

              const bookingId = await createOfflineBooking({
                ownerId: session.uid,
                turfId: "",
                turfName: form.turf,
                turfImage: "",
                sportName: "",
                customerName: form.customer,
                customerPhone: form.phone,
                players: 1,
                bookingDate: form.date,
                slot: form.slot,
                price: Number(form.price),
              })
              console.log("Saved Booking Id:", bookingId);
              alert("Booking saved successfully");

              console.log("BOOKING CREATED:", bookingId)

              alert("Booking Saved Successfully")

              setForm({
                customer: "",
                phone: "",
                turf: "",
                date: "",
                slot: "",
                price: "",
              })

              setShowForm(false)
            } catch (error) {
              console.error(error)
              alert(error.message)
            }
          }}
          className="mb-6 grid gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 md:grid-cols-2"
        >
          <input
            placeholder="Customer Name"
            value={form.customer}
            onChange={(e)=>setForm({...form,customer:e.target.value})}
            className="rounded-xl border p-3"
          />

          <input
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e)=>setForm({...form,phone:e.target.value})}
            className="rounded-xl border p-3"
          />

          <input
            placeholder="Turf Name"
            value={form.turf}
            onChange={(e)=>setForm({...form,turf:e.target.value})}
            className="rounded-xl border p-3"
          />

          <input
            type="date"
            value={form.date}
            onChange={(e)=>setForm({...form,date:e.target.value})}
            className="rounded-xl border p-3"
          />

          <input
            placeholder="Slot"
            value={form.slot}
            onChange={(e)=>setForm({...form,slot:e.target.value})}
            className="rounded-xl border p-3"
          />

          <input
            type="number"
            placeholder="Amount"
            value={form.price}
            onChange={(e)=>setForm({...form,price:e.target.value})}
            className="rounded-xl border p-3"
          />

          <button
            type="submit"
            className="md:col-span-2 rounded-xl bg-emerald-500 py-3 font-semibold text-white"
          >
            Save Offline Booking
          </button>
        </form>
      )}

      {visible.length === 0 ? (
        <p className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6 text-center text-sm text-emerald-700/50">
          No {active.toLowerCase()} bookings.
        </p>
      ) : (
        <div className="space-y-3">
          {visible.map((booking) => (
            <div key={booking.id} className="grid gap-3 rounded-2xl border border-emerald-100 bg-white p-4 md:grid-cols-[1fr_1fr_1fr_auto] md:items-center">
              <div>
                <p className="font-semibold text-emerald-900">{booking.customer || booking.userName}</p>
                <p className="text-sm text-emerald-700/50">{booking.turf || booking.turfName}</p>
              </div>
              <p className="text-sm text-emerald-700/60">{booking.time || booking.slot}</p>
              <p className="text-sm font-semibold text-emerald-600">{booking.amount || `₹${booking.price || 0}`}</p>
              {booking.status === 'Pending' ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleStatus?.(booking.id, 'Confirmed')}
                    className="rounded-xl bg-emerald-500 px-3 py-2 text-white"
                  >
                    <Check size={16} />
                  </button>
                  <button
                    onClick={() => handleStatus?.(booking.id, 'Cancelled')}
                    className="rounded-xl bg-red-100 px-3 py-2 text-red-500"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm text-emerald-700/70">{booking.status}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  )
}

export function CalendarView({ bookings = [] }) {
  const [view, setView] = useState("Daily")

  const slotsByView = {
    Daily: bookings
      .sort((a, b) => new Date(a.bookingDate) - new Date(b.bookingDate))
      .map((booking) => ({
        time: booking.slot,
        title: `${booking.turfName} • ${booking.customerName}`,
        date: booking.bookingDate,
        status: booking.status,
      })),

    Weekly: bookings.map((booking) => ({
      time: booking.bookingDate,
      title: `${booking.slot} • ${booking.customerName}`,
      status: booking.status,
    })),

    Monthly: bookings.map((booking) => ({
      time: booking.bookingDate,
      title: `${booking.slot} • ${booking.turfName}`,
      status: booking.status,
    })),
  }

  return (
    <SectionCard title="Calendar View" icon={CalendarDays}>
      <div className="mb-5 flex gap-2">
        {['Daily', 'Weekly', 'Monthly'].map((label) => (
          <button
            key={label}
            onClick={() => setView(label)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${view === label ? 'bg-emerald-500 text-white' : 'bg-emerald-50 text-emerald-700/70 hover:text-emerald-900'}`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {slotsByView[view].length === 0 ? (
          <div className="rounded-xl border p-6 text-center">
            No bookings found.
          </div>
        ) : (
          slotsByView[view].map((slot) => (
            <div key={slot.time + slot.title} className="flex items-center justify-between rounded-2xl border border-emerald-100 bg-white p-4">
              <div>
                <p className="font-semibold text-emerald-900">{slot.time}</p>
                <p className="text-sm font-medium text-emerald-700">
                  {slot.title}
                </p>

                {slot.date && (
                  <p className="text-xs text-slate-500">
                    {new Date(slot.date).toLocaleDateString()}
                  </p>
                )}
              </div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-700">{slot.status}</span>
            </div>
          ))
        )}
      </div>
    </SectionCard>
  )
}

export function EarningsDashboard({ earnings = 0, bookings = [] }) {
  const confirmedRevenue = bookings
    .filter((b) => b.status === 'Confirmed' || b.status === 'Completed')
    .reduce((sum, b) => sum + Number(b.price || 0), 0)

  const totalRevenue = earnings || confirmedRevenue

  return (
    <SectionCard title="Earnings Dashboard" icon={IndianRupee}>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          ['Total Revenue', `₹${totalRevenue}`],
          ['Confirmed Bookings', bookings.filter((b) => b.status === 'Confirmed').length],
          ['Completed Bookings', bookings.filter((b) => b.status === 'Completed').length],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-emerald-100 bg-white p-4">
            <p className="text-sm text-emerald-700/60">{label}</p>
            <p className="mt-2 text-2xl font-semibold text-emerald-950">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={revenueData}>
            <CartesianGrid stroke="rgba(16,185,129,0.12)" vertical={false} />
            <XAxis dataKey="name" stroke="rgba(6,78,59,0.5)" />
            <YAxis stroke="rgba(6,78,59,0.5)" />
            <Tooltip content={<ChartTooltip />} />
            <Area type="monotone" dataKey="revenue" stroke="#10b981" fill="#10b98133" strokeWidth={3} />
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
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600"
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
          className="mb-5 grid gap-3 overflow-hidden rounded-2xl border border-emerald-200 bg-emerald-50 p-4 sm:grid-cols-3"
        >
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Customer name"
            className="rounded-xl border border-emerald-200 bg-white px-3 py-2.5 text-sm text-emerald-900 outline-none placeholder:text-emerald-700/35"
          />
          <input
            value={form.bookings}
            onChange={(e) => setForm({ ...form, bookings: e.target.value })}
            placeholder="Bookings"
            type="number"
            className="rounded-xl border border-emerald-200 bg-white px-3 py-2.5 text-sm text-emerald-900 outline-none placeholder:text-emerald-700/35"
          />
          <input
            value={form.spend}
            onChange={(e) => setForm({ ...form, spend: e.target.value })}
            placeholder="e.g. Rs. 5,000"
            className="rounded-xl border border-emerald-200 bg-white px-3 py-2.5 text-sm text-emerald-900 outline-none placeholder:text-emerald-700/35"
          />
          <button
            type="submit"
            className="sm:col-span-3 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-600"
          >
            Save Customer
          </button>
        </motion.form>
      )}

      <label className="mb-5 flex items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/60 px-4 py-3 text-emerald-700/60">
        <Search size={18} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search customers by name"
          className="w-full bg-transparent text-sm text-emerald-900 outline-none placeholder:text-emerald-700/40"
        />
      </label>

      <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <p className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6 text-center text-sm text-emerald-700/50">
              No customers found.
            </p>
          ) : (
            filtered.map((customer) => (
              <div
                key={customer.name}
                className="flex items-center justify-between gap-3 rounded-2xl border border-emerald-100 bg-white p-4"
              >
                <div>
                  <p className="font-semibold text-emerald-900">{customer.name}</p>
                  <p className="mt-1 text-sm text-emerald-700/60">{customer.bookings} bookings · {customer.spend}</p>
                </div>
                <button
                  onClick={() => onRemove?.(customer.name)}
                  className="rounded-xl border border-red-200 bg-red-50 p-2 text-red-500 transition hover:bg-red-100"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))
          )}
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={customerGrowthData}>
            <CartesianGrid stroke="rgba(16,185,129,0.12)" vertical={false} />
            <XAxis dataKey="name" stroke="rgba(6,78,59,0.5)" />
            <YAxis stroke="rgba(6,78,59,0.5)" />
            <Tooltip content={<ChartTooltip />} />
            <Area type="monotone" dataKey="customers" stroke="#0d9488" fill="#0d948833" strokeWidth={3} />
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
        <strong className="text-5xl text-emerald-950">4.8</strong>
        <div>
          <div className="flex text-emerald-500">{[1, 2, 3, 4, 5].map((item) => <Star key={item} size={18} fill="currentColor" />)}</div>
          <p className="mt-1 text-sm text-emerald-700/60">Based on 312 reviews</p>
        </div>
      </div>
      <div className="space-y-3">
        {reviews.map((review) => (
          <div key={review.name} className="rounded-2xl border border-emerald-100 bg-white p-4">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-emerald-900">{review.name}</p>
              <span className="text-sm text-emerald-600">{review.rating}.0</span>
            </div>
            <p className="mt-2 text-sm text-emerald-700/70">{review.text}</p>
            <button className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600">
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
          <div key={insight} className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-800">
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
        <p className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6 text-center text-sm text-emerald-700/50">
          You're all caught up.
        </p>
      ) : (
        <div className="space-y-3">
          {notifications.map((item) => (
            <div key={item.title} className="flex items-start justify-between gap-3 rounded-2xl border border-emerald-100 bg-white p-4">
              <div>
                <p className="font-semibold text-emerald-900">{item.title}</p>
                <p className="mt-1 text-sm text-emerald-700/60">{item.detail}</p>
              </div>
              <button
                onClick={() => onDismiss?.(item.title)}
                className="rounded-lg p-1 text-emerald-700/40 transition hover:text-emerald-900"
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
            <span className="mt-1 h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_18px_rgba(16,185,129,0.5)]" />
            <div>
              <p className="text-sm text-emerald-800">{item}</p>
              <p className="mt-1 text-xs text-emerald-700/40">{index + 1} min ago</p>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  )
}