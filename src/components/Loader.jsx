import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

// ─── Loading Screen ────────────────────────────────────────────────────────
export default function Loader({ onComplete }) {
  // Keep a stable ref so the useEffect never re-runs due to prop changes
  const doneRef = useRef(onComplete)
  useEffect(() => { doneRef.current = onComplete }, [onComplete])

  useEffect(() => {
    const timer = setTimeout(() => doneRef.current?.(), 2000)
    return () => clearTimeout(timer)
  }, []) // runs once only

  return (
    <motion.div
      key="loader"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: '#0a0a0f' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated rings */}
      <div className="relative mb-10 flex items-center justify-center w-24 h-24">
        <motion.div
          className="absolute w-24 h-24 rounded-full border border-blue-500/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute w-16 h-16 rounded-full border border-purple-500/40"
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute w-8 h-8 rounded-full border border-cyan-500/50"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
        {/* Center dot */}
        <motion.div
          className="w-3 h-3 rounded-full bg-blue-500"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ boxShadow: '0 0 16px #3b82f6' }}
        />
      </div>

      {/* Name */}
      <motion.h1
        className="text-2xl font-bold font-poppins mb-1"
        style={{ background: 'linear-gradient(135deg,#3b82f6,#8b5cf6,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Prithviraj Singh Chouhan
      </motion.h1>
      <motion.p
        className="text-sm mb-8"
        style={{ color: '#64748b' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        AI & Machine Learning Student
      </motion.p>

      {/* Progress bar */}
      <div style={{ width: 180, height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 99, overflow: 'hidden' }}>
        <motion.div
          style={{ height: '100%', borderRadius: 99, background: 'linear-gradient(90deg,#3b82f6,#8b5cf6,#06b6d4)' }}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  )
}
