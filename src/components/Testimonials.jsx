import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import FadeUp from './FadeUp'
import SmartImage from './SmartImage'
import { TESTIMONIALS } from '../data/content'

export default function Testimonials() {
  return (
    <section className="bg-deepgreen-700 py-24 md:py-32">
      <div className="container-x">
        <FadeUp className="max-w-2xl">
          <h2 className="heading-md">The Community Speaks</h2>
        </FadeUp>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <FadeUp key={t.name} delay={i * 0.08}>
              <motion.div
                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}
                transition={{
                  duration: 0.3,
                  ease: 'easeOut',
                }}
                className="glass-card flex h-full flex-col justify-between px-7 py-9"
              >
                <div>
                  <motion.div
                    initial={{ opacity: 0, rotate: -15 }}
                    whileInView={{ opacity: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <Quote className="text-emerald-300/60" size={28} />
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mt-5 text-base leading-relaxed text-white/75"
                  >
                    "{t.quote}"
                  </motion.p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-8 flex items-center gap-4 border-t border-white/[0.06] pt-6"
                >
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    className="h-12 w-12 shrink-0 overflow-hidden rounded-full ring-1 ring-white/10"
                  >
                    <SmartImage
                      src={t.image}
                      alt={t.name}
                      className="h-full w-full"
                      imgClassName="transition-transform duration-500 hover:scale-110"
                    />
                  </motion.div>

                  <div>
                    <p className="font-display text-base font-semibold text-offwhite">
                      {t.name}
                    </p>
                    <p className="text-sm text-white/45">
                      {t.role} · {t.detail}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}