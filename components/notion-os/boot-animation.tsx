"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const bootMessages = [
  "Initializing Notion OS...",
  "Loading Cognitive Engine...",
  "Preparing Workspace...",
  "System Ready."
]

export function BootAnimation({ onComplete }: { onComplete: () => void }) {
  const [currentMessage, setCurrentMessage] = useState(0)
  const [showBoot, setShowBoot] = useState(true)

  useEffect(() => {
    if (currentMessage < bootMessages.length) {
      const timer = setTimeout(() => {
        setCurrentMessage(prev => prev + 1)
      }, 600)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => {
        setShowBoot(false)
        setTimeout(onComplete, 500)
      }, 400)
      return () => clearTimeout(timer)
    }
  }, [currentMessage, onComplete])

  return (
    <AnimatePresence>
      {showBoot && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
        >
          <div className="flex flex-col items-center gap-8">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-primary">
                <span className="text-2xl font-bold text-primary-foreground">N</span>
              </div>
              <motion.div
                className="absolute inset-0 rounded-xl bg-primary/20"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            {/* Boot messages */}
            <div className="h-24 flex flex-col items-center justify-start gap-2">
              {bootMessages.slice(0, currentMessage + 1).map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: index === currentMessage ? 1 : 0.4, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="font-mono text-sm text-muted-foreground"
                >
                  <span className="text-primary mr-2">{">"}</span>
                  {message}
                </motion.div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="w-64 h-1 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-accent"
                initial={{ width: "0%" }}
                animate={{ width: `${((currentMessage + 1) / bootMessages.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
