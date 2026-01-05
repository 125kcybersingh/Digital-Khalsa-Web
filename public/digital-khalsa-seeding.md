# Seeding Content Instructions for Digital Khalsa

This document describes the initial content that MUST be seeded into the Digital Khalsa platform before launch. The goal is to ensure that each key area of the Sikh community has enough high‑quality, curated entries so the directory is immediately useful.

## 1. General Requirements

- All seeded entries must be **real, currently active** resources.
- Each entry must have at least these fields:
  - `title`
  - `short_description` (1–2 sentences)
  - `primary_language` (e.g., `en`, `pa`, `hi`, `fr`)
  - `country_or_region` (e.g., `Global`, `India`, `Canada`, `UK`, `USA`, `Europe`)
  - `formats` (array – e.g., `video`, `audio`, `article`, `podcast`, `course`, `tool`, `library`)
  - `audience` (array – choose from: `kids`, `teens`, `adults`, `educators`, `researchers`, `parents`, `general`)
  - `type` (e.g., `library`, `media_platform`, `advocacy_org`, `course_platform`, `reference_site`, `AI_tool`)
  - `website_url`
  - `is_free` (boolean)
  - `notes_for_review` (optional; any caveats or internal comments)
- For each category below, create AT LEAST the minimum number of entries and include a mix of languages and regions where possible.
- All text must be neutral, non‑partisan, and respectful. If a resource is opinionated or represents a specific jathebandi/lineage, mention this factually in `notes_for_review`.

---

## 2. Categories and Seeding Targets

### 2.1 Gurmat & Gurbani

**Goal:** Provide core Gurbani access, katha, and study tools.

**Minimum entries:** 10

**Required mix:**
- At least 3 global Gurbani access/search tools.
- At least 3 katha/kirtan repositories.
- At least 2 sites focused on santhia/ucharan or Gurbani grammar.

**Example field expectations (pseudo‑JSON):**
```json
{
  "title": "<Platform name – e.g. Gurbani search tool>",
  "short_description": "Online Gurbani search and display with translations and transliterations.",
  "primary_language": "en",
  "country_or_region": "Global",
  "formats": ["tool", "article"],
  "audience": ["adults", "general"],
  "type": "reference_site",
  "website_url": "https://...",
  "is_free": true,
  "notes_for_review": "Includes multiple translations; verify transliteration accuracy."
}
```

### 2.2 Learning Sikhi (Structured Learning)

**Goal:** Platforms that offer structured courses, curricula, and guided study on Sikhi.

**Minimum entries:** 8

**Required mix:**
- At least 3 platforms with multi‑week or modular courses.
- At least 2 sites that provide lesson plans or curricula for regular classes.
- At least 1 resource explicitly for new/adult learners with no prior background.

Each entry should clearly state:
- Whether it is self‑paced or instructor‑led.
- Whether certificates or completion badges are offered.

### 2.3 Sikh Libraries & Archives

**Goal:** Deep reference and research resources for books, manuscripts, and historical documents.

**Minimum entries:** 6

**Required mix:**
- At least 2 large digital libraries focused on Sikh/Panjab heritage.
- At least 2 archives or collections with historical newspapers or rare texts.
- At least 1 encyclopedia‑type site focused on Sikh history/terminology.

Additional fields for these entries:
- `coverage_period` (e.g., `17th–21st century`, `colonial era`, `post‑1984`)
- `material_types` (e.g., `manuscripts`, `books`, `newspapers`, `images`)

### 2.4 Sikh Life & Advocacy

**Goal:** Help users find organisations working on civil rights, education, anti‑bullying, and public awareness.

**Minimum entries:** 8

**Required mix:**
- At least 3 civil‑rights or legal advocacy organizations.
- At least 2 organizations with school toolkits, anti‑bullying guides, or training for educators.
- At least 2 organisations offering public policy or community safety resources.

For each entry, add:
- `focus_areas` (e.g., `education`, `legal`, `policy`, `hate_crime_support`)
- `target_geographies` (e.g., `USA`, `Canada`, `UK`, `Global`)

### 2.5 Kids, Teens & Family

**Goal:** Family‑friendly resources to teach Sikhi to children and support parents/educators.

**Minimum entries:** 10

**Required mix:**
- At least 3 sites with printable activities or worksheets.
- At least 3 kid‑friendly sites (stories, animations, games) about Sikhi.
- At least 2 resources explicitly for parents (guides on talking about Sikhi, school resources, etc.).

For each entry, set:
- `audience` to include `kids` and/or `parents`/`educators`.
- `content_safety_level` (string: `kid_safe`, `parent_supervision_recommended`, `general`).

### 2.6 Media & Inspiration

**Goal:** Good‑quality Sikh media resources: podcasts, YouTube channels, audio platforms, and online magazines.

**Minimum entries:** 10

**Required mix:**
- At least 3 podcast/audio platforms.
- At least 3 YouTube or video‑first channels.
- At least 2 online magazines or blogs with regular Sikh‑focused content.

Add fields:
- `update_frequency` (e.g., `weekly`, `monthly`, `archived`)
- `topics` (e.g., `Gurbani`, `history`, `current_affairs`, `katha`, `kirtan`, `wellbeing`).

### 2.7 Modern Tools & AI

**Goal:** Introduce a small, carefully reviewed set of modern digital tools (including AI) used for learning or exploring Sikhi.

**Minimum entries:** 3–5

**Required mix:**
- At least 1 AI‑powered Q&A or study helper.
- At least 1 non‑AI digital helper (e.g., mobile app, planner, zikr/reminder tool) if available.

For each tool, include:
- `requires_login` (boolean)
- `data_sensitivity_notes` (e.g., "Do not paste private information", etc.)
- `disclaimer` (short string on how the tool should and should not be used, e.g., "AI outputs must be checked against Gurbani and trusted sources.")

---

## 3. Geo & Language Optimization Requirements

We want Digital Khalsa to be geo‑aware. Seeded content must support this by including geo and language data from day one.

### 3.1 Geographic Coverage

For each category above:
- Ensure there are entries from **at least three regions** (e.g., `India`, `North America`, `UK/Europe`, `Global`).
- If a resource genuinely serves the whole world online, set `country_or_region` to `Global`.

Additionally:
- Create at least one **"country collection"** record per major Sikh diaspora region:
  - `India`
  - `Canada`
  - `United Kingdom`
  - `United States`
  - `Australia / New Zealand`
- These can be used later to power landing pages like "Sikh resources in Canada".

### 3.2 Language Coverage

- Every entry must have `primary_language`.
- When a resource supports multiple languages, set an array field:
  - `supported_languages` (e.g., `["pa", "en"]`).
- Ensure at least:
  - 50%+ of entries have `en`.
  - A significant subset (minimum 30% overall) include `pa` (Punjabi – Gurmukhi or Shahmukhi noted in `notes_for_review` if relevant).

---

## 4. Data Format and Storage Expectations

You can choose the internal data model, but it must support:

- Category assignment (one or more of the core categories above).
- Geo filters (`country_or_region`, `target_geographies`).
- Language filters (`primary_language`, `supported_languages`).
- Audience filters.

**Suggested model (for guidance only):**

```ts
interface ResourceEntry {
  id: string;
  title: string;
  short_description: string;
  primary_language: string; // e.g., "en", "pa"
  supported_languages?: string[];
  country_or_region: string; // e.g., "Global", "Canada"
  formats: string[]; // e.g., ["video", "article"]
  audience: string[]; // e.g., ["adults", "educators"]
  type: string; // e.g., "library", "media_platform", "advocacy_org"
  categories: string[]; // e.g., ["Gurmat & Gurbani", "Media & Inspiration"]
  website_url: string;
  is_free: boolean;
  focus_areas?: string[];
  coverage_period?: string;
  material_types?: string[];
  update_frequency?: string;
  content_safety_level?: string;
  requires_login?: boolean;
  data_sensitivity_notes?: string;
  disclaimer?: string;
  notes_for_review?: string;
}
```

You do **not** need to adhere exactly to this interface as long as all the required information can be represented and filtered.

---

## 5. Quality and Review Flags

- Avoid dead/abandoned sites unless they host uniquely important archival content; if so, mark this clearly in `notes_for_review`.
- If a resource is known to be controversial or aligned to a specific political view, set a flag:
  - `has_content_warning` (boolean)
  - `content_warning_text` (short explanation)
- Prefer:
  - Sites with HTTPS.
  - Sites with clear contact information or organizational backing.

Before launch, we should be able to:
- Filter by category, language, region, and audience.
- Show at least **3–5 high quality options per category** for a user in a major diaspora region (e.g., UK, Canada, USA).

This document is the acceptance criteria for seeded content. The seeding task is complete when all counts and field requirements above are satisfied and can be queried via the chosen data model.