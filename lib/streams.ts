import { supabase } from './supabase';
import type { Stream, Gurdwara, StreamWithGurdwara } from './supabase';

/**
 * Fetch all currently live streams with gurdwara information
 */
export async function getLiveStreams(): Promise<StreamWithGurdwara[]> {
  const { data, error } = await supabase
    .from('streams')
    .select(`
      *,
      gurdwara:gurdwaras(*)
    `)
    .eq('is_live', true)
    .order('viewer_count', { ascending: false, nullsFirst: false });

  if (error) {
    console.error('Error fetching live streams:', error);
    throw error;
  }

  return (data || []) as StreamWithGurdwara[];
}

/**
 * Fetch a specific stream by ID with gurdwara information
 */
export async function getStreamById(id: string): Promise<StreamWithGurdwara | null> {
  const { data, error } = await supabase
    .from('streams')
    .select(`
      *,
      gurdwara:gurdwaras(*)
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching stream:', error);
    return null;
  }

  return data as StreamWithGurdwara;
}

/**
 * Fetch all gurdwaras, optionally filtering those with active streams
 */
export async function getGurdwaras(onlyWithLiveStreams: boolean = false): Promise<Gurdwara[]> {
  let query = supabase
    .from('gurdwaras')
    .select('*')
    .order('name', { ascending: true });

  if (onlyWithLiveStreams) {
    query = query.gt('active_streams_count', 0);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching gurdwaras:', error);
    throw error;
  }

  return (data || []) as Gurdwara[];
}

/**
 * Fetch a specific gurdwara by ID with its streams
 */
export async function getGurdwaraById(id: string) {
  const { data, error } = await supabase
    .from('gurdwaras')
    .select(`
      *,
      streams(*)
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching gurdwara:', error);
    return null;
  }

  return data;
}

/**
 * Helper function to generate embed URL from stream URL
 */
export function getEmbedUrl(stream: Stream): string {
  if (stream.embed_url) {
    return stream.embed_url;
  }

  // Generate embed URL based on platform
  if (stream.platform === 'youtube' && stream.stream_id) {
    return `https://www.youtube.com/embed/${stream.stream_id}`;
  }

  if (stream.platform === 'facebook' && stream.stream_id) {
    return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(stream.stream_url)}`;
  }

  // Fallback to stream_url
  return stream.stream_url;
}

/**
 * Helper function to format program type for display
 */
export function formatProgramType(programType: string | null): string {
  if (!programType) return 'Live Stream';

  const typeMap: Record<string, string> = {
    'kirtan': 'Kirtan',
    'katha': 'Katha',
    'ardas': 'Ardas',
    'asa_di_vaar': 'Asa Di Vaar',
    'rehras': 'Rehras Sahib',
    'general': 'Live Stream',
  };

  return typeMap[programType] || programType;
}

/**
 * Helper function to get location string
 */
export function getLocationString(gurdwara: Gurdwara): string {
  const parts = [gurdwara.city, gurdwara.state_province, gurdwara.country].filter(Boolean);
  return parts.join(', ');
}
