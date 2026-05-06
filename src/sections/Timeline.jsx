import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EVENTS = [
  {
    year: '2022',
    title: '10th — ICSE Board',
    subtitle: 'Seventh Day Adventist Higher Secondary School, Indore',
    detail: 'Scored 69% — built a strong academic foundation.',
    icon: '🎒',
    color: '#06b6d4',
    side: 'left',
  },
  {
    year: '2024',
    title: '12th — MP Board',
    subtitle: 'Bright Higher Secondary School, Indore',
    detail: 'Scored 87% — excelled in Science & Mathematics.',
    icon: '📚',
    color: '#8b5cf6',
    side: 'right',
  },
  {
    year: '2024',
    title: 'B.Tech CSE (AI & ML) — Started',
    subtitle: 'Acropolis Institute of Technology & Research, Indore',
    detail: 'Currently in my 4th semester, maintaining a strong academic record with a current CGPA of 7.6.',
    icon: '🎓',
    color: '#3b82f6',
    side: 'left',
  },
  {
    year: '2028',
    title: 'B.Tech Graduation (Expected)',
    subtitle: 'Acropolis Institute of Technology & Research, Indore',
    detail: 'Expected to graduate with expertise in AI, ML, and Computer Science.',
    icon: '🎯',
    color: '#f97316',
    side: 'right',
    upcoming: true,
  },
]

function TimelineEvent({ event, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isLeft = event.side === 'left'

  return (
    <div ref={ref} className={`flex items-center w-full ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}>
      {/* Content card */}
      <motion.div
        className={`w-full md:w-[calc(50%-2rem)] ${isLeft ? 'md:pr-0' : 'md:pl-0'}`}
        initial={{ opacity: 0, x: isLeft ? -50 : 50, y: 20 }}
        animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={`glass rounded-2xl p-5 sm:p-6 group hover:border-white/20 transition-all duration-300 relative overflow-hidden ${event.upcoming ? 'border-dashed' : ''}`}>
          {/* Glow on hover */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
            style={{ background: `radial-gradient(ellipse at top left, ${event.color}10 0%, transparent 60%)` }} />

          <div className="relative z-10">
            {/* Year badge */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{event.icon}</span>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full border"
                style={{
                  color: event.color,
                  background: `${event.color}15`,
                  borderColor: `${event.color}30`,
                }}>
                {event.year}{event.upcoming ? ' · Upcoming' : ''}
              </span>
            </div>

            <h3 className="text-sm sm:text-base font-bold text-white leading-snug">{event.title}</h3>
            <p className="text-xs text-slate-400 mt-1 font-medium">{event.subtitle}</p>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">{event.detail}</p>
          </div>
        </div>
      </motion.div>

      {/* Center dot — visible only on md+ */}
      <motion.div
        className="hidden md:flex flex-col items-center mx-4 flex-shrink-0"
        initial={{ opacity: 0, scale: 0 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="w-4 h-4 rounded-full border-2 relative"
          style={{ borderColor: event.color, background: `${event.color}30` }}>
          <div className="absolute inset-0 rounded-full animate-ping"
            style={{ background: event.color, opacity: 0.2 }} />
        </div>
      </motion.div>

      {/* Spacer for the other side */}
      <div className="hidden md:block w-[calc(50%-2rem)]" />
    </div>
  )
}

export default function Timeline() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section id="timeline" className="py-28 px-6 relative">
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-96 h-px
        bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96
          bg-blue-700/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-[0.2em]">
            My Path
          </span>
          <h2 className="section-title mt-3">
            The <span className="gradient-text">Journey</span> So Far
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            From school to engineering college — every milestone that shaped
            my path toward AI & Machine Learning.
          </p>
        </motion.div>

        {/* Timeline track */}
        <div className="relative">
          {/* Vertical line — desktop only */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px
            bg-gradient-to-b from-cyan-500/30 via-purple-500/20 to-transparent" />

          <div className="flex flex-col gap-8 sm:gap-10">
            {EVENTS.map((event, i) => (
              <TimelineEvent key={i} event={event} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
