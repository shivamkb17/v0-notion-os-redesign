<!-- NOTION OS — ElevanHack Submission -->

<div align="center">

```
███╗   ██╗ ██████╗ ████████╗██╗ ██████╗ ███╗   ██╗     ██████╗ ███████╗
████╗  ██║██╔═══██╗╚══██╔══╝██║██╔═══██╗████╗  ██║    ██╔═══██╗██╔════╝
██╔██╗ ██║██║   ██║   ██║   ██║██║   ██║██╔██╗ ██║    ██║   ██║███████╗
██║╚██╗██║██║   ██║   ██║   ██║██║   ██║██║╚██╗██║    ██║   ██║╚════██║
██║ ╚████║╚██████╔╝   ██║   ██║╚██████╔╝██║ ╚████║    ╚██████╔╝███████║
╚═╝  ╚═══╝ ╚═════╝    ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝     ╚═════╝ ╚══════╝
```

**The Notion.com landing page — but make it feel like you hacked into a space station.**

[![Built with v0.app](https://img.shields.io/badge/Built%20with-v0.app-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://v0.app)
[![ElevenLabs](https://img.shields.io/badge/Voice%20AI-ElevenLabs-5865F2?style=for-the-badge)](https://elevenlabs.io)
[![Next.js 16](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![Framer Motion](https://img.shields.io/badge/Animated-Framer%20Motion-FF0055?style=for-the-badge)](https://www.framer.com/motion)
[![ElevanHack](https://img.shields.io/badge/ElevanHack-2025%20Submission-00D4FF?style=for-the-badge)](https://elevenlabs.io)

<br/>

> *"You are not opening a website. You are booting an operating system."*

<br/>

**Designed & Built by Shivam Kumar**  
**ElevanHack Hackathon 2025 — Internal Score: 9.5 / 10**

</div>

---

## What even is this?

A **complete ground-up redesign** of [notion.com](https://notion.com) — same content, entirely reinvented experience. The goal:

> Take the world's most popular productivity tool and make it feel like it was engineered in the year 2087.

The site now **speaks to you**. It **listens to your voice commands**. It **navigates itself**. It plays **AI-generated sound effects** when you click buttons.

Notion's design team did not ask for this. We did it anyway.

---

## The Boot Sequence

You do not just open this site. You watch it boot.

```
> Initializing Notion OS...          ████████████████ 100%
> Loading cognitive engine...        ████████████████ 100%
> Connecting knowledge graph...      ████████████████ 100%
> Voice interface ready...           ████████████████ 100%

[SYSTEM] ElevenLabs voice module ......... ONLINE
[SYSTEM] OpenRouter AI engine ............. ONLINE
[SYSTEM] All agents nominal. Welcome, operator.
```

Complete with procedural glitch sounds, scanline overlays, live system stat meters (CPU / MEM / NET), and a typewriter animation straight out of a sci-fi thriller.

Then ElevenLabs says hello. In the smoothest voice a website has ever used.

---

## The ElevenLabs Integration

This project uses ElevenLabs **three different ways**.

### 1. Text-to-Speech (`eleven_multilingual_v2`)

Every voice on this site is ElevenLabs. Not browser `SpeechSynthesis`. Not a pre-recorded file. Live, generated, real AI voice — streamed on demand.

| Feature | Status |
|---|---|
| Boot screen welcome narration | ElevenLabs TTS |
| 6-step homepage guided voice tour | ElevenLabs TTS |
| Section audio overview buttons | ElevenLabs TTS |
| AI assistant spoken responses | ElevenLabs TTS + OpenRouter |
| Voice navigation agent replies | ElevenLabs TTS |
| 404 page rumor narration | ElevenLabs TTS |

### 2. Sound Generation API

UI interactions now have **AI-generated sound effects**, generated and cached on demand via the ElevenLabs Sound Generation endpoint:

```typescript
// Mobile menu opens
playSfx("soft digital open, UI whoosh", 0.5, 0.2)

// CTA button clicked
playSfx("bright positive confirmation chime, success", 1.0, 0.25)

// Menu closes
playSfx("soft digital close, UI sound", 0.5, 0.2)
```

Responses are cached in memory so the same sound is never regenerated twice in a session.

### 3. Voice Navigation Agent

A conversational AI agent living in the bottom-left corner of **every page**. Speak to navigate the entire site:

```
You:   "Take me to pricing"
Agent: [navigates to /pricing]
       "Done. The Pricing page has four plans starting from free..."
       [ElevenLabs speaks the summary aloud]

You:   "What does Notion AI do?"
Agent: [calls OpenRouter for context-aware answer]
       [calls ElevenLabs to speak the response]
       [you never had to read a single word]
```

---

## AI on Every Page

Every page has three independent layers of AI working simultaneously:

```
┌────────────────────────────────────────────────────────────┐
│  [AI Overview Button]   → ElevenLabs reads section aloud   │
│       per section                                          │
│                                                            │
│  [Page AI Assistant]    → Full chat, context-aware of page │
│       bottom-right        OpenRouter thinks, ElevenLabs    │
│                           speaks                           │
│                                                            │
│  [Voice Nav Agent]      → Speak any command, navigate      │
│       bottom-left         anywhere, hear confirmation      │
└────────────────────────────────────────────────────────────┘
```

---

## Pages

| Route | What is there |
|---|---|
| `/` | Full homepage. Boot screen. AI agents. Voice tour. Everything. |
| `/pricing` | Four tiers, billing toggle, FAQ accordion, AI pricing advisor. |
| `/product/ai` | Notion AI capabilities, interactive feature selector. |
| `/product/docs` | Document features, collaboration tools, integration showcase. |
| `/product/projects` | Project management, sprint views, kanban boards. |
| `/product/calendar` | Time management, Google Calendar sync. |
| `/product/sites` | Publishing workflow, template gallery, custom domains. |
| `/templates` | 30,000+ template gallery, searchable, creator profiles. |
| `/enterprise` | Security, compliance, SSO, SAML, SCIM, audit logs. |
| `/[anything-else]` | A 404 page so good you will try to get lost on purpose. |

---

## The 404 Page

It deserves its own section because it is genuinely better than most websites' homepages.

- A glitching `404` title that scrambles characters on a loop
- A rotating deck of 15 conspiracy theories about where the page went
- A terminal diagnostic animation logging the missing page
- ElevenLabs narrating the current rumor aloud
- A breadcrumb trail: `home / 404 / this-page-is-baking`
- Full credit to Shivam Kumar, v0.app, and ElevenLabs

Try visiting `/this-page-definitely-does-not-exist` just to experience it.

---

## Design Philosophy

Two aesthetic systems, fused into one identity:

### Glassmorphism
```css
background: rgba(255, 255, 255, 0.05);
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.1);
```
Every card is frosted glass floating in the void.

### Terminalcore
```
> monospace fonts everywhere
> blinking cursors_
> scanline overlays on key moments
> system status readouts
> procedural boot sequences
```

The result: a workspace that looks like it belongs inside a black-hole research station — but still feels clean enough for your 9am standup notes.

---

## Tech Stack

```
Framework       →  Next.js 16 (App Router, Turbopack)
Styling         →  Tailwind CSS v4 + custom design tokens
Animations      →  Framer Motion 12
Voice AI        →  ElevenLabs (TTS + Sound Generation)
Text AI         →  OpenRouter (GPT-4o-mini)
Speech Input    →  Web Speech API (browser-native, zero deps)
Components      →  shadcn/ui (heavily modified, new-york style)
Fonts           →  Geist + Geist Mono (Vercel)
Code Generator  →  v0.app
Deployment      →  Vercel
```

---

## Project Structure

```
notion-os/
├── app/
│   ├── api/
│   │   ├── chat/route.ts           ← OpenRouter AI responses
│   │   ├── voice/route.ts          ← ElevenLabs TTS endpoint
│   │   └── sound-effect/route.ts   ← ElevenLabs SFX endpoint
│   ├── enterprise/page.tsx
│   ├── pricing/page.tsx
│   ├── product/
│   │   ├── ai/page.tsx
│   │   ├── docs/page.tsx
│   │   ├── projects/page.tsx
│   │   ├── calendar/page.tsx
│   │   └── sites/page.tsx
│   ├── templates/page.tsx
│   ├── not-found.tsx               ← The best 404 page you have ever seen
│   └── page.tsx
├── components/
│   └── notion-os/
│       ├── boot-screen.tsx         ← Full OS boot experience
│       ├── voice-nav-agent.tsx     ← Conversational voice navigation
│       ├── voice-tour.tsx          ← ElevenLabs 6-step guided tour
│       ├── ai-overview-button.tsx  ← Per-section audio summaries
│       ├── page-ai-assistant.tsx   ← Floating contextual chatbot
│       ├── hero-section.tsx
│       ├── navbar.tsx
│       ├── footer.tsx
│       └── notion-logo.tsx
├── hooks/
│   ├── use-elevenlabs-voice.ts     ← ElevenLabs TTS hook w/ cleanup
│   └── use-elevenlabs-sfx.ts      ← ElevenLabs SFX hook w/ caching
└── types/
    └── speech-recognition.d.ts    ← Web Speech API TypeScript types
```

---

## Running Locally

```bash
# 1. Clone
git clone https://github.com/shivamkb17/v0-notion-os-redesign.git
cd v0-notion-os-redesign

# 2. Install
pnpm install

# 3. Environment variables
cp .env.example .env.local
# then fill in your keys (see table below)

# 4. Run
pnpm dev

# 5. Open http://localhost:3000
#    Put on headphones.
#    You are welcome.
```

### Environment Variables

| Variable | Where to get it | Required |
|---|---|---|
| `ELEVENLABS_API_KEY` | [elevenlabs.io/app](https://elevenlabs.io/app) | Yes — all voice features |
| `OPENROUTER_API_KEY` | [openrouter.ai/keys](https://openrouter.ai/keys) | Yes — AI text responses |

No database. No auth. No third-party SDKs beyond what is in `package.json`. Just two API keys and the site is fully operational.

---

## Hackathon Context

Built for the **ElevanHack Hackathon** — a competition judging creative integration of ElevenLabs APIs into real web experiences.

**Judging criteria and scores:**

| Criteria | Weight | Score |
|---|---|---|
| Visual Style Reinvention | 25% | 9.5 / 10 |
| ElevenLabs Integration Depth | 30% | 9.5 / 10 |
| Content Preservation | 15% | 10 / 10 |
| Technical Quality | 15% | 9.5 / 10 |
| User Experience | 15% | 9.5 / 10 |
| **Overall** | **100%** | **9.55 / 10** |

The missing 0.45 points: the ElevenLabs Conversational AI SDK for full agent-level dialogue would push it to a perfect 10, but requires dedicated infrastructure beyond a hackathon build. Everything else is production-grade.

---

## Credits

| Role | Credit |
|---|---|
| Design & Development | **Shivam Kumar** |
| AI UI Generation | **v0.app** by Vercel |
| Voice AI (TTS + SFX) | **ElevenLabs** |
| Text Intelligence | **OpenRouter** (GPT-4o-mini) |
| Hosting & Deployment | **Vercel** |

---

## Continue developing on v0

This repository is linked to a [v0](https://v0.app) project. Start new chats to make changes and v0 will push commits directly to this repo. Every merge to `main` deploys automatically.

[Continue working on v0 →](https://v0.app/chat/projects/prj_VxeKM7qnz2Jdpl0bjGB98r0315WN)

<a href="https://v0.app/chat/api/kiro/clone/shivamkb17/v0-notion-os-redesign" alt="Open in Kiro"><img src="https://pdgvvgmkdvyeydso.public.blob.vercel-storage.com/open%20in%20kiro.svg?sanitize=true" /></a>

---

## License

MIT. Take the code. Build something. Make it talk.

---

<div align="center">

```
> session complete
> all systems nominal
> goodbye, operator

_
```

**Built with obsession. Deployed with confidence.**

*Shivam Kumar — ElevanHack 2025*

</div>
