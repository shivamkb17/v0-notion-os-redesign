"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ArrowRight, 
  Search, 
  Mic, 
  Play,
  CheckCircle2,
  Sparkles,
  Calendar,
  Volume2,
  Pause,
  Send,
  Loader2
} from "lucide-react"
import { Button } from "@/components/ui/button"

// App icons for enterprise search
const connectedApps = [
  { name: "Slack", color: "#E01E5A", icon: "S" },
  { name: "Google", color: "#4285F4", icon: "G" },
  { name: "Drive", color: "#FBBC04", icon: "D" },
  { name: "Notion", color: "#000000", icon: "N" },
  { name: "Figma", color: "#F24E1E", icon: "F" },
  { name: "Linear", color: "#5E6AD2", icon: "L" },
]

// Meeting participants
const participants = [
  { name: "Joyce", color: "#3B82F6" },
  { name: "Sam", color: "#EC4899" },
  { name: "Alex", color: "#10B981" },
]

export function AIAssistantsSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1339] via-[#0a1628] to-[#0d1339]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* System label */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-400 font-medium">Notion AI</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ask your <span className="text-cyan-400" style={{ textShadow: "0 0 30px rgba(34, 211, 238, 0.5)" }}>on-demand assistants.</span>
          </h2>
          
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            AI that understands your workspace and helps you work smarter, not harder.
          </p>
        </motion.div>

        {/* Cards Grid - 2 column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT: Notion Agent Card with AI Chat */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <NotionAgentCard />
          </motion.div>

          {/* RIGHT: Try it yourself panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <TryItYourselfCard />
          </motion.div>
        </div>

        {/* Bottom row - Enterprise Search and Meeting Notes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <EnterpriseSearchCard />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <MeetingNotesCard />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Notion Agent Card with real AI integration
function NotionAgentCard() {
  const [userInput, setUserInput] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [response, setResponse] = useState("")
  const [isSpeaking, setIsSpeaking] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const handleSubmit = async () => {
    if (!userInput.trim() || isProcessing) return
    
    setIsProcessing(true)
    setResponse("")
    
    try {
      // Get AI response from OpenRouter
      const chatResponse = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: `User is asking Notion AI assistant: "${userInput}". Provide a helpful, concise response about how Notion can help with this task.`
        }),
      })
      
      let aiText = "I can help you with that! Let me analyze your request and provide personalized assistance."
      
      if (chatResponse.ok) {
        const data = await chatResponse.json()
        aiText = data.response || aiText
      }
      
      // Typewriter effect
      for (let i = 0; i <= aiText.length; i++) {
        await new Promise(r => setTimeout(r, 20))
        setResponse(aiText.slice(0, i))
      }
      
      setIsProcessing(false)
      
      // Trigger ElevenLabs voice
      await speakResponse(aiText)
    } catch {
      setResponse("I'm ready to help you with any task. Just ask!")
      setIsProcessing(false)
    }
  }

  const speakResponse = async (text: string) => {
    try {
      setIsSpeaking(true)
      const voiceResponse = await fetch("/api/voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      })
      
      if (voiceResponse.ok) {
        const blob = await voiceResponse.blob()
        const url = URL.createObjectURL(blob)
        const audio = new Audio(url)
        audio.volume = 0.7
        audioRef.current = audio
        audio.onended = () => {
          setIsSpeaking(false)
          URL.revokeObjectURL(url)
        }
        await audio.play()
      } else {
        setIsSpeaking(false)
      }
    } catch {
      setIsSpeaking(false)
    }
  }

  const quickActions = [
    "Summarize notes",
    "Create task list",
    "Draft email"
  ]

  return (
    <div className="h-full glass-card rounded-2xl border border-white/10 overflow-hidden bg-[#1a1f2e]/80 backdrop-blur-xl">
      {/* Header */}
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Notion AI</h3>
            <p className="text-white/50 text-xs">Always ready to help</p>
          </div>
          {isSpeaking && (
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="ml-auto flex items-center gap-1 text-cyan-400"
            >
              <Volume2 className="w-4 h-4" />
              <span className="text-xs">Speaking</span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Chat area */}
      <div className="p-5 min-h-[300px] flex flex-col">
        {/* Quick actions */}
        {!response && !isProcessing && (
          <div className="mb-4">
            <p className="text-white/50 text-sm mb-3">Quick actions:</p>
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action) => (
                <button
                  key={action}
                  onClick={() => {
                    setUserInput(action)
                  }}
                  className="px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm hover:bg-cyan-500/20 transition-colors"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* AI Response */}
        <AnimatePresence mode="wait">
          {(response || isProcessing) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1 mb-4"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 p-4 rounded-xl bg-white/5 border border-white/10">
                  {isProcessing && !response ? (
                    <motion.div
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="text-white/60"
                    >
                      Thinking...
                    </motion.div>
                  ) : (
                    <p className="text-white/90 text-sm leading-relaxed">
                      {response}
                      {isProcessing && (
                        <motion.span
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                          className="inline-block w-2 h-4 bg-cyan-400 ml-1"
                        />
                      )}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input area */}
        <div className="mt-auto">
          <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10">
            <Search className="w-4 h-4 text-white/40 flex-shrink-0" />
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="Ask anything..."
              className="flex-1 bg-transparent text-white placeholder-white/40 outline-none text-sm"
              disabled={isProcessing}
            />
            <button className="p-1.5 text-white/40 hover:text-white/70 transition-colors">
              <Mic className="w-4 h-4" />
            </button>
            <button
              onClick={handleSubmit}
              disabled={isProcessing || !userInput.trim()}
              className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors disabled:opacity-50"
            >
              {isProcessing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Try it yourself card with interactive tasks
function TryItYourselfCard() {
  const [selectedTask, setSelectedTask] = useState<string | null>("Summarize notes")
  const [isExecuting, setIsExecuting] = useState(false)
  const [result, setResult] = useState("")
  const [isSpeaking, setIsSpeaking] = useState(false)

  const tasks = [
    { id: "summarize", label: "Summarize notes", prompt: "Summarize my meeting notes into key action items" },
    { id: "generate", label: "Generate tasks", prompt: "Generate a task list from my project requirements" },
    { id: "find", label: "Find documents", prompt: "Find all documents related to Q3 planning" },
    { id: "draft", label: "Draft response", prompt: "Draft a professional response to this email" },
  ]

  const handleTaskClick = async (task: typeof tasks[0]) => {
    if (isExecuting) return
    
    setSelectedTask(task.label)
    setIsExecuting(true)
    setResult("")
    
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: `User wants to: ${task.prompt}. Provide a brief, helpful response showing what Notion AI would do (2-3 sentences max).`
        }),
      })
      
      let text = "Processing your request..."
      if (response.ok) {
        const data = await response.json()
        text = data.response || text
      }
      
      // Typewriter
      for (let i = 0; i <= text.length; i++) {
        await new Promise(r => setTimeout(r, 15))
        setResult(text.slice(0, i))
      }
      
      setIsExecuting(false)
      
      // Voice
      setIsSpeaking(true)
      const voiceRes = await fetch("/api/voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      })
      
      if (voiceRes.ok) {
        const blob = await voiceRes.blob()
        const url = URL.createObjectURL(blob)
        const audio = new Audio(url)
        audio.volume = 0.6
        audio.onended = () => {
          setIsSpeaking(false)
          URL.revokeObjectURL(url)
        }
        await audio.play()
      } else {
        setIsSpeaking(false)
      }
    } catch {
      setResult("Ready to help with your task!")
      setIsExecuting(false)
    }
  }

  return (
    <div className="h-full glass-card rounded-2xl border border-white/10 overflow-hidden bg-[#1a1f2e]/80 backdrop-blur-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Try it yourself</h3>
        {isSpeaking && (
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="flex items-center gap-1 text-cyan-400"
          >
            <Volume2 className="w-4 h-4" />
            <span className="text-xs">Speaking</span>
          </motion.div>
        )}
      </div>

      {/* Task buttons */}
      <div className="space-y-3">
        {tasks.map((task) => (
          <button
            key={task.id}
            onClick={() => handleTaskClick(task)}
            disabled={isExecuting}
            className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all text-left ${
              selectedTask === task.label
                ? "bg-cyan-500/10 border-cyan-500/30"
                : "bg-white/5 border-white/10 hover:bg-white/10"
            }`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              selectedTask === task.label ? "bg-cyan-500/20" : "bg-white/10"
            }`}>
              {selectedTask === task.label && isExecuting ? (
                <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
              ) : (
                <CheckCircle2 className={`w-4 h-4 ${
                  selectedTask === task.label ? "text-cyan-400" : "text-white/40"
                }`} />
              )}
            </div>
            <span className={`font-medium ${
              selectedTask === task.label ? "text-white" : "text-white/70"
            }`}>
              {task.label}
            </span>
          </button>
        ))}
      </div>

      {/* Result area */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20"
          >
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-xs text-cyan-400 font-medium">AI Response</span>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">{result}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Enterprise Search Card
function EnterpriseSearchCard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState<string[]>([])
  const [isSpeaking, setIsSpeaking] = useState(false)

  const handleSearch = async () => {
    if (!searchQuery.trim() || isSearching) return
    
    setIsSearching(true)
    setResults([])
    
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: `User is searching for: "${searchQuery}". Generate 3 relevant search results as a JSON array of strings. Example: ["Result 1", "Result 2", "Result 3"]. Return ONLY the JSON array.`
        }),
      })
      
      let searchResults = [
        "Found 12 matching documents in your workspace",
        "3 related tasks in current sprint",
        "5 team discussions mentioning this topic"
      ]
      
      if (response.ok) {
        const data = await response.json()
        try {
          const parsed = JSON.parse(data.response)
          if (Array.isArray(parsed)) searchResults = parsed.slice(0, 3)
        } catch {
          // Use default
        }
      }
      
      // Show results one by one
      for (let i = 0; i < searchResults.length; i++) {
        await new Promise(r => setTimeout(r, 300))
        setResults(prev => [...prev, searchResults[i]])
      }
      
      setIsSearching(false)
      
      // Voice summary
      const summary = `Found ${searchResults.length} results for ${searchQuery}`
      setIsSpeaking(true)
      const voiceRes = await fetch("/api/voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: summary }),
      })
      
      if (voiceRes.ok) {
        const blob = await voiceRes.blob()
        const audio = new Audio(URL.createObjectURL(blob))
        audio.volume = 0.6
        audio.onended = () => setIsSpeaking(false)
        await audio.play()
      } else {
        setIsSpeaking(false)
      }
    } catch {
      setResults(["Search your entire workspace instantly"])
      setIsSearching(false)
    }
  }

  return (
    <div className="h-full glass-card rounded-2xl border border-white/10 overflow-hidden bg-[#1a1f2e]/80 backdrop-blur-xl">
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono text-cyan-400">Enterprise Search</span>
          {isSpeaking && (
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="flex items-center gap-1 text-cyan-400"
            >
              <Volume2 className="w-3 h-3" />
            </motion.div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">One search for everything.</h3>
          <ArrowRight className="h-5 w-5 text-cyan-400" />
        </div>
      </div>

      <div className="mx-4 mb-4 rounded-xl bg-gradient-to-br from-rose-500/90 to-orange-500/90 p-4">
        {/* Search input */}
        <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-2 mb-4">
          <Search className="w-4 h-4 text-white/70" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search across all your apps..."
            className="flex-1 bg-transparent text-white placeholder-white/50 outline-none text-sm"
          />
          <button
            onClick={handleSearch}
            disabled={isSearching}
            className="p-1 rounded hover:bg-white/20 transition-colors"
          >
            {isSearching ? (
              <Loader2 className="w-4 h-4 text-white animate-spin" />
            ) : (
              <Send className="w-4 h-4 text-white" />
            )}
          </button>
        </div>

        {/* Results */}
        <div className="space-y-2 min-h-[100px]">
          {results.map((result, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-start gap-2 text-white/90 text-sm"
            >
              <CheckCircle2 className="w-4 h-4 text-white/70 mt-0.5 flex-shrink-0" />
              <span>{result}</span>
            </motion.div>
          ))}
          {results.length === 0 && !isSearching && (
            <p className="text-white/60 text-sm">Search to see AI-powered results</p>
          )}
        </div>

        {/* Connected apps */}
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/20">
          {connectedApps.map((app) => (
            <div
              key={app.name}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold"
              style={{ backgroundColor: app.color }}
            >
              {app.icon}
            </div>
          ))}
          <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center text-white/60 text-sm">+</div>
        </div>
      </div>
    </div>
  )
}

// Meeting Notes Card
function MeetingNotesCard() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentLine, setCurrentLine] = useState(0)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [customTopic, setCustomTopic] = useState("")
  const [aiSummary, setAiSummary] = useState("")

  const transcript = [
    "Joyce provided an update on the landing page improvements.",
    "Based on research, the team has identified three key areas to enhance.",
    "Timeline and next steps were discussed.",
    "Team review planned for @Tomorrow",
    "Launch targeted for the week after testing"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLine(prev => (prev + 1) % transcript.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const handleGenerateSummary = async () => {
    if (isSpeaking) return
    
    const topic = customTopic || "meeting notes"
    setIsSpeaking(true)
    setAiSummary("")
    
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: `Generate a brief meeting summary about: ${topic}. Include 2-3 key points and action items. Keep it under 50 words.`
        }),
      })
      
      let summary = "Meeting summary: Key updates discussed. Action items assigned. Follow-up scheduled for next week."
      
      if (response.ok) {
        const data = await response.json()
        summary = data.response || summary
      }
      
      setAiSummary(summary)
      
      // Voice
      const voiceRes = await fetch("/api/voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: summary }),
      })
      
      if (voiceRes.ok) {
        const blob = await voiceRes.blob()
        const audio = new Audio(URL.createObjectURL(blob))
        audio.volume = 0.7
        audio.onended = () => setIsSpeaking(false)
        await audio.play()
      } else {
        setIsSpeaking(false)
      }
    } catch {
      setAiSummary("Meeting summary ready for playback.")
      setIsSpeaking(false)
    }
  }

  return (
    <div className="h-full glass-card rounded-2xl border border-white/10 overflow-hidden bg-[#1a1f2e]/80 backdrop-blur-xl">
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono text-cyan-400">AI Meeting Notes</span>
          <motion.div
            animate={{ opacity: isPlaying ? [0.5, 1, 0.5] : 1 }}
            transition={{ duration: 1, repeat: isPlaying ? Infinity : 0 }}
            className="flex items-center gap-1"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
            <span className="text-[10px] text-red-400">REC</span>
          </motion.div>
        </div>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">Perfect notes, every time.</h3>
          <ArrowRight className="h-5 w-5 text-cyan-400" />
        </div>
      </div>

      <div className="mx-4 mb-4 rounded-xl bg-white/5 border border-white/10 overflow-hidden">
        {/* Meeting header */}
        <div className="p-3 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span className="text-white text-sm font-medium">Joyce & Sam weekly 1:1</span>
          </div>
          <div className="flex items-center gap-2">
            {participants.map((p) => (
              <div
                key={p.name}
                className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: p.color }}
              >
                {p.name[0]}
              </div>
            ))}
          </div>
        </div>

        {/* Tabs and waveform */}
        <div className="flex items-center gap-4 px-3 py-2 border-b border-white/10">
          {["Summary", "Notes", "Transcript"].map((tab, i) => (
            <button
              key={tab}
              className={`text-xs ${i === 0 ? "text-cyan-400" : "text-white/50"}`}
            >
              {tab}
            </button>
          ))}
          
          <div className="ml-auto flex items-center gap-0.5">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ height: isPlaying ? [4, 12, 4] : 4 }}
                transition={{ duration: 0.3, repeat: isPlaying ? Infinity : 0, delay: i * 0.05 }}
                className="w-0.5 bg-cyan-400/50 rounded-full"
                style={{ height: 4 }}
              />
            ))}
          </div>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="ml-2 p-1 rounded hover:bg-white/10 transition-colors"
          >
            {isPlaying ? <Pause className="w-3 h-3 text-white" /> : <Play className="w-3 h-3 text-white" />}
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <div className="space-y-2 max-h-[120px] overflow-hidden">
            {transcript.slice(0, currentLine + 1).map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-white/70 text-sm leading-relaxed"
              >
                {line}
              </motion.p>
            ))}
          </div>

          {/* Custom topic input */}
          <div className="flex items-center gap-2 mt-4">
            <input
              type="text"
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              placeholder="Enter topic for summary..."
              className="flex-1 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 text-xs outline-none"
            />
            <button
              onClick={handleGenerateSummary}
              disabled={isSpeaking}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 text-xs hover:bg-cyan-500/30 transition-colors disabled:opacity-50"
            >
              <Volume2 className="w-3 h-3" />
              {isSpeaking ? "Speaking..." : "Generate"}
            </button>
          </div>

          {/* AI Summary */}
          {aiSummary && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-white/80 text-xs"
            >
              {aiSummary}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
