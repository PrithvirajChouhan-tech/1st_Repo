import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

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

function Stat({ value, label, color }) {
  return (
    <div className="flex flex-col items-center p-4 glass rounded-2xl">
      <span className={`text-2xl font-black font-poppins ${color}`}>{value}</span>
      <span className="text-xs text-slate-500 mt-1">{label}</span>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="py-28 px-6 relative">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-72 h-72 bg-blue-700/5 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto">
        <Reveal delay={0} className="text-center mb-16">
          <h2 className="section-title mt-3">
            <span className="text-white">About</span> <span className="gradient-text">Me</span>
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
              <img src="/photos/personal.jpeg" alt="Prithviraj Singh Chouhan" className="w-full h-full object-cover object-top rounded-full border-[3px] border-white/10 shadow-lg" style={{ borderRadius: '50%' }} />
            </div>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-4 -right-4 glass px-4 py-2 rounded-xl text-xs font-semibold text-blue-400 border border-blue-500/20">
              🤖 AI/ML Explorer
            </motion.div>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-4 -left-4 glass px-4 py-2 rounded-xl text-xs font-semibold text-purple-400 border border-purple-500/20">
              🐍 Python Developer
            </motion.div>
          </div>
        </Reveal>

        <div className="flex flex-col gap-6">
          <Reveal delay={0.2}>
            <p className="text-slate-400 leading-relaxed text-[15px]">
              Hey there! I'm <span className="text-white font-semibold">Prithviraj Singh Chouhan</span> — a 2nd-year
              Computer Science student with a deep passion for{' '}
              <span className="text-blue-400 font-medium">Artificial Intelligence</span> and{' '}
              <span className="text-purple-400 font-medium">Machine Learning</span>. I'm currently in my
              4th semester at <span className="text-cyan-400 font-medium">Acropolis Institute of Technology
              and Research, Indore</span>, where I'm sharpening my skills at the intersection of code,
              data, and intelligent systems.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-slate-400 leading-relaxed text-[15px]">
              My primary focus is on building <span className="text-purple-400 font-medium">AI/ML-powered
              solutions</span> — from understanding the math behind models to bringing them to life through
              clean, functional code. I enjoy exploring how machines learn, reason, and solve real-world
              problems, and I'm constantly experimenting with new ideas in this space.
            </p>
          </Reveal>
          <Reveal delay={0.35}>
            <p className="text-slate-400 leading-relaxed text-[15px]">
              Beyond the classroom, I'm a curious builder who loves working on personal projects, diving
              into datasets, and staying up to date with the rapidly evolving AI landscape. I believe
              <span className="text-white font-medium"> the best way to learn is to build</span> — and
              that's exactly what I'm here to do.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="flex flex-wrap gap-2">
              {['Machine Learning', 'Python', 'NumPy', 'Pandas', 'AI', 'C++'].map(tag => (
                <span key={tag} className="px-3 py-1 rounded-lg text-xs font-semibold bg-white/5 border border-white/10 text-slate-300 hover:border-blue-500/40 hover:text-blue-400 transition-all duration-300 cursor-default">
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.5}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
              <Stat value="∞" label="Curiosity" color="gradient-text" />
              <Stat value="6+" label="Skills" color="text-purple-400" />
              <Stat value="2+" label="Certifications" color="text-cyan-400" />
              <Stat value="7.6" label="CGPA" color="text-green-400" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
