import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

export default function Loader({ onComplete }) {
  const { isDark } = useTheme()
  const doneRef = useRef(onComplete)
  useEffect(() => { doneRef.current = onComplete }, [onComplete])
  useEffect(() => { const t=setTimeout(()=>doneRef.current?.(),2000); return()=>clearTimeout(t) },[])

  return (
    <motion.div key="loader"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background:isDark?'#0a0a0f':'#F7F7FB' }}
      exit={{opacity:0}} transition={{duration:0.5}}>

      <div className="relative mb-10 flex items-center justify-center w-24 h-24">
        <motion.div className="absolute w-24 h-24 rounded-full border"
          style={{borderColor:isDark?'rgba(139,92,246,0.30)':'rgba(124,58,237,0.25)'}}
          animate={{rotate:360}} transition={{duration:3,repeat:Infinity,ease:'linear'}} />
        <motion.div className="absolute w-16 h-16 rounded-full border"
          style={{borderColor:isDark?'rgba(6,182,212,0.40)':'rgba(167,139,250,0.50)'}}
          animate={{rotate:-360}} transition={{duration:2,repeat:Infinity,ease:'linear'}} />
        <motion.div className="absolute w-8 h-8 rounded-full border"
          style={{borderColor:isDark?'rgba(167,139,250,0.50)':'rgba(196,181,253,0.60)'}}
          animate={{rotate:360}} transition={{duration:1.5,repeat:Infinity,ease:'linear'}} />
        <motion.div className="w-3 h-3 rounded-full"
          style={{
            background:isDark?'#8b5cf6':'#7C3AED',
            boxShadow:isDark?'0 0 20px rgba(139,92,246,0.8)':'0 0 16px rgba(124,58,237,0.5)',
          }}
          animate={{scale:[1,1.5,1]}} transition={{duration:1.5,repeat:Infinity}} />
      </div>

      <motion.h1 className="text-2xl font-bold font-poppins mb-1"
        style={{
          background:isDark
            ?'linear-gradient(135deg,#8b5cf6,#a78bfa,#06b6d4)'
            :'linear-gradient(135deg,#4A2DAA,#7C3AED,#818CF8)',
          WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
        }}
        initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.3}}>
        Prithviraj Singh Chouhan
      </motion.h1>

      <motion.p className="text-sm mb-8"
        style={{color:isDark?'#64748b':'#9CA3AF'}}
        initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5}}>
        AI & Machine Learning Student
      </motion.p>

      <div style={{width:180,height:3,background:isDark?'rgba(255,255,255,0.06)':'#E5E7EB',borderRadius:99,overflow:'hidden'}}>
        <motion.div
          style={{height:'100%',borderRadius:99,background:isDark
            ?'linear-gradient(90deg,#6d28d9,#8b5cf6,#06b6d4)'
            :'linear-gradient(90deg,#4A2DAA,#7C3AED,#818CF8)',
          }}
          initial={{width:'0%'}} animate={{width:'100%'}} transition={{duration:1.8,ease:'easeInOut'}} />
      </div>
    </motion.div>
  )
}
