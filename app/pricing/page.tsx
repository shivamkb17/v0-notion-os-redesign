"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Sparkles, Building2, Users, Zap, ArrowRight, Shield, Globe, HelpCircle, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/notion-os/navbar"
import { Footer } from "@/components/notion-os/footer"
import { PageAIAssistant } from "@/components/notion-os/page-ai-assistant"
import { AIOverviewButton } from "@/components/notion-os/ai-overview-button"
import { VoiceNavAgent } from "@/components/notion-os/voice-nav-agent"

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "per member / month",
    description: "For individuals to organize personal projects and life.",
    icon: Zap,
    gradient: "from-slate-500 to-slate-600",
    glowColor: "shadow-slate-500/10",
    features: [
      "Trial of Notion AI",
      "Basic forms",
      "Basic sites",
      "Notion Calendar",
      "Notion Mail (Syncs with Gmail)",
      "Databases with subtasks & dependencies",
    ],
    cta: "Get started",
    highlighted: false,
  },
  {
    name: "Plus",
    price: "$10",
    period: "per member / month",
    description: "For small teams and professionals to work together.",
    icon: Users,
    gradient: "from-blue-500 to-blue-600",
    glowColor: "shadow-blue-500/20",
    features: [
      "Everything in Free, and:",
      "Trial of Notion AI",
      "Custom forms",
      "Custom sites",
      "Unlimited charts",
      "Unlimited collaborative blocks",
      "Unlimited file uploads",
      "Basic integrations",
    ],
    cta: "Get started",
    highlighted: false,
  },
  {
    name: "Business",
    price: "$20",
    period: "per member / month",
    description: "For growing businesses to streamline teamwork.",
    icon: Building2,
    gradient: "from-cyan-400 to-blue-500",
    glowColor: "shadow-cyan-500/20",
    features: [
      "Everything in Plus, and:",
      "Notion Agent",
      "AI Meeting Notes",
      "Enterprise Search (Beta)",
      "SAML SSO",
      "Granular database permissions",
      "Verify any page",
      "Private teamspaces",
      "Domain verification",
      "Premium integrations",
    ],
    cta: "Get started",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "pricing",
    description: "For organizations with scalability, control, and security needs.",
    icon: Shield,
    gradient: "from-purple-500 to-purple-600",
    glowColor: "shadow-purple-500/20",
    features: [
      "Everything in Business, and:",
      "Zero data retention with LLM providers",
      "User provisioning (SCIM)",
      "Advanced security & controls",
      "Audit log",
      "Customer success manager",
      "Security & Compliance integrations",
      "Domain management",
      "Advanced integrations",
    ],
    cta: "Contact sales",
    highlighted: false,
  },
]

const faqs = [
  {
    q: "Can I use Notion for free?",
    a: "Yes. Notion is free for individuals with unlimited pages, blocks, and the ability to share with up to 10 guests. The Plus plan adds team features starting at $10/member/month."
  },
  {
    q: "How does Notion AI pricing work?",
    a: "Notion AI is included in Business and Enterprise plans. Free and Plus users get a trial. Custom agents cost $10 per 1,000 monthly Notion credits after the trial."
  },
  {
    q: "Can I switch plans anytime?",
    a: "Yes. You can upgrade or downgrade at any time. Upgrades take effect immediately. Downgrades take effect at the end of the current billing period."
  },
  {
    q: "Is there a discount for annual billing?",
    a: "Yes, annual billing saves you up to 20% compared to monthly billing on all paid plans."
  },
]

const trustedLogos = ["OpenAI", "Figma", "Ramp", "Vercel", "NVIDIA", "Discord"]

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual")
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24">
        {/* Hero */}
        <section className="relative py-20 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#0d1339] to-background" />
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute inset-0" style={{
              backgroundImage: "linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)",
              backgroundSize: "80px 80px"
            }} />
          </div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-8"
            >
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <span className="text-sm text-cyan-300">Simple, transparent pricing</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 text-balance"
            >
              One tool to run your{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">entire company.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-6 text-white/40 mt-6 mb-10 flex-wrap"
            >
              <span className="text-sm">Trusted by teams at</span>
              {trustedLogos.map((logo) => (
                <span key={logo} className="text-sm font-medium">{logo}</span>
              ))}
            </motion.div>

            {/* Billing toggle */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-1 p-1 rounded-xl border border-white/10 bg-white/5"
            >
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                  billingCycle === "monthly" ? "bg-white/10 text-white" : "text-white/50 hover:text-white/70"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("annual")}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  billingCycle === "annual" ? "bg-white/10 text-white" : "text-white/50 hover:text-white/70"
                }`}
              >
                Annual
                <span className="text-xs text-cyan-400 font-normal">Save 20%</span>
              </button>
            </motion.div>
          </div>
        </section>

        {/* Pricing cards */}
        <section className="relative py-16">
          <AIOverviewButton
            sectionId="pricing-cards"
            sectionTitle="Pricing Plans"
            sectionContext="Notion offers 4 tiers: Free ($0, for individuals), Plus ($10/mo per member, for small teams), Business ($20/mo per member, recommended, includes AI agents and enterprise search), and Enterprise (custom pricing, advanced security). Annual billing saves 20%."
            position="top-right"
            allowQuestions={true}
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className={`relative rounded-2xl p-[1px] ${
                    plan.highlighted
                      ? "bg-gradient-to-b from-cyan-400 to-blue-500"
                      : "bg-white/10"
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-xs font-semibold rounded-full shadow-lg shadow-cyan-500/30 whitespace-nowrap">
                      Most Popular
                    </div>
                  )}

                  <div className={`h-full rounded-2xl bg-[#0a0a1a] p-6 flex flex-col ${plan.highlighted ? `shadow-xl ${plan.glowColor}` : ""}`}>
                    <div className="mb-6">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center mb-4`}>
                        <plan.icon className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                      <div className="flex items-baseline gap-1 mb-2">
                        <span className="text-3xl font-bold text-white">
                          {plan.price === "Custom" ? "Custom" : billingCycle === "annual" && plan.price !== "$0"
                            ? `$${Math.round(parseInt(plan.price.replace("$", "")) * 0.8)}`
                            : plan.price}
                        </span>
                        <span className="text-sm text-white/40">{plan.period}</span>
                      </div>
                      <p className="text-sm text-white/50">{plan.description}</p>
                    </div>

                    <Button
                      className={`w-full mb-6 ${
                        plan.highlighted
                          ? "bg-gradient-to-r from-cyan-400 to-blue-500 hover:opacity-90 text-white"
                          : "bg-white/10 hover:bg-white/15 text-white border-0"
                      }`}
                    >
                      {plan.cta}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>

                    <div className="space-y-3 flex-1">
                      <p className="text-xs font-medium text-white/30 uppercase tracking-wider">Includes:</p>
                      {plan.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-2.5">
                          <Check className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-white/70">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Custom Agents addon */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-2xl p-[1px] bg-gradient-to-r from-cyan-500/50 via-purple-500/50 to-pink-500/50"
            >
              <div className="rounded-2xl bg-[#0a0a1a] p-10 text-center">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Custom Agents Add-on</h3>
                <p className="text-white/50 mb-6 max-w-xl mx-auto">
                  AI agents handle repetitive tasks autonomously, so your team doesn&apos;t have to.
                  Free to try, then $10 per 1,000 monthly Notion credits.
                </p>
                <Button className="bg-white/10 hover:bg-white/15 text-white border-0">
                  Learn more
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-6xl text-cyan-500/20 font-serif">&ldquo;</div>
              <blockquote className="text-xl md:text-2xl text-white/90 italic mb-6 pt-8 leading-relaxed">
                There&apos;s power in a single platform where you can do all your work out of. Notion is that single place.
              </blockquote>
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                  <span className="text-sm font-bold text-white">N</span>
                </div>
                <div className="text-left">
                  <p className="text-sm text-white font-medium">Nick Erdenberger</p>
                  <p className="text-xs text-white/40">GTM, OpenAI</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="h-6 w-6 text-cyan-400" />
              </div>
              <h2 className="text-3xl font-bold text-white">Frequently asked questions</h2>
            </motion.div>

            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left"
                  >
                    <span className="text-white font-medium pr-4">{faq.q}</span>
                    <ChevronDown className={`h-5 w-5 text-white/40 flex-shrink-0 transition-transform ${openFaq === index ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === index && (
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
      </main>

      <Footer />

      <PageAIAssistant
        pageName="Pricing"
        accentColor="cyan"
        pageContext="Notion pricing page. Free ($0, individuals), Plus ($10/mo, small teams), Business ($20/mo, recommended, includes AI agents, meeting notes, enterprise search, SSO), Enterprise (custom pricing, advanced security, audit log, SCIM). Custom Agents addon: $10/1,000 credits. Annual billing saves 20%. Trusted by OpenAI, Figma, Ramp, NVIDIA."
      />
      <VoiceNavAgent />
    </div>
  )
}
