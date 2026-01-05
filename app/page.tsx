import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative py-20 md:py-32 overflow-hidden"
        style={{
          backgroundImage: "url('/dk-web-hero.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Gradient Overlay with opacity to show image at 25% */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF9933] to-[#000080] opacity-75" />
        {/* Content */}
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Built for Me,<br />
              Shared with the Sangat
            </h1>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed opacity-90">
              I couldn't keep up with Kirtan at the Gurdwara. So I built Digital Khalsa.
              <br />
              <br />
              If it helps you too, that's Waheguru's grace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/waitlist"
                className="bg-white text-[#000080] px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition text-center"
              >
                Join the Beta
              </Link>
              <Link
                href="/features"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#000080] transition text-center"
              >
                Try It Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Live Gurdwara Streams Section */}
      <section className="py-20 bg-gradient-to-br from-[#000080] to-[#FF9933]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-6xl mb-6">🎥</div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Watch Live Gurdwara Streams
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Connect with the Sangat worldwide. Watch live kirtan, katha, and prayers from gurdwaras around the globe.
              <br />
              Anonymous viewing, no account required.
            </p>
            <Link
              href="/streams"
              className="inline-block bg-white text-[#000080] px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition text-center text-lg"
            >
              View Live Streams Now
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
