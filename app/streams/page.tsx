import Link from 'next/link';
import StreamCard from '@/components/StreamCard';
import { getLiveStreams } from '@/lib/streams';
import type { StreamWithGurdwara } from '@/lib/supabase';

export const metadata = {
  title: 'Live Gurdwara Streams | Digital Khalsa',
  description: 'Watch live kirtan, katha, and prayers from gurdwaras around the world. Anonymous viewing, no account required.',
};

// Revalidate every 30 seconds to keep streams fresh
export const revalidate = 30;

export default async function StreamsPage() {
  let streams: StreamWithGurdwara[] = [];
  let error: unknown = null;

  try {
    streams = await getLiveStreams();
  } catch (e) {
    error = e;
    streams = [];
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#FF9933] to-[#000080] py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-4 transition"
            >
              <span>←</span>
              <span>Back to Home</span>
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Live Gurdwara Streams
            </h1>
            <p className="text-xl text-white/90">
              Watch live kirtan, katha, and prayers from gurdwaras around the world.
              <br />
              Anonymous viewing, no account required.
            </p>
          </div>
        </div>
      </section>

      {/* Streams Grid */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          {error !== null && (
            <div className="max-w-4xl mx-auto mb-8">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
                <p className="font-semibold">Error loading streams</p>
                <p className="text-sm mt-1">
                  Please check your database connection and try again.
                </p>
              </div>
            </div>
          )}

          {streams.length === 0 && !error && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-12 text-center shadow-md">
                <div className="text-6xl mb-4">🎥</div>
                <h2 className="text-2xl font-bold text-[#000080] mb-2">
                  No Live Streams Right Now
                </h2>
                <p className="text-gray-600 mb-6">
                  Check back soon! Gurdwaras typically stream during Amrit Vela (early morning),
                  Asa Di Vaar, and evening programs.
                </p>
                <Link
                  href="/"
                  className="inline-block bg-[#FF9933] hover:bg-[#FF9933]/90 text-white px-6 py-3 rounded-lg font-semibold transition"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          )}

          {streams.length > 0 && (
            <>
              <div className="max-w-6xl mx-auto mb-6">
                <p className="text-gray-600">
                  <span className="font-semibold text-[#000080]">
                    {streams.length}
                  </span>
                  {' '}live {streams.length === 1 ? 'stream' : 'streams'} available
                </p>
              </div>

              <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {streams.map((stream) => (
                  <StreamCard key={stream.id} stream={stream} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-[#000080] mb-4">
              About Live Streams
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Our streams are automatically discovered from gurdwaras around the world who
                broadcast their programs on platforms like YouTube and Facebook.
              </p>
              <p>
                <strong>Privacy:</strong> You can watch completely anonymously. No account
                required, no personal data collected.
              </p>
              <p>
                <strong>Note:</strong> Streams are embedded from third-party platforms
                (YouTube, Facebook) which may use their own cookies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#000080] text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="mb-2">Waheguru Ji Ka Khalsa, Waheguru Ji Ki Fateh 🙏</p>
          <p className="text-white/60">© 2026 Digital Khalsa. Built with Seva.</p>
        </div>
      </footer>
    </main>
  );
}
