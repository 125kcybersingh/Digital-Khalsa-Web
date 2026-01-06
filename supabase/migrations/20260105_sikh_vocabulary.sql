-- Migration: Sikh/Gurbani Controlled Vocabulary
-- Created: 2026-01-05
-- Description: Controlled vocabulary for tagging streams with Sikh terminology and bani references

-- ============================================================================
-- TERMS TABLE - Core vocabulary
-- ============================================================================
CREATE TABLE IF NOT EXISTS terms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Term identification
  gurmukhi TEXT,
  transliteration TEXT NOT NULL,
  english_gloss TEXT NOT NULL,
  description TEXT,

  -- Classification
  facet TEXT NOT NULL CHECK (facet IN (
    'content_type',    -- kirtan, katha, paath, etc.
    'bani',            -- Japji Sahib, Rehras Sahib, etc.
    'occasion',        -- Gurpurab, Baisakhi, etc.
    'location',        -- Gurdwara, Harmandir Sahib, etc.
    'role',            -- Raagi, Granthi, etc.
    'practice',        -- Ardas, Langar, Seva, etc.
    'other'
  )),

  -- Metadata
  language TEXT DEFAULT 'punjabi' CHECK (language IN ('punjabi', 'gurmukhi', 'english', 'sanskrit')),
  is_live_stream_relevant BOOLEAN DEFAULT true,
  usage_frequency INTEGER DEFAULT 0, -- Track how often this term is used

  -- Search optimization
  search_keywords TEXT[], -- Additional keywords for matching
  parent_term_id UUID REFERENCES terms(id), -- For hierarchical terms (e.g., "Asa Di Vaar" is type of "Nitnem")

  UNIQUE(transliteration, facet)
);

-- ============================================================================
-- TERM ALIASES - Alternative spellings/names
-- ============================================================================
CREATE TABLE IF NOT EXISTS term_aliases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  term_id UUID REFERENCES terms(id) ON DELETE CASCADE,
  alias_text TEXT NOT NULL,
  alias_type TEXT CHECK (alias_type IN ('spelling_variant', 'common_name', 'abbreviation', 'anglicized')),
  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(alias_text)
);

-- ============================================================================
-- TAG EXAMPLES - Example phrases for pattern matching
-- ============================================================================
CREATE TABLE IF NOT EXISTS tag_examples (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  term_id UUID REFERENCES terms(id) ON DELETE CASCADE,
  example_phrase TEXT NOT NULL,
  context TEXT, -- Where this phrase typically appears (title, description, etc.)
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- STREAM_TERMS - Many-to-many relationship between streams and terms
-- ============================================================================
CREATE TABLE IF NOT EXISTS stream_terms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stream_id UUID REFERENCES streams(id) ON DELETE CASCADE,
  term_id UUID REFERENCES terms(id) ON DELETE CASCADE,

  -- How was this term detected?
  detection_method TEXT CHECK (detection_method IN ('auto_title', 'auto_description', 'manual', 'ai_detected')),
  confidence_score DECIMAL(3,2) DEFAULT 1.0, -- 0.0 to 1.0

  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by TEXT DEFAULT 'system',

  UNIQUE(stream_id, term_id)
);

-- ============================================================================
-- BANI_COMPOSITIONS - Specific compositions from Guru Granth Sahib
-- ============================================================================
CREATE TABLE IF NOT EXISTS bani_compositions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Bani identification
  name_gurmukhi TEXT,
  name_transliteration TEXT NOT NULL UNIQUE,
  name_english TEXT NOT NULL,

  -- Source information
  source_granth TEXT CHECK (source_granth IN ('guru_granth_sahib', 'dasam_granth', 'sarbloh_granth', 'bhai_gurdas_vaaran')),
  author_guru TEXT, -- Which Guru or author
  ang_start INTEGER, -- Starting page/ang number
  ang_end INTEGER,   -- Ending page/ang number

  -- Classification
  is_nitnem BOOLEAN DEFAULT false, -- Is this part of daily nitnem?
  recitation_time TEXT CHECK (recitation_time IN ('amrit_vela', 'morning', 'evening', 'bedtime', 'anytime')),
  typical_duration_minutes INTEGER,

  -- Content
  description TEXT,
  number_of_pauris INTEGER, -- Number of stanzas/verses
  raag TEXT, -- Musical mode if applicable

  -- Associations
  term_id UUID REFERENCES terms(id), -- Link to terms table
  parent_composition_id UUID REFERENCES bani_compositions(id), -- For sub-sections

  -- Metadata
  popularity_score INTEGER DEFAULT 0, -- How often it's live-streamed
  search_keywords TEXT[]
);

-- ============================================================================
-- INDEXES
-- ============================================================================

-- Terms table indexes
CREATE INDEX idx_terms_facet ON terms(facet);
CREATE INDEX idx_terms_transliteration ON terms(transliteration);
CREATE INDEX idx_terms_stream_relevant ON terms(is_live_stream_relevant) WHERE is_live_stream_relevant = true;
CREATE INDEX idx_terms_search_keywords ON terms USING GIN(search_keywords);

-- Aliases indexes
CREATE INDEX idx_aliases_term ON term_aliases(term_id);
CREATE INDEX idx_aliases_text ON term_aliases(alias_text);

-- Stream terms indexes
CREATE INDEX idx_stream_terms_stream ON stream_terms(stream_id);
CREATE INDEX idx_stream_terms_term ON stream_terms(term_id);
CREATE INDEX idx_stream_terms_detection ON stream_terms(detection_method);

-- Bani compositions indexes
CREATE INDEX idx_bani_source ON bani_compositions(source_granth);
CREATE INDEX idx_bani_nitnem ON bani_compositions(is_nitnem) WHERE is_nitnem = true;
CREATE INDEX idx_bani_time ON bani_compositions(recitation_time);
CREATE INDEX idx_bani_term ON bani_compositions(term_id);

-- ============================================================================
-- FULL TEXT SEARCH
-- ============================================================================

-- Add tsvector column for full-text search on terms
ALTER TABLE terms ADD COLUMN search_vector tsvector;

CREATE INDEX idx_terms_search_vector ON terms USING GIN(search_vector);

-- Function to update search vector
CREATE OR REPLACE FUNCTION update_terms_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('english', COALESCE(NEW.transliteration, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.english_gloss, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(NEW.description, '')), 'C') ||
    setweight(to_tsvector('english', COALESCE(array_to_string(NEW.search_keywords, ' '), '')), 'D');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update search vector
CREATE TRIGGER update_terms_search_vector_trigger
  BEFORE INSERT OR UPDATE ON terms
  FOR EACH ROW
  EXECUTE FUNCTION update_terms_search_vector();

-- ============================================================================
-- HELPER VIEWS
-- ============================================================================

-- View: All terms with their aliases
CREATE OR REPLACE VIEW terms_with_aliases AS
SELECT
  t.id,
  t.transliteration,
  t.english_gloss,
  t.facet,
  t.description,
  t.is_live_stream_relevant,
  array_agg(DISTINCT ta.alias_text) FILTER (WHERE ta.alias_text IS NOT NULL) as aliases
FROM terms t
LEFT JOIN term_aliases ta ON t.id = ta.term_id
GROUP BY t.id, t.transliteration, t.english_gloss, t.facet, t.description, t.is_live_stream_relevant;

-- View: Streams with their detected terms
CREATE OR REPLACE VIEW streams_with_terms AS
SELECT
  s.id as stream_id,
  s.title as stream_title,
  s.gurdwara_id,
  array_agg(
    jsonb_build_object(
      'term_id', t.id,
      'transliteration', t.transliteration,
      'english_gloss', t.english_gloss,
      'facet', t.facet,
      'confidence', st.confidence_score,
      'detection_method', st.detection_method
    )
  ) FILTER (WHERE t.id IS NOT NULL) as detected_terms
FROM streams s
LEFT JOIN stream_terms st ON s.id = st.stream_id
LEFT JOIN terms t ON st.term_id = t.id
GROUP BY s.id, s.title, s.gurdwara_id;

-- View: Popular terms by usage
CREATE OR REPLACE VIEW popular_terms AS
SELECT
  t.id,
  t.transliteration,
  t.english_gloss,
  t.facet,
  COUNT(st.id) as usage_count,
  AVG(st.confidence_score) as avg_confidence
FROM terms t
LEFT JOIN stream_terms st ON t.id = st.term_id
GROUP BY t.id, t.transliteration, t.english_gloss, t.facet
ORDER BY usage_count DESC;

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE terms ENABLE ROW LEVEL SECURITY;
ALTER TABLE term_aliases ENABLE ROW LEVEL SECURITY;
ALTER TABLE tag_examples ENABLE ROW LEVEL SECURITY;
ALTER TABLE stream_terms ENABLE ROW LEVEL SECURITY;
ALTER TABLE bani_compositions ENABLE ROW LEVEL SECURITY;

-- Public read access to vocabulary
CREATE POLICY "Allow public read access to terms"
  ON terms FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow public read access to aliases"
  ON term_aliases FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow public read access to tag examples"
  ON tag_examples FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow public read access to stream terms"
  ON stream_terms FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow public read access to bani compositions"
  ON bani_compositions FOR SELECT
  TO anon, authenticated
  USING (true);

-- Grant access to views
GRANT SELECT ON terms_with_aliases TO anon, authenticated;
GRANT SELECT ON streams_with_terms TO anon, authenticated;
GRANT SELECT ON popular_terms TO anon, authenticated;

-- ============================================================================
-- TRIGGERS
-- ============================================================================

-- Auto-update updated_at timestamp
CREATE TRIGGER update_terms_updated_at
  BEFORE UPDATE ON terms
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bani_updated_at
  BEFORE UPDATE ON bani_compositions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Update usage frequency when stream_terms is inserted
CREATE OR REPLACE FUNCTION update_term_usage_frequency()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE terms SET usage_frequency = usage_frequency + 1 WHERE id = NEW.term_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE terms SET usage_frequency = GREATEST(0, usage_frequency - 1) WHERE id = OLD.term_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_term_usage_on_stream_term_change
  AFTER INSERT OR DELETE ON stream_terms
  FOR EACH ROW
  EXECUTE FUNCTION update_term_usage_frequency();
