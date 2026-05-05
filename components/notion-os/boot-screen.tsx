"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Volume2, VolumeX } from "lucide-react"

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
  const [audioEnabled, setAudioEnabled] = useState(false)
  const [showAudioPrompt, setShowAudioPrompt] = useState(false)
  
  const hasCompletedRef = useRef(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const voiceTriggeredRef = useRef(false)

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
    
    setIsTransitioning(true)
    setTimeout(() => {
      setIsBooting(false)
      setTimeout(onComplete, 600)
    }, 400)
  }, [onComplete])

  // Trigger ElevenLabs voice
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

      audio.onplay = () => {
        setVoiceState("playing")
        setAudioEnabled(true)
      }
      
      audio.onended = () => {
        setVoiceState("done")
        URL.revokeObjectURL(audioUrl)
        // Wait a moment after voice ends before transitioning
        setTimeout(completeBootSequence, 500)
      }
      
      audio.onerror = () => {
        setVoiceState("error")
        setTimeout(completeBootSequence, 1500)
      }

      // Try to play - this will succeed if user has interacted
      await audio.play()
      
    } catch (err) {
      // Audio blocked by browser - show prompt for user to click
      setVoiceState("idle")
      voiceTriggeredRef.current = false
      setShowAudioPrompt(true)
    }
  }, [completeBootSequence])

  // When all boot messages complete, immediately try to play voice
  useEffect(() => {
    if (bootComplete && voiceState === "idle" && !voiceTriggeredRef.current) {
      triggerVoice()
    }
  }, [bootComplete, voiceState, triggerVoice])

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
        // All boot messages complete - trigger voice
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

  // Handle click to enable audio (when browser blocks autoplay)
  const handleEnableAudio = useCallback(() => {
    setShowAudioPrompt(false)
    triggerVoice()
  }, [triggerVoice])

  // Continue without audio
  const handleSkipAudio = useCallback(() => {
    setShowAudioPrompt(false)
    setVoiceState("done")
    setTimeout(completeBootSequence, 500)
  }, [completeBootSequence])

  const currentLine = BOOT_MESSAGES[currentLineIndex]
  const typingText = currentLine?.slice(0, currentCharIndex) || ""

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
            onClick={handleSkip}
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

            {/* Audio prompt - when browser blocks autoplay */}
            <AnimatePresence>
              {showAudioPrompt && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col items-center gap-4"
                >
                  <motion.button
                    onClick={handleEnableAudio}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white font-medium shadow-lg shadow-purple-500/30"
                  >
                    <Volume2 className="h-5 w-5" />
                    <span>Enable Voice</span>
                  </motion.button>
                  <button
                    onClick={handleSkipAudio}
                    className="flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors"
                  >
                    <VolumeX className="h-4 w-4" />
                    <span>Continue without audio</span>
                  </button>
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
                  <span className="text-sm text-cyan-400/80 font-mono">Initializing voice...</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Audio playing indicator */}
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
                        className="w-1.5 bg-gradient-to-t from-cyan-400 to-purple-400 rounded-full"
                        animate={{
                          height: ["8px", "28px", "8px"],
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
