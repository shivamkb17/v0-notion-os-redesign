"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { AIOverviewButton } from "./ai-overview-button"

const nodes = [
  { id: 1, x: 20, y: 30, label: "Ideas", size: 40 },
  { id: 2, x: 50, y: 15, label: "Notes", size: 50 },
  { id: 3, x: 80, y: 35, label: "Tasks", size: 45 },
  { id: 4, x: 35, y: 60, label: "Projects", size: 55 },
  { id: 5, x: 65, y: 55, label: "Docs", size: 48 },
  { id: 6, x: 50, y: 80, label: "Wiki", size: 42 },
  { id: 7, x: 15, y: 75, label: "Goals", size: 38 },
  { id: 8, x: 85, y: 70, label: "Plans", size: 44 },
]

const connections = [
  [1, 2], [2, 3], [1, 4], [2, 5], [3, 5],
  [4, 5], [4, 6], [5, 6], [4, 7], [5, 8], [6, 7], [6, 8]
]

export function SecondBrainSection() {
  const [activeNode, setActiveNode] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative py-24 overflow-hidden">
      {/* AI Overview Button */}
      <AIOverviewButton
        sectionId="second-brain"
        sectionTitle="Your Second Brain"
        sectionContext="This section explains how Notion connects all your ideas, notes, tasks, and projects in one intelligent workspace. Everything is linked, searchable, and powered by AI. Key benefits include connected knowledge, AI that understands context, and instant search across all content."
        position="top-right"
        allowQuestions={true}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Your <span className="text-primary text-glow">second brain.</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6 text-pretty">
              Notion connects your ideas, notes, tasks, and projects in one intelligent workspace. 
              Everything is linked, searchable, and powered by AI.
            </p>
            <ul className="space-y-4">
              {["All your knowledge, connected", "AI that understands context", "Find anything instantly"].map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-foreground">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Neural network visualization */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative aspect-square max-w-md mx-auto w-full"
          >
            <div className="glass-card rounded-2xl p-4 h-full">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Connection lines */}
                {mounted && connections.map(([from, to], index) => {
                  const fromNode = nodes.find(n => n.id === from)!
                  const toNode = nodes.find(n => n.id === to)!
                  const isActive = activeNode === from || activeNode === to
                  return (
                    <motion.line
                      key={`${from}-${to}`}
                      x1={fromNode.x}
                      y1={fromNode.y}
                      x2={toNode.x}
                      y2={toNode.y}
                      stroke={isActive ? "oklch(0.7 0.15 260)" : "oklch(0.3 0.05 260)"}
                      strokeWidth={isActive ? 0.5 : 0.3}
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.05 }}
                    />
                  )
                })}

                {/* Nodes */}
                {nodes.map((node, index) => (
                  <motion.g
                    key={node.id}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    onMouseEnter={() => setActiveNode(node.id)}
                    onMouseLeave={() => setActiveNode(null)}
                    className="cursor-pointer"
                  >
                    <motion.circle
                      cx={node.x}
                      cy={node.y}
                      r={node.size / 10}
                      fill={activeNode === node.id ? "oklch(0.7 0.15 260)" : "oklch(0.2 0.03 260)"}
                      stroke="oklch(0.5 0.1 260)"
                      strokeWidth={0.3}
                      animate={activeNode === node.id ? { scale: 1.2 } : { scale: 1 }}
                    />
                    <text
                      x={node.x}
                      y={node.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={activeNode === node.id ? "white" : "oklch(0.7 0.02 260)"}
                      fontSize={2.5}
                      fontWeight={500}
                    >
                      {node.label}
                    </text>
                  </motion.g>
                ))}
              </svg>
            </div>

            {/* Floating particles */}
            {mounted && [...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-primary/50"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
