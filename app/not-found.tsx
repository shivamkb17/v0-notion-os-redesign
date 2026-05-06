"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Volume2, VolumeX, RefreshCw, Home, Sparkles, Terminal, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NotionLogoInline } from "@/components/notion-os/notion-logo"

const GLITCH_CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`0123456789"

const RUMORS = [
  "Our AI agents got distracted discussing philosophy with a chatbot from 2019.",
  "This page was last seen arguing with a database about the meaning of NULL.",
  "Legend says this page exists in a parallel workspace where tabs never crash.",
  "Our engineers are currently teaching this page how to exist. Progress: 42%.",
  "This page went to get coffee and forgot to come back. Classic intern move.",
  "We asked GPT to build this page. It wrote a poem instead. A really good one.",
  "Fun fact: This page is being baked at exactly 404 degrees Fahrenheit.",
  "The Notion AI agents are on it. They just need to finish their current argument about semicolons.",
  "This page is in a quantum state: it both exists and doesn't until you observe it.",
  "Our voice AI tried to narrate this page into existence. It just laughed.",
  "v0.app is generating this page as we speak. ETA: somewhere between now and the heat death of the universe.",
  "This page took a personal day. We respect work-life balance here.",
  "Breaking: Page found hiding in a nested toggle inside a toggle inside a toggle.",
  "Our search agent scanned 47 billion documents. This page was not among them.",
  "This URL has been referred to the Department of Missing Pages.",
]

const TERMINAL_LINES = [
  { text: "$ notion-os --locate page", delay: 0, color: "text-cyan-400" },
  { text: "Scanning knowledge graph...", delay: 600, color: "text-white/60" },
  { text: "Checking 47 workspaces...", delay: 1200, color: "text-white/60" },
  { text: "Querying AI agents...", delay: 1800, color: "text-white/60" },
  { text: "[WARN] Page not found in any known dimension", delay: 2400, color: "text-amber-400" },
  { text: "[ERR] 404 - This page is vibing elsewhere", delay: 3000, color: "text-red-400" },
  { text: "", delay: 3600, color: "text-green-400" },
]

export default function NotFound() {
  const [currentRumor, setCurrentRumor] = useState(0)
  const [glitchedTitle, setGlitchedTitle] = useState("404")
  const [isGlitching, setIsGlitching] = useState(false)
  const [terminalLines, setTerminalLines] = useState<number[]>([])
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [hasSpoken, setHasSpoken] = useState(false)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number }>>([])
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const rumorIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Generate particles on mount
  useEffect(() => {
    const generated = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 8 + 4,
    }))
    setParticles(generated)
  }, [])

  // Terminal animation
  useEffect(() => {
    TERMINAL_LINES.forEach((line, index) => {
      setTimeout(() => {
        setTerminalLines(prev => [...prev, index])
      }, line.delay)
    })
  }, [])

  // Rotate rumors
  useEffect(() => {
    rumorIntervalRef.current = setInterval(() => {
      setCurrentRumor(prev => (prev + 1) % RUMORS.length)
    }, 5000)
    return () => {
      if (rumorIntervalRef.current) clearInterval(rumorIntervalRef.current)
    }
  }, [])

  // Periodic glitch effect on the 404 title
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true)
      let iterations = 0
      const scramble = setInterval(() => {
        setGlitchedTitle(
          "404".split("").map((char, i) => {
            if (iterations > i * 3) return char
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
          }).join("")
        )
        iterations++
        if (iterations > 12) {
          clearInterval(scramble)
          setGlitchedTitle("404")
          setIsGlitching(false)
        }
      }, 50)
    }, 4000)
    return () => clearInterval(glitchInterval)
  }, [])

  // ElevenLabs voice narration
  const speakRumor = useCallback(async () => {
    if (isSpeaking) return
    setIsSpeaking(true)
    setHasSpoken(true)

    const text = `Oops! 404. ${RUMORS[currentRumor]} Don't worry though, this page is being baked with love by v0 dot app and ElevenLabs. Head back home and explore what's already alive.`

    try {
      const response = await fetch("/api/voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)

        if (!audioRef.current) {
          audioRef.current = new Audio()
        }
        audioRef.current.src = url
        audioRef.current.volume = 0.7
        audioRef.current.onended = () => setIsSpeaking(false)
        audioRef.current.onerror = () => setIsSpeaking(false)
        await audioRef.current.play()
      } else {
        setIsSpeaking(false)
      }
    } catch {
      setIsSpeaking(false)
    }
  }, [currentRumor, isSpeaking])

  const stopSpeaking = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    setIsSpeaking(false)
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050816] via-[#0d1339] to-[#1a0a2e]" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(6,182,212,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.5) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Floating particles */}
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-cyan-400/20"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.1, 0.5, 0.1],
          }}
          transition={{ duration: p.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)`,
        }}
      />

      {/* Large faded 404 background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span
          className="text-[30vw] font-bold leading-none font-mono"
          style={{
            background: "linear-gradient(180deg, rgba(99,102,241,0.08) 0%, rgba(6,182,212,0.04) 50%, transparent 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          404
        </span>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 py-12 flex flex-col items-center text-center">
        {/* Logo with glitch ring */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="relative mb-8"
        >
          <NotionLogoInline size={72} className="shadow-2xl shadow-purple-500/30" />
          {/* Warning ring */}
          <motion.div
            className="absolute -inset-4 rounded-3xl border-2 border-dashed border-amber-500/40"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          {/* Alert badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-red-500 flex items-center justify-center"
          >
            <AlertTriangle className="w-4 h-4 text-white" />
          </motion.div>
        </motion.div>

        {/* Glitched 404 title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-8xl sm:text-9xl font-bold font-mono mb-4 relative"
          style={{
            background: isGlitching
              ? "linear-gradient(135deg, #ef4444, #f59e0b, #06b6d4)"
              : "linear-gradient(135deg, #818cf8, #06b6d4, #a78bfa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: isGlitching ? "0 0 40px rgba(239,68,68,0.5)" : "0 0 40px rgba(99,102,241,0.3)",
            filter: isGlitching ? "blur(0.5px)" : "none",
          }}
        >
          {glitchedTitle}
          {isGlitching && (
            <>
              <span className="absolute inset-0 text-red-500/30" style={{ transform: "translate(-2px, 1px)", WebkitTextFillColor: "currentColor" }}>
                {glitchedTitle}
              </span>
              <span className="absolute inset-0 text-cyan-500/30" style={{ transform: "translate(2px, -1px)", WebkitTextFillColor: "currentColor" }}>
                {glitchedTitle}
              </span>
            </>
          )}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl sm:text-2xl text-white/80 font-medium mb-2"
        >
          Page not found. Still baking.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-sm text-white/40 mb-8 flex items-center gap-2"
        >
          <span>Powered by</span>
          <span className="text-cyan-400 font-semibold">v0.app</span>
          <span>+</span>
          <span className="text-purple-400 font-semibold">ElevenLabs</span>
        </motion.p>

        {/* Rotating rumors card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="w-full max-w-lg mb-8"
        >
          <div className="relative rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-5 overflow-hidden">
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-cyan-500/30 rounded-tl-xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-purple-500/30 rounded-br-xl" />

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
              </div>
              <div className="flex-1 min-h-[48px]">
                <p className="text-xs text-amber-400/80 font-mono mb-1">RUMOR #{currentRumor + 1}</p>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentRumor}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="text-white/70 text-sm leading-relaxed"
                  >
                    {RUMORS[currentRumor]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            {/* Rumor dots */}
            <div className="flex items-center justify-center gap-1 mt-4">
              {RUMORS.map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    i === currentRumor ? "bg-cyan-400 w-4" : "bg-white/20"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Terminal log */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="w-full max-w-lg mb-8"
        >
          <div className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm overflow-hidden">
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10 bg-white/[0.02]">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              </div>
              <div className="flex-1 flex justify-center">
                <span className="text-[10px] text-white/30 font-mono flex items-center gap-1">
                  <Terminal className="w-3 h-3" />
                  notion-os-diagnostics
                </span>
              </div>
            </div>

            {/* Terminal body */}
            <div className="p-4 font-mono text-xs space-y-1 min-h-[140px]">
              {TERMINAL_LINES.map((line, index) => (
                <AnimatePresence key={index}>
                  {terminalLines.includes(index) && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                      className={line.color}
                    >
                      {index === TERMINAL_LINES.length - 1 ? (
                        <span className="flex items-center gap-1">
                          <span className="text-green-400">$</span>
                          <motion.span
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                            className="inline-block w-2 h-3.5 bg-green-400"
                          />
                        </span>
                      ) : (
                        line.text
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row items-center gap-3 mb-6"
        >
          <Link href="/">
            <Button
              size="lg"
              className="bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 text-white font-semibold px-8 gap-2"
            >
              <Home className="w-4 h-4" />
              Back to Notion OS
            </Button>
          </Link>

          <Button
            size="lg"
            variant="outline"
            onClick={() => window.location.reload()}
            className="border-white/20 text-white/70 hover:text-white hover:bg-white/10 gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Button>
        </motion.div>

        {/* Voice button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <button
            onClick={isSpeaking ? stopSpeaking : speakRumor}
            className="group flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] transition-all text-sm"
          >
            {isSpeaking ? (
              <>
                <VolumeX className="w-4 h-4 text-red-400" />
                <span className="text-white/60">Stop narration</span>
                <span className="flex items-center gap-0.5 ml-1">
                  {[...Array(4)].map((_, i) => (
                    <motion.span
                      key={i}
                      className="w-0.5 bg-cyan-400 rounded-full"
                      animate={{ height: [4, 12, 4] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                    />
                  ))}
                </span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-cyan-400 group-hover:text-cyan-300" />
                <span className="text-white/60 group-hover:text-white/80">
                  {hasSpoken ? "Hear another rumor" : "Let AI narrate this"}
                </span>
              </>
            )}
          </button>
        </motion.div>

        {/* Footer breadcrumb */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-12 flex items-center gap-2 text-xs text-white/30 font-mono"
        >
          <Link href="/" className="hover:text-white/60 transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3 h-3" />
            home
          </Link>
          <span>/</span>
          <span className="text-red-400/60">404</span>
          <span>/</span>
          <span className="text-white/20">this-page-is-baking</span>
        </motion.div>
      </div>
    </div>
  )
}
