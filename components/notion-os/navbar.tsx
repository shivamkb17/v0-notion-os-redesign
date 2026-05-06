"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown, Sparkles, FileText, FolderKanban, Calendar, Globe, Bot, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NotionLogo } from "./notion-logo"

const products = [
  { name: "Notion AI", description: "Your AI-powered assistant", icon: Sparkles, href: "/product/ai" },
  { name: "Docs", description: "Write & collaborate", icon: FileText, href: "/product/docs" },
  { name: "Projects", description: "Manage any project", icon: FolderKanban, href: "/product/projects" },
  { name: "Calendar", description: "Time management", icon: Calendar, href: "/product/calendar" },
  { name: "Sites", description: "Publish anything", icon: Globe, href: "/product/sites" },
]

const navLinks = [
  { name: "Pricing", href: "/pricing" },
  { name: "Templates", href: "/templates" },
  { name: "Enterprise", href: "/enterprise" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileProductOpen, setMobileProductOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  // Track scroll for solid background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
    setDropdownOpen(false)
    setMobileProductOpen(false)
  }, [pathname])

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  const isActive = (href: string) => pathname === href
  const isProductActive = products.some(p => pathname.startsWith(p.href))

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isOpen
          ? "bg-[#0a0e1a]/95 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20"
          : "bg-[#0a0e1a]/70 backdrop-blur-md border-b border-white/5"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="Notion OS Home">
            <NotionLogo size="sm" variant="full" />
            <span className="text-[10px] font-mono font-semibold tracking-wider text-cyan-400 px-1.5 py-0.5 rounded bg-cyan-400/10 border border-cyan-400/20 uppercase">
              OS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-0.5" role="menubar">
            {/* Product Dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setDropdownOpen(!dropdownOpen) } }}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
                className={`flex items-center gap-1 px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isProductActive
                    ? "text-white bg-white/10"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                Product
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-80 mt-2 p-2 rounded-xl bg-[#0d1224]/98 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/40"
                    role="menu"
                  >
                    {products.map((product) => (
                      <Link
                        key={product.name}
                        href={product.href}
                        role="menuitem"
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 group ${
                          isActive(product.href)
                            ? "bg-cyan-500/10 text-white"
                            : "hover:bg-white/5 text-white/80 hover:text-white"
                        }`}
                        onClick={() => setDropdownOpen(false)}
                      >
                        <div className={`p-2 rounded-lg transition-colors duration-150 ${
                          isActive(product.href)
                            ? "bg-cyan-500/20 text-cyan-400"
                            : "bg-white/5 text-white/60 group-hover:bg-cyan-500/15 group-hover:text-cyan-400"
                        }`}>
                          <product.icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium">{product.name}</div>
                          <div className="text-xs text-white/40">{product.description}</div>
                        </div>
                        <ChevronRight className="h-3.5 w-3.5 text-white/20 group-hover:text-white/40 transition-colors" />
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive(link.href)
                    ? "text-white bg-white/10"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Buttons - Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-white/70 hover:text-white hover:bg-white/5 font-medium"
            >
              Log in
            </Button>
            <Button
              size="sm"
              className="bg-white text-black hover:bg-white/90 font-semibold px-4 shadow-lg shadow-white/10"
            >
              Get Notion free
              <ChevronRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden relative z-50 p-2 -mr-2 rounded-lg text-white/80 hover:text-white hover:bg-white/5 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 top-16 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            {/* Menu panel */}
            <motion.div
              id="mobile-menu"
              role="menu"
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-16 right-0 bottom-0 w-full sm:w-80 bg-[#0a0e1a]/98 backdrop-blur-xl border-l border-white/10 lg:hidden overflow-y-auto"
            >
              <div className="flex flex-col p-5 gap-1">
                {/* Product Accordion */}
                <div>
                  <button
                    onClick={() => setMobileProductOpen(!mobileProductOpen)}
                    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-medium transition-all ${
                      isProductActive
                        ? "text-white bg-white/10"
                        : "text-white/80 hover:text-white hover:bg-white/5"
                    }`}
                    aria-expanded={mobileProductOpen}
                  >
                    <span>Product</span>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileProductOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {mobileProductOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-2 pt-1 pb-2 space-y-0.5">
                          {products.map((product) => (
                            <Link
                              key={product.name}
                              href={product.href}
                              role="menuitem"
                              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                                isActive(product.href)
                                  ? "bg-cyan-500/10 text-white"
                                  : "text-white/70 hover:text-white hover:bg-white/5"
                              }`}
                              onClick={() => setIsOpen(false)}
                            >
                              <div className={`p-2 rounded-lg ${
                                isActive(product.href)
                                  ? "bg-cyan-500/20 text-cyan-400"
                                  : "bg-white/5 text-white/50"
                              }`}>
                                <product.icon className="h-4 w-4" />
                              </div>
                              <div>
                                <div className="text-sm font-medium">{product.name}</div>
                                <div className="text-xs text-white/40">{product.description}</div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Nav Links */}
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    role="menuitem"
                    className={`px-4 py-3.5 rounded-xl text-base font-medium transition-all ${
                      isActive(link.href)
                        ? "text-white bg-white/10"
                        : "text-white/80 hover:text-white hover:bg-white/5"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}

                {/* Divider */}
                <div className="my-3 border-t border-white/10" />

                {/* CTA Buttons */}
                <div className="flex flex-col gap-2.5 px-1">
                  <Button
                    variant="outline"
                    className="w-full h-12 text-base font-medium border-white/15 text-white hover:bg-white/5 hover:text-white rounded-xl"
                  >
                    Log in
                  </Button>
                  <Button
                    className="w-full h-12 text-base font-semibold bg-white text-black hover:bg-white/90 rounded-xl shadow-lg shadow-white/10"
                  >
                    Get Notion free
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}
