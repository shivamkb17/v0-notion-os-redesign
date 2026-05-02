"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mic, MicOff, X, Volume2, VolumeX } from "lucide-react"
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
  const [isMuted, setIsMuted] = useState(false)

  const speak = useCallback((text: string) => {
    if (isMuted || typeof window === "undefined") return

    // Cancel any ongoing speech
    window.speechSynthesis?.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.9
    utterance.pitch = 1
    utterance.volume = 0.8

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => {
      setIsSpeaking(false)
      // Auto-advance to next step after speaking
      if (currentStep < tourSteps.length - 1) {
        setTimeout(() => {
          setCurrentStep(prev => prev + 1)
        }, 1000)
      } else {
        // Tour complete
        setTimeout(() => {
          setIsActive(false)
          setCurrentStep(0)
        }, 2000)
      }
    }

    window.speechSynthesis?.speak(utterance)
  }, [isMuted, currentStep])

  useEffect(() => {
    if (isActive && !isMuted) {
      speak(tourSteps[currentStep].message)
    }
  }, [isActive, currentStep, isMuted, speak])

  const startTour = () => {
    setIsActive(true)
    setCurrentStep(0)
  }

  const stopTour = () => {
    window.speechSynthesis?.cancel()
    setIsActive(false)
    setCurrentStep(0)
    setIsSpeaking(false)
  }

  const toggleMute = () => {
    if (!isMuted) {
      window.speechSynthesis?.cancel()
      setIsSpeaking(false)
    }
    setIsMuted(!isMuted)
  }

  return (
    <>
      {/* Floating mic button */}
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
            >
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </Button>
            <Button
              onClick={stopTour}
              size="icon"
              variant="outline"
              className="rounded-full glass-card"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        )}
      </motion.div>

      {/* Tour overlay */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-6 z-50 max-w-sm"
          >
            <div className="glass-card rounded-2xl p-6 glow-primary">
              {/* Speaking indicator */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-3 h-3 rounded-full ${isSpeaking ? "bg-primary animate-pulse" : "bg-muted"}`} />
                <span className="text-sm text-muted-foreground">
                  {isSpeaking ? "Speaking..." : isMuted ? "Muted" : "Paused"}
                </span>
                <span className="text-xs text-muted-foreground ml-auto">
                  {currentStep + 1} / {tourSteps.length}
                </span>
              </div>

              {/* Current message */}
              <p className="text-foreground text-sm leading-relaxed">
                {tourSteps[currentStep].message}
              </p>

              {/* Progress bar */}
              <div className="mt-4 h-1 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-accent"
                  initial={{ width: "0%" }}
                  animate={{ width: `${((currentStep + 1) / tourSteps.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className="text-muted-foreground"
                >
                  Previous
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (currentStep < tourSteps.length - 1) {
                      window.speechSynthesis?.cancel()
                      setCurrentStep(currentStep + 1)
                    } else {
                      stopTour()
                    }
                  }}
                  className="text-primary"
                >
                  {currentStep < tourSteps.length - 1 ? "Next" : "Finish"}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
