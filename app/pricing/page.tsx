"use client"

import { motion } from "framer-motion"
import { Check, Sparkles, Building2, Users, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/notion-os/navbar"
import { Footer } from "@/components/notion-os/footer"

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "per member / month",
    description: "For individuals to organize personal projects and life.",
    icon: Zap,
    features: [
      "Trial of Notion AI",
      "Basic forms",
      "Basic sites",
      "Notion Calendar",
      "Notion Mail (Syncs with Gmail)",
      "Databases with subtasks & dependencies",
    ],
    cta: "Get started",
    variant: "outline" as const,
  },
  {
    name: "Plus",
    price: "$10",
    period: "per member / month",
    description: "For small teams and professionals to work together.",
    icon: Users,
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
    variant: "outline" as const,
  },
  {
    name: "Business",
    price: "$20",
    period: "per member / month",
    description: "For growing businesses to streamline teamwork.",
    icon: Building2,
    recommended: true,
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
    variant: "default" as const,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "pricing",
    description: "For organizations with scalability, control, and security needs.",
    icon: Building2,
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
    variant: "outline" as const,
  },
]

const trustedLogos = ["OpenAI", "Figma", "Toyota", "Nike", "Pixar", "Netflix"]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24">
        {/* Header */}
        <section className="py-16 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance"
            >
              One tool to run your <span className="text-primary text-glow">company.</span>
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground mt-8"
            >
              <span className="text-sm">Trusted by teams at</span>
              {trustedLogos.map((logo) => (
                <span key={logo} className="text-sm font-medium opacity-60">{logo}</span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Pricing cards */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`glass-card rounded-2xl p-6 relative ${
                    plan.recommended ? "ring-2 ring-primary glow-primary" : ""
                  }`}
                >
                  {plan.recommended && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                      Recommended
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <plan.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                      <span className="text-sm text-muted-foreground">{plan.period}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </div>

                  <Button 
                    className={`w-full mb-6 ${
                      plan.recommended 
                        ? "bg-gradient-to-r from-primary to-accent hover:opacity-90" 
                        : ""
                    }`}
                    variant={plan.variant}
                  >
                    {plan.cta}
                  </Button>

                  <div className="space-y-3">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Includes:</p>
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Custom Agents addon */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card rounded-2xl p-8 text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Custom Agents</h3>
              <p className="text-muted-foreground mb-4 max-w-xl mx-auto">
                AI agents handle repetitive tasks autonomously, so your team doesn&apos;t have to. 
                Free to try, then $10 per 1,000 monthly Notion credits.
              </p>
              <Button variant="outline" className="glass-card border-primary/30">
                Learn more
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Quote */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.blockquote
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xl md:text-2xl text-foreground italic mb-4"
            >
              &ldquo;There&apos;s power in a single platform where you can do all your work out of. Notion is that single place.&rdquo;
            </motion.blockquote>
            <p className="text-muted-foreground">Nick Erdenberger, GTM, OpenAI</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
