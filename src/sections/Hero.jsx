import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { useTheme } from '../context/ThemeContext'

function ParticleCanvas() {
  const { isDark } = useTheme()
  const ref       = useRef(null)
  const isDarkRef = useRef(isDark)
  useEffect(() => { isDarkRef.current = isDark }, [isDark])

  useEffect(() => {
    const canvas = ref.current
    const ctx    = canvas.getContext('2d')
    let W = canvas.width  = window.innerWidth
    let H = canvas.height = window.innerHeight
    let animId

    const DARK_COLORS  = ['#8b5cf6','#6d28d9','#06b6d4','#a78bfa']
    const LIGHT_COLORS = ['#7C3AED','#818CF8','#A78BFA','#C4B5FD']

    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random()*W, y: Math.random()*H,
      r: Math.random()*1.5+0.3,
      dx: (Math.random()-0.5)*0.25, dy: (Math.random()-0.5)*0.25,
      ci: Math.floor(Math.random()*4), alpha: Math.random()*0.4+0.1,
    }))

    const resize = () => { W = canvas.width=window.innerWidth; H = canvas.height=window.innerHeight }
    window.addEventListener('resize', resize)

    const draw = () => {
      ctx.clearRect(0,0,W,H)
      const colors = isDarkRef.current ? DARK_COLORS : LIGHT_COLORS
      particles.forEach(p => {
        particles.forEach(q => {
          const ddx=p.x-q.x, ddy=p.y-q.y, dist=Math.sqrt(ddx*ddx+ddy*ddy)
          if (dist<120) {
            ctx.beginPath()
            ctx.strokeStyle=isDarkRef.current
              ?`rgba(139,92,246,${0.06*(1-dist/120)})`
              :`rgba(124,58,237,${0.08*(1-dist/120)})`
            ctx.lineWidth=0.6; ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y); ctx.stroke()
          }
        })
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2)
        ctx.fillStyle=colors[p.ci]
        ctx.globalAlpha=isDarkRef.current?p.alpha:p.alpha*0.4
        ctx.fill(); ctx.globalAlpha=1
        p.x+=p.dx; p.y+=p.dy
        if(p.x<0||p.x>W)p.dx*=-1; if(p.y<0||p.y>H)p.dy*=-1
      })
      animId=requestAnimationFrame(draw)
    }
    draw()
    return()=>{cancelAnimationFrame(animId);window.removeEventListener('resize',resize)}
  }, [])

  return <canvas ref={ref} id="particles-canvas" />
}

export default function Hero() {
  const { isDark } = useTheme()
  const handleScroll = (id) => document.getElementById(id)?.scrollIntoView({ behavior:'smooth' })

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden animated-bg">
      <ParticleCanvas />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] pointer-events-none"
        style={{ background:isDark?'#7c3aed':'#7C3AED', opacity:isDark?0.10:0.08 }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-[100px] pointer-events-none"
        style={{ background:isDark?'#4c1d95':'#818CF8', opacity:isDark?0.08:0.10 }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">

        {/* Badge */}
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1}}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
          style={{
            background:isDark?'rgba(139,92,246,0.10)':'rgba(124,58,237,0.08)',
            border:    isDark?'1px solid rgba(139,92,246,0.25)':'1px solid #DDD6FE',
            color:     isDark?'#a78bfa':'#7C3AED',
          }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{background:isDark?'#a78bfa':'#7C3AED'}} />
          Available for Opportunities
        </motion.div>

        {/* Name — always Poppins, no font change */}
        <motion.h1
          className="text-5xl md:text-7xl font-black font-poppins tracking-tight mb-4 leading-none text-transparent bg-clip-text pb-2"
          initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{delay:0.2,duration:0.7}}
          style={{
            backgroundImage:isDark
              ?'linear-gradient(to right,#ffffff,#ffffff 30%,#8b5cf6 45%,#a78bfa 55%,#ffffff 70%,#ffffff)'
              :'linear-gradient(to right,#1A1035,#1A1035 18%,#6D28D9 35%,#EC4899 52%,#6D28D9 68%,#1A1035 82%,#1A1035)',
            backgroundSize:'300% 100%',
            animation:'gradient-x 10s ease-in-out infinite',
          }}>
          Prithviraj Singh Chouhan
        </motion.h1>

        {/* Typing */}
        <motion.div className="text-xl md:text-2xl font-medium mb-4 h-8"
          style={{color:isDark?'#cbd5e1':'#2D1B69'}}
          initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5}}>
          <TypeAnimation
            sequence={['AI & Machine Learning Student',2000,'Python Developer',1500,'Deep Learning Explorer',1500,'Problem Solver',1500]}
            wrapper="span" speed={55} repeat={Infinity} className="gradient-text font-semibold" />
        </motion.div>

        {/* Tagline */}
        <motion.p className="text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{color:isDark?'#94a3b8':'#6B7280'}}
          initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.6}}>
          Crafting intelligent solutions through AI — exploring the intersection of{' '}
          <span className="font-semibold" style={{color:isDark?'#93c5fd':'#4F46E5'}}>Machine Learning</span>,{' '}
          <span className="font-semibold" style={{color:isDark?'#c4b5fd':'#7C3AED'}}>Python</span>, and{' '}
          <span className="font-semibold" style={{color:isDark?'#67e8f9':'#0891B2'}}>Artificial Intelligence</span>{' '}
          to build tomorrow's technology today.
        </motion.p>

        {/* CTAs */}
        <motion.div className="flex flex-wrap gap-4 justify-center"
          initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.8}}>
          <motion.button onClick={()=>handleScroll('skills')}
            className="px-8 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300"
            style={{
              background:isDark
                ?'linear-gradient(135deg,#6d28d9,#8b5cf6)'
                :'linear-gradient(135deg,#4A2DAA,#7C3AED)',
              color:'#ffffff',
              boxShadow:isDark
                ?'0 8px 24px rgba(109,40,217,0.40)'
                :'0 8px 24px rgba(74,45,170,0.30)',
            }}
            whileHover={{scale:1.05,y:-2}} whileTap={{scale:0.97}}>
            View Skills
          </motion.button>
          <motion.button onClick={()=>handleScroll('contact')}
            className="px-8 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300"
            style={{
              color:     isDark?'#e2e8f0':'#374151',
              background:isDark?'rgba(255,255,255,0.05)':'#FFFFFF',
              border:    isDark?'1px solid rgba(255,255,255,0.12)':'1px solid #E5E7EB',
              boxShadow: isDark?'none':'0 2px 8px rgba(0,0,0,0.06)',
            }}
            whileHover={{scale:1.05,y:-2}} whileTap={{scale:0.97}}>
            Contact Me
          </motion.button>
        </motion.div>

        {/* Location */}
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.2}}
          className="mt-8 text-xs flex items-center justify-center gap-1.5"
          style={{color:isDark?'#475569':'#9CA3AF'}}>
          <svg className="h-3.5 w-3.5" style={{color:isDark?'#8b5cf6':'#7C3AED'}}
            fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          Indore, India
        </motion.div>
      </div>
    </section>
  )
}
