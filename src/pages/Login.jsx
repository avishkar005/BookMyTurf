import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { createSession, findUser, isOwnerLogin } from '../lib/auth'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()

  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [message] = useState(location.state?.message || '')

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (!form.email.trim() || !form.password.trim()) {
      setError('Please enter email and password.')
      return
    }

    if (isOwnerLogin(form.email, form.password)) {
      createSession({
        name: 'Turf Owner',
        email: form.email.trim().toLowerCase(),
        role: 'owner',
      })
      navigate('/owner-dashboard')
      return
    }

    const user = findUser(form.email, form.password)

    if (!user) {
      setError('Invalid credentials. Please register first or check your password.')
      return
    }

    createSession(user)
    navigate('/user-dashboard')
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
            Welcome Back
          </h1>
          <p className="mt-3 text-white/60">
            Login to continue your sports journey.
          </p>
        </div>

        {message && (
          <p className="mb-5 rounded-xl border border-emerald-300/30 bg-emerald-300/10 px-4 py-3 text-sm text-emerald-100">
            {message}
          </p>
        )}

        {error && (
          <p className="mb-5 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
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
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white/60">
          Don't have an account?{' '}
          <Link to="/signup" className="font-semibold text-emerald-300 hover:text-white">
            Sign Up
          </Link>
        </p>

        <Link to="/" className="mt-6 block text-center text-sm text-white/40 hover:text-white">
          Back to Home
        </Link>
      </motion.div>
    </div>
  )
}
