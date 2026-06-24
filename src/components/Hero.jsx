import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import SmartImage from './SmartImage'
import { HERO_SPORTS } from '../data/content'
import Counter from './Counter'

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-deepgreen-700 pt-[76px]"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <SmartImage src="/images/hero-bg.jpg" alt="Sports Venue Background" className="h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-r from-deepgreen-700 via-deepgreen-700/85 to-deepgreen-700/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-deepgreen-700 via-transparent to-deepgreen-700/40" />
      </div>

      <div className="container-x relative grid min-h-[88vh] grid-cols-1 items-center gap-10 py-20 lg:grid-cols-[1fr_0.95fr] lg:py-0">
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <motion.span
            className="section-label"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            Sports Venue Collage
          </motion.span>

          <motion.h1
            className="heading-lg mt-6 max-w-2xl"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            Book Your Perfect Sports Venue.
            <br />
            <span className="text-emerald-300">Play Without Limits.</span>
          </motion.h1>

          <motion.p
            className="body-text mt-6 max-w-md"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
          >
            Instant access to premium courts, fields, and pools. Join over
            50k+ players dominating the game with India's most advanced
            sports tech platform.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            <motion.a
              href="#sports"
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Find a Venue
              <ArrowRight size={16} />
            </motion.a>

            <motion.a
              href="#solutions"
              className="btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              List Your Arena
              <ArrowUpRight size={16} />
            </motion.a>
          </motion.div>

          <motion.div
            className="mt-14 flex items-center gap-8 border-t border-white/[0.08] pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <p className="font-display text-3xl font-bold text-offwhite">
  <Counter end={50} suffix="K+" />
</p>
              <p className="mt-1 text-sm text-white/50">Active Players</p>
            </motion.div>

            <div className="h-10 w-px bg-white/10" />

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95 }}
            >
              <p className="font-display text-3xl font-bold text-offwhite">
  <Counter end={500} suffix="+" />
</p>
              <p className="mt-1 text-sm text-white/50">Premium Arenas</p>
            </motion.div>

            <div className="h-10 w-px bg-white/10" />

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              <p className="font-display text-3xl font-bold text-offwhite">
  <Counter end={10} />
</p>
              <p className="mt-1 text-sm text-white/50">Sports Covered</p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right collage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1,
            delay: 0.3,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
          className="relative hidden h-[560px] w-full overflow-hidden lg:block"
        >
          <div className="grid h-full w-full grid-cols-3 grid-rows-3 gap-3">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="col-span-2 row-span-2 overflow-hidden rounded-2xl shadow-premium"
            >
              <SmartImage
                src={`/images/${HERO_SPORTS[0].toLowerCase()}.jpg`}
                alt={HERO_SPORTS[0]}
                className="h-full w-full"
                imgClassName="transition-transform duration-700 hover:scale-105"
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="col-span-1 row-span-1 overflow-hidden rounded-2xl shadow-premium"
            >
              <SmartImage
                src={`/images/${HERO_SPORTS[1].toLowerCase().replace(' ', '-')}.jpg`}
                alt={HERO_SPORTS[1]}
                className="h-full w-full"
                imgClassName="transition-transform duration-700 hover:scale-105"
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="col-span-1 row-span-1 overflow-hidden rounded-2xl shadow-premium"
            >
              <SmartImage
                src={`/images/${HERO_SPORTS[2].toLowerCase().replace(' ', '-')}.jpg`}
                alt={HERO_SPORTS[2]}
                className="h-full w-full"
                imgClassName="transition-transform duration-700 hover:scale-105"
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="col-span-1 row-span-1 overflow-hidden rounded-2xl shadow-premium"
            >
              <SmartImage
                src={`/images/${HERO_SPORTS[3].toLowerCase().replace(' ', '-')}.jpg`}
                alt={HERO_SPORTS[3]}
                className="h-full w-full"
                imgClassName="transition-transform duration-700 hover:scale-105"
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="col-span-2 row-span-1 overflow-hidden rounded-2xl shadow-premium"
            >
              <SmartImage
                src={`/images/${HERO_SPORTS[4].toLowerCase().replace(' ', '-')}.jpg`}
                alt={HERO_SPORTS[4]}
                className="h-full w-full"
                imgClassName="transition-transform duration-700 hover:scale-105"
              />
            </motion.div>
          </div>

          {/* Floating glass badge */}
         {/* Floating glass badge */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{
    opacity: 1,
    y: [0, -8, 0],
  }}
  transition={{
    opacity: {
      duration: 0.8,
      delay: 0.9,
    },
    y: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  }}
  whileHover={{ scale: 1.05 }}
  className="glass-card absolute -left-6 bottom-6 flex items-center gap-3 px-5 py-4 shadow-premium"
>
  <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-300" />
  <div>
    <p className="text-sm font-semibold text-offwhite">Live Booking</p>
    <p className="text-xs text-white/50">
      Pickleball · Court 3 · 6:00 PM
    </p>
  </div>
 </motion.div>
        </motion.div>
      </div>
    </section>
  )
}