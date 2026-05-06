"use client"

import { motion } from "framer-motion"
import { FolderKanban, Database, Calendar, BarChart3, Filter, Workflow, ListTodo, Users, Clock, Sparkles, ArrowRight, GitBranch, Eye, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/notion-os/navbar"
import { Footer } from "@/components/notion-os/footer"
import { PageAIAssistant } from "@/components/notion-os/page-ai-assistant"
import { AIOverviewButton } from "@/components/notion-os/ai-overview-button"

const features = [
  { icon: Database, title: "Capture every detail in a database", description: "Track all your important information in one place, so nothing slips through the cracks." },
  { icon: Calendar, title: "View projects as a timeline", description: "See the bigger picture of how projects fit together, so you can resolve dependencies." },
  { icon: BarChart3, title: "Visualize progress with charts", description: "Create a dashboard with charts from as many sources as you want." },
  { icon: Filter, title: "Filter and sort to see what you need", description: "Show only tasks assigned to you, or items marked as urgent." },
  { icon: Workflow, title: "Automate your team workflows", description: "Spend less time on manual tasks with automations that streamline task flows." },
  { icon: ListTodo, title: "Capture requests with forms", description: "Collect information from your team. Then kick off tasks and workflows." }
]

const projectDetails = [
  { icon: ListTodo, title: "Tasks and sub-tasks", description: "Break projects into manageable pieces." },
  { icon: Users, title: "Status, assignee, due date", description: "So everyone knows what to do and when." },
  { icon: Eye, title: "Database views", description: "Visualize work in distinct formats." },
  { icon: GitBranch, title: "Dependencies", description: "See when one task is blocking another." },
  { icon: Target, title: "My tasks", description: "Manage every task assigned to you." },
  { icon: BarChart3, title: "Progress bar", description: "See how your project is tracking." }
]

export default function ProjectsProductPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24">
        {/* Hero */}
        <section className="relative py-24 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#110a28] via-[#150d3a] to-background" />
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute inset-0" style={{
              backgroundImage: "radial-gradient(rgba(168, 85, 247, 0.4) 1px, transparent 1px)",
              backgroundSize: "40px 40px"
            }} />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-purple-500/10 rounded-full blur-[120px]" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/5 mb-8"
            >
              <FolderKanban className="h-4 w-4 text-purple-400" />
              <span className="text-sm text-purple-300">Projects</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 text-balance"
            >
              Manage any{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">project</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-white/50 max-w-2xl mx-auto mb-4 leading-relaxed"
            >
              Your connected workspace for wiki, docs & projects. Trusted by teams of 100 to 1000+.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-10"
            >
              <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white shadow-lg shadow-purple-500/20">
                Get started free
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section className="relative py-24">
          <AIOverviewButton
            sectionId="projects-features"
            sectionTitle="Project Features"
            sectionContext="Notion Projects features: databases for tracking info, timeline views for project planning, charts for visualizing progress, filters/sorts, workflow automations, and forms for collecting requests."
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
              Infinitely configurable
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-white/40 text-center mb-16 max-w-lg mx-auto"
            >
              So you can work the way you want.
            </motion.p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -4, backgroundColor: "rgba(255,255,255,0.04)" }}
                  className="rounded-xl border border-white/10 bg-white/[0.02] p-6 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                    <f.icon className="h-5 w-5 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-white/40">{f.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Project Details */}
        <section className="relative py-24">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/[0.03] to-transparent" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-white text-center mb-16"
            >
              Catch all the details, big and small
            </motion.h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {projectDetails.map((d, i) => (
                <motion.div
                  key={d.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-5"
                >
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                    <d.icon className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{d.title}</h3>
                    <p className="text-sm text-white/40">{d.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* AI + Sprints */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* AI Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl p-[1px] bg-gradient-to-br from-purple-500/30 to-pink-500/30"
              >
                <div className="rounded-2xl bg-[#0a0a1a] p-8">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center mb-6">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Leave the rest to AI
                  </h3>
                  <p className="text-white/50 mb-6 leading-relaxed">
                    Customizable AI Autofill adds user stories, key results, updates, and more for every project deliverable.
                  </p>
                  <blockquote className="text-white/80 italic text-sm border-l-2 border-purple-500/50 pl-4">
                    &ldquo;It&apos;s the slickest, most practical implementation of generative AI for text that I&apos;ve used to date.&rdquo;
                    <p className="text-white/40 mt-2 not-italic">Alex Heath, Deputy Editor, The Verge</p>
                  </blockquote>
                </div>
              </motion.div>

              {/* Sprints Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-8"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6">
                  <Clock className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Ship faster with automated sprints
                </h3>
                <p className="text-white/50 mb-6 leading-relaxed">
                  Engineering and product teams have everything they need with out-of-the-box workflows to groom your backlog, organize sprints, and track bugs.
                </p>
                <blockquote className="text-white/80 italic text-sm border-l-2 border-purple-500/50 pl-4">
                  &ldquo;We can see a project&apos;s going to have three sprints, we can see all the tasks for those sprints, and everything&apos;s linked in the roadmap.&rdquo;
                  <p className="text-white/40 mt-2 not-italic">Joy Tao, Co-founder and CTO, Partiful</p>
                </blockquote>
              </motion.div>
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
              className="rounded-2xl p-[1px] bg-gradient-to-r from-purple-500/50 to-pink-500/50"
            >
              <div className="rounded-2xl bg-[#0a0a1a] px-10 py-14">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Get started in seconds</h2>
                <p className="text-white/40 mb-8">Just one click to set up. Import or start with a template.</p>
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
        pageName="Notion Projects"
        accentColor="purple"
        pageContext="Notion Projects product page. Features: databases for tracking, timeline views, charts, filters/sorts, workflow automations, forms. Project details: tasks/sub-tasks, status/assignee/due dates, database views, dependencies, my tasks, progress bars. AI Autofill for user stories and updates. Automated sprints with backlog grooming and bug tracking. Trusted by teams of 100-1000+."
      />
    </div>
  )
}
