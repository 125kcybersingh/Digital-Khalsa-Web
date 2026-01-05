import EmotionGurbaniFinder from '@/components/EmotionGurbaniFinder';

export default function FeaturesPage() {
  return (
    <main className="min-h-screen">
      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-[#000080] mb-4">
              Three Tools. One Mission.
            </h1>
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
              <h2 className="text-2xl font-bold text-[#000080] mb-2">GurBani Finder</h2>
              <p className="text-lg text-gray-700 mb-3">Photo → AI → Shabad in &lt;3 Seconds</p>
              <p className="text-gray-600 mb-3">
                <strong>Problem:</strong> Ever been at the Gurdwara wondering "What shabad is this?" By the time you search manually, the Kirtani has moved to the next pungti.
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Solution:</strong> Point your camera at the projector screen. Google Vision reads the Gurmukhi. Fuzzy matching finds the shabad. You see: Gurmukhi text, English translation, Ang number. All in under 3 seconds.
              </p>
              <div className="space-y-3 mb-4">
                <img 
                  src="/snap-shabad.png" 
                  alt="Camera pointing at Gurmukhi text on projector" 
                  className="w-full rounded-lg shadow-sm"
                />
                <img 
                  src="/shabad-identified.png" 
                  alt="Identified shabad result" 
                  className="w-full rounded-lg shadow-sm"
                />
              </div>
              <span className="text-sm font-semibold text-green-600">Launching Jan 5</span>
            </div>

            {/* Community Connector */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-[#FF9933]/10 flex items-center justify-center mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h2 className="text-2xl font-bold text-[#000080] mb-2">Community Connector</h2>
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
              <h2 className="text-2xl font-bold text-[#000080] mb-2">Sangat Directory</h2>
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
    </main>
  );
}

