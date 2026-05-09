import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useTheme } from '../context/ThemeContext'

function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  )
}

function Stat({ value, label, color, isDark }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: '16px', borderRadius: '16px',
      background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(109,40,217,0.06)',
      border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(139,92,246,0.20)',
    }}>
      <span className={`text-2xl font-black font-poppins ${color}`}>{value}</span>
      <span style={{ fontSize: 11, marginTop: 4, color: isDark ? '#64748b' : '#9ca3af' }}>{label}</span>
    </div>
  )
}

export default function About() {
  const { isDark } = useTheme()

  const textPrimary   = isDark ? '#e2d9f3' : '#1A1035'
  const textSecondary = isDark ? '#94a3b8'  : '#4B5563'
  const tagBg         = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(109,40,217,0.07)'
  const tagBorder     = isDark ? 'rgba(255,255,255,0.10)' : 'rgba(139,92,246,0.25)'
  const tagColor      = isDark ? '#cbd5e1' : '#5B21B6'

  return (
    <section id="about" className="py-28 px-6 relative"
      style={{ background: isDark ? 'transparent' : 'transparent' }}>
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-72 h-72 bg-blue-700/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <Reveal delay={0} className="text-center mb-16">
          <h2 className="section-title mt-3">
            <span style={{ color: textPrimary }}>About</span>{' '}
            <span className="gradient-text">Me</span>
          </h2>
        </Reveal>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <Reveal delay={0.1}>
          <div className="relative flex justify-center">
            <motion.div className="absolute inset-0 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              style={{ background: 'conic-gradient(from 0deg, #3b82f6, #8b5cf6, #06b6d4, #3b82f6)', borderRadius: '50%', padding: 2, filter: 'blur(1px)' }} />
            <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center z-10">
              <img src="/photos/personal.jpeg" alt="Prithviraj Singh Chouhan"
                className="w-full h-full object-cover object-top rounded-full shadow-lg"
                style={{ borderRadius: '50%', border: isDark ? '3px solid rgba(255,255,255,0.10)' : '3px solid rgba(109,40,217,0.25)' }} />
            </div>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-4 -right-4 px-4 py-2 rounded-xl text-xs font-semibold"
              style={{
                background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(59,130,246,0.10)',
                border: isDark ? '1px solid rgba(59,130,246,0.20)' : '1px solid rgba(59,130,246,0.30)',
                color: '#60a5fa', backdropFilter: 'blur(12px)',
              }}>
              🤖 AI/ML Explorer
            </motion.div>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-4 -left-4 px-4 py-2 rounded-xl text-xs font-semibold"
              style={{
                background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(139,92,246,0.10)',
                border: isDark ? '1px solid rgba(139,92,246,0.20)' : '1px solid rgba(139,92,246,0.30)',
                color: '#a78bfa', backdropFilter: 'blur(12px)',
              }}>
              🐍 Python Developer
            </motion.div>
          </div>
        </Reveal>

        <div className="flex flex-col gap-6">
          <Reveal delay={0.2}>
            <p style={{ color: textSecondary, lineHeight: 1.75, fontSize: 15 }}>
              Hey there! I'm{' '}
              <span style={{ color: textPrimary, fontWeight: 600 }}>Prithviraj Singh Chouhan</span>{' '}
              — a 2nd-year Computer Science student with a deep passion for{' '}
              <span style={{ color: '#60a5fa', fontWeight: 500 }}>Artificial Intelligence</span> and{' '}
              <span style={{ color: '#a78bfa', fontWeight: 500 }}>Machine Learning</span>. I'm currently in my
              4th semester at{' '}
              <span style={{ color: '#22d3ee', fontWeight: 500 }}>Acropolis Institute of Technology and Research, Indore</span>,
              where I'm sharpening my skills at the intersection of code, data, and intelligent systems.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p style={{ color: textSecondary, lineHeight: 1.75, fontSize: 15 }}>
              My primary focus is on building{' '}
              <span style={{ color: '#a78bfa', fontWeight: 500 }}>AI/ML-powered solutions</span>{' '}
              — from understanding the math behind models to bringing them to life through clean, functional code.
              I enjoy exploring how machines learn, reason, and solve real-world problems.
            </p>
          </Reveal>
          <Reveal delay={0.35}>
            <p style={{ color: textSecondary, lineHeight: 1.75, fontSize: 15 }}>
              Beyond the classroom, I'm a curious builder who loves working on personal projects, diving into datasets,
              and staying up to date with the rapidly evolving AI landscape. I believe{' '}
              <span style={{ color: textPrimary, fontWeight: 500 }}>the best way to learn is to build</span>{' '}
              — and that's exactly what I'm here to do.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="flex flex-wrap gap-2">
              {['Machine Learning', 'Python', 'NumPy', 'Pandas', 'AI', 'C++'].map(tag => (
                <span key={tag}
                  style={{
                    padding: '4px 12px', borderRadius: 8, fontSize: 12, fontWeight: 600,
                    background: tagBg, border: `1px solid ${tagBorder}`, color: tagColor,
                    transition: 'all 0.3s', cursor: 'default',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(59,130,246,0.5)'; e.currentTarget.style.color = '#60a5fa' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = tagBorder; e.currentTarget.style.color = tagColor }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.5}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
              <Stat value="∞" label="Curiosity"      color="gradient-text"   isDark={isDark} />
              <Stat value="6+" label="Skills"         color="text-purple-400" isDark={isDark} />
              <Stat value="2+" label="Certifications" color="text-cyan-400"   isDark={isDark} />
              <Stat value="7.6" label="CGPA"          color="text-green-400"  isDark={isDark} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
