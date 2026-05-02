"use client"

import { motion } from "framer-motion"
import { FileText, FolderKanban, Database, Calendar, Globe, Users, Workflow, Lock } from "lucide-react"

const features = [
  {
    icon: FileText,
    title: "Docs",
    description: "Beautiful documents with AI-powered writing, collaboration, and 50+ content types.",
    color: "from-blue-500 to-blue-600"
  },
  {
    icon: FolderKanban,
    title: "Projects",
    description: "Manage any project with tasks, timelines, and automated workflows.",
    color: "from-purple-500 to-purple-600"
  },
  {
    icon: Database,
    title: "Wikis",
    description: "Centralize your team knowledge with searchable, organized databases.",
    color: "from-amber-500 to-amber-600"
  },
  {
    icon: Calendar,
    title: "Calendar",
    description: "Time management simplified with full workspace integration.",
    color: "from-green-500 to-green-600"
  },
  {
    icon: Globe,
    title: "Sites",
    description: "Publish anything fast - from pitch decks to portfolios.",
    color: "from-pink-500 to-pink-600"
  },
  {
    icon: Users,
    title: "Teamspaces",
    description: "Dedicated areas for teams to collaborate without silos.",
    color: "from-cyan-500 to-cyan-600"
  },
  {
    icon: Workflow,
    title: "Automations",
    description: "Streamline workflows with powerful database automations.",
    color: "from-orange-500 to-orange-600"
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    description: "SOC 2, HIPAA compliant with advanced admin controls.",
    color: "from-slate-500 to-slate-600"
  }
]

export function FeaturesSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Bring all your work <span className="text-primary text-glow">together.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            One connected workspace for docs, projects, wikis, and more.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-card rounded-xl p-6 cursor-pointer group"
            >
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:shadow-lg transition-shadow`}
              >
                <feature.icon className="h-6 w-6 text-white" />
              </motion.div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Savings calculator teaser */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 glass-card rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-foreground mb-4">
            More productivity. <span className="text-primary">Fewer tools.</span>
          </h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Bring all your tools and teams under one roof. Replace 12+ apps with one AI-powered workspace.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["AI Search", "AI Chatbot", "Meeting Notes", "Project Management", "Wiki", "CRM"].map((tool) => (
              <span
                key={tool}
                className="px-3 py-1.5 text-sm rounded-full bg-muted text-muted-foreground"
              >
                {tool}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
