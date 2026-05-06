// ─── Footer ─────────────────────────────────────────────────────────────────
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/5 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-base font-bold font-poppins">
            <span className="text-white">My</span>{' '}
            <span className="gradient-text">Portfolio</span>
          </span>
          <span className="text-slate-700">·</span>
          <span className="text-sm text-slate-600">Prithviraj Singh Chouhan</span>
        </div>

        <p className="text-xs text-slate-700 text-center">
          © {year} Prithviraj Singh Chouhan. Built with React + Framer Motion.
        </p>

        <div className="flex items-center gap-1">
          <span className="text-xs text-slate-700">Made with</span>
          <span className="text-pink-500 text-sm">♥</span>
          <span className="text-xs text-slate-700">in Indore</span>
        </div>
      </div>
    </footer>
  )
}
