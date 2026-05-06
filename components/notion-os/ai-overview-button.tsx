"use client"

import { useState, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Volume2, VolumeX, Loader2, MessageCircle, X, Send, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AIOverviewButtonProps {
  sectionId: string
  sectionTitle: string
  sectionContext: string
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left"
  allowQuestions?: boolean
}

// Notion website embedded knowledge for context-aware responses
const NOTION_KNOWLEDGE = `
Notion is an AI-powered workspace that combines docs, wikis, projects, and calendar in one platform.

Key Products:
- Docs: Beautiful documents with AI writing assistance and 50+ content types
- Projects: Task management with timelines, sprints, and automated workflows
- Wikis: Centralized team knowledge with searchable databases
- Calendar: Time management integrated with your workspace
- Sites: Publish anything fast - pitch decks, portfolios, documentation
- AI Agents: Automated assistants that handle tasks 24/7

Key Features:
- AI-powered search across all content
- Real-time collaboration
- Custom databases and views
- Automations and integrations
- Enterprise-grade security (SOC 2, HIPAA)
- 100+ integrations with tools like Slack, Google, Figma

Pricing:
- Free: For individuals, unlimited pages
- Plus: $10/month for small teams
- Business: $15/month for companies
- Enterprise: Custom pricing with advanced security

Used by companies like OpenAI, Figma, Ramp, Cursor, Vercel, NVIDIA, Volvo, L'Oreal, Discord.
`

export function AIOverviewButton({ 
  sectionId, 
  sectionTitle, 
  sectionContext,
  position = "top-right",
  allowQuestions = false
}: AIOverviewButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [isAnswering, setIsAnswering] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const positionClasses = {
    "top-right": "top-2 right-2",
    "top-left": "top-2 left-2",
    "bottom-right": "bottom-2 right-2",
    "bottom-left": "bottom-2 left-2"
  }

  // Generate and play audio overview
  const playOverview = useCallback(async () => {
    if (isPlaying || isLoading) return

    setIsLoading(true)
    setIsOpen(true)

    try {
      // Generate overview text using OpenRouter
      const chatResponse = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `You are a friendly AI guide for the Notion OS website. Give a brief 2-3 sentence audio overview of the "${sectionTitle}" section. Context: ${sectionContext}. Be concise and engaging. Start with "This section..." or similar.`,
          systemPrompt: `You are an AI tour guide for Notion OS. ${NOTION_KNOWLEDGE}`
        }),
      })

      let overviewText = `This is the ${sectionTitle} section where you can explore powerful features of Notion OS.`
      
      if (chatResponse.ok) {
        const data = await chatResponse.json()
        overviewText = data.response || overviewText
      }

      // Generate voice using ElevenLabs
      const voiceResponse = await fetch("/api/voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: overviewText }),
      })

      if (voiceResponse.ok) {
        const audioBlob = await voiceResponse.blob()
        const audioUrl = URL.createObjectURL(audioBlob)
        
        if (audioRef.current) {
          audioRef.current.src = audioUrl
          audioRef.current.volume = 0.8
          await audioRef.current.play()
          setIsPlaying(true)
        }
      }
    } catch (error) {
      // Silent fail
    } finally {
      setIsLoading(false)
    }
  }, [sectionTitle, sectionContext, isPlaying, isLoading])

  // Stop audio
  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    setIsPlaying(false)
  }, [])

  // Handle question submission
  const handleAskQuestion = useCallback(async () => {
    if (!question.trim() || isAnswering) return

    setIsAnswering(true)
    setAnswer("")

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `User question about "${sectionTitle}": ${question}. Answer based on Notion's features and capabilities. Be helpful and specific.`,
          systemPrompt: `You are a helpful AI assistant for Notion OS website. Answer questions about ${sectionTitle}. ${NOTION_KNOWLEDGE} ${sectionContext}`
        }),
      })

      let responseText = "I can help you learn more about this feature. Please try asking a more specific question."
      
      if (response.ok) {
        const data = await response.json()
        responseText = data.response || responseText
      }

      // Typewriter effect
      for (let i = 0; i <= responseText.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 15))
        setAnswer(responseText.slice(0, i))
      }

      // Play voice response
      const voiceResponse = await fetch("/api/voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: responseText }),
      })

      if (voiceResponse.ok) {
        const audioBlob = await voiceResponse.blob()
        const audioUrl = URL.createObjectURL(audioBlob)
        
        if (audioRef.current) {
          audioRef.current.src = audioUrl
          audioRef.current.volume = 0.8
          await audioRef.current.play()
          setIsPlaying(true)
        }
      }
    } catch (error) {
      setAnswer("I encountered an issue. Please try again.")
    } finally {
      setIsAnswering(false)
    }
  }, [question, sectionTitle, sectionContext, isAnswering])

  return (
    <>
      {/* Hidden audio element */}
      <audio 
        ref={audioRef} 
        onEnded={() => setIsPlaying(false)}
      />

      {/* AI Overview Button */}
      <div className={`absolute ${positionClasses[position]} z-20`}>
        <motion.button
          onClick={() => isPlaying ? stopAudio() : playOverview()}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative group"
        >
          {/* Glow effect */}
          <motion.div
            className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 group-hover:opacity-50 blur-md transition-opacity"
            animate={isPlaying ? { opacity: [0.3, 0.6, 0.3] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          />
          
          {/* Button */}
          <div className={`relative flex items-center justify-center w-10 h-10 rounded-full border transition-all ${
            isPlaying 
              ? "bg-cyan-500/20 border-cyan-500/50" 
              : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-cyan-500/50"
          }`}>
            {isLoading ? (
              <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
            ) : isPlaying ? (
              <motion.div className="flex items-center gap-0.5">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-0.5 bg-cyan-400 rounded-full"
                    animate={{ height: [4, 12, 4] }}
                    transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}
              </motion.div>
            ) : (
              <Volume2 className="w-4 h-4 text-white/70 group-hover:text-cyan-400 transition-colors" />
            )}
          </div>
        </motion.button>

        {/* Tooltip */}
        <AnimatePresence>
          {!isOpen && !isPlaying && (
            <motion.div
              initial={{ opacity: 0, x: position.includes("right") ? 10 : -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className={`absolute top-1/2 -translate-y-1/2 ${
                position.includes("right") ? "right-14" : "left-14"
              } whitespace-nowrap px-2 py-1 rounded bg-black/80 text-xs text-white/70 pointer-events-none`}
            >
              AI Overview
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Question Chat Panel (when allowQuestions is true) */}
      {allowQuestions && (
        <div className={`absolute ${position.includes("right") ? "right-2" : "left-2"} ${position.includes("top") ? "top-14" : "bottom-14"} z-20`}>
          <motion.button
            onClick={() => setShowChat(!showChat)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border transition-all ${
              showChat 
                ? "bg-purple-500/20 border-purple-500/50" 
                : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-purple-500/50"
            }`}>
              {showChat ? (
                <X className="w-4 h-4 text-purple-400" />
              ) : (
                <MessageCircle className="w-4 h-4 text-white/70 group-hover:text-purple-400 transition-colors" />
              )}
            </div>
          </motion.button>

          {/* Tooltip */}
          <AnimatePresence>
            {!showChat && (
              <motion.div
                initial={{ opacity: 0, x: position.includes("right") ? 10 : -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className={`absolute top-1/2 -translate-y-1/2 ${
                  position.includes("right") ? "right-14" : "left-14"
                } whitespace-nowrap px-2 py-1 rounded bg-black/80 text-xs text-white/70 pointer-events-none`}
              >
                Ask a question
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Chat Panel */}
      <AnimatePresence>
        {showChat && allowQuestions && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className={`absolute ${position.includes("right") ? "right-2" : "left-2"} ${position.includes("top") ? "top-28" : "bottom-28"} z-30 w-80`}
          >
            <div className="glass-card rounded-xl border border-white/10 overflow-hidden shadow-2xl">
              {/* Header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-gradient-to-r from-purple-500/10 to-cyan-500/10">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium text-white">Ask about {sectionTitle}</span>
              </div>

              {/* Answer area */}
              {answer && (
                <div className="px-4 py-3 border-b border-white/10 bg-white/5 max-h-40 overflow-y-auto">
                  <p className="text-sm text-white/80 leading-relaxed">{answer}</p>
                  {isPlaying && (
                    <div className="flex items-center gap-1 mt-2 text-xs text-cyan-400">
                      <Volume2 className="w-3 h-3" />
                      <span>Speaking...</span>
                    </div>
                  )}
                </div>
              )}

              {/* Input area */}
              <div className="p-3">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAskQuestion()}
                    placeholder="Type your question..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/40 outline-none focus:border-purple-500/50 transition-colors"
                  />
                  <Button
                    onClick={handleAskQuestion}
                    disabled={isAnswering || !question.trim()}
                    size="sm"
                    className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 text-white"
                  >
                    {isAnswering ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
