"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Volume2, VolumeX } from "lucide-react"
import { useElevenLabsVoice } from "@/hooks/use-elevenlabs-voice"

const BOOT_MESSAGES = [
  "Initializing Notion OS...",
  "Loading cognitive engine...",
  "Connecting knowledge graph...",
  "Voice interface ready...",
]

const VOICE_INTRO = "Welcome to Notion. Your intelligent workspace. Let me show you how thinking works."

const TYPING_SPEED = 40 // ms per character
const LINE_DELAY = 400 // ms between lines
const TOTAL_MAX_TIME = 3000 // 3 seconds max

interface BootScreenProps {
  onComplete: () => void
}

// Entry gate component - requires user click to enable audio
function EntryGate({ onEnter, onEnterSilent }: { onEnter: () => void; onEnterSilent: () => void }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
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

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-6">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
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

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold text-white mb-2" style={{ textShadow: "0 0 30px rgba(168, 85, 247, 0.5)" }}>
            Notion OS
          </h1>
          <p className="text-white/50 text-sm font-mono">Your intelligent workspace awaits</p>
        </motion.div>

        {/* Enter button with audio */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={onEnter}
          className="relative group"
        >
          <div className="relative px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white font-semibold flex items-center gap-3 overflow-hidden">
            <Volume2 className="h-5 w-5" />
            <span>Enter with Voice</span>
            
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: "-100%" }}
              animate={isHovered ? { x: "100%" } : { x: "-100%" }}
              transition={{ duration: 0.6 }}
            />
          </div>
          
          {/* Glow effect */}
          <motion.div
            className="absolute -inset-1 rounded-xl opacity-50 -z-10"
            style={{
              background: "linear-gradient(90deg, #06b6d4, #a855f7, #ec4899)",
              filter: "blur(15px)",
            }}
            animate={{
              opacity: isHovered ? 0.8 : 0.4,
            }}
          />
        </motion.button>

        {/* Silent entry option */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          whileHover={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          onClick={onEnterSilent}
          className="flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition-colors"
        >
          <VolumeX className="h-4 w-4" />
          <span>Enter without audio</span>
        </motion.button>

        {/* Hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1 }}
          className="text-xs text-white/30 font-mono"
        >
          Best experienced with sound
        </motion.p>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l border-t border-white/5" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r border-b border-white/5" />
    </motion.div>
  )
}

export function BootScreen({ onComplete }: BootScreenProps) {
  const [hasEntered, setHasEntered] = useState(false)
  const [enableAudio, setEnableAudio] = useState(false)
  const [isBooting, setIsBooting] = useState(true)
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [showCursor, setShowCursor] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [voiceTriggered, setVoiceTriggered] = useState(false)
  
  const { speak, isPlaying, isLoading } = useElevenLabsVoice()
  const startTimeRef = useRef<number>(Date.now())
  const hasCompletedRef = useRef(false)

  // Handle entry with audio
  const handleEnterWithAudio = useCallback(() => {
    setEnableAudio(true)
    setHasEntered(true)
    startTimeRef.current = Date.now()
  }, [])

  // Handle silent entry
  const handleEnterSilent = useCallback(() => {
    setEnableAudio(false)
    setHasEntered(true)
    startTimeRef.current = Date.now()
  }, [])

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  // Complete the boot sequence
  const completeBootSequence = useCallback(() => {
    if (hasCompletedRef.current) return
    hasCompletedRef.current = true
    
    setIsTransitioning(true)
    setTimeout(() => {
      setIsBooting(false)
      setTimeout(onComplete, 600)
    }, 400)
  }, [onComplete])

  // Typewriter effect - only runs after user has entered
  useEffect(() => {
    if (!hasEntered || !isBooting || isTransitioning) return

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
      } else if (!voiceTriggered) {
        // All lines complete - trigger voice only if audio is enabled
        setVoiceTriggered(true)
        if (enableAudio) {
          speak(VOICE_INTRO)
        }
        
        // Complete after voice starts or timeout
        const timer = setTimeout(() => {
          completeBootSequence()
        }, enableAudio ? 2500 : 1000)
        return () => clearTimeout(timer)
      }
    }
  }, [hasEntered, currentLineIndex, currentCharIndex, isBooting, isTransitioning, voiceTriggered, enableAudio, speak, completeBootSequence])

  // Safety timeout - max 3 seconds after entering
  useEffect(() => {
    if (!hasEntered) return
    
    const timer = setTimeout(() => {
      if (!hasCompletedRef.current) {
        completeBootSequence()
      }
    }, TOTAL_MAX_TIME)
    return () => clearTimeout(timer)
  }, [hasEntered, completeBootSequence])

  // Skip intro handler
  const handleSkip = useCallback(() => {
    completeBootSequence()
  }, [completeBootSequence])

  const currentLine = BOOT_MESSAGES[currentLineIndex]
  const typingText = currentLine?.slice(0, currentCharIndex) || ""

  // Show entry gate first, then boot sequence
  if (!hasEntered) {
    return (
      <AnimatePresence>
        <EntryGate onEnter={handleEnterWithAudio} onEnterSilent={handleEnterSilent} />
      </AnimatePresence>
    )
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

          {/* Noise texture */}
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-[0.015]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
            animate={{ opacity: [0.015, 0.025, 0.015] }}
            transition={{ duration: 0.1, repeat: Infinity }}
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
                    width: `${Math.min(((currentLineIndex + (currentCharIndex / (BOOT_MESSAGES[currentLineIndex]?.length || 1))) / BOOT_MESSAGES.length) * 100, 100)}%` 
                  }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              
              {/* Status text */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                className="text-center font-mono text-xs text-white/40"
              >
                {isLoading ? "Preparing voice..." : isPlaying ? "Voice active" : "System initializing"}
              </motion.div>
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
