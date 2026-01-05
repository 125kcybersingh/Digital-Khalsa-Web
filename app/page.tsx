import Link from 'next/link';
import EmotionGurbaniFinder from '@/components/EmotionGurbaniFinder';
import WaitlistForm from '@/components/WaitlistForm';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#FF9933] to-[#000080] py-20 md:py-32">
        <div className="container mx-auto px-6">
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
              <a
                href="#waitlist"
                className="bg-white text-[#000080] px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition text-center"
              >
                Join the Waitlist (Jan 5 Launch)
              </a>
              <a
                href="#features"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#000080] transition text-center"
              >
                Try It Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#000080] mb-4">
              Three Tools. One Mission.
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Making Gurbani accessible. Building community. Serving the Sangat.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* GurBani Finder */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-xl transition">
              <div className="w-12 h-12 rounded-full bg-[#FF9933]/10 flex items-center justify-center mb-4">
                <span className="text-2xl">📷</span>
              </div>
              <h3 className="text-2xl font-bold text-[#000080] mb-2">GurBani Finder</h3>
              <p className="text-lg text-gray-700 mb-3">Photo → AI → Shabad in &lt;3 Seconds</p>
              <p className="text-gray-600 mb-4">
                Point your camera at the projector. Get Gurmukhi text, translation, and Ang number instantly.
              </p>
              <span className="text-sm font-semibold text-green-600">Launching Jan 5</span>
            </div>

            {/* Community Connector */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-[#FF9933]/10 flex items-center justify-center mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-2xl font-bold text-[#000080] mb-2">Community Connector</h3>
              <p className="text-lg text-gray-700 mb-3">Find Your Sikhi Buddy</p>
              <p className="text-gray-600 mb-4">
                Connect with someone a few steps ahead on the journey. Not a teacher, just a fellow seeker.
              </p>
              <span className="text-sm font-semibold text-amber-600">Coming Soon</span>
            </div>

            {/* Sangat Directory */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-[#FF9933]/10 flex items-center justify-center mb-4">
                <span className="text-2xl">🗺️</span>
              </div>
              <h3 className="text-2xl font-bold text-[#000080] mb-2">Sangat Directory</h3>
              <p className="text-lg text-gray-700 mb-3">Verified Gurdwaras & Resources</p>
              <p className="text-gray-600 mb-4">
                Gurdwaras worldwide, online resources, crowdsourced verification by the Sangat.
              </p>
              <span className="text-sm font-semibold text-amber-600">Coming Soon</span>
            </div>
          </div>
        </div>
      </section>

      {/* Try It Now - Emotion-Based Gurbani Finder */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[#000080] mb-4">
              Try It Now
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience how Gurbani speaks to your heart. Select how you're feeling, and discover shabads that resonate.
            </p>
          </div>
          <EmotionGurbaniFinder />
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

      {/* Waitlist Signup Section */}
      <section id="waitlist" className="py-20 bg-gradient-to-br from-[#000080] to-[#FF9933]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Join the Waitlist
            </h2>
            <p className="text-xl text-white/90 mb-2 max-w-2xl mx-auto">
              50 spots for beta testers. Launching January 5, 2026.
            </p>
            <p className="text-lg text-white/80 max-w-xl mx-auto">
              Help shape this tool. Give feedback. Find bugs. Your input matters.
            </p>
          </div>
          <WaitlistForm />
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-[#000080] text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <p className="mb-2">Waheguru Ji Ka Khalsa, Waheguru Ji Ki Fateh 🙏</p>
          <p className="text-white/60">© 2026 Digital Khalsa. Built with Seva.</p>
        </div>
      </footer>
    </main>
  );
}
