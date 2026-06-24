import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import FadeUp from './FadeUp'
import SmartImage from './SmartImage'

export default function ForPlayers() {
  return (
    <section id="solutions" className="bg-deepgreen-700 py-24 md:py-32">
      <div className="container-x grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <FadeUp className="order-2 lg:order-1">
          <span className="section-label">For Players</span>

          <h2 className="heading-md mt-6">
            Real-Time Slot Booking within Seconds.
          </h2>

          <p className="body-text mt-5 max-w-lg">
            Never call a venue again. Browse live availability across 500+
            premium arenas. Secure your spot with instant digital
            confirmation and secure payments.
          </p>

          <ul className="mt-8 space-y-4">
            <motion.li
              className="flex items-start gap-3"
              whileHover={{ x: 6 }}
              transition={{ duration: 0.2 }}
            >
              <CheckCircle2
                className="mt-0.5 shrink-0 text-emerald-300"
                size={22}
              />
              <span className="text-base text-white/75">
                Instant Booking Confirmation
              </span>
            </motion.li>

            <motion.li
              className="flex items-start gap-3"
              whileHover={{ x: 6 }}
              transition={{ duration: 0.2 }}
            >
              <CheckCircle2
                className="mt-0.5 shrink-0 text-emerald-300"
                size={22}
              />
              <span className="text-base text-white/75">
                Skill-Based Player Matching
              </span>
            </motion.li>
          </ul>
        </FadeUp>

        <FadeUp delay={0.1} className="order-1 lg:order-2">
          <motion.div
            className="relative mx-auto w-full max-w-[700px]"
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
          >
            <div className="overflow-hidden rounded-2xl shadow-premium ring-1 ring-white/[0.06]">
             <SmartImage
  src="/images/player-booking.jpg"
  alt="Booking Dashboard"
  className="aspect-[4/3] w-full max-h-[500px]"
/>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.04 }}
              className="glass-card absolute -bottom-4 -left-4 hidden w-56 px-5 py-4 shadow-premium sm:block"
            >
              <p className="text-xs uppercase tracking-widest2 text-white/40">
                Next Slot
              </p>

              <p className="mt-1 font-display text-lg font-semibold text-offwhite">
                Badminton · 7:30 PM
              </p>

              <p className="mt-1 text-xs text-emerald-300">
                Confirmed instantly
              </p>
            </motion.div>
          </motion.div>
        </FadeUp>
      </div>
    </section>
  )
}