"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Play, Send, Loader2, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"

// Floating agent icons data
const floatingAgents = [
  { id: 1, icon: "💬", color: "from-orange-400 to-pink-500", position: "top-32 left-[15%]", delay: 0 },
  { id: 2, icon: "✓", color: "from-blue-400 to-cyan-500", position: "top-48 left-[20%]", delay: 0.2 },
  { id: 3, icon: "💬", color: "from-cyan-400 to-blue-500", position: "top-24 right-[18%]", delay: 0.4 },
  { id: 4, icon: "✅", color: "from-green-400 to-emerald-500", position: "top-36 right-[15%]", delay: 0.6 },
  { id: 5, icon: "🤖", color: "from-purple-400 to-pink-500", position: "top-[55%] right-[8%]", delay: 0.8, hasNotification: true },
  { id: 6, icon: "⚙️", color: "from-amber-400 to-orange-500", position: "bottom-[30%] right-[12%]", delay: 1 },
  { id: 7, icon: "📋", color: "from-blue-400 to-indigo-500", position: "top-[50%] left-[8%]", delay: 1.2, hasNotification: true },
  { id: 8, icon: "🔧", color: "from-slate-400 to-slate-600", position: "bottom-[25%] left-[15%]", delay: 1.4 },
]

// Company logos
const companyLogos = [
  { name: "OpenAI", logo: "OpenAI" },
  { name: "Figma", logo: "Figma" },
  { name: "Ramp", logo: "ramp" },
  { name: "Cursor", logo: "CURSOR" },
  { name: "Vercel", logo: "▲Vercel" },
  { name: "NVIDIA", logo: "NVIDIA" },
  { name: "Volvo", logo: "VOLVO" },
  { name: "L'Oreal", logo: "L'ORÉAL" },
  { name: "Discord", logo: "Discord" },
]

interface HeroSectionProps {
  onVoiceTour?: () => void
}

export function HeroSection({ onVoiceTour }: HeroSectionProps) {
  const [demoInput, setDemoInput] = useState("Summarize my meeting notes")
  const [isProcessing, setIsProcessing] = useState(false)
  const [aiResponse, setAiResponse] = useState("")
  const [isVoicePlaying, setIsVoicePlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Handle demo interaction
  const handleDemoSubmit = async () => {
    if (isProcessing) return
    
    setIsProcessing(true)
    setAiResponse("")
    
    // Simulate typing response
    const response = "Based on your meeting notes, here are the key takeaways: 3 action items assigned, Q2 roadmap approved, and next sync scheduled for Friday."
    
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Typewriter effect for response
    for (let i = 0; i <= response.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 20))
      setAiResponse(response.slice(0, i))
    }
    
    setIsProcessing(false)
    
    // Trigger voice playback
    triggerVoice(response)
  }

  // Trigger ElevenLabs voice
  const triggerVoice = async (text: string) => {
    try {
      setIsVoicePlaying(true)
      const response = await fetch("/api/voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      })
      
      if (response.ok) {
        const audioBlob = await response.blob()
        const audioUrl = URL.createObjectURL(audioBlob)
        
        if (audioRef.current) {
          audioRef.current.src = audioUrl
          audioRef.current.volume = 0.7
          await audioRef.current.play()
        }
      }
    } catch (error) {
      // Silent fail - experience continues without voice
    } finally {
      setIsVoicePlaying(false)
    }
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden pt-24 pb-8">
      {/* Hidden audio element */}
      <audio ref={audioRef} onEnded={() => setIsVoicePlaying(false)} />
      
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#1a1f4e] to-[#0d1339]" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(99, 102, 241, 0.15) 1px, transparent 0)`,
          backgroundSize: "40px 40px"
        }}
      />

      {/* Floating Agent Icons */}
      {floatingAgents.map((agent) => (
        <motion.div
          key={agent.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: agent.delay + 0.5 }}
          className={`absolute ${agent.position} z-10 hidden lg:block`}
        >
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 4 + agent.id * 0.5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="relative"
          >
            {/* Connection line */}
            <div className="absolute top-1/2 left-1/2 w-24 h-[1px] bg-gradient-to-r from-cyan-500/50 to-transparent transform -translate-y-1/2" 
              style={{ transform: `rotate(${agent.id * 45}deg)` }}
            />
            
            {/* Icon container */}
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${agent.color} flex items-center justify-center shadow-lg shadow-black/20 border border-white/10`}>
              <span className="text-2xl">{agent.icon}</span>
            </div>
            
            {/* Notification badge */}
            {agent.hasNotification && (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-[#1a1f4e]"
              >
                3
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      ))}

      {/* Main Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex-1 flex flex-col">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight"
        >
          Meet the night shift.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-8 text-pretty"
        >
          Notion agents keep work moving 24/7. They capture knowledge, answer
          questions, and push projects forward—all while you sleep.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Button 
            size="lg" 
            className="bg-[#2f81f7] hover:bg-[#1f6feb] text-white text-base px-8 h-12 rounded-lg shadow-lg shadow-blue-500/20"
          >
            Get Notion free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="bg-white/5 border-white/20 text-white hover:bg-white/10 text-base px-8 h-12 rounded-lg backdrop-blur-sm"
          >
            Request a demo
          </Button>
        </motion.div>

        {/* Interactive Demo Panel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="relative max-w-4xl mx-auto w-full"
        >
          {/* Demo panel glow */}
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl opacity-50" />
          
          {/* Main demo container */}
          <div className="relative glass-card rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-black/40">
            {/* Demo header bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-black/20">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="text-xs text-white/40 font-mono">notion-ai-demo</div>
              </div>
              {isVoicePlaying && (
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="flex items-center gap-1 text-cyan-400"
                >
                  <Volume2 className="w-3 h-3" />
                  <span className="text-xs">Speaking...</span>
                </motion.div>
              )}
            </div>
            
            {/* Demo content */}
            <div className="p-6">
              {/* Input area */}
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 mb-4">
                <div className="flex-1">
                  <input
                    type="text"
                    value={demoInput}
                    onChange={(e) => setDemoInput(e.target.value)}
                    placeholder="Ask Notion AI anything..."
                    className="w-full bg-transparent text-white placeholder-white/40 outline-none text-base"
                    onKeyDown={(e) => e.key === "Enter" && handleDemoSubmit()}
                  />
                </div>
                <Button
                  onClick={handleDemoSubmit}
                  disabled={isProcessing}
                  size="sm"
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white px-4"
                >
                  {isProcessing ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
              
              {/* AI Response area */}
              <AnimatePresence>
                {(aiResponse || isProcessing) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="rounded-xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm">✨</span>
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-cyan-400 font-medium mb-1">Notion AI</div>
                        <div className="text-white/90 text-sm leading-relaxed">
                          {isProcessing && !aiResponse ? (
                            <motion.span
                              animate={{ opacity: [0.4, 1, 0.4] }}
                              transition={{ duration: 1, repeat: Infinity }}
                            >
                              Thinking...
                            </motion.span>
                          ) : (
                            <>
                              {aiResponse}
                              {isProcessing && (
                                <motion.span
                                  animate={{ opacity: [0, 1, 0] }}
                                  transition={{ duration: 0.5, repeat: Infinity }}
                                  className="inline-block w-2 h-4 bg-cyan-400 ml-1"
                                />
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Company Logos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-auto pt-12"
        >
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {companyLogos.map((company, index) => (
              <motion.div
                key={company.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.6, y: 0 }}
                transition={{ duration: 0.4, delay: 1.3 + index * 0.05 }}
                whileHover={{ opacity: 1 }}
                className="flex items-center gap-1 text-white/60 hover:text-white/90 transition-colors cursor-default"
              >
                <span className="text-sm font-semibold tracking-wide">{company.logo}</span>
                <span className="text-cyan-400">•</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
