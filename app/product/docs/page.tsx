"use client"

import { motion } from "framer-motion"
import { FileText, Code, ChevronDown, Image, List, BarChart3, Users, MessageSquare, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/notion-os/navbar"
import { Footer } from "@/components/notion-os/footer"

const contentTypes = [
  { icon: Code, title: "Code snippets", description: "Native syntax highlighting for dozens of languages." },
  { icon: ChevronDown, title: "Toggles", description: "Collapsible sections make your docs easy to read." },
  { icon: Image, title: "Images & videos", description: "Embed directly from Loom & YouTube, or upload your own." },
  { icon: List, title: "Table of contents", description: "Click to jump to a section. Updates automatically." },
  { icon: BarChart3, title: "Charts", description: "Add live charts to any doc." },
  { icon: Sparkles, title: "And 50+ more", description: "Like a bottomless box of building blocks." }
]

const useCases = [
  {
    role: "Product managers",
    description: "Connect the roadmap to goals, and keep folks aligned on what's shipping and when.",
    color: "from-blue-500 to-blue-600"
  },
  {
    role: "Designers",
    description: "Move review rounds forward, prioritize requests, and hit all your creative deadlines.",
    color: "from-pink-500 to-pink-600"
  },
  {
    role: "Engineers",
    description: "Ship features faster with sprints, code guidelines, bug fixes & more, all in one place.",
    color: "from-green-500 to-green-600"
  }
]

const integrations = ["Figma", "Amplitude", "GitHub", "Slack", "Jira"]

export default function DocsProductPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24">
        {/* Hero */}
        <section className="py-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-transparent to-transparent" />
          
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
            >
              <FileText className="h-4 w-4 text-blue-500" />
              <span className="text-sm text-muted-foreground">Docs</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance"
            >
              Beautiful docs, <span className="text-blue-500">together</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10"
            >
              Simple. Powerful. Beautiful. Communicate more efficiently with flexible building blocks.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-blue-600">
                Get started free
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Content Types */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-4"
            >
              Go way beyond text & bullet points
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-center mb-12 max-w-xl mx-auto"
            >
              Build rich documents with 50+ content types.
            </motion.p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {contentTypes.map((type, index) => (
                <motion.div
                  key={type.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="glass-card rounded-xl p-6"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                    <type.icon className="h-5 w-5 text-blue-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{type.title}</h3>
                  <p className="text-sm text-muted-foreground">{type.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Collaboration */}
        <section className="py-20 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                  Get your team on the same page, literally
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                      <Users className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Collaborate or co-edit together</h3>
                      <p className="text-sm text-muted-foreground">Allow others to comment or suggest edits. Just type @ to get their attention.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Comments keep the ball rolling async</h3>
                      <p className="text-sm text-muted-foreground">A consolidated view of feedback makes it easy to iterate, even across time zones.</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass-card rounded-2xl p-8"
              >
                <blockquote className="text-lg text-foreground italic mb-4">
                  &ldquo;We can quickly build out a meeting agenda for a large group of people and still make it interactive and fun.&rdquo;
                </blockquote>
                <p className="text-muted-foreground">Scott Stephens, Design Operations Manager, Kin + Carta</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-12"
            >
              For PMs, designers, engineers, and everyone in between
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-6">
              {useCases.map((useCase, index) => (
                <motion.div
                  key={useCase.role}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-xl p-6"
                >
                  <div className={`w-full h-2 rounded-full bg-gradient-to-r ${useCase.color} mb-4`} />
                  <h3 className="text-xl font-semibold text-foreground mb-2">{useCase.role}</h3>
                  <p className="text-muted-foreground">{useCase.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Integrations */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-foreground mb-6"
            >
              Info from Figma, GitHub & more
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground mb-8"
            >
              Easy to share, easy to see.
            </motion.p>
            
            <div className="flex flex-wrap justify-center gap-4">
              {integrations.map((integration, index) => (
                <motion.div
                  key={integration}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="px-6 py-3 glass-card rounded-xl text-foreground font-medium"
                >
                  {integration}
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
              className="glass-card rounded-2xl p-12"
            >
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Start writing better docs today
              </h2>
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-blue-600">
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
