"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Volume2, Zap, Cpu, Database, Wifi, Shield, Terminal } from "lucide-react"
import { NotionLogoInline } from "./notion-logo"

const BOOT_MESSAGES = [
  { text: "Initializing Notion OS...", icon: Terminal, color: "cyan" },
  { text: "Loading cognitive engine...", icon: Cpu, color: "purple" },
  { text: "Connecting knowledge graph...", icon: Database, color: "pink" },
  { text: "Establishing secure protocols...", icon: Shield, color: "green" },
  { text: "Syncing neural pathways...", icon: Wifi, color: "yellow" },
  { text: "Voice interface ready...", icon: Zap, color: "cyan" },
]

const VOICE_INTRO = "Welcome to Notion. Your intelligent workspace. Let me show you how thinking works."

const TYPING_SPEED = 35
const LINE_DELAY = 300

interface BootScreenProps {
  onComplete: () => void
}

// Glitch sound generator using Web Audio API
class GlitchSoundEngine {
  private audioContext: AudioContext | null = null
  private gainNode: GainNode | null = null
  public initialized = false

  async init(): Promise<boolean> {
    if (this.initialized) return true
    if (typeof window === "undefined") return false
    
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      
      // Resume if suspended (required for some browsers)
      if (this.audioContext.state === "suspended") {
        await this.audioContext.resume()
      }
      
      this.gainNode = this.audioContext.createGain()
      this.gainNode.connect(this.audioContext.destination)
      this.gainNode.gain.value = 0.15
      this.initialized = true
      return true
    } catch {
      return false
    }
  }

  playGlitch() {
    if (!this.audioContext || !this.gainNode || !this.initialized) return
    
    const duration = 0.08 + Math.random() * 0.12
    const osc = this.audioContext.createOscillator()
    const oscGain = this.audioContext.createGain()
    
    osc.connect(oscGain)
    oscGain.connect(this.gainNode)
    
    osc.frequency.value = 100 + Math.random() * 800
    osc.type = ["square", "sawtooth", "triangle"][Math.floor(Math.random() * 3)] as OscillatorType
    
    const now = this.audioContext.currentTime
    osc.frequency.setValueAtTime(osc.frequency.value, now)
    osc.frequency.exponentialRampToValueAtTime(50 + Math.random() * 200, now + duration)
    
    oscGain.gain.setValueAtTime(0, now)
    oscGain.gain.linearRampToValueAtTime(0.3, now + 0.01)
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + duration)
    
    osc.start(now)
    osc.stop(now + duration)
  }

  playBootSound() {
    if (!this.audioContext || !this.gainNode || !this.initialized) return
    
    const now = this.audioContext.currentTime
    
    // Low frequency hum
    const osc1 = this.audioContext.createOscillator()
    const gain1 = this.audioContext.createGain()
    osc1.connect(gain1)
    gain1.connect(this.gainNode)
    osc1.frequency.value = 80
    osc1.type = "sine"
    gain1.gain.setValueAtTime(0, now)
    gain1.gain.linearRampToValueAtTime(0.2, now + 0.1)
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.5)
    osc1.start(now)
    osc1.stop(now + 0.5)
    
    // High frequency ping
    const osc2 = this.audioContext.createOscillator()
    const gain2 = this.audioContext.createGain()
    osc2.connect(gain2)
    gain2.connect(this.gainNode)
    osc2.frequency.value = 1200
    osc2.type = "sine"
    gain2.gain.setValueAtTime(0, now + 0.05)
    gain2.gain.linearRampToValueAtTime(0.15, now + 0.08)
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.3)
    osc2.start(now + 0.05)
    osc2.stop(now + 0.3)
  }

  playTypeSound() {
    if (!this.audioContext || !this.gainNode || !this.initialized) return
    
    const osc = this.audioContext.createOscillator()
    const gain = this.audioContext.createGain()
    osc.connect(gain)
    gain.connect(this.gainNode)
    
    osc.frequency.value = 800 + Math.random() * 400
    osc.type = "square"
    
    const now = this.audioContext.currentTime
    gain.gain.setValueAtTime(0, now)
    gain.gain.linearRampToValueAtTime(0.05, now + 0.005)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03)
    
    osc.start(now)
    osc.stop(now + 0.03)
  }

  playLineComplete() {
    if (!this.audioContext || !this.gainNode || !this.initialized) return
    
    const now = this.audioContext.currentTime
    const frequencies = [523.25, 659.25, 783.99]
    frequencies.forEach((freq, i) => {
      const osc = this.audioContext!.createOscillator()
      const gain = this.audioContext!.createGain()
      osc.connect(gain)
      gain.connect(this.gainNode!)
      osc.frequency.value = freq
      osc.type = "sine"
      
      const startTime = now + i * 0.05
      gain.gain.setValueAtTime(0, startTime)
      gain.gain.linearRampToValueAtTime(0.1, startTime + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.15)
      
      osc.start(startTime)
      osc.stop(startTime + 0.15)
    })
  }

  playBootComplete() {
    if (!this.audioContext || !this.gainNode || !this.initialized) return
    
    const now = this.audioContext.currentTime
    const frequencies = [261.63, 329.63, 392.00, 523.25, 659.25]
    frequencies.forEach((freq, i) => {
      const osc = this.audioContext!.createOscillator()
      const gain = this.audioContext!.createGain()
      osc.connect(gain)
      gain.connect(this.gainNode!)
      osc.frequency.value = freq
      osc.type = "sine"
      
      const startTime = now + i * 0.08
      gain.gain.setValueAtTime(0, startTime)
      gain.gain.linearRampToValueAtTime(0.12, startTime + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25)
      
      osc.start(startTime)
      osc.stop(startTime + 0.25)
    })
  }

  destroy() {
    if (this.audioContext && this.audioContext.state !== "closed") {
      this.audioContext.close().catch(() => {})
    }
    this.initialized = false
  }
}

export function BootScreen({ onComplete }: BootScreenProps) {
  const [isBooting, setIsBooting] = useState(true)
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [showCursor, setShowCursor] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [bootComplete, setBootComplete] = useState(false)
  const [voiceState, setVoiceState] = useState<"idle" | "loading" | "playing" | "done">("idle")
  const [audioInitialized, setAudioInitialized] = useState(false)
  const [glitchActive, setGlitchActive] = useState(false)
  const [systemStats, setSystemStats] = useState({ cpu: 0, memory: 0, network: 0 })
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([])
  
  const hasCompletedRef = useRef(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const voiceTriggeredRef = useRef(false)
  const glitchEngineRef = useRef<GlitchSoundEngine | null>(null)
  const particleIdRef = useRef(0)
  const glitchIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const initAttemptedRef = useRef(false)

  // Initialize audio engine
  const initAudio = useCallback(async () => {
    if (audioInitialized || initAttemptedRef.current) return
    initAttemptedRef.current = true
    
    if (!glitchEngineRef.current) {
      glitchEngineRef.current = new GlitchSoundEngine()
    }
    
    const success = await glitchEngineRef.current.init()
    if (success) {
      setAudioInitialized(true)
      
      // Play initial boot sound
      glitchEngineRef.current.playBootSound()
      
      // Start glitch sequence
      glitchIntervalRef.current = setInterval(() => {
        if (glitchEngineRef.current?.initialized && Math.random() > 0.6) {
          glitchEngineRef.current.playGlitch()
          setGlitchActive(true)
          setTimeout(() => setGlitchActive(false), 100)
        }
      }, 200)
    }
  }, [audioInitialized])

  // Try to auto-init audio on mount, and listen for ANY interaction
  useEffect(() => {
    // Attempt auto-init (will work if user has interacted with page before)
    initAudio()
    
    // Listen for any user interaction to enable audio
    const events = ["click", "touchstart", "keydown", "mousemove", "scroll"]
    
    const handleInteraction = () => {
      initAudio()
      // Remove listeners after first successful interaction
      if (glitchEngineRef.current?.initialized) {
        events.forEach(event => document.removeEventListener(event, handleInteraction))
      }
    }
    
    events.forEach(event => document.addEventListener(event, handleInteraction, { once: false, passive: true }))
    
    return () => {
      events.forEach(event => document.removeEventListener(event, handleInteraction))
      if (glitchIntervalRef.current) clearInterval(glitchIntervalRef.current)
    }
  }, [initAudio])

  // Cleanup audio engine
  useEffect(() => {
    return () => {
      if (glitchEngineRef.current) {
        glitchEngineRef.current.destroy()
      }
      if (glitchIntervalRef.current) {
        clearInterval(glitchIntervalRef.current)
      }
    }
  }, [])

  // Simulate system stats
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStats({
        cpu: Math.min(100, 30 + Math.random() * 70),
        memory: Math.min(100, 40 + Math.random() * 50),
        network: Math.min(100, 20 + Math.random() * 80),
      })
    }, 150)
    return () => clearInterval(interval)
  }, [])

  // Generate particles
  useEffect(() => {
    const interval = setInterval(() => {
      if (particles.length < 15) {
        setParticles(prev => [
          ...prev,
          { id: particleIdRef.current++, x: Math.random() * 100, y: Math.random() * 100 }
        ])
      }
    }, 300)
    
    const cleanup = setInterval(() => {
      setParticles(prev => prev.slice(-12))
    }, 2000)
    
    return () => {
      clearInterval(interval)
      clearInterval(cleanup)
    }
  }, [particles.length])

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => setShowCursor(prev => !prev), 530)
    return () => clearInterval(interval)
  }, [])

  const completeBootSequence = useCallback(() => {
    if (hasCompletedRef.current) return
    hasCompletedRef.current = true
    
    setIsTransitioning(true)
    setTimeout(() => {
      setIsBooting(false)
      setTimeout(onComplete, 600)
    }, 400)
  }, [onComplete])

  const triggerVoice = useCallback(async () => {
    if (voiceTriggeredRef.current) return
    voiceTriggeredRef.current = true
    
    setVoiceState("loading")
    
    try {
      const response = await fetch("/api/voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: VOICE_INTRO }),
      })

      if (!response.ok) {
        setVoiceState("done")
        setTimeout(completeBootSequence, 1500)
        return
      }

      const audioBlob = await response.blob()
      const audioUrl = URL.createObjectURL(audioBlob)
      
      const audio = new Audio(audioUrl)
      audio.volume = 0.8
      audioRef.current = audio

      audio.onplay = () => setVoiceState("playing")
      audio.onended = () => {
        setVoiceState("done")
        URL.revokeObjectURL(audioUrl)
        setTimeout(completeBootSequence, 500)
      }
      audio.onerror = () => {
        setVoiceState("done")
        setTimeout(completeBootSequence, 1500)
      }

      // Try to play - if blocked, it will still work because user has interacted
      await audio.play()
    } catch {
      setVoiceState("done")
      setTimeout(completeBootSequence, 1500)
    }
  }, [completeBootSequence])

  // Trigger voice when boot completes
  useEffect(() => {
    if (bootComplete && voiceState === "idle" && !voiceTriggeredRef.current) {
      if (glitchEngineRef.current?.initialized) {
        glitchEngineRef.current.playBootComplete()
      }
      triggerVoice()
    }
  }, [bootComplete, voiceState, triggerVoice])

  // Typewriter effect with sound
  useEffect(() => {
    if (!isBooting || isTransitioning || bootComplete) return

    const currentLine = BOOT_MESSAGES[currentLineIndex]
    
    if (currentCharIndex < currentLine.text.length) {
      const timer = setTimeout(() => {
        setCurrentCharIndex(prev => prev + 1)
        if (glitchEngineRef.current?.initialized) {
          glitchEngineRef.current.playTypeSound()
        }
      }, TYPING_SPEED)
      return () => clearTimeout(timer)
    } else {
      setDisplayedLines(prev => {
        if (prev.length <= currentLineIndex) {
          if (glitchEngineRef.current?.initialized) {
            glitchEngineRef.current.playLineComplete()
          }
          return [...prev, currentLine.text]
        }
        return prev
      })

      if (currentLineIndex < BOOT_MESSAGES.length - 1) {
        const timer = setTimeout(() => {
          setCurrentLineIndex(prev => prev + 1)
          setCurrentCharIndex(0)
        }, LINE_DELAY)
        return () => clearTimeout(timer)
      } else {
        setBootComplete(true)
      }
    }
  }, [currentLineIndex, currentCharIndex, isBooting, isTransitioning, bootComplete])

  const handleSkip = useCallback(() => {
    if (audioRef.current) audioRef.current.pause()
    completeBootSequence()
  }, [completeBootSequence])

  const currentLine = BOOT_MESSAGES[currentLineIndex]
  const typingText = currentLine?.text.slice(0, currentCharIndex) || ""
  const progress = ((currentLineIndex + (currentCharIndex / (currentLine?.text.length || 1))) / BOOT_MESSAGES.length) * 100

  const getColorClass = (color: string) => {
    const colors: Record<string, string> = {
      cyan: "text-cyan-400",
      purple: "text-purple-400",
      pink: "text-pink-400",
      green: "text-green-400",
      yellow: "text-yellow-400",
    }
    return colors[color] || "text-cyan-400"
  }

  return (
    <AnimatePresence>
      {isBooting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
        >
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a1a] to-[#1a0a2e]" />
          
          {/* Grid overlay */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
            }}
          />
          
          {/* Animated gradient overlay */}
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{
              background: "radial-gradient(ellipse at 50% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 70%)",
            }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Floating particles */}
          {particles.map(particle => (
            <motion.div
              key={particle.id}
              className="absolute w-1 h-1 bg-cyan-400/50 rounded-full"
              initial={{ x: `${particle.x}vw`, y: `${particle.y}vh`, opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0], y: `${particle.y - 20}vh` }}
              transition={{ duration: 3, ease: "easeOut" }}
            />
          ))}

          {/* Scanline effect */}
          <motion.div 
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 4px)",
              backgroundSize: "100% 4px",
            }}
            animate={{ y: glitchActive ? [0, 2, -2, 0] : 0 }}
            transition={{ duration: 0.1 }}
          />

          {/* Glitch overlay */}
          <AnimatePresence>
            {glitchActive && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `linear-gradient(${Math.random() * 360}deg, rgba(255,0,0,0.1), rgba(0,255,255,0.1), rgba(255,0,255,0.1))`,
                  mixBlendMode: "screen",
                }}
              />
            )}
          </AnimatePresence>

          {/* Skip button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            whileHover={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={handleSkip}
            className="absolute top-6 right-6 px-4 py-2 text-xs font-mono text-white/60 hover:text-white border border-white/20 hover:border-cyan-400/50 rounded-md backdrop-blur-sm transition-colors z-10"
          >
            Skip Intro
          </motion.button>

          {/* Audio indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: audioInitialized ? 1 : 0.3 }}
            className="absolute top-6 left-6 flex items-center gap-2 text-xs font-mono"
          >
            <Volume2 className={`h-4 w-4 ${audioInitialized ? "text-cyan-400" : "text-white/30"}`} />
            <span className={audioInitialized ? "text-cyan-400" : "text-white/30"}>
              {audioInitialized ? "Audio Active" : "Move mouse for audio"}
            </span>
          </motion.div>

          {/* System stats - below audio indicator */}
          <div className="absolute top-16 left-6 space-y-2 font-mono text-xs">
            <div className="flex items-center gap-2">
              <Cpu className="h-3 w-3 text-cyan-400" />
              <span className="text-white/40">CPU</span>
              <div className="w-20 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-cyan-400"
                  animate={{ width: `${systemStats.cpu}%` }}
                  transition={{ duration: 0.15 }}
                />
              </div>
              <span className="text-cyan-400 w-8">{Math.round(systemStats.cpu)}%</span>
            </div>
            <div className="flex items-center gap-2">
              <Database className="h-3 w-3 text-purple-400" />
              <span className="text-white/40">MEM</span>
              <div className="w-20 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-purple-400"
                  animate={{ width: `${systemStats.memory}%` }}
                  transition={{ duration: 0.15 }}
                />
              </div>
              <span className="text-purple-400 w-8">{Math.round(systemStats.memory)}%</span>
            </div>
            <div className="flex items-center gap-2">
              <Wifi className="h-3 w-3 text-green-400" />
              <span className="text-white/40">NET</span>
              <div className="w-20 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-green-400"
                  animate={{ width: `${systemStats.network}%` }}
                  transition={{ duration: 0.15 }}
                />
              </div>
              <span className="text-green-400 w-8">{Math.round(systemStats.network)}%</span>
            </div>
          </div>

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center gap-8 px-6 max-w-2xl">
            {/* Logo with glitch effect */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                x: glitchActive ? [0, -3, 3, 0] : 0,
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              <NotionLogoInline size={96} className="shadow-2xl shadow-purple-500/30" />
              <motion.div
                className="absolute -inset-3 rounded-3xl"
                style={{
                  background: "linear-gradient(135deg, rgba(6, 182, 212, 0.4), rgba(168, 85, 247, 0.4), rgba(236, 72, 153, 0.4))",
                  filter: "blur(25px)",
                }}
                animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Orbiting ring */}
              <motion.div
                className="absolute inset-0 rounded-2xl border border-cyan-400/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "center" }}
              >
                <div className="absolute -top-1 left-1/2 w-2 h-2 bg-cyan-400 rounded-full -translate-x-1/2" />
              </motion.div>
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <h1 
                className="text-3xl font-bold text-white mb-2" 
                style={{ textShadow: "0 0 30px rgba(168, 85, 247, 0.5)" }}
              >
                Notion OS
              </h1>
              <p className="text-white/50 text-sm font-mono">v2.0.25 | Neural Engine Active</p>
            </motion.div>

            {/* Boot terminal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="w-full max-w-lg"
            >
              <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden">
                {/* Terminal header */}
                <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10 bg-white/5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 text-xs text-white/40 font-mono">notion-os-terminal</span>
                </div>
                
                {/* Terminal content */}
                <div className="p-4 font-mono text-sm min-h-[200px]">
                  {/* Completed lines */}
                  {displayedLines.map((line, index) => {
                    const msgData = BOOT_MESSAGES[index]
                    const IconComp = msgData.icon
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 mb-2"
                      >
                        <IconComp className={`h-4 w-4 ${getColorClass(msgData.color)}`} />
                        <span className="text-green-400">[OK]</span>
                        <span className="text-white/80">{line}</span>
                      </motion.div>
                    )
                  })}
                  
                  {/* Currently typing line */}
                  {!bootComplete && currentLineIndex < BOOT_MESSAGES.length && (
                    <motion.div 
                      className="flex items-center gap-2"
                      animate={{ x: glitchActive ? [0, -2, 2, 0] : 0 }}
                    >
                      {(() => {
                        const IconComp = currentLine.icon
                        return <IconComp className={`h-4 w-4 ${getColorClass(currentLine.color)}`} />
                      })()}
                      <span className="text-yellow-400">[...]</span>
                      <span className="text-white/80">
                        {typingText}
                        <span className={`${showCursor ? "opacity-100" : "opacity-0"} text-cyan-400`}>|</span>
                      </span>
                    </motion.div>
                  )}
                  
                  {/* Boot complete message */}
                  {bootComplete && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-4 pt-4 border-t border-white/10"
                    >
                      <div className="flex items-center gap-2 text-cyan-400">
                        <Zap className="h-4 w-4" />
                        <span>System ready</span>
                        {voiceState === "loading" && (
                          <motion.span
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="text-white/50"
                          >
                            | Initializing voice...
                          </motion.span>
                        )}
                        {voiceState === "playing" && (
                          <span className="flex items-center gap-1 text-green-400">
                            | Speaking
                            <motion.span
                              className="flex gap-0.5"
                            >
                              {[0, 1, 2].map(i => (
                                <motion.span
                                  key={i}
                                  className="w-1 bg-green-400 rounded-full"
                                  animate={{ height: [4, 12, 4] }}
                                  transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 }}
                                />
                              ))}
                            </motion.span>
                          </span>
                        )}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="w-full max-w-lg"
            >
              <div className="flex items-center justify-between text-xs font-mono text-white/40 mb-2">
                <span>Loading system</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full relative"
                  style={{
                    background: "linear-gradient(90deg, #06b6d4, #a855f7, #ec4899)",
                  }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-cyan-500/20" />
          <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-purple-500/20" />
          <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-pink-500/20" />
          <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-cyan-500/20" />

          {/* Version info */}
          <div className="absolute bottom-6 left-6 font-mono text-xs text-white/20">
            <p>BUILD 2025.05.05</p>
            <p>KERNEL: notion-neural-v2</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
