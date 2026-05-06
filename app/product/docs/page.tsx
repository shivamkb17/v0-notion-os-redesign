"use client"

import { motion } from "framer-motion"
import { FileText, Code, ChevronDown, Image, List, BarChart3, Users, MessageSquare, Sparkles, ArrowRight, Layers, Lock, Paintbrush } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/notion-os/navbar"
import { Footer } from "@/components/notion-os/footer"
import { PageAIAssistant } from "@/components/notion-os/page-ai-assistant"
import { AIOverviewButton } from "@/components/notion-os/ai-overview-button"
import { VoiceNavAgent } from "@/components/notion-os/voice-nav-agent"

const contentTypes = [
  { icon: Code, title: "Code snippets", description: "Native syntax highlighting for dozens of languages." },
  { icon: ChevronDown, title: "Toggles", description: "Collapsible sections make your docs easy to read." },
  { icon: Image, title: "Images & videos", description: "Embed directly from Loom & YouTube, or upload your own." },
  { icon: List, title: "Table of contents", description: "Click to jump to a section. Updates automatically." },
  { icon: BarChart3, title: "Charts", description: "Add live charts to any doc." },
  { icon: Sparkles, title: "And 50+ more", description: "Like a bottomless box of building blocks." }
]

const collaborationFeatures = [
  {
    icon: Users,
    title: "Collaborate or co-edit together",
    description: "Allow others to comment or suggest edits. Just type @ to get their attention.",
  },
  {
    icon: MessageSquare,
    title: "Comments keep the ball rolling async",
    description: "A consolidated view of feedback makes it easy to iterate, even across time zones.",
  },
  {
    icon: Lock,
    title: "Granular permissions",
    description: "Control who can view, comment, or edit every page.",
  },
  {
    icon: Paintbrush,
    title: "Custom styling",
    description: "Fonts, colors, and callouts to make docs distinctly yours.",
  },
]

const useCases = [
  {
    role: "Product managers",
    description: "Connect the roadmap to goals, and keep folks aligned on what's shipping and when.",
    gradient: "from-blue-400 to-cyan-400"
  },
  {
    role: "Designers",
    description: "Move review rounds forward, prioritize requests, and hit all your creative deadlines.",
    gradient: "from-pink-400 to-rose-400"
  },
  {
    role: "Engineers",
    description: "Ship features faster with sprints, code guidelines, bug fixes & more, all in one place.",
    gradient: "from-green-400 to-emerald-400"
  }
]

const integrations = [
  { name: "Figma", desc: "Embed live designs" },
  { name: "GitHub", desc: "Link PRs and issues" },
  { name: "Slack", desc: "Share and discuss" },
  { name: "Jira", desc: "Sync project work" },
  { name: "Amplitude", desc: "Embed analytics" },
]

export default function DocsProductPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24">
        {/* Hero */}
        <section className="relative py-24 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#081428] via-[#0b1a40] to-background" />
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute inset-0" style={{
              backgroundImage: "linear-gradient(rgba(59, 130, 246, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.4) 1px, transparent 1px)",
              backgroundSize: "60px 60px"
            }} />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-blue-500/10 rounded-full blur-[120px]" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/5 mb-8"
            >
              <FileText className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-blue-300">Docs</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 text-balance"
            >
              Beautiful docs,{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">together</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Simple. Powerful. Beautiful. Communicate more efficiently with flexible building blocks.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90 text-white shadow-lg shadow-blue-500/20">
                Get started free
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Content Types */}
        <section className="relative py-24">
          <AIOverviewButton
            sectionId="docs-content-types"
            sectionTitle="Content Types"
            sectionContext="Notion Docs supports 50+ content types including code snippets with syntax highlighting, collapsible toggles, embedded images and videos (Loom, YouTube), auto-updating table of contents, live charts, and many more building blocks."
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
              Go way beyond text & bullet points
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-white/40 text-center mb-16 max-w-xl mx-auto"
            >
              Build rich documents with 50+ content types.
            </motion.p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {contentTypes.map((type, i) => (
                <motion.div
                  key={type.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -4, backgroundColor: "rgba(255,255,255,0.04)" }}
                  className="rounded-xl border border-white/10 bg-white/[0.02] p-6 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                    <type.icon className="h-5 w-5 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{type.title}</h3>
                  <p className="text-sm text-white/40">{type.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Collaboration */}
        <section className="relative py-24">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/[0.03] to-transparent" />
          <AIOverviewButton
            sectionId="docs-collaboration"
            sectionTitle="Collaboration Features"
            sectionContext="Notion Docs collaboration features: real-time co-editing, @mentions, inline commenting with consolidated feedback view, granular permissions (view/comment/edit), and custom styling with fonts, colors, and callouts."
            position="top-right"
            allowQuestions={true}
          />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-white text-center mb-4"
            >
              Get your team on the same page
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-white/40 text-center mb-16 max-w-lg mx-auto"
            >
              Collaborate in real-time or async across time zones.
            </motion.p>

            <div className="grid sm:grid-cols-2 gap-4">
              {collaborationFeatures.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-xl border border-white/10 bg-white/[0.02] p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                      <f.icon className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">{f.title}</h3>
                      <p className="text-sm text-white/40">{f.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Testimonial */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 rounded-2xl p-[1px] bg-gradient-to-r from-blue-500/30 to-cyan-500/30"
            >
              <div className="rounded-2xl bg-[#0a0a1a] px-10 py-8 text-center">
                <p className="text-lg text-white/90 italic mb-4 leading-relaxed">
                  &ldquo;We can quickly build out a meeting agenda for a large group of people and still make it interactive and fun.&rdquo;
                </p>
                <p className="text-sm text-white/40">Scott Stephens, Design Operations Manager, Kin + Carta</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-white text-center mb-16"
            >
              For PMs, designers, engineers, and everyone in between
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-6">
              {useCases.map((uc, i) => (
                <motion.div
                  key={uc.role}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="rounded-xl border border-white/10 bg-white/[0.02] p-6 transition-transform"
                >
                  <div className={`w-full h-1.5 rounded-full bg-gradient-to-r ${uc.gradient} mb-5`} />
                  <h3 className="text-xl font-semibold text-white mb-2">{uc.role}</h3>
                  <p className="text-white/40 leading-relaxed">{uc.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Integrations */}
        <section className="py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center mx-auto mb-6">
                <Layers className="h-7 w-7 text-blue-400" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Info from Figma, GitHub & more
              </h2>
              <p className="text-white/40">Easy to embed, easy to see.</p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {integrations.map((int, i) => (
                <motion.div
                  key={int.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4 text-center"
                >
                  <p className="text-white font-medium">{int.name}</p>
                  <p className="text-xs text-white/30 mt-1">{int.desc}</p>
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
              className="relative rounded-2xl p-[1px] bg-gradient-to-r from-blue-500/50 to-cyan-500/50"
            >
              <div className="rounded-2xl bg-[#0a0a1a] px-10 py-14">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Start writing better docs today
                </h2>
                <p className="text-white/40 mb-8">Simple, powerful, and collaborative.</p>
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90 text-white shadow-lg shadow-blue-500/20">
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
        pageName="Notion Docs"
        accentColor="blue"
        pageContext="Notion Docs product page. Features: 50+ content types (code snippets, toggles, images/videos, table of contents, charts, embeds). Collaboration: real-time co-editing, @mentions, comments, granular permissions. Use cases: PMs (roadmaps and goals), designers (reviews and deadlines), engineers (sprints, code guidelines, bugs). Integrations: Figma, GitHub, Slack, Jira, Amplitude. Free to start."
      />
      <VoiceNavAgent />
    </div>
  )
}
