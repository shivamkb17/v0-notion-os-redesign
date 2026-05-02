"use client"

import { motion } from "framer-motion"
import { Search, Layout, Users, Briefcase, GraduationCap, Heart, Code, Palette, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/notion-os/navbar"
import { Footer } from "@/components/notion-os/footer"
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
  { name: "Product Roadmap", category: "Work", creator: "Notion", downloads: "125K+" },
  { name: "Meeting Notes", category: "Work", creator: "Notion", downloads: "89K+" },
  { name: "Personal Wiki", category: "Personal", creator: "Community", downloads: "67K+" },
  { name: "Habit Tracker", category: "Personal", creator: "Community", downloads: "54K+" },
  { name: "Sprint Planning", category: "Engineering", creator: "Notion", downloads: "45K+" },
  { name: "Design System", category: "Design", creator: "Community", downloads: "38K+" },
  { name: "Course Notes", category: "Education", creator: "Community", downloads: "32K+" },
  { name: "Team Wiki", category: "Teams", creator: "Notion", downloads: "78K+" }
]

const featuredCreators = [
  { name: "Abdo Karmalla", templates: 101, description: "Notion Consultant helping you design powerful Notion systems." },
  { name: "Mindful Yesmads", templates: 24, description: "Digital nomads and entrepreneurs. Certified Notion experts." },
  { name: "Laura Miller", templates: 13, description: "Helping startups build beautiful, scalable systems." },
  { name: "Bitebox", templates: 5, description: "Helping home cooks bring calm to kitchen chaos." }
]

const consultants = [
  { name: "NotionFlows", description: "We partner with growing companies to design and implement digital workspaces." },
  { name: "Konduit Operations", description: "Vancouver-based consultancy helping businesses build systems in Notion." },
  { name: "Sanchana Selvaraj", description: "Trusted by 50+ companies across 120+ successful projects worldwide." }
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
        <section className="py-16 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl font-bold text-foreground mb-6 text-balance"
            >
              Choose from <span className="text-primary text-glow">30,000+</span> Notion templates
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg text-muted-foreground mb-8"
            >
              Find all the best templates and set-ups built by Notion&apos;s community
            </motion.p>

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-xl mx-auto"
            >
              <div className="flex items-center gap-3 glass-card rounded-xl px-4 py-3">
                <Search className="h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category, index) => (
                <motion.button
                  key={category.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setActiveCategory(category.name)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                    activeCategory === category.name
                      ? "bg-primary text-primary-foreground"
                      : "glass-card text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <category.icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{category.name}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Templates Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-foreground mb-8">Featured templates</h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredTemplates.map((template, index) => (
                <motion.div
                  key={template.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="glass-card rounded-xl overflow-hidden cursor-pointer group"
                >
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    <Layout className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground mb-1">{template.name}</h3>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{template.creator}</span>
                      <span className="text-primary">{template.downloads}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredTemplates.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No templates found matching your criteria.</p>
              </div>
            )}
          </div>
        </section>

        {/* Consultants */}
        <section className="py-16 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl font-bold text-foreground mb-2">Work smarter with Notion experts</h2>
              <p className="text-muted-foreground">Get personalized 1:1 help for your Notion setup from certified Consulting Partners.</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {consultants.map((consultant, index) => (
                <motion.div
                  key={consultant.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-xl p-6"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <span className="text-lg font-bold text-primary">{consultant.name.charAt(0)}</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{consultant.name}</h3>
                  <p className="text-sm text-muted-foreground">{consultant.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Creators */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-foreground mb-8">Featured creators</h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredCreators.map((creator, index) => (
                <motion.div
                  key={creator.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-xl p-6 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-white">{creator.name.charAt(0)}</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{creator.name}</h3>
                  <div className="flex items-center justify-center gap-1 text-sm text-primary mb-2">
                    <Star className="h-4 w-4" />
                    <span>{creator.templates} templates</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{creator.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-12"
            >
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Ready to get started?
              </h2>
              <p className="text-muted-foreground mb-8">
                Browse thousands of templates or create your own.
              </p>
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent">
                Explore all templates
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
