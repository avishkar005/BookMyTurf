import { motion } from 'framer-motion'
import FadeUp from './FadeUp'
import { STEPS } from '../data/content'

export default function HowItWorks() {
  return (
    <section className="bg-deepgreen-700 py-24 md:py-32">
      <div className="container-x">
        <FadeUp className="max-w-2xl">
          <h2 className="heading-md">Your Journey to the Field</h2>
        </FadeUp>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <FadeUp key={step.step} delay={i * 0.08}>
              <motion.div
                whileHover={{
                  y: -8,
                  scale: 1.03,
                }}
                transition={{
                  duration: 0.3,
                  ease: 'easeOut',
                }}
                className="glass-card group relative h-full px-7 py-9 transition-colors duration-300 hover:border-emerald-300/20"
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="font-display text-sm font-semibold text-emerald-300/70"
                >
                  {step.step}
                </motion.span>

                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="mt-6 font-display text-xl font-semibold text-offwhite md:text-2xl"
                >
                  {step.title}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-3 text-sm leading-relaxed text-white/55 md:text-base"
                >
                  {step.description}
                </motion.p>

                {i < STEPS.length - 1 && (
                  <div className="absolute right-0 top-1/2 hidden h-px w-6 -translate-y-1/2 translate-x-6 bg-white/10 lg:block" />
                )}
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}