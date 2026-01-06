# Sikh Vocabulary System - Complete Guide

## Overview

The Sikh Vocabulary System is a comprehensive controlled vocabulary database that enables intelligent categorization and tagging of gurdwara live streams using proper Sikh/Gurbani terminology.

**Benefits:**
- ✅ **Auto-categorization**: Streams automatically tagged with correct terminology
- ✅ **Better SEO**: Proper terms improve search engine rankings
- ✅ **Searchable content**: Users can filter by bani, occasion, content type, etc.
- ✅ **Analytics**: Track popular content types and trending banis
- ✅ **Cultural accuracy**: Use correct Gurmukhi transliterations

---

## Database Structure

### Core Tables

#### 1. `terms` (70+ entries)
Controlled vocabulary of Sikh terminology across 6 facets:

| Facet | Count | Examples |
|-------|-------|----------|
| **content_type** | 13 | kirtan, katha, paath, akhand paath, simran |
| **bani** | 14 | Japji Sahib, Asa Di Vaar, Sukhmani Sahib, Rehras Sahib |
| **occasion** | 11 | Gurpurab, Vaisakhi, Nagar Kirtan, Akhand Kirtan |
| **location** | 9 | Gurdwara, Harmandir Sahib, Akal Takhat, Diwan Hall |
| **role** | 8 | Raagi, Granthi, Sangat, Panj Piare, Kathavachak |
| **practice** | 12 | Hukamnama, Ardas, Langar, Seva, Amrit Vela, Prakash |

**Fields:**
- `transliteration` - Standard English spelling (e.g., "kirtan")
- `gurmukhi` - Gurmukhi script (e.g., "ਕੀਰਤਨ")
- `english_gloss` - English meaning (e.g., "Devotional Singing")
- `description` - Full explanation
- `facet` - Category (content_type, bani, occasion, etc.)
- `search_keywords` - Additional searchable terms
- `usage_frequency` - Auto-tracked popularity

#### 2. `term_aliases` (150+ entries)
Alternative spellings and common names:

| Term | Aliases |
|------|---------|
| kirtan | keertan, kirtan darbar, kirtan divan |
| gurdwara | gurudwara, gurdwara sahib |
| japji sahib | japuji sahib, jap ji |
| harmandir sahib | golden temple, darbar sahib, hari mandir |
| akhand paath | akhand path, akhand paath sahib |

#### 3. `bani_compositions` (13+ entries)
Detailed information about specific banis:

| Bani | Source | Duration | Nitnem | Recitation Time |
|------|--------|----------|--------|-----------------|
| Japji Sahib | Guru Granth Sahib | 15 min | ✅ | Amrit Vela |
| Asa Di Vaar | Guru Granth Sahib | 45 min | ❌ | Morning |
| Sukhmani Sahib | Guru Granth Sahib | 90 min | ❌ | Anytime |
| Rehras Sahib | Guru Granth Sahib | 10 min | ✅ | Evening |
| Kirtan Sohila | Guru Granth Sahib | 5 min | ✅ | Bedtime |

**Includes:**
- Ang numbers (page references in Guru Granth Sahib)
- Author Guru
- Number of pauris (verses)
- Raag (musical mode)
- Popularity score

#### 4. `stream_terms` (Many-to-Many)
Links streams to detected terms with confidence scores:

```sql
stream_id | term_id | detection_method | confidence_score
----------|---------|------------------|------------------
uuid-123  | uuid-a  | ai_detected     | 0.95
uuid-123  | uuid-b  | auto_title      | 0.85
uuid-456  | uuid-c  | manual          | 1.00
```

---

## Setup Instructions

### Step 1: Run Migrations

Execute these SQL files in order in Supabase SQL Editor:

```sql
-- 1. Core streaming tables (if not already run)
-- File: supabase/migrations/20260105_gurdwara_streaming.sql

-- 2. Vocabulary schema
-- File: supabase/migrations/20260105_sikh_vocabulary.sql

-- 3. Seed vocabulary terms
-- File: supabase/migrations/20260105_seed_vocabulary.sql

-- 4. Seed bani compositions
-- File: supabase/migrations/20260105_seed_bani_compositions.sql
```

### Step 2: Verify Data

```sql
-- Check terms count (should be 70+)
SELECT facet, COUNT(*) as count
FROM terms
GROUP BY facet
ORDER BY facet;

-- Check aliases count (should be 150+)
SELECT COUNT(*) FROM term_aliases;

-- Check bani count (should be 13+)
SELECT COUNT(*) FROM bani_compositions;

-- View some sample terms
SELECT transliteration, english_gloss, facet, gurmukhi
FROM terms
WHERE facet = 'bani'
ORDER BY usage_frequency DESC
LIMIT 10;
```

### Step 3: Update Lindy Automation

Add vocabulary-based term detection to your Lindy workflow.

See: `docs/lindy-vocabulary-integration.md` for detailed instructions.

---

## API Usage

### Fetch Terms by Facet

```typescript
import { getTerms } from '@/lib/vocabulary';

// Get all bani names
const banis = await getTerms('bani');

// Get all content types
const contentTypes = await getTerms('content_type');

// Get all terms
const allTerms = await getTerms();
```

### Auto-Tag a Stream

```typescript
import { autoTagStream } from '@/lib/vocabulary';

// Automatically detect and tag terms
await autoTagStream(
  'stream-uuid-here',
  'Asa Di Vaar - Live from Golden Temple',
  'Morning kirtan program featuring Asa Ki Var...'
);

// This will create stream_terms records for:
// - "asa di vaar" (bani) - confidence 0.95
// - "harmandir sahib" (location) - confidence 0.9
// - "kirtan" (content_type) - confidence 0.85
```

### Search for Terms

```typescript
import { searchTerms } from '@/lib/vocabulary';

// Full-text search
const results = await searchTerms('morning prayer');
// Returns: Japji Sahib, Asa Di Vaar, Jaap Sahib, etc.
```

### Get Stream with Terms

```typescript
import { supabase } from '@/lib/supabase';

const { data } = await supabase
  .from('streams_with_terms')
  .select('*')
  .eq('stream_id', 'uuid-here')
  .single();

console.log(data.detected_terms);
// [
//   { transliteration: 'kirtan', facet: 'content_type', confidence: 0.9 },
//   { transliteration: 'japji sahib', facet: 'bani', confidence: 0.85 }
// ]
```

---

## Frontend Integration

### Display Tags on Stream Card

```typescript
// components/StreamCard.tsx

import { getStreamTerms } from '@/lib/vocabulary';

export default function StreamCard({ stream }) {
  const terms = await getStreamTerms(stream.id);

  return (
    <div className="stream-card">
      <h3>{stream.title}</h3>

      {/* Display term tags */}
      <div className="flex gap-2 mt-2">
        {terms.map(st => (
          <span
            key={st.id}
            className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs"
          >
            {st.term.transliteration}
          </span>
        ))}
      </div>
    </div>
  );
}
```

### Filter Streams by Term

```typescript
// app/streams/page.tsx

const [selectedTerm, setSelectedTerm] = useState<string | null>(null);

// Filter streams
const filteredStreams = selectedTerm
  ? streams.filter(s =>
      s.detected_terms?.some(t => t.term_id === selectedTerm)
    )
  : streams;

return (
  <div>
    {/* Term filter dropdown */}
    <select onChange={(e) => setSelectedTerm(e.target.value)}>
      <option value="">All Streams</option>
      {banis.map(bani => (
        <option key={bani.id} value={bani.id}>
          {bani.transliteration}
        </option>
      ))}
    </select>

    {/* Stream grid */}
    {filteredStreams.map(stream => (
      <StreamCard key={stream.id} stream={stream} />
    ))}
  </div>
);
```

---

## Lindy Auto-Tagging Integration

### AI-Powered Detection (Recommended)

```javascript
// Lindy AI Prompt
"Analyze this stream title and description:

Title: {{stream.title}}
Description: {{stream.description}}

Detect which Sikh terms apply from these categories:
- Bani: Japji Sahib, Asa Di Vaar, Sukhmani Sahib, Rehras Sahib
- Content: kirtan, katha, paath, akhand paath
- Occasion: Gurpurab, Vaisakhi, Nagar Kirtan

Return JSON:
{
  'terms': [
    {'term': 'asa di vaar', 'confidence': 0.9},
    {'term': 'kirtan', 'confidence': 0.85}
  ]
}
"
```

### Simple Keyword Matching (Fallback)

```javascript
// Lindy JavaScript

const title = "{{stream.title}}".toLowerCase();
const detected = [];

if (title.includes('japji') || title.includes('japuji')) {
  detected.push({ term: 'japji sahib', confidence: 0.9 });
}

if (title.includes('asa di vaar') || title.includes('asa ki var')) {
  detected.push({ term: 'asa di vaar', confidence: 0.95 });
}

if (title.includes('kirtan')) {
  detected.push({ term: 'kirtan', confidence: 0.85 });
}

// Insert to database via Supabase API...
```

---

## Analytics & Insights

### Most Popular Content Types

```sql
SELECT
  t.transliteration,
  t.facet,
  COUNT(DISTINCT st.stream_id) as stream_count,
  AVG(st.confidence_score) as avg_confidence
FROM terms t
JOIN stream_terms st ON t.id = st.term_id
WHERE t.facet = 'content_type'
GROUP BY t.id
ORDER BY stream_count DESC;
```

### Most Streamed Banis

```sql
SELECT
  t.transliteration as bani_name,
  COUNT(DISTINCT st.stream_id) as times_streamed,
  t.usage_frequency
FROM terms t
JOIN stream_terms st ON t.id = st.term_id
WHERE t.facet = 'bani'
GROUP BY t.id
ORDER BY times_streamed DESC
LIMIT 10;
```

### Trending Occasions

```sql
SELECT
  t.transliteration,
  COUNT(st.id) as occurrences,
  MAX(s.actual_start_time) as last_seen
FROM terms t
JOIN stream_terms st ON t.id = st.term_id
JOIN streams s ON st.stream_id = s.id
WHERE t.facet = 'occasion'
  AND s.created_at > NOW() - INTERVAL '7 days'
GROUP BY t.id
ORDER BY occurrences DESC;
```

---

## Vocabulary Expansion

### Adding New Terms

If you discover terms not in the vocabulary:

```sql
-- Add new term
INSERT INTO terms (
  transliteration,
  english_gloss,
  description,
  facet,
  gurmukhi,
  search_keywords
) VALUES (
  'new_term_here',
  'English meaning',
  'Detailed description',
  'content_type', -- or appropriate facet
  'ਗੁਰਮੁਖੀ',
  ARRAY['keyword1', 'keyword2']
);

-- Add aliases
INSERT INTO term_aliases (term_id, alias_text, alias_type)
VALUES (
  (SELECT id FROM terms WHERE transliteration = 'new_term_here'),
  'alternate spelling',
  'spelling_variant'
);
```

### Requesting New Bani Compositions

```sql
INSERT INTO bani_compositions (
  name_transliteration,
  name_english,
  name_gurmukhi,
  source_granth,
  author_guru,
  ang_start,
  ang_end,
  is_nitnem,
  recitation_time,
  typical_duration_minutes,
  description,
  popularity_score
) VALUES (
  'Bani Name',
  'English Translation',
  'ਗੁਰਮੁਖੀ ਨਾਮ',
  'guru_granth_sahib',
  'Guru Name',
  123, -- starting ang
  145, -- ending ang
  false,
  'morning',
  30,
  'Description here',
  50
);
```

---

## Common Use Cases

### 1. Filtering Streams by Bani

```typescript
// Show only Asa Di Vaar streams
const asaDiVaarTerm = await supabase
  .from('terms')
  .select('id')
  .eq('transliteration', 'asa di vaar')
  .single();

const streams = await supabase
  .from('streams')
  .select('*, stream_terms!inner(*)')
  .eq('stream_terms.term_id', asaDiVaarTerm.id)
  .eq('is_live', true);
```

### 2. Finding Nitnem Programs

```typescript
// Get all nitnem banis
const nitnems = await getBaniCompositions({ isNitnem: true });

// Find streams featuring nitnem
const nitnems = await supabase
  .from('bani_compositions')
  .select('id')
  .eq('is_nitnem', true);

const nitnems = await supabase
  .from('streams')
  .select('*, stream_terms!inner(*, term:terms!inner(*))')
  .in('stream_terms.term.term_id', nitnems.map(n => n.term_id));
```

### 3. Upcoming Gurpurabs

```typescript
// Find Gurpurab celebrations
const gurpurabTerm = await supabase
  .from('terms')
  .select('id')
  .eq('transliteration', 'gurpurab')
  .single();

const celebrations = await supabase
  .from('streams')
  .select('*, gurdwara:gurdwaras(*), stream_terms!inner(*)')
  .eq('stream_terms.term_id', gurpurabTerm.id)
  .eq('is_live', true);
```

---

## Troubleshooting

### Terms not detecting

**Check:**
1. Is term in database? `SELECT * FROM terms WHERE transliteration ILIKE '%keyword%'`
2. Are aliases set up? `SELECT * FROM term_aliases WHERE alias_text ILIKE '%keyword%'`
3. Is detection confidence too high? Lower threshold from 0.5 to 0.3

### Duplicate terms created

**Prevent:**
```sql
-- Add unique constraint if needed
ALTER TABLE terms ADD CONSTRAINT unique_transliteration_facet UNIQUE (transliteration, facet);
```

### Performance issues with large datasets

**Optimize:**
```sql
-- Add missing indexes
CREATE INDEX idx_stream_terms_stream_term ON stream_terms(stream_id, term_id);
CREATE INDEX idx_terms_usage ON terms(usage_frequency DESC);

-- Analyze tables
ANALYZE terms;
ANALYZE stream_terms;
```

---

## Resources

- **Full Lindy Guide**: `docs/lindy-vocabulary-integration.md`
- **API Reference**: `lib/vocabulary.ts`
- **Migration Files**: `supabase/migrations/20260105_*.sql`
- **TypeScript Types**: `lib/supabase.ts`

---

## Future Enhancements

Planned features:
- [ ] **Raag detection** - Identify musical modes in kirtan
- [ ] **Shabad recognition** - Link to specific shabads in Guru Granth Sahib
- [ ] **Language detection** - Auto-detect Punjabi, English, Hindi
- [ ] **Ragi/Jatha recognition** - Identify performers
- [ ] **User preferences** - Save favorite banis/content types
- [ ] **Smart notifications** - Alert when favorite bani goes live
- [ ] **Recommendation engine** - Suggest similar streams
- [ ] **Completion tracking** - Track which banis user has listened to

---

**Waheguru Ji Ka Khalsa, Waheguru Ji Ki Fateh!** 🙏
