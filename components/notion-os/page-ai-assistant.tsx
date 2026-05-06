"use client"

import { useState, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, X, Send, Volume2, Loader2, Bot, User } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Message {
  role: "user" | "assistant"
  content: string
}

interface PageAIAssistantProps {
  pageContext: string
  pageName: string
  accentColor?: string
}

export function PageAIAssistant({ pageContext, pageName, accentColor = "cyan" }: PageAIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const colorMap: Record<string, { bg: string; text: string; border: string; glow: string }> = {
    cyan: { bg: "bg-cyan-500/10", text: "text-cyan-400", border: "border-cyan-500/30", glow: "shadow-cyan-500/20" },
    blue: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/30", glow: "shadow-blue-500/20" },
    purple: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/30", glow: "shadow-purple-500/20" },
    green: { bg: "bg-green-500/10", text: "text-green-400", border: "border-green-500/30", glow: "shadow-green-500/20" },
    pink: { bg: "bg-pink-500/10", text: "text-pink-400", border: "border-pink-500/30", glow: "shadow-pink-500/20" },
    amber: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/30", glow: "shadow-amber-500/20" },
  }

  const colors = colorMap[accentColor] || colorMap.cyan

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
        audio.volume = 0.7
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

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMsg: Message = { role: "user", content: input }
    setMessages(prev => [...prev, userMsg])
    setInput("")
    setIsLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          systemPrompt: `You are the Notion OS AI assistant for the "${pageName}" page. Answer questions helpfully and concisely (2-3 sentences max). Here is the context about this page:\n\n${pageContext}`,
        }),
      })

      let reply = "I can help you learn more about this feature. Please try again."
      if (res.ok) {
        const data = await res.json()
        reply = data.response || reply
      }

      const assistantMsg: Message = { role: "assistant", content: reply }
      setMessages(prev => [...prev, assistantMsg])
      speakText(reply)
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Something went wrong. Please try again." }])
    } finally {
      setIsLoading(false)
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100)
    }
  }

  return (
    <>
      {/* Floating button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-[#0a1628] to-[#1a1f4e] border ${colors.border} flex items-center justify-center shadow-lg ${colors.glow} shadow-xl hover:scale-110 transition-transform`}
      >
        {isSpeaking ? (
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.8, repeat: Infinity }}>
            <Volume2 className={`h-6 w-6 ${colors.text}`} />
          </motion.div>
        ) : (
          <MessageSquare className={`h-6 w-6 ${colors.text}`} />
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-h-[520px] rounded-2xl border border-white/10 bg-[#0a0a1a]/95 backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg ${colors.bg} flex items-center justify-center`}>
                  <Bot className={`h-4 w-4 ${colors.text}`} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{pageName} Assistant</p>
                  <p className="text-xs text-white/40">Ask anything about this page</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[200px]">
              {messages.length === 0 && (
                <div className="text-center py-8">
                  <Bot className={`h-10 w-10 mx-auto mb-3 ${colors.text} opacity-40`} />
                  <p className="text-sm text-white/40">Ask me anything about {pageName}</p>
                  <div className="mt-4 space-y-2">
                    {[
                      `What does ${pageName} offer?`,
                      "How does this compare to alternatives?",
                      "What are the key benefits?",
                    ].map((q) => (
                      <button
                        key={q}
                        onClick={() => { setInput(q); }}
                        className={`block w-full text-left text-xs px-3 py-2 rounded-lg border ${colors.border} ${colors.bg} ${colors.text} hover:bg-white/5 transition-colors`}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "assistant" && (
                    <div className={`w-7 h-7 rounded-lg ${colors.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <Bot className={`h-3.5 w-3.5 ${colors.text}`} />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-3.5 py-2.5 rounded-xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-white/10 text-white"
                        : `${colors.bg} border ${colors.border} text-white/90`
                    }`}
                  >
                    {msg.content}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <User className="h-3.5 w-3.5 text-white/60" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-2.5">
                  <div className={`w-7 h-7 rounded-lg ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                    <Bot className={`h-3.5 w-3.5 ${colors.text}`} />
                  </div>
                  <div className={`px-3.5 py-2.5 rounded-xl ${colors.bg} border ${colors.border}`}>
                    <motion.div className="flex gap-1.5" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1, repeat: Infinity }}>
                      <div className={`w-1.5 h-1.5 rounded-full ${colors.text} bg-current`} />
                      <div className={`w-1.5 h-1.5 rounded-full ${colors.text} bg-current`} />
                      <div className={`w-1.5 h-1.5 rounded-full ${colors.text} bg-current`} />
                    </motion.div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/10">
              <div className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your question..."
                  className="flex-1 bg-transparent text-white text-sm placeholder:text-white/30 outline-none"
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <Button
                  size="sm"
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className={`h-8 w-8 p-0 rounded-lg ${isLoading ? "bg-white/10" : `bg-gradient-to-r from-${accentColor}-500 to-${accentColor}-600`}`}
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin text-white/60" /> : <Send className="h-4 w-4" />}
                </Button>
              </div>
              {isSpeaking && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`flex items-center gap-2 mt-2 px-2 text-xs ${colors.text}`}
                >
                  <Volume2 className="h-3 w-3" />
                  <span>Speaking response...</span>
                  <div className="flex gap-0.5">
                    {[0, 1, 2, 3].map(i => (
                      <motion.div
                        key={i}
                        className="w-0.5 bg-current rounded-full"
                        animate={{ height: [4, 12, 4] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
