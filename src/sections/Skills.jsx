import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const SKILLS = [
  {
    name: 'Python',
    level: 'Complete',
    percent: '100%',
    color: '#3b82f6',
    shadow: 'rgba(59,130,246,0.4)',
    icon: (
      <svg viewBox="0 0 128 128" className="w-10 h-10">
        <path fill="#3776AB" d="M63.9 15c-24.5 0-22.9 10.6-22.9 10.6l.03 11h23.3v3.3H30.8S15 37.8 15 62.6s13.8 23.8 13.8 23.8h8.2V74.7s-.4-13.8 13.6-13.8h23.4s13.2.2 13.2-12.7V27.7S89.9 15 63.9 15zm-13 7.5c2.4 0 4.3 1.9 4.3 4.3s-1.9 4.3-4.3 4.3-4.3-1.9-4.3-4.3 1.9-4.3 4.3-4.3z"/>
        <path fill="#FFD43B" d="M64.1 113c24.5 0 22.9-10.6 22.9-10.6l-.03-11H63.7v-3.3h33.5S113 90.2 113 65.4 99.2 41.6 99.2 41.6H91v11.7s.4 13.8-13.6 13.8H54.1S40.9 67 40.9 79.9v23.5S38.1 113 64.1 113zm13-7.5c-2.4 0-4.3-1.9-4.3-4.3s1.9-4.3 4.3-4.3 4.3 1.9 4.3 4.3-1.9 4.3-4.3 4.3z"/>
      </svg>
    ),
  },
  {
    name: 'C++',
    level: 'Complete',
    percent: '100%',
    color: '#06b6d4',
    shadow: 'rgba(6,182,212,0.4)',
    icon: (
      <svg viewBox="0 0 128 128" className="w-10 h-10">
        <path fill="#00549d" d="M115.4 30.7L67.1 2.9c-.8-.5-1.9-.7-3.1-.7-1.2 0-2.3.3-3.1.7l-48 27.9c-1.7 1-2.9 3.5-2.9 5.4v55.7c0 1.1.2 2.4 1 3.5l106.8-55.5c-.3-1.1-.9-2.2-1.9-2.9zm-2.3 5.9l-1.8.9v1.3c0 .9.2 1.3.6 1.3l.2-3.5z"/>
        <path fill="#0086d4" d="M10.7 95.3c.5.8 1.2 1.5 1.9 1.9l48.2 27.9c.8.5 1.9.7 3.1.7 1.2 0 2.3-.3 3.1-.7l48-27.9c1.7-1 2.9-3.5 2.9-5.4V36.1c0-.9-.1-1.9-.6-2.8l-106.6 62z"/>
        <path fill="#fff" d="M59.3 75.6c-3.1 3-7.5 4.8-12 4.8-9.4 0-17-7.6-17-17s7.6-17 17-17c4.6 0 8.9 1.8 12 4.8l7.5-8.2c-5.1-5-12-8-19.5-8-15.5 0-28 12.5-28 28s12.5 28 28 28c7.5 0 14.4-3 19.5-8l-7.5-8.4zM86 60h-6v-6h-4v6h-6v4h6v6h4v-6h6v-4zm20 0h-6v-6h-4v6h-6v4h6v6h4v-6h6v-4z"/>
      </svg>
    ),
  },
  {
    name: 'NumPy',
    level: 'Complete',
    percent: '100%',
    color: '#4d77cf',
    shadow: 'rgba(77,119,207,0.4)',
    icon: (
      <svg viewBox="0 0 128 128" className="w-10 h-10">
        <path fill="#2563eb" d="M64 69 L104 89 L64 109 L24 89 Z" />
        <path fill="#1d4ed8" d="M24 89 L64 109 L64 119 L24 99 Z" />
        <path fill="#1e3a8a" d="M64 109 L104 89 L104 99 L64 119 Z" />

        <path fill="#60a5fa" d="M64 34 L104 54 L64 74 L24 54 Z" />
        <path fill="#3b82f6" d="M24 54 L64 74 L64 84 L24 64 Z" />
        <path fill="#2563eb" d="M64 74 L104 54 L104 64 L64 84 Z" />
        
        <g stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.6">
          <path d="M51 41 L91 61 M37 48 L77 68" />
          <path d="M77 41 L37 61 M91 48 L51 68" />
        </g>
      </svg>
    ),
  },
  {
    name: 'Pandas',
    level: 'Complete',
    percent: '100%',
    color: '#ffca00',
    shadow: 'rgba(255,202,0,0.4)',
    icon: (
      <svg viewBox="0 0 128 128" className="w-10 h-10">
        <rect x="24" y="24" width="20" height="80" rx="4" fill="#ffffff"/>
        <rect x="54" y="44" width="20" height="60" rx="4" fill="#ffca00"/>
        <rect x="84" y="64" width="20" height="40" rx="4" fill="#e50695"/>
      </svg>
    ),
  },
  {
    name: 'Matplotlib',
    level: 'Complete',
    percent: '100%',
    color: '#f97316',
    shadow: 'rgba(249,115,22,0.4)',
    icon: (
      <svg viewBox="0 0 128 128" className="w-10 h-10">
        <path fill="none" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" d="M20 108h88 M20 20v88"/>
        <path fill="none" stroke="#f97316" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" d="M30 90l20-40 20 20 30-50"/>
        <path fill="none" stroke="#06b6d4" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" d="M30 100l25-15 15-25 30 10"/>
      </svg>
    ),
  },
  {
    name: 'Machine Learning',
    level: 'Learning',
    percent: '30%',
    color: '#ec4899',
    shadow: 'rgba(236,72,153,0.4)',
    icon: (
      <svg viewBox="0 0 128 128" className="w-10 h-10">
        <g stroke="#ec4899" strokeWidth="4" opacity="0.6">
          <path d="M24 34l40-10M24 34l40 30M24 34l40 70M24 94l40-70M24 94l40-30M24 94l40 10"/>
          <path d="M64 24l40 20M64 24l40 60M64 64l40-20M64 64l40 20M64 104l40-60M64 104l40-20"/>
        </g>
        <circle cx="24" cy="34" r="10" fill="#ec4899"/>
        <circle cx="24" cy="94" r="10" fill="#ec4899"/>
        <circle cx="64" cy="24" r="10" fill="#ffffff"/>
        <circle cx="64" cy="64" r="10" fill="#ffffff"/>
        <circle cx="64" cy="104" r="10" fill="#ffffff"/>
        <circle cx="104" cy="44" r="10" fill="#ec4899"/>
        <circle cx="104" cy="84" r="10" fill="#ec4899"/>
      </svg>
    ),
  },
]

function SkillCard({ skill, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, scale: 1.04, rotateY: 5 }}
      className="glass p-6 rounded-2xl flex flex-col items-center gap-4 cursor-default group relative overflow-hidden transition-all duration-300"
      style={{ transformStyle: 'preserve-3d' }}>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
        style={{ boxShadow: `inset 0 0 40px ${skill.shadow}`, background: `radial-gradient(ellipse at center, ${skill.color}08 0%, transparent 70%)` }} />
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ boxShadow: `0 0 0 1px ${skill.color}40` }} />
      <motion.div className="relative z-10" whileHover={{ scale: 1.15, rotate: 5 }} transition={{ type: 'spring', stiffness: 300 }}>
        {skill.icon}
      </motion.div>
      <div className="text-center z-10">
        <p className="font-semibold text-white text-sm">{skill.name}</p>
        <p className="text-xs mt-0.5" style={{ color: skill.color }}>{skill.level}</p>
      </div>
      <div className="w-full bg-white/5 rounded-full h-1 overflow-hidden z-10">
        <motion.div className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)` }}
          initial={{ width: 0 }}
          animate={inView ? { width: skill.percent } : {}}
          transition={{ duration: 1, delay: index * 0.1 + 0.4 }} />
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section id="skills" className="py-28 px-6 relative">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-72 h-72 bg-purple-700/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="max-w-6xl mx-auto">
        <motion.div ref={ref} className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}>
          <span className="text-xs font-bold text-purple-400 uppercase tracking-[0.2em]">Technical Arsenal</span>
          <h2 className="section-title mt-3">Skills &amp; <span className="gradient-text">Technologies</span></h2>
          <p className="section-subtitle mx-auto mt-4">
            Building a strong foundation with the tools that power modern AI, Machine Learning and intelligent systems.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {SKILLS.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
