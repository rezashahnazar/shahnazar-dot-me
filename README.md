# Shahnazar.me - Personal Website

> Professional personal website for Dr. Reza Shahnazar (رضا شاه‌نظر) - Cardiologist, MD & Software Engineer

🌐 **Live**: [shahnazar.me](https://www.shahnazar.me)

## Overview

Modern, performant personal website built with Next.js 16, featuring bilingual content (Persian/English), AI-powered contextual chatbot, and comprehensive SEO optimization. Showcases professional experience spanning cardiovascular medicine, software engineering, data science, and educational leadership.

## Tech Stack

### Core
- **Framework**: Next.js 16 (App Router, React Server Components)
- **Runtime**: React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4
- **Package Manager**: pnpm 10

### UI & Components
- **Component Library**: Radix UI primitives
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Theming**: next-themes (light/dark mode)
- **Date Handling**: date-fns-jalali (Persian calendar support)

### AI Integration
- **AI SDK**: Vercel AI SDK 4
- **LLM Provider**: OpenAI / OpenRouter
- **Features**: Context-aware chatbot, streaming responses, markdown rendering with syntax highlighting

### SEO & Performance
- **Metadata**: Dynamic Open Graph images, JSON-LD structured data
- **Discovery**: Sitemap, robots.txt, llms.txt
- **Fonts**: Custom local fonts (IRANYekan, Gilroy) for performance
- **i18n**: Full RTL support for Persian content

## Key Features

### 1. Bilingual Content Architecture
- Primary language: Persian (Farsi) with RTL layout
- Secondary language: English for international reach
- Dual identity presentation throughout

### 2. AI-Powered Contextual Chatbot
- Floating chat interface with context awareness
- Streams responses using page content as context
- Markdown rendering with code syntax highlighting
- Remembers conversation history

### 3. Comprehensive SEO Optimization
- **Metadata**: Title templates, descriptions, keywords (EN+FA)
- **Open Graph**: Profile-optimized cards with custom images
- **Twitter Cards**: Summary large image format
- **Structured Data**: Person, Website, ProfilePage schemas with bilingual identity
- **Discovery**: Sitemap.xml, robots.txt, llms.txt for LLM crawlers
- **Canonical URLs**: Proper URL normalization

### 4. Content Sections
- **Hero**: Profile, titles, skills, social links
- **Stats**: Professional milestones (17+ years experience, gold medal, 5 books, 12+ years teaching)
- **Experience**: Detailed work history (Digikala, ZiDoctor, sClass, Biology Olympiad)
- **Education**: Cardiology fellowship, MD, olympiad achievements
- **Publications**: Scientific papers with citations
- **Books**: 5 published books in genetics and biostatistics
- **Teaching**: 12+ years of educational leadership

### 5. Modern UX/UI
- Light/dark theme with system preference detection
- Smooth animations and transitions
- Responsive design (mobile-first)
- Skip links for accessibility
- Background effects (gradient, dots, noise)

## Project Structure

```
shahnazar-dot-me/
├── src/
│   ├── app/
│   │   ├── api/chat/          # AI chatbot API endpoint
│   │   ├── layout.tsx         # Root layout with metadata
│   │   ├── page.tsx           # Homepage
│   │   ├── opengraph-image.tsx # Dynamic OG image
│   │   ├── icon.tsx           # Dynamic favicon
│   │   ├── sitemap.ts         # XML sitemap generator
│   │   ├── robots.ts          # Robots.txt generator
│   │   └── globals.css        # Global styles & CSS variables
│   │
│   ├── components/
│   │   ├── ai-ui/             # Chatbot components
│   │   ├── brand/             # Logo
│   │   ├── effects/           # Background effects, reveal animations
│   │   ├── home/              # Homepage sections (hero, stats, experience, education)
│   │   ├── layout/            # Header, footer, skip link
│   │   ├── seo/               # JSON-LD structured data
│   │   ├── theme/             # Theme provider & toggle
│   │   └── ui/                # Reusable UI primitives (shadcn-style)
│   │
│   ├── config/
│   │   └── site.ts            # Centralized site configuration
│   │
│   ├── fonts/
│   │   ├── IranYekan/         # Persian font files (woff, woff2)
│   │   ├── gilroy/            # English font files
│   │   └── local-fonts.ts     # Font definitions
│   │
│   ├── hooks/
│   │   ├── use-page-content.ts    # Extract page content for chatbot
│   │   ├── use-scroll-control.ts  # Scroll management
│   │   └── use-toast.ts           # Toast notifications
│   │
│   └── lib/
│       ├── opengraph.tsx          # OG image utilities
│       ├── stream-transformers.ts # AI streaming utilities
│       └── utils.ts               # General utilities (cn, etc.)
│
├── public/
│   ├── llms.txt               # LLM crawler metadata
│   ├── profile-image.png      # Profile photo (dark theme)
│   ├── profile-image-light.png # Profile photo (light theme)
│   └── grid.svg               # Background pattern
│
└── config files (eslint, tailwind, tsconfig, etc.)
```

## Getting Started

### Prerequisites
- Node.js 18+ (or latest LTS)
- pnpm 10+

### Installation

```bash
# Clone the repository
git clone https://github.com/rezashahnazar/shahnazar-dot-me.git
cd shahnazar-dot-me

# Install dependencies
pnpm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# OpenAI API (required for chatbot)
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_BASE_URL=https://api.openai.com/v1

# Google Site Verification (optional)
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_verification_code

# Base URL (for production)
NEXT_PUBLIC_BASE_URL=https://www.shahnazar.me
```

### Development

```bash
# Start development server with Turbopack
pnpm dev

# Open http://localhost:3000
```

### Production Build

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

### Code Quality

```bash
# Lint code
pnpm lint

# Type check
pnpm exec tsc -p tsconfig.json --noEmit
```

## Configuration

### Site Configuration

Edit `src/config/site.ts` to customize:
- Personal information (name, titles, bio)
- Social links (GitHub, LinkedIn, Google Scholar, etc.)
- Work experience, education, publications, books
- Teaching history and olympiad achievements
- Site effects (gradient, dots, noise, etc.)

### SEO Configuration

Key SEO elements are in:
- `src/app/layout.tsx`: Global metadata, Open Graph, Twitter cards, robots directives
- `src/components/seo/json-ld.tsx`: Structured data (Person, Website, ProfilePage)
- `src/app/sitemap.ts`: Sitemap generation
- `src/app/robots.ts`: Robots.txt rules
- `public/llms.txt`: LLM crawler metadata

### AI Chatbot Configuration

Chatbot settings in `src/app/api/chat/route.ts`:
- Model selection (default: gpt-4o-mini)
- System prompt (Persian-first, context-aware)
- Streaming configuration
- Rate limits and timeouts

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
vercel --prod
```

Environment variables must be set in Vercel dashboard.

### Other Platforms

Build output is in `.next/` directory. Any Node.js hosting platform supporting Next.js 16+ will work.

## Performance Optimizations

- **Fonts**: Local font files (no external requests)
- **Images**: Next.js Image component with optimization
- **Code Splitting**: Automatic via Next.js App Router
- **Edge Runtime**: API routes use edge runtime for low latency
- **React 19**: Concurrent features for better UX
- **Turbopack**: Fast dev server bundler

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Last 2 versions
- Fallbacks for older browsers via Tailwind

## Contributing

This is a personal website. For suggestions or bug reports, please open an issue.

## License

Copyright 2024 Reza Shahnazar. All rights reserved.

## Contact

- Website: [shahnazar.me](https://www.shahnazar.me)
- Email: reza.shahnazar@gmail.com
- GitHub: [@rezashahnazar](https://github.com/rezashahnazar)
- LinkedIn: [/in/reza-shahnazar](https://www.linkedin.com/in/reza-shahnazar/)
