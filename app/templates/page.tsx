"use client"

import { motion } from "framer-motion"
import { Search, Layout, Users, Briefcase, GraduationCap, Heart, Code, Palette, Star, ArrowRight, Download, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/notion-os/navbar"
import { Footer } from "@/components/notion-os/footer"
import { PageAIAssistant } from "@/components/notion-os/page-ai-assistant"
import { AIOverviewButton } from "@/components/notion-os/ai-overview-button"
import { VoiceNavAgent } from "@/components/notion-os/voice-nav-agent"
import { useState } from "react"

const categories = [
  { name: "All", icon: Layout },
  { name: "Work", icon: Briefcase },
  { name: "Personal", icon: Heart },
  { name: "Education", icon: GraduationCap },
  { name: "Engineering", icon: Code },
  { name: "Design", icon: Palette },
  { name: "Teams", icon: Users }
]

const featuredTemplates = [
  { name: "Product Roadmap", category: "Work", creator: "Notion", downloads: "125K+", gradient: "from-blue-500/10 to-cyan-500/10" },
  { name: "Meeting Notes", category: "Work", creator: "Notion", downloads: "89K+", gradient: "from-purple-500/10 to-pink-500/10" },
  { name: "Personal Wiki", category: "Personal", creator: "Community", downloads: "67K+", gradient: "from-amber-500/10 to-orange-500/10" },
  { name: "Habit Tracker", category: "Personal", creator: "Community", downloads: "54K+", gradient: "from-green-500/10 to-emerald-500/10" },
  { name: "Sprint Planning", category: "Engineering", creator: "Notion", downloads: "45K+", gradient: "from-red-500/10 to-rose-500/10" },
  { name: "Design System", category: "Design", creator: "Community", downloads: "38K+", gradient: "from-pink-500/10 to-fuchsia-500/10" },
  { name: "Course Notes", category: "Education", creator: "Community", downloads: "32K+", gradient: "from-indigo-500/10 to-blue-500/10" },
  { name: "Team Wiki", category: "Teams", creator: "Notion", downloads: "78K+", gradient: "from-cyan-500/10 to-teal-500/10" }
]

const featuredCreators = [
  { name: "Abdo Karmalla", templates: 101, description: "Notion Consultant helping you design powerful Notion systems." },
  { name: "Mindful Yesmads", templates: 24, description: "Digital nomads and entrepreneurs. Certified Notion experts." },
  { name: "Laura Miller", templates: 13, description: "Helping startups build beautiful, scalable systems." },
  { name: "Bitebox", templates: 5, description: "Helping home cooks bring calm to kitchen chaos." }
]

const consultants = [
  { name: "NotionFlows", description: "We partner with growing companies to design and implement digital workspaces.", initial: "N" },
  { name: "Konduit Operations", description: "Vancouver-based consultancy helping businesses build systems in Notion.", initial: "K" },
  { name: "Sanchana Selvaraj", description: "Trusted by 50+ companies across 120+ successful projects worldwide.", initial: "S" }
]

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTemplates = featuredTemplates.filter(template =>
    (activeCategory === "All" || template.category === activeCategory) &&
    template.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24">
        {/* Hero */}
        <section className="relative py-20 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f1428] via-[#12173d] to-background" />
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute inset-0" style={{
              backgroundImage: "linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)",
              backgroundSize: "48px 48px"
            }} />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-cyan-500/8 rounded-full blur-[120px]" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-8"
            >
              <Layout className="h-4 w-4 text-cyan-400" />
              <span className="text-sm text-cyan-300">Templates</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 text-balance"
            >
              Choose from{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">30,000+</span>{" "}
              templates
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-white/50 mb-10"
            >
              Find all the best templates and set-ups built by Notion&apos;s community
            </motion.p>

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-xl mx-auto"
            >
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 backdrop-blur-sm">
                <Search className="h-5 w-5 text-white/30" />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-white placeholder:text-white/30 focus:outline-none text-sm"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat, i) => (
                <motion.button
                  key={cat.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.03 }}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeCategory === cat.name
                      ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/20"
                      : "bg-white/5 text-white/50 hover:text-white hover:bg-white/10 border border-white/10"
                  }`}
                >
                  <cat.icon className="h-4 w-4" />
                  <span>{cat.name}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Templates Grid */}
        <section className="relative py-12">
          <AIOverviewButton
            sectionId="templates-grid"
            sectionTitle="Featured Templates"
            sectionContext="Featured templates include: Product Roadmap (125K+ downloads), Meeting Notes (89K+), Personal Wiki (67K+), Habit Tracker (54K+), Sprint Planning (45K+), Design System (38K+), Course Notes (32K+), and Team Wiki (78K+). Templates are filterable by categories: Work, Personal, Education, Engineering, Design, and Teams."
            position="top-right"
            allowQuestions={true}
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-white mb-8">Featured templates</h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredTemplates.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden cursor-pointer group"
                >
                  <div className={`aspect-video bg-gradient-to-br ${t.gradient} flex items-center justify-center`}>
                    <Layout className="h-8 w-8 text-white/20 group-hover:text-cyan-400 group-hover:scale-110 transition-all" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-white mb-1">{t.name}</h3>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/40">{t.creator}</span>
                      <span className="flex items-center gap-1 text-cyan-400">
                        <Download className="h-3 w-3" />
                        {t.downloads}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredTemplates.length === 0 && (
              <div className="text-center py-16">
                <p className="text-white/40">No templates found matching your criteria.</p>
              </div>
            )}
          </div>
        </section>

        {/* Consultants */}
        <section className="relative py-20">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.02] to-transparent" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl font-bold text-white mb-2">Work smarter with Notion experts</h2>
              <p className="text-white/40">Get personalized 1:1 help from certified Consulting Partners.</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-4">
              {consultants.map((c, i) => (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-xl border border-white/10 bg-white/[0.02] p-6"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center mb-4">
                    <span className="text-lg font-bold text-white">{c.initial}</span>
                  </div>
                  <h3 className="font-semibold text-white mb-2">{c.name}</h3>
                  <p className="text-sm text-white/40">{c.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Creators */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-white mb-8">Featured creators</h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {featuredCreators.map((c, i) => (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-xl border border-white/10 bg-white/[0.02] p-6 text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-4">
                    <span className="text-lg font-bold text-white">{c.name.charAt(0)}</span>
                  </div>
                  <h3 className="font-semibold text-white mb-1">{c.name}</h3>
                  <div className="flex items-center justify-center gap-1.5 text-sm text-cyan-400 mb-3">
                    <Star className="h-3.5 w-3.5" />
                    <span>{c.templates} templates</span>
                  </div>
                  <p className="text-sm text-white/40">{c.description}</p>
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
              className="rounded-2xl p-[1px] bg-gradient-to-r from-cyan-500/50 to-blue-500/50"
            >
              <div className="rounded-2xl bg-[#0a0a1a] px-10 py-14">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="h-7 w-7 text-white" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Ready to get started?
                </h2>
                <p className="text-white/40 mb-8">
                  Browse thousands of templates or create your own.
                </p>
                <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90 text-white shadow-lg shadow-cyan-500/20">
                  Explore all templates
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />

      <PageAIAssistant
        pageName="Templates"
        accentColor="cyan"
        pageContext="Notion Templates page. 30,000+ templates across categories: Work, Personal, Education, Engineering, Design, Teams. Featured templates: Product Roadmap (125K+), Meeting Notes (89K+), Personal Wiki (67K+), Sprint Planning (45K+), Team Wiki (78K+). Featured creators include Abdo Karmalla (101 templates), Mindful Yesmads (24), Laura Miller (13). Certified consulting partners available for 1:1 help."
      />
      <VoiceNavAgent />
    </div>
  )
}
