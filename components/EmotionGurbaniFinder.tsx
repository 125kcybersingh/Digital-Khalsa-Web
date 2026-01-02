'use client';

import { useState } from 'react';
import { supabase, type ShabadWithLines, type Line } from '@/lib/supabase';

const emotions = [
  { value: 'peaceful', label: 'Peaceful', emoji: '🕊️' },
  { value: 'grateful', label: 'Grateful', emoji: '🙏' },
  { value: 'troubled', label: 'Troubled', emoji: '😔' },
  { value: 'seeking', label: 'Seeking Guidance', emoji: '🔍' },
  { value: 'hopeful', label: 'Hopeful', emoji: '✨' },
  { value: 'connected', label: 'Connected', emoji: '❤️' },
];

export default function EmotionGurbaniFinder() {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [shabads, setShabads] = useState<ShabadWithLines[]>([]);
  const [loading, setLoading] = useState(false);

  const handleEmotionSelect = async (emotion: string) => {
    setSelectedEmotion(emotion);
    setLoading(true);

    try {
      // Fetch shabads tagged with this emotion
      const { data: emotionTags, error: tagsError } = await supabase
        .from('emotion_tags')
        .select('shabad_id')
        .eq('emotion', emotion)
        .limit(3);

      if (tagsError) throw tagsError;

      const shabadIds = emotionTags.map((tag) => tag.shabad_id);

      // Fetch shabads with their lines
      const { data: shabadData, error: shabadError } = await supabase
        .from('shabads')
        .select(`
          *,
          lines (*),
          emotion_tags (*)
        `)
        .in('id', shabadIds);

      if (shabadError) throw shabadError;

      setShabads(shabadData as ShabadWithLines[]);
    } catch (error) {
      console.error('Error fetching shabads:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Emotion Selector */}
      <div className="text-center mb-12">
        <h3 className="text-2xl md:text-3xl font-bold text-[#000080] mb-6">
          How are you feeling today?
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {emotions.map((emotion) => (
            <button
              key={emotion.value}
              onClick={() => handleEmotionSelect(emotion.value)}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedEmotion === emotion.value
                  ? 'border-[#FF9933] bg-[#FF9933]/10 shadow-lg'
                  : 'border-gray-200 hover:border-[#FF9933]/50 hover:shadow-md'
              }`}
            >
              <div className="text-3xl mb-2">{emotion.emoji}</div>
              <div className="text-sm font-semibold text-[#000080]">{emotion.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF9933]"></div>
          <p className="mt-4 text-gray-600">Finding shabads for you...</p>
        </div>
      )}

      {/* Results */}
      {!loading && shabads.length > 0 && (
        <div className="space-y-8">
          {shabads.map((shabad) => (
            <div
              key={shabad.id}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100"
            >
              <div className="space-y-4">
                {shabad.lines.slice(0, 2).map((line: Line) => (
                  <div key={line.id} className="border-l-4 border-[#FF9933] pl-4">
                    <p className="text-2xl md:text-3xl font-bold text-[#000080] mb-2 font-serif">
                      {line.gurmukhi}
                    </p>
                    {line.transliteration && (
                      <p className="text-lg text-gray-600 italic mb-1">
                        {line.transliteration}
                      </p>
                    )}
                    {line.translation_english && (
                      <p className="text-base text-gray-700">
                        {line.translation_english}
                      </p>
                    )}
                  </div>
                ))}
                <div className="pt-4 text-sm text-gray-500">
                  Ang {shabad.start_ang}
                </div>
              </div>
            </div>
          ))}

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-[#FF9933] to-[#000080] rounded-2xl p-8 md:p-12 text-center text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Now Imagine This in the Gurdwara
            </h3>
            <p className="text-xl mb-6 opacity-90">
              Point your phone at the projector. Get the shabad with translation in seconds.
              <br />
              <span className="font-semibold">That's GurBani Finder.</span>
            </p>
            <a
              href="#waitlist"
              className="inline-block bg-white text-[#000080] px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              Join the Waitlist → Launching Jan 5
            </a>
          </div>
        </div>
      )}

      {/* Initial State */}
      {!loading && !selectedEmotion && (
        <div className="text-center text-gray-500 py-12">
          <p className="text-lg">Select an emotion above to discover relevant shabads</p>
        </div>
      )}
    </div>
  );
}
