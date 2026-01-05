# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project: Digital Khalsa Website

A Next.js landing page and marketing website for Digital Khalsa, showcasing the GurBani Finder app and related tools. The site features an interactive emotion-based Gurbani finder demo and waitlist signup functionality.

**Part of the larger GurBani Finder project** - a mobile app that identifies Sikh scripture from audio or images. This website serves as the public-facing landing page.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Netlify

## Development Commands

```bash
# Development
npm run dev                    # Start Next.js dev server (http://localhost:3000)

# Building
npm run build                  # Build for production
npm start                      # Start production server

# Code Quality
npm run lint                   # Lint with Next.js ESLint
```

## Environment Setup

Required environment variables in `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

The `NEXT_PUBLIC_` prefix is required for client-side access in Next.js.

## Architecture Overview

### App Router Structure

This project uses Next.js 13+ App Router (not Pages Router):

```
app/
├── layout.tsx              # Root layout with metadata
├── page.tsx                # Home page (main landing page)
└── globals.css             # Global Tailwind styles
```

### Key Components

**`components/EmotionGurbaniFinder.tsx`**
- Interactive emotion selector (6 emotions: peaceful, grateful, troubled, seeking, hopeful, connected)
- Fetches shabads from Supabase based on selected emotion
- Displays Gurmukhi text with transliteration and English translation
- Client component (`'use client'`) - uses React hooks

**`components/WaitlistForm.tsx`**
- Multi-purpose waitlist signup (testers, donors, notifications)
- Conditional fields based on user intent:
  - Testers: Must select device type (iOS/Android)
  - Donors: Must provide phone/WhatsApp number
  - Notify-only: Just name and email
- Inserts into `user_profiles` table in Supabase
- Client component with form state management

**`lib/supabase.ts`**
- Supabase client initialization
- TypeScript type definitions for database schema:
  - `Shabad`: Core shabad metadata (source, writer, raag, ang)
  - `Line`: Individual verse with Gurmukhi, transliteration, translation
  - `EmotionTag`: Maps emotions to shabads
  - `ShabadWithLines`: Joined type for shabad with related lines

### Database Schema (Supabase)

The website queries these tables:

**`shabads`** - Hymn metadata
- `id`, `source_id`, `writer_id`, `raag_id`, `start_ang`, `end_ang`

**`lines`** - Individual verses
- `id`, `shabad_id`, `gurmukhi`, `transliteration`, `translation_english`, `first_letters`, `first_letters_roman`

**`emotion_tags`** - Emotion-to-shabad mappings
- `id`, `shabad_id`, `emotion` (values: 'peaceful', 'grateful', 'troubled', 'seeking', 'hopeful', 'connected')

**`user_profiles`** - Waitlist signups
- `id`, `first_name`, `email`, `is_tester`, `is_donor`, `device_ios`, `phone_whatsapp`, `referral_code` (auto-generated)

### Styling Conventions

- Uses Tailwind CSS v4 (latest)
- Color palette:
  - Primary: `#000080` (Khalsa blue)
  - Secondary: `#FF9933` (saffron orange)
  - Gradients: `from-[#FF9933] to-[#000080]` or reversed
- Font sizes: `text-4xl md:text-5xl` for headings (responsive)
- Spacing: `py-20` for sections, `max-w-6xl mx-auto` for content containers
- Rounded corners: `rounded-2xl` for cards/sections

## Important Implementation Details

### Client vs Server Components

- **Server Components (default)**: `app/layout.tsx`, `app/page.tsx`
- **Client Components**: All components in `components/` use `'use client'` directive
- Supabase queries in client components run in the browser (uses anon key)

### Supabase Query Patterns

The emotion finder uses nested queries with the Supabase query builder:

```typescript
// 1. Fetch shabad IDs for an emotion
const { data } = await supabase
  .from('emotion_tags')
  .select('shabad_id')
  .eq('emotion', emotion)
  .limit(3);

// 2. Fetch shabads with related lines (join)
const { data } = await supabase
  .from('shabads')
  .select(`
    *,
    lines (*),
    emotion_tags (*)
  `)
  .in('id', shabadIds);
```

### Form Validation Logic

The waitlist form has conditional validation:
- All users: `first_name`, `email`, `purpose` required
- Testers only: `device_type` required
- Donors only: `phone_whatsapp` required
- Email uniqueness check before insert

### TypeScript Configuration

- Path alias: `@/*` maps to project root (use `@/components/Foo` not `../components/Foo`)
- Target: ES2017
- Strict mode enabled
- JSX: `react-jsx` (automatic JSX runtime)

## Common Development Patterns

### Adding a New Page

1. Create `app/new-page/page.tsx`
2. Export default function component
3. Will be accessible at `/new-page`

### Adding a New Component

1. Create `components/MyComponent.tsx`
2. Add `'use client'` if it uses hooks or browser APIs
3. Import in page: `import MyComponent from '@/components/MyComponent'`

### Querying Supabase

```typescript
import { supabase } from '@/lib/supabase';

const { data, error } = await supabase
  .from('table_name')
  .select('*')
  .eq('column', value);

if (error) throw error;
```

## Deployment

The site deploys to Netlify via the Next.js plugin:

- Build command: `npm run build`
- Publish directory: `.next`
- Plugin: `@netlify/plugin-nextjs` (configured in `netlify.toml`)
- Environment variables must be set in Netlify dashboard

## Project Context

This website is part of the larger **GurBani Finder** project:

- **`digital-khalsa-web/`** (this repo): Marketing website and waitlist
- **`gurbani-finder-app/`**: React Native mobile app (Expo)
- **`digital-khalsa-shared/`**: Shared documentation, scripts, database schemas

For detailed project context, see the parent `CLAUDE.md` in the monorepo root.
