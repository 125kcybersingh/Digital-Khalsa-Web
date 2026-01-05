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
