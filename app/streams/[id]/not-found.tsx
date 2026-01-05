import Link from 'next/link';

export default function StreamNotFound() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-8xl mb-6">🔍</div>
          <h1 className="text-4xl font-bold text-[#000080] mb-4">
            Stream Not Found
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            This stream may have ended or the link is incorrect.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/streams"
              className="bg-[#FF9933] hover:bg-[#FF9933]/90 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              View All Live Streams
            </Link>
            <Link
              href="/"
              className="bg-white hover:bg-gray-50 text-[#000080] border-2 border-[#000080] px-6 py-3 rounded-lg font-semibold transition"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
