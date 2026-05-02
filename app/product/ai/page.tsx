"use client"

import { motion } from "framer-motion"
import { Sparkles, Bot, Search, Mic, Shield, Zap, Brain, MessageSquare, FileText, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/notion-os/navbar"
import { Footer } from "@/components/notion-os/footer"

const capabilities = [
  {
    icon: Bot,
    title: "Notion Agent",
    description: "Does work for you. Completes complex, multi-step tasks using context from Notion, your connected apps, and the web."
  },
  {
    icon: Sparkles,
    title: "Custom Agents",
    description: "AI agents handle repetitive tasks autonomously, so your team doesn't have to."
  },
  {
    icon: Mic,
    title: "AI Meeting Notes",
    description: "Automate your meeting notes and follow-ups, no bot needed."
  },
  {
    icon: Search,
    title: "Enterprise Search",
    description: "Search across connected apps like Slack, GitHub & more—in seconds."
  }
]

const securityFeatures = [
  { title: "No training on your data", description: "We have contractual agreements prohibiting use of customer data to train models." },
  { title: "SOC 2 Type 2 & ISO 27001", description: "Committed to the highest requirements of information security." },
  { title: "GDPR & CCPA", description: "Privacy program mapped to global privacy regulations." },
  { title: "Secure encryption", description: "Data encrypted in-transit using TLS 1.2 or greater." },
  { title: "Zero data retention", description: "No data stored with LLM providers for Enterprise." },
  { title: "HIPAA compliant", description: "Enables HIPAA compliance for Enterprise plans." }
]

const useCases = [
  "Onboard a new hire",
  "Go from brainstorm to roadmap",
  "Automate weekly reporting",
  "Triage product feedback",
  "Resolve support tickets in Slack",
  "Respond to security alerts faster"
]

export default function AIProductPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24">
        {/* Hero */}
        <section className="py-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
          
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Notion AI</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance"
            >
              Meet your <span className="text-primary text-glow">AI team</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10"
            >
              AI that works where your team works. Agents, search, meeting notes, and more—all built into Notion.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent glow-primary">
                Try for free
              </Button>
              <Button size="lg" variant="outline" className="glass-card border-primary/30">
                Contact sales
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Quote */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.blockquote
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-8"
            >
              <p className="text-xl text-foreground italic mb-4">
                &ldquo;If it&apos;s something that&apos;s repetitive, we have a Notion Agent for it.&rdquo;
              </p>
              <p className="text-muted-foreground">Ben Levick, Head of AI & Operations, Ramp</p>
            </motion.blockquote>
          </div>
        </section>

        {/* Capabilities */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-12"
            >
              AI that works where your team works
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-6">
              {capabilities.map((cap, index) => (
                <motion.div
                  key={cap.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-xl p-6"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <cap.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{cap.title}</h3>
                  <p className="text-muted-foreground">{cap.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-20 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-12"
            >
              See what Notion AI can do
            </motion.h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {useCases.map((useCase, index) => (
                <motion.div
                  key={useCase}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="glass-card rounded-xl p-5 cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span className="text-foreground font-medium">{useCase}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Security */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Trusted by enterprise
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Security and privacy built into every layer of Notion AI.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {securityFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-xl p-5"
                >
                  <h3 className="text-foreground font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-12 glow-primary"
            >
              <h2 className="text-3xl font-bold text-foreground mb-4">
                AI that works where your team works
              </h2>
              <p className="text-muted-foreground mb-8">Try Notion AI for free today.</p>
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent">
                Get started free
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
