"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
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
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden pt-24 pb-8">
      
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

        {/* Hero Video */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="relative max-w-5xl mx-auto w-full"
        >
          {/* Video glow effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl opacity-50" />
          
          {/* Video container */}
          <div className="relative rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-black/40">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto"
            >
              <source 
                src="https://videos.ctfassets.net/spoqsaf9291f/1EL7UZIXfcqngxsNSbL8tR/a35c698ae3499345013792fe78804a38/web-homepage-hero-1920x1200_final.mp4" 
                type="video/mp4" 
              />
              Your browser does not support the video tag.
            </video>
            
            {/* Subtle overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1339]/30 via-transparent to-transparent pointer-events-none" />
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
