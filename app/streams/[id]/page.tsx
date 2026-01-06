import Link from 'next/link';
import { notFound } from 'next/navigation';
import StreamPlayer from '@/components/StreamPlayer';
import { getStreamById } from '@/lib/streams';
import { formatProgramType, getLocationString } from '@/lib/streams';

// Revalidate every 30 seconds
export const revalidate = 30;

interface StreamPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: StreamPageProps) {
  const { id } = await params;
  const stream = await getStreamById(id);

  if (!stream) {
    return {
      title: 'Stream Not Found | Digital Khalsa',
    };
  }

  return {
    title: `${stream.gurdwara.name} - Live Stream | Digital Khalsa`,
    description: stream.title || `Watch live stream from ${stream.gurdwara.name}`,
  };
}

export default async function StreamPage({ params }: StreamPageProps) {
  const { id } = await params;
  const stream = await getStreamById(id);

  if (!stream) {
    notFound();
  }

  const { gurdwara } = stream;
  const location = getLocationString(gurdwara);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#FF9933] to-[#000080] py-8">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <Link
              href="/streams"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-4 transition"
            >
              <span>←</span>
              <span>Back to All Streams</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Video Player - Takes 2 columns on large screens */}
              <div className="lg:col-span-2">
                <StreamPlayer stream={stream} />

                {/* Stream Info Below Player */}
                <div className="mt-6">
                  {stream.title && (
                    <h1 className="text-2xl font-bold text-[#000080] mb-2">
                      {stream.title}
                    </h1>
                  )}

                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-4">
                    {stream.is_live && (
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
                        <span className="font-semibold text-red-600">LIVE</span>
                      </div>
                    )}

                    {stream.viewer_count !== null && stream.viewer_count > 0 && (
                      <>
                        <span className="text-gray-300">•</span>
                        <span>{stream.viewer_count.toLocaleString()} watching</span>
                      </>
                    )}

                    {stream.program_type && (
                      <>
                        <span className="text-gray-300">•</span>
                        <span>{formatProgramType(stream.program_type)}</span>
                      </>
                    )}

                    <span className="text-gray-300">•</span>
                    <span className="capitalize">{stream.platform}</span>
                  </div>

                  {stream.description && (
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h3 className="font-semibold text-[#000080] mb-2">About this stream</h3>
                      <p className="text-gray-700 whitespace-pre-wrap">{stream.description}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Gurdwara Info Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                  {/* Gurdwara Logo/Image */}
                  {(gurdwara.logo_url || gurdwara.image_url) && (
                    <div className="mb-4">
                      <img
                        src={gurdwara.logo_url || gurdwara.image_url || ''}
                        alt={gurdwara.name}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}

                  {/* Gurdwara Name */}
                  <h2 className="text-xl font-bold text-[#000080] mb-3">
                    {gurdwara.name}
                  </h2>

                  {/* Location */}
                  {location && (
                    <div className="flex items-start gap-2 text-gray-700 mb-4">
                      <span className="text-lg">📍</span>
                      <div>
                        <p className="font-semibold text-sm text-gray-500 uppercase mb-1">
                          Location
                        </p>
                        <p>{location}</p>
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  {gurdwara.description && (
                    <div className="mb-4">
                      <p className="font-semibold text-sm text-gray-500 uppercase mb-1">
                        About
                      </p>
                      <p className="text-gray-700 text-sm">{gurdwara.description}</p>
                    </div>
                  )}

                  {/* Contact Information */}
                  <div className="space-y-3 pt-4 border-t border-gray-200">
                    {gurdwara.phone && (
                      <a
                        href={`tel:${gurdwara.phone}`}
                        className="flex items-center gap-2 text-gray-700 hover:text-[#FF9933] transition"
                      >
                        <span>📞</span>
                        <span className="text-sm">{gurdwara.phone}</span>
                      </a>
                    )}

                    {gurdwara.email && (
                      <a
                        href={`mailto:${gurdwara.email}`}
                        className="flex items-center gap-2 text-gray-700 hover:text-[#FF9933] transition"
                      >
                        <span>✉️</span>
                        <span className="text-sm">{gurdwara.email}</span>
                      </a>
                    )}

                    {gurdwara.website_url && (
                      <a
                        href={gurdwara.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-700 hover:text-[#FF9933] transition"
                      >
                        <span>🌐</span>
                        <span className="text-sm">Visit Website</span>
                      </a>
                    )}

                    {gurdwara.youtube_url && (
                      <a
                        href={gurdwara.youtube_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-700 hover:text-[#FF9933] transition"
                      >
                        <span>▶️</span>
                        <span className="text-sm">YouTube Channel</span>
                      </a>
                    )}

                    {gurdwara.facebook_url && (
                      <a
                        href={gurdwara.facebook_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-700 hover:text-[#FF9933] transition"
                      >
                        <span>📘</span>
                        <span className="text-sm">Facebook Page</span>
                      </a>
                    )}
                  </div>

                  {/* Verified Badge */}
                  {gurdwara.is_verified && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-2 text-sm text-green-600">
                        <span>✓</span>
                        <span className="font-semibold">Verified Gurdwara</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
