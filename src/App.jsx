import { useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'

// ── Components ──────────────────────────────────────────────────────────────
import Loader        from './components/Loader'
import ScrollProgress from './components/ScrollProgress'
import Navbar        from './components/Navbar'
import Footer        from './components/Footer'

// ── Sections ────────────────────────────────────────────────────────────────
import Hero          from './sections/Hero'
import About         from './sections/About'
import Skills        from './sections/Skills'
import Projects      from './sections/Projects'
import Timeline      from './sections/Timeline'
import Certifications from './sections/Certifications'
import Contact       from './sections/Contact'
import Resume        from './sections/Resume'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [resumeOpen, setResumeOpen] = useState(false)
  const handleLoaded = useCallback(() => setLoading(false), [])

  return (
    <>
      {/* ── Preloader ───────────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" onComplete={handleLoaded} />}
      </AnimatePresence>

      {/* ── Main site ───────────────────────────────────────────────────── */}
      {!loading && (
        <div className="relative min-h-screen noise">
          {/* Scroll progress bar (fixed, top) */}
          <ScrollProgress />

          {/* Sticky navbar */}
          <Navbar onResumeClick={() => setResumeOpen(true)} />

          {/* Sections */}
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Timeline />
            <Certifications />
            <Contact />
          </main>

          <Footer />

          {/* Resume overlay */}
          <Resume isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
        </div>
      )}
    </>
  )
}
