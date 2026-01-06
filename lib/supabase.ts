import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables:', {
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseAnonKey,
  });
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Shabad = {
  id: number;
  source_id: number;
  writer_id: number;
  raag_id: number;
  start_ang: number;
  end_ang: number;
};

export type Line = {
  id: number;
  shabad_id: number;
  source_page: number;
  source_line: number;
  gurmukhi: string;
  transliteration: string | null;
  translation_english: string | null;
  first_letters: string | null;
  first_letters_roman: string | null;
};

export type EmotionTag = {
  id: string;
  shabad_id: number;
  emotion: string;
};

export type ShabadWithLines = Shabad & {
  lines: Line[];
  emotion_tags: EmotionTag[];
};

// Gurdwara Streaming Types
export type Gurdwara = {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  slug: string | null;
  address: string | null;
  city: string | null;
  state_province: string | null;
  country: string | null;
  postal_code: string | null;
  timezone: string | null;
  latitude: number | null;
  longitude: number | null;
  phone: string | null;
  email: string | null;
  website_url: string | null;
  facebook_url: string | null;
  youtube_url: string | null;
  instagram_url: string | null;
  logo_url: string | null;
  image_url: string | null;
  description: string | null;
  established_year: number | null;
  is_verified: boolean;
  source_platform: string | null;
  total_streams_count: number;
  active_streams_count: number;
};

export type Stream = {
  id: string;
  created_at: string;
  updated_at: string;
  gurdwara_id: string;
  platform: string;
  stream_url: string;
  embed_url: string | null;
  stream_id: string | null;
  status: 'discovered' | 'live' | 'ended' | 'error' | 'archived';
  is_live: boolean;
  title: string | null;
  description: string | null;
  thumbnail_url: string | null;
  language: string | null;
  program_type: string | null;
  scheduled_start_time: string | null;
  actual_start_time: string | null;
  end_time: string | null;
  duration_seconds: number | null;
  viewer_count: number | null;
  like_count: number | null;
  video_quality: string | null;
  last_checked_at: string | null;
  error_count: number;
  last_error_message: string | null;
  audio_extracted: boolean;
  analyzed: boolean;
  analysis_metadata: Record<string, unknown> | null;
  discovered_by: string;
  source_data: Record<string, unknown> | null;
};

export type StreamWithGurdwara = Stream & {
  gurdwara: Gurdwara;
};

// Sikh Vocabulary Types
export type TermFacet = 'content_type' | 'bani' | 'occasion' | 'location' | 'role' | 'practice' | 'other';

export type Term = {
  id: string;
  created_at: string;
  updated_at: string;
  gurmukhi: string | null;
  transliteration: string;
  english_gloss: string;
  description: string | null;
  facet: TermFacet;
  language: 'punjabi' | 'gurmukhi' | 'english' | 'sanskrit';
  is_live_stream_relevant: boolean;
  usage_frequency: number;
  search_keywords: string[] | null;
  parent_term_id: string | null;
};

export type TermAlias = {
  id: string;
  term_id: string;
  alias_text: string;
  alias_type: 'spelling_variant' | 'common_name' | 'abbreviation' | 'anglicized' | null;
  created_at: string;
};

export type TagExample = {
  id: string;
  term_id: string;
  example_phrase: string;
  context: string | null;
  created_at: string;
};

export type StreamTerm = {
  id: string;
  stream_id: string;
  term_id: string;
  detection_method: 'auto_title' | 'auto_description' | 'manual' | 'ai_detected' | null;
  confidence_score: number;
  created_at: string;
  created_by: string;
};

export type BaniComposition = {
  id: string;
  created_at: string;
  updated_at: string;
  name_gurmukhi: string | null;
  name_transliteration: string;
  name_english: string;
  source_granth: 'guru_granth_sahib' | 'dasam_granth' | 'sarbloh_granth' | 'bhai_gurdas_vaaran' | null;
  author_guru: string | null;
  ang_start: number | null;
  ang_end: number | null;
  is_nitnem: boolean;
  recitation_time: 'amrit_vela' | 'morning' | 'evening' | 'bedtime' | 'anytime' | null;
  typical_duration_minutes: number | null;
  description: string | null;
  number_of_pauris: number | null;
  raag: string | null;
  term_id: string | null;
  parent_composition_id: string | null;
  popularity_score: number;
  search_keywords: string[] | null;
};

export type TermWithAliases = Term & {
  aliases: string[] | null;
};

export type StreamWithTerms = {
  stream_id: string;
  stream_title: string | null;
  gurdwara_id: string;
  detected_terms: Array<{
    term_id: string;
    transliteration: string;
    english_gloss: string;
    facet: TermFacet;
    confidence: number;
    detection_method: string;
  }> | null;
};
