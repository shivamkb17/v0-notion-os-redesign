"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Clock, Laptop, Smartphone, ChevronDown, ArrowRight, Zap, Link2, Globe, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/notion-os/navbar"
import { Footer } from "@/components/notion-os/footer"
import { PageAIAssistant } from "@/components/notion-os/page-ai-assistant"
import { AIOverviewButton } from "@/components/notion-os/ai-overview-button"
import { VoiceNavAgent } from "@/components/notion-os/voice-nav-agent"

const features = [
  {
    icon: Clock,
    title: "Time management, simplified",
    description: "All of your commitments, now in one place. Meetings, tasks, and database items side by side."
  },
  {
    icon: Link2,
    title: "Fully integrated with Notion",
    description: "See your database items alongside your calendar events. Never miss a deadline."
  },
  {
    icon: Globe,
    title: "Work and life, playing nice",
    description: "Connect multiple calendars to manage work and personal time together."
  },
  {
    icon: Zap,
    title: "Works with your favorite tools",
    description: "Integrates with Google Calendar and Apple iCloud-synced Calendars."
  }
]

const faqs = [
  {
    q: "Which calendar provider(s) is Notion Calendar compatible with?",
    a: "Currently, Notion Calendar integrates and syncs with Google Calendar accounts and Apple iCloud-synced Calendars. Adding support for other calendar providers such as Outlook is on our roadmap."
  },
  {
    q: "Is Notion Calendar available on mobile devices?",
    a: "Yes, Notion Calendar is available for iPhone and Android devices. We're working to make Notion Calendar the best experience on all platforms."
  },
  {
    q: "Does Notion Calendar bring Google Calendar sync to Notion?",
    a: "Notion Calendar allows you to view your Notion database items alongside your Google Calendar events, offering a streamlined way to see project timelines and task due dates."
  },
  {
    q: "Is Notion Calendar free?",
    a: "Yes, Notion Calendar is completely free for all users. Download it on Mac, Windows, iOS, and Android."
  }
]

export default function CalendarProductPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24">
        {/* Hero */}
        <section className="relative py-24 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#061a14] via-[#0a2a1e] to-background" />
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute inset-0" style={{
              backgroundImage: "linear-gradient(rgba(34, 197, 94, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 197, 94, 0.3) 1px, transparent 1px)",
              backgroundSize: "64px 64px"
            }} />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-green-500/10 rounded-full blur-[120px]" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/20 bg-green-500/5 mb-8"
            >
              <Calendar className="h-4 w-4 text-green-400" />
              <span className="text-sm text-green-300">Notion Calendar</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6"
            >
              It&apos;s{" "}
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">time.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              All of your commitments, now in one place. Meet the beautifully designed,
              fully integrated calendar for your work and life.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Button size="lg" className="bg-gradient-to-r from-green-500 to-emerald-500 hover:opacity-90 text-white shadow-lg shadow-green-500/20">
                Get Notion Calendar free
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section className="relative py-24">
          <AIOverviewButton
            sectionId="calendar-features"
            sectionTitle="Calendar Features"
            sectionContext="Notion Calendar features: unified time management, Notion workspace integration (database items alongside events), multi-calendar support for work and personal life, and compatibility with Google Calendar and Apple iCloud."
            position="top-right"
            allowQuestions={true}
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-4">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4, backgroundColor: "rgba(255,255,255,0.04)" }}
                  className="rounded-xl border border-white/10 bg-white/[0.02] p-8 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
                    <f.icon className="h-5 w-5 text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{f.title}</h3>
                  <p className="text-white/40 leading-relaxed">{f.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Platforms */}
        <section className="relative py-24">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/[0.03] to-transparent" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-white mb-16"
            >
              Get Notion Calendar for free
            </motion.h2>

            <div className="grid sm:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl p-[1px] bg-gradient-to-b from-green-500/30 to-transparent"
              >
                <div className="rounded-2xl bg-[#0a0a1a] p-8 text-center h-full">
                  <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                    <Laptop className="h-8 w-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Desktop App</h3>
                  <p className="text-white/40 mb-6">Available for Mac and Windows</p>
                  <Button className="bg-white/10 hover:bg-white/15 text-white border-0">
                    Download
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="rounded-2xl p-[1px] bg-gradient-to-b from-green-500/30 to-transparent"
              >
                <div className="rounded-2xl bg-[#0a0a1a] p-8 text-center h-full">
                  <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                    <Smartphone className="h-8 w-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Mobile App</h3>
                  <p className="text-white/40 mb-6">Available on iOS and Android</p>
                  <div className="flex gap-3 justify-center">
                    <Button size="sm" className="bg-white/10 hover:bg-white/15 text-white border-0">App Store</Button>
                    <Button size="sm" className="bg-white/10 hover:bg-white/15 text-white border-0">Google Play</Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-white text-center mb-12"
            >
              Frequently asked questions
            </motion.h2>

            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left"
                  >
                    <span className="text-white font-medium pr-4">{faq.q}</span>
                    <ChevronDown className={`h-5 w-5 text-white/40 flex-shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-4 text-sm text-white/50 leading-relaxed">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
              className="rounded-2xl p-[1px] bg-gradient-to-r from-green-500/50 to-emerald-500/50"
            >
              <div className="rounded-2xl bg-[#0a0a1a] px-10 py-14">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Unlock a better way to manage your time
                </h2>
                <p className="text-white/40 mb-8">Free for everyone. Download today.</p>
                <Button size="lg" className="bg-gradient-to-r from-green-500 to-emerald-500 hover:opacity-90 text-white shadow-lg shadow-green-500/20">
                  Get Notion Calendar free
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />

      <PageAIAssistant
        pageName="Notion Calendar"
        accentColor="green"
        pageContext="Notion Calendar product page. Features: unified time management, Notion workspace integration (database items alongside events), multi-calendar support (work + personal), Google Calendar and Apple iCloud sync. Available on Mac, Windows, iOS, and Android. Completely free for all users."
      />
      <VoiceNavAgent />
    </div>
  )
}
