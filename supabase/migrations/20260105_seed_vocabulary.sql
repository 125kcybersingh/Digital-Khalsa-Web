-- Seed Data: Sikh/Gurbani Controlled Vocabulary
-- Created: 2026-01-05
-- Description: Comprehensive seed data for Sikh terminology

-- ============================================================================
-- CONTENT TYPE TERMS
-- ============================================================================

INSERT INTO terms (transliteration, english_gloss, description, facet, gurmukhi, search_keywords) VALUES
('kirtan', 'Devotional Singing', 'Singing of Shabad/Gurbani with music', 'content_type', 'ਕੀਰਤਨ', ARRAY['kirtan', 'singing', 'music', 'hymns']),
('shabad kirtan', 'Hymn-based Kirtan', 'Hymn-based kirtan from Guru Granth Sahib', 'content_type', 'ਸ਼ਬਦ ਕੀਰਤਨ', ARRAY['shabad', 'hymn', 'gurbani']),
('katha', 'Scriptural Discourse', 'Explanatory discourse on Gurbani or Sikh history', 'content_type', 'ਕਥਾ', ARRAY['discourse', 'sermon', 'explanation', 'teaching']),
('paath', 'Scriptural Reading', 'Scriptural reading/recitation of Gurbani', 'content_type', 'ਪਾਠ', ARRAY['reading', 'recitation', 'path']),
('akhand paath', 'Continuous Reading', 'Continuous, unbroken reading of Guru Granth Sahib (~48 hours)', 'content_type', 'ਅਖੰਡ ਪਾਠ', ARRAY['continuous', 'non-stop', '48 hours', 'akhand path']),
('sehaj paath', 'Leisurely Reading', 'Reading of Guru Granth Sahib at a comfortable pace over days/weeks', 'content_type', 'ਸਹਜ ਪਾਠ', ARRAY['slow reading', 'weekly']),
('nitnem', 'Daily Prayers', 'Daily set of prescribed prayers/bani', 'content_type', 'ਨਿਤਨੇਮ', ARRAY['daily', 'routine', 'prayers']),
('simran', 'Meditation', 'Meditative remembrance/chanting of Waheguru', 'content_type', 'ਸਿਮਰਨ', ARRAY['meditation', 'chanting', 'remembrance', 'naam']),
('dhadi vaar', 'Ballad Singing', 'Ballad-style singing of Sikh history by dhadis', 'content_type', 'ਢਾਡੀ ਵਾਰ', ARRAY['ballad', 'history', 'dhadi', 'var']),
('kirtan darbar', 'Kirtan Assembly', 'Kirtan-focused religious gathering', 'content_type', 'ਕੀਰਤਨ ਦਰਬਾਰ', ARRAY['gathering', 'assembly', 'darbar']),
('samagam', 'Religious Gathering', 'Religious gathering or convention', 'content_type', 'ਸਮਾਗਮ', ARRAY['gathering', 'convention', 'event', 'samagm']),
('diwan', 'Religious Congregation', 'Formal religious congregation with kirtan and katha', 'content_type', 'ਦੀਵਾਨ', ARRAY['congregation', 'assembly', 'divan']),
('rainsbai', 'Night Vigil', 'All-night kirtan program', 'content_type', 'ਰੈਣਸਬਾਈ', ARRAY['all-night', 'vigil', 'rainsabai']);

-- ============================================================================
-- BANI / PRAYER NAMES
-- ============================================================================

INSERT INTO terms (transliteration, english_gloss, description, facet, gurmukhi, search_keywords) VALUES
('japji sahib', 'Morning Prayer', 'Morning bani by Guru Nanak, foundation of Sikh philosophy', 'bani', 'ਜਪੁਜੀ ਸਾਹਿਬ', ARRAY['japuji', 'morning', 'guru nanak', 'nitnem']),
('jaap sahib', 'Morning Hymn', 'Morning bani from Dasam Granth by Guru Gobind Singh', 'bani', 'ਜਾਪੁ ਸਾਹਿਬ', ARRAY['japu', 'morning', 'dasam granth', 'nitnem']),
('tav prasad savaiye', 'Morning Savaiye', 'Morning bani from Dasam Granth', 'bani', 'ਤ੍ਵ ਪ੍ਰਸਾਦਿ ਸਵੱਈਏ', ARRAY['savaiye', 'morning', 'nitnem']),
('chaupai sahib', 'Protection Prayer', 'Evening prayer from Dasam Granth, seeking protection', 'bani', 'ਚੌਪਈ ਸਾਹਿਬ', ARRAY['chaupai', 'protection', 'nitnem']),
('anand sahib', 'Blissful Hymn', 'Bani of bliss by Guru Amar Das', 'bani', 'ਅਨੰਦੁ ਸਾਹਿਬ', ARRAY['anand', 'bliss', 'nitnem']),
('rehras sahib', 'Evening Prayer', 'Evening prayer combining multiple banis', 'bani', 'ਰਹਿਰਾਸ ਸਾਹਿਬ', ARRAY['rehiras', 'evening', 'nitnem', 'rehraas']),
('kirtan sohila', 'Bedtime Prayer', 'Bedtime prayer and hymn sung before sleep', 'bani', 'ਕੀਰਤਨ ਸੋਹਿਲਾ', ARRAY['bedtime', 'night', 'nitnem', 'sohila']),
('sukhmani sahib', 'Psalm of Peace', 'Long composition (24 Ashtapadis) about attaining peace', 'bani', 'ਸੁਖਮਨੀ ਸਾਹਿਬ', ARRAY['peace', 'sukhmani', 'ang 262']),
('asa di vaar', 'Ballad of Hope', 'Morning ballad sung in Asa raag, Monday-Saturday mornings', 'bani', 'ਆਸਾ ਦੀ ਵਾਰ', ARRAY['morning', 'asa', 'vaar', 'var', 'ballad']),
('dukh bhanjani sahib', 'Eradicator of Suffering', 'Bani for relief from suffering', 'bani', 'ਦੁਖ ਭੰਜਨੀ ਸਾਹਿਬ', ARRAY['suffering', 'healing', 'dukh']),
('barah maha', 'Twelve Months', 'Bani describing spiritual yearning through twelve months', 'bani', 'ਬਾਰਹ ਮਾਹਾ', ARRAY['twelve months', 'barah', 'maha']),
('sidh gosht', 'Dialogue with Siddhas', 'Guru Nanak''s dialogue with yogis', 'bani', 'ਸਿਧ ਗੋਸਟਿ', ARRAY['dialogue', 'yogis', 'sidh']),
('ardas', 'Supplication', 'Standing supplicatory prayer of the Sikhs', 'bani', 'ਅਰਦਾਸ', ARRAY['prayer', 'supplication', 'standing']),
('mool mantar', 'Root Mantra', 'The fundamental mantra of Sikhism', 'bani', 'ਮੂਲ ਮੰਤਰ', ARRAY['mantra', 'fundamental', 'mul']);

-- ============================================================================
-- OCCASION / EVENT TERMS
-- ============================================================================

INSERT INTO terms (transliteration, english_gloss, description, facet, gurmukhi, search_keywords) VALUES
('gurpurab', 'Guru''s Anniversary', 'Commemoration of Guru''s birth or jyoti jot', 'occasion', 'ਗੁਰਪੁਰਬ', ARRAY['anniversary', 'celebration', 'gurpurb', 'birthday']),
('vaisakhi', 'Harvest Festival', 'Sikh New Year and Khalsa inauguration day (April 13/14)', 'occasion', 'ਵੈਸਾਖੀ', ARRAY['baisakhi', 'khalsa', 'new year', 'april']),
('bandi chor divas', 'Liberation Day', 'Celebration of Guru Hargobind''s release from prison', 'occasion', 'ਬੰਦੀ ਛੋੜ ਦਿਵਸ', ARRAY['liberation', 'diwali', 'freedom']),
('hola mohalla', 'Sikh Festival', 'Martial arts and valor demonstration day after Holi', 'occasion', 'ਹੋਲਾ ਮਹੱਲਾ', ARRAY['martial', 'valor', 'anandpur']),
('barsi', 'Death Anniversary', 'Death anniversary of a respected figure', 'occasion', 'ਬਰਸੀ', ARRAY['anniversary', 'memorial', 'remembrance']),
('akhand kirtan', 'Continuous Kirtan', 'Nonstop kirtan for many hours or days', 'occasion', 'ਅਖੰਡ ਕੀਰਤਨ', ARRAY['continuous', 'non-stop', 'marathon']),
('nagar kirtan', 'Procession Kirtan', 'Processional kirtan through streets with Guru Granth Sahib', 'occasion', 'ਨਗਰ ਕੀਰਤਨ', ARRAY['procession', 'street', 'parade']),
('amrit sanchar', 'Initiation Ceremony', 'Initiation ceremony into the Khalsa', 'occasion', 'ਅੰਮ੍ਰਿਤ ਸੰਚਾਰ', ARRAY['baptism', 'initiation', 'khalsa', 'amrit']),
('anand karaj', 'Blissful Union', 'Sikh wedding ceremony', 'occasion', 'ਆਨੰਦ ਕਾਰਜ', ARRAY['wedding', 'marriage', 'ceremony']),
('antim ardas', 'Final Prayer', 'Final prayer ceremony (funeral)', 'occasion', 'ਅੰਤਿਮ ਅਰਦਾਸ', ARRAY['funeral', 'last rites', 'cremation']),
('joti jot', 'Merger with Light', 'Passing away of a Guru or revered person', 'occasion', 'ਜੋਤੀ ਜੋਤਿ', ARRAY['passing', 'death', 'merger']);

-- ============================================================================
-- LOCATION / INSTITUTION TERMS
-- ============================================================================

INSERT INTO terms (transliteration, english_gloss, description, facet, gurmukhi, search_keywords) VALUES
('gurdwara', 'Gateway to Guru', 'Sikh place of worship', 'location', 'ਗੁਰਦੁਆਰਾ', ARRAY['temple', 'gurudwara', 'gurdwara']),
('harmandir sahib', 'Golden Temple', 'The holiest Gurdwara in Amritsar (Golden Temple)', 'location', 'ਹਰਿਮੰਦਰ ਸਾਹਿਬ', ARRAY['golden temple', 'amritsar', 'darbar sahib']),
('akal takhat', 'Throne of Timeless', 'Highest seat of temporal authority for Sikhs', 'location', 'ਅਕਾਲ ਤਖ਼ਤ', ARRAY['takht', 'throne', 'amritsar', 'temporal']),
('takhat sri patna sahib', 'Throne of Patna', 'One of five Takhats, birthplace of Guru Gobind Singh', 'location', 'ਤਖ਼ਤ ਸ੍ਰੀ ਪਟਨਾ ਸਾਹਿਬ', ARRAY['takht', 'patna', 'birthplace']),
('takhat sri keshgarh sahib', 'Throne of Anandpur', 'One of five Takhats, Khalsa foundation site', 'location', 'ਤਖ਼ਤ ਸ੍ਰੀ ਕੇਸਗੜ੍ਹ ਸਾਹਿਬ', ARRAY['takht', 'anandpur', 'khalsa']),
('takhat sri damdama sahib', 'Throne of Talwandi', 'One of five Takhats in Talwandi Sabo', 'location', 'ਤਖ਼ਤ ਸ੍ਰੀ ਦਮਦਮਾ ਸਾਹਿਬ', ARRAY['takht', 'talwandi', 'damdama']),
('takhat sri hazur sahib', 'Throne of Hazur', 'One of five Takhats in Nanded, Maharashtra', 'location', 'ਤਖ਼ਤ ਸ੍ਰੀ ਹਜ਼ੂਰ ਸਾਹਿਬ', ARRAY['takht', 'nanded', 'hazur']),
('diwan hall', 'Congregation Hall', 'Main prayer hall in a gurdwara', 'location', 'ਦੀਵਾਨ ਹਾਲ', ARRAY['hall', 'main hall', 'darbar hall']),
('langar hall', 'Community Kitchen', 'Free community kitchen and dining hall', 'location', 'ਲੰਗਰ ਹਾਲ', ARRAY['kitchen', 'dining', 'free food']);

-- ============================================================================
-- ROLE / PARTICIPANT TERMS
-- ============================================================================

INSERT INTO terms (transliteration, english_gloss, description, facet, gurmukhi, search_keywords) VALUES
('raagi', 'Kirtan Singer', 'Professional or trained kirtan singer', 'role', 'ਰਾਗੀ', ARRAY['singer', 'musician', 'raggi', 'kirtani']),
('granthi', 'Scripture Reader', 'Scriptural reader and caretaker of Guru Granth Sahib', 'role', 'ਗ੍ਰੰਥੀ', ARRAY['reader', 'caretaker', 'priest']),
('kathavachak', 'Discourse Giver', 'Person delivering katha (discourse)', 'role', 'ਕਥਾਵਾਚਕ', ARRAY['speaker', 'preacher', 'katha speaker']),
('dhadi', 'Ballad Singer', 'Traditional Sikh ballad singer/storyteller', 'role', 'ਢਾਡੀ', ARRAY['ballad', 'storyteller', 'dhadhi']),
('jatha', 'Group/Ensemble', 'Group of kirtan performers or sewadars', 'role', 'ਜਥਾ', ARRAY['group', 'ensemble', 'team']),
('sangat', 'Congregation', 'Congregation/community of devotees', 'role', 'ਸੰਗਤ', ARRAY['congregation', 'community', 'devotees', 'sadh sangat']),
('panj piare', 'Beloved Five', 'Collective of five initiated Sikhs leading ceremonies', 'role', 'ਪੰਜ ਪਿਆਰੇ', ARRAY['five', 'beloved', 'khalsa', 'panj pyare']),
('sewadar', 'Volunteer', 'Person performing seva (selfless service)', 'role', 'ਸੇਵਾਦਾਰ', ARRAY['volunteer', 'server', 'servant']);

-- ============================================================================
-- PRACTICE / RITUAL TERMS
-- ============================================================================

INSERT INTO terms (transliteration, english_gloss, description, facet, gurmukhi, search_keywords) VALUES
('hukamnama', 'Divine Order', 'Daily random shabad taken from Guru Granth Sahib as guidance', 'practice', 'ਹੁਕਮਨਾਮਾ', ARRAY['order', 'hukam', 'daily verse', 'random shabad']),
('langar', 'Free Kitchen', 'Free community kitchen/meal service', 'practice', 'ਲੰਗਰ', ARRAY['free food', 'community meal', 'kitchen']),
('seva', 'Selfless Service', 'Selfless service to community or gurdwara', 'practice', 'ਸੇਵਾ', ARRAY['service', 'volunteering', 'sewa']),
('karah parshad', 'Sacred Sweet', 'Sacred sweet pudding distributed as blessing', 'practice', 'ਕੜਾਹ ਪ੍ਰਸ਼ਾਦ', ARRAY['prashad', 'prasad', 'sweet', 'blessing']),
('rumala', 'Cloth Cover', 'Decorative cloth covering for Guru Granth Sahib', 'practice', 'ਰੁਮਾਲਾ', ARRAY['cover', 'cloth', 'chaur']),
('palki sahib', 'Palanquin', 'Palanquin or platform for Guru Granth Sahib', 'practice', 'ਪਾਲਕੀ ਸਾਹਿਬ', ARRAY['palanquin', 'throne', 'platform']),
('chaur sahib', 'Royal Whisk', 'Ceremonial whisk waved over Guru Granth Sahib', 'practice', 'ਚੌਰ ਸਾਹਿਬ', ARRAY['whisk', 'fan', 'chauri']),
('sukhasan', 'Resting Ceremony', 'Ceremony of putting Guru Granth Sahib to rest for the night', 'practice', 'ਸੁਖਾਸਨ', ARRAY['rest', 'night ceremony', 'closing']),
('prakash', 'Opening Ceremony', 'Morning ceremony of opening Guru Granth Sahib', 'practice', 'ਪ੍ਰਕਾਸ਼', ARRAY['opening', 'morning ceremony', 'parkash']),
('bhog', 'Completion', 'Completion ceremony of paath or reading', 'practice', 'ਭੋਗ', ARRAY['completion', 'ending', 'conclusion']);

-- ============================================================================
-- TIME-BASED TERMS
-- ============================================================================

INSERT INTO terms (transliteration, english_gloss, description, facet, gurmukhi, search_keywords) VALUES
('amrit vela', 'Ambrosial Hours', 'Pre-dawn hours (3-6 AM), most sacred time for prayer', 'practice', 'ਅੰਮ੍ਰਿਤ ਵੇਲਾ', ARRAY['early morning', 'pre-dawn', '4am', 'amritvela']),
('asa di vaar time', 'Morning Hymn Time', 'Early morning time for Asa Di Vaar (typically 4-6 AM)', 'practice', 'ਆਸਾ ਦੀ ਵਾਰ ਸਮਾਂ', ARRAY['morning', 'asa time']);

-- ============================================================================
-- TERM ALIASES
-- ============================================================================

-- Kirtan variations
INSERT INTO term_aliases (term_id, alias_text, alias_type)
SELECT id, 'keertan', 'spelling_variant' FROM terms WHERE transliteration = 'kirtan'
UNION ALL
SELECT id, 'kirtan darbar', 'common_name' FROM terms WHERE transliteration = 'kirtan darbar'
UNION ALL
SELECT id, 'kirtan divan', 'spelling_variant' FROM terms WHERE transliteration = 'kirtan darbar';

-- Gurdwara variations
INSERT INTO term_aliases (term_id, alias_text, alias_type)
SELECT id, 'gurudwara', 'spelling_variant' FROM terms WHERE transliteration = 'gurdwara'
UNION ALL
SELECT id, 'gurdwara sahib', 'common_name' FROM terms WHERE transliteration = 'gurdwara';

-- Bani name variations
INSERT INTO term_aliases (term_id, alias_text, alias_type)
SELECT id, 'japuji sahib', 'spelling_variant' FROM terms WHERE transliteration = 'japji sahib'
UNION ALL
SELECT id, 'jap ji', 'abbreviation' FROM terms WHERE transliteration = 'japji sahib'
UNION ALL
SELECT id, 'japu sahib', 'spelling_variant' FROM terms WHERE transliteration = 'jaap sahib'
UNION ALL
SELECT id, 'rehiras sahib', 'spelling_variant' FROM terms WHERE transliteration = 'rehras sahib'
UNION ALL
SELECT id, 'rehraas sahib', 'spelling_variant' FROM terms WHERE transliteration = 'rehras sahib'
UNION ALL
SELECT id, 'asa ki vaar', 'spelling_variant' FROM terms WHERE transliteration = 'asa di vaar'
UNION ALL
SELECT id, 'asa ki var', 'spelling_variant' FROM terms WHERE transliteration = 'asa di vaar';

-- Golden Temple variations
INSERT INTO term_aliases (term_id, alias_text, alias_type)
SELECT id, 'golden temple', 'common_name' FROM terms WHERE transliteration = 'harmandir sahib'
UNION ALL
SELECT id, 'darbar sahib', 'common_name' FROM terms WHERE transliteration = 'harmandir sahib'
UNION ALL
SELECT id, 'hari mandir', 'spelling_variant' FROM terms WHERE transliteration = 'harmandir sahib';

-- Akhand Paath variations
INSERT INTO term_aliases (term_id, alias_text, alias_type)
SELECT id, 'akhand path', 'spelling_variant' FROM terms WHERE transliteration = 'akhand paath'
UNION ALL
SELECT id, 'akhand paath sahib', 'common_name' FROM terms WHERE transliteration = 'akhand paath'
UNION ALL
SELECT id, 'sehaj path', 'spelling_variant' FROM terms WHERE transliteration = 'sehaj paath';

-- Sangat variations
INSERT INTO term_aliases (term_id, alias_text, alias_type)
SELECT id, 'sadh sangat', 'common_name' FROM terms WHERE transliteration = 'sangat'
UNION ALL
SELECT id, 'sat sangat', 'spelling_variant' FROM terms WHERE transliteration = 'sangat';

-- Raagi variations
INSERT INTO term_aliases (term_id, alias_text, alias_type)
SELECT id, 'raggi', 'spelling_variant' FROM terms WHERE transliteration = 'raagi'
UNION ALL
SELECT id, 'kirtani', 'common_name' FROM terms WHERE transliteration = 'raagi'
UNION ALL
SELECT id, 'ragi jatha', 'common_name' FROM terms WHERE transliteration = 'jatha';

-- Occasion variations
INSERT INTO term_aliases (term_id, alias_text, alias_type)
SELECT id, 'gurpurb', 'spelling_variant' FROM terms WHERE transliteration = 'gurpurab'
UNION ALL
SELECT id, 'baisakhi', 'spelling_variant' FROM terms WHERE transliteration = 'vaisakhi'
UNION ALL
SELECT id, 'basant', 'common_name' FROM terms WHERE transliteration = 'vaisakhi';

-- Practice variations
INSERT INTO term_aliases (term_id, alias_text, alias_type)
SELECT id, 'sewa', 'spelling_variant' FROM terms WHERE transliteration = 'seva'
UNION ALL
SELECT id, 'prasad', 'spelling_variant' FROM terms WHERE transliteration = 'karah parshad'
UNION ALL
SELECT id, 'prashad', 'spelling_variant' FROM terms WHERE transliteration = 'karah parshad'
UNION ALL
SELECT id, 'hukam', 'abbreviation' FROM terms WHERE transliteration = 'hukamnama'
UNION ALL
SELECT id, 'parkash', 'spelling_variant' FROM terms WHERE transliteration = 'prakash';

-- ============================================================================
-- TAG EXAMPLES (for pattern matching in stream titles/descriptions)
-- ============================================================================

-- Kirtan examples
INSERT INTO tag_examples (term_id, example_phrase, context)
SELECT id, 'Live Gurbani Kirtan', 'title' FROM terms WHERE transliteration = 'kirtan'
UNION ALL
SELECT id, 'Shabad Kirtan Darbar', 'title' FROM terms WHERE transliteration = 'shabad kirtan'
UNION ALL
SELECT id, 'Sunday Kirtan Program', 'title' FROM terms WHERE transliteration = 'kirtan'
UNION ALL
SELECT id, 'Akhand Kirtan Smagam', 'title' FROM terms WHERE transliteration = 'akhand kirtan';

-- Paath examples
INSERT INTO tag_examples (term_id, example_phrase, context)
SELECT id, 'Akhand Paath Sahib Live', 'title' FROM terms WHERE transliteration = 'akhand paath'
UNION ALL
SELECT id, 'Sukhmani Sahib Paath', 'title' FROM terms WHERE transliteration = 'sukhmani sahib'
UNION ALL
SELECT id, 'Sehaj Paath Bhog', 'title' FROM terms WHERE transliteration = 'sehaj paath';

-- Bani examples
INSERT INTO tag_examples (term_id, example_phrase, context)
SELECT id, 'Asa Di Vaar - Amrit Vela', 'title' FROM terms WHERE transliteration = 'asa di vaar'
UNION ALL
SELECT id, 'Japji Sahib Path', 'title' FROM terms WHERE transliteration = 'japji sahib'
UNION ALL
SELECT id, 'Rehras Sahib - Evening Prayers', 'title' FROM terms WHERE transliteration = 'rehras sahib'
UNION ALL
SELECT id, 'Kirtan Sohila Paath', 'title' FROM terms WHERE transliteration = 'kirtan sohila';

-- Occasion examples
INSERT INTO tag_examples (term_id, example_phrase, context)
SELECT id, 'Vaisakhi Celebration Live', 'title' FROM terms WHERE transliteration = 'vaisakhi'
UNION ALL
SELECT id, 'Gurpurab Special Kirtan', 'title' FROM terms WHERE transliteration = 'gurpurab'
UNION ALL
SELECT id, 'Nagar Kirtan Procession', 'title' FROM terms WHERE transliteration = 'nagar kirtan';

-- Location examples
INSERT INTO tag_examples (term_id, example_phrase, context)
SELECT id, 'Live from Harmandir Sahib', 'title' FROM terms WHERE transliteration = 'harmandir sahib'
UNION ALL
SELECT id, 'Golden Temple Live Kirtan', 'title' FROM terms WHERE transliteration = 'harmandir sahib'
UNION ALL
SELECT id, 'Gurdwara Sahib Live Stream', 'title' FROM terms WHERE transliteration = 'gurdwara';

-- Practice examples
INSERT INTO tag_examples (term_id, example_phrase, context)
SELECT id, 'Hukamnama from Harmandir Sahib', 'title' FROM terms WHERE transliteration = 'hukamnama'
UNION ALL
SELECT id, 'Sukhasan Ceremony', 'title' FROM terms WHERE transliteration = 'sukhasan'
UNION ALL
SELECT id, 'Prakash Ceremony Live', 'title' FROM terms WHERE transliteration = 'prakash';

-- ============================================================================
-- VERIFICATION
-- ============================================================================

-- Display summary of inserted terms
SELECT
  facet,
  COUNT(*) as term_count
FROM terms
GROUP BY facet
ORDER BY facet;

-- Display total aliases
SELECT COUNT(*) as total_aliases FROM term_aliases;

-- Display total examples
SELECT COUNT(*) as total_examples FROM tag_examples;
