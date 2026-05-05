"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Volume2 } from "lucide-react"

const BOOT_MESSAGES = [
  "Initializing Notion OS...",
  "Loading cognitive engine...",
  "Connecting knowledge graph...",
  "Voice interface ready...",
]

const VOICE_INTRO = "Welcome to Notion. Your intelligent workspace. Let me show you how thinking works."

const TYPING_SPEED = 40 // ms per character
const LINE_DELAY = 400 // ms between lines

interface BootScreenProps {
  onComplete: () => void
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
  const [userInteracted, setUserInteracted] = useState(false)
  
  const hasCompletedRef = useRef(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  // Complete the boot sequence and transition to landing page
  const completeBootSequence = useCallback(() => {
    if (hasCompletedRef.current) return
    hasCompletedRef.current = true
    
    console.log("[v0] Completing boot sequence, transitioning...")
    setIsTransitioning(true)
    setTimeout(() => {
      setIsBooting(false)
      setTimeout(onComplete, 600)
    }, 400)
  }, [onComplete])

  // Trigger ElevenLabs voice
  const triggerVoice = useCallback(async () => {
    if (voiceState !== "idle") return
    
    console.log("[v0] Triggering ElevenLabs voice...")
    setVoiceState("loading")
    
    try {
      const response = await fetch("/api/voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: VOICE_INTRO }),
      })

      if (!response.ok) {
        console.error("[v0] Voice API failed:", response.status)
        setVoiceState("error")
        // Continue to landing page even if voice fails
        setTimeout(completeBootSequence, 1000)
        return
      }

      const audioBlob = await response.blob()
      const audioUrl = URL.createObjectURL(audioBlob)
      
      const audio = new Audio(audioUrl)
      audio.volume = 0.7
      audioRef.current = audio

      audio.onplay = () => {
        console.log("[v0] Voice playing")
        setVoiceState("playing")
      }
      
      audio.onended = () => {
        console.log("[v0] Voice ended, completing boot")
        setVoiceState("done")
        URL.revokeObjectURL(audioUrl)
        completeBootSequence()
      }
      
      audio.onerror = (e) => {
        console.error("[v0] Audio playback error:", e)
        setVoiceState("error")
        completeBootSequence()
      }

      // Try to play
      await audio.play()
      console.log("[v0] Audio play() succeeded")
      
    } catch (err) {
      console.error("[v0] Voice error:", err)
      setVoiceState("error")
      // Continue to landing page even if voice fails
      setTimeout(completeBootSequence, 1000)
    }
  }, [voiceState, completeBootSequence])

  // Track user interaction for audio autoplay
  useEffect(() => {
    const handleInteraction = () => {
      console.log("[v0] User interacted")
      setUserInteracted(true)
    }

    window.addEventListener("click", handleInteraction, { once: true })
    window.addEventListener("touchstart", handleInteraction, { once: true })
    window.addEventListener("keydown", handleInteraction, { once: true })

    return () => {
      window.removeEventListener("click", handleInteraction)
      window.removeEventListener("touchstart", handleInteraction)
      window.removeEventListener("keydown", handleInteraction)
    }
  }, [])

  // When boot messages complete AND user has interacted, trigger voice
  useEffect(() => {
    if (bootComplete && userInteracted && voiceState === "idle") {
      console.log("[v0] Boot complete + user interacted, triggering voice")
      triggerVoice()
    }
  }, [bootComplete, userInteracted, voiceState, triggerVoice])

  // If user interacts while boot is complete but voice hasn't started
  useEffect(() => {
    if (bootComplete && voiceState === "idle" && userInteracted) {
      triggerVoice()
    }
  }, [userInteracted, bootComplete, voiceState, triggerVoice])

  // Typewriter effect
  useEffect(() => {
    if (!isBooting || isTransitioning || bootComplete) return

    const currentLine = BOOT_MESSAGES[currentLineIndex]
    
    if (currentCharIndex < currentLine.length) {
      const timer = setTimeout(() => {
        setCurrentCharIndex(prev => prev + 1)
      }, TYPING_SPEED)
      return () => clearTimeout(timer)
    } else {
      // Line complete - add to displayed lines
      setDisplayedLines(prev => {
        if (prev.length <= currentLineIndex) {
          return [...prev, currentLine]
        }
        return prev
      })

      if (currentLineIndex < BOOT_MESSAGES.length - 1) {
        // Move to next line
        const timer = setTimeout(() => {
          setCurrentLineIndex(prev => prev + 1)
          setCurrentCharIndex(0)
        }, LINE_DELAY)
        return () => clearTimeout(timer)
      } else {
        // All boot messages complete
        console.log("[v0] All boot messages displayed")
        setBootComplete(true)
      }
    }
  }, [currentLineIndex, currentCharIndex, isBooting, isTransitioning, bootComplete])

  // Skip intro handler
  const handleSkip = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
    }
    completeBootSequence()
  }, [completeBootSequence])

  // Handle click to enable audio
  const handleScreenClick = useCallback(() => {
    setUserInteracted(true)
    if (bootComplete && voiceState === "idle") {
      triggerVoice()
    }
  }, [bootComplete, voiceState, triggerVoice])

  const currentLine = BOOT_MESSAGES[currentLineIndex]
  const typingText = currentLine?.slice(0, currentCharIndex) || ""

  return (
    <AnimatePresence>
      {isBooting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden cursor-pointer"
          onClick={handleScreenClick}
        >
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a1a] to-[#1a0a2e]" />
          
          {/* Animated gradient overlay */}
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{
              background: "radial-gradient(ellipse at 50% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 70%)",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Scanline effect */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
              backgroundSize: "100% 4px",
            }}
          />

          {/* Skip button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            whileHover={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={(e) => {
              e.stopPropagation()
              handleSkip()
            }}
            className="absolute top-6 right-6 px-4 py-2 text-xs font-mono text-white/60 hover:text-white border border-white/20 hover:border-white/40 rounded-md backdrop-blur-sm transition-colors z-10"
          >
            Skip Intro
          </motion.button>

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center gap-10 px-6">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 flex items-center justify-center shadow-2xl shadow-purple-500/30">
                <span className="text-3xl font-bold text-white">N</span>
              </div>
              <motion.div
                className="absolute -inset-2 rounded-3xl"
                style={{
                  background: "linear-gradient(135deg, rgba(6, 182, 212, 0.4), rgba(168, 85, 247, 0.4), rgba(236, 72, 153, 0.4))",
                  filter: "blur(20px)",
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            {/* Boot messages container */}
            <div className="min-h-[160px] w-full max-w-md flex flex-col items-start gap-3">
              {/* Completed lines */}
              {displayedLines.map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 0.5, x: 0 }}
                  className="font-mono text-sm text-cyan-300/50"
                >
                  <span className="text-cyan-500/50 mr-2">{">"}</span>
                  {line}
                </motion.div>
              ))}

              {/* Currently typing line */}
              {currentLineIndex < BOOT_MESSAGES.length && displayedLines.length <= currentLineIndex && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="font-mono text-sm"
                  style={{
                    textShadow: "0 0 10px rgba(6, 182, 212, 0.5), 0 0 20px rgba(6, 182, 212, 0.3)",
                  }}
                >
                  <span className="text-cyan-400 mr-2">{">"}</span>
                  <span className="text-cyan-100">{typingText}</span>
                  <motion.span
                    animate={{ opacity: showCursor ? 1 : 0 }}
                    className="inline-block w-2 h-4 ml-0.5 bg-cyan-400 align-middle"
                    style={{
                      boxShadow: "0 0 8px rgba(6, 182, 212, 0.8)",
                    }}
                  />
                </motion.div>
              )}
            </div>

            {/* Audio prompt - appears when boot is done but waiting for interaction */}
            <AnimatePresence>
              {bootComplete && !userInteracted && voiceState === "idle" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col items-center gap-3"
                >
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 border border-white/10 backdrop-blur-sm"
                  >
                    <Volume2 className="h-4 w-4 text-cyan-400" />
                    <span className="text-sm text-white/80 font-mono">Click anywhere to continue</span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Voice loading indicator */}
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
                        animate={{
                          height: ["4px", "12px", "4px"],
                        }}
                        transition={{
                          duration: 0.4,
                          repeat: Infinity,
                          delay: i * 0.1,
                        }}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-cyan-400/80 font-mono">Preparing voice...</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Audio active indicator */}
            <AnimatePresence>
              {voiceState === "playing" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1 bg-cyan-400 rounded-full"
                        animate={{
                          height: ["8px", "24px", "8px"],
                        }}
                        transition={{
                          duration: 0.5,
                          repeat: Infinity,
                          delay: i * 0.08,
                        }}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-cyan-400 font-mono">Voice active</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Progress indicator */}
            <div className="w-64 space-y-2">
              <div className="h-0.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #06b6d4, #a855f7, #ec4899)",
                  }}
                  initial={{ width: "0%" }}
                  animate={{ 
                    width: bootComplete 
                      ? "100%" 
                      : `${Math.min(((currentLineIndex + (currentCharIndex / (BOOT_MESSAGES[currentLineIndex]?.length || 1))) / BOOT_MESSAGES.length) * 100, 100)}%` 
                  }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-32 h-32 border-l border-t border-white/5" />
          <div className="absolute bottom-0 right-0 w-32 h-32 border-r border-b border-white/5" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
