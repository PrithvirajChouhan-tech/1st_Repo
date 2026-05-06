import { motion, AnimatePresence } from 'framer-motion'

// ─── Resume Overlay Page ─────────────────────────────────────────────────────
//
// HOW TO ADD YOUR RESUME:
// 1. Save your resume as PDF in public/resume.pdf
// 2. The download button will automatically link to it
// 3. The page also embeds the PDF for preview
//
export default function Resume({ isOpen, onClose }) {
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
          <div className="absolute inset-0 bg-[#0a0a0f]/95 backdrop-blur-md" />

          {/* Header bar */}
          <motion.div
            className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/10"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-sm">
                📄
              </div>
              <div>
                <h2 className="text-base font-bold text-white">Resume</h2>
                <p className="text-[11px] text-slate-500">Prithviraj Singh Chouhan</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Download button */}
              <a
                href="/resume.pdf"
                download
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold
                  bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500
                  text-white transition-all duration-300 shadow-lg hover:shadow-purple-500/30"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download PDF
              </a>

              {/* Close button */}
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center
                  text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </motion.div>

          {/* Resume content area */}
          <motion.div
            className="relative z-10 flex-1 flex items-center justify-center p-6 sm:p-10 overflow-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, type: 'spring', stiffness: 200, damping: 25 }}
          >
            {/* Resume placeholder — replace with actual PDF embed when ready */}
            <div className="w-full max-w-2xl aspect-[8.5/11] glass rounded-2xl border border-white/10 flex flex-col items-center justify-center gap-6 p-10 relative overflow-hidden">
              {/* Decorative corner accents */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-blue-500/30 rounded-tl-lg" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-purple-500/30 rounded-tr-lg" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-blue-500/30 rounded-bl-lg" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-purple-500/30 rounded-br-lg" />

              {/* Decorative background pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-10 right-10 h-px bg-white/20" />
                <div className="absolute top-16 left-10 right-10 h-px bg-white/10" />
                <div className="absolute top-22 left-10 w-1/3 h-px bg-white/10" />
                <div className="absolute top-28 left-10 right-10 h-px bg-white/10" />
                <div className="absolute top-34 left-10 right-20 h-px bg-white/10" />
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center text-center gap-4">
                <motion.div
                  className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <span className="text-4xl">📄</span>
                </motion.div>

                <h3 className="text-xl font-bold text-white">Resume Coming Soon</h3>
                <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
                  Upload your resume PDF to <code className="text-xs bg-white/10 px-1.5 py-0.5 rounded text-blue-400">public/resume.pdf</code> and it will appear here with a download option.
                </p>

                <div className="flex flex-col items-center gap-2 mt-4">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50" />
                    <span>Add your PDF to the public folder</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500/50" />
                    <span>It will auto-embed & become downloadable</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
