# Lindy.AI Automation Setup - Quick Start

This is the **MVP/Alpha** implementation using Lindy.AI before migrating to n8n.

## 🚀 Quick Start (30 minutes)

### Step 1: Database Setup (5 min)
```sql
-- Run in Supabase SQL Editor
-- File: supabase/migrations/20260105_gurdwara_streaming.sql
```

### Step 2: Test Frontend (5 min)
```bash
# Seed test data
# Run: scripts/seed-test-streams.sql in Supabase

# Start dev server
npm run dev

# Visit http://localhost:3000/streams
```

### Step 3: Setup Lindy (20 min)
Follow: `docs/lindy-setup-checklist.md`

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| **[lindy-setup-checklist.md](docs/lindy-setup-checklist.md)** | Step-by-step setup guide ⭐ START HERE |
| **[lindy-streaming-automation.md](docs/lindy-streaming-automation.md)** | Detailed workflow implementation |
| **[supabase-api-reference.md](docs/supabase-api-reference.md)** | API endpoints quick reference |
| **[gurdwara-streaming-spec.md](docs/gurdwara-streaming-spec.md)** | Full feature specification |

---

## 🔑 Required API Keys

1. **YouTube Data API v3** - [Get here](https://console.cloud.google.com/apis/credentials)
2. **Supabase Service Role Key** - Supabase Dashboard → Settings → API
3. (Optional) **Facebook Graph API** - For Facebook Live support

---

## 🎯 What This Automation Does

Every 30 minutes, Lindy will:
1. 🔍 Search YouTube for live gurdwara streams
2. 📊 Extract metadata (title, viewers, thumbnail)
3. 🏛️ Identify or create gurdwara records
4. 💾 Save streams to Supabase
5. 🌐 Publish to your website (auto-updates)
6. ✅ Mark ended streams

---

## 📊 Expected Results (After 24 hours)

- **50-200 gurdwaras** discovered worldwide
- **10-30 live streams** at any time (varies by hour)
- **Automatic updates** every 30 minutes
- **Zero manual work** after setup

---

## 🧪 Testing

### Test with Sample Data
```sql
-- Run in Supabase
-- File: scripts/seed-test-streams.sql
```
Visit `http://localhost:3000/streams` - should see 5 test streams

### Test Lindy Automation
1. Click "Test Run" in Lindy
2. Check Supabase for new data
3. Refresh website (may take 30s to update)

---

## 📈 Monitoring

### Check Progress
```sql
-- Run in Supabase SQL Editor
SELECT
  (SELECT COUNT(*) FROM gurdwaras) as gurdwaras,
  (SELECT COUNT(*) FROM streams WHERE is_live = true) as live_streams;
```

### View Live Streams
Visit: `https://digitalkhalsa.com/streams`

---

## 🐛 Troubleshooting

| Issue | Fix |
|-------|-----|
| No streams appearing | Check `is_live = true` in database |
| Duplicates created | Add unique constraint on `youtube_url` |
| API quota exceeded | Reduce `maxResults` or increase interval |
| Website not updating | Wait 30s for Next.js revalidation |

Full troubleshooting: `docs/lindy-setup-checklist.md`

---

## 🚀 After MVP Validation

1. **Reduce frequency** to every 2-4 hours
2. **Add Facebook Live** support
3. **Migrate to n8n** for production
4. **Enable search/filters** on frontend
5. **Add map view** of gurdwaras

---

## 📞 Support

- **Lindy Docs**: https://www.lindy.ai/docs
- **YouTube API**: https://developers.google.com/youtube/v3
- **Supabase**: https://supabase.com/docs

---

## ✅ Checklist

- [ ] Run database migration
- [ ] Seed test data
- [ ] Test frontend (see 5 streams)
- [ ] Get YouTube API key
- [ ] Get Supabase service role key
- [ ] Create Lindy automation
- [ ] Test Lindy with manual run
- [ ] Enable 30-min schedule
- [ ] Monitor for 24 hours
- [ ] Review data quality
- [ ] Share with Sangat!

---

**Ready? Start here:** `docs/lindy-setup-checklist.md` ✨

Waheguru Ji Ka Khalsa, Waheguru Ji Ki Fateh 🙏
