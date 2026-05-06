"use client"

import Link from "next/link"
import { Globe, Twitter, Linkedin, Youtube, Github } from "lucide-react"
import { NotionLogo } from "./notion-logo"

const footerLinks = {
  Product: [
    { name: "Notion AI", href: "/product/ai" },
    { name: "Docs", href: "/product/docs" },
    { name: "Projects", href: "/product/projects" },
    { name: "Calendar", href: "/product/calendar" },
    { name: "Sites", href: "/product/sites" },
  ],
  Solutions: [
    { name: "Enterprise", href: "/enterprise" },
    { name: "Small Business", href: "https://www.notion.so/teams", external: true },
    { name: "Personal", href: "https://www.notion.so/personal", external: true },
    { name: "Remote Work", href: "https://www.notion.so/remote", external: true },
    { name: "Startups", href: "https://www.notion.so/startups", external: true },
  ],
  Resources: [
    { name: "Templates", href: "/templates" },
    { name: "Help Center", href: "https://www.notion.so/help", external: true },
    { name: "Guides", href: "https://www.notion.so/guides", external: true },
    { name: "API Docs", href: "https://developers.notion.com", external: true },
    { name: "Community", href: "https://www.notion.so/community", external: true },
  ],
  Company: [
    { name: "About", href: "https://www.notion.so/about", external: true },
    { name: "Careers", href: "https://www.notion.so/careers", external: true },
    { name: "Blog", href: "https://www.notion.so/blog", external: true },
    { name: "Press", href: "https://www.notion.so/press", external: true },
    { name: "Pricing", href: "/pricing" },
  ],
}

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com/notionhq", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com/company/notionhq", label: "LinkedIn" },
  { icon: Youtube, href: "https://youtube.com/notionhq", label: "YouTube" },
  { icon: Github, href: "https://github.com/makenotion", label: "GitHub" },
]

export function Footer() {
  return (
    <footer className="relative border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* Logo and description */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-8 lg:mb-0">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <NotionLogo size="sm" variant="full" />
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              The AI workspace that works for you.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-foreground mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>&copy; {new Date().getFullYear()} Notion Labs, Inc.</span>
            <span className="hidden sm:inline">·</span>
            <a href="https://www.notion.so/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Privacy</a>
            <a href="https://www.notion.so/terms" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Terms</a>
            <a href="https://www.notion.so/security" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Security</a>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Globe className="h-4 w-4" />
            <span>English (US)</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
