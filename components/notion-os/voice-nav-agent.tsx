"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Mic, MicOff, X, Volume2, Send, Loader2, Navigation, ChevronRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const SITE_MAP = [
  { path: "/", keywords: ["home", "landing", "main", "start", "homepage", "beginning", "front page", "index"], label: "Home", priority: 1 },
  { path: "/pricing", keywords: ["pricing", "price", "prices", "plans", "plan", "cost", "costs", "how much", "subscription", "subscriptions", "free", "plus", "business plan", "pay", "payment", "buy", "purchase", "tiers", "tier"], label: "Pricing", priority: 2 },
  { path: "/product/ai", keywords: ["ai", "artificial intelligence", "notion ai", "agents", "agent", "assistant", "automation", "automate", "intelligent", "smart", "machine learning"], label: "Notion AI", priority: 3 },
  { path: "/product/docs", keywords: ["docs", "doc", "documents", "document", "writing", "wiki", "wikis", "notes", "note", "editor", "write", "documentation"], label: "Docs", priority: 4 },
  { path: "/product/projects", keywords: ["projects", "project", "project management", "tasks", "task", "sprints", "sprint", "kanban", "timeline", "timelines", "roadmap", "roadmaps", "manage"], label: "Projects", priority: 5 },
  { path: "/product/calendar", keywords: ["calendar", "calendars", "scheduling", "schedule", "time", "meetings", "meeting", "events", "event", "appointments", "appointment", "date", "dates"], label: "Calendar", priority: 6 },
  { path: "/product/sites", keywords: ["sites", "site", "publish", "publishing", "website", "websites", "portfolio", "portfolios", "hosting", "host", "webpage", "webpages", "web page"], label: "Sites", priority: 7 },
  { path: "/templates", keywords: ["templates", "template", "gallery", "galleries", "marketplace", "examples", "example", "starter", "starters", "prebuilt", "pre-built"], label: "Templates", priority: 8 },
  { path: "/enterprise", keywords: ["enterprise", "enterprises", "security", "secure", "compliance", "compliant", "sso", "admin", "administration", "corporate", "corporation", "business", "companies", "company", "organization"], label: "Enterprise", priority: 9 },
]

// Navigation intent verbs that signal user wants to navigate
const NAV_INTENT_VERBS = [
  "go to", "take me to", "navigate to", "open", "show me", "show", "bring me to",
  "i want to see", "i'd like to see", "can you show", "let me see", "visit",
  "head to", "jump to", "switch to", "move to", "get to", "access", "view",
  "what about", "tell me about", "learn about", "explore"
]

const QUICK_COMMANDS = [
  { text: "Go to pricing", icon: Navigation },
  { text: "Show me Notion AI", icon: Sparkles },
  { text: "Open templates", icon: ChevronRight },
  { text: "Take me to enterprise", icon: Navigation },
]

interface VoiceNavAgentProps {
  onNavigate?: (path: string) => void
}

export function VoiceNavAgent({ onNavigate }: VoiceNavAgentProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [textInput, setTextInput] = useState("")
  const [response, setResponse] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [navigationTarget, setNavigationTarget] = useState<{ path: string; label: string } | null>(null)
  const [pulseActive, setPulseActive] = useState(false)

  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition()
        recognition.continuous = false
        recognition.interimResults = true
        recognition.lang = "en-US"

        recognition.onresult = (event: SpeechRecognitionEvent) => {
          const current = event.resultIndex
          const result = event.results[current]
          const text = result[0].transcript
          setTranscript(text)

          if (result.isFinal) {
            setIsListening(false)
            handleUserInput(text)
          }
        }

        recognition.onerror = () => {
          setIsListening(false)
        }

        recognition.onend = () => {
          setIsListening(false)
        }

        recognitionRef.current = recognition
      }
    }
  }, [])

  // Pulse animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setPulseActive(true), 2000)
    const stop = setTimeout(() => setPulseActive(false), 8000)
    return () => { clearTimeout(timer); clearTimeout(stop) }
  }, [])

  const startListening = useCallback(() => {
    if (recognitionRef.current && !isListening) {
      setTranscript("")
      setResponse("")
      setNavigationTarget(null)
      try {
        recognitionRef.current.start()
        setIsListening(true)
      } catch {
        // Already started
      }
    }
  }, [isListening])

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }, [isListening])

  // Detect navigation intent from user input with improved matching
  const detectNavigation = useCallback((text: string): { path: string; label: string } | null => {
    const lower = text.toLowerCase().trim()
    
    // Check if user has navigation intent
    const hasNavIntent = NAV_INTENT_VERBS.some(verb => lower.includes(verb))
    
    // Score-based matching for better accuracy
    let bestMatch: { path: string; label: string; score: number } | null = null
    
    for (const page of SITE_MAP) {
      let score = 0
      
      for (const keyword of page.keywords) {
        // Exact word boundary match (higher score)
        const wordBoundaryRegex = new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i')
        if (wordBoundaryRegex.test(lower)) {
          score += 10
        }
        // Partial match (lower score)
        else if (lower.includes(keyword)) {
          score += 5
        }
      }
      
      // Boost score if user has navigation intent
      if (hasNavIntent && score > 0) {
        score += 5
      }
      
      // Update best match
      if (score > 0 && (!bestMatch || score > bestMatch.score)) {
        bestMatch = { path: page.path, label: page.label, score }
      }
    }
    
    // Return match if score is above threshold
    if (bestMatch && bestMatch.score >= 5) {
      return { path: bestMatch.path, label: bestMatch.label }
    }
    
    return null
  }, [])

  // Speak text using ElevenLabs
  const speakText = useCallback(async (text: string) => {
    try {
      setIsSpeaking(true)
      const res = await fetch("/api/voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      })
      if (res.ok) {
        const blob = await res.blob()
        const url = URL.createObjectURL(blob)
        const audio = new Audio(url)
        audioRef.current = audio
        audio.volume = 0.75
        audio.onended = () => {
          setIsSpeaking(false)
          URL.revokeObjectURL(url)
        }
        audio.onerror = () => setIsSpeaking(false)
        await audio.play()
      } else {
        setIsSpeaking(false)
      }
    } catch {
      setIsSpeaking(false)
    }
  }, [])

  // Process user input (from voice or text)
  const handleUserInput = useCallback(async (text: string) => {
    if (!text.trim() || isProcessing) return

    setIsProcessing(true)
    setResponse("")
    setNavigationTarget(null)

    // Check for navigation intent
    const navTarget = detectNavigation(text)
    console.log("[v0] Voice Nav - Input:", text)
    console.log("[v0] Voice Nav - Detected target:", navTarget)
    console.log("[v0] Voice Nav - Current path:", pathname)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          systemPrompt: `You are the Notion OS Voice Navigation Assistant. You help users navigate the website and answer questions.

IMPORTANT RULES:
- Keep responses to 1-2 sentences maximum
- If the user wants to navigate somewhere, confirm where you are taking them
- Current page: ${pathname}
- Available pages: Home (/), Pricing (/pricing), Notion AI (/product/ai), Docs (/product/docs), Projects (/product/projects), Calendar (/product/calendar), Sites (/product/sites), Templates (/templates), Enterprise (/enterprise)

${navTarget ? `The user seems to want to go to the "${navTarget.label}" page. Confirm this navigation in your response.` : "Answer their question helpfully and concisely."}

Notion has: AI Agents, Docs, Projects, Calendar, Sites, Templates, Enterprise security. Used by OpenAI, Figma, NVIDIA, Vercel. Free tier available, paid plans from $10/month.`
        }),
      })

      let reply = navTarget
        ? `Taking you to ${navTarget.label} now.`
        : "I can help you navigate. Try saying where you would like to go."

      if (res.ok) {
        const data = await res.json()
        reply = data.response || reply
      }

      // Typewriter effect
      for (let i = 0; i <= reply.length; i++) {
        await new Promise(r => setTimeout(r, 12))
        setResponse(reply.slice(0, i))
      }

      if (navTarget) {
        setNavigationTarget(navTarget)
      }

      // Speak the response
      await speakText(reply)

      // Auto-navigate after voice finishes
      if (navTarget && navTarget.path !== pathname) {
        console.log("[v0] Voice Nav - Navigating to:", navTarget.path)
        setTimeout(() => {
          // Close the panel before navigating
          setIsOpen(false)
          // Use router.push for client-side navigation
          router.push(navTarget.path)
          onNavigate?.(navTarget.path)
          // Reset state after navigation
          setTimeout(() => {
            setNavigationTarget(null)
            setResponse("")
            setTranscript("")
            setTextInput("")
          }, 300)
        }, 1200) // Reduced delay for faster navigation
      } else if (navTarget && navTarget.path === pathname) {
        console.log("[v0] Voice Nav - Already on page:", navTarget.path)
      }
    } catch (error) {
      console.error("[v0] Voice Nav - Error:", error)
      setResponse("I had trouble processing that. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }, [isProcessing, detectNavigation, pathname, speakText, router, onNavigate])

  const handleTextSubmit = () => {
    if (textInput.trim()) {
      setTranscript(textInput)
      handleUserInput(textInput)
      setTextInput("")
    }
  }

  return (
    <>
      {/* Floating Voice Agent Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring", damping: 15 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 group"
        aria-label="Open voice navigation assistant"
      >
        {/* Pulse ring */}
        {pulseActive && (
          <motion.div
            className="absolute -inset-2 rounded-full border-2 border-cyan-400/50"
            animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}

        {/* Button */}
        <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#0a1628] to-[#1a1f4e] border border-cyan-500/30 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 group-hover:border-cyan-500/50 transition-all">
          {isSpeaking ? (
            <motion.div className="flex items-center gap-0.5">
              {[0, 1, 2, 3].map(i => (
                <motion.div
                  key={i}
                  className="w-0.5 bg-cyan-400 rounded-full"
                  animate={{ height: [4, 14, 4] }}
                  transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.1 }}
                />
              ))}
            </motion.div>
          ) : (
            <Mic className="h-6 w-6 text-cyan-400" />
          )}
        </div>

        {/* Label tooltip */}
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: pulseActive ? 1 : 0, x: pulseActive ? 0 : -10 }}
          className="absolute left-full ml-3 top-1/2 -translate-y-1/2 whitespace-nowrap text-xs font-medium text-cyan-400 bg-[#0a1628]/90 border border-cyan-500/20 px-3 py-1.5 rounded-lg pointer-events-none"
        >
          Voice Navigation
        </motion.span>
      </motion.button>

      {/* Voice Navigation Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
              onClick={() => { setIsOpen(false); stopListening() }}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-6 left-6 right-6 sm:left-auto sm:right-auto sm:bottom-6 sm:left-6 sm:w-[420px] z-50 rounded-2xl border border-white/10 bg-[#080c18]/95 backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-gradient-to-r from-cyan-500/5 to-purple-500/5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center">
                    <Navigation className="h-4 w-4 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Voice Navigation</p>
                    <p className="text-[11px] text-white/40 font-mono">Powered by ElevenLabs + OpenRouter</p>
                  </div>
                </div>
                <button
                  onClick={() => { setIsOpen(false); stopListening() }}
                  className="text-white/40 hover:text-white transition-colors p-1"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Microphone Area */}
              <div className="px-5 py-6 flex flex-col items-center gap-4">
                {/* Mic button */}
                <motion.button
                  onClick={isListening ? stopListening : startListening}
                  className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all ${
                    isListening
                      ? "bg-red-500/20 border-2 border-red-500/60"
                      : "bg-cyan-500/10 border-2 border-cyan-500/30 hover:border-cyan-500/60 hover:bg-cyan-500/20"
                  }`}
                >
                  {/* Listening rings */}
                  {isListening && (
                    <>
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-red-400/40"
                        animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-red-400/30"
                        animate={{ scale: [1, 1.7], opacity: [0.3, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: 0.3 }}
                      />
                    </>
                  )}

                  {isListening ? (
                    <MicOff className="h-8 w-8 text-red-400" />
                  ) : (
                    <Mic className="h-8 w-8 text-cyan-400" />
                  )}
                </motion.button>

                <p className="text-sm text-white/50">
                  {isListening
                    ? "Listening... speak now"
                    : isProcessing
                    ? "Processing..."
                    : "Tap to speak or type below"}
                </p>

                {/* Live transcript */}
                <AnimatePresence>
                  {transcript && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10"
                    >
                      <p className="text-xs text-white/40 mb-1 font-mono">You said:</p>
                      <p className="text-sm text-white/90">{transcript}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* AI Response */}
                <AnimatePresence>
                  {(response || isProcessing) && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="w-full px-4 py-3 rounded-xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Sparkles className="w-3 h-3 text-cyan-400" />
                        <p className="text-xs text-cyan-400 font-mono">Notion OS</p>
                        {isSpeaking && (
                          <div className="flex items-center gap-0.5 ml-auto">
                            <Volume2 className="w-3 h-3 text-cyan-400" />
                            {[0, 1, 2].map(i => (
                              <motion.div
                                key={i}
                                className="w-0.5 bg-cyan-400 rounded-full"
                                animate={{ height: [3, 10, 3] }}
                                transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.12 }}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-white/90 leading-relaxed">
                        {isProcessing && !response ? (
                          <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1, repeat: Infinity }}>
                            Thinking...
                          </motion.span>
                        ) : (
                          response
                        )}
                      </p>

                      {/* Navigation confirmation */}
                      {navigationTarget && navigationTarget.path !== pathname && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-3 flex items-center gap-2 text-xs text-cyan-400 font-mono"
                        >
                          <Navigation className="w-3 h-3" />
                          <span>Navigating to {navigationTarget.label}...</span>
                          <motion.div
                            className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Quick Commands */}
              {!transcript && !response && (
                <div className="px-5 pb-3 space-y-1.5">
                  <p className="text-[11px] text-white/30 font-mono uppercase tracking-wider mb-2">Quick commands</p>
                  {QUICK_COMMANDS.map((cmd) => (
                    <button
                      key={cmd.text}
                      onClick={() => {
                        setTranscript(cmd.text)
                        handleUserInput(cmd.text)
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/3 border border-white/5 hover:bg-white/5 hover:border-cyan-500/20 transition-all group text-left"
                    >
                      <cmd.icon className="w-3.5 h-3.5 text-white/30 group-hover:text-cyan-400 transition-colors" />
                      <span className="text-sm text-white/60 group-hover:text-white/90 transition-colors">{cmd.text}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Text Input */}
              <div className="px-5 pb-5 pt-2 border-t border-white/5">
                <div className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2.5 border border-white/10 focus-within:border-cyan-500/30 transition-colors">
                  <input
                    type="text"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Or type your command..."
                    className="flex-1 bg-transparent text-sm text-white placeholder:text-white/30 outline-none"
                    onKeyDown={(e) => e.key === "Enter" && handleTextSubmit()}
                  />
                  <Button
                    size="sm"
                    onClick={handleTextSubmit}
                    disabled={isProcessing || !textInput.trim()}
                    className="h-8 w-8 p-0 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/20"
                  >
                    {isProcessing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-[10px] text-white/20 mt-2 text-center font-mono">
                  Speech-to-Text + ElevenLabs TTS + OpenRouter AI
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
