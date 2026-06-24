import { motion } from 'framer-motion'
import FadeUp from './FadeUp'
import SmartImage from './SmartImage'
import { ABOUT_FEATURES } from '../data/content'

export default function About() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0">
        <SmartImage
          src="/images/about-bg.jpg"
          alt="Sports Infrastructure"
          className="h-full w-full"
          imgClassName="transition-transform duration-[4000ms] hover:scale-105"
        />
        <div className="absolute inset-0 bg-deepgreen-900/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-deepgreen-700 via-deepgreen-900/60 to-deepgreen-900/70" />
      </div>

      <div className="container-x relative">
        <FadeUp className="max-w-2xl">
          <span className="section-label">Our Vision</span>

          <h2 className="heading-md mt-6">
            The Future of Physical Play.
          </h2>

          <p className="body-text mt-5">
            BookMyTurf isn't just a marketplace. We are the athletic
            infrastructure of the digital age. Our mission is to make
            professional-grade sports facilities accessible to every
            athlete, everywhere.
          </p>
        </FadeUp>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ABOUT_FEATURES.map((feature, i) => (
            <FadeUp key={feature.title} delay={i * 0.07}>
              <motion.div
                whileHover={{
                  y: -8,
                  scale: 1.03,
                }}
                transition={{
                  duration: 0.3,
                  ease: 'easeOut',
                }}
                className="glass-card h-full px-6 py-7"
              >
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="font-display text-lg font-semibold text-offwhite md:text-xl"
                >
                  {feature.title}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="mt-3 text-sm leading-relaxed text-white/55"
                >
                  {feature.description}
                </motion.p>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}