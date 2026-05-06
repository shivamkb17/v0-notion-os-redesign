"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Bot, 
  MessageSquare, 
  ListTodo, 
  FileText, 
  Zap, 
  Terminal,
  Send,
  ChevronRight,
  Circle,
  CheckCircle2,
  Loader2,
  Volume2,
  Sparkles,
  Shield,
  Workflow
} from "lucide-react"

interface Agent {
  id: string
  name: string
  description: string
  icon: React.ElementType
  color: string
  bgColor: string
}

const agents: Agent[] = [
  {
    id: "qa",
    name: "Q&A Agent",
    description: "Answers questions using your workspace knowledge",
    icon: MessageSquare,
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/20"
  },
  {
    id: "task",
    name: "Task Routing",
    description: "Assigns and prioritizes tasks automatically",
    icon: ListTodo,
    color: "text-purple-400",
    bgColor: "bg-purple-500/20"
  },
  {
    id: "reporting",
    name: "Reporting Agent",
    description: "Generates summaries and reports",
    icon: FileText,
    color: "text-amber-400",
    bgColor: "bg-amber-500/20"
  },
  {
    id: "onboarding",
    name: "Onboarding Buddy",
    description: "Guides new team members through setup",
    icon: Sparkles,
    color: "text-pink-400",
    bgColor: "bg-pink-500/20"
  },
  {
    id: "security",
    name: "Security Monitor",
    description: "Responds to alerts and threats",
    icon: Shield,
    color: "text-green-400",
    bgColor: "bg-green-500/20"
  },
  {
    id: "custom",
    name: "Custom Agent",
    description: "Build your own automation",
    icon: Zap,
    color: "text-blue-400",
    bgColor: "bg-blue-500/20"
  }
]

const exampleCommands = [
  "create onboarding agent",
  "summarize weekly updates",
  "automate support routing",
  "generate Q3 report",
  "triage product feedback"
]

const executionSteps = [
  { text: "Initializing agent...", duration: 600 },
  { text: "Scanning workspace...", duration: 800 },
  { text: "Connecting data sources...", duration: 700 },
  { text: "Generating workflow...", duration: 900 },
  { text: "Automation complete.", duration: 500 }
]

export function AgentCommandCenter() {
  const [command, setCommand] = useState("")
  const [isExecuting, setIsExecuting] = useState(false)
  const [executionLog, setExecutionLog] = useState<string[]>([])
  const [currentStep, setCurrentStep] = useState(-1)
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
  const [generatedTasks, setGeneratedTasks] = useState<string[]>([])
  const [isVoicePlaying, setIsVoicePlaying] = useState(false)
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Rotate placeholder commands
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex(prev => (prev + 1) % exampleCommands.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Execute command with AI
  const executeCommand = async () => {
    if (!command.trim() || isExecuting) return

    setIsExecuting(true)
    setExecutionLog([])
    setCurrentStep(-1)
    setGeneratedTasks([])

    // Run execution steps
    for (let i = 0; i < executionSteps.length; i++) {
      setCurrentStep(i)
      setExecutionLog(prev => [...prev, executionSteps[i].text])
      await new Promise(resolve => setTimeout(resolve, executionSteps[i].duration))
    }

    // Generate response via OpenRouter
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: `You are a Notion AI agent. The user issued this command: "${command}". Generate 4 specific task items that the agent would create. Return ONLY a JSON array of 4 short task strings, no explanation. Example: ["Task 1", "Task 2", "Task 3", "Task 4"]`
        }),
      })

      if (response.ok) {
        const data = await response.json()
        try {
          const tasks = JSON.parse(data.response)
          if (Array.isArray(tasks)) {
            setGeneratedTasks(tasks.slice(0, 4))
          }
        } catch {
          setGeneratedTasks([
            "Review and categorize incoming items",
            "Set up automated workflow triggers",
            "Connect relevant data sources",
            "Schedule recurring execution"
          ])
        }
      } else {
        setGeneratedTasks([
          "Review and categorize incoming items",
          "Set up automated workflow triggers", 
          "Connect relevant data sources",
          "Schedule recurring execution"
        ])
      }
    } catch {
      setGeneratedTasks([
        "Review and categorize incoming items",
        "Set up automated workflow triggers",
        "Connect relevant data sources",
        "Schedule recurring execution"
      ])
    }

    // Trigger voice response
    await triggerVoice(`Your ${command} agent is now active and running.`)
    
    setIsExecuting(false)
  }

  // ElevenLabs voice
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
        
        const audio = new Audio(audioUrl)
        audio.volume = 0.6
        audioRef.current = audio
        
        audio.onended = () => setIsVoicePlaying(false)
        audio.onerror = () => setIsVoicePlaying(false)
        
        await audio.play()
      } else {
        setIsVoicePlaying(false)
      }
    } catch {
      setIsVoicePlaying(false)
    }
  }

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[#0a1020] to-background" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
            <Circle className="w-2 h-2 fill-cyan-400 text-cyan-400 animate-pulse" />
            <span className="text-sm text-cyan-400 font-medium">AI Command Center</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Keep work moving <span className="text-cyan-400" style={{ textShadow: "0 0 30px rgba(34, 211, 238, 0.5)" }}>24/7</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Issue commands. Watch intelligent agents execute instantly.
          </p>
        </motion.div>

        {/* Main content - Split layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* LEFT: Agent list */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Status indicators */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Circle className="w-2 h-2 fill-green-400 text-green-400" />
                <span className="text-xs text-muted-foreground">3 Agents Active</span>
              </div>
              <div className="flex items-center gap-2">
                <Workflow className="w-3 h-3 text-cyan-400" />
                <span className="text-xs text-muted-foreground">5 Automations Running</span>
              </div>
            </div>

            {/* Agent grid */}
            <div className="grid grid-cols-2 gap-3">
              {agents.map((agent, index) => (
                <motion.button
                  key={agent.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  onClick={() => {
                    setSelectedAgent(agent)
                    setCommand(`create ${agent.name.toLowerCase()} workflow`)
                    inputRef.current?.focus()
                  }}
                  className={`group p-4 rounded-xl border transition-all text-left ${
                    selectedAgent?.id === agent.id 
                      ? "bg-white/10 border-cyan-500/50 shadow-lg shadow-cyan-500/10" 
                      : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg ${agent.bgColor} flex items-center justify-center mb-3`}>
                    <agent.icon className={`w-5 h-5 ${agent.color}`} />
                  </div>
                  <h4 className="font-medium text-foreground text-sm mb-1">{agent.name}</h4>
                  <p className="text-xs text-muted-foreground line-clamp-2">{agent.description}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Command interface */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col"
          >
            {/* Command bar */}
            <div className="relative mb-4">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-xl blur-lg opacity-50" />
              <div className="relative flex items-center gap-3 p-4 rounded-xl bg-[#0a0f1a] border border-white/10">
                <Terminal className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && executeCommand()}
                    placeholder={exampleCommands[placeholderIndex]}
                    className="w-full bg-transparent text-white font-mono text-sm placeholder-white/30 outline-none"
                    disabled={isExecuting}
                  />
                  <motion.span 
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-cyan-400"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  />
                </div>
                <button
                  onClick={executeCommand}
                  disabled={isExecuting || !command.trim()}
                  className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors disabled:opacity-50"
                >
                  {isExecuting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Execution panel */}
            <div className="flex-1 rounded-xl bg-[#0a0f1a]/80 border border-white/10 overflow-hidden">
              {/* Panel header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/20">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  </div>
                  <span className="text-xs text-white/40 font-mono ml-2">agent-execution</span>
                </div>
                <AnimatePresence>
                  {isVoicePlaying && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex items-center gap-1.5 text-cyan-400"
                    >
                      <Volume2 className="w-3 h-3" />
                      <span className="text-xs font-mono">Speaking</span>
                      <div className="flex gap-0.5">
                        {[0, 1, 2].map(i => (
                          <motion.div
                            key={i}
                            className="w-0.5 h-3 bg-cyan-400 rounded-full"
                            animate={{ scaleY: [0.3, 1, 0.3] }}
                            transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Panel content */}
              <div className="p-4 min-h-[280px]">
                {executionLog.length === 0 && !isExecuting ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-8">
                    <Bot className="w-12 h-12 text-white/20 mb-4" />
                    <p className="text-sm text-white/40 mb-2">Ready to execute</p>
                    <p className="text-xs text-white/30">Type a command or select an agent</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {/* Execution log */}
                    <AnimatePresence>
                      {executionLog.map((log, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex items-center gap-3"
                        >
                          {index < currentStep || !isExecuting ? (
                            <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                          ) : index === currentStep ? (
                            <Loader2 className="w-4 h-4 text-cyan-400 animate-spin flex-shrink-0" />
                          ) : (
                            <Circle className="w-4 h-4 text-white/30 flex-shrink-0" />
                          )}
                          <span className={`text-sm font-mono ${
                            index <= currentStep ? "text-white/80" : "text-white/40"
                          }`}>
                            {log}
                          </span>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {/* Generated tasks */}
                    <AnimatePresence>
                      {generatedTasks.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.2 }}
                          className="mt-6 pt-4 border-t border-white/10"
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <Sparkles className="w-4 h-4 text-cyan-400" />
                            <span className="text-xs text-cyan-400 font-medium">Generated Workflow</span>
                          </div>
                          <div className="space-y-2">
                            {generatedTasks.map((task, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.1 * index }}
                                className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/5"
                              >
                                <div className="w-5 h-5 rounded bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <ChevronRight className="w-3 h-3 text-cyan-400" />
                                </div>
                                <span className="text-sm text-white/80">{task}</span>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom status */}
            <div className="flex items-center justify-between mt-4 px-1">
              <div className="flex items-center gap-2">
                <Circle className="w-1.5 h-1.5 fill-green-400 text-green-400" />
                <span className="text-xs text-muted-foreground">Workspace Synced</span>
              </div>
              <span className="text-xs text-muted-foreground font-mono">v2.4.1</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
