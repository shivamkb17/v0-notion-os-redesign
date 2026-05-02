"use client"

import { motion } from "framer-motion"
import { Sparkles, Search, Mic, Send, CheckCircle2 } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const aiCapabilities = [
  { label: "Summarize notes", response: "Here's a summary of your meeting notes from today..." },
  { label: "Generate tasks", response: "Based on your notes, I've created 5 action items..." },
  { label: "Find documents", response: "I found 12 relevant documents across your workspace..." },
  { label: "Draft response", response: "Here's a draft response for your review..." }
]

export function AISection() {
  const [activeCapability, setActiveCapability] = useState(0)
  const [isTyping, setIsTyping] = useState(false)

  const handleCapabilityClick = (index: number) => {
    setIsTyping(true)
    setActiveCapability(index)
    setTimeout(() => setIsTyping(false), 1500)
  }

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">Notion AI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Ask your <span className="text-primary text-glow">on-demand assistants.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            AI that understands your workspace and helps you work smarter, not harder.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* AI Demo Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-2xl p-6 glow-primary"
          >
            {/* Chat interface mock */}
            <div className="bg-card rounded-xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center gap-3 p-4 border-b border-border">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">Notion AI</div>
                  <div className="text-xs text-muted-foreground">Always ready to help</div>
                </div>
              </div>

              {/* Chat area */}
              <div className="p-4 h-64 flex flex-col justify-end gap-3">
                {/* User message */}
                <motion.div
                  key={`user-${activeCapability}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-end"
                >
                  <div className="bg-primary text-primary-foreground px-4 py-2 rounded-2xl rounded-br-sm max-w-xs">
                    <p className="text-sm">{aiCapabilities[activeCapability].label}</p>
                  </div>
                </motion.div>

                {/* AI response */}
                <motion.div
                  key={`ai-${activeCapability}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex gap-2"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                    <Sparkles className="h-3 w-3 text-white" />
                  </div>
                  <div className="glass-card px-4 py-2 rounded-2xl rounded-tl-sm max-w-xs">
                    {isTyping ? (
                      <div className="flex gap-1">
                        <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1, repeat: Infinity }} className="w-2 h-2 bg-primary rounded-full" />
                        <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} className="w-2 h-2 bg-primary rounded-full" />
                        <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} className="w-2 h-2 bg-primary rounded-full" />
                      </div>
                    ) : (
                      <p className="text-sm text-foreground">{aiCapabilities[activeCapability].response}</p>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Input area */}
              <div className="p-4 border-t border-border">
                <div className="flex items-center gap-2 bg-muted rounded-xl px-4 py-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Ask anything..."
                    className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                  />
                  <Mic className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-primary transition-colors" />
                  <Send className="h-4 w-4 text-primary cursor-pointer" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Capabilities list */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-semibold text-foreground mb-6">Try it yourself</h3>
            {aiCapabilities.map((capability, index) => (
              <motion.button
                key={capability.label}
                onClick={() => handleCapabilityClick(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all text-left ${
                  activeCapability === index
                    ? "glass-card ring-2 ring-primary"
                    : "bg-muted/50 hover:bg-muted"
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  activeCapability === index ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <span className="text-foreground font-medium">{capability.label}</span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
