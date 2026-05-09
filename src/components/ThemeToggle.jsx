import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

function SunIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2"  x2="12" y2="4" />
      <line x1="12" y1="20" x2="12" y2="22" />
      <line x1="2"  y1="12" x2="4"  y2="12" />
      <line x1="20" y1="12" x2="22" y2="12" />
      <line x1="4.93"  y1="4.93"  x2="6.34"  y2="6.34" />
      <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
      <line x1="4.93"  y1="19.07" x2="6.34"  y2="17.66" />
      <line x1="17.66" y1="6.34"  x2="19.07" y2="4.93" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75
        0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21
        a9.753 9.753 0 009.002-5.998z" />
    </svg>
  )
}

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      id="theme-toggle"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? '☀️ Switch to Light Mode' : '🌙 Switch to Dark Mode'}
      style={{
        display: 'inline-flex', alignItems: 'center',
        width: '52px', height: '28px', borderRadius: '999px',
        padding: '3px', cursor: 'pointer', border: 'none', outline: 'none', flexShrink: 0,
        /* Full golden yellow in light mode */
        background: isDark
          ? 'linear-gradient(135deg,#1e1b4b,#4c1d95)'
          : 'linear-gradient(135deg,#F59E0B,#FCD34D)',
        boxShadow: isDark
          ? '0 0 0 1px rgba(139,92,246,0.40),0 2px 8px rgba(0,0,0,0.5)'
          : '0 0 0 2px rgba(245,158,11,0.30),0 2px 14px rgba(245,158,11,0.50)',
        transition: 'background 0.35s ease,box-shadow 0.35s ease',
      }}>

      <motion.div
        animate={{ x: isDark ? 24 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        style={{
          width: '22px', height: '22px', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          background: isDark ? '#c4b5fd' : '#FFFFFF',
          boxShadow: isDark
            ? '0 1px 4px rgba(0,0,0,0.40)'
            : '0 1px 6px rgba(0,0,0,0.20)',
          color: isDark ? '#4c1d95' : '#D97706',
        }}>
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.span key="moon"
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0,   opacity: 1, scale: 1 }}
              exit={{   rotate:  90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MoonIcon />
            </motion.span>
          ) : (
            <motion.span key="sun"
              initial={{ rotate: 90,  opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0,   opacity: 1, scale: 1 }}
              exit={{   rotate: -90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <SunIcon />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </button>
  )
}
