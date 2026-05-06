"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BootScreen } from "@/components/notion-os/boot-screen"
import { Navbar } from "@/components/notion-os/navbar"
import { HeroSection } from "@/components/notion-os/hero-section"
import { AgentCommandCenter } from "@/components/notion-os/agent-command-center"
import { AIAssistantsSection } from "@/components/notion-os/ai-assistants-section"

import { FeaturesSection } from "@/components/notion-os/features-section"
import { SecondBrainSection } from "@/components/notion-os/second-brain-section"
import { TestimonialsSection } from "@/components/notion-os/testimonials-section"
import { CTASection } from "@/components/notion-os/cta-section"
import { Footer } from "@/components/notion-os/footer"
import { VoiceTour } from "@/components/notion-os/voice-tour"
import { CursorGlow } from "@/components/notion-os/cursor-glow"
import { AnimatedBackground } from "@/components/notion-os/animated-background"

export default function HomePage() {
  const [bootComplete, setBootComplete] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <BootScreen onComplete={() => setBootComplete(true)} />
      
      <AnimatePresence>
        {bootComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <AnimatedBackground />
            <CursorGlow />
            <Navbar />
            <main>
              <HeroSection />
              <AgentCommandCenter />
              <AIAssistantsSection />
              <FeaturesSection />
              <SecondBrainSection />
              <TestimonialsSection />
              <CTASection />
            </main>
            <Footer />
            <VoiceTour />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
