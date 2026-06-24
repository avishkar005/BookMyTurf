import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Sports', href: '#sports' },
  { label: 'Solutions', href: '#solutions' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? 'border-b border-white/[0.06] bg-deepgreen-700/70 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="container-x flex h-[76px] items-center justify-between">
        <a href="#top" className="font-display text-xl font-bold tracking-tight text-offwhite">
          BookMy<span className="text-emerald-300">Turf</span>
        </a>

        <nav className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-white/65 transition-colors hover:text-offwhite"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link to="/login" className="btn-primary">
            Book Now
            <ArrowUpRight size={16} />
          </Link>
        </div>

        <button
          className="text-offwhite md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="border-t border-white/[0.06] bg-deepgreen-700/95 backdrop-blur-xl md:hidden"
        >
          <div className="container-x flex flex-col gap-5 py-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-white/70 hover:text-offwhite"
              >
                {link.label}
              </a>
            ))}

            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="btn-primary w-full"
            >
              Book Now
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  )
}