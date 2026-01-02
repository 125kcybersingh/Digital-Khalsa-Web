import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

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
