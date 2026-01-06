# Lindy.AI Gurdwara Streaming Automation (MVP)

**Version:** 1.0
**Purpose:** MVP implementation of stream discovery and publishing before n8n rollout
**Schedule:** Every 30 minutes for 24 hours (initial enrichment phase)

---

## Overview

This Lindy automation will:
1. **Discover** live gurdwara streams from YouTube and Facebook
2. **Extract** metadata (title, description, thumbnail, viewer count)
3. **Identify or create** gurdwara records
4. **Enrich** gurdwara data from public sources
5. **Publish** streams directly to Supabase database
6. **Update** stream status (live/ended)

---

## Prerequisites

### 1. Supabase Setup

**Run the database migration first:**
```sql
-- Execute: supabase/migrations/20260105_gurdwara_streaming.sql
-- Location: Supabase Dashboard → SQL Editor
```

**Get your credentials:**
- Supabase URL: `https://[your-project].supabase.co`
- Supabase Anon Key: From Supabase Dashboard → Settings → API
- Service Role Key (for Lindy): From Supabase Dashboard → Settings → API → service_role key

⚠️ **Important:** Use the `service_role` key in Lindy (not anon key) to bypass RLS for writing data.

### 2. API Keys Needed

- **YouTube Data API v3**: [Get it here](https://console.cloud.google.com/apis/credentials)
- **Facebook Graph API** (optional): For Facebook Live streams
- **Google Places API** (optional): For gurdwara enrichment

---

## Lindy Automation Setup

### Automation 1: Stream Discovery & Publishing

**Name:** `Gurdwara Stream Discovery`
**Trigger:** Schedule - Every 30 minutes
**Duration:** 24 hours (48 runs)

#### Step 1: Discover YouTube Live Streams

**Lindy Action:** HTTP Request (or use built-in YouTube integration)

**Endpoint:** `GET https://www.googleapis.com/youtube/v3/search`

**Query Parameters:**
```json
{
  "part": "snippet",
  "type": "video",
  "eventType": "live",
  "q": "gurdwara live OR kirtan live OR gurbani live",
  "maxResults": 50,
  "key": "YOUR_YOUTUBE_API_KEY",
  "relevanceLanguage": "en"
}
```

**Save response as:** `youtube_streams`

---

#### Step 2: Extract Stream Details

**Lindy Action:** Get Video Details (for each stream found)

**Endpoint:** `GET https://www.googleapis.com/youtube/v3/videos`

**Query Parameters:**
```json
{
  "part": "snippet,liveStreamingDetails,statistics",
  "id": "{{video_id}}",
  "key": "YOUR_YOUTUBE_API_KEY"
}
```

**Extract:**
- `video_id` - Stream ID
- `snippet.title` - Stream title
- `snippet.description` - Description
- `snippet.thumbnails.high.url` - Thumbnail URL
- `snippet.channelTitle` - Channel name (gurdwara name)
- `snippet.channelId` - Channel ID
- `liveStreamingDetails.concurrentViewers` - Viewer count
- `liveStreamingDetails.scheduledStartTime` - Start time

**Save as:** `stream_details`

---

#### Step 3: Extract Gurdwara Information from Channel

**Lindy Action:** HTTP Request (for each channel)

**Endpoint:** `GET https://www.googleapis.com/youtube/v3/channels`

**Query Parameters:**
```json
{
  "part": "snippet,brandingSettings",
  "id": "{{channel_id}}",
  "key": "YOUR_YOUTUBE_API_KEY"
}
```

**Extract:**
- `snippet.title` - Gurdwara name
- `snippet.description` - Gurdwara description
- `snippet.customUrl` - Channel URL
- `snippet.thumbnails.high.url` - Logo

**Parse location from description** (AI task - Lindy is good at this):
```
Prompt Lindy: "Extract the city, state/province, and country from this text: {{description}}"
```

**Save as:** `gurdwara_info`

---

#### Step 4: Check if Gurdwara Exists

**Lindy Action:** HTTP Request to Supabase

**Endpoint:** `GET https://[your-project].supabase.co/rest/v1/gurdwaras`

**Headers:**
```json
{
  "apikey": "YOUR_SERVICE_ROLE_KEY",
  "Authorization": "Bearer YOUR_SERVICE_ROLE_KEY",
  "Content-Type": "application/json"
}
```

**Query Parameters:**
```
?youtube_url=eq.https://youtube.com/channel/{{channel_id}}&select=id,name
```

**Lindy Logic:**
- If gurdwara found: Use existing `gurdwara_id`
- If not found: Create new gurdwara (next step)

---

#### Step 5: Create Gurdwara (if not exists)

**Lindy Action:** HTTP Request to Supabase (Conditional - only if not found)

**Endpoint:** `POST https://[your-project].supabase.co/rest/v1/gurdwaras`

**Headers:**
```json
{
  "apikey": "YOUR_SERVICE_ROLE_KEY",
  "Authorization": "Bearer YOUR_SERVICE_ROLE_KEY",
  "Content-Type": "application/json",
  "Prefer": "return=representation"
}
```

**Body:**
```json
{
  "name": "{{gurdwara_info.name}}",
  "slug": "{{gurdwara_info.name | slugify}}",
  "description": "{{gurdwara_info.description}}",
  "city": "{{parsed_location.city}}",
  "state_province": "{{parsed_location.state}}",
  "country": "{{parsed_location.country}}",
  "youtube_url": "https://youtube.com/channel/{{channel_id}}",
  "logo_url": "{{gurdwara_info.logo_url}}",
  "source_platform": "youtube",
  "is_verified": false
}
```

**Save response as:** `new_gurdwara` (contains the new `id`)

---

#### Step 6: Create or Update Stream Record

**Lindy Action:** Upsert Stream to Supabase

**First, check if stream exists:**

**Endpoint:** `GET https://[your-project].supabase.co/rest/v1/streams`

**Query:**
```
?stream_id=eq.{{video_id}}&select=id,is_live
```

**Then, based on result:**

##### If stream doesn't exist - Create new:

**Endpoint:** `POST https://[your-project].supabase.co/rest/v1/streams`

**Body:**
```json
{
  "gurdwara_id": "{{gurdwara_id}}",
  "platform": "youtube",
  "stream_url": "https://www.youtube.com/watch?v={{video_id}}",
  "embed_url": "https://www.youtube.com/embed/{{video_id}}",
  "stream_id": "{{video_id}}",
  "status": "live",
  "is_live": true,
  "title": "{{stream_details.title}}",
  "description": "{{stream_details.description}}",
  "thumbnail_url": "{{stream_details.thumbnail_url}}",
  "program_type": "{{detected_program_type}}",
  "actual_start_time": "{{stream_details.start_time}}",
  "viewer_count": {{stream_details.viewer_count}},
  "language": "punjabi",
  "discovered_by": "lindy",
  "last_checked_at": "{{now}}"
}
```

##### If stream exists and was live - Update:

**Endpoint:** `PATCH https://[your-project].supabase.co/rest/v1/streams?stream_id=eq.{{video_id}}`

**Body:**
```json
{
  "is_live": true,
  "status": "live",
  "viewer_count": {{stream_details.viewer_count}},
  "last_checked_at": "{{now}}"
}
```

---

#### Step 7: Detect Program Type (AI Task)

**Lindy AI Prompt:**
```
Analyze this stream title and description to detect the program type:

Title: {{stream_details.title}}
Description: {{stream_details.description}}

Return one of these values:
- kirtan (general kirtan program)
- katha (discourse/sermon)
- ardas (prayer)
- asa_di_vaar (early morning Asa Di Vaar)
- rehras (evening prayers - Rehras Sahib)
- general (if unclear)

Only return the value, no explanation.
```

**Use the result** in the stream creation body above.

---

#### Step 8: Mark Ended Streams

**Lindy Action:** Find previously live streams that are no longer broadcasting

**Endpoint:** `GET https://[your-project].supabase.co/rest/v1/streams`

**Query:**
```
?is_live=eq.true&platform=eq.youtube&select=id,stream_id
```

**For each stream in database:**
1. Check if `stream_id` is in the current `youtube_streams` list
2. If NOT found (stream ended):

**Endpoint:** `PATCH https://[your-project].supabase.co/rest/v1/streams?id=eq.{{stream_id}}`

**Body:**
```json
{
  "is_live": false,
  "status": "ended",
  "end_time": "{{now}}",
  "last_checked_at": "{{now}}"
}
```

---

### Automation 2: Gurdwara Data Enrichment

**Name:** `Gurdwara Enrichment`
**Trigger:** Schedule - Every 6 hours (or after Stream Discovery)
**Purpose:** Fill in missing gurdwara data

#### Step 1: Find Gurdwaras Missing Data

**Endpoint:** `GET https://[your-project].supabase.co/rest/v1/gurdwaras`

**Query:**
```
?or=(address.is.null,timezone.is.null,phone.is.null)&select=id,name,youtube_url,description
```

---

#### Step 2: Web Search for Gurdwara Info

**Lindy Action:** Web Search (Lindy has built-in web search)

**Prompt:**
```
Search for information about "{{gurdwara_name}}" gurdwara.
Find:
- Full address
- Phone number
- Official website
- Facebook page
- Instagram handle
- Email address (if available)

Return as structured data.
```

**Save as:** `enrichment_data`

---

#### Step 3: Update Gurdwara Record

**Endpoint:** `PATCH https://[your-project].supabase.co/rest/v1/gurdwaras?id=eq.{{gurdwara_id}}`

**Body:**
```json
{
  "address": "{{enrichment_data.address}}",
  "phone": "{{enrichment_data.phone}}",
  "website_url": "{{enrichment_data.website}}",
  "facebook_url": "{{enrichment_data.facebook}}",
  "instagram_url": "{{enrichment_data.instagram}}",
  "email": "{{enrichment_data.email}}"
}
```

---

## Lindy-Specific Tips

### 1. Using AI for Smart Extraction

Lindy excels at AI tasks. Use it for:

**Location Parsing:**
```
Lindy Prompt: "Extract city, state, and country from: {{description}}"
```

**Program Type Detection:**
```
Lindy Prompt: "Is this kirtan, katha, or ardas? Title: {{title}}"
```

**Gurdwara Name Cleanup:**
```
Lindy Prompt: "Clean up this gurdwara name for a database. Remove emojis and formatting: {{raw_name}}"
```

### 2. Error Handling

**Set up Lindy to:**
- Skip videos that fail (don't halt entire automation)
- Log errors to a Google Sheet or Notion page
- Send you a summary email after each run

**Example error handling:**
```
If YouTube API returns 403 (quota exceeded):
  - Send notification
  - Pause automation
  - Resume in 24 hours
```

### 3. Rate Limiting

**YouTube API Quotas:**
- Free tier: 10,000 units/day
- Each search: ~100 units
- Each video details: ~1 unit
- Each channel details: ~1 unit

**For 30-min intervals over 24 hours:**
- 48 runs × 50 videos × 3 API calls = ~7,200 units/day ✅

**Set Lindy to:**
- Max 50 results per search
- Batch API calls when possible
- Cache channel info (don't re-fetch if seen recently)

---

## Testing Your Automation

### Test 1: Single Stream Discovery

**Manual trigger in Lindy:**
1. Search for one known live stream (e.g., "Harmandir Sahib live")
2. Verify Lindy creates gurdwara record in Supabase
3. Verify Lindy creates stream record in Supabase
4. Check `/streams` page on your website

### Test 2: Update Existing Stream

**Manual trigger:**
1. Run automation again with same stream
2. Verify Lindy updates (not duplicates) the stream
3. Check viewer count is updated

### Test 3: Mark Stream as Ended

**Simulation:**
1. Manually set a stream to `is_live: false` in Supabase
2. Run automation
3. Verify Lindy doesn't re-activate it if truly offline

### Test 4: Gurdwara Enrichment

**Manual trigger:**
1. Find a gurdwara with missing data
2. Run enrichment automation
3. Verify phone, address, website are filled in

---

## Sample Lindy Workflow JSON Structure

```json
{
  "name": "Gurdwara Stream Discovery",
  "trigger": {
    "type": "schedule",
    "interval": "30m",
    "duration": "24h"
  },
  "steps": [
    {
      "name": "Search YouTube",
      "action": "http_request",
      "config": {
        "url": "https://www.googleapis.com/youtube/v3/search",
        "method": "GET",
        "params": {
          "q": "gurdwara live",
          "type": "video",
          "eventType": "live",
          "maxResults": 50,
          "key": "{{env.YOUTUBE_API_KEY}}"
        }
      }
    },
    {
      "name": "Process Each Stream",
      "action": "loop",
      "forEach": "{{youtube_search.items}}",
      "steps": [
        {
          "name": "Get Video Details",
          "action": "http_request"
        },
        {
          "name": "Extract Gurdwara Info",
          "action": "ai_extract"
        },
        {
          "name": "Upsert to Supabase",
          "action": "http_request"
        }
      ]
    }
  ]
}
```

---

## Monitoring & Alerts

### Set up Lindy notifications for:

1. **Success Summary** (every 24 hours):
   - New gurdwaras discovered: X
   - Active streams found: Y
   - Streams marked as ended: Z

2. **Errors** (immediate):
   - API quota exceeded
   - Supabase connection failed
   - Invalid data format

3. **Quality Checks** (daily):
   - Gurdwaras missing addresses: X
   - Streams with 0 viewers (might be test streams)
   - Duplicate entries detected

---

## Data Quality Tips

### 1. Prevent Duplicates

**Before creating gurdwara:**
- Check by `youtube_url` (primary key)
- Also fuzzy match by `name` (use Lindy AI)
- Prompt: "Are these the same gurdwara? Name 1: {{name1}}, Name 2: {{name2}}"

### 2. Clean Data

**Gurdwara Names:**
- Remove emojis: "🏛️ Golden Temple 🙏" → "Golden Temple"
- Standardize: "Gurdwara Sahib San Jose" vs "San Jose Gurdwara Sahib"
- Use Lindy AI to normalize

### 3. Validate Streams

**Before marking as live:**
- Check `liveStreamingDetails` exists (not just scheduled)
- Verify viewer_count > 0 (or allow 0 for new streams)
- Title contains relevant keywords

---

## Migration to n8n (Later)

Once MVP is validated, you can export Lindy logic to n8n:

**Lindy → n8n mapping:**
- Lindy HTTP Request → n8n HTTP Request node
- Lindy AI Extract → n8n OpenAI node or custom function
- Lindy Loop → n8n Split In Batches node
- Lindy Schedule → n8n Schedule Trigger node

**Export checklist:**
1. Document all API endpoints used
2. Save all Lindy AI prompts
3. Note any custom logic/conditions
4. Test n8n workflow in parallel before switching

---

## Troubleshooting

### Issue: YouTube API Quota Exceeded

**Solution:**
- Reduce `maxResults` to 25
- Increase interval to 1 hour
- Use multiple API keys (rotate)

### Issue: Duplicate Gurdwaras Created

**Solution:**
- Improve duplicate detection logic
- Add unique constraint on `youtube_url` in database
- Manual cleanup: `DELETE FROM gurdwaras WHERE id IN (...)`

### Issue: Streams Not Showing on Website

**Checklist:**
1. ✅ Migration run in Supabase?
2. ✅ RLS policies enabled?
3. ✅ `is_live = true` in database?
4. ✅ Supabase anon key correct in `.env`?
5. ✅ Next.js app revalidated (wait 30 seconds)?

### Issue: Gurdwara Location Parsing Fails

**Solution:**
- Improve AI prompt with examples
- Fallback to manual entry
- Use Google Geocoding API for coordinates

---

## Next Steps After 24 Hours

After your 24-hour enrichment period:

1. **Review the data:**
   ```sql
   SELECT COUNT(*) FROM gurdwaras;
   SELECT COUNT(*) FROM streams WHERE is_live = true;
   ```

2. **Adjust automation frequency:**
   - Reduce to every 2-4 hours (less aggressive)
   - Focus on peak streaming times:
     - 4am-8am (Amrit Vela / Asa Di Vaar)
     - 6pm-9pm (Evening programs)

3. **Quality improvements:**
   - Manually verify top 10 gurdwaras
   - Fix any incorrect data
   - Add `is_verified: true` flag

4. **Marketing:**
   - Share `/streams` page
   - Get user feedback
   - Monitor analytics

---

## Support Resources

- **Lindy Docs**: https://www.lindy.ai/docs
- **YouTube Data API**: https://developers.google.com/youtube/v3
- **Supabase REST API**: https://supabase.com/docs/guides/api
- **Digital Khalsa Spec**: `docs/gurdwara-streaming-spec.md`

---

**End of Lindy Implementation Guide**
