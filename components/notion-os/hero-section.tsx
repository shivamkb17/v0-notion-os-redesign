"use client"

import { motion } from "framer-motion"
import { ArrowRight, Play, Mic, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const trustedLogos = [
  "OpenAI", "Figma", "Toyota", "Nike", "Pixar", "Headspace"
]

export function HeroSection({ onVoiceTour }: { onVoiceTour?: () => void }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated background */}
      <div className="absolute inset-0 animated-gradient" />
      
      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px"
        }}
      />

      {/* Floating orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl"
        animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-accent/10 blur-3xl"
        animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
        >
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm text-muted-foreground">Trusted by 98% of the Forbes Cloud 100</span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance"
        >
          <span className="text-glow">The AI workspace</span>
          <br />
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            that works for you.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty"
        >
          Your connected workspace where AI agents, docs, projects, and teams come together. 
          One tool to run your entire company.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all glow-primary text-base px-8"
          >
            Get Notion free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="glass-card border-primary/30 hover:bg-primary/10 text-base px-8"
          >
            <Play className="mr-2 h-5 w-5" />
            Watch demo
          </Button>
          {onVoiceTour && (
            <Button
              size="lg"
              variant="ghost"
              onClick={onVoiceTour}
              className="text-primary hover:bg-primary/10"
            >
              <Mic className="mr-2 h-5 w-5" />
              Start Voice Tour
            </Button>
          )}
        </motion.div>

        {/* Trusted by logos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-8 text-muted-foreground"
        >
          {trustedLogos.map((logo, index) => (
            <motion.div
              key={logo}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.6, y: 0 }}
              transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
              whileHover={{ opacity: 1 }}
              className="text-sm font-medium tracking-wider"
            >
              {logo}
            </motion.div>
          ))}
        </motion.div>

        {/* Hero Video */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 relative"
        >
          <div className="glass-card rounded-2xl p-1 glow-primary max-w-5xl mx-auto">
            <div className="bg-card rounded-xl overflow-hidden relative">
              {/* Video glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-xl blur-xl opacity-50" />
              <div className="relative aspect-video">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover rounded-xl"
                  poster="/video-poster.jpg"
                >
                  <source 
                    src="https://videos.ctfassets.net/spoqsaf9291f/1EL7UZIXfcqngxsNSbL8tR/a35c698ae3499345013792fe78804a38/web-homepage-hero-1920x1200_final.mp4" 
                    type="video/mp4" 
                  />
                  Your browser does not support the video tag.
                </video>
                {/* Video overlay gradient for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent pointer-events-none rounded-xl" />
              </div>
            </div>
          </div>
          
          {/* Floating interaction hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-sm text-muted-foreground"
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Sparkles className="h-4 w-4 text-primary" />
            </motion.div>
            <span>See Notion in action</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
