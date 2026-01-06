import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* About 125kCyberSingh Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-[#000080] mb-8 text-center">
              Who's 125kCyberSingh?
            </h1>

            {/* The Name */}
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed mb-12">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#000080] mb-4">The Name</h2>
                <p className="mb-4">
                  At Chamkaur, 40 Singhs faced a Mughal army of over 100,000. As each warrior stepped onto the battlefield, 
                  roaring "Sat Sri Akal!" before attaining Shaheedi, the Nawab was astonished. He remembered the saying:{' '}
                  <em>One Singh equals Sava Lakh—125,000.</em>
                </p>
                <p className="mb-4">
                  I am no warrior. I carry no sword. But I believe that in this digital age, with Guru Ji's kirpa and AI as my shastar, 
                  even someone stumbling through their own Sikhi journey can serve with the strength of many.
                </p>
                <p className="font-semibold text-[#000080]">
                  That's why <strong>125k</strong>. That's why <strong>CyberSingh</strong>.
                </p>
              </div>

              <hr className="border-gray-300" />

              {/* The Problem */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#000080] mb-4">The Problem</h2>
                <p className="mb-4">
                  I'd sit at the Gurdwara, hear something beautiful—a shabad that pierced straight through—and try to find it. 
                  By the time I searched, Kirtan had moved on. The moment was gone.
                </p>
                <p>
                  I've spent decades in cybersecurity, protecting systems and solving complex problems. But this problem—connecting 
                  with Gurbani in real-time—felt more urgent than any I'd faced professionally.
                </p>
              </div>

              <hr className="border-gray-300" />

              {/* The Solution */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#000080] mb-4">The Solution</h2>
                <p className="mb-4">
                  Digital Khalsa exists to solve that problem. For me first. If it helps you, that's not my doing. 
                  That's Waheguru's kirpa.
                </p>
                <p>
                  The avatar removes my ego from this. This isn't about credentials or accomplishments. This is about Guru Ji's message 
                  reaching people who need it—starting with the one who needs it most: me.
                </p>
              </div>

              <hr className="border-gray-300" />

              {/* The Shastar */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#000080] mb-4">The Shastar</h2>
                <p className="mb-4">
                  The Singhs at Chamkaur were given shastars by Guru Gobind Singh Ji before entering battle. My shastar is different—it's 
                  artificial intelligence. I may not be physically tough or spiritually advanced. But with this tool in my hands and Guru Ji's 
                  blessings on my head, I can build something that serves the Sangat.
                </p>
                <p className="font-semibold text-[#000080]">
                  AI doesn't make me special. It makes me <em>able</em>.
                </p>
              </div>

              <hr className="border-gray-300" />

              {/* The Mission */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#000080] mb-4">The Mission</h2>
                <p className="mb-4">
                  This isn't a business. This is seva—imperfect, stumbling seva from someone still learning what it means to be a Sikh. 
                  If Digital Khalsa helps even one person connect more deeply with Gurbani, then the shastar has done its work.
                </p>
                <p className="text-xl font-semibold text-[#000080] mb-6">
                  Waheguru Ji Ka Khalsa. Waheguru Ji Ki Fateh.
                </p>
              </div>
            </div>

            {/* Social Follow Icons */}
            <div className="pt-6 flex items-center justify-center gap-6 mb-8">
              <a
                href="https://twitter.com/125kCyberSingh"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#000080] hover:text-[#FF9933] transition-colors font-semibold"
                aria-label="Follow @125kCyberSingh on X (Twitter)"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span>@125kCyberSingh</span>
              </a>
            </div>
            
            <div className="text-center pt-6">
              <Link
                href="/transparency"
                className="text-[#000080] hover:text-[#FF9933] font-semibold transition-colors border-b-2 border-[#FF9933] pb-1"
              >
                View Transparency Page →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
