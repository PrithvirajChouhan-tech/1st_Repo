import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Brain } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import { useTheme } from '../context/ThemeContext'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Certificates', href: '#certs' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar({ onResumeClick }) {
  const { isDark } = useTheme()
  const [active, setActive] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const sections = NAV_LINKS.map(l => l.href.replace('#', ''))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(sections[i]); break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (e, href) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  // Always white text on navbar (both modes use dark/purple nav bg)
  const linkInactive = 'rgba(255,255,255,0.82)'
  const linkActive = '#ffffff'
  const linkHoverBg = 'rgba(255,255,255,0.12)'

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 glass-nav"
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo — always white on purple nav */}
        <motion.a
          href="#hero"
          onClick={e => handleNav(e, '#hero')}
          className="text-2xl font-bold font-poppins tracking-tight flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg shadow-purple-500/20">
            <Brain className="w-6 h-6 text-white" strokeWidth={2.5} />
          </div>
          <div className="flex items-center gap-1">
            <span style={{ color: '#ffffff' }}>My</span>
            <span style={{ color: isDark ? '#a78bfa' : '#FCD34D' }}>Portfolio</span>
          </div>
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
                  className="relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 block"
                  style={{
                    color: '#ffffff',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = '1' }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = isActive ? '1' : '0.88' }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg"
                      style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.25)' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{label}</span>
                </a>
              </li>
            )
          })}

          {/* Resume */}
          <li>
            <button
              onClick={onResumeClick}
              className="relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200"
              style={{ color: linkInactive }}
              onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
              onMouseLeave={e => e.currentTarget.style.color = linkInactive}
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <FileText className="w-4 h-4" style={{ color: '#F87171' }} />
                Resume
              </span>
            </button>
          </li>
        </ul>

        {/* Right: mode label + Toggle + Hire Me */}
        <div className="hidden md:flex items-center gap-3">
          {/* Light / Dark label */}
          <span style={{
            color: 'rgba(255,255,255,0.80)',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            userSelect: 'none',
          }}>{isDark ? 'Dark' : 'Light'}</span>
          <ThemeToggle />
          {/* Hire Me — emerald green, premium look on purple nav */}
          <a
            href="#contact"
            onClick={e => handleNav(e, '#contact')}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold transition-all duration-300"
            style={{
              background: isDark ? 'linear-gradient(135deg,#7c3aed,#8b5cf6)' : '#ffffff',
              color: isDark ? '#ffffff' : '#000000',
              boxShadow: isDark ? '0 4px 14px rgba(124,58,237,0.40)' : '0 4px 14px rgba(0,0,0,0.12)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = isDark ? 'linear-gradient(135deg,#6d28d9,#7c3aed)' : '#f0f0f0'
              e.currentTarget.style.boxShadow = isDark ? '0 4px 20px rgba(124,58,237,0.55)' : '0 4px 20px rgba(0,0,0,0.18)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = isDark ? 'linear-gradient(135deg,#7c3aed,#8b5cf6)' : '#ffffff'
              e.currentTarget.style.boxShadow = isDark ? '0 4px 14px rgba(124,58,237,0.40)' : '0 4px 14px rgba(0,0,0,0.12)'
            }}
          >
            Hire Me
          </a>
        </div>

        {/* Mobile toggle + burger */}
        <div className="md:hidden flex items-center gap-2">
          <span style={{ 
            color: 'rgba(255,255,255,0.80)', 
            fontSize: '10px', 
            fontWeight: 600, 
            letterSpacing: '0.06em', 
            textTransform: 'uppercase', 
            userSelect: 'none',
            width: '38px',
            textAlign: 'center',
            display: 'inline-block'
          }}>
            {isDark ? 'Dark' : 'Light'}
          </span>
          <ThemeToggle />
          <button
            style={{ color: 'rgba(255,255,255,0.90)', padding: '4px' }}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1.5 w-6">
              <motion.span animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="block h-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.90)' }} />
              <motion.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block h-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.90)' }} />
              <motion.span animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="block h-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.90)' }} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden"
            style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {NAV_LINKS.map(({ label, href }) => (
                <a key={label} href={href} onClick={e => handleNav(e, href)}
                  className="py-2.5 px-4 text-sm font-medium rounded-lg transition-all"
                  style={{ color: 'rgba(255,255,255,0.85)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.10)'; e.currentTarget.style.color = '#ffffff' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.85)' }}
                >
                  {label}
                </a>
              ))}
              <button
                onClick={() => { setMenuOpen(false); onResumeClick?.() }}
                className="flex items-center gap-2 py-2.5 px-4 text-sm font-medium rounded-lg transition-all text-left w-full"
                style={{ color: 'rgba(255,255,255,0.85)' }}
              >
                <FileText className="w-4 h-4" style={{ color: '#F87171' }} />
                Resume
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
