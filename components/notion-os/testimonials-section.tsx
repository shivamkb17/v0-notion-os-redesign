"use client"

import { motion } from "framer-motion"
import { Quote, Star, Users, Award, TrendingUp } from "lucide-react"

const testimonials = [
  {
    quote: "There's power in a single platform where you can do all your work. Notion is that single place.",
    author: "OpenAI Team",
    role: "GTM",
    highlight: true
  },
  {
    quote: "Agents get created in three minutes between meetings, then hours of manual operational work disappear.",
    author: "Ben Levick",
    role: "Head of AI & Operations, Ramp"
  },
  {
    quote: "Notion understands that you can solve a lot of problems with one tool.",
    author: "Product Team",
    role: "Tech Company"
  },
  {
    quote: "Notion has been the most powerful and impactful way to streamline our workflow.",
    author: "Operations Lead",
    role: "Enterprise"
  },
  {
    quote: "Using the most AI-native tools like Notion is an important competitive advantage for us.",
    author: "CTO",
    role: "Startup"
  }
]

const stats = [
  { icon: Users, value: "100M+", label: "Users worldwide" },
  { icon: Award, value: "#1", label: "Knowledge base 3 years running" },
  { icon: TrendingUp, value: "62%", label: "of Fortune 100" },
  { icon: Star, value: "1.4M+", label: "Community members" }
]

export function TestimonialsSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-accent/5" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Trusted by teams that <span className="text-primary text-glow">ship.</span>
          </h2>
        </motion.div>

        {/* Featured testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-card rounded-2xl p-8 mb-12 glow-primary"
        >
          <Quote className="h-10 w-10 text-primary mb-6" />
          <blockquote className="text-2xl md:text-3xl font-medium text-foreground mb-6 text-balance">
            {testimonials[0].quote}
          </blockquote>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-lg font-bold text-white">O</span>
            </div>
            <div>
              <div className="font-semibold text-foreground">{testimonials[0].author}</div>
              <div className="text-sm text-muted-foreground">{testimonials[0].role}</div>
            </div>
          </div>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {testimonials.slice(1).map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="glass-card rounded-xl p-6"
            >
              <Quote className="h-6 w-6 text-primary/50 mb-4" />
              <blockquote className="text-foreground mb-4 text-pretty">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-xs font-bold text-muted-foreground">
                    {testimonial.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">{testimonial.author}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
