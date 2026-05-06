import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'

// ─── Particle Canvas ───────────────────────────────────────────────────────
function ParticleCanvas() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let W = canvas.width  = window.innerWidth
    let H = canvas.height = window.innerHeight
    let animId

    const COLORS = ['#3b82f6', '#8b5cf6', '#06b6d4', '#a78bfa']
    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.8 + 0.4,
      dx: (Math.random() - 0.5) * 0.35,
      dy: (Math.random() - 0.5) * 0.35,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: Math.random() * 0.5 + 0.1,
    }))

    const resize = () => {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      particles.forEach(p => {
        // Connect nearby particles
        particles.forEach(q => {
          const dx = p.x - q.x, dy = p.y - q.y
          const dist = Math.sqrt(dx*dx + dy*dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(99,102,241,${0.06 * (1 - dist/120)})`
            ctx.lineWidth = 0.6
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.stroke()
          }
        })
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.alpha
        ctx.fill()
        ctx.globalAlpha = 1

        p.x += p.dx; p.y += p.dy
        if (p.x < 0 || p.x > W) p.dx *= -1
        if (p.y < 0 || p.y > H) p.dy *= -1
      })
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={ref} id="particles-canvas" />
}

// ─── Hero Section ──────────────────────────────────────────────────────────
export default function Hero() {
  const handleScroll = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden animated-bg"
    >
      <ParticleCanvas />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-[100px]
        bg-blue-600 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-10 blur-[100px]
        bg-purple-600 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold
            bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          Available for Opportunities
        </motion.div>

        {/* Name */}
        <motion.h1
          className="text-5xl md:text-7xl font-black font-poppins tracking-tight mb-4 leading-none text-transparent bg-clip-text pb-2 drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          style={{ 
            backgroundImage: 'linear-gradient(to right, #ffffff, #ffffff 30%, #3b82f6 45%, #8b5cf6 55%, #ffffff 70%, #ffffff)', 
            backgroundSize: '300% 100%', 
            animation: 'gradient-x 12s ease-in-out infinite' 
          }}
        >
          Prithviraj Singh Chouhan
        </motion.h1>

        {/* Typing effect */}
        <motion.div
          className="text-xl md:text-2xl font-medium text-slate-300 mb-4 h-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <TypeAnimation
            sequence={[
              'AI & Machine Learning Student', 2000,
              'Python Developer', 1500,
              'Deep Learning Explorer', 1500,
              'Problem Solver', 1500,
            ]}
            wrapper="span"
            speed={55}
            repeat={Infinity}
            className="gradient-text font-semibold"
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          Crafting intelligent solutions through AI — exploring the intersection of{' '}
          <span className="text-blue-400 font-medium">Machine Learning</span>,{' '}
          <span className="text-purple-400 font-medium">Python</span>, and{' '}
          <span className="text-cyan-400 font-medium">Artificial Intelligence</span> to build
          tomorrow's technology today.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-wrap gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <motion.button
            onClick={() => handleScroll('skills')}
            className="px-8 py-3.5 rounded-xl text-sm font-semibold text-white
              bg-gradient-to-r from-blue-600 to-purple-600
              hover:from-blue-500 hover:to-purple-500
              shadow-lg hover:shadow-purple-500/40 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            View Skills
          </motion.button>
          <motion.button
            onClick={() => handleScroll('contact')}
            className="px-8 py-3.5 rounded-xl text-sm font-semibold text-white
              bg-white/5 border border-white/10 hover:bg-white/10
              hover:border-purple-500/40 transition-all duration-300 backdrop-blur-sm"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Contact Me
          </motion.button>
        </motion.div>


        {/* Location chip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-8 text-xs text-slate-600 flex items-center justify-center gap-1.5"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          Indore, India
        </motion.div>


      </div>
    </section>
  )
}
