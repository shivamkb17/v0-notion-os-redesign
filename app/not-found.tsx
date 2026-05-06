"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  ArrowLeft,
  Volume2,
  VolumeX,
  RefreshCw,
  Home,
  Sparkles,
  Terminal,
  AlertTriangle,
  Wrench,
  Code2,
  Cpu,
  Mic,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { NotionLogoInline } from "@/components/notion-os/notion-logo"

const GLITCH_CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`0123456789ABCDEF"

const RUMORS = [
  "Our AI agents got into a heated debate about semicolons vs. no semicolons. This page was collateral damage.",
  "v0.app generated this page so beautifully that it ascended to a higher dimension. We're negotiating its return.",
  "ElevenLabs tried to narrate this page into existence. It just whispered 'not yet' and vanished.",
  "Shivam pushed a commit so powerful the page needed a moment to recover. Give it a sec.",
  "This page was last seen vibing in a Notion database labeled 'Top Secret Redesigns'.",
  "The AI ran out of creativity tokens. It used them all on the homepage. Can you blame it?",
  "Legend has it this page is being hand-crafted by v0.app at molecular precision. Patience.",
  "A rogue AI agent archived this page 'for safekeeping.' We're filing a support ticket.",
  "This URL is valid in 7 parallel universes. Unfortunately, this isn't one of them.",
  "Shivam's redesign was so fire, this page spontaneously combusted. Rebuilding in progress.",
  "Our voice AI tried reading this page aloud. It got stage fright. Classic.",
  "This page exists in Notion's knowledge graph, but only on Tuesdays. Check back then.",
  "v0.app is currently rendering this page at 4K resolution. Your screen isn't ready.",
  "The ElevenLabs API gave this page a voice, and it said 'I need a vacation.'",
  "Breaking: Page spotted running on a Vercel Edge Function somewhere near the North Pole.",
]

const TERMINAL_LINES = [
  { text: "$ notion-os --locate missing-page", delay: 0, color: "text-cyan-400" },
  { text: "[v0.app] Scanning deployment artifacts...", delay: 500, color: "text-white/50" },
  { text: "[v0.app] Checking 2,847 generated components...", delay: 1000, color: "text-white/50" },
  { text: "[ElevenLabs] Attempting voice-activated page recovery...", delay: 1500, color: "text-purple-400" },
  { text: "[AI Agent] Queried knowledge graph: 0 results", delay: 2000, color: "text-amber-400" },
  { text: "[WARN] Page not found in current build", delay: 2500, color: "text-amber-400" },
  { text: "[ERR] 404 - Redesign by Shivam Kumar in progress", delay: 3000, color: "text-red-400" },
  { text: "[INFO] Redirecting user to awesomeness...", delay: 3500, color: "text-green-400" },
  { text: "", delay: 4000, color: "text-green-400" },
]

const TECH_BADGES = [
  { label: "v0.app", icon: Code2, color: "from-white/20 to-white/5", text: "text-white" },
  { label: "ElevenLabs", icon: Mic, color: "from-purple-500/20 to-purple-500/5", text: "text-purple-400" },
  { label: "Next.js 16", icon: Cpu, color: "from-cyan-500/20 to-cyan-500/5", text: "text-cyan-400" },
  { label: "Framer Motion", icon: Sparkles, color: "from-pink-500/20 to-pink-500/5", text: "text-pink-400" },
]

export default function NotFound() {
  const [currentRumor, setCurrentRumor] = useState(0)
  const [glitchedTitle, setGlitchedTitle] = useState("404")
  const [isGlitching, setIsGlitching] = useState(false)
  const [terminalLines, setTerminalLines] = useState<number[]>([])
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [hasSpoken, setHasSpoken] = useState(false)
  const [orbs, setOrbs] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number; hue: number }>>([])
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Generate floating orbs on mount
  useEffect(() => {
    setOrbs(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        delay: Math.random() * 5,
        hue: Math.random() > 0.5 ? 260 : 200,
      }))
    )
  }, [])

  // Terminal animation
  useEffect(() => {
    TERMINAL_LINES.forEach((_, index) => {
      setTimeout(() => {
        setTerminalLines((prev) => [...prev, index])
      }, TERMINAL_LINES[index].delay)
    })
  }, [])

  // Rotate rumors every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRumor((prev) => (prev + 1) % RUMORS.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Periodic glitch on "404"
  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true)
      let iterations = 0
      const scramble = setInterval(() => {
        setGlitchedTitle(
          "404"
            .split("")
            .map((char, i) => {
              if (iterations > i * 3) return char
              return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
            })
            .join("")
        )
        iterations++
        if (iterations > 14) {
          clearInterval(scramble)
          setGlitchedTitle("404")
          setIsGlitching(false)
        }
      }, 40)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  // ElevenLabs voice
  const speakRumor = useCallback(async () => {
    if (isSpeaking) return
    setIsSpeaking(true)
    setHasSpoken(true)

    const text = `Oops. 404. ${RUMORS[currentRumor]} But don't worry. This page is being redesigned by Shivam Kumar, powered by v0 dot app and ElevenLabs. Head back home and explore what's already live.`

    try {
      const res = await fetch("/api/voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      })

      if (res.ok) {
        const blob = await res.blob()
        const url = URL.createObjectURL(blob)
        if (!audioRef.current) audioRef.current = new Audio()
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
      {/* Multi-layer gradient background */}
      <div className="absolute inset-0 bg-[#050816]" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(6,182,212,0.08) 0%, transparent 50%), radial-gradient(ellipse 50% 50% at 20% 60%, rgba(168,85,247,0.06) 0%, transparent 50%)",
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(6,182,212,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Floating orbs */}
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: orb.size,
            height: orb.size,
            background: orb.hue === 260 ? "rgba(129,140,248,0.4)" : "rgba(6,182,212,0.4)",
          }}
          animate={{ y: [0, -30, 0], opacity: [0.15, 0.6, 0.15] }}
          transition={{ duration: 6 + orb.delay, repeat: Infinity, ease: "easeInOut", delay: orb.delay }}
        />
      ))}

      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.04) 2px, rgba(255,255,255,0.04) 4px)",
        }}
      />

      {/* Giant faded 404 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span
          className="text-[35vw] font-black leading-none font-mono tracking-tighter"
          style={{
            background:
              "linear-gradient(180deg, rgba(99,102,241,0.07) 0%, rgba(6,182,212,0.03) 50%, transparent 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          404
        </span>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-6 py-16 flex flex-col items-center text-center">
        {/* Logo with warning ring */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 180, damping: 18 }}
          className="relative mb-10"
        >
          <NotionLogoInline size={80} className="shadow-2xl shadow-indigo-500/30" />
          <motion.div
            className="absolute -inset-5 rounded-3xl border-2 border-dashed border-amber-500/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-red-500 flex items-center justify-center shadow-lg shadow-red-500/40"
          >
            <AlertTriangle className="w-4 h-4 text-white" />
          </motion.div>
        </motion.div>

        {/* Glitched 404 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-8xl sm:text-[10rem] font-black font-mono mb-2 relative leading-none"
          style={{
            background: isGlitching
              ? "linear-gradient(135deg, #ef4444, #f59e0b, #06b6d4)"
              : "linear-gradient(135deg, #818cf8, #06b6d4, #a78bfa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {glitchedTitle}
          {isGlitching && (
            <>
              <span
                className="absolute inset-0 text-red-500/20"
                style={{ transform: "translate(-3px, 2px)", WebkitTextFillColor: "currentColor" }}
              >
                {glitchedTitle}
              </span>
              <span
                className="absolute inset-0 text-cyan-500/20"
                style={{ transform: "translate(3px, -2px)", WebkitTextFillColor: "currentColor" }}
              >
                {glitchedTitle}
              </span>
            </>
          )}
        </motion.h1>

        {/* Status line */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="flex items-center gap-2 mb-2"
        >
          <Wrench className="w-4 h-4 text-amber-400" />
          <p className="text-lg sm:text-xl text-white/80 font-medium">Page not found. Still baking.</p>
        </motion.div>

        {/* Redesign credit */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mb-8"
        >
          <p className="text-sm text-white/40">
            Redesigned by{" "}
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              Shivam Kumar
            </span>{" "}
            using
          </p>
          {/* Tech badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
            {TECH_BADGES.map((badge) => (
              <motion.span
                key={badge.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border border-white/10 bg-gradient-to-r ${badge.color} ${badge.text}`}
              >
                <badge.icon className="w-3 h-3" />
                {badge.label}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Rotating rumors card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="w-full max-w-lg mb-6"
        >
          <div className="relative rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-5 overflow-hidden group">
            {/* Animated border glow */}
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: "linear-gradient(135deg, rgba(99,102,241,0.1), transparent 40%, rgba(6,182,212,0.1))",
              }}
            />
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-10 h-10 border-l-2 border-t-2 border-cyan-500/25 rounded-tl-xl" />
            <div className="absolute bottom-0 right-0 w-10 h-10 border-r-2 border-b-2 border-purple-500/25 rounded-br-xl" />

            <div className="relative flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/10 flex items-center justify-center flex-shrink-0 mt-0.5 border border-amber-500/20">
                <Sparkles className="w-4 h-4 text-amber-400" />
              </div>
              <div className="flex-1 min-h-[52px]">
                <p className="text-[10px] text-amber-400/70 font-mono uppercase tracking-wider mb-1.5">
                  Rumor #{String(currentRumor + 1).padStart(2, "0")} of {RUMORS.length}
                </p>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentRumor}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="text-white/70 text-sm leading-relaxed"
                  >
                    {RUMORS[currentRumor]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            {/* Progress dots */}
            <div className="flex items-center justify-center gap-1 mt-4">
              {RUMORS.map((_, i) => (
                <motion.div
                  key={i}
                  className="h-1 rounded-full transition-all duration-500"
                  animate={{
                    width: i === currentRumor ? 16 : 4,
                    backgroundColor: i === currentRumor ? "rgba(6,182,212,0.8)" : "rgba(255,255,255,0.15)",
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Terminal diagnostic */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="w-full max-w-lg mb-8"
        >
          <div className="rounded-xl border border-white/10 bg-black/50 backdrop-blur-sm overflow-hidden">
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-2 border-b border-white/[0.06] bg-white/[0.02]">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              <div className="flex-1 flex justify-center">
                <span className="text-[10px] text-white/25 font-mono flex items-center gap-1">
                  <Terminal className="w-3 h-3" />
                  notion-os v2.0 -- diagnostics
                </span>
              </div>
            </div>

            {/* Terminal body */}
            <div className="p-4 font-mono text-[11px] space-y-1.5 min-h-[160px]">
              {TERMINAL_LINES.map((line, index) => (
                <AnimatePresence key={index}>
                  {terminalLines.includes(index) && (
                    <motion.div
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.15 }}
                      className={`${line.color} leading-relaxed`}
                    >
                      {index === TERMINAL_LINES.length - 1 ? (
                        <span className="flex items-center gap-1">
                          <span className="text-green-400">$</span>
                          <motion.span
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 0.7, repeat: Infinity }}
                            className="inline-block w-1.5 h-3.5 bg-green-400"
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

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row items-center gap-3 mb-6"
        >
          <Link href="/">
            <Button
              size="lg"
              className="bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 text-white font-semibold px-8 gap-2 shadow-lg shadow-indigo-500/25"
            >
              <Home className="w-4 h-4" />
              Back to Notion OS
            </Button>
          </Link>

          <Button
            size="lg"
            variant="outline"
            onClick={() => window.location.reload()}
            className="border-white/15 text-white/70 hover:text-white hover:bg-white/10 gap-2 bg-white/[0.03]"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Button>
        </motion.div>

        {/* ElevenLabs voice button */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
          <button
            onClick={isSpeaking ? stopSpeaking : speakRumor}
            className="group flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] transition-all text-sm backdrop-blur-sm"
          >
            {isSpeaking ? (
              <>
                <VolumeX className="w-4 h-4 text-red-400" />
                <span className="text-white/60">Stop narration</span>
                <span className="flex items-center gap-0.5 ml-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.span
                      key={i}
                      className="w-0.5 bg-cyan-400 rounded-full"
                      animate={{ height: [3, 14, 3] }}
                      transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.08 }}
                    />
                  ))}
                </span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                <span className="text-white/50 group-hover:text-white/80 transition-colors">
                  {hasSpoken ? "Hear another rumor" : "Let AI narrate this"}
                </span>
                <span className="text-[10px] text-purple-400/60 font-mono ml-1">ElevenLabs</span>
              </>
            )}
          </button>
        </motion.div>

        {/* Footer: credit + breadcrumb */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-14 flex flex-col items-center gap-4"
        >
          {/* Build credit */}
          <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.02]">
            <span className="text-[11px] text-white/30 font-mono">Built with</span>
            <a
              href="https://v0.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-white/50 hover:text-white/80 font-semibold flex items-center gap-1 transition-colors"
            >
              v0.app <ExternalLink className="w-2.5 h-2.5" />
            </a>
            <span className="text-white/15">+</span>
            <a
              href="https://elevenlabs.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-purple-400/50 hover:text-purple-400/80 font-semibold flex items-center gap-1 transition-colors"
            >
              ElevenLabs <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[11px] text-white/25 font-mono">
            <Link href="/" className="hover:text-white/50 transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" />
              home
            </Link>
            <span>/</span>
            <span className="text-red-400/50">404</span>
            <span>/</span>
            <span className="text-white/15">page-is-baking</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
