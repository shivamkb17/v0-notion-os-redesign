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
  FileText,
  Users,
  Calendar,
  MessageSquare,
  Volume2,
  Pause
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
      
      {/* Animated grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

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
            className="flex items-center justify-center gap-2 mb-4"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-cyan-400"
            />
            <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">
              AI Assistants Active
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ask your on-demand assistants.
          </h2>
          
          {/* Animated underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-0.5 w-48 mx-auto bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          />
        </motion.div>

        {/* Connection Flow Layer */}
        <ConnectionFlowLayer />

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Row 1 */}
          <div className="lg:col-span-2 grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Notion Agent Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2"
            >
              <NotionAgentCard />
            </motion.div>

            {/* Status Update Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-3"
            >
              <StatusUpdateCard />
            </motion.div>
          </div>

          {/* Row 2 */}
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

// Connection Flow Layer with animated particles
function ConnectionFlowLayer() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Animated connection lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.15 }}>
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="1" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Horizontal lines */}
        <motion.line
          x1="20%" y1="40%" x2="80%" y2="40%"
          stroke="url(#lineGradient)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        <motion.line
          x1="30%" y1="60%" x2="70%" y2="60%"
          stroke="url(#lineGradient)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }}
        />
      </svg>

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-cyan-400"
          style={{
            left: `${15 + i * 10}%`,
            top: `${30 + (i % 3) * 20}%`,
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, -20, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  )
}

// Notion Agent Card
function NotionAgentCard() {
  const [isTyping, setIsTyping] = useState(false)
  const [response, setResponse] = useState("")
  const [showOptions, setShowOptions] = useState(true)

  const options = [
    { icon: "Aa", text: "Translate this page" },
    { icon: "Q", text: "Analyze for insights" },
    { icon: "O", text: "Create a task tracker" },
  ]

  const handleOptionClick = async (option: string) => {
    setShowOptions(false)
    setIsTyping(true)
    setResponse("")

    const responseText = option === "Translate this page" 
      ? "I'll translate this page to your preferred language. Detecting content..."
      : option === "Analyze for insights"
      ? "Scanning document for key insights and patterns..."
      : "Creating a new task tracker with your preferences..."

    // Typewriter effect
    for (let i = 0; i <= responseText.length; i++) {
      await new Promise(r => setTimeout(r, 25))
      setResponse(responseText.slice(0, i))
    }
    setIsTyping(false)
  }

  return (
    <div className="h-full glass-card rounded-2xl border border-white/10 overflow-hidden group hover:border-cyan-500/30 transition-colors">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono text-cyan-400">Notion Agent</span>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center gap-1"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <span className="text-[10px] text-green-400">LIVE</span>
          </motion.div>
        </div>
        <h3 className="text-xl font-semibold text-white mb-1">
          You assign the tasks.
        </h3>
        <p className="text-white/60 text-sm">Notion Agent does the work.</p>
        <Button variant="ghost" size="sm" className="mt-3 p-0 h-auto text-cyan-400 hover:text-cyan-300">
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>

      {/* AI Interface Panel */}
      <div className="mx-4 mb-4 rounded-xl bg-gradient-to-br from-amber-400/90 to-orange-400/90 p-4 relative overflow-hidden">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
        </div>
        
        <p className="text-white font-medium mb-4">How can I help you today?</p>

        <AnimatePresence mode="wait">
          {showOptions ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-2"
            >
              {options.map((opt, i) => (
                <motion.button
                  key={opt.text}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => handleOptionClick(opt.text)}
                  className="flex items-center gap-2 w-full text-left text-white/90 hover:text-white text-sm py-1 transition-colors"
                >
                  <span className="w-5 h-5 rounded bg-white/20 flex items-center justify-center text-[10px] font-mono">
                    {opt.icon}
                  </span>
                  {opt.text}
                </motion.button>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-white/90 text-sm"
            >
              {response}
              {isTyping && (
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="inline-block w-2 h-4 bg-white ml-1"
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// Status Update Card
function StatusUpdateCard() {
  const [currentStep, setCurrentStep] = useState(0)
  const steps = [
    "Draft my weekly update in Weekly status @Today with updates from the current sprint",
    "I'll help you draft your standard weekly update. Let me fill it in with all the relevant progress from Task tracker.",
    "Updated page: Weekly status @Today",
    "Updated 4 pages",
    "You should be all set now!"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % steps.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-full glass-card rounded-2xl border border-white/10 overflow-hidden group hover:border-cyan-500/30 transition-colors">
      <div className="p-4 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="text-white/80 text-sm">Status update</span>
          <motion.div
            animate={{ rotate: [0, 180, 360] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="w-4 h-4 rounded-full border border-cyan-400/50"
          />
        </div>
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 text-[10px] font-mono"
          >
            SYNCED
          </motion.div>
        </div>
      </div>

      <div className="p-6">
        {/* Request bubble */}
        <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg p-3 mb-4 border border-cyan-500/20">
          <p className="text-white/90 text-sm leading-relaxed">
            Draft my weekly update in <span className="text-cyan-400">Weekly status @Today</span> with updates from the current sprint
          </p>
        </div>

        {/* AI Response */}
        <div className="space-y-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-white/70 text-sm"
            >
              {currentStep === 0 && (
                <p>I&apos;ll help you draft your standard weekly update. Let me fill it in with all the relevant progress from <span className="text-purple-400">Task tracker</span>.</p>
              )}
              {currentStep === 1 && (
                <div className="flex items-center gap-2 text-green-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Updated page: Weekly status @Today</span>
                </div>
              )}
              {currentStep === 2 && (
                <div className="flex items-center gap-2 text-cyan-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Updated 4 pages</span>
                </div>
              )}
              {currentStep >= 3 && (
                <p className="text-green-400 font-medium">You should be all set now!</p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/10">
          <button className="flex items-center gap-1 text-white/50 hover:text-white/80 text-xs transition-colors">
            <span>Undo</span>
          </button>
        </div>
      </div>

      {/* Character icon */}
      <div className="absolute bottom-4 right-4">
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center"
        >
          <span className="text-2xl">🏗️</span>
        </motion.div>
      </div>
    </div>
  )
}

// Enterprise Search Card
function EnterpriseSearchCard() {
  const [isSearching, setIsSearching] = useState(false)
  const [activeApps, setActiveApps] = useState<number[]>([])
  const [searchResults, setSearchResults] = useState<string[]>([])

  const results = [
    "Dynamic pricing automation: AI-powered rate suggestions",
    "Multi-property calendar sync: Unified management across platforms",
    "Guest communication templates: Customizable workflows"
  ]

  useEffect(() => {
    // Simulate continuous searching
    const interval = setInterval(() => {
      setIsSearching(true)
      setActiveApps([])
      setSearchResults([])

      // Pulse through apps
      connectedApps.forEach((_, i) => {
        setTimeout(() => {
          setActiveApps(prev => [...prev, i])
        }, i * 200)
      })

      // Show results
      setTimeout(() => {
        results.forEach((_, i) => {
          setTimeout(() => {
            setSearchResults(prev => [...prev, results[i]])
          }, i * 300)
        })
        setIsSearching(false)
      }, 1500)
    }, 6000)

    // Initial run
    setTimeout(() => {
      setIsSearching(true)
      connectedApps.forEach((_, i) => {
        setTimeout(() => setActiveApps(prev => [...prev, i]), i * 200)
      })
      setTimeout(() => {
        results.forEach((_, i) => {
          setTimeout(() => setSearchResults(prev => [...prev, results[i]]), i * 300)
        })
        setIsSearching(false)
      }, 1500)
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-full glass-card rounded-2xl border border-white/10 overflow-hidden group hover:border-cyan-500/30 transition-colors">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono text-cyan-400">Enterprise Search</span>
          <span className="text-[10px] text-white/40">{connectedApps.length} sources synced</span>
        </div>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">One search for everything.</h3>
          <Button variant="ghost" size="sm" className="p-0 h-auto text-cyan-400 hover:text-cyan-300">
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Search Interface */}
      <div className="mx-4 mb-4 rounded-xl bg-gradient-to-br from-rose-400/90 to-red-400/90 p-4">
        {/* Search bar */}
        <div className="bg-white/20 rounded-lg px-3 py-2 mb-4 flex items-center gap-2">
          <Search className="w-4 h-4 text-white/70" />
          <span className="text-white/90 text-sm">top customer requests this quarter</span>
          {isSearching && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="ml-auto w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
            />
          )}
        </div>

        {/* Results count */}
        <div className="flex items-center gap-2 mb-3 text-white/80 text-xs">
          <span>99+ results</span>
          <div className="flex gap-1">
            {connectedApps.slice(0, 4).map((app, i) => (
              <motion.div
                key={app.name}
                animate={{ 
                  scale: activeApps.includes(i) ? [1, 1.2, 1] : 1,
                  opacity: activeApps.includes(i) ? 1 : 0.5
                }}
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: app.color }}
              />
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="space-y-2">
          <p className="text-white font-medium text-sm">Top 10 Feature Requests</p>
          <p className="text-white/70 text-xs">Host Tools & Listing Management (highest priority)</p>
          
          <div className="space-y-1.5 mt-3">
            {searchResults.map((result, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-white/80 text-xs flex items-start gap-2"
              >
                <span className="text-white/50">{i + 1}.</span>
                <span>{result}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Connected Apps */}
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/20">
          {connectedApps.map((app, i) => (
            <motion.div
              key={app.name}
              animate={{ 
                scale: activeApps.includes(i) ? [1, 1.1, 1] : 1
              }}
              transition={{ duration: 0.3 }}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
              style={{ backgroundColor: app.color }}
            >
              {app.icon}
            </motion.div>
          ))}
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white/60">+</div>
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
  const audioRef = useRef<HTMLAudioElement>(null)

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

  const handleVoicePlay = async () => {
    if (isSpeaking) return
    
    setIsSpeaking(true)
    try {
      const response = await fetch("/api/voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          text: "Meeting summary: Joyce discussed landing page improvements. Key action items include team review tomorrow and launch next week." 
        }),
      })
      
      if (response.ok) {
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        if (audioRef.current) {
          audioRef.current.src = url
          audioRef.current.volume = 0.7
          await audioRef.current.play()
        }
      }
    } catch (error) {
      // Silent fail
    }
  }

  return (
    <div className="h-full glass-card rounded-2xl border border-white/10 overflow-hidden group hover:border-cyan-500/30 transition-colors">
      <audio ref={audioRef} onEnded={() => setIsSpeaking(false)} />
      
      {/* Header */}
      <div className="p-6 pb-4">
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
          <Button variant="ghost" size="sm" className="p-0 h-auto text-cyan-400 hover:text-cyan-300">
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Meeting Interface */}
      <div className="mx-4 mb-4 rounded-xl bg-white/5 border border-white/10 overflow-hidden">
        {/* Meeting header */}
        <div className="p-3 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span className="text-white text-sm font-medium">Joyce & Sam weekly 1:1</span>
          </div>
          <span className="text-white/50 text-xs">June 2</span>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-4 px-3 py-2 border-b border-white/10">
          {["Summary", "Notes", "Transcript"].map((tab, i) => (
            <button
              key={tab}
              className={`text-xs ${i === 0 ? "text-cyan-400" : "text-white/50"}`}
            >
              {tab}
            </button>
          ))}
          
          {/* Audio waveform */}
          <div className="ml-auto flex items-center gap-0.5">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  height: isPlaying ? [4, 12, 4] : 4 
                }}
                transition={{ 
                  duration: 0.3, 
                  repeat: isPlaying ? Infinity : 0,
                  delay: i * 0.05 
                }}
                className="w-0.5 bg-cyan-400/50 rounded-full"
                style={{ height: 4 }}
              />
            ))}
          </div>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="ml-2 p-1 rounded hover:bg-white/10 transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-3 h-3 text-white" />
            ) : (
              <Play className="w-3 h-3 text-white" />
            )}
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <p className="text-cyan-400 text-sm font-medium">Current progress</p>
          
          <div className="space-y-2">
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
            
            {/* Typing indicator */}
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex items-center gap-1"
            >
              <div className="w-1 h-1 rounded-full bg-cyan-400" />
              <div className="w-1 h-1 rounded-full bg-cyan-400" />
              <div className="w-1 h-1 rounded-full bg-cyan-400" />
            </motion.div>
          </div>

          {/* Voice playback button */}
          <button
            onClick={handleVoicePlay}
            disabled={isSpeaking}
            className="mt-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 text-xs hover:bg-cyan-500/30 transition-colors disabled:opacity-50"
          >
            <Volume2 className="w-3 h-3" />
            {isSpeaking ? "Speaking..." : "Play Summary"}
          </button>
        </div>

        {/* Participants */}
        <div className="absolute bottom-20 right-6 flex -space-x-2">
          {participants.map((p, i) => (
            <motion.div
              key={p.name}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              className="w-8 h-8 rounded-full border-2 border-[#0a1628] flex items-center justify-center text-white text-xs font-bold"
              style={{ backgroundColor: p.color }}
            >
              {p.name[0]}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
