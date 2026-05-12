import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

// ─── Project data (edit freely) ────────────────────────────────────────────
const PROJECTS = [
  {
    id: 1,
    title: 'Alimony Calculator',
    status: 'Live',
    statusColor: 'text-amber-400',
    statusBg: 'bg-amber-500/10 border-amber-500/30',
    description:
      'An end-to-end ML project — trained a custom Regression model on real-world dataset to predict monthly alimony & duration. Served via a FastAPI backend (Python) and wrapped in a polished React UI with a meme-powered loading screen. Deployed on Cloudflare Workers (frontend) & Render (backend).',
    tags: ['Machine Learning', 'Regression', 'Python', 'FastAPI', 'React', 'Cloudflare Workers'],
    gradient: 'from-amber-900/30 to-yellow-900/20',
    accentColor: '#f59e0b',
    github: 'https://github.com/PrithvirajChouhan-tech/Alimony_Estimation',
    demo: 'https://alimonyprediction.dipendrsinghchouhan.workers.dev/',
    icon: '⚖️',
  },
  {
    id: 2,
    title: 'AI Chatbot / NLP Project',
    status: 'Planned',
    statusColor: 'text-purple-400',
    statusBg: 'bg-purple-500/10 border-purple-500/20',
    description:
      'An AI-powered conversational agent exploring natural language processing techniques. Will leverage transformer-based models for intelligent text understanding and generation.',
    tags: ['Python', 'NLP', 'AI', 'Transformers'],
    gradient: 'from-purple-900/30 to-pink-900/20',
    accentColor: '#8b5cf6',
    github: null,
    demo: null,
    icon: '💬',
  },
  {
    id: 3,
    title: 'Deep Learning Vision Project',
    status: 'Upcoming',
    statusColor: 'text-cyan-400',
    statusBg: 'bg-cyan-500/10 border-cyan-500/20',
    description:
      'A focused AI project exploring computer vision — image classification or object detection using deep learning frameworks. Details to be finalised.',
    tags: ['Python', 'TensorFlow / PyTorch', 'AI/ML'],
    gradient: 'from-cyan-900/20 to-blue-900/30',
    accentColor: '#06b6d4',
    github: null,
    demo: null,
    icon: '👁️',
  },
]

// ─── Project Card ──────────────────────────────────────────────────────────
function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -8 }}
      className="glass rounded-2xl overflow-hidden group cursor-default relative"
    >
      {/* Gradient header */}
      <div className={`bg-gradient-to-br ${project.gradient} p-8 relative`}>
        {/* Animated grid dots */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(${project.accentColor} 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }}
        />
        <div className="relative z-10 flex items-start justify-between">
          <span className="text-4xl">{project.icon}</span>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${project.statusBg} ${project.statusColor}`}>
            {project.status}
          </span>
        </div>
        {/* Hover overlay glow */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at center, ${project.accentColor}20 0%, transparent 70%)`,
              }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-4">
        <h3 className="text-lg font-bold text-white">{project.title}</h3>
        <p className="text-sm text-slate-400 leading-relaxed">{project.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/10
                text-slate-400"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action links */}
        <div className="flex gap-3 mt-2">
          {/* GitHub */}
          <motion.a
            href={project.github || '#projects'}
            onClick={e => !project.github && e.preventDefault()}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold
              border transition-all duration-300
              ${project.github
                ? 'border-white/20 text-white hover:border-white/40'
                : 'border-white/5 text-slate-600 cursor-not-allowed'
              }`}
            whileHover={project.github ? { scale: 1.05 } : {}}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            {project.github ? 'GitHub' : 'Coming Soon'}
          </motion.a>

          {/* Demo */}
          <motion.a
            href={project.demo || '#projects'}
            onClick={e => !project.demo && e.preventDefault()}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold
              transition-all duration-300
              ${project.demo
                ? `bg-gradient-to-r text-white`
                : 'bg-white/5 text-slate-600 cursor-not-allowed'
              }`}
            style={project.demo ? { background: `linear-gradient(135deg, ${project.accentColor}, ${project.accentColor}80)` } : {}}
            whileHover={project.demo ? { scale: 1.05 } : {}}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            {project.demo ? 'Live Demo' : 'Planned'}
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Projects Section ──────────────────────────────────────────────────────
export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section id="projects" className="py-28 px-6 relative">
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-96 h-px
        bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-[0.2em]">
            My Work
          </span>
          <h2 className="section-title mt-3">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            Projects in progress — building real-world AI & ML solutions step by step.
            Stay tuned as these come to life.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
