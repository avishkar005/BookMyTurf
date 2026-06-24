import { motion } from 'framer-motion'
import FadeUp from './FadeUp'
import SmartImage from './SmartImage'
import { SPORTS } from '../data/content'

export default function SportsEcosystem() {
  return (
    <section id="sports" className="bg-deepgreen-700 py-24 md:py-32">
      <div className="container-x">
        <FadeUp className="max-w-2xl">
          <span className="section-label">Multi-Sport Ecosystem</span>

          <h2 className="heading-md mt-6">
            One Platform, Every Sport
          </h2>

          <p className="body-text mt-5">
            Discover premium sports venues, compare facilities, check live
            availability, and book your next game instantly.
          </p>
        </FadeUp>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-5">
          {SPORTS.map((sport, i) => (
            <FadeUp key={sport.name} delay={(i % 5) * 0.06}>
              <motion.div
                whileHover={{
                  y: -8,
                  scale: 1.03,
                }}
                transition={{
                  duration: 0.3,
                  ease: 'easeOut',
                }}
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl shadow-premium ring-1 ring-white/[0.06] transition-all duration-500 hover:ring-emerald-300/30"
              >
                <SmartImage
                  src={sport.image}
                  alt={sport.name}
                  className="h-full w-full"
                  imgClassName="transition-transform duration-700 ease-out group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1,
                  }}
                  className="absolute inset-x-0 bottom-0 p-4 md:p-5"
                >
                  <p className="font-display text-lg font-semibold text-offwhite md:text-xl">
                    {sport.name}
                  </p>
                </motion.div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}