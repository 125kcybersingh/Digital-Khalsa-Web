-- Seed Data: Bani Compositions from Guru Granth Sahib and Dasam Granth
-- Created: 2026-01-05
-- Description: Detailed information about specific bani compositions

-- ============================================================================
-- NITNEM BANIS (Daily Prayers)
-- ============================================================================

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
  number_of_pauris,
  term_id
) VALUES
-- Morning Nitnem
(
  'Japji Sahib',
  'Recitation of the Lord',
  'ਜਪੁਜੀ ਸਾਹਿਬ',
  'guru_granth_sahib',
  'Guru Nanak Dev Ji',
  1,
  8,
  true,
  'amrit_vela',
  15,
  'The foundational morning prayer and the essence of Sikh philosophy. Recited during Amrit Vela.',
  40,
  (SELECT id FROM terms WHERE transliteration = 'japji sahib')
),
(
  'Jaap Sahib',
  'Recitation',
  'ਜਾਪੁ ਸਾਹਿਬ',
  'dasam_granth',
  'Guru Gobind Singh Ji',
  NULL,
  NULL,
  true,
  'amrit_vela',
  10,
  'Powerful morning bani from Dasam Granth describing attributes of the Divine.',
  199,
  (SELECT id FROM terms WHERE transliteration = 'jaap sahib')
),
(
  'Tav-Prasad Savaiye',
  'Stanzas of Your Grace',
  'ਤ੍ਵ ਪ੍ਰਸਾਦਿ ਸਵੱਈਏ',
  'dasam_granth',
  'Guru Gobind Singh Ji',
  NULL,
  NULL,
  true,
  'amrit_vela',
  3,
  'Morning bani praising the One Divine.',
  10,
  (SELECT id FROM terms WHERE transliteration = 'tav prasad savaiye')
),
(
  'Chaupai Sahib',
  'Quartet',
  'ਚੌਪਈ ਸਾਹਿਬ',
  'dasam_granth',
  'Guru Gobind Singh Ji',
  NULL,
  NULL,
  true,
  'evening',
  5,
  'Evening prayer seeking divine protection from negativity.',
  25,
  (SELECT id FROM terms WHERE transliteration = 'chaupai sahib')
),
(
  'Anand Sahib',
  'Song of Bliss',
  'ਅਨੰਦੁ ਸਾਹਿਬ',
  'guru_granth_sahib',
  'Guru Amar Das Ji',
  917,
  922,
  true,
  'anytime',
  7,
  'Bani expressing the blissful state of union with the Divine. Part of daily nitnem and Anand Karaj.',
  40,
  (SELECT id FROM terms WHERE transliteration = 'anand sahib')
),
(
  'Rehras Sahib',
  'Evening Prayer',
  'ਰਹਿਰਾਸ ਸਾਹਿਬ',
  'guru_granth_sahib',
  'Multiple Gurus',
  8,
  12,
  true,
  'evening',
  10,
  'Composite evening prayer combining shabads from multiple Gurus for spiritual reflection.',
  9,
  (SELECT id FROM terms WHERE transliteration = 'rehras sahib')
),
(
  'Kirtan Sohila',
  'Song of Praise',
  'ਕੀਰਤਨ ਸੋਹਿਲਾ',
  'guru_granth_sahib',
  'Multiple Gurus',
  12,
  13,
  true,
  'bedtime',
  5,
  'Bedtime prayer sung before sleep and also recited during Antim Ardas (funeral).',
  5,
  (SELECT id FROM terms WHERE transliteration = 'kirtan sohila')
);

-- ============================================================================
-- POPULAR PAATH BANIS (Commonly Live-Streamed)
-- ============================================================================

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
  number_of_pauris,
  raag,
  popularity_score,
  term_id
) VALUES
(
  'Sukhmani Sahib',
  'Psalm of Peace',
  'ਸੁਖਮਨੀ ਸਾਹਿਬ',
  'guru_granth_sahib',
  'Guru Arjan Dev Ji',
  262,
  296,
  false,
  'anytime',
  90,
  'The Psalm of Peace, containing 24 Ashtapadis (8-verse stanzas) about attaining tranquility and spiritual wisdom. Extremely popular for paath.',
  24,
  'Gauri',
  100,
  (SELECT id FROM terms WHERE transliteration = 'sukhmani sahib')
),
(
  'Asa Di Vaar',
  'Ballad of Hope',
  'ਆਸਾ ਦੀ ਵਾਰ',
  'guru_granth_sahib',
  'Guru Nanak Dev Ji',
  462,
  475,
  false,
  'morning',
  45,
  'Morning ballad sung in classical Asa raag, traditionally sung Monday through Saturday mornings. Contains 24 pauris with sloks.',
  24,
  'Asa',
  95,
  (SELECT id FROM terms WHERE transliteration = 'asa di vaar')
),
(
  'Dukh Bhanjani Sahib',
  'Eradicator of Suffering',
  'ਦੁਖ ਭੰਜਨੀ ਸਾਹਿਬ',
  'guru_granth_sahib',
  'Guru Arjan Dev Ji',
  628,
  633,
  false,
  'anytime',
  30,
  'Compilation of shabads for relief from suffering and ailments. Very popular during times of difficulty.',
  NULL,
  'Raag Suhi',
  85,
  (SELECT id FROM terms WHERE transliteration = 'dukh bhanjani sahib')
),
(
  'Barah Maha',
  'Twelve Months',
  'ਬਾਰਹ ਮਾਹਾ',
  'guru_granth_sahib',
  'Guru Nanak Dev Ji',
  133,
  136,
  false,
  'anytime',
  25,
  'Bani describing spiritual yearning through the metaphor of twelve months. Beautiful poetic composition.',
  12,
  'Tukhari',
  60,
  (SELECT id FROM terms WHERE transliteration = 'barah maha')
),
(
  'Sidh Gosht',
  'Dialogue with Siddhas',
  'ਸਿਧ ਗੋਸਟਿ',
  'guru_granth_sahib',
  'Guru Nanak Dev Ji',
  938,
  946,
  false,
  'anytime',
  40,
  'Guru Nanak''s philosophical dialogue with the Nath yogis at Gorakhmata. Profound discussion on the true path.',
  73,
  'Ramkali',
  50,
  (SELECT id FROM terms WHERE transliteration = 'sidh gosht')
);

-- ============================================================================
-- OTHER SIGNIFICANT COMPOSITIONS
-- ============================================================================

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
  raag,
  popularity_score
) VALUES
(
  'Japji Sahib (Complete)',
  'Complete Recitation of the Lord',
  'ਜਪੁਜੀ ਸਾਹਿਬ (ਸੰਪੂਰਨ)',
  'guru_granth_sahib',
  'Guru Nanak Dev Ji',
  1,
  8,
  false,
  'amrit_vela',
  20,
  'Full recitation including all 38 Pauris, Mool Mantar, and Slok. Foundation of Sikh philosophy.',
  NULL,
  100
),
(
  'Sukhmani Sahib (Single Ashtapadi)',
  'One Section of Psalm of Peace',
  'ਸੁਖਮਨੀ ਸਾਹਿਬ (ਇੱਕ ਅਸ਼ਟਪਦੀ)',
  'guru_granth_sahib',
  'Guru Arjan Dev Ji',
  262,
  296,
  false,
  'anytime',
  7,
  'Individual Ashtapadi (section) from Sukhmani Sahib. Often recited one per day.',
  'Gauri',
  70
),
(
  'Anand Sahib (Short)',
  'Shortened Song of Bliss',
  'ਅਨੰਦੁ ਸਾਹਿਬ (ਛੋਟਾ)',
  'guru_granth_sahib',
  'Guru Amar Das Ji',
  917,
  922,
  false,
  'anytime',
  3,
  'Shortened version (first 5 and last pauri) used in Anand Karaj and ceremonies.',
  'Ramkali',
  80
),
(
  'Shabad Hazare',
  'Thousand Shabads',
  'ਸ਼ਬਦ ਹਜ਼ਾਰੇ',
  'guru_granth_sahib',
  'Guru Tegh Bahadur Ji',
  711,
  711,
  false,
  'anytime',
  10,
  'Collection of shabads by Guru Tegh Bahadur Ji expressing deep spiritual longing.',
  'Jaijawanti',
  65
),
(
  'Salok Mahalla 9',
  'Stanzas of the Ninth Guru',
  'ਸਲੋਕ ਮਹਲਾ ੯',
  'guru_granth_sahib',
  'Guru Tegh Bahadur Ji',
  1426,
  1429,
  false,
  'anytime',
  15,
  'Collection of 57 saloks (couplets) by Guru Tegh Bahadur Ji. Profound spiritual wisdom.',
  NULL,
  60
),
(
  'Akal Ustat',
  'Praise of the Timeless',
  'ਅਕਾਲ ਉਸਤਤਿ',
  'dasam_granth',
  'Guru Gobind Singh Ji',
  NULL,
  NULL,
  false,
  'anytime',
  30,
  'Praise of the Timeless One from Dasam Granth. Beautiful poetry describing Divine attributes.',
  NULL,
  55
);

-- ============================================================================
-- RAAG-BASED CLASSIFICATIONS (for Asa Di Vaar timing)
-- ============================================================================

-- Link Asa Di Vaar to time-specific practices
UPDATE bani_compositions
SET search_keywords = ARRAY['morning', 'asa', 'vaar', 'amrit vela', 'early morning', 'classical']
WHERE name_transliteration = 'Asa Di Vaar';

-- ============================================================================
-- VERIFICATION
-- ============================================================================

-- Display summary
SELECT
  source_granth,
  COUNT(*) as composition_count,
  SUM(CASE WHEN is_nitnem THEN 1 ELSE 0 END) as nitnem_count,
  ROUND(AVG(typical_duration_minutes)) as avg_duration_minutes
FROM bani_compositions
GROUP BY source_granth;

-- Display nitnem banis in order
SELECT
  name_transliteration,
  name_english,
  recitation_time,
  typical_duration_minutes as duration_min
FROM bani_compositions
WHERE is_nitnem = true
ORDER BY
  CASE recitation_time
    WHEN 'amrit_vela' THEN 1
    WHEN 'morning' THEN 2
    WHEN 'evening' THEN 3
    WHEN 'bedtime' THEN 4
    ELSE 5
  END,
  typical_duration_minutes DESC;

-- Display most popular for live streaming
SELECT
  name_transliteration,
  name_english,
  popularity_score,
  typical_duration_minutes as duration_min
FROM bani_compositions
WHERE popularity_score IS NOT NULL
ORDER BY popularity_score DESC
LIMIT 10;
