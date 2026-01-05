import Link from 'next/link';
import type { StreamWithGurdwara } from '@/lib/supabase';
import { formatProgramType, getLocationString } from '@/lib/streams';

interface StreamCardProps {
  stream: StreamWithGurdwara;
}

export default function StreamCard({ stream }: StreamCardProps) {
  const { gurdwara } = stream;
  const location = getLocationString(gurdwara);

  return (
    <Link href={`/streams/${stream.id}`}>
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer group">
        {/* Thumbnail */}
        <div className="relative aspect-video bg-gray-200">
          {stream.thumbnail_url ? (
            <img
              src={stream.thumbnail_url}
              alt={stream.title || gurdwara.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#FF9933] to-[#000080]">
              <span className="text-white text-4xl">🎥</span>
            </div>
          )}

          {/* LIVE Badge */}
          <div className="absolute top-3 left-3">
            <div className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center gap-1">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              Live
            </div>
          </div>

          {/* Viewer Count */}
          {stream.viewer_count !== null && stream.viewer_count > 0 && (
            <div className="absolute top-3 right-3">
              <div className="bg-black/70 text-white px-2 py-1 rounded text-xs font-semibold">
                {stream.viewer_count.toLocaleString()} watching
              </div>
            </div>
          )}

          {/* Program Type Badge */}
          {stream.program_type && (
            <div className="absolute bottom-3 left-3">
              <div className="bg-white/90 backdrop-blur-sm text-[#000080] px-3 py-1 rounded-full text-xs font-semibold">
                {formatProgramType(stream.program_type)}
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Gurdwara Name */}
          <h3 className="font-bold text-lg text-[#000080] mb-1 group-hover:text-[#FF9933] transition-colors line-clamp-2">
            {gurdwara.name}
          </h3>

          {/* Location */}
          {location && (
            <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
              <span>📍</span>
              {location}
            </p>
          )}

          {/* Stream Title */}
          {stream.title && stream.title !== gurdwara.name && (
            <p className="text-sm text-gray-700 line-clamp-2 mb-2">
              {stream.title}
            </p>
          )}

          {/* Platform Badge */}
          <div className="flex items-center gap-2 mt-3">
            <span className="text-xs text-gray-500 capitalize">
              {stream.platform}
            </span>
            {stream.language && (
              <>
                <span className="text-gray-300">•</span>
                <span className="text-xs text-gray-500 capitalize">
                  {stream.language}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
