"use client"

import { motion } from "framer-motion"
import { Shield, Lock, Users, Server, Globe, Zap, ArrowRight, CheckCircle2, Building2, Key, Eye, FileCheck, Headphones, BarChart3, Database, Network } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/notion-os/navbar"
import { Footer } from "@/components/notion-os/footer"
import { PageAIAssistant } from "@/components/notion-os/page-ai-assistant"
import { AIOverviewButton } from "@/components/notion-os/ai-overview-button"
import { VoiceNavAgent } from "@/components/notion-os/voice-nav-agent"

const securityFeatures = [
  { icon: Lock, title: "SSO & SAML", description: "Single sign-on with any SAML 2.0 provider. Enforce authentication policies across your organization." },
  { icon: Key, title: "SCIM Provisioning", description: "Automated user provisioning and deprovisioning via SCIM 2.0 for Okta, Azure AD, and OneLogin." },
  { icon: Shield, title: "SOC 2 Type II", description: "Independently audited security controls. Your data is protected by enterprise-grade infrastructure." },
  { icon: Eye, title: "Audit Log", description: "Complete visibility into workspace activity. Track page views, edits, permission changes, and exports." },
  { icon: FileCheck, title: "HIPAA Compliance", description: "BAA available for healthcare organizations. Notion meets strict requirements for protected health information." },
  { icon: Database, title: "Data Residency", description: "Choose where your data lives. US and EU data residency options for regulatory compliance." },
]

const enterpriseFeatures = [
  { icon: Users, title: "Advanced Permissions", description: "Granular control over who can view, edit, or share content. Teamspace-level and page-level permissions." },
  { icon: Network, title: "Managed Users", description: "Claim domains, manage members, and enforce security policies from a centralized admin dashboard." },
  { icon: Server, title: "99.9% SLA", description: "Guaranteed uptime with enterprise-grade reliability. Priority support and dedicated success managers." },
  { icon: Headphones, title: "Dedicated Support", description: "Named customer success manager, priority ticket routing, and custom onboarding for your organization." },
  { icon: BarChart3, title: "Analytics Dashboard", description: "Workspace analytics showing content engagement, member activity, and adoption metrics." },
  { icon: Globe, title: "Custom Branding", description: "White-label your workspace with custom logos, domains, and branded templates for your organization." },
]

const companies = [
  "OpenAI", "Figma", "Ramp", "NVIDIA", "Volvo", "L&apos;Oreal", "Discord", "Vercel",
  "Cursor", "DoorDash", "Headspace", "Loom", "Notion", "Pixar", "Spotify",
]

const stats = [
  { value: "100M+", label: "Users worldwide" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "SOC 2", label: "Type II certified" },
  { value: "24/7", label: "Priority support" },
]

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6 },
}

export default function EnterprisePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#0d1339] to-background" />
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(99, 102, 241, 0.2) 1px, transparent 0)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* Shield glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px]" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeUp}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-mono mb-8">
              <Shield className="w-4 h-4" />
              Enterprise-Grade Security
            </div>
          </motion.div>

          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight text-balance"
          >
            Built for the world&apos;s{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              most ambitious
            </span>{" "}
            teams
          </motion.h1>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10 text-pretty"
          >
            Advanced security, compliance, and administration tools to run
            Notion at scale. Trusted by teams from 100 to 100,000+.
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              className="bg-white text-black hover:bg-white/90 font-semibold px-8 h-12 rounded-lg shadow-lg shadow-white/10"
            >
              Contact sales
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/5 border-white/20 text-white hover:bg-white/10 px-8 h-12 rounded-lg backdrop-blur-sm"
            >
              Request a demo
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative py-12 border-y border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-white/40">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Compliance */}
      <section className="relative py-24">
        <AIOverviewButton
          sectionId="security"
          sectionTitle="Security & Compliance"
          sectionContext="Enterprise security features including SSO, SAML, SCIM provisioning, SOC 2, HIPAA, audit logs, and data residency."
        />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Security &amp; compliance at every layer
            </h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              Enterprise-grade security controls, compliance certifications, and data governance tools to meet the strictest requirements.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {securityFeatures.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group p-6 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-cyan-500/20 hover:bg-white/[0.05] transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4 group-hover:bg-cyan-500/15 transition-colors">
                  <feature.icon className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Features */}
      <section className="relative py-24 border-t border-white/5">
        <AIOverviewButton
          sectionId="features"
          sectionTitle="Enterprise Features"
          sectionContext="Advanced enterprise features: managed users, permissions, 99.9% SLA, dedicated support, analytics, and custom branding."
          position="top-left"
        />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Everything your team needs at scale
            </h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              Administration tools, advanced permissions, and dedicated support designed for organizations of every size.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {enterpriseFeatures.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group p-6 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-purple-500/20 hover:bg-white/[0.05] transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4 group-hover:bg-purple-500/15 transition-colors">
                  <feature.icon className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="relative py-20 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="text-2xl font-bold text-white mb-3">
              Trusted by industry leaders
            </h2>
            <p className="text-white/40">
              From startups to Fortune 500 companies
            </p>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6"
          >
            {companies.map((company, i) => (
              <motion.span
                key={company}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.5 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.04 }}
                whileHover={{ opacity: 1 }}
                className="text-sm font-semibold text-white/40 hover:text-white/80 tracking-wide cursor-default transition-colors"
              >
                {company}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.02] to-transparent" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeUp}>
            <div className="p-10 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm">
              <Building2 className="w-12 h-12 text-cyan-400 mx-auto mb-6" />
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to scale with Notion?
              </h2>
              <p className="text-lg text-white/50 mb-8 max-w-lg mx-auto">
                Talk to our sales team to learn how Notion can power your
                organization with security, compliance, and AI.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-white/90 font-semibold px-8 h-12 rounded-lg"
                >
                  Contact sales
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/5 border-white/20 text-white hover:bg-white/10 px-8 h-12 rounded-lg"
                >
                  View pricing
                </Button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 mt-8 text-sm text-white/40">
                {["No credit card required", "Free trial available", "Cancel anytime"].map((item) => (
                  <div key={item} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      <PageAIAssistant
        pageName="Enterprise"
        accentColor="cyan"
        pageContext="Notion Enterprise page. Security: SSO/SAML, SCIM provisioning, SOC 2 Type II, HIPAA, audit logs, data residency. Features: advanced permissions, managed users, 99.9% SLA, dedicated support, analytics dashboard, custom branding. Trusted by 100M+ users including OpenAI, Figma, NVIDIA, Vercel, Spotify. Custom pricing with 24/7 priority support."
      />
      <VoiceNavAgent />
    </div>
  )
}
