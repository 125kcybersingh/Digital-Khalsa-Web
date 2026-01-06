# Lindy.AI Setup Checklist - Gurdwara Streaming MVP

Complete this checklist to get your Lindy automation running.

---

## Phase 1: Prerequisites (15 minutes)

### 1. Run Database Migration

- [ ] Go to Supabase Dashboard → SQL Editor
- [ ] Copy contents of `supabase/migrations/20260105_gurdwara_streaming.sql`
- [ ] Paste and run in SQL Editor
- [ ] Verify tables created: Run `SELECT * FROM gurdwaras LIMIT 1;`

### 2. Get Supabase Credentials

- [ ] Go to Supabase Dashboard → Settings → API
- [ ] Copy **Project URL**: (https://ngigsghddbqzbbvsmcub.supabase.co)
- [ ] Copy **service_role key** eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5naWdzZ2hkZGJxemJidnNtY3ViIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzMxNjkxMywiZXhwIjoyMDgyODkyOTEzfQ.MzoMPa6Eh-eHYyOcaDPYP8IfZ_F3EIs77gUmYVQXz0E
- [ ] Save these securely (you'll use them in Lindy)

### 3. Get YouTube API Key

- [ ] Go to [Google Cloud Console](https://console.cloud.google.com/)
- [ ] Create new project (or use existing)
- [ ] Enable **YouTube Data API v3**
- [ ] Create credentials → API Key
- [ ] Copy API key - AIzaSyBNotjeECgbNt37EpraeSCs3Tjz1lfB6oE
- [ ] (Optional) Restrict key to YouTube Data API for security

---

## Phase 2: Test Frontend (10 minutes)

### 1. Seed Test Data

- [ ] Go to Supabase SQL Editor
- [ ] Run `scripts/seed-test-streams.sql`
- [ ] Verify: Should see "Test data inserted successfully!"

### 2. Test Local Website

- [ ] Run `npm run dev` in terminal
- [ ] Visit `http://localhost:3000`
- [ ] Click "View Live Streams Now" button
- [ ] Verify: Should see 5 test streams displayed
- [ ] Click on a stream
- [ ] Verify: Stream player page loads (video won't play - test URLs)

**If working:** ✅ Frontend is ready!
**If not working:** Check console for errors, verify `.env` has Supabase credentials

---

## Phase 3: Create Lindy Automation (30 minutes)

### 1. Create Lindy Account

- [ ] Go to [Lindy.AI](https://www.lindy.ai)
- [ ] Sign up / log in
- [ ] Create new automation

### 2. Configure Trigger

**Settings:**
- Name: `Gurdwara Stream Discovery`
- Trigger Type: Schedule
- Frequency: Every 30 minutes
- Duration: 24 hours (automatic stop)
- Timezone: Your local timezone

---

### 3. Add Environment Variables in Lindy

Go to Lindy Settings → Environment Variables:

```
YOUTUBE_API_KEY = your_youtube_api_key_here
SUPABASE_URL = https://your-project.supabase.co
SUPABASE_SERVICE_KEY = your_service_role_key_here
```

---

### 4. Build the Workflow (Follow docs/lindy-streaming-automation.md)

**Step 1: Search YouTube**
- [ ] Add HTTP Request action
- [ ] Configure YouTube search API (see guide)
- [ ] Test: Should return live videos

**Step 2: Loop Through Results**
- [ ] Add Loop action
- [ ] For each video found...

**Step 3: Get Video Details**
- [ ] Add HTTP Request inside loop
- [ ] Fetch full video metadata
- [ ] Test: Should get title, description, viewer count

**Step 4: Get Channel Info**
- [ ] Add HTTP Request
- [ ] Fetch channel/gurdwara details
- [ ] Test: Should get channel name, description

**Step 5: Extract Location (AI)**
- [ ] Add AI action
- [ ] Prompt: "Extract city, state, country from: {{description}}"
- [ ] Test with sample description

**Step 6: Check if Gurdwara Exists**
- [ ] Add HTTP Request to Supabase
- [ ] Query: `?youtube_url=eq.{{channel_url}}`
- [ ] Save result

**Step 7: Create Gurdwara (if not exists)**
- [ ] Add Condition: If gurdwara not found
- [ ] Add HTTP Request: POST to `/gurdwaras`
- [ ] Test: Should create new record

**Step 8: Create Stream**
- [ ] Add HTTP Request: POST to `/streams`
- [ ] Include all metadata
- [ ] Test: Should create stream record

**Step 9: Detect Program Type (AI)**
- [ ] Add AI action
- [ ] Prompt: "Is this kirtan, katha, asa_di_vaar, or rehras? {{title}}"
- [ ] Use result in stream creation

---

### 5. Test the Automation

**Manual Test Run:**
- [ ] Click "Test Run" in Lindy
- [ ] Monitor execution
- [ ] Check Supabase: Should see new gurdwara/stream
- [ ] Check website: Should see new stream appear

**Verify:**
- [ ] No errors in Lindy logs
- [ ] Data appears in Supabase tables
- [ ] Website shows new streams (may take 30 seconds to revalidate)

---

## Phase 4: Add Stream Health Check (15 minutes)

### Create Second Automation

**Name:** `Mark Ended Streams`
**Trigger:** Every 30 minutes (same schedule as discovery)

**Steps:**
1. [ ] Get all live streams from Supabase
2. [ ] For each stream: Check if still live on YouTube
3. [ ] If not live: PATCH stream to set `is_live = false`

See `docs/lindy-streaming-automation.md` Step 8 for details.

---

## Phase 5: Add Gurdwara Enrichment (Optional - 20 minutes)

### Create Third Automation

**Name:** `Enrich Gurdwara Data`
**Trigger:** Every 6 hours (or daily)

**Steps:**
1. [ ] Query gurdwaras missing data (address, phone, etc.)
2. [ ] For each: Use Lindy web search to find info
3. [ ] Update gurdwara record with findings

See `docs/lindy-streaming-automation.md` Automation 2 for details.

---

## Phase 6: Enable & Monitor (Ongoing)

### 1. Enable Automation

- [ ] Review all steps one final time
- [ ] Enable the automation
- [ ] Confirm it's scheduled for next 24 hours

### 2. Set Up Notifications

**In Lindy:**
- [ ] Enable email notifications on errors
- [ ] Set up daily summary email
- [ ] (Optional) Slack/Discord webhook for alerts

### 3. Monitor First Few Runs

**After 30 min (first run):**
- [ ] Check Lindy logs - any errors?
- [ ] Check Supabase - new data added?
- [ ] Check website - streams appearing?

**After 2 hours (4 runs):**
- [ ] How many gurdwaras discovered?
- [ ] How many live streams found?
- [ ] Any duplicate entries?
- [ ] Any data quality issues?

**After 24 hours (48 runs):**
- [ ] Run analytics query (see below)
- [ ] Review data quality
- [ ] Adjust automation if needed

---

## Phase 7: Analytics & Cleanup (After 24 hours)

### Check Your Data

Run in Supabase SQL Editor:

```sql
-- Summary
SELECT
  (SELECT COUNT(*) FROM gurdwaras) as total_gurdwaras,
  (SELECT COUNT(*) FROM gurdwaras WHERE is_verified = true) as verified,
  (SELECT COUNT(*) FROM streams) as total_streams,
  (SELECT COUNT(*) FROM streams WHERE is_live = true) as live_now,
  (SELECT COUNT(DISTINCT gurdwara_id) FROM streams) as gurdwaras_with_streams;

-- Top streaming gurdwaras
SELECT
  g.name,
  g.city,
  g.country,
  COUNT(s.id) as total_streams,
  SUM(CASE WHEN s.is_live THEN 1 ELSE 0 END) as live_now
FROM gurdwaras g
LEFT JOIN streams s ON g.id = s.gurdwara_id
GROUP BY g.id, g.name, g.city, g.country
ORDER BY total_streams DESC
LIMIT 10;
```

### Cleanup Tasks

- [ ] Remove test data: `DELETE FROM gurdwaras WHERE name LIKE 'Test%';`
- [ ] Check for duplicates and merge if needed
- [ ] Manually verify top 5 gurdwaras
- [ ] Add `is_verified = true` to confirmed gurdwaras

### Adjust Schedule

After 24-hour enrichment period:

- [ ] Reduce frequency to every 2-4 hours
- [ ] Or set specific times (e.g., 6am, 12pm, 6pm, 10pm)
- [ ] Focus on peak streaming hours

---

## Troubleshooting

### ❌ "YouTube API quota exceeded"

**Fix:**
- Reduce `maxResults` to 25
- Increase interval to 1 hour
- Get additional API key and rotate

### ❌ "Supabase 401 Unauthorized"

**Fix:**
- Verify using `service_role` key (not anon key)
- Check key is correctly set in Lindy env vars
- Check header format: `Authorization: Bearer YOUR_KEY`

### ❌ "Duplicate gurdwaras created"

**Fix:**
- Improve duplicate check logic
- Add unique constraint: `ALTER TABLE gurdwaras ADD CONSTRAINT unique_youtube_url UNIQUE (youtube_url);`
- Manually merge duplicates

### ❌ "Streams not showing on website"

**Checklist:**
1. Is `is_live = true` in database?
2. Did Next.js revalidate? (Wait 30 seconds)
3. Is RLS enabled on streams table?
4. Check browser console for errors

### ❌ "Location parsing fails"

**Fix:**
- Improve AI prompt with examples
- Use fallback values (e.g., country = "Unknown")
- Manually update important gurdwaras

---

## Success Metrics

After 24 hours, you should have:

- ✅ **50-200 gurdwaras** discovered
- ✅ **10-30 live streams** at any given time (varies by time of day)
- ✅ **80%+ gurdwaras** with location data
- ✅ **50%+ gurdwaras** with contact info
- ✅ **0 errors** in last 10 Lindy runs

---

## Next Steps

Once MVP is validated:

1. **Marketing:**
   - [ ] Share `/streams` page on social media
   - [ ] Get feedback from Sangat
   - [ ] Monitor analytics

2. **Improvements:**
   - [ ] Add Facebook Live support
   - [ ] Implement search/filters
   - [ ] Add map view

3. **Migration to n8n:**
   - [ ] Export Lindy workflows
   - [ ] Recreate in n8n
   - [ ] Test in parallel
   - [ ] Switch over

---

## Support

**Documentation:**
- Main spec: `docs/gurdwara-streaming-spec.md`
- Lindy guide: `docs/lindy-streaming-automation.md`
- API reference: `docs/supabase-api-reference.md`

**Need Help?**
- Lindy docs: https://www.lindy.ai/docs
- Supabase docs: https://supabase.com/docs
- YouTube API docs: https://developers.google.com/youtube/v3

---

**Ready to begin? Start with Phase 1! ✅**
