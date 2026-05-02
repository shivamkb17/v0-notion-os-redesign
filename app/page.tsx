"use client"

import { useState } from "react"
import { BootAnimation } from "@/components/notion-os/boot-animation"
import { Navbar } from "@/components/notion-os/navbar"
import { HeroSection } from "@/components/notion-os/hero-section"
import { AgentsSection } from "@/components/notion-os/agents-section"
import { AISection } from "@/components/notion-os/ai-section"
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
      {!bootComplete && <BootAnimation onComplete={() => setBootComplete(true)} />}
      
      {bootComplete && (
        <>
          <AnimatedBackground />
          <CursorGlow />
          <Navbar />
          <main>
            <HeroSection />
            <AgentsSection />
            <AISection />
            <FeaturesSection />
            <SecondBrainSection />
            <TestimonialsSection />
            <CTASection />
          </main>
          <Footer />
          <VoiceTour />
        </>
      )}
    </div>
  )
}
