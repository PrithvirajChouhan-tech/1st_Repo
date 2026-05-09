import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

// ── Social media links ───────────────────────────────────────────────────────
const SOCIALS = [
  { label: '🐙 GitHub', url: 'https://github.com/PrithvirajChouhan-tech', color: '#a78bfa' },
  { label: '💼 LinkedIn', url: 'https://www.linkedin.com/in/prithviraj-singh-chouhan-b7398437a', color: '#60a5fa' },
  { label: '📸 Instagram', url: 'https://www.instagram.com/prithviraj__18?igsh=MTkyZzVrMTI2Y29scg==', color: '#f472b6' },
]

// ── Quick suggestion chips ───────────────────────────────────────────────────
const CHIPS = [
  'What are your strengths?',
  'What are your skills?',
  'Are you available for hire?',
  'What projects have you built?',
  'Share your social media links',
]

// ── Local Smart Response Generator (No API needed!) ────────────────────────
// Returns either a string OR { text, links } for rich responses
async function generateLocalResponse(userMessage) {
  const lowerMessage = userMessage.toLowerCase()
  const has = (...words) => words.some(w => {
    // Escape special regex chars like + in C++
    const escaped = w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(`\\b${escaped}\\b`, 'i')
    return regex.test(userMessage)
  })

  // ── Social media keyword detection (check first — returns rich links) ──
  const wantsGitHub    = has('github', 'git hub', 'my code', 'repo', 'repository', 'source code', 'code link')
  const wantsLinkedIn  = has('linkedin', 'linked in', 'professional profile', 'professional network', 'ln')
  const wantsInstagram = has('instagram', 'insta', 'ig profile', 'reels', 'follow me', ' ig ')
  const wantsSocial    = has('social', 'social media', 'my links', 'find you', 'follow', 'accounts', 'handles', 'connect', 'profile', 'all links')

  if (wantsGitHub && !wantsLinkedIn && !wantsInstagram) {
    return {
      text: "Here's my GitHub profile — check out my projects and code there! 🐙",
      links: [SOCIALS[0]],
    }
  }
  if (wantsLinkedIn && !wantsGitHub && !wantsInstagram) {
    return {
      text: "Let's connect on LinkedIn! I'm actively looking for internship opportunities in AI/ML. 💼",
      links: [SOCIALS[1]],
    }
  }
  if (wantsInstagram && !wantsGitHub && !wantsLinkedIn) {
    return {
      text: "You can follow me on Instagram for updates! 📸",
      links: [SOCIALS[2]],
    }
  }
  if (wantsGitHub || wantsLinkedIn || wantsInstagram || wantsSocial) {
    return {
      text: "Here are all my social media profiles — feel free to connect! 🌐",
      links: SOCIALS,
    }
  }

  // ── Knowledge base ────────────────────────────────────────────────
  const responses = {
    skills: "I'm proficient in Python and C++ (both complete), and I'm actively learning Machine Learning frameworks like NumPy, Pandas, and Matplotlib!",
    hire: "Yes! I'm available for internships, freelance projects, and collaborations. Feel free to reach out at prithvirajsinghworks@gmail.com",
    projects: "I'm currently building a Delivery Time Prediction project using Regression — should be live soon! Check my GitHub for the source code.",
    based: "I'm based in Indore, Madhya Pradesh, India. Currently in my 2nd year at Acropolis Institute of Technology and Research.",
    about:          "Hello !!! I'm Prithviraj Singh Chouhan, a 2nd-year Computer Science student at Acropolis Institute, Indore, specializing in AI/ML. I'm proficient in Python, C++, and data science tools like NumPy and Pandas. My goal is to land an internship where I can apply my skills and grow. I'm based in Indore and always open to exciting opportunities!",
    python: "Python is one of my strong suits! I use it for data analysis, machine learning, and building AI-powered applications with libraries like NumPy and Pandas.",
    cpp: "I have strong knowledge of C++! It's one of my core programming languages and I use it for competitive programming and systems-level development.",
    numpy: "NumPy is essential for my data science work! I use it for numerical computations, array manipulation, and mathematical operations in ML projects.",
    pandas: "Pandas is my go-to library for data manipulation and analysis. I use it extensively for cleaning, transforming, and analyzing datasets in my ML projects.",
    ml: "Machine Learning fascinates me! I'm learning all the fundamentals and core concepts to build intelligent solutions.",
    hobbies: "I'm a huge cricket fan—both playing and watching! I also enjoy badminton. Sports help me stay active and clear my mind between coding sessions.",
    contact: "You can reach me at prithvirajsinghworks@gmail.com or through my portfolio website. I'm always open to interesting opportunities!",
    certifications: "I have certifications in Python and C++! These cover core programming fundamentals and helped solidify my foundation before diving into ML.",
    experience: "I've been coding for 1-2 years, starting with Python and C++. In that time I've built ML projects and learned data science libraries like NumPy and Pandas.",
    languages: "I speak both Hindi and English fluently!",
    availability: "I'm available to start an internship immediately! I'm actively looking for opportunities in AI, ML, or Python development. Reach out at prithvirajsinghworks@gmail.com",
    goals: "My main goal right now is to land an internship in AI/ML where I can apply my Python and Machine Learning skills on real-world problems.",
    university: "I study at Acropolis Institute of Technology and Research in Indore. Currently in my 2nd year, 4th semester, focusing on CS fundamentals and AI.",
    strengths: "My core strengths are being a quick learner and a dedicated team player. I love tackling new challenges and I'm always eager to collaborate on meaningful projects!",
  }

  // ── Multi-topic matching — collect ALL matched topics ────────────────────
  const matched = []

  const rules = [
    [has('who are', 'who is', 'yourself', 'introduce', 'tell me about yourself', 'describe yourself', 'about you'),                                     'about'],
    [has('skill', 'skills', 'know', 'proficient', 'good at', 'expertise', 'abilities', 'tech stack', 'technologies', 'stack'),                        'skills'],
    [has('cert', 'certif', 'certificate', 'certification', 'certified', 'course', 'badge', 'credential', 'qualification', 'achievement'),              'certifications'],
    [has('project', 'projects', 'built', 'building', 'work on', 'making', 'working on', 'portfolio work', 'app', 'application', 'what have you made'), 'projects'],
    [has('python', 'py language'),                                                                                                                       'python'],
    [has('c++', 'cpp', 'c plus plus', 'cplusplus'),                                                                                                     'cpp'],
    [has('numpy', 'np', 'numerical python'),                                                                                                             'numpy'],
    [has('pandas', 'pd', 'dataframe', 'data frame'),                                                                                                    'pandas'],
    [has('machine learning', 'deep learning', ' ml ', 'ml?', 'neural', 'ai?', 'artificial intelligence', 'data science', 'regression', 'training'),   'ml'],
    [has('hobbies', 'hobby', 'interest', 'sports', 'cricket', 'badminton', 'fun', 'free time', 'outside', 'passion', 'like to do', 'play', 'game'),   'hobbies'],
    [has('experience', 'started', 'journey', 'since', 'background', 'how long', 'years of', 'coding since', 'when did you start'),                    'experience'],
    [has('language', 'speak', 'hindi', 'english', 'fluent', 'tongue', 'languages you know'),                                                           'languages'],
    [has('goal', 'future', 'aspire', 'dream', 'aim', 'objective', 'plan', 'where do you see', 'ambition'),                                             'goals'],
    [has('university', 'college', 'semester', 'acropolis', 'degree', 'study', 'studies', 'student', 'education', 'school', 'institute', 'btech'),      'university'],
    [has('where', 'based', 'location', 'city', 'indore', 'place', 'live', 'from', 'hometown'),                                                         'based'],
    [has('contact', 'reach', 'email', 'message', 'dm', 'talk to', 'get in touch', 'mail', 'gmail'),                                                    'contact'],
    [has('hire', 'available', 'intern', 'internship', 'opportunity', 'collaborate', 'freelance', 'job', 'work with', 'open to', 'looking for work'),   'hire'],
    [has('strength', 'strengths', 'good at', 'quick learner', 'teamwork', 'team player'),                                                              'strengths'],
  ]

  for (const [condition, key] of rules) {
    if (condition && !matched.includes(key)) matched.push(key)
  }

  if (matched.length > 0) {
    return matched.map(key => responses[key]).join('  ')
  }

  return "I'm here to answer any questions you have! Feel free to ask about my skills, projects, certifications, or how we can work together. What would you like to know?"
}


// ── Typing indicator ─────────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div style={{ display: 'flex', gap: 4, alignItems: 'center', padding: '12px 16px' }}>
      {[0, 1, 2].map(i => (
        <motion.span key={i}
          style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent-primary)', display: 'block' }}
          animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  )
}

// ── Main Chatbot Component ───────────────────────────────────────────────────
export default function Chatbot() {
  const { isDark } = useTheme()
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState([
    { from: 'bot', text: '👋 Hi! I\'m Prithviraj. Ask me anything!' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showChips, setShowChips] = useState(true)
  const [speakEnabled, setSpeakEnabled] = useState(true)   // 🔊 ON by default
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isListening, setIsListening] = useState(false)    // 🎙️ STT
  const [sttSupported] = useState(() => !!(window.SpeechRecognition || window.webkitSpeechRecognition))
  const bottomRef = useRef(null)
  const inputRef = useRef(null)
  const recognitionRef = useRef(null)

  // ── TTS helpers ────────────────────────────────────────────────────────────
  const audioRef = useRef(null)   // holds ElevenLabs Audio object

  const stopSpeak = () => {
    // Stop ElevenLabs audio
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = ''
      audioRef.current = null
    }
    // Stop browser TTS
    window.speechSynthesis?.cancel()
    setIsSpeaking(false)
  }

  const speak = async (text, responseKey = null) => {
    if (!speakEnabled) return
    stopSpeak()

    // ── Phonetic Fixes for Clearer Pronunciation ──
    const voiceText = text
      .replace(/Chouhan/g, 'Cho-hahn')

    // ── Fallback to TTS ────────────────────────────────────────────────────
    speakWithTTS(voiceText)
  }

  // Keep utter ref to prevent GC from killing events (common browser bug)
  const utterRef = useRef(null)

  const speakWithTTS = async (text) => {
    // ── Browser TTS (Natural & Clean) ──────────────────────────────────────
    if (!window.speechSynthesis) return
    window.speechSynthesis.cancel() 
    
    const utter = new SpeechSynthesisUtterance(text)
    utterRef.current = utter 
    
    const voices = window.speechSynthesis.getVoices()
    const preferredVoice = voices.find(v => v.lang.startsWith('en') && v.name.includes('Natural') && (v.name.includes('Guy') || v.name.includes('Male') || v.name.includes('David'))) 
      || voices.find(v => v.lang.startsWith('en') && v.name.includes('Google') && (v.name.includes('Male') || v.name.includes('Guy')))
      || voices.find(v => v.lang.startsWith('en') && (v.name.includes('Male') || v.name.includes('Guy')))
      || voices.find(v => v.lang.startsWith('en'))
    
    if (preferredVoice) utter.voice = preferredVoice

    utter.lang = 'en-US'
    utter.rate = 1.2
    utter.pitch = 0.95

    utter.onstart = () => setIsSpeaking(true)
    utter.onend = () => setIsSpeaking(false)
    utter.onerror = () => setIsSpeaking(false)
    
    window.speechSynthesis.speak(utter)
  }


  // ── STT: toggle microphone ────────────────────────────────────────────────
  const sttTranscriptRef = useRef('')   // track final transcript for auto-send

  const toggleMic = () => {
    if (!sttSupported) return

    // Stop if already listening
    if (isListening) {
      recognitionRef.current?.stop()
      setIsListening(false)
      return
    }

    sttTranscriptRef.current = ''

    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    const rec = new SR()
    rec.lang = 'en-US'
    rec.interimResults = true
    rec.maxAlternatives = 1
    rec.continuous = false
    recognitionRef.current = rec

    rec.onstart = () => setIsListening(true)

    rec.onresult = (e) => {
      let finalText = ''
      let interimText = ''
      for (let i = 0; i < e.results.length; i++) {
        const result = e.results[i]
        if (result.isFinal) {
          finalText += result[0].transcript
        } else {
          interimText += result[0].transcript
        }
      }
      // Show live transcript in input
      const display = finalText || interimText
      setInput(display)
      sttTranscriptRef.current = finalText
    }

    rec.onerror = () => {
      setIsListening(false)
    }

    rec.onend = () => {
      setIsListening(false)
      // Auto-send the final transcript if we got one
      const finalText = sttTranscriptRef.current.trim()
      if (finalText) {
        // Small delay to let React update, then auto-send
        setTimeout(() => sendMessage(finalText), 150)
      } else {
        setTimeout(() => inputRef.current?.focus(), 100)
      }
    }

    rec.start()
  }

  // Auto-scroll on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs, loading])

  // Focus input when chat opens; stop speech when chat closes
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300)
    else {
      stopSpeak()
      recognitionRef.current?.stop()
      setIsListening(false)
    }
  }, [open])

  // Pre-load voices for smoother TTS
  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.getVoices()
    }
  }, [])

  const sendMessage = async (text) => {
    const userText = text.trim()
    if (!userText || loading) return
    setShowChips(false)
    setError(null)
    setInput('')

    // Keep max 20 messages (excluding system welcome)
    const newMsgs = [...msgs, { from: 'user', text: userText }].slice(-20)
    setMsgs(newMsgs)
    setLoading(true)

    try {
      const userText = newMsgs[newMsgs.length - 1]?.text || ''
      const reply = await generateLocalResponse(userText)
      const botMsg = typeof reply === 'string'
        ? { from: 'bot', text: reply }
        : { from: 'bot', text: reply.text, links: reply.links }
      setMsgs(prev => [...prev, botMsg].slice(-20))
      // Auto-speak the reply text
      speak(botMsg.text)
    } catch (e) {
      setError('⚠️ Error generating response. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input) }
  }

  // ── Styles (theme-aware inline) ────────────────────────────────────────────
  const s = {
    window: {
      position: 'fixed', bottom: 88, right: 24, zIndex: 9998,
      width: 380, maxWidth: 'calc(100vw - 48px)',
      height: 520, display: 'flex', flexDirection: 'column',
      borderRadius: 20, overflow: 'hidden',
      background: isDark ? '#0f0f1a' : '#ffffff',
      boxShadow: isDark
        ? '0 24px 60px rgba(0,0,0,0.70), 0 0 0 1px rgba(139,92,246,0.25)'
        : '0 24px 60px rgba(74,45,170,0.20), 0 0 0 1px rgba(196,181,253,0.60)',
    },
    header: {
      background: 'linear-gradient(135deg,#3B0C8C,#6D28D9,#5B21B6)',
      padding: '14px 18px', display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', flexShrink: 0,
    },
    msgArea: {
      flex: 1, overflowY: 'auto', padding: '14px 14px 6px',
      display: 'flex', flexDirection: 'column', gap: 10,
      scrollbarWidth: 'thin',
      scrollbarColor: isDark ? '#4c1d95 transparent' : '#C4B5FD transparent',
    },
    userBubble: {
      alignSelf: 'flex-end', maxWidth: '80%',
      background: 'linear-gradient(135deg,#6D28D9,#7C3AED)',
      color: '#ffffff', borderRadius: '18px 18px 4px 18px',
      padding: '10px 14px', fontSize: 13.5, lineHeight: 1.5,
      boxShadow: '0 2px 8px rgba(109,40,217,0.35)',
    },
    botBubble: {
      alignSelf: 'flex-start', maxWidth: '82%',
      background: isDark ? 'rgba(139,92,246,0.12)' : '#F5F0FF',
      color: isDark ? '#e2d9f3' : '#1A1035',
      border: isDark ? '1px solid rgba(139,92,246,0.20)' : '1px solid #DDD6FE',
      borderRadius: '18px 18px 18px 4px',
      padding: '10px 14px', fontSize: 13.5, lineHeight: 1.5,
    },
    inputArea: {
      flexShrink: 0, padding: '10px 12px',
      borderTop: isDark ? '1px solid rgba(139,92,246,0.20)' : '1px solid #E9E0FF',
      background: isDark ? '#0f0f1a' : '#ffffff',
      display: 'flex', gap: 8, alignItems: 'flex-end',
    },
    input: {
      flex: 1, padding: '10px 14px', borderRadius: 12, fontSize: 13.5, resize: 'none',
      border: isDark ? '1px solid rgba(139,92,246,0.30)' : '1px solid #C4B5FD',
      background: isDark ? 'rgba(139,92,246,0.08)' : '#F5F0FF',
      color: isDark ? '#e2d9f3' : '#1A1035',
      outline: 'none', fontFamily: 'inherit', lineHeight: 1.4,
    },
    sendBtn: {
      width: 40, height: 40, borderRadius: 12, flexShrink: 0,
      background: 'linear-gradient(135deg,#6D28D9,#7C3AED)',
      border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      opacity: loading ? 0.6 : 1,
      boxShadow: '0 4px 12px rgba(109,40,217,0.35)',
    },
    bubble: {
      position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
      width: 56, height: 56, borderRadius: '50%', border: 'none', cursor: 'pointer',
      background: 'linear-gradient(135deg,#3B0C8C,#6D28D9)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 8px 24px rgba(109,40,217,0.55)',
    },
    chip: {
      padding: '6px 12px', borderRadius: 20, fontSize: 12, cursor: 'pointer',
      background: isDark ? 'rgba(139,92,246,0.15)' : '#EDE8FF',
      border: isDark ? '1px solid rgba(139,92,246,0.30)' : '1px solid #C4B5FD',
      color: isDark ? '#a78bfa' : '#5B21B6',
      whiteSpace: 'nowrap', fontWeight: 500, transition: 'all 0.2s',
    },
  }

  return (
    <>
      {/* ── Chat Window ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            style={s.window}
          >
            {/* Header */}
            <div style={s.header}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18,
                }}>🤖</div>
                <div>
                  <p style={{ color: '#fff', fontWeight: 700, fontSize: 14, margin: 0 }}>Prithviraj Singh</p>
                  <p style={{ color: 'rgba(255,255,255,0.70)', fontSize: 11, margin: 0 }}>Always happy to chat</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>

                {/* ── Voice toggle — colorful animated speaker ── */}
                <motion.button
                  onClick={() => { setSpeakEnabled(v => { if (v) stopSpeak(); return !v }) }}
                  title={speakEnabled ? 'Mute voice' : 'Unmute voice'}
                  whileHover={{ scale: 1.10 }} whileTap={{ scale: 0.90 }}
                  animate={isSpeaking ? { boxShadow: ['0 0 8px #34d399', '0 0 18px #10b981', '0 0 8px #34d399'] } : {}}
                  transition={isSpeaking ? { duration: 1.2, repeat: Infinity } : {}}
                  style={{
                    background: '#1e1b4b',
                    border: 'none', borderRadius: 10, width: 34, height: 34, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    transition: 'background 0.3s, box-shadow 0.3s',
                  }}
                >
                  <span style={{ fontSize: 16, lineHeight: 1 }}>
                    {speakEnabled ? '🔊' : '🔇'}
                  </span>
                </motion.button>

                {/* ── Close ── */}
                <motion.button
                  onClick={() => setOpen(false)}
                  whileHover={{ scale: 1.10, background: 'rgba(244,63,94,0.30)' }}
                  whileTap={{ scale: 0.90 }}
                  style={{
                    background: 'rgba(255,255,255,0.12)', border: 'none', borderRadius: 10,
                    width: 34, height: 34, cursor: 'pointer', color: 'rgba(255,255,255,0.90)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background 0.2s',
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </motion.button>

              </div>


            </div>

            {/* Messages */}
            <div style={s.msgArea}>
              {msgs.map((m, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  style={m.from === 'user' ? s.userBubble : s.botBubble}>
                  {m.text}
                  {/* Clickable social link buttons */}
                  {m.links && m.links.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 10 }}>
                      {m.links.map(link => (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: 8,
                            padding: '7px 12px', borderRadius: 10, fontSize: 12.5,
                            fontWeight: 600, textDecoration: 'none',
                            background: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)',
                            border: `1px solid ${link.color}44`,
                            color: link.color,
                            transition: 'all 0.2s',
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = link.color + '22'; e.currentTarget.style.borderColor = link.color }}
                          onMouseLeave={e => { e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)'; e.currentTarget.style.borderColor = link.color + '44' }}
                        >
                          {link.label}
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                          </svg>
                        </a>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  style={{ ...s.botBubble, padding: 0, width: 'fit-content' }}>
                  <TypingDots />
                </motion.div>
              )}

              {/* Error */}
              {error && (
                <div style={{ fontSize: 12, color: '#f87171', textAlign: 'center', padding: '4px 8px' }}>
                  {error}
                </div>
              )}

              {/* Quick chips */}
              {showChips && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
                  {CHIPS.map(c => (
                    <button key={c} style={s.chip} onClick={() => sendMessage(c)}>
                      {c}
                    </button>
                  ))}
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div style={s.inputArea}>
              <textarea
                ref={inputRef}
                rows={1}
                style={s.input}
                placeholder={isListening ? '🎙️ Listening…' : 'Ask me anything about my work…'}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
              />

              {/* ── Mic button ─────────────────────────────────────────────── */}
              {sttSupported && (
                <motion.button
                  onClick={toggleMic}
                  title={isListening ? 'Stop listening' : 'Speak your question'}
                  whileHover={{ scale: 1.10 }}
                  whileTap={{ scale: 0.90 }}
                  animate={
                    isListening
                      ? { boxShadow: ['0 0 0px #ef4444', '0 0 14px #ef4444', '0 0 0px #ef4444'] }
                      : { boxShadow: '0 2px 8px rgba(139,92,246,0.30)' }
                  }
                  transition={isListening ? { duration: 1, repeat: Infinity } : {}}
                  style={{
                    width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                    background: isListening
                      ? 'linear-gradient(135deg,#b91c1c,#ef4444)'
                      : isDark
                        ? 'rgba(139,92,246,0.18)'
                        : 'rgba(109,40,217,0.10)',
                    border: isListening
                      ? '1.5px solid #ef4444'
                      : isDark
                        ? '1.5px solid rgba(139,92,246,0.35)'
                        : '1.5px solid #C4B5FD',
                    cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background 0.3s, border 0.3s',
                  }}
                >
                  {isListening ? (
                    /* Animated mic-off / waveform while recording */
                    <motion.svg
                      width="17" height="17" viewBox="0 0 24 24"
                      fill="none" stroke="#fff" strokeWidth="2.2"
                      strokeLinecap="round" strokeLinejoin="round"
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 0.7, repeat: Infinity }}
                    >
                      <rect x="9" y="2" width="6" height="12" rx="3" />
                      <path d="M19 10a7 7 0 01-14 0" />
                      <line x1="12" y1="19" x2="12" y2="22" />
                      <line x1="8" y1="22" x2="16" y2="22" />
                    </motion.svg>
                  ) : (
                    <svg
                      width="17" height="17" viewBox="0 0 24 24"
                      fill="none"
                      stroke={isDark ? '#a78bfa' : '#6D28D9'}
                      strokeWidth="2.2"
                      strokeLinecap="round" strokeLinejoin="round"
                    >
                      <rect x="9" y="2" width="6" height="12" rx="3" />
                      <path d="M19 10a7 7 0 01-14 0" />
                      <line x1="12" y1="19" x2="12" y2="22" />
                      <line x1="8" y1="22" x2="16" y2="22" />
                    </svg>
                  )}
                </motion.button>
              )}

              <motion.button
                style={s.sendBtn}
                whileHover={!loading ? { scale: 1.08 } : {}}
                whileTap={!loading ? { scale: 0.95 } : {}}
                onClick={() => sendMessage(input)}
                disabled={loading}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating Bubble ── */}
      <motion.button
        style={s.bubble}
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.10 }}
        whileTap={{ scale: 0.93 }}
        animate={open ? { rotate: 0 } : { rotate: [0, 10, -10, 0] }}
        transition={open ? {} : { duration: 2, repeat: Infinity, repeatDelay: 4 }}
        title="Chat with Prithviraj's AI"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="close"
              initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}
              style={{ color: '#fff', fontSize: 20, lineHeight: 1 }}>✕</motion.span>
          ) : (
            <motion.span key="bot"
              initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}
              style={{ fontSize: 24 }}>🤖</motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  )
}
