import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { VoiceNavAgent } from '@/components/notion-os/voice-nav-agent'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Notion OS - The AI Workspace That Works For You',
  description: 'Your connected workspace where AI agents, docs, projects, and teams come together. Redesigned with Glassmorphism + Terminalcore aesthetics, powered by ElevenLabs voice AI.',
  generator: 'v0.app',
  keywords: ['Notion', 'AI workspace', 'ElevenLabs', 'voice AI', 'productivity', 'project management', 'Glassmorphism'],
  authors: [{ name: 'Shivam Kumar' }],
  creator: 'Shivam Kumar',
  openGraph: {
    type: 'website',
    title: 'Notion OS - The AI Workspace That Works For You',
    description: 'A futuristic redesign of Notion.com with voice-powered AI navigation, ElevenLabs conversational agents, and Glassmorphism + Terminalcore aesthetics. Built with v0.app.',
    siteName: 'Notion OS',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Notion OS - AI Workspace Redesigned',
    description: 'Experience the future of productivity with voice AI, conversational navigation, and a stunning Glassmorphism interface.',
    creator: '@shivamkumar',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        <VoiceNavAgent />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
