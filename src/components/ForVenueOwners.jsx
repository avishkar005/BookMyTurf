import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import FadeUp from './FadeUp'
import SmartImage from './SmartImage'

export default function ForVenueOwners() {
  return (
    <section className="bg-deepgreen-700 py-24 md:py-32">
      <div className="container-x grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <FadeUp>
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden rounded-2xl shadow-premium ring-1 ring-white/[0.06]"
          >
            <SmartImage
              src="/images/venue-owner.jpg"
              alt="Venue Management Dashboard"
              className="aspect-[4/3] w-full"
              imgClassName="transition-transform duration-700 hover:scale-105"
            />
          </motion.div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <span className="section-label">For Venue Owners</span>

          <h2 className="heading-md mt-6">
            Elite Arena Management Suite.
          </h2>

          <p className="body-text mt-5 max-w-lg">
            Transform your facility into a high-performance business.
            Automated billing, dynamic pricing, and deep analytics to
            maximize your revenue per square foot.
          </p>

          <motion.a
            href="#contact"
            className="btn-primary mt-9"
            whileHover={{
              scale: 1.05,
              y: -2,
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            Partner With Us
            <ArrowUpRight size={16} />
          </motion.a>
        </FadeUp>
      </div>
    </section>
  )
}