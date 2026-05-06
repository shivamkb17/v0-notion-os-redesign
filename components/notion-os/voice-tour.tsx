"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mic, X, Volume2, VolumeX, SkipForward, ChevronLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const tourSteps = [
  {
    id: "hero",
    message: "Welcome to Notion OS. Your intelligent workspace reimagined for the future of productivity.",
    selector: "hero"
  },
  {
    id: "agents",
    message: "Meet AI agents that work 24/7. They answer questions, route tasks, and generate reports automatically.",
    selector: "agents"
  },
  {
    id: "ai",
    message: "Ask your on-demand AI assistant anything. It understands your workspace and helps you work smarter.",
    selector: "ai"
  },
  {
    id: "features",
    message: "Bring all your work together. Docs, projects, wikis, and more in one connected workspace.",
    selector: "features"
  },
  {
    id: "brain",
    message: "Your second brain. Everything is linked, searchable, and powered by AI.",
    selector: "brain"
  },
  {
    id: "cta",
    message: "This is your workspace. Reimagined. Get started for free today.",
    selector: "cta"
  }
]

export function VoiceTour() {
  const [isActive, setIsActive] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const blobUrlRef = useRef<string | null>(null)

  // Cleanup blob URL
  const cleanupAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = ""
    }
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current)
      blobUrlRef.current = null
    }
  }, [])

  // Speak using ElevenLabs API
  const speakWithElevenLabs = useCallback(async (text: string) => {
    if (isMuted) return

    cleanupAudio()
    setIsLoading(true)
    setIsSpeaking(false)

    try {
      const response = await fetch("/api/voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      })

      if (!response.ok) throw new Error("Voice API failed")

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      blobUrlRef.current = url

      const audio = new Audio(url)
      audio.volume = 0.75
      audioRef.current = audio

      audio.onplay = () => {
        setIsLoading(false)
        setIsSpeaking(true)
      }

      audio.onended = () => {
        setIsSpeaking(false)
        // Auto-advance after voice finishes
        setCurrentStep(prev => {
          if (prev < tourSteps.length - 1) {
            return prev + 1
          } else {
            // Tour complete
            setTimeout(() => {
              setIsActive(false)
              setCurrentStep(0)
            }, 1500)
            return prev
          }
        })
      }

      audio.onerror = () => {
        setIsLoading(false)
        setIsSpeaking(false)
      }

      await audio.play()
    } catch {
      setIsLoading(false)
      setIsSpeaking(false)
    }
  }, [isMuted, cleanupAudio])

  // Trigger speech when step changes
  useEffect(() => {
    if (isActive && !isMuted) {
      speakWithElevenLabs(tourSteps[currentStep].message)
    }
  }, [isActive, currentStep]) // eslint-disable-line react-hooks/exhaustive-deps

  // Cleanup on unmount
  useEffect(() => {
    return () => cleanupAudio()
  }, [cleanupAudio])

  const startTour = () => {
    setIsActive(true)
    setCurrentStep(0)
  }

  const stopTour = () => {
    cleanupAudio()
    setIsActive(false)
    setCurrentStep(0)
    setIsSpeaking(false)
    setIsLoading(false)
  }

  const toggleMute = () => {
    if (!isMuted) {
      cleanupAudio()
      setIsSpeaking(false)
      setIsLoading(false)
    }
    setIsMuted(!isMuted)
  }

  const skipStep = () => {
    cleanupAudio()
    setIsSpeaking(false)
    setIsLoading(false)
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      stopTour()
    }
  }

  const prevStep = () => {
    cleanupAudio()
    setIsSpeaking(false)
    setIsLoading(false)
    setCurrentStep(prev => Math.max(0, prev - 1))
  }

  return (
    <>
      {/* Floating tour button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
        className="fixed bottom-6 right-6 z-50"
      >
        {!isActive ? (
          <Button
            onClick={startTour}
            size="lg"
            className="rounded-full w-14 h-14 bg-gradient-to-r from-primary to-accent hover:opacity-90 glow-primary p-0"
            aria-label="Start voice tour"
          >
            <Mic className="h-6 w-6" />
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            <Button
              onClick={toggleMute}
              size="icon"
              variant="outline"
              className="rounded-full glass-card"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </Button>
            <Button
              onClick={stopTour}
              size="icon"
              variant="outline"
              className="rounded-full glass-card"
              aria-label="Stop tour"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        )}
      </motion.div>

      {/* Tour panel */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-6 z-50 w-80"
          >
            <div className="glass-card rounded-2xl overflow-hidden glow-primary">
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[0, 1, 2].map(i => (
                      <motion.div
                        key={i}
                        className={`w-1 rounded-full ${isSpeaking ? "bg-primary" : "bg-muted-foreground/40"}`}
                        animate={isSpeaking ? {
                          height: [8, 16, 8],
                        } : { height: 8 }}
                        transition={{
                          duration: 0.4,
                          repeat: isSpeaking ? Infinity : 0,
                          delay: i * 0.1,
                        }}
                        style={{ height: 8 }}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">
                    {isLoading ? "Loading voice..." : isSpeaking ? "ElevenLabs" : isMuted ? "Muted" : "Ready"}
                  </span>
                </div>
                <span className="text-xs font-mono text-primary">
                  {currentStep + 1}/{tourSteps.length}
                </span>
              </div>

              {/* Content */}
              <div className="px-5 py-4">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentStep}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.25 }}
                    className="text-foreground text-sm leading-relaxed"
                  >
                    {tourSteps[currentStep].message}
                  </motion.p>
                </AnimatePresence>

                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex items-center gap-2 mt-3 text-primary">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    <span className="text-xs">Generating voice...</span>
                  </div>
                )}
              </div>

              {/* Progress bar */}
              <div className="px-5">
                <div className="h-0.5 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-accent"
                    animate={{ width: `${((currentStep + 1) / tourSteps.length) * 100}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between px-5 py-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="text-muted-foreground hover:text-foreground h-8 px-2"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Prev
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={skipStep}
                  className="text-primary hover:text-primary/80 h-8 px-2"
                >
                  {currentStep < tourSteps.length - 1 ? (
                    <>
                      Skip
                      <SkipForward className="h-4 w-4 ml-1" />
                    </>
                  ) : (
                    "Finish"
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
