import Link from 'next/link';
import EmotionGurbaniFinder from '@/components/EmotionGurbaniFinder';
import WaitlistForm from '@/components/WaitlistForm';

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
              <a
                href="#waitlist"
                className="bg-white text-[#000080] px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition text-center"
              >
                Join the Beta
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

      {/* About 125kCyberSingh Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-[#000080] mb-6">
              Who's 125kCyberSingh?
            </h2>
            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
              <p>
                I'm not a guide. I'm not a teacher.
                <br />
                I'm just someone learning Sikhi, stumbling forward.
              </p>
              <p>
                I built Digital Khalsa because I had a problem:
                <br />
                I'd sit at the Gurdwara, hear something beautiful, try to find it... and by then, Kirtan had moved on.
              </p>
              <p>
                This app exists to solve that problem. For me.
                <br />
                If it helps you, that's not my doing. That's Guru Ji's kirpa.
              </p>
              <p>
                The avatar removes my ego. This isn't about me. It's about Waheguru's message reaching people who need it—starting with me.
              </p>
              <p className="pt-4">
                <a
                  href="https://twitter.com/125kCyberSingh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#000080] hover:text-[#FF9933] font-semibold transition-colors"
                >
                  @125kCyberSingh on Twitter
                </a>
              </p>
              <p className="pt-6">
                <a
                  href="/transparency"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#000080] hover:text-[#FF9933] font-semibold transition-colors border-b-2 border-[#FF9933] pb-1"
                >
                  View Transparency Page →
                </a>
              </p>
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
              Join the Beta
            </h2>
            <p className="text-xl text-white/90 mb-2 max-w-2xl mx-auto">
              50 spots for early testers.
            </p>
            <p className="text-lg text-white/80 max-w-xl mx-auto mb-2">
              Help me make this better. Give feedback. Find bugs.
            </p>
            <p className="text-lg text-white/80 max-w-xl mx-auto">
              Your input shapes what this becomes.
            </p>
          </div>
          <WaitlistForm />
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-[#000080] text-white py-12">
        <div className="container mx-auto px-6">
          <div className="text-center mb-6">
            <a
              href="/transparency"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-white/80 hover:text-white font-semibold transition border-b-2 border-[#FF9933] pb-1"
            >
              View Transparency Page →
            </a>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Navigation Links */}
            <div>
              <h3 className="font-bold mb-4">Navigation</h3>
              <ul className="space-y-2 text-white/80">
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                <li>
                  <a 
                    href="/privacy" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a 
                    href="/contact" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Social Media */}
            <div>
              <h3 className="font-bold mb-4">Connect</h3>
              <ul className="space-y-2 text-white/80">
                <li>
                  <a 
                    href="https://twitter.com/125kCyberSingh" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Twitter: @125kCyberSingh
                  </a>
                </li>
                <li>
                  <a 
                    href="https://instagram.com/digitalkhalsaapp" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Instagram: @digitalkhalsaapp
                  </a>
                </li>
                <li>
                  <a 
                    href="https://github.com/125kCyberSingh" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    GitHub: 125kCyberSingh
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Donate */}
            <div>
              <h3 className="font-bold mb-4">Support</h3>
              <a
                href="#waitlist"
                className="inline-block bg-[#FF9933] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#FF8800] transition-colors"
              >
                Donate
              </a>
            </div>
          </div>
          
          <div className="text-center pt-8 border-t border-white/20">
            <p className="mb-2">Waheguru Ji Ka Khalsa, Waheguru Ji Ki Fateh 🙏</p>
            <p className="text-white/60">Built with Seva. For me. For the Sangat.</p>
            <p className="text-white/60 mt-2">© 2026 Digital Khalsa</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
