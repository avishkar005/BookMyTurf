import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../lib/auth'

export default function Signup() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      setError('Please fill all fields.')
      return
    }

    const result = await registerUser(form)

    if (!result.ok) {
      setError(result.message)
      return
    }

    navigate('/login', {
      state: { message: 'Registration successful. Please login now.' },
    })
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-deepgreen-700 px-6">
      <div className="absolute inset-0 bg-gradient-to-br from-deepgreen-700 via-deepgreen-600 to-black opacity-90" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card relative z-10 w-full max-w-md p-8"
      >
        <div className="mb-8 text-center">
          <h1 className="font-display text-4xl font-semibold text-offwhite">
            Create Account
          </h1>
          <p className="mt-3 text-white/60">
            Join India's fastest growing sports community.
          </p>
        </div>

        {error && (
          <p className="mb-5 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm text-white/60">
              Full Name
            </label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-offwhite focus:border-emerald-300/50 focus:outline-none"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-white/60">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-offwhite focus:border-emerald-300/50 focus:outline-none"
              placeholder="you@email.com"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-white/60">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-offwhite focus:border-emerald-300/50 focus:outline-none"
              placeholder="********"
            />
          </div>

          <button type="submit" className="btn-primary w-full">
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white/60">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-emerald-300 hover:text-white"
          >
            Login
          </Link>
        </p>

        <Link
          to="/"
          className="mt-6 block text-center text-sm text-white/40 hover:text-white"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  )
}