# Lindy Integration with Sikh Vocabulary System

**Version:** 1.0
**Purpose:** Use the controlled vocabulary to auto-tag streams for better categorization and SEO

---

## Overview

The Sikh vocabulary system provides a comprehensive controlled vocabulary of 70+ terms across 6 facets:
- **Content Type** (kirtan, katha, paath, etc.)
- **Bani** (Japji Sahib, Asa Di Vaar, etc.)
- **Occasion** (Gurpurab, Vaisakhi, etc.)
- **Location** (Gurdwara, Harmandir Sahib, etc.)
- **Role** (Raagi, Granthi, Sangat, etc.)
- **Practice** (Hukamnama, Ardas, Langar, etc.)

Lindy can use these terms to:
1. **Auto-tag streams** based on title/description
2. **Improve search/filtering** on the website
3. **Generate SEO-friendly titles**
4. **Track popular content types**

---

## Database Setup

### Run Vocabulary Migrations

In addition to the main streaming migration, run these:

```sql
-- 1. Core vocabulary schema
-- File: supabase/migrations/20260105_sikh_vocabulary.sql

-- 2. Seed terms data (70+ terms)
-- File: supabase/migrations/20260105_seed_vocabulary.sql

-- 3. Seed bani compositions
-- File: supabase/migrations/20260105_seed_bani_compositions.sql
```

**Verify:**
```sql
-- Should return 70+ terms
SELECT COUNT(*) FROM terms;

-- Should return content_type, bani, occasion, location, role, practice
SELECT facet, COUNT(*) FROM terms GROUP BY facet;

-- Should return 13+ banis
SELECT COUNT(*) FROM bani_compositions;
```

---

## Lindy Automation: Enhanced Program Type Detection

### Step 7A: Detect Terms Using Vocabulary (Enhanced AI)

**Lindy Action:** AI Extraction

**Prompt:**
```
Analyze this YouTube stream to detect Sikh terminology:

Title: {{stream_details.title}}
Description: {{stream_details.description}}

Using this vocabulary, identify which terms apply:

CONTENT TYPES:
- kirtan (devotional singing)
- katha (discourse)
- paath (scriptural reading)
- akhand paath (48-hour continuous reading)
- simran (meditation)
- diwan (congregation)
- samagam (religious gathering)

BANI (Prayers):
- Japji Sahib (morning prayer)
- Jaap Sahib (morning hymn)
- Asa Di Vaar (morning ballad)
- Rehras Sahib (evening prayer)
- Kirtan Sohila (bedtime prayer)
- Sukhmani Sahib (psalm of peace)
- Chaupai Sahib (protection prayer)
- Anand Sahib (song of bliss)

OCCASIONS:
- Gurpurab (Guru's anniversary)
- Vaisakhi (Sikh New Year)
- Nagar Kirtan (street procession)
- Akhand Kirtan (continuous kirtan)

TIME INDICATORS:
- Amrit Vela (pre-dawn, 3-6 AM)
- Morning program
- Evening program

Return a JSON array of detected terms with confidence:
{
  "terms": [
    {"term": "kirtan", "confidence": 0.9, "facet": "content_type"},
    {"term": "asa di vaar", "confidence": 0.85, "facet": "bani"},
    {"term": "amrit vela", "confidence": 0.7, "facet": "practice"}
  ]
}

Only include terms with confidence > 0.5.
```

**Save as:** `detected_terms_json`

---

### Step 7B: Insert Detected Terms to Database

**Lindy Action:** Loop through detected terms

**For each term in detected_terms_json.terms:**

1. **Find term ID in vocabulary:**

**Endpoint:** `GET https://[project].supabase.co/rest/v1/terms`

**Query:**
```
?transliteration=eq.{{term.term}}&select=id,facet
```

**Save as:** `term_record`

2. **Insert stream_term relationship:**

**Endpoint:** `POST https://[project].supabase.co/rest/v1/stream_terms`

**Body:**
```json
{
  "stream_id": "{{stream.id}}",
  "term_id": "{{term_record.id}}",
  "detection_method": "ai_detected",
  "confidence_score": {{term.confidence}},
  "created_by": "lindy"
}
```

---

## Alternative: Simple Keyword Matching

If AI detection is too complex, use simple keyword matching:

### Step 7C: Simple Term Detection (No AI)

**Lindy Action:** Text Processing

**Logic:**
```javascript
// Pseudo-code for Lindy

const title = "{{stream_details.title}}".toLowerCase();
const description = "{{stream_details.description}}".toLowerCase();

// Content type detection
if (title.includes("kirtan") || description.includes("kirtan")) {
  detected_terms.push({ term: "kirtan", confidence: 0.9, facet: "content_type" });
}

if (title.includes("katha") || description.includes("katha")) {
  detected_terms.push({ term: "katha", confidence: 0.9, facet: "content_type" });
}

if (title.includes("akhand paath") || title.includes("akhand path")) {
  detected_terms.push({ term: "akhand paath", confidence: 0.95, facet: "content_type" });
}

// Bani detection
if (title.includes("japji") || title.includes("japuji")) {
  detected_terms.push({ term: "japji sahib", confidence: 0.85, facet: "bani" });
}

if (title.includes("asa di vaar") || title.includes("asa ki var")) {
  detected_terms.push({ term: "asa di vaar", confidence: 0.9, facet: "bani" });
}

if (title.includes("sukhmani")) {
  detected_terms.push({ term: "sukhmani sahib", confidence: 0.9, facet: "bani" });
}

if (title.includes("rehras") || title.includes("rehiras")) {
  detected_terms.push({ term: "rehras sahib", confidence: 0.85, facet: "bani" });
}

// Occasion detection
if (title.includes("gurpurab") || title.includes("gurpurb")) {
  detected_terms.push({ term: "gurpurab", confidence: 0.95, facet: "occasion" });
}

if (title.includes("vaisakhi") || title.includes("baisakhi")) {
  detected_terms.push({ term: "vaisakhi", confidence: 0.95, facet: "occasion" });
}

// Time-based detection
if (title.includes("amrit vela") || title.includes("amritvela")) {
  detected_terms.push({ term: "amrit vela", confidence: 0.8, facet: "practice" });
}

// Location detection
if (title.includes("golden temple") || title.includes("harmandir sahib") || title.includes("darbar sahib")) {
  detected_terms.push({ term: "harmandir sahib", confidence: 0.95, facet: "location" });
}

return detected_terms;
```

---

## Vocabulary-Enhanced Stream Creation

### Update Step 6: Create Stream with Terms

**Original stream creation body + vocabulary fields:**

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

  // ENHANCED: Use detected primary term for program_type
  "program_type": "{{detected_terms[0].term}}",

  "actual_start_time": "{{stream_details.start_time}}",
  "viewer_count": {{stream_details.viewer_count}},
  "language": "punjabi",
  "discovered_by": "lindy",
  "last_checked_at": "{{now}}"
}
```

**Then immediately tag with all detected terms** (Step 7B).

---

## Benefits of Vocabulary Tagging

### 1. Better Search & Filtering

Users can filter by:
- "Show me all **Asa Di Vaar** streams"
- "Find **katha** programs happening now"
- "Gurpurab celebrations live"

### 2. SEO Optimization

Proper terminology improves Google search rankings:
- ✅ "Live Japji Sahib Paath - Gurdwara San Jose"
- ❌ "Morning prayer live stream"

### 3. Analytics

Track what content is most popular:
```sql
SELECT
  t.transliteration,
  t.facet,
  COUNT(st.stream_id) as stream_count,
  AVG(st.confidence_score) as avg_confidence
FROM terms t
JOIN stream_terms st ON t.id = st.term_id
GROUP BY t.id
ORDER BY stream_count DESC
LIMIT 10;
```

### 4. Future Features

- **Personalized recommendations**: "You watched Sukhmani Sahib, here's more paath"
- **Schedule predictions**: "Asa Di Vaar typically streams at 5 AM"
- **Content completion tracking**: "Listen to all 5 Nitnem banis"

---

## Testing Vocabulary Detection

### Test 1: Well-labeled Stream

**Input:**
```
Title: "Asa Di Vaar - Amrit Vela | Live from Harmandir Sahib"
Description: "Join us for morning Asa Ki Var kirtan from the Golden Temple"
```

**Expected Detection:**
- ✅ "asa di vaar" (bani) - confidence 0.95
- ✅ "amrit vela" (practice) - confidence 0.9
- ✅ "harmandir sahib" (location) - confidence 0.95
- ✅ "kirtan" (content_type) - confidence 0.8

### Test 2: Generic Stream

**Input:**
```
Title: "Live Stream - Sunday Morning"
Description: "Gurbani kirtan and katha"
```

**Expected Detection:**
- ✅ "kirtan" (content_type) - confidence 0.9
- ✅ "katha" (content_type) - confidence 0.9
- ⚠️ May not detect specific bani

### Test 3: Special Event

**Input:**
```
Title: "Gurpurab Special - Akhand Paath Bhog Ceremony"
Description: "Completion of 48-hour continuous reading"
```

**Expected Detection:**
- ✅ "gurpurab" (occasion) - confidence 0.95
- ✅ "akhand paath" (content_type) - confidence 0.95
- ✅ "bhog" (practice) - confidence 0.85

---

## Vocabulary Maintenance

### Adding New Terms

If Lindy encounters unknown terms frequently:

1. **Track missed terms** (log to Google Sheet)
2. **Manual review** weekly
3. **Add to vocabulary:**

```sql
INSERT INTO terms (transliteration, english_gloss, description, facet, gurmukhi, is_live_stream_relevant)
VALUES (
  'new_term',
  'English meaning',
  'Description of when this appears',
  'content_type', -- or appropriate facet
  'ਗੁਰਮੁਖੀ',
  true
);
```

4. **Add aliases** for common misspellings:

```sql
INSERT INTO term_aliases (term_id, alias_text, alias_type)
VALUES (
  (SELECT id FROM terms WHERE transliteration = 'new_term'),
  'common misspelling',
  'spelling_variant'
);
```

### Popular Terms to Watch

Monitor these high-value terms:
- **Nitnem banis**: Japji, Jaap, Rehras, Kirtan Sohila
- **Morning programs**: Asa Di Vaar, Amrit Vela
- **Long paaths**: Sukhmani Sahib, Akhand Paath
- **Special occasions**: Gurpurab, Vaisakhi, Bandi Chor Divas
- **Major locations**: Golden Temple, Akal Takhat

---

## Integration with Frontend

### Display Terms on Stream Page

**In `/streams/[id]/page.tsx`:**

```typescript
// Fetch stream with terms
const streamWithTerms = await supabase
  .from('streams_with_terms')
  .select('*')
  .eq('stream_id', id)
  .single();

// Display tags
<div className="flex flex-wrap gap-2">
  {streamWithTerms.detected_terms?.map(term => (
    <span key={term.term_id} className="px-3 py-1 bg-[#FF9933] text-white rounded-full text-sm">
      {term.transliteration}
    </span>
  ))}
</div>
```

### Filter Streams by Term

```typescript
// Add filter controls
const [selectedFacet, setSelectedFacet] = useState<string>('all');

// Filter streams
const filteredStreams = streams.filter(stream => {
  if (selectedFacet === 'all') return true;
  return stream.detected_terms?.some(t => t.facet === selectedFacet);
});
```

---

## Troubleshooting

### Issue: Terms not being detected

**Check:**
1. Is the term in the vocabulary? `SELECT * FROM terms WHERE transliteration ILIKE '%keyword%'`
2. Are aliases set up? `SELECT * FROM term_aliases WHERE alias_text ILIKE '%keyword%'`
3. Is confidence threshold too high? Lower from 0.5 to 0.3

### Issue: Wrong terms detected

**Fix:**
1. Improve AI prompt with examples of correct/incorrect matches
2. Add context: "Only detect if word appears as standalone term, not within other words"
3. Use word boundary matching in keyword detection

### Issue: Too many terms detected

**Solution:**
- Increase confidence threshold to 0.7
- Limit to top 5 most confident terms per stream
- Prioritize title matches over description matches

---

## Next Steps

1. **Run vocabulary migrations** in Supabase
2. **Update Lindy automation** with term detection (Step 7A/B/C)
3. **Test** with 5-10 streams manually
4. **Monitor** detection accuracy over 24 hours
5. **Refine** AI prompts or keyword lists
6. **Expand vocabulary** with new terms as needed

---

**Ready to enhance your streams with intelligent tagging!** 🏷️
