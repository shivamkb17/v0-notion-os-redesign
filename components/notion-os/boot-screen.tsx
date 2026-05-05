"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Volume2, VolumeX, Zap, Cpu, Database, Wifi, Shield, Terminal } from "lucide-react"

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

  init() {
    if (typeof window === "undefined") return
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    this.gainNode = this.audioContext.createGain()
    this.gainNode.connect(this.audioContext.destination)
    this.gainNode.gain.value = 0.15
  }

  playGlitch() {
    if (!this.audioContext || !this.gainNode) return
    
    const duration = 0.08 + Math.random() * 0.12
    const osc = this.audioContext.createOscillator()
    const oscGain = this.audioContext.createGain()
    
    osc.connect(oscGain)
    oscGain.connect(this.gainNode)
    
    // Random glitch frequency
    osc.frequency.value = 100 + Math.random() * 800
    osc.type = ["square", "sawtooth", "triangle"][Math.floor(Math.random() * 3)] as OscillatorType
    
    // Frequency modulation for glitchy effect
    const now = this.audioContext.currentTime
    osc.frequency.setValueAtTime(osc.frequency.value, now)
    osc.frequency.exponentialRampToValueAtTime(50 + Math.random() * 200, now + duration)
    
    // Quick attack and decay
    oscGain.gain.setValueAtTime(0, now)
    oscGain.gain.linearRampToValueAtTime(0.3, now + 0.01)
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + duration)
    
    osc.start(now)
    osc.stop(now + duration)
  }

  playBootSound() {
    if (!this.audioContext || !this.gainNode) return
    
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
    if (!this.audioContext || !this.gainNode) return
    
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
    if (!this.audioContext || !this.gainNode) return
    
    const now = this.audioContext.currentTime
    
    // Success chime
    const frequencies = [523.25, 659.25, 783.99] // C5, E5, G5
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
    if (!this.audioContext || !this.gainNode) return
    
    const now = this.audioContext.currentTime
    
    // Ascending arpeggio
    const frequencies = [261.63, 329.63, 392.00, 523.25, 659.25] // C4, E4, G4, C5, E5
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
    if (this.audioContext) {
      this.audioContext.close()
    }
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
  const [voiceState, setVoiceState] = useState<"idle" | "loading" | "playing" | "done" | "error">("idle")
  const [showAudioPrompt, setShowAudioPrompt] = useState(false)
  const [audioInitialized, setAudioInitialized] = useState(false)
  const [glitchActive, setGlitchActive] = useState(false)
  const [systemStats, setSystemStats] = useState({ cpu: 0, memory: 0, network: 0 })
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([])
  
  const hasCompletedRef = useRef(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const voiceTriggeredRef = useRef(false)
  const glitchEngineRef = useRef<GlitchSoundEngine | null>(null)
  const particleIdRef = useRef(0)

  // Initialize audio engine on first user interaction
  const initAudio = useCallback(() => {
    if (audioInitialized || typeof window === "undefined") return
    
    glitchEngineRef.current = new GlitchSoundEngine()
    glitchEngineRef.current.init()
    setAudioInitialized(true)
    
    // Play initial boot sound
    glitchEngineRef.current.playBootSound()
    
    // Start glitch sequence
    const glitchInterval = setInterval(() => {
      if (glitchEngineRef.current && Math.random() > 0.6) {
        glitchEngineRef.current.playGlitch()
        setGlitchActive(true)
        setTimeout(() => setGlitchActive(false), 100)
      }
    }, 200)
    
    return () => clearInterval(glitchInterval)
  }, [audioInitialized])

  // Handle click to initialize audio
  useEffect(() => {
    const handleInteraction = () => {
      initAudio()
      document.removeEventListener("click", handleInteraction)
      document.removeEventListener("keydown", handleInteraction)
      document.removeEventListener("touchstart", handleInteraction)
    }
    
    document.addEventListener("click", handleInteraction)
    document.addEventListener("keydown", handleInteraction)
    document.addEventListener("touchstart", handleInteraction)
    
    return () => {
      document.removeEventListener("click", handleInteraction)
      document.removeEventListener("keydown", handleInteraction)
      document.removeEventListener("touchstart", handleInteraction)
    }
  }, [initAudio])

  // Cleanup audio engine
  useEffect(() => {
    return () => {
      if (glitchEngineRef.current) {
        glitchEngineRef.current.destroy()
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
    
    // Remove old particles
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
        setVoiceState("error")
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
        setVoiceState("error")
        setTimeout(completeBootSequence, 1500)
      }

      await audio.play()
    } catch {
      setVoiceState("idle")
      voiceTriggeredRef.current = false
      setShowAudioPrompt(true)
    }
  }, [completeBootSequence])

  useEffect(() => {
    if (bootComplete && voiceState === "idle" && !voiceTriggeredRef.current) {
      if (glitchEngineRef.current) {
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
        if (glitchEngineRef.current && audioInitialized) {
          glitchEngineRef.current.playTypeSound()
        }
      }, TYPING_SPEED)
      return () => clearTimeout(timer)
    } else {
      setDisplayedLines(prev => {
        if (prev.length <= currentLineIndex) {
          if (glitchEngineRef.current && audioInitialized) {
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
  }, [currentLineIndex, currentCharIndex, isBooting, isTransitioning, bootComplete, audioInitialized])

  const handleSkip = useCallback(() => {
    if (audioRef.current) audioRef.current.pause()
    completeBootSequence()
  }, [completeBootSequence])

  const handleEnableAudio = useCallback(() => {
    setShowAudioPrompt(false)
    triggerVoice()
  }, [triggerVoice])

  const handleSkipAudio = useCallback(() => {
    setShowAudioPrompt(false)
    setVoiceState("done")
    setTimeout(completeBootSequence, 500)
  }, [completeBootSequence])

  const currentLine = BOOT_MESSAGES[currentLineIndex]
  const typingText = currentLine?.text.slice(0, currentCharIndex) || ""
  const progress = ((currentLineIndex + (currentCharIndex / (currentLine?.text.length || 1))) / BOOT_MESSAGES.length) * 100
  const IconComponent = currentLine?.icon || Terminal

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
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden cursor-pointer"
          onClick={initAudio}
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
            onClick={(e) => { e.stopPropagation(); handleSkip(); }}
            className="absolute top-6 right-6 px-4 py-2 text-xs font-mono text-white/60 hover:text-white border border-white/20 hover:border-cyan-400/50 rounded-md backdrop-blur-sm transition-colors z-10"
          >
            Skip Intro
          </motion.button>

          {/* System stats - top left */}
          <div className="absolute top-6 left-6 space-y-2 font-mono text-xs">
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
              <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 flex items-center justify-center shadow-2xl shadow-purple-500/30">
                <span className="text-4xl font-bold text-white">N</span>
              </div>
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
                className="absolute -inset-6 border border-cyan-400/20 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-400 rounded-full" />
              </motion.div>
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <h1 
                className="text-2xl font-bold text-white tracking-wider"
                style={{ textShadow: "0 0 30px rgba(6, 182, 212, 0.5)" }}
              >
                NOTION OS
              </h1>
              <p className="text-white/30 text-xs font-mono mt-1">v2.0.0 // Neural Interface</p>
            </motion.div>

            {/* Boot messages terminal */}
            <div className="w-full bg-black/40 backdrop-blur-sm rounded-lg border border-white/10 p-4 font-mono text-sm">
              {/* Terminal header */}
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="text-white/30 text-xs ml-2">system.boot</span>
              </div>
              
              {/* Completed lines */}
              {displayedLines.map((line, index) => {
                const msgData = BOOT_MESSAGES[index]
                const Icon = msgData?.icon || Terminal
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 0.6, x: 0 }}
                    className="flex items-center gap-2 mb-1"
                  >
                    <Icon className={`h-3 w-3 ${getColorClass(msgData?.color || "cyan")}`} />
                    <span className="text-green-400">[OK]</span>
                    <span className="text-white/60">{line}</span>
                  </motion.div>
                )
              })}

              {/* Currently typing line */}
              {currentLineIndex < BOOT_MESSAGES.length && displayedLines.length <= currentLineIndex && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2"
                >
                  <IconComponent className={`h-3 w-3 ${getColorClass(currentLine?.color || "cyan")}`} />
                  <motion.span
                    className="text-yellow-400"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    [...]
                  </motion.span>
                  <span className="text-white">{typingText}</span>
                  <motion.span
                    animate={{ opacity: showCursor ? 1 : 0 }}
                    className="inline-block w-2 h-4 bg-cyan-400"
                    style={{ boxShadow: "0 0 8px rgba(6, 182, 212, 0.8)" }}
                  />
                </motion.div>
              )}
            </div>

            {/* Progress bar */}
            <div className="w-full space-y-2">
              <div className="flex justify-between text-xs font-mono text-white/40">
                <span>System Boot Progress</span>
                <span>{Math.round(bootComplete ? 100 : progress)}%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full relative"
                  style={{ background: "linear-gradient(90deg, #06b6d4, #a855f7, #ec4899)" }}
                  initial={{ width: "0%" }}
                  animate={{ width: bootComplete ? "100%" : `${progress}%` }}
                  transition={{ duration: 0.1 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </motion.div>
              </div>
            </div>

            {/* Audio prompt */}
            <AnimatePresence>
              {showAudioPrompt && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col items-center gap-4"
                >
                  <motion.button
                    onClick={(e) => { e.stopPropagation(); handleEnableAudio(); }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white font-medium shadow-lg shadow-purple-500/30"
                  >
                    <Volume2 className="h-5 w-5" />
                    <span>Enable Voice</span>
                  </motion.button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleSkipAudio(); }}
                    className="flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors"
                  >
                    <VolumeX className="h-4 w-4" />
                    <span>Continue without audio</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Voice states */}
            <AnimatePresence>
              {voiceState === "loading" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex items-center gap-1">
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1 bg-cyan-400/50 rounded-full"
                        animate={{ height: ["4px", "16px", "4px"] }}
                        transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.1 }}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-cyan-400/80 font-mono">Initializing voice interface...</span>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {voiceState === "playing" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-3 bg-cyan-500/10 px-4 py-2 rounded-full border border-cyan-500/30"
                >
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 bg-gradient-to-t from-cyan-400 to-purple-400 rounded-full"
                        animate={{ height: ["8px", "24px", "8px"] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.08 }}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-cyan-400 font-mono">Voice active</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Click hint */}
            {!audioInitialized && !bootComplete && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 2 }}
                className="text-xs text-white/30 font-mono"
              >
                Click anywhere to enable sound
              </motion.p>
            )}
          </div>

          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-cyan-400/20" />
          <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-purple-400/20" />
          <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-pink-400/20" />
          <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-cyan-400/20" />

          {/* Version info */}
          <div className="absolute bottom-6 left-6 font-mono text-xs text-white/20">
            <div>Build: 2024.05.NOTION-OS</div>
            <div>Kernel: Neural-v2.0.0</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
