import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText } from 'lucide-react'

// ─── Navigation links ──────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: 'About',    href: '#about'    },
  { label: 'Skills',   href: '#skills'   },
  { label: 'Projects', href: '#projects' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Certificates', href: '#certs' },
  { label: 'Contact',  href: '#contact'  },
]

export default function Navbar({ onResumeClick }) {
  const [scrolled,  setScrolled]  = useState(false)
  const [active,    setActive]    = useState('')
  const [menuOpen,  setMenuOpen]  = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30)

      // Determine active section
      const sections = NAV_LINKS.map(l => l.href.replace('#', ''))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (e, href) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 glass-nav"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#hero"
          onClick={e => handleNav(e, '#hero')}
          className="text-2xl font-bold font-poppins tracking-tight flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-white">My</span>
          <span className="gradient-text">Portfolio</span>
        </motion.a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, href }) => {
            const id = href.replace('#', '')
            const isActive = active === id
            return (
              <li key={label}>
                <a
                  href={href}
                  onClick={e => handleNav(e, href)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300
                    ${isActive
                      ? 'text-white'
                      : 'text-slate-400 hover:text-white'
                    }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg bg-white/10 border border-white/10"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                </a>
              </li>
            )
          })}

          {/* Resume button — special nav item */}
          <li>
            <button
              onClick={onResumeClick}
              className="relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300
                text-slate-400 hover:text-white"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-rose-400" />
                Resume
              </span>
            </button>
          </li>
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          onClick={e => handleNav(e, '#contact')}
          className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold
            bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500
            text-white transition-all duration-300 shadow-lg hover:shadow-purple-500/30"
        >
          Hire Me
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <div className="flex flex-col gap-1.5 w-6">
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="block h-0.5 bg-current rounded-full"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block h-0.5 bg-current rounded-full"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="block h-0.5 bg-current rounded-full"
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t border-white/5"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {NAV_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  onClick={e => handleNav(e, href)}
                  className="py-2.5 px-4 text-sm font-medium text-slate-300 hover:text-white
                    hover:bg-white/5 rounded-lg transition-all"
                >
                  {label}
                </a>
              ))}
              {/* Resume in mobile menu */}
              <button
                onClick={() => { setMenuOpen(false); onResumeClick?.() }}
                className="flex items-center gap-2 py-2.5 px-4 text-sm font-medium text-slate-300 hover:text-white
                  hover:bg-white/5 rounded-lg transition-all text-left w-full"
              >
                <FileText className="w-4 h-4 text-rose-400" />
                Resume
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
