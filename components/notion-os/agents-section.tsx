"use client"

import { motion } from "framer-motion"
import { Bot, MessageSquare, ListTodo, FileText, Zap, ArrowRight } from "lucide-react"
import { useState } from "react"

const agents = [
  {
    id: "qa",
    name: "Q&A agents",
    description: "Answers questions instantly using knowledge you already have.",
    icon: MessageSquare,
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: "task",
    name: "Task routing agents",
    description: "Assigns, prioritizes, and routes tasks on its own.",
    icon: ListTodo,
    color: "from-purple-500 to-pink-500"
  },
  {
    id: "reporting",
    name: "Reporting agents",
    description: "Summarizes, writes, and sends reports for you.",
    icon: FileText,
    color: "from-amber-500 to-orange-500"
  },
  {
    id: "custom",
    name: "Create your own",
    description: "Make a Custom Agent for any work that repeats.",
    icon: Zap,
    color: "from-green-500 to-emerald-500"
  }
]

const useCases = [
  "Triage product feedback",
  "Resolve support tickets in Slack",
  "Respond to security alerts faster",
  "Automate weekly reporting",
  "Create your own Custom Agent"
]

export function AgentsSection() {
  const [activeAgent, setActiveAgent] = useState(agents[0])

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Keep work moving <span className="text-primary text-glow">24/7.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            AI agents that work autonomously, so your team can focus on what matters.
          </p>
        </motion.div>

        {/* Agent cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {agents.map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setActiveAgent(agent)}
              className={`glass-card rounded-xl p-6 cursor-pointer transition-all hover:scale-105 ${
                activeAgent.id === agent.id ? "ring-2 ring-primary glow-primary" : ""
              }`}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${agent.color} flex items-center justify-center mb-4`}>
                <agent.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{agent.name}</h3>
              <p className="text-sm text-muted-foreground">{agent.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Use cases */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass-card rounded-2xl p-8"
        >
          <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            See what Custom Agents can do
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 hover:bg-primary/10 transition-colors cursor-pointer group"
              >
                <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
                <span className="text-sm text-foreground">{useCase}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
