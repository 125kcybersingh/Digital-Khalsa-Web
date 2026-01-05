# Gurdwara Live Streaming Feature Specification

**Version:** 1.0
**Date:** 2026-01-05
**Status:** Draft

## Overview

Enable anonymous users to discover and watch live gurdwara streams from around the world on digitalkhalsa.com. Stream sources are automatically collected via n8n automation and catalogued in Supabase for future Kirtan analysis.

---

## User Stories

### Core User Stories

**US-1: Anonymous Stream Viewing**
*As a* visitor
*I want to* view live gurdwara streams without creating an account
*So that I can* quickly access spiritual content without barriers

**US-2: Discover Gurdwaras**
*As a* visitor
*I want to* browse all gurdwaras with live streams
*So that I can* find a stream that resonates with me

**US-3: Stream Information**
*As a* visitor
*I want to* see details about the gurdwara and stream
*So that I can* know what I'm watching (location, current program, etc.)

### Future Stories (Phase 2)

- Search gurdwaras by location/name
- Filter streams by region or timezone
- View upcoming scheduled streams
- See recently ended streams for replay

---

## Database Schema

### Table: `gurdwaras`

Stores information about gurdwaras (Sikh temples) worldwide.

```sql
CREATE TABLE gurdwaras (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Basic Information
  name TEXT NOT NULL,
  slug TEXT UNIQUE, -- URL-friendly name

  -- Location
  address TEXT,
  city TEXT,
  state_province TEXT,
  country TEXT,
  postal_code TEXT,
  timezone TEXT, -- e.g., "America/Los_Angeles"
  coordinates POINT, -- PostGIS (latitude, longitude)

  -- Contact & Web Presence
  phone TEXT,
  email TEXT,
  website_url TEXT,
  facebook_url TEXT,
  youtube_url TEXT,
  instagram_url TEXT,

  -- Media
  logo_url TEXT,
  image_url TEXT,

  -- Metadata
  description TEXT,
  established_year INTEGER,
  is_verified BOOLEAN DEFAULT false,
  source_platform TEXT, -- Where n8n discovered this (e.g., 'youtube', 'facebook', 'manual')

  -- Analytics
  total_streams_count INTEGER DEFAULT 0,
  active_streams_count INTEGER DEFAULT 0
);

-- Indexes
CREATE INDEX idx_gurdwaras_country ON gurdwaras(country);
CREATE INDEX idx_gurdwaras_city ON gurdwaras(city);
CREATE INDEX idx_gurdwaras_slug ON gurdwaras(slug);
CREATE INDEX idx_gurdwaras_coordinates ON gurdwaras USING GIST(coordinates);
```

### Table: `streams`

Stores stream URLs and metadata for Kirtan analysis.

```sql
CREATE TABLE streams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Relationships
  gurdwara_id UUID REFERENCES gurdwaras(id) ON DELETE CASCADE,

  -- Stream Details
  platform TEXT NOT NULL, -- 'youtube', 'facebook', 'instagram', 'custom'
  stream_url TEXT NOT NULL,
  embed_url TEXT, -- Embeddable version of URL
  stream_id TEXT, -- Platform-specific ID (e.g., YouTube video ID)

  -- Status
  status TEXT DEFAULT 'discovered', -- 'discovered', 'live', 'ended', 'error', 'archived'
  is_live BOOLEAN DEFAULT false,

  -- Stream Metadata
  title TEXT,
  description TEXT,
  thumbnail_url TEXT,
  language TEXT, -- 'punjabi', 'english', 'hindi', etc.

  -- Program Information (extracted from title/description)
  program_type TEXT, -- 'kirtan', 'katha', 'ardas', 'asa_di_vaar', 'rehras', 'general'

  -- Timing
  scheduled_start_time TIMESTAMPTZ,
  actual_start_time TIMESTAMPTZ,
  end_time TIMESTAMPTZ,
  duration_seconds INTEGER,

  -- Engagement Metrics (snapshots taken by n8n)
  viewer_count INTEGER,
  like_count INTEGER,

  -- Quality & Validation
  video_quality TEXT, -- '1080p', '720p', '480p', etc.
  last_checked_at TIMESTAMPTZ,
  error_count INTEGER DEFAULT 0,
  last_error_message TEXT,

  -- Cataloguing for Analysis
  audio_extracted BOOLEAN DEFAULT false,
  analyzed BOOLEAN DEFAULT false,
  analysis_metadata JSONB, -- Future: store AI analysis results

  -- Source Tracking
  discovered_by TEXT DEFAULT 'n8n', -- 'n8n', 'manual', 'api'
  source_data JSONB -- Raw data from source platform
);

-- Indexes
CREATE INDEX idx_streams_gurdwara ON streams(gurdwara_id);
CREATE INDEX idx_streams_status ON streams(status);
CREATE INDEX idx_streams_is_live ON streams(is_live);
CREATE INDEX idx_streams_platform ON streams(platform);
CREATE INDEX idx_streams_start_time ON streams(actual_start_time);
CREATE INDEX idx_streams_program_type ON streams(program_type);
```

### Row Level Security (RLS)

```sql
-- Enable RLS
ALTER TABLE gurdwaras ENABLE ROW LEVEL SECURITY;
ALTER TABLE streams ENABLE ROW LEVEL SECURITY;

-- Public read access (anonymous viewing)
CREATE POLICY "Allow public read access to gurdwaras"
  ON gurdwaras FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public read access to live streams"
  ON streams FOR SELECT
  TO anon
  USING (status = 'live' OR is_live = true);

-- Authenticated users can see all streams (for admin/analysis)
CREATE POLICY "Allow authenticated read access to all streams"
  ON streams FOR SELECT
  TO authenticated
  USING (true);
```

---

## n8n Automation Workflow

### Workflow 1: Stream Discovery & Monitoring

**Trigger:** Cron schedule (every 15 minutes)

**Steps:**

1. **Fetch Active Streams**
   - Query YouTube API for live streams with keywords: "gurdwara live", "kirtan live", "gurbani live"
   - Query Facebook Graph API for live videos from known gurdwara pages
   - Check RSS feeds from gurdwara websites (if available)

2. **Extract Stream Metadata**
   - Stream URL and embed URL
   - Title and description
   - Thumbnail
   - Viewer count
   - Channel/page information

3. **Identify or Create Gurdwara**
   - Check if gurdwara exists (match by channel name, location)
   - If new, create gurdwara record with extracted info:
     - Parse location from title/description
     - Extract contact info from channel "About" section
     - Geocode address to coordinates (Google Geocoding API)

4. **Create or Update Stream Record**
   - Check if stream already exists (by stream_id)
   - If new: create with status='live', is_live=true
   - If exists: update status, viewer_count, last_checked_at

5. **Detect Stream Ended**
   - If previously live stream is no longer available:
     - Set status='ended', is_live=false
     - Record end_time and calculate duration

6. **Error Handling**
   - If stream URL is invalid: increment error_count
   - If error_count > 5: set status='error'

### Workflow 2: Gurdwara Enrichment

**Trigger:** Cron schedule (daily)

**Steps:**

1. **Query Gurdwaras Without Full Data**
   - Find gurdwaras missing address, timezone, or coordinates

2. **Enrich from Public Sources**
   - Google Places API: get address, phone, website
   - OpenStreetMap: validate coordinates
   - Social media APIs: get profile pictures, descriptions

3. **Update Gurdwara Records**

### Workflow 3: Stream Health Check

**Trigger:** Cron schedule (every 5 minutes)

**Steps:**

1. **Query Live Streams**
   - Get all streams where is_live=true

2. **Verify Each Stream**
   - HEAD request to stream URL (check if still accessible)
   - If not accessible: mark as ended

3. **Update Metrics**
   - Update viewer counts
   - Update video quality if changed

---

## API Endpoints

### Public Endpoints (No Auth Required)

#### GET `/api/streams/live`

Get all currently live streams.

**Query Parameters:**
- `country` (optional): Filter by country
- `limit` (default: 50): Max results
- `offset` (default: 0): Pagination offset

**Response:**
```json
{
  "streams": [
    {
      "id": "uuid",
      "gurdwara": {
        "id": "uuid",
        "name": "Gurdwara Sahib San Jose",
        "city": "San Jose",
        "state_province": "California",
        "country": "USA",
        "timezone": "America/Los_Angeles",
        "logo_url": "https://...",
        "image_url": "https://..."
      },
      "platform": "youtube",
      "embed_url": "https://youtube.com/embed/...",
      "title": "Morning Kirtan - Asa Di Vaar",
      "thumbnail_url": "https://...",
      "program_type": "asa_di_vaar",
      "viewer_count": 342,
      "started_at": "2026-01-05T06:00:00Z"
    }
  ],
  "total": 15,
  "limit": 50,
  "offset": 0
}
```

#### GET `/api/streams/:id`

Get details for a specific stream.

#### GET `/api/gurdwaras`

Get all gurdwaras (with or without active streams).

**Query Parameters:**
- `has_live_stream` (boolean): Filter to only gurdwaras with active streams
- `country` (optional)
- `limit`, `offset`

#### GET `/api/gurdwaras/:id`

Get details for a specific gurdwara, including recent streams.

---

## Frontend Implementation

### Pages

#### `/streams` - Live Streams Page

**Layout:**
- Header: "Live Gurdwara Streams"
- Filter bar (optional for MVP):
  - Search by gurdwara name
  - Filter by country/region
- Grid of stream cards
- Empty state if no live streams

**Stream Card Component:**
- Thumbnail with "LIVE" badge
- Gurdwara name
- Location (city, country)
- Viewer count
- Program type tag (if available)
- Click to open stream player

#### `/streams/:id` - Stream Player Page

**Layout:**
- Embedded video player (YouTube/Facebook embed)
- Gurdwara information sidebar:
  - Name, logo
  - Address
  - Contact info (phone, website links)
  - Description
- Related streams from same gurdwara
- "Back to all streams" button

### Components

#### `StreamCard`
- Displays stream thumbnail, title, gurdwara info
- Responsive design (mobile-first)

#### `StreamPlayer`
- Embeds platform-specific player
- Handles YouTube, Facebook, custom URLs
- Fallback for unsupported platforms

#### `GurdwaraInfo`
- Displays gurdwara details
- Contact information with click-to-call, click-to-visit

### State Management

Use React Query (or similar) for:
- Fetching live streams
- Auto-refresh every 30 seconds
- Optimistic updates

---

## Technical Requirements

### Frontend
- **Framework:** React (Next.js or Vite, based on existing setup)
- **Styling:** Tailwind CSS (if already in use)
- **Data fetching:** React Query or SWR
- **Video player:** react-player or platform-specific embeds

### Backend
- **Database:** Supabase (PostgreSQL)
- **API:** Supabase REST API or custom Edge Functions
- **Authentication:** None required for viewing (Supabase anon key)

### n8n Automation
- **APIs needed:**
  - YouTube Data API v3
  - Facebook Graph API
  - Google Geocoding API (optional)
- **Credentials:** Store securely in n8n
- **Error handling:** Retry logic, logging to Supabase

### Hosting
- **Frontend:** Netlify (based on existing setup)
- **Database:** Supabase
- **Automation:** n8n (self-hosted or n8n.cloud)

---

## Privacy & Compliance

### Anonymous Viewing
- No user accounts required
- No personal data collected from viewers
- No cookies except essential ones
- Use Supabase anon key (RLS handles permissions)

### External Embeds
- YouTube and Facebook embeds may set their own cookies
- Add privacy notice: "Streams are embedded from third-party platforms (YouTube, Facebook) which may use cookies"

### Public Data Only
- n8n only collects publicly available data
- No scraping of private/password-protected content
- Respect robots.txt and API rate limits

---

## Future Enhancements (Phase 2+)

1. **User Accounts & Favorites**
   - Bookmark favorite gurdwaras
   - Get notified when favorite gurdwara goes live

2. **Schedule & Calendar**
   - Show upcoming scheduled streams
   - Weekly program schedules

3. **Kirtan Analysis**
   - Audio extraction and transcription
   - Shabad recognition (identify which shabad is being sung)
   - Raag identification
   - Searchable archive: "Find kirtan of Sukhmani Sahib"

4. **Map View**
   - Interactive map showing live streams worldwide
   - Cluster by region

5. **Advanced Search**
   - Search by program type (Asa Di Vaar, Rehras, specific shabads)
   - Filter by language
   - Time-based filters (morning programs, evening programs)

6. **Community Features**
   - Report incorrect information
   - Suggest new gurdwara streams
   - Ratings/reviews (with moderation)

7. **Mobile App**
   - Native iOS/Android apps
   - Push notifications for live streams

---

## Success Metrics

### MVP Success Criteria
- [ ] At least 50 gurdwaras discovered and catalogued
- [ ] At least 10 concurrent live streams during peak hours
- [ ] Average of 100+ daily visitors to streams page
- [ ] <2 second load time for streams page
- [ ] <5% error rate on stream playback

### Analytics to Track
- Number of gurdwaras in database
- Number of live streams available (avg per day)
- Stream views and watch time
- Most popular gurdwaras
- Geographic distribution of gurdwaras
- n8n automation success rate

---

## Implementation Phases

### Phase 1: Core MVP (Weeks 1-2)
- [ ] Create database schema in Supabase
- [ ] Build n8n workflow for YouTube stream discovery
- [ ] Create `/streams` page with live stream grid
- [ ] Create `/streams/:id` player page
- [ ] Basic responsive design

### Phase 2: Enhanced Discovery (Weeks 3-4)
- [ ] Add Facebook stream support to n8n
- [ ] Implement search and filters
- [ ] Improve gurdwara data enrichment
- [ ] Add error handling and monitoring

### Phase 3: Polish & Scale (Week 5+)
- [ ] Performance optimization
- [ ] SEO optimization
- [ ] Analytics implementation
- [ ] User testing and feedback
- [ ] Marketing/launch

---

## Open Questions

1. Should we manually seed an initial list of known gurdwara YouTube/Facebook channels?
2. What's the priority order for platforms? (YouTube first, then Facebook, then Instagram?)
3. Should stream history be visible to anonymous users, or only current live streams?
4. Do we need admin interface for manual gurdwara management?
5. Language detection: automatic or manual tagging?

---

## Dependencies & Risks

### Dependencies
- YouTube Data API quota (10,000 units/day free tier)
- Facebook Graph API access
- n8n instance (cloud or self-hosted)
- Supabase plan limits (API calls, storage)

### Risks & Mitigations
- **Risk:** API quota limits reached
  **Mitigation:** Implement caching, reduce polling frequency, upgrade to paid tier

- **Risk:** Streams contain inappropriate content
  **Mitigation:** Manual verification for new gurdwaras, community reporting system

- **Risk:** n8n automation fails silently
  **Mitigation:** Implement health checks, alerting, logging to Supabase

- **Risk:** Copyright/DMCA issues
  **Mitigation:** Only embed (not re-host), respect takedown requests, link back to source

---

**End of Specification**
