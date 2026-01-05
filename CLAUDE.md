# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project: Digital Khalsa Website

A Next.js landing page and marketing website for Digital Khalsa, showcasing the GurBani Finder app and related tools. The site features:
- Interactive emotion-based Gurbani finder demo
- Waitlist signup functionality
- **Live gurdwara streaming aggregator** (watch kirtan/katha from worldwide)
- Transparency page with changelog and development tracking

**Part of the larger GurBani Finder project** - a mobile app that identifies Sikh scripture from audio or images. This website serves as the public-facing landing page.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Netlify
- **Automation**: n8n (stream discovery and monitoring)

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
├── layout.tsx              # Root layout with metadata, Navigation, Footer, launch banner
├── page.tsx                # Home page (hero + feature highlights)
├── about/                  # About the project and team
├── features/               # Interactive demo of GurBani Finder features
├── resources/              # Educational resources
├── streams/
│   ├── page.tsx           # Live streams grid (server component with revalidation)
│   └── [id]/page.tsx      # Individual stream player page
├── transparency/           # Changelog, timesheet, feature requests
├── waitlist/               # Waitlist signup form
└── globals.css             # Global Tailwind styles
```

### Key Features

#### 1. Gurdwara Live Streaming (NEW)

**Purpose:** Anonymous users can discover and watch live kirtan/katha streams from gurdwaras worldwide. Streams are automatically discovered via n8n automation and catalogued for future analysis.

**Database Schema:**
- `gurdwaras` - Gurdwara metadata (name, location, contact info, social links)
- `streams` - Stream URLs and metadata (platform, status, viewer count, program type)
- RLS policies: Anonymous users can only view live streams; authenticated users see all

**Query Patterns:**
```typescript
// Fetch live streams with gurdwara info (join)
const { data } = await supabase
  .from('streams')
  .select(`
    *,
    gurdwara:gurdwaras(*)
  `)
  .eq('is_live', true)
  .order('viewer_count', { ascending: false });
```

**Key Files:**
- `lib/streams.ts` - Helper functions for fetching streams and gurdwaras
- `components/StreamCard.tsx` - Stream preview card with thumbnail, location, viewer count
- `components/StreamPlayer.tsx` - Embedded video player (YouTube/Facebook)
- `app/streams/page.tsx` - Server component with `revalidate: 30` (auto-refresh every 30s)
- `supabase/migrations/20260105_gurdwara_streaming.sql` - Database schema with triggers
- `docs/gurdwara-streaming-spec.md` - Full technical specification

**Server Component Caching:**
The streams page uses Next.js ISR (Incremental Static Regeneration) with `revalidate: 30` to balance freshness and performance. Streams update every 30 seconds without client-side polling.

#### 2. Emotion-Based Gurbani Finder

**Components:**
- `components/EmotionGurbaniFinder.tsx` - Interactive emotion selector (6 emotions)
- Fetches shabads from Supabase based on selected emotion
- Displays Gurmukhi text with transliteration and English translation

#### 3. Waitlist Signup

**Components:**
- `components/WaitlistForm.tsx` - Multi-purpose signup (testers, donors, notifications)
- Conditional validation based on user intent:
  - Testers: Must select device type (iOS/Android)
  - Donors: Must provide phone/WhatsApp number
  - Notify-only: Just name and email
- Inserts into `user_profiles` table with auto-generated referral codes

### Core TypeScript Types

Located in `lib/supabase.ts`:

**Gurbani Types:**
- `Shabad` - Hymn metadata (source, writer, raag, ang)
- `Line` - Individual verse with Gurmukhi, transliteration, translation
- `EmotionTag` - Maps emotions to shabads
- `ShabadWithLines` - Joined type for shabad with related lines

**Streaming Types:**
- `Gurdwara` - Temple information and metadata
- `Stream` - Stream details, status, metrics
- `StreamWithGurdwara` - Joined type with gurdwara info embedded

**Transparency Types:**
- `ChangelogEntry` - Feature updates and progress
- `TimesheetEntry` - Development time tracking
- `FeatureRequest` - User-submitted feature requests

### Global Layout Components

**`components/Navigation.tsx`** (Client Component)
- Fixed header with scroll state detection
- Mobile hamburger menu with smooth transitions
- Routes: Home, Features, About, Resources, Waitlist, Donate
- Uses `z-50` to stay above content; layout has top padding to compensate

**`components/Footer.tsx`**
- Sitewide footer (location varies by page - some pages have custom footers)

**Launch Banner:**
Implemented in `app/layout.tsx` as a fixed top banner (`z-60`) announcing the Jan 5, 2026 launch date.

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

- **Server Components (default)**: All `app/**/page.tsx` files, including `app/streams/page.tsx`
- **Client Components**: All components in `components/` use `'use client'` directive
- Supabase queries in client components run in the browser (uses anon key)
- Supabase queries in server components run server-side during SSR/ISR

### Server Component Revalidation

The streams page uses Next.js ISR:
```typescript
export const revalidate = 30; // Revalidate every 30 seconds
```
This means the page is statically generated but refreshes every 30 seconds on the server. No client-side polling needed.

### Supabase Query Patterns

**Nested Queries with Joins:**
```typescript
// Fetch shabads with related lines and emotion tags
const { data } = await supabase
  .from('shabads')
  .select(`
    *,
    lines (*),
    emotion_tags (*)
  `)
  .in('id', shabadIds);

// Fetch streams with gurdwara info
const { data } = await supabase
  .from('streams')
  .select(`
    *,
    gurdwara:gurdwaras(*)
  `)
  .eq('is_live', true);
```

**Filtering and Ordering:**
```typescript
// Get live streams ordered by viewer count
const { data } = await supabase
  .from('streams')
  .select('*')
  .eq('is_live', true)
  .order('viewer_count', { ascending: false, nullsFirst: false });

// Get gurdwaras with active streams
const { data } = await supabase
  .from('gurdwaras')
  .select('*')
  .gt('active_streams_count', 0);
```

### Database Migrations

Migrations live in `supabase/migrations/`. The streaming migration includes:
- Table creation with foreign keys and indexes
- RLS policies for anonymous viewing
- Triggers for auto-updating timestamps and stream counts
- Database view `active_streams_with_gurdwara` for convenient querying

### TypeScript Configuration

- Path alias: `@/*` maps to project root (use `@/components/Foo` not `../components/Foo`)
- Target: ES2017
- Strict mode enabled
- JSX: `react-jsx` (automatic JSX runtime)

### n8n Automation (External)

While n8n workflows are external to this codebase, they interact with the database:
- **Stream Discovery:** Runs every 15 minutes, queries YouTube/Facebook APIs for live gurdwara streams
- **Stream Health Check:** Runs every 5 minutes, verifies streams are still live
- **Gurdwara Enrichment:** Daily job to fetch additional metadata from Google Places API

See `docs/gurdwara-streaming-spec.md` for full automation details.

## Common Development Patterns

### Adding a New Page

1. Create `app/new-page/page.tsx`
2. Export default function component
3. Add metadata export if needed
4. Will be accessible at `/new-page`

### Adding a New Component

1. Create `components/MyComponent.tsx`
2. Add `'use client'` if it uses hooks or browser APIs
3. Import in page: `import MyComponent from '@/components/MyComponent'`

### Querying Supabase in Client Components

```typescript
'use client';
import { supabase } from '@/lib/supabase';
import { useState, useEffect } from 'react';

const { data, error } = await supabase
  .from('table_name')
  .select('*')
  .eq('column', value);

if (error) throw error;
```

### Querying Supabase in Server Components

```typescript
import { supabase } from '@/lib/supabase';

export default async function MyPage() {
  const { data, error } = await supabase
    .from('table_name')
    .select('*');

  if (error) {
    // Handle error - can't throw in server component rendering
    console.error(error);
  }

  return <div>{/* render data */}</div>;
}
```

### Creating a Helper Function in lib/

Follow the pattern in `lib/streams.ts`:
- Export async functions for common queries
- Return typed data (use types from `lib/supabase.ts`)
- Handle errors with console.error and return null/empty array
- Add helper functions for formatting/transformations

## Deployment

The site deploys to Netlify via the Next.js plugin:

- Build command: `npm run build`
- Publish directory: `.next`
- Plugin: `@netlify/plugin-nextjs` (configured in `netlify.toml`)
- Environment variables must be set in Netlify dashboard

## Project Context

This website is part of the larger **GurBani Finder** project:

- **`digital-khalsa-web/`** (this repo): Marketing website, waitlist, and live streaming
- **`gurbani-finder-app/`**: React Native mobile app (Expo)
- **`digital-khalsa-shared/`**: Shared documentation, scripts, database schemas

For detailed project context, see the parent `CLAUDE.md` in the monorepo root (if available).

## Key Design Decisions

### Anonymous Viewing Priority
The streaming feature is designed for zero-friction access:
- No authentication required
- RLS policies enforce public read access
- Server components pre-render data for fast load times

### Server-Side Rendering with ISR
Streams page uses ISR instead of client-side polling to:
- Reduce client-side JavaScript bundle
- Improve SEO (streams are in initial HTML)
- Minimize database queries (cached for 30 seconds)
- Provide consistent experience across users

### Type Safety
All Supabase queries use TypeScript types defined in `lib/supabase.ts`. When adding new tables, always:
1. Add TypeScript type definitions
2. Export joined types (e.g., `StreamWithGurdwara`)
3. Cast Supabase query results to proper types

### Component Organization
- `components/` contains all reusable UI components (all client components)
- `app/**/page.tsx` are route pages (server components by default)
- `lib/` contains utility functions and shared logic
- No API routes yet (using Supabase client directly)
