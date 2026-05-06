"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Sparkles, Bot, Search, Mic, Shield, Zap, Brain, MessageSquare, FileText, CheckCircle2, Lock, Eye, Server, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/notion-os/navbar"
import { Footer } from "@/components/notion-os/footer"
import { PageAIAssistant } from "@/components/notion-os/page-ai-assistant"
import { AIOverviewButton } from "@/components/notion-os/ai-overview-button"

const capabilities = [
  {
    icon: Bot,
    title: "Notion Agent",
    description: "Does work for you. Completes complex, multi-step tasks using context from Notion, your connected apps, and the web.",
    gradient: "from-cyan-400 to-blue-500",
    detail: "Assign tasks like drafting status updates, triaging feedback, or onboarding new hires."
  },
  {
    icon: Sparkles,
    title: "Custom Agents",
    description: "AI agents handle repetitive tasks autonomously, so your team doesn't have to.",
    gradient: "from-purple-400 to-purple-600",
    detail: "Build agents tailored to your workflows with no code required."
  },
  {
    icon: Mic,
    title: "AI Meeting Notes",
    description: "Automate your meeting notes and follow-ups, no bot needed.",
    gradient: "from-pink-400 to-pink-600",
    detail: "Transcription, summaries, and action items generated automatically."
  },
  {
    icon: Search,
    title: "Enterprise Search",
    description: "Search across connected apps like Slack, GitHub & more -- in seconds.",
    gradient: "from-amber-400 to-amber-600",
    detail: "One search bar for your entire company's knowledge."
  }
]

const securityFeatures = [
  { icon: Eye, title: "No training on your data", description: "Contractual agreements prohibiting use of customer data to train models." },
  { icon: Shield, title: "SOC 2 Type 2 & ISO 27001", description: "Committed to the highest requirements of information security." },
  { icon: Lock, title: "GDPR & CCPA", description: "Privacy program mapped to global privacy regulations." },
  { icon: Server, title: "Secure encryption", description: "Data encrypted in-transit using TLS 1.2 or greater." },
  { icon: Zap, title: "Zero data retention", description: "No data stored with LLM providers for Enterprise." },
  { icon: FileText, title: "HIPAA compliant", description: "Enables HIPAA compliance for Enterprise plans." }
]

const useCases = [
  { title: "Onboard a new hire", description: "Automate onboarding checklists and introductions" },
  { title: "Go from brainstorm to roadmap", description: "Turn ideas into structured project plans" },
  { title: "Automate weekly reporting", description: "Generate status updates from project data" },
  { title: "Triage product feedback", description: "Categorize and prioritize user requests" },
  { title: "Resolve support tickets in Slack", description: "Answer questions using your knowledge base" },
  { title: "Respond to security alerts faster", description: "Route and escalate incidents automatically" }
]

export default function AIProductPage() {
  const [activeCapability, setActiveCapability] = useState(0)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24">
        {/* Hero */}
        <section className="relative py-24 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#10103a] to-background" />
          <div className="absolute inset-0 opacity-[0.04]">
            <div className="absolute inset-0" style={{
              backgroundImage: "radial-gradient(rgba(168, 85, 247, 0.4) 1px, transparent 1px)",
              backgroundSize: "32px 32px"
            }} />
          </div>
          {/* Central glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-500/10 rounded-full blur-[120px]" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/5 mb-8"
            >
              <Sparkles className="h-4 w-4 text-purple-400" />
              <span className="text-sm text-purple-300">Notion AI</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 text-balance"
            >
              Meet your{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">AI team</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              AI that works where your team works. Agents, search, meeting notes, and more -- all built into Notion.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white shadow-lg shadow-purple-500/20">
                Try for free
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button size="lg" className="bg-white/10 hover:bg-white/15 text-white border-0">
                Contact sales
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Quote */}
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="relative rounded-2xl p-[1px] bg-gradient-to-r from-purple-500/30 to-pink-500/30"
            >
              <div className="rounded-2xl bg-[#0a0a1a] px-10 py-8">
                <p className="text-lg text-white/90 italic mb-4 leading-relaxed">
                  &ldquo;If it&apos;s something that&apos;s repetitive, we have a Notion Agent for it.&rdquo;
                </p>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                    <span className="text-xs font-bold text-white">B</span>
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-white font-medium">Ben Levick</p>
                    <p className="text-xs text-white/40">Head of AI & Operations, Ramp</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Capabilities - Interactive */}
        <section className="relative py-24">
          <AIOverviewButton
            sectionId="ai-capabilities"
            sectionTitle="AI Capabilities"
            sectionContext="Notion AI includes 4 key capabilities: Notion Agent (does multi-step tasks), Custom Agents (automate repetitive work), AI Meeting Notes (automatic transcription and summaries), and Enterprise Search (search across Slack, GitHub, and more)."
            position="top-right"
            allowQuestions={true}
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-white text-center mb-4"
            >
              AI that works where your team works
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-white/40 text-center mb-16 max-w-lg mx-auto"
            >
              Four powerful AI systems, deeply integrated into your workspace.
            </motion.p>

            <div className="grid lg:grid-cols-5 gap-8">
              {/* Left nav */}
              <div className="lg:col-span-2 space-y-3">
                {capabilities.map((cap, i) => (
                  <motion.button
                    key={cap.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => setActiveCapability(i)}
                    className={`w-full text-left px-5 py-4 rounded-xl transition-all flex items-center gap-4 ${
                      activeCapability === i
                        ? "bg-white/10 border border-white/15"
                        : "bg-white/[0.02] border border-transparent hover:bg-white/5"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${cap.gradient} flex items-center justify-center flex-shrink-0`}>
                      <cap.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{cap.title}</h3>
                      <p className="text-xs text-white/40 mt-0.5">{cap.description.slice(0, 50)}...</p>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Right detail */}
              <div className="lg:col-span-3">
                <motion.div
                  key={activeCapability}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl p-[1px] bg-gradient-to-br from-white/10 to-white/5"
                >
                  <div className="rounded-2xl bg-[#0a0a1a] p-8">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${capabilities[activeCapability].gradient} flex items-center justify-center mb-6`}>
                      {(() => { const Icon = capabilities[activeCapability].icon; return <Icon className="h-7 w-7 text-white" /> })()}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{capabilities[activeCapability].title}</h3>
                    <p className="text-white/60 mb-4 leading-relaxed">{capabilities[activeCapability].description}</p>
                    <p className="text-white/40 text-sm leading-relaxed">{capabilities[activeCapability].detail}</p>
                    <Button className="mt-6 bg-white/10 hover:bg-white/15 text-white border-0">
                      Learn more <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="relative py-24">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/[0.03] to-transparent" />
          <AIOverviewButton
            sectionId="ai-usecases"
            sectionTitle="AI Use Cases"
            sectionContext="Notion AI can: onboard new hires, turn brainstorms into roadmaps, automate weekly reporting, triage product feedback, resolve support tickets via Slack, and respond to security alerts. Each use case demonstrates autonomous agent capabilities."
            position="top-right"
            allowQuestions={false}
          />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-white text-center mb-4"
            >
              See what Notion AI can do
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-white/40 text-center mb-16 max-w-lg mx-auto"
            >
              Real workflows, automated end-to-end.
            </motion.p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {useCases.map((uc, i) => (
                <motion.div
                  key={uc.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -3, backgroundColor: "rgba(255,255,255,0.05)" }}
                  className="rounded-xl border border-white/10 bg-white/[0.02] p-5 cursor-pointer transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-white font-medium">{uc.title}</span>
                      <p className="text-xs text-white/40 mt-1">{uc.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Security */}
        <section className="relative py-24">
          <AIOverviewButton
            sectionId="ai-security"
            sectionTitle="Enterprise Security"
            sectionContext="Notion AI security includes: no training on customer data, SOC 2 Type 2 & ISO 27001 compliance, GDPR & CCPA privacy, TLS 1.2+ encryption, zero data retention with LLM providers for Enterprise, and HIPAA compliance for Enterprise plans."
            position="top-right"
            allowQuestions={true}
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center mx-auto mb-6">
                <Shield className="h-7 w-7 text-white" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Trusted by enterprise
              </h2>
              <p className="text-white/40 max-w-lg mx-auto">
                Security and privacy built into every layer of Notion AI.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {securityFeatures.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-xl border border-white/10 bg-white/[0.02] p-5"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="h-4 w-4 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{feature.title}</h3>
                      <p className="text-xs text-white/40 mt-1">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-2xl p-[1px] bg-gradient-to-r from-purple-500/50 via-pink-500/50 to-cyan-500/50"
            >
              <div className="rounded-2xl bg-[#0a0a1a] px-10 py-14">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  AI that works where your team works
                </h2>
                <p className="text-white/40 mb-8">Try Notion AI for free today.</p>
                <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white shadow-lg shadow-purple-500/20">
                  Get started free
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />

      <PageAIAssistant
        pageName="Notion AI"
        accentColor="purple"
        pageContext="Notion AI product page. Features: Notion Agent (multi-step autonomous tasks), Custom Agents (automate repetitive work, $10/1000 credits), AI Meeting Notes (transcription, summaries, action items, no bot needed), Enterprise Search (search Slack, GitHub, more). Security: no data training, SOC 2, ISO 27001, GDPR, CCPA, HIPAA, zero LLM retention for Enterprise. Use cases: onboarding, roadmap planning, weekly reporting, feedback triage, Slack support, security alerts."
      />
    </div>
  )
}
