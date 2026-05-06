import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const CERTS = [
  {
    id: 1,
    title: 'C++ Programming',
    platform: 'Tutedude',
    status: 'Completed',
    statusColor: 'text-green-400',
    statusBg: 'bg-green-500/10 border-green-500/20',
    icon: '⚡',
    color: '#22c55e',
    image: '/certificates/cpp-cert.jpeg',
  },
  {
    id: 2,
    title: 'DSA with Python',
    platform: 'Tutedude',
    status: 'Completed',
    statusColor: 'text-green-400',
    statusBg: 'bg-green-500/10 border-green-500/20',
    icon: '🐍',
    color: '#22c55e',
    image: '/certificates/python-cert.jpeg',
  },
  {
    id: 3,
    title: 'Anand Mela — Stall Competition (1st Place)',
    platform: 'Acropolis Institute of Technology & Research',
    status: 'Achieved',
    statusColor: 'text-yellow-400',
    statusBg: 'bg-yellow-500/10 border-yellow-500/20',
    icon: '🏆',
    color: '#eab308',
    image: '/certificates/stall-cert-final.jpg',
  },
  {
    id: 4,
    title: 'Machine Learning Specialization',
    platform: 'Coursera (DeepLearning.AI)',
    status: 'Upcoming',
    statusColor: 'text-blue-400',
    statusBg: 'bg-blue-500/10 border-blue-500/20',
    icon: '🤖',
    color: '#3b82f6',
    image: null,
  },
]

function CertCard({ cert, index, onView }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      onClick={() => cert.image && onView(cert)}
      className={`glass rounded-2xl p-6 flex flex-col gap-4 group relative overflow-hidden transition-all duration-300 ${cert.image ? 'cursor-pointer' : 'cursor-default'}`}>
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ boxShadow: `0 0 0 1px ${cert.color}40` }} />
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ background: `radial-gradient(ellipse at top left, ${cert.color}08 0%, transparent 60%)` }} />
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
            style={{ background: `${cert.color}15`, border: `1px solid ${cert.color}25` }}>
            {cert.icon}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white leading-snug">{cert.title}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{cert.platform}</p>
          </div>
        </div>
        <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border flex-shrink-0 ${cert.statusBg} ${cert.statusColor}`}>
          {cert.status}
        </span>
      </div>
      <div className="w-full h-28 rounded-xl flex items-center justify-center border border-dashed border-white/10 relative overflow-hidden"
        style={{ background: `${cert.color}06` }}>
        {cert.image ? (
          <>
            <img src={cert.image} alt={cert.title} className="w-full h-full object-cover rounded-xl" />
            {/* View overlay on hover */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-xl">
              <span className="text-white text-xs font-semibold flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                View Certificate
              </span>
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className="text-3xl mb-1">{cert.icon}</div>
            <p className="text-[10px] text-slate-600">Coming soon</p>
          </div>
        )}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `linear-gradient(105deg, transparent 40%, ${cert.color}15 50%, transparent 60%)`, animation: 'shimmer 2s infinite' }} />
      </div>
    </motion.div>
  )
}

// ─── Certificate Lightbox Modal ──────────────────────────────────────────────
function CertModal({ cert, onClose }) {
  if (!cert) return null

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal content */}
      <motion.div
        className="relative z-10 max-w-3xl w-full max-h-[85vh] flex flex-col items-center"
        initial={{ scale: 0.85, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: 30 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 sm:top-0 sm:right-0 w-10 h-10 rounded-full bg-white/10 border border-white/20
            flex items-center justify-center text-white hover:bg-white/20 hover:border-white/40 transition-all z-20"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Certificate title */}
        <div className="text-center mb-4">
          <h3 className="text-lg font-bold text-white">{cert.title}</h3>
          <p className="text-sm text-slate-400">{cert.platform}</p>
        </div>

        {/* Certificate image */}
        <div className="w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50">
          <img
            src={cert.image}
            alt={cert.title}
            className="w-full h-auto object-contain bg-white"
          />
        </div>

        {/* Hint */}
        <p className="mt-3 text-xs text-slate-500">Click outside or ✕ to close</p>
      </motion.div>
    </motion.div>
  )
}

export default function Certifications() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [viewingCert, setViewingCert] = useState(null)

  return (
    <>
      <section id="certs" className="py-28 px-6 relative">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-96 h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent" />
        <div className="max-w-6xl mx-auto">
          <motion.div ref={ref} className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}>
            <span className="text-xs font-bold text-green-400 uppercase tracking-[0.2em]">Credentials</span>
            <h2 className="section-title mt-3">Certifications &amp; <span className="gradient-text">Learning</span></h2>
            <p className="section-subtitle mx-auto mt-4">
              Continuously learning and earning credentials to validate expertise in
              AI, Machine Learning, and programming.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-5">
            {CERTS.map((cert, i) => (
              <CertCard key={cert.id} cert={cert} index={i} onView={setViewingCert} />
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox modal — rendered outside section for proper z-index stacking */}
      <AnimatePresence>
        {viewingCert && (
          <CertModal cert={viewingCert} onClose={() => setViewingCert(null)} />
        )}
      </AnimatePresence>
    </>
  )
}
