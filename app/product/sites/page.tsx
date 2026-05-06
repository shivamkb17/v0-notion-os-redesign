"use client"

import { motion } from "framer-motion"
import { Globe, FileText, Palette, Layout, User, Calendar, Briefcase, HelpCircle, ArrowRight, Zap, Eye, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/notion-os/navbar"
import { Footer } from "@/components/notion-os/footer"
import { PageAIAssistant } from "@/components/notion-os/page-ai-assistant"
import { AIOverviewButton } from "@/components/notion-os/ai-overview-button"

const steps = [
  {
    number: "1",
    icon: FileText,
    title: "Make a page",
    description: "Start with one of 30,000+ templates or a blank canvas."
  },
  {
    number: "2",
    icon: Palette,
    title: "Personalize it",
    description: "Choose a domain, theme, favicon, and look and feel."
  },
  {
    number: "3",
    icon: Zap,
    title: "Publish it",
    description: "Just hit \"publish\", and you are live. Instantly."
  }
]

const templates = [
  { name: "Personal site", icon: User },
  { name: "Event page", icon: Calendar },
  { name: "Travel guide", icon: Globe },
  { name: "Job board", icon: Briefcase },
  { name: "Help center", icon: HelpCircle }
]

const creatorTemplates = [
  { name: "Notion Link in bio", creator: "Burk" },
  { name: "Simplicity Blog", creator: "Liyanne" },
  { name: "Pitch Deck Template", creator: "Maximilian Fleitmann" },
  { name: "Recipe box", creator: "Kylie Stewart" },
  { name: "Minimalist Resume", creator: "Nadine's Creations" },
  { name: "Brand Style Guide", creator: "Kevan Lee" }
]

const siteFeatures = [
  {
    icon: FileText,
    title: "As simple as editing a page",
    description: "Your site updates instantly whenever you edit your Notion page. No deploy buttons, no waiting."
  },
  {
    icon: Palette,
    title: "Make it your own",
    description: "Custom domains, themes, favicons, and more. Included in Plus, Business, and Enterprise plans."
  },
  {
    icon: Eye,
    title: "SEO built-in",
    description: "Meta titles, descriptions, and social previews are automatically generated from your content."
  },
  {
    icon: Code,
    title: "No code required",
    description: "Everything you need to publish a beautiful website without writing a single line of code."
  }
]

export default function SitesProductPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24">
        {/* Hero */}
        <section className="relative py-24 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a1e] via-[#2a0d30] to-background" />
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute inset-0" style={{
              backgroundImage: "radial-gradient(rgba(236, 72, 153, 0.4) 1px, transparent 1px)",
              backgroundSize: "36px 36px"
            }} />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-pink-500/10 rounded-full blur-[120px]" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pink-500/20 bg-pink-500/5 mb-8"
            >
              <Globe className="h-4 w-4 text-pink-400" />
              <span className="text-sm text-pink-300">Notion Sites</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 text-balance"
            >
              Publish anything,{" "}
              <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">fast</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Turn any Notion page into a beautiful website in seconds. No code required.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Button size="lg" className="bg-gradient-to-r from-pink-500 to-rose-500 hover:opacity-90 text-white shadow-lg shadow-pink-500/20">
                Start publishing
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Steps */}
        <section className="py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-white text-center mb-16"
            >
              Three steps. That&apos;s it.
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="text-center"
                >
                  <div className="relative w-16 h-16 mx-auto mb-6">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 opacity-20 blur-lg" />
                    <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                      <step.icon className="h-7 w-7 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#0a0a1a] border-2 border-pink-500 flex items-center justify-center">
                      <span className="text-xs font-bold text-pink-400">{step.number}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-white/40">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Templates */}
        <section className="relative py-24">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-500/[0.03] to-transparent" />
          <AIOverviewButton
            sectionId="sites-templates"
            sectionTitle="Website Templates"
            sectionContext="Notion Sites offers over 10,000 templates for personal sites, event pages, travel guides, job boards, help centers, link-in-bio pages, blogs, pitch decks, recipe boxes, resumes, and brand style guides. Templates are created by both Notion and the community."
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
              Over 10,000 templates
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-white/40 text-center mb-12"
            >
              From pitch decks to portfolios.
            </motion.p>

            <div className="flex flex-wrap justify-center gap-3 mb-16">
              {templates.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="rounded-xl border border-pink-500/20 bg-pink-500/5 px-5 py-3 flex items-center gap-2.5 cursor-pointer"
                >
                  <t.icon className="h-4 w-4 text-pink-400" />
                  <span className="text-white font-medium text-sm">{t.name}</span>
                </motion.div>
              ))}
            </div>

            {/* Creator templates */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {creatorTemplates.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden cursor-pointer group"
                >
                  <div className="aspect-video bg-gradient-to-br from-pink-500/5 to-rose-500/5 flex items-center justify-center">
                    <Layout className="h-8 w-8 text-white/20 group-hover:text-pink-400 transition-colors" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-white mb-1">{t.name}</h3>
                    <p className="text-sm text-white/40">{t.creator}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 gap-4">
              {siteFeatures.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-xl border border-white/10 bg-white/[0.02] p-6"
                >
                  <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center mb-4">
                    <f.icon className="h-5 w-5 text-pink-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-white/40">{f.description}</p>
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
              className="rounded-2xl p-[1px] bg-gradient-to-r from-pink-500/50 to-rose-500/50"
            >
              <div className="rounded-2xl bg-[#0a0a1a] px-10 py-14">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Publish your first site today
                </h2>
                <p className="text-white/40 mb-8">It only takes a few clicks to go from page to published.</p>
                <Button size="lg" className="bg-gradient-to-r from-pink-500 to-rose-500 hover:opacity-90 text-white shadow-lg shadow-pink-500/20">
                  Start publishing
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />

      <PageAIAssistant
        pageName="Notion Sites"
        accentColor="pink"
        pageContext="Notion Sites product page. 3-step process: make a page, personalize (domain, theme, favicon), publish instantly. 10,000+ templates for personal sites, event pages, travel guides, job boards, help centers. Features: instant editing, custom domains, SEO built-in, no code required. Included in Plus, Business, and Enterprise plans."
      />
    </div>
  )
}
