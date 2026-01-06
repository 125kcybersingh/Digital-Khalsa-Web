# Supabase API Quick Reference for Lindy

## Base Configuration

```
Supabase URL: https://[your-project-id].supabase.co
Service Role Key: [from Supabase Dashboard → Settings → API]
```

## Headers for All Requests

```json
{
  "apikey": "YOUR_SERVICE_ROLE_KEY",
  "Authorization": "Bearer YOUR_SERVICE_ROLE_KEY",
  "Content-Type": "application/json"
}
```

---

## Gurdwaras Table

### Create Gurdwara

```http
POST /rest/v1/gurdwaras
Content-Type: application/json
Prefer: return=representation

{
  "name": "Gurdwara Sahib San Jose",
  "slug": "gurdwara-sahib-san-jose",
  "city": "San Jose",
  "state_province": "California",
  "country": "USA",
  "youtube_url": "https://youtube.com/channel/UC...",
  "description": "...",
  "source_platform": "youtube"
}
```

### Find Gurdwara by YouTube URL

```http
GET /rest/v1/gurdwaras?youtube_url=eq.https://youtube.com/channel/UC123&select=id,name
```

### Find Gurdwaras Missing Data

```http
GET /rest/v1/gurdwaras?or=(address.is.null,phone.is.null)&select=id,name
```

### Update Gurdwara

```http
PATCH /rest/v1/gurdwaras?id=eq.UUID_HERE

{
  "address": "123 Main St",
  "phone": "+1-408-555-1234",
  "website_url": "https://example.com"
}
```

---

## Streams Table

### Create Stream

```http
POST /rest/v1/streams
Prefer: return=representation

{
  "gurdwara_id": "UUID_HERE",
  "platform": "youtube",
  "stream_url": "https://www.youtube.com/watch?v=VIDEO_ID",
  "embed_url": "https://www.youtube.com/embed/VIDEO_ID",
  "stream_id": "VIDEO_ID",
  "status": "live",
  "is_live": true,
  "title": "Morning Kirtan",
  "description": "...",
  "thumbnail_url": "https://...",
  "viewer_count": 150,
  "program_type": "kirtan",
  "actual_start_time": "2026-01-05T06:00:00Z",
  "language": "punjabi",
  "discovered_by": "lindy"
}
```

### Find Stream by stream_id

```http
GET /rest/v1/streams?stream_id=eq.VIDEO_ID&select=id,is_live,status
```

### Get All Live Streams

```http
GET /rest/v1/streams?is_live=eq.true&select=*,gurdwara:gurdwaras(*)
```

### Update Stream (still live)

```http
PATCH /rest/v1/streams?stream_id=eq.VIDEO_ID

{
  "viewer_count": 200,
  "last_checked_at": "2026-01-05T07:00:00Z"
}
```

### Mark Stream as Ended

```http
PATCH /rest/v1/streams?stream_id=eq.VIDEO_ID

{
  "is_live": false,
  "status": "ended",
  "end_time": "2026-01-05T08:00:00Z"
}
```

---

## Query Operators

```
eq     - Equal                    ?name=eq.Golden Temple
neq    - Not equal               ?country=neq.USA
gt     - Greater than            ?viewer_count=gt.100
gte    - Greater than or equal   ?viewer_count=gte.100
lt     - Less than               ?viewer_count=lt.50
lte    - Less than or equal      ?viewer_count=lte.50
like   - Pattern match           ?name=like.*Sahib*
ilike  - Case-insensitive        ?name=ilike.*sahib*
is     - Exact match             ?address=is.null
in     - In list                 ?country=in.(USA,Canada,UK)
or     - OR condition            ?or=(city.is.null,state.is.null)
```

---

## Common Lindy Patterns

### Pattern 1: Upsert (Create or Update)

```javascript
// Step 1: Check if exists
GET /rest/v1/streams?stream_id=eq.{{video_id}}

// Step 2: Conditional logic in Lindy
IF exists:
  PATCH /rest/v1/streams?stream_id=eq.{{video_id}}
ELSE:
  POST /rest/v1/streams
```

### Pattern 2: Batch Update

```javascript
// Get all live streams
GET /rest/v1/streams?is_live=eq.true&select=id,stream_id

// For each, check if still live
// If not in current list:
PATCH /rest/v1/streams?stream_id=eq.{{stream_id}}
{
  "is_live": false,
  "status": "ended"
}
```

### Pattern 3: Join Query

```javascript
// Get streams with gurdwara info
GET /rest/v1/streams?is_live=eq.true&select=*,gurdwara:gurdwaras(*)

// Response includes nested gurdwara data
```

---

## Testing Endpoints (Manual)

### Test 1: Create Test Gurdwara

```bash
curl -X POST 'https://YOUR_PROJECT.supabase.co/rest/v1/gurdwaras' \
  -H "apikey: YOUR_SERVICE_ROLE_KEY" \
  -H "Authorization: Bearer YOUR_SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  -H "Prefer: return=representation" \
  -d '{
    "name": "Test Gurdwara",
    "city": "Test City",
    "country": "USA",
    "youtube_url": "https://youtube.com/test"
  }'
```

### Test 2: Create Test Stream

```bash
curl -X POST 'https://YOUR_PROJECT.supabase.co/rest/v1/streams' \
  -H "apikey: YOUR_SERVICE_ROLE_KEY" \
  -H "Authorization: Bearer YOUR_SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "gurdwara_id": "UUID_FROM_TEST_1",
    "platform": "youtube",
    "stream_url": "https://youtube.com/watch?v=test",
    "stream_id": "test123",
    "is_live": true,
    "title": "Test Stream"
  }'
```

### Test 3: Verify on Website

Visit: `http://localhost:3000/streams`

Should see your test stream appear.

---

## Error Responses

### 401 Unauthorized
```json
{
  "message": "Invalid API key"
}
```
**Fix:** Check apikey header and service role key

### 409 Conflict
```json
{
  "message": "duplicate key value violates unique constraint"
}
```
**Fix:** Item already exists, use PATCH instead of POST

### 400 Bad Request
```json
{
  "message": "invalid input syntax for type uuid"
}
```
**Fix:** Check UUID format, ensure foreign keys are valid

---

## Useful SQL Queries (Run in Supabase SQL Editor)

### Check Data Count

```sql
SELECT
  (SELECT COUNT(*) FROM gurdwaras) as total_gurdwaras,
  (SELECT COUNT(*) FROM gurdwaras WHERE is_verified = true) as verified_gurdwaras,
  (SELECT COUNT(*) FROM streams) as total_streams,
  (SELECT COUNT(*) FROM streams WHERE is_live = true) as live_streams;
```

### Find Duplicates

```sql
SELECT youtube_url, COUNT(*)
FROM gurdwaras
GROUP BY youtube_url
HAVING COUNT(*) > 1;
```

### Recent Streams

```sql
SELECT
  s.title,
  s.viewer_count,
  g.name as gurdwara_name,
  s.created_at
FROM streams s
JOIN gurdwaras g ON s.gurdwara_id = g.id
WHERE s.is_live = true
ORDER BY s.viewer_count DESC
LIMIT 10;
```

### Cleanup Test Data

```sql
DELETE FROM gurdwaras WHERE name LIKE 'Test%';
DELETE FROM streams WHERE stream_id = 'test123';
```
