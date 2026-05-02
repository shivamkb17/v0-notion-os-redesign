"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown, Sparkles, FileText, FolderKanban, Calendar, Globe, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"

const products = [
  { name: "Notion AI", description: "Your AI-powered assistant", icon: Sparkles, href: "/product/ai" },
  { name: "Docs", description: "Write & collaborate", icon: FileText, href: "/product/docs" },
  { name: "Projects", description: "Manage any project", icon: FolderKanban, href: "/product/projects" },
  { name: "Calendar", description: "Time management", icon: Calendar, href: "/product/calendar" },
  { name: "Sites", description: "Publish anything", icon: Globe, href: "/product/sites" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-40 glass"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center transition-all group-hover:glow-primary">
              <span className="text-sm font-bold text-primary-foreground">N</span>
            </div>
            <span className="text-lg font-semibold text-foreground">Notion</span>
            <span className="text-xs font-mono text-primary px-1.5 py-0.5 rounded bg-primary/10 border border-primary/20">OS</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {/* Product Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("product")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                Product
                <ChevronDown className="h-4 w-4" />
              </button>
              <AnimatePresence>
                {activeDropdown === "product" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 w-72 p-2 glass-card rounded-xl mt-1"
                  >
                    {products.map((product) => (
                      <Link
                        key={product.name}
                        href={product.href}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors group"
                      >
                        <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <product.icon className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-foreground">{product.name}</div>
                          <div className="text-xs text-muted-foreground">{product.description}</div>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/pricing" className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link href="/templates" className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              Templates
            </Link>
            <Link href="/enterprise" className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              Enterprise
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              Log in
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity glow-primary">
              <Bot className="h-4 w-4 mr-2" />
              Get Notion free
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-muted-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-card border-t border-border"
          >
            <div className="p-4 space-y-4">
              <div className="space-y-2">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3">Product</div>
                {products.map((product) => (
                  <Link
                    key={product.name}
                    href={product.href}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <product.icon className="h-4 w-4 text-primary" />
                    <span className="text-sm text-foreground">{product.name}</span>
                  </Link>
                ))}
              </div>
              <div className="border-t border-border pt-4 space-y-2">
                <Link href="/pricing" className="block px-3 py-2 text-sm text-foreground" onClick={() => setIsOpen(false)}>
                  Pricing
                </Link>
                <Link href="/templates" className="block px-3 py-2 text-sm text-foreground" onClick={() => setIsOpen(false)}>
                  Templates
                </Link>
              </div>
              <div className="border-t border-border pt-4 flex flex-col gap-2">
                <Button variant="outline" className="w-full">Log in</Button>
                <Button className="w-full bg-gradient-to-r from-primary to-accent">Get Notion free</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
