-- Test Data for Gurdwara Streaming Feature
-- Run this in Supabase SQL Editor to test the frontend before Lindy automation is set up

-- Insert Test Gurdwaras
INSERT INTO gurdwaras (name, slug, city, state_province, country, description, youtube_url, logo_url, is_verified, source_platform)
VALUES
  (
    'Gurdwara Sahib San Jose',
    'gurdwara-sahib-san-jose',
    'San Jose',
    'California',
    'USA',
    'San Jose Gurdwara Sahib serves the local Sikh community with daily prayers and community programs.',
    'https://youtube.com/@gurdwarasanjose',
    'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400',
    true,
    'youtube'
  ),
  (
    'Sri Harmandir Sahib (Golden Temple)',
    'sri-harmandir-sahib-golden-temple',
    'Amritsar',
    'Punjab',
    'India',
    'The holiest Gurdwara and the most sacred pilgrimage site of Sikhism.',
    'https://youtube.com/@goldentemplelive',
    'https://images.unsplash.com/photo-1591274018161-74b9a58e2e57?w=400',
    true,
    'youtube'
  ),
  (
    'Gurdwara Bangla Sahib',
    'gurdwara-bangla-sahib',
    'New Delhi',
    'Delhi',
    'India',
    'A prominent Sikh gurdwara in Delhi, known for its association with the eighth Sikh Guru.',
    'https://youtube.com/@banglasahib',
    'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=400',
    true,
    'youtube'
  ),
  (
    'Gurdwara Guru Nanak Darbar',
    'gurdwara-guru-nanak-darbar',
    'Surrey',
    'British Columbia',
    'Canada',
    'One of the largest Gurdwaras in North America, serving the Surrey community.',
    'https://youtube.com/@gurunanakdarbar',
    'https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=400',
    false,
    'youtube'
  ),
  (
    'Gurdwara Sahib Fremont',
    'gurdwara-sahib-fremont',
    'Fremont',
    'California',
    'USA',
    'Bay Area gurdwara serving the Sikh community with daily kirtan and langar.',
    'https://youtube.com/@fremontgurdwara',
    'https://images.unsplash.com/photo-1609137145633-423e8e98a1d0?w=400',
    false,
    'youtube'
  );

-- Get the IDs of inserted gurdwaras for reference
DO $$
DECLARE
  san_jose_id UUID;
  golden_temple_id UUID;
  bangla_sahib_id UUID;
  surrey_id UUID;
  fremont_id UUID;
BEGIN
  -- Get IDs
  SELECT id INTO san_jose_id FROM gurdwaras WHERE slug = 'gurdwara-sahib-san-jose';
  SELECT id INTO golden_temple_id FROM gurdwaras WHERE slug = 'sri-harmandir-sahib-golden-temple';
  SELECT id INTO bangla_sahib_id FROM gurdwaras WHERE slug = 'gurdwara-bangla-sahib';
  SELECT id INTO surrey_id FROM gurdwaras WHERE slug = 'gurdwara-guru-nanak-darbar';
  SELECT id INTO fremont_id FROM gurdwaras WHERE slug = 'gurdwara-sahib-fremont';

  -- Insert Test Streams
  INSERT INTO streams (
    gurdwara_id,
    platform,
    stream_url,
    embed_url,
    stream_id,
    status,
    is_live,
    title,
    description,
    thumbnail_url,
    program_type,
    viewer_count,
    language,
    actual_start_time,
    discovered_by
  )
  VALUES
    -- Golden Temple - Asa Di Vaar (most viewers)
    (
      golden_temple_id,
      'youtube',
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      'https://www.youtube.com/embed/dQw4w9WgXcQ',
      'dQw4w9WgXcQ',
      'live',
      true,
      'Asa Di Vaar - Sri Harmandir Sahib Live',
      'Live broadcast of Asa Di Vaar from the Golden Temple, Amritsar. Join us for this sacred morning prayer.',
      'https://images.unsplash.com/photo-1591274018161-74b9a58e2e57?w=800',
      'asa_di_vaar',
      1523,
      'punjabi',
      NOW() - INTERVAL '2 hours',
      'test'
    ),
    -- San Jose - General Kirtan
    (
      san_jose_id,
      'youtube',
      'https://www.youtube.com/watch?v=abc123xyz',
      'https://www.youtube.com/embed/abc123xyz',
      'abc123xyz',
      'live',
      true,
      'Sunday Morning Kirtan - Gurdwara Sahib San Jose',
      'Join us for our weekly Sunday morning kirtan program. Sangat is welcome.',
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800',
      'kirtan',
      342,
      'punjabi',
      NOW() - INTERVAL '1 hour',
      'test'
    ),
    -- Bangla Sahib - Rehras
    (
      bangla_sahib_id,
      'youtube',
      'https://www.youtube.com/watch?v=def456uvw',
      'https://www.youtube.com/embed/def456uvw',
      'def456uvw',
      'live',
      true,
      'Evening Rehras Sahib - Gurdwara Bangla Sahib',
      'Evening prayers from Gurdwara Bangla Sahib, New Delhi.',
      'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800',
      'rehras',
      567,
      'punjabi',
      NOW() - INTERVAL '30 minutes',
      'test'
    ),
    -- Surrey - Katha
    (
      surrey_id,
      'youtube',
      'https://www.youtube.com/watch?v=ghi789rst',
      'https://www.youtube.com/embed/ghi789rst',
      'ghi789rst',
      'live',
      true,
      'Weekly Katha - Guru Nanak Darbar Surrey',
      'Gurbani Katha (discourse) on Sri Guru Granth Sahib Ji.',
      'https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=800',
      'katha',
      189,
      'punjabi',
      NOW() - INTERVAL '45 minutes',
      'test'
    ),
    -- Fremont - General
    (
      fremont_id,
      'youtube',
      'https://www.youtube.com/watch?v=jkl012mno',
      'https://www.youtube.com/embed/jkl012mno',
      'jkl012mno',
      'live',
      true,
      'Saturday Evening Diwan - Fremont Gurdwara',
      'Live evening diwan from Gurdwara Sahib Fremont.',
      'https://images.unsplash.com/photo-1609137145633-423e8e98a1d0?w=800',
      'general',
      95,
      'punjabi',
      NOW() - INTERVAL '15 minutes',
      'test'
    );

  RAISE NOTICE 'Test data inserted successfully!';
  RAISE NOTICE 'Visit http://localhost:3000/streams to see the live streams.';
END $$;

-- Verify data was inserted
SELECT
  'Gurdwaras' as table_name,
  COUNT(*) as count
FROM gurdwaras
UNION ALL
SELECT
  'Live Streams',
  COUNT(*)
FROM streams
WHERE is_live = true;

-- Show the live streams
SELECT
  g.name as gurdwara,
  s.title,
  s.program_type,
  s.viewer_count,
  s.is_live
FROM streams s
JOIN gurdwaras g ON s.gurdwara_id = g.id
WHERE s.is_live = true
ORDER BY s.viewer_count DESC;
