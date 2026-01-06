import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#000080] text-white py-12">
      <div className="container mx-auto px-6">
        <div className="text-center mb-6">
          <Link
            href="/transparency"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-white/80 hover:text-white font-semibold transition border-b-2 border-[#FF9933] pb-1"
          >
            View Transparency Page →
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Navigation Links */}
          <div>
            <h3 className="font-bold mb-4">Navigation</h3>
            <ul className="space-y-2 text-white/80">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link 
                  href="/privacy" 
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="hover:text-white transition-colors"
                >
                  Contact
                </Link>
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
                  href="https://instagram.com/125kcybersingh" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Instagram: @125kcybersingh
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
            <Link
              href="/waitlist"
              className="inline-block bg-[#FF9933] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#FF8800] transition-colors"
            >
              Donate
            </Link>
          </div>
        </div>
        
        <div className="text-center pt-8 border-t border-white/20">
          <p className="mb-2">Waheguru Ji Ka Khalsa, Waheguru Ji Ki Fateh 🙏</p>
          <p className="text-white/60">Built with Seva. For me. For the Sangat.</p>
          <p className="text-white/60 mt-2">© 2026 Digital Khalsa</p>
        </div>
      </div>
    </footer>
  );
}

