"use client"

import { motion } from "framer-motion"
import { Globe, FileText, Palette, Rocket, Layout, User, Calendar, Briefcase, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/notion-os/navbar"
import { Footer } from "@/components/notion-os/footer"

const steps = [
  {
    number: "1",
    title: "Make a page",
    description: "Start with one of 30,000+ templates."
  },
  {
    number: "2",
    title: "Personalize it",
    description: "Choose a domain, theme, favicon, and look and feel."
  },
  {
    number: "3",
    title: "Publish it",
    description: "Just hit \"publish\", and you are live."
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

export default function SitesProductPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24">
        {/* Hero */}
        <section className="py-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-pink-500/10 via-transparent to-transparent" />
          
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
            >
              <Globe className="h-4 w-4 text-pink-500" />
              <span className="text-sm text-muted-foreground">Notion Sites</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance"
            >
              Publish anything, <span className="text-pink-500">fast</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10"
            >
              Turn any Notion page into a beautiful website in seconds. No code required.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button size="lg" className="bg-gradient-to-r from-pink-500 to-pink-600">
                Start publishing
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Steps */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-white">{step.number}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Templates */}
        <section className="py-20 bg-gradient-to-b from-transparent via-pink-500/5 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-4"
            >
              Over 10,000 templates
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-center mb-12"
            >
              From pitch decks to portfolios.
            </motion.p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {templates.map((template, index) => (
                <motion.div
                  key={template.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="glass-card rounded-xl px-6 py-4 flex items-center gap-3 cursor-pointer"
                >
                  <template.icon className="h-5 w-5 text-pink-500" />
                  <span className="text-foreground font-medium">{template.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Creator Templates */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-foreground text-center mb-12"
            >
              Start with a template. Build anything.
            </motion.h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {creatorTemplates.map((template, index) => (
                <motion.div
                  key={template.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="glass-card rounded-xl p-6 cursor-pointer"
                >
                  <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
                    <Layout className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{template.name}</h3>
                  <p className="text-sm text-muted-foreground">{template.creator}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass-card rounded-xl p-8"
              >
                <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-pink-500" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">As simple as editing a page</h3>
                <p className="text-muted-foreground">
                  Your site updates instantly whenever you edit your Notion page. No deploy buttons, no waiting.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass-card rounded-xl p-8"
              >
                <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center mb-4">
                  <Palette className="h-6 w-6 text-pink-500" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Upgrade to make it your own</h3>
                <p className="text-muted-foreground">
                  Custom domains, themes, favicons, and more. Included in Plus, Business, and Enterprise plans.
                </p>
              </motion.div>
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
              className="glass-card rounded-2xl p-12"
            >
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Publish your first site today
              </h2>
              <p className="text-muted-foreground mb-8">
                It only takes a few clicks to go from page to published.
              </p>
              <Button size="lg" className="bg-gradient-to-r from-pink-500 to-pink-600">
                Start publishing
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
