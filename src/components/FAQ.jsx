import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import FadeUp from './FadeUp'
import { FAQS } from '../data/content'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="bg-deepgreen-700 py-24 text-offwhite md:py-32">
      <div className="container-x">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.4fr]">
          <FadeUp>
            <span className="section-label">
              Support Center
            </span>

            <h2 className="mt-6 font-display text-3xl font-semibold leading-tight tracking-tight text-offwhite md:text-5xl">
              Frequently Asked Questions
            </h2>

            <p className="mt-5 max-w-md text-base leading-relaxed text-white/65 md:text-lg">
              Everything you need to know about booking sports venues and
              managing your sports facilities with BookMyTurf.
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-md">
              {FAQS.map((faq, i) => {
                const isOpen = openIndex === i

                return (
                  <motion.div
                    key={faq.question}
                    className="border-b border-white/[0.08] px-6 last:border-b-0 md:px-8"
                    whileHover={{
                      backgroundColor: 'rgba(255,255,255,0.02)',
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <button
                      className="flex w-full items-center justify-between gap-4 py-6 text-left"
                      onClick={() => setOpenIndex(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                    >
                      <span className="font-display text-base font-semibold text-offwhite md:text-lg">
                        {faq.question}
                      </span>

                      <motion.span
                        animate={{
                          rotate: isOpen ? 45 : 0,
                          scale: isOpen ? 1.1 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/[0.05] text-emerald-300"
                      >
                        <Plus size={18} />
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{
                            height: 0,
                            opacity: 0,
                          }}
                          animate={{
                            height: 'auto',
                            opacity: 1,
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                          }}
                          transition={{
                            duration: 0.35,
                            ease: 'easeInOut',
                          }}
                          className="overflow-hidden"
                        >
                          <motion.p
                            initial={{ y: -10 }}
                            animate={{ y: 0 }}
                            exit={{ y: -10 }}
                            transition={{ duration: 0.25 }}
                            className="pb-6 text-sm leading-relaxed text-white/65 md:text-base"
                          >
                            {faq.answer}
                          </motion.p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}