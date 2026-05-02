"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, Users, Laptop, Smartphone, Link2, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/notion-os/navbar"
import { Footer } from "@/components/notion-os/footer"

const features = [
  {
    title: "Time management, simplified",
    description: "All of your commitments, now in one place."
  },
  {
    title: "Fully integrated with your Notion workspace",
    description: "See your database items alongside your calendar events."
  },
  {
    title: "Work and life, playing nice",
    description: "Connect multiple calendars to manage work and time together."
  },
  {
    title: "Designed to work with your favorite tools",
    description: "Integrates with Google Calendar and Apple iCloud-synced Calendars."
  }
]

const faqs = [
  {
    question: "Which calendar provider(s) is Notion Calendar compatible with?",
    answer: "Currently, Notion Calendar integrates and syncs with Google Calendar accounts and Apple iCloud-synced Calendars. Adding support for other calendar providers such as Outlook is on our roadmap."
  },
  {
    question: "Is Notion Calendar available on mobile devices?",
    answer: "Yes, Notion Calendar is available for iPhone and Android devices. We're working to make Notion Calendar the best experience on all platforms."
  },
  {
    question: "Does Notion Calendar bring Google Calendar sync to Notion?",
    answer: "Notion Calendar allows you to view your Notion database items alongside your Google Calendar events, offering a streamlined way to see project timelines and task due dates."
  }
]

export default function CalendarProductPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24">
        {/* Hero */}
        <section className="py-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 via-transparent to-transparent" />
          
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
            >
              <Calendar className="h-4 w-4 text-green-500" />
              <span className="text-sm text-muted-foreground">Notion Calendar</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6"
            >
              It&apos;s <span className="text-green-500">time.</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10"
            >
              All of your commitments, now in one place. Meet the beautifully designed, 
              fully integrated calendar for your work and life.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button size="lg" className="bg-gradient-to-r from-green-500 to-green-600">
                Get Notion Calendar free
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-xl p-8"
                >
                  <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Platforms */}
        <section className="py-20 bg-gradient-to-b from-transparent via-green-500/5 to-transparent">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-foreground mb-12"
            >
              Get Notion Calendar for free
            </motion.h2>

            <div className="grid sm:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="glass-card rounded-xl p-8 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                  <Laptop className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Desktop App</h3>
                <p className="text-muted-foreground mb-4">Available for Mac and Windows</p>
                <Button variant="outline" className="glass-card border-green-500/30">
                  Download
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="glass-card rounded-xl p-8 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Mobile App</h3>
                <p className="text-muted-foreground mb-4">Available on iOS and Android</p>
                <div className="flex gap-2 justify-center">
                  <Button variant="outline" size="sm" className="glass-card border-green-500/30">
                    App Store
                  </Button>
                  <Button variant="outline" size="sm" className="glass-card border-green-500/30">
                    Google Play
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-foreground text-center mb-12"
            >
              Frequently asked questions
            </motion.h2>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-xl p-6"
                >
                  <h3 className="text-lg font-semibold text-foreground mb-3">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
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
                Unlock a better way to manage your time
              </h2>
              <Button size="lg" className="bg-gradient-to-r from-green-500 to-green-600">
                Get Notion Calendar free
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
