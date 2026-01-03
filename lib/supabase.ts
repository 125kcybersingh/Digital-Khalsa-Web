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

// Transparency Page Types
export type ChangelogEntry = {
  id: string;
  created_at: string;
  title: string;
  description: string;
  status: 'in-progress' | 'completed' | 'planned';
  category: 'feature' | 'bug-fix' | 'improvement' | 'update';
  share_count: number;
  is_pinned: boolean;
};

export type TimesheetEntry = {
  id: string;
  created_at: string;
  date: string;
  hours: number;
  description: string;
  category: 'development' | 'design' | 'research' | 'testing' | 'documentation';
};

export type FeatureRequest = {
  id: string;
  created_at: string;
  title: string;
  description: string;
  submitter_name: string | null;
  submitter_email: string | null;
  status: 'submitted' | 'under-review' | 'planned' | 'in-progress' | 'completed' | 'declined';
  github_issue_url: string | null;
  upvotes: number;
};
