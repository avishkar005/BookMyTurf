import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, MapPin, Mail } from 'lucide-react'
import FadeUp from './FadeUp'

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" className="bg-deepgreen-700 py-24 md:py-32">
      <div className="container-x grid grid-cols-1 gap-16 lg:grid-cols-2">
        <FadeUp>
          <span className="section-label">Background</span>

          <h2 className="heading-md mt-6">
            Let's Fuel the Game Together.
          </h2>

          <div className="mt-12 space-y-8">
            <motion.div
              className="flex gap-4"
              whileHover={{ x: 6 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/[0.04] text-emerald-300">
                <MapPin size={20} />
              </div>

              <div>
                <p className="text-sm uppercase tracking-widest2 text-white/40">
                  HQ Operations
                </p>

                <p className="mt-2 text-base text-white/75">
                  One World Center, Tower 2, Mumbai 400013
                </p>
              </div>
            </motion.div>

            <motion.div
              className="flex gap-4"
              whileHover={{ x: 6 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/[0.04] text-emerald-300">
                <Mail size={20} />
              </div>

              <div>
                <p className="text-sm uppercase tracking-widest2 text-white/40">
                  Corporate
                </p>

                <a
                  href="mailto:partners@bookmyturf.tech"
                  className="mt-2 block text-base text-white/75 hover:text-emerald-300"
                >
                  partners@bookmyturf.tech
                </a>
              </div>
            </motion.div>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <motion.form
            onSubmit={handleSubmit}
            className="glass-card space-y-5 p-7 md:p-9"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-white/60">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-offwhite placeholder:text-white/30 focus:border-emerald-300/50 focus:outline-none focus:ring-1 focus:ring-emerald-300/30"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white/60">
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-offwhite placeholder:text-white/30 focus:border-emerald-300/50 focus:outline-none focus:ring-1 focus:ring-emerald-300/30"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white/60">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-offwhite placeholder:text-white/30 focus:border-emerald-300/50 focus:outline-none focus:ring-1 focus:ring-emerald-300/30"
                placeholder="you@email.com"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white/60">
                Tell us about your venue or inquiry
              </label>

              <textarea
                name="message"
                rows={4}
                required
                value={form.message}
                onChange={handleChange}
                className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-offwhite placeholder:text-white/30 focus:border-emerald-300/50 focus:outline-none focus:ring-1 focus:ring-emerald-300/30"
                placeholder="Share a few details..."
              />
            </div>

            <motion.button
              type="submit"
              className="btn-primary w-full"
              whileHover={{
                scale: 1.02,
                y: -2,
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              {submitted ? 'Inquiry Submitted' : 'Submit Inquiry'}
              <Send size={16} />
            </motion.button>
          </motion.form>
        </FadeUp>
      </div>
    </section>
  )
}