import { motion } from 'framer-motion'
import { Send } from 'lucide-react'

const PLATFORM_LINKS = ['Find Venues', 'Partner Portal', 'API Access']
const COMPANY_LINKS = ['Mission', 'Press', 'Security']

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-deepgreen-700">
      <div className="container-x py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <motion.a
              href="#top"
              className="font-display text-xl font-bold tracking-tight text-offwhite"
              whileHover={{ scale: 1.03 }}
            >
              BookMy<span className="text-emerald-300">Turf</span>
            </motion.a>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/45">
              Setting the global standard for sports facility management and
              athlete engagement. Precision in Every Play.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest2 text-white/40">
              Platform
            </p>

            <ul className="mt-5 space-y-3">
              {PLATFORM_LINKS.map((link) => (
                <li key={link}>
                  <motion.a
                    href="#"
                    className="text-sm text-white/60 transition-colors hover:text-emerald-300"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest2 text-white/40">
              Company
            </p>

            <ul className="mt-5 space-y-3">
              {COMPANY_LINKS.map((link) => (
                <li key={link}>
                  <motion.a
                    href="#"
                    className="text-sm text-white/60 transition-colors hover:text-emerald-300"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-white/[0.06] pt-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest2 text-white/40">
                Stay in the loop
              </p>

              <p className="mt-2 text-sm text-white/45">
                Get product updates and venue launches in your inbox.
              </p>
            </div>

            <motion.form
              onSubmit={(e) => e.preventDefault()}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              className="flex w-full max-w-md items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] p-1.5"
            >
              <input
                type="email"
                required
                placeholder="you@email.com"
                className="w-full bg-transparent px-4 py-2 text-sm text-offwhite placeholder:text-white/30 focus:outline-none"
              />

              <motion.button
                type="submit"
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="flex shrink-0 items-center gap-2 rounded-full bg-emerald-300 px-5 py-2.5 text-sm font-semibold text-deepgreen-700 transition-colors hover:bg-white"
              >
                Send
                <Send size={14} />
              </motion.button>
            </motion.form>
          </div>
        </div>

        <div className="mt-10 border-t border-white/[0.06] pt-8">
          <p className="text-xs text-white/35">
            © 2024 BookMyTurf Technologies Global.
          </p>
        </div>
      </div>
    </footer>
  )
}