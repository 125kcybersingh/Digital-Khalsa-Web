import { supabase } from './supabase';
import type { Term, TermWithAliases, BaniComposition, StreamTerm, TermFacet } from './supabase';

/**
 * Get all terms, optionally filtered by facet
 */
export async function getTerms(facet?: TermFacet): Promise<Term[]> {
  let query = supabase
    .from('terms')
    .select('*')
    .eq('is_live_stream_relevant', true)
    .order('usage_frequency', { ascending: false });

  if (facet) {
    query = query.eq('facet', facet);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching terms:', error);
    throw error;
  }

  return (data || []) as Term[];
}

/**
 * Get terms with their aliases
 */
export async function getTermsWithAliases(facet?: TermFacet): Promise<TermWithAliases[]> {
  let query = supabase
    .from('terms_with_aliases')
    .select('*')
    .eq('is_live_stream_relevant', true)
    .order('transliteration', { ascending: true });

  if (facet) {
    query = query.eq('facet', facet);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching terms with aliases:', error);
    throw error;
  }

  return (data || []) as TermWithAliases[];
}

/**
 * Search terms by text (uses full-text search)
 */
export async function searchTerms(searchText: string): Promise<Term[]> {
  const { data, error } = await supabase
    .from('terms')
    .select('*')
    .textSearch('search_vector', searchText)
    .limit(20);

  if (error) {
    console.error('Error searching terms:', error);
    throw error;
  }

  return (data || []) as Term[];
}

/**
 * Get all bani compositions, optionally filtered by criteria
 */
export async function getBaniCompositions(options?: {
  isNitnem?: boolean;
  sourceGranth?: string;
  recitationTime?: string;
}): Promise<BaniComposition[]> {
  let query = supabase
    .from('bani_compositions')
    .select('*')
    .order('popularity_score', { ascending: false, nullsFirst: false });

  if (options?.isNitnem !== undefined) {
    query = query.eq('is_nitnem', options.isNitnem);
  }

  if (options?.sourceGranth) {
    query = query.eq('source_granth', options.sourceGranth);
  }

  if (options?.recitationTime) {
    query = query.eq('recitation_time', options.recitationTime);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching bani compositions:', error);
    throw error;
  }

  return (data || []) as BaniComposition[];
}

/**
 * Get terms detected for a specific stream
 */
export async function getStreamTerms(streamId: string): Promise<StreamTerm[]> {
  const { data, error } = await supabase
    .from('stream_terms')
    .select('*, term:terms(*)')
    .eq('stream_id', streamId)
    .order('confidence_score', { ascending: false });

  if (error) {
    console.error('Error fetching stream terms:', error);
    throw error;
  }

  return (data || []) as StreamTerm[];
}

/**
 * Auto-detect terms in text (title or description)
 * Returns array of matched terms with confidence scores
 */
export async function detectTermsInText(
  text: string,
  facets?: TermFacet[]
): Promise<Array<{ term: Term; confidence: number; matchedText: string }>> {
  if (!text) return [];

  // Get all relevant terms with aliases
  const terms = await getTermsWithAliases();

  // Filter by facets if specified
  const relevantTerms = facets
    ? terms.filter(t => facets.includes(t.facet))
    : terms;

  const matches: Array<{ term: Term; confidence: number; matchedText: string }> = [];
  const textLower = text.toLowerCase();

  for (const term of relevantTerms) {
    // Build list of all possible matches (transliteration + aliases)
    const possibleMatches = [
      term.transliteration,
      ...(term.aliases || [])
    ];

    // Check each possible match
    for (const match of possibleMatches) {
      const matchLower = match.toLowerCase();

      if (textLower.includes(matchLower)) {
        // Calculate confidence based on match quality
        let confidence = 0.5; // Base confidence

        // Exact word boundary match = higher confidence
        const wordBoundaryRegex = new RegExp(`\\b${matchLower}\\b`, 'i');
        if (wordBoundaryRegex.test(text)) {
          confidence = 0.9;
        }

        // If match is in beginning of text = higher confidence
        if (textLower.indexOf(matchLower) < 20) {
          confidence += 0.1;
        }

        // Ensure confidence doesn't exceed 1.0
        confidence = Math.min(1.0, confidence);

        matches.push({
          term: term as Term,
          confidence,
          matchedText: match
        });

        // Only count first match for this term
        break;
      }
    }
  }

  // Sort by confidence (highest first)
  return matches.sort((a, b) => b.confidence - a.confidence);
}

/**
 * Auto-tag a stream with detected terms
 */
export async function autoTagStream(
  streamId: string,
  title: string,
  description?: string
): Promise<void> {
  // Detect terms in title (higher priority)
  const titleMatches = await detectTermsInText(title);

  // Detect terms in description (lower priority)
  const descriptionMatches = description
    ? await detectTermsInText(description)
    : [];

  // Combine matches, prioritizing title matches
  const allMatches = [...titleMatches, ...descriptionMatches];

  // Remove duplicates (keep highest confidence)
  const uniqueMatches = new Map<string, typeof allMatches[0]>();
  for (const match of allMatches) {
    const existing = uniqueMatches.get(match.term.id);
    if (!existing || match.confidence > existing.confidence) {
      uniqueMatches.set(match.term.id, match);
    }
  }

  // Insert stream_terms records
  for (const match of uniqueMatches.values()) {
    // Only insert if confidence is above threshold
    if (match.confidence < 0.5) continue;

    await supabase
      .from('stream_terms')
      .upsert({
        stream_id: streamId,
        term_id: match.term.id,
        detection_method: titleMatches.includes(match) ? 'auto_title' : 'auto_description',
        confidence_score: match.confidence,
        created_by: 'system'
      }, {
        onConflict: 'stream_id,term_id'
      });
  }
}

/**
 * Get popular terms by facet (most used)
 */
export async function getPopularTermsByFacet(limit: number = 10): Promise<Record<TermFacet, Term[]>> {
  const facets: TermFacet[] = ['content_type', 'bani', 'occasion', 'location', 'role', 'practice'];

  const result: Partial<Record<TermFacet, Term[]>> = {};

  for (const facet of facets) {
    const { data } = await supabase
      .from('terms')
      .select('*')
      .eq('facet', facet)
      .order('usage_frequency', { ascending: false })
      .limit(limit);

    if (data) {
      result[facet] = data as Term[];
    }
  }

  return result as Record<TermFacet, Term[]>;
}

/**
 * Helper: Get human-readable term facet name
 */
export function getFacetDisplayName(facet: TermFacet): string {
  const names: Record<TermFacet, string> = {
    'content_type': 'Content Type',
    'bani': 'Bani / Prayer',
    'occasion': 'Occasion / Event',
    'location': 'Location',
    'role': 'Role / Participant',
    'practice': 'Practice / Ritual',
    'other': 'Other'
  };
  return names[facet] || facet;
}

/**
 * Helper: Get suggested terms for stream titles (SEO-friendly)
 */
export async function getSuggestedTermsForTitle(
  contentType?: string,
  baniName?: string,
  occasion?: string
): Promise<string> {
  const parts: string[] = [];

  // Add content type
  if (contentType) {
    const { data } = await supabase
      .from('terms')
      .select('transliteration')
      .eq('facet', 'content_type')
      .ilike('transliteration', `%${contentType}%`)
      .single();

    if (data) parts.push(data.transliteration);
  }

  // Add bani name
  if (baniName) {
    const { data } = await supabase
      .from('terms')
      .select('transliteration')
      .eq('facet', 'bani')
      .ilike('transliteration', `%${baniName}%`)
      .single();

    if (data) parts.push(data.transliteration);
  }

  // Add occasion
  if (occasion) {
    const { data } = await supabase
      .from('terms')
      .select('transliteration')
      .eq('facet', 'occasion')
      .ilike('transliteration', `%${occasion}%`)
      .single();

    if (data) parts.push(data.transliteration);
  }

  return parts.join(' - ');
}
