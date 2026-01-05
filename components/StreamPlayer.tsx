'use client';

import type { Stream } from '@/lib/supabase';
import { getEmbedUrl } from '@/lib/streams';

interface StreamPlayerProps {
  stream: Stream;
}

export default function StreamPlayer({ stream }: StreamPlayerProps) {
  const embedUrl = getEmbedUrl(stream);

  return (
    <div className="relative w-full bg-black rounded-lg overflow-hidden shadow-2xl">
      {/* 16:9 Aspect Ratio Container */}
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        {stream.platform === 'youtube' ? (
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={embedUrl}
            title={stream.title || 'Live Stream'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : stream.platform === 'facebook' ? (
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={embedUrl}
            title={stream.title || 'Live Stream'}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          // Generic video embed or fallback
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-gray-900 text-white p-6">
            <p className="mb-4 text-center">
              This stream is available on {stream.platform}
            </p>
            <a
              href={stream.stream_url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FF9933] hover:bg-[#FF9933]/90 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Watch on {stream.platform}
            </a>
          </div>
        )}
      </div>

      {/* Stream Info Overlay (optional, can be removed if too much) */}
      {stream.is_live && (
        <div className="absolute top-4 left-4">
          <div className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center gap-1">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            Live
          </div>
        </div>
      )}
    </div>
  );
}
