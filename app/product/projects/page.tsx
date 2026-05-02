"use client"

import { motion } from "framer-motion"
import { FolderKanban, Database, Calendar, BarChart3, Filter, Workflow, ListTodo, Users, Clock, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/notion-os/navbar"
import { Footer } from "@/components/notion-os/footer"

const features = [
  { icon: Database, title: "Capture every detail in a database", description: "Track all your important information in one place, so nothing slips through the cracks." },
  { icon: Calendar, title: "View projects as a timeline", description: "See the bigger picture of how projects fit together, so you can resolve dependencies and hit your deadlines." },
  { icon: BarChart3, title: "Visualize progress with charts", description: "Create a dashboard with charts from as many sources as you want." },
  { icon: Filter, title: "Filter and sort to see what you need", description: "Show only tasks assigned to you, or items marked as urgent." },
  { icon: Workflow, title: "Automate your team workflows", description: "Spend less time on manual tasks with automations that streamline task flows." },
  { icon: ListTodo, title: "Capture requests with forms", description: "Collect information from your team. Then kick off tasks and workflows." }
]

const projectDetails = [
  { icon: ListTodo, title: "Tasks and sub-tasks", description: "Break projects into manageable pieces." },
  { icon: Users, title: "Status, assignee, due date", description: "So everyone knows what to do and when." },
  { icon: Calendar, title: "Database views", description: "Visualize work in distinct formats." },
  { icon: Workflow, title: "Dependencies", description: "See when one task is blocking another." },
  { icon: FolderKanban, title: "My tasks", description: "Manage every task assigned to you." },
  { icon: BarChart3, title: "Progress bar", description: "See how your project is tracking." }
]

const testimonials = [
  {
    quote: "It's the slickest, most practical implementation of generative AI for text that I've used to date.",
    author: "Alex Heath",
    role: "Deputy Editor, The Verge"
  },
  {
    quote: "We can see a project's going to have three sprints, we can see all the tasks for those sprints, and everything's linked in the roadmap.",
    author: "Joy Tao",
    role: "Co-founder and CTO, Partiful"
  }
]

export default function ProjectsProductPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24">
        {/* Hero */}
        <section className="py-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-transparent" />
          
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
            >
              <FolderKanban className="h-4 w-4 text-purple-500" />
              <span className="text-sm text-muted-foreground">Projects</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance"
            >
              Manage any <span className="text-purple-500">project</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4"
            >
              Your connected workspace for wiki, docs & projects.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-sm text-muted-foreground mb-10"
            >
              Trusted by teams of 100 to 1000+
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button size="lg" className="bg-gradient-to-r from-purple-500 to-purple-600">
                Get started free
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-4"
            >
              Infinitely configurable
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-center mb-12 max-w-xl mx-auto"
            >
              So you can work the way you want.
            </motion.p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="glass-card rounded-xl p-6"
                >
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-5 w-5 text-purple-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Project Details */}
        <section className="py-20 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-12"
            >
              Catch all the details, big and small
            </motion.h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {projectDetails.map((detail, index) => (
                <motion.div
                  key={detail.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-4 glass-card rounded-xl p-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                    <detail.icon className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{detail.title}</h3>
                    <p className="text-sm text-muted-foreground">{detail.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-8"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-6">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Focus on what&apos;s important. Leave the rest to AI.
              </h2>
              <p className="text-muted-foreground mb-6">
                Customizable AI Autofill adds user stories, key results, updates, and more for every project deliverable.
              </p>
              <blockquote className="text-foreground italic">
                &ldquo;{testimonials[0].quote}&rdquo;
              </blockquote>
              <p className="text-sm text-muted-foreground mt-2">{testimonials[0].author}, {testimonials[0].role}</p>
            </motion.div>
          </div>
        </section>

        {/* Sprints */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                  Ship faster with automated sprints
                </h2>
                <p className="text-muted-foreground mb-6">
                  Engineering and product teams have everything they need with out-of-the-box workflows to groom your backlog, organize sprints, and track bugs.
                </p>
                <div className="glass-card rounded-xl p-6">
                  <h3 className="font-semibold text-foreground mb-2">Your PRDs alongside your sprint plans</h3>
                  <p className="text-sm text-muted-foreground">
                    Every task has a page that contains all the project info to not just plan the thing, but build the thing.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass-card rounded-2xl p-8"
              >
                <blockquote className="text-lg text-foreground italic mb-4">
                  &ldquo;{testimonials[1].quote}&rdquo;
                </blockquote>
                <p className="text-muted-foreground">{testimonials[1].author}, {testimonials[1].role}</p>
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
            >
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Get started in seconds
              </h2>
              <p className="text-muted-foreground mb-8">
                Just one click to set up. Import or start with a template.
              </p>
              <Button size="lg" className="bg-gradient-to-r from-purple-500 to-purple-600">
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
