import Changelog from '@/components/transparency/Changelog';
import Timesheet from '@/components/transparency/Timesheet';
import FeatureRequests from '@/components/transparency/FeatureRequests';

export const metadata = {
  title: 'Transparency | Digital Khalsa',
  description: 'Track our progress, view timesheet, and submit feature requests. Building in public for the Sangat.',
};

export default function TransparencyPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#FF9933] to-[#000080] py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Building in Public
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-6">
              Every line of code. Every hour spent. Every feature requested.
              <br />
              Here's what's happening with Digital Khalsa.
            </p>
            <a
              href="/"
              className="inline-block border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#000080] transition"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Changelog Section */}
          <section>
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-[#000080] mb-3">
                📝 Changelog & Updates
              </h2>
              <p className="text-lg text-gray-600">
                Recent progress, features, and fixes. Share updates with your community on social media.
              </p>
            </div>
            <Changelog />
          </section>

          {/* Timesheet Section */}
          <section>
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-[#000080] mb-3">
                ⏱️ Time Invested
              </h2>
              <p className="text-lg text-gray-600">
                Hours spent building this for the Sangat. Every hour is Seva.
              </p>
            </div>
            <Timesheet />
          </section>

          {/* Feature Requests Section */}
          <section>
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-[#000080] mb-3">
                💡 Feature Requests
              </h2>
              <p className="text-lg text-gray-600">
                Your ideas shape this project. Submit requests and track their progress.
              </p>
            </div>
            <FeatureRequests />
          </section>

          {/* GitHub Link Section */}
          <section className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-3">Want to contribute?</h3>
            <p className="text-lg opacity-90 mb-6">
              Digital Khalsa is being built openly. View the code, report issues, or contribute on GitHub.
            </p>
            <a
              href="https://github.com/125kcybersingh/Digital-Khalsa-Web"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
              </svg>
              View on GitHub
            </a>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#000080] text-white py-12 mt-16">
        <div className="container mx-auto px-6 text-center">
          <p className="mb-2">Waheguru Ji Ka Khalsa, Waheguru Ji Ki Fateh 🙏</p>
          <p className="text-white/60">© 2026 Digital Khalsa. Built with Seva.</p>
        </div>
      </footer>
    </main>
  );
}
