import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

export default function Resume({ isOpen, onClose }) {
  const { isDark } = useTheme()

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9998] flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 backdrop-blur-md"
            style={{ background: isDark ? 'rgba(10,10,15,0.95)' : 'rgba(250,248,255,0.96)' }} />

          {/* Header bar */}
          <motion.div
            className="relative z-10 flex items-center justify-between px-6 py-4"
            style={{ borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.10)' : '#DDD0F8'}` }}
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center text-sm">
                📄
              </div>
              <div>
                <h2 className="text-base font-bold"
                  style={{ color: isDark ? '#f1f5f9' : '#1E1033' }}>Resume</h2>
                <p className="text-[11px]"
                  style={{ color: isDark ? '#64748b' : '#9180b8' }}>Prithviraj Singh Chouhan</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="/Resume.pdf"
                download
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold
                  transition-all duration-300 shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #7C3AED, #4A1D96)',
                  color: '#ffffff',
                }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download PDF
              </a>

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all"
                style={{
                  background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(124,58,237,0.06)',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.10)' : '#DDD0F8'}`,
                  color: isDark ? '#94a3b8' : '#7C3AED',
                }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </motion.div>

          {/* PDF Embed */}
          <motion.div
            className="relative z-10 flex-1 p-4 sm:p-6 overflow-hidden"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, type: 'spring', stiffness: 200, damping: 25 }}
          >
            <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl"
              style={{
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.10)' : '#DDD0F8'}`,
                minHeight: '70vh',
              }}
            >
              <iframe
                src="/Resume.pdf"
                title="Resume"
                className="w-full h-full"
                style={{ minHeight: '70vh', border: 'none' }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
