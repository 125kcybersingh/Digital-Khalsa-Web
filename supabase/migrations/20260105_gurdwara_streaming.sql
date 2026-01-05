-- Migration: Gurdwara Streaming Feature
-- Created: 2026-01-05
-- Description: Tables for gurdwara information and live stream cataloguing

-- Create gurdwaras table
CREATE TABLE IF NOT EXISTS gurdwaras (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Basic Information
  name TEXT NOT NULL,
  slug TEXT UNIQUE,

  -- Location
  address TEXT,
  city TEXT,
  state_province TEXT,
  country TEXT,
  postal_code TEXT,
  timezone TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),

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
  source_platform TEXT,

  -- Analytics
  total_streams_count INTEGER DEFAULT 0,
  active_streams_count INTEGER DEFAULT 0
);

-- Create streams table
CREATE TABLE IF NOT EXISTS streams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Relationships
  gurdwara_id UUID REFERENCES gurdwaras(id) ON DELETE CASCADE,

  -- Stream Details
  platform TEXT NOT NULL,
  stream_url TEXT NOT NULL,
  embed_url TEXT,
  stream_id TEXT,

  -- Status
  status TEXT DEFAULT 'discovered',
  is_live BOOLEAN DEFAULT false,

  -- Stream Metadata
  title TEXT,
  description TEXT,
  thumbnail_url TEXT,
  language TEXT,

  -- Program Information
  program_type TEXT,

  -- Timing
  scheduled_start_time TIMESTAMPTZ,
  actual_start_time TIMESTAMPTZ,
  end_time TIMESTAMPTZ,
  duration_seconds INTEGER,

  -- Engagement Metrics
  viewer_count INTEGER,
  like_count INTEGER,

  -- Quality & Validation
  video_quality TEXT,
  last_checked_at TIMESTAMPTZ,
  error_count INTEGER DEFAULT 0,
  last_error_message TEXT,

  -- Cataloguing for Analysis
  audio_extracted BOOLEAN DEFAULT false,
  analyzed BOOLEAN DEFAULT false,
  analysis_metadata JSONB,

  -- Source Tracking
  discovered_by TEXT DEFAULT 'n8n',
  source_data JSONB
);

-- Create indexes for gurdwaras
CREATE INDEX IF NOT EXISTS idx_gurdwaras_country ON gurdwaras(country);
CREATE INDEX IF NOT EXISTS idx_gurdwaras_city ON gurdwaras(city);
CREATE INDEX IF NOT EXISTS idx_gurdwaras_slug ON gurdwaras(slug);

-- Create indexes for streams
CREATE INDEX IF NOT EXISTS idx_streams_gurdwara ON streams(gurdwara_id);
CREATE INDEX IF NOT EXISTS idx_streams_status ON streams(status);
CREATE INDEX IF NOT EXISTS idx_streams_is_live ON streams(is_live);
CREATE INDEX IF NOT EXISTS idx_streams_platform ON streams(platform);
CREATE INDEX IF NOT EXISTS idx_streams_start_time ON streams(actual_start_time);
CREATE INDEX IF NOT EXISTS idx_streams_program_type ON streams(program_type);

-- Enable Row Level Security
ALTER TABLE gurdwaras ENABLE ROW LEVEL SECURITY;
ALTER TABLE streams ENABLE ROW LEVEL SECURITY;

-- RLS Policies for gurdwaras (public read access)
CREATE POLICY "Allow public read access to gurdwaras"
  ON gurdwaras FOR SELECT
  TO anon, authenticated
  USING (true);

-- RLS Policies for streams (anonymous users see only live streams)
CREATE POLICY "Allow public read access to live streams"
  ON streams FOR SELECT
  TO anon
  USING (status = 'live' OR is_live = true);

-- RLS Policies for streams (authenticated users see all streams)
CREATE POLICY "Allow authenticated read access to all streams"
  ON streams FOR SELECT
  TO authenticated
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to auto-update updated_at
CREATE TRIGGER update_gurdwaras_updated_at
  BEFORE UPDATE ON gurdwaras
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_streams_updated_at
  BEFORE UPDATE ON streams
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create function to update stream counts on gurdwaras
CREATE OR REPLACE FUNCTION update_gurdwara_stream_counts()
RETURNS TRIGGER AS $$
BEGIN
  -- Update total_streams_count
  UPDATE gurdwaras
  SET total_streams_count = (
    SELECT COUNT(*) FROM streams WHERE gurdwara_id = COALESCE(NEW.gurdwara_id, OLD.gurdwara_id)
  ),
  active_streams_count = (
    SELECT COUNT(*) FROM streams
    WHERE gurdwara_id = COALESCE(NEW.gurdwara_id, OLD.gurdwara_id)
    AND is_live = true
  )
  WHERE id = COALESCE(NEW.gurdwara_id, OLD.gurdwara_id);

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update counts when streams change
CREATE TRIGGER update_gurdwara_counts_on_stream_change
  AFTER INSERT OR UPDATE OR DELETE ON streams
  FOR EACH ROW
  EXECUTE FUNCTION update_gurdwara_stream_counts();

-- Create view for active streams with gurdwara info (convenient for API)
CREATE OR REPLACE VIEW active_streams_with_gurdwara AS
SELECT
  s.*,
  g.name as gurdwara_name,
  g.slug as gurdwara_slug,
  g.city,
  g.state_province,
  g.country,
  g.timezone,
  g.latitude,
  g.longitude,
  g.logo_url as gurdwara_logo_url,
  g.image_url as gurdwara_image_url
FROM streams s
JOIN gurdwaras g ON s.gurdwara_id = g.id
WHERE s.is_live = true;

-- Grant access to the view
GRANT SELECT ON active_streams_with_gurdwara TO anon, authenticated;
