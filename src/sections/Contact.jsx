import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import useWeb3Forms from '@web3forms/react'

// ─── 🔑 ONLY THING YOU NEED TO DO ──────────────────────────────────────────
//
//   1. Go to  https://web3forms.com
//   2. Enter your email  →  they send you a free Access Key instantly
//   3. Paste that key below (looks like: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx")
//
const WEB3FORMS_ACCESS_KEY = '19bdea6d-4074-488d-8543-8791389c8652'

// ─── Constants ───────────────────────────────────────────────────────────────
const MAX_MSG = 500

const SOCIALS = [
  {
    label: 'GitHub',
    href: 'https://github.com/PrithvirajChouhan-tech',
    color: '#f1f5f9',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/prithviraj-singh-chouhan-b7398437a',
    color: '#0a66c2',
    icon: (
      <svg className="w-5 h-5 text-[#0a66c2]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/prithviraj__18?igsh=MTkyZzVrMTI2Y29scg==',
    color: '#E1306C',
    icon: (
      <svg className="w-5 h-5 text-[#E1306C]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
]

// ─── Input Field Component ────────────────────────────────────────────────────
function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs text-slate-400 font-medium tracking-wide">{label}</label>
        {error && (
          <motion.span
            initial={{ opacity: 0, x: 6 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xs text-red-400"
          >
            {error}
          </motion.span>
        )}
      </div>
      {children}
    </div>
  )
}

// ─── Main Contact Section ─────────────────────────────────────────────────────
export default function Contact() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  // Web3Forms hook
  const { submit, loading } = useWeb3Forms({
    access_key: WEB3FORMS_ACCESS_KEY,
    settings: {
      from_name: 'Portfolio Contact',
      subject: `New message from ${form.name || 'Portfolio Visitor'}`,
    },
    onSuccess: () => {
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
      setTouched({})
      setTimeout(() => setStatus('idle'), 6000)
    },
    onError: () => {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    },
  })

  const [status, setStatus] = useState('idle') // idle | success | error

  // ── Validation ──────────────────────────────────────────────────────────────
  const validate = (fields = form) => {
    const e = {}
    if (!fields.name.trim())                  e.name    = 'Name is required'
    if (!fields.email.trim())                 e.email   = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
                                              e.email   = 'Enter a valid email'
    if (!fields.message.trim())               e.message = 'Message is required'
    else if (fields.message.trim().length < 10) e.message = 'At least 10 characters'
    return e
  }

  const handleChange = e => {
    const { name, value } = e.target
    const next = { ...form, [name]: value }
    setForm(next)
    if (touched[name]) {
      setErrors(validate(next))
    }
  }

  const handleBlur = e => {
    const { name } = e.target
    setTouched(t => ({ ...t, [name]: true }))
    setErrors(validate())
  }

  const handleSubmit = async e => {
    e.preventDefault()

    // Mark all touched
    setTouched({ name: true, email: true, subject: true, message: true })
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    // Guard: key not configured
    if (WEB3FORMS_ACCESS_KEY === 'YOUR_ACCESS_KEY_HERE') {
      setStatus('unconfigured')
      setTimeout(() => setStatus('idle'), 7000)
      return
    }

    setStatus('sending')
    await submit({
      name:    form.name,
      email:   form.email,
      subject: form.subject || '(no subject)',
      message: form.message,
    })
  }

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-xl bg-white/5 border text-sm text-white placeholder-slate-600
     focus:outline-none focus:ring-1 transition-all duration-300
     ${errors[field] && touched[field]
       ? 'border-red-500/60 focus:border-red-500/80 focus:ring-red-500/20'
       : 'border-white/10 focus:border-purple-500/50 focus:ring-purple-500/30'}`

  const msgLen  = form.message.length
  const pct     = Math.min((msgLen / MAX_MSG) * 100, 100)
  const barColor = pct > 90 ? '#f87171' : pct > 70 ? '#fb923c' : '#8b5cf6'

  return (
    <section id="contact" className="py-16 sm:py-28 px-4 sm:px-6 relative overflow-hidden">

      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-px h-20
          bg-gradient-to-b from-transparent to-purple-500/30" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80
          bg-purple-700/8 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 right-1/4 w-60 h-60
          bg-blue-700/6 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-6xl mx-auto w-full" ref={ref}>

        {/* ── Section Header ── */}
        <motion.div
          className="text-center mb-10 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-bold text-pink-400 uppercase tracking-[0.25em]">
            Get In Touch
          </span>
          <h2 className="section-title mt-3">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            Open to internships, collaborations, and conversations about AI&nbsp;&amp;&nbsp;ML.
            Drop a message — I reply within 24&nbsp;hours.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-[1fr_1.35fr] gap-6 sm:gap-10 items-start">

          {/* ── Left: Info panel ── */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {/* Contact Info */}
            <div className="glass rounded-2xl p-6 flex flex-col gap-5">
              <h3 className="font-bold text-white">Contact Information</h3>

              <a href="mailto:dipendrsinghchouhan@gmail.com"
                className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20
                  flex items-center justify-center text-purple-400
                  group-hover:border-purple-500/50 group-hover:bg-purple-500/20 transition-all">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Email</p>
                  <p className="text-sm text-slate-300 group-hover:text-purple-400 transition-colors">
                    dipendrsinghchouhan@gmail.com
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20
                  flex items-center justify-center text-blue-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Location</p>
                  <p className="text-sm text-slate-300">Indore, Madhya Pradesh, India</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20
                  flex items-center justify-center text-green-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Response Time</p>
                  <p className="text-sm text-slate-300">Within 24 hours</p>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="glass rounded-2xl p-6">
              <h3 className="font-bold text-white mb-5">Connect on Socials</h3>
              <div className="flex flex-wrap gap-3">
                {SOCIALS.map((s, i) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl
                      bg-white/5 border border-white/10 text-slate-400
                      hover:text-white hover:border-white/25 transition-all text-sm font-medium"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.08 }}
                  >
                    {s.icon}
                    {s.label}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability badge */}
            <motion.div
              className="glass rounded-2xl p-5 flex items-center gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              <div className="relative flex-shrink-0">
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-60" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Currently Open to Opportunities</p>
                <p className="text-xs text-slate-500 mt-0.5">Internships · Collaborations · Freelance</p>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right: Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">

              {/* ── Success State ── */}
              {status === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="glass rounded-2xl p-8 flex flex-col items-center justify-center
                    gap-5 text-center min-h-[420px]"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
                    className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30
                      flex items-center justify-center"
                  >
                    <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <motion.path
                        strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      />
                    </svg>
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Message Sent! 🚀</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Thanks for reaching out! I've received your message and<br />
                      will get back to you within 24 hours.
                    </p>
                  </div>
                  <motion.div
                    className="h-0.5 bg-gradient-to-r from-transparent via-green-500/40 to-transparent w-3/4"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  />
                  <p className="text-xs text-slate-600">Auto-dismisses in a few seconds…</p>
                </motion.div>
              )}

              {/* ── Unconfigured Key Warning ── */}
              {status === 'unconfigured' && (
                <motion.div
                  key="unconfigured"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="glass rounded-2xl p-8 flex flex-col items-center justify-center
                    gap-5 text-center min-h-[420px] border border-amber-500/20"
                >
                  <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30
                    flex items-center justify-center text-amber-400 text-3xl">
                    🔑
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">One Quick Setup Step</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      To activate the contact form, get your free key:
                    </p>
                    <ol className="text-left mt-4 space-y-2 text-sm text-slate-300">
                      <li className="flex gap-2"><span className="text-purple-400 font-bold">1.</span>
                        Go to <a href="https://web3forms.com" target="_blank" rel="noreferrer"
                          className="text-purple-400 underline underline-offset-2">web3forms.com</a>
                      </li>
                      <li className="flex gap-2"><span className="text-purple-400 font-bold">2.</span>
                        Enter your email → get Access Key in your inbox
                      </li>
                      <li className="flex gap-2"><span className="text-purple-400 font-bold">3.</span>
                        Paste key in <code className="text-xs bg-white/10 px-1.5 py-0.5 rounded">Contact.jsx</code> line&nbsp;14
                      </li>
                    </ol>
                  </div>
                </motion.div>
              )}

              {/* ── Main Form ── */}
              {status !== 'success' && status !== 'unconfigured' && (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass rounded-2xl p-6 sm:p-8 flex flex-col gap-5"
                  noValidate
                >
                  <div>
                    <h3 className="font-bold text-white text-lg">Send a Message</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      All fields marked with * are required
                    </p>
                  </div>

                  {/* Name + Email row */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Your Name *" error={touched.name && errors.name}>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Prithviraj Singh"
                        value={form.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={inputClass('name')}
                      />
                    </Field>

                    <Field label="Your Email *" error={touched.email && errors.email}>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={inputClass('email')}
                      />
                    </Field>
                  </div>

                  {/* Subject */}
                  <Field label="Subject (optional)">
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      placeholder="Internship opportunity / Collaboration / Just saying hi"
                      value={form.subject}
                      onChange={handleChange}
                      className={inputClass('subject')}
                    />
                  </Field>

                  {/* Message */}
                  <Field label={`Message * (${msgLen}/${MAX_MSG})`} error={touched.message && errors.message}>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      placeholder="Hey Prithviraj, I'd love to connect about..."
                      value={form.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      maxLength={MAX_MSG}
                      className={`${inputClass('message')} resize-none`}
                    />
                    {/* Character bar */}
                    <div className="h-0.5 rounded-full bg-white/5 overflow-hidden -mt-1">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: barColor }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  </Field>

                  {/* Error state banner */}
                  <AnimatePresence>
                    {status === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl
                          bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                      >
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        Something went wrong. Please email me directly at&nbsp;
                        <a href="mailto:dipendrsinghchouhan@gmail.com"
                          className="underline underline-offset-2">
                          dipendrsinghchouhan@gmail.com
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={loading || status === 'sending'}
                    className="relative w-full py-3.5 rounded-xl text-sm font-semibold text-white
                      bg-gradient-to-r from-blue-600 to-purple-600 overflow-hidden
                      disabled:opacity-70 disabled:cursor-not-allowed
                      shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
                    whileHover={loading ? {} : { scale: 1.02 }}
                    whileTap={loading ? {} : { scale: 0.98 }}
                  >
                    {/* Shimmer on hover */}
                    <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0
                      translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700" />

                    <span className="flex items-center justify-center gap-2 relative z-10">
                      {loading || status === 'sending' ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10"
                              stroke="currentColor" strokeWidth="4"/>
                            <path className="opacity-75" fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                          </svg>
                          Sending…
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                          </svg>
                          Send Message
                        </>
                      )}
                    </span>
                  </motion.button>

                  <p className="text-xs text-slate-600 text-center">
                    By submitting, I'll receive your message at my email.
                    No spam — ever.
                  </p>
                </motion.form>
              )}

            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
