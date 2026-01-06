import Link from 'next/link';

export const metadata = {
  title: 'Contact Us | Digital Khalsa',
  description: 'Get in touch with Digital Khalsa through our social media channels.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#FF9933] to-[#000080] py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Connect with us through our social media channels
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-3xl font-bold text-[#000080] mb-4">Get in Touch</h2>
            <p className="text-gray-700 mb-6">
              Have questions, feedback, or want to connect? Reach out to us through any of our social media channels. 
              We're here to help and would love to hear from you.
            </p>
            <p className="text-gray-700">
              For feature requests, bug reports, or technical questions, you can also visit our{' '}
              <a href="/transparency" className="text-[#000080] hover:text-[#FF9933] font-semibold transition-colors underline">
                Transparency Page
              </a>{' '}
              to submit feature requests directly.
            </p>
          </section>

          {/* Social Media Links */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-3xl font-bold text-[#000080] mb-6">Connect With Us</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* X (Twitter) */}
              <a
                href="https://twitter.com/125kCyberSingh"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border-2 border-gray-200 hover:border-[#1DA1F2]"
              >
                <div className="flex-shrink-0">
                  <svg
                    className="w-12 h-12 text-[#1DA1F2]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#000080] mb-1">X (Twitter)</h3>
                  <p className="text-gray-600 mb-2">@125kCyberSingh</p>
                  <p className="text-sm text-gray-500">Follow us for updates and announcements</p>
                </div>
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/125kcybersingh"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border-2 border-gray-200 hover:border-[#E4405F]"
              >
                <div className="flex-shrink-0">
                  <svg
                    className="w-12 h-12 text-[#E4405F]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#000080] mb-1">Instagram</h3>
                  <p className="text-gray-600 mb-2">@125kcybersingh</p>
                  <p className="text-sm text-gray-500">See our latest updates and behind-the-scenes</p>
                </div>
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/125kCyberSingh"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border-2 border-gray-200 hover:border-gray-900"
              >
                <div className="flex-shrink-0">
                  <svg
                    className="w-12 h-12 text-gray-900"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#000080] mb-1">GitHub</h3>
                  <p className="text-gray-600 mb-2">125kCyberSingh</p>
                  <p className="text-sm text-gray-500">View our code and contribute to the project</p>
                </div>
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>

              {/* Repository Link */}
              <a
                href="https://github.com/125kcybersingh/Digital-Khalsa-Web"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border-2 border-gray-200 hover:border-gray-900"
              >
                <div className="flex-shrink-0">
                  <svg
                    className="w-12 h-12 text-gray-900"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#000080] mb-1">Repository</h3>
                  <p className="text-gray-600 mb-2">Digital-Khalsa-Web</p>
                  <p className="text-sm text-gray-500">View the source code for this website</p>
                </div>
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            </div>
          </section>

          {/* Additional Information */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-3xl font-bold text-[#000080] mb-4">Other Ways to Connect</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-[#000080] mb-2">Feature Requests</h3>
                <p className="text-gray-700 mb-2">
                  Have an idea for a new feature? Submit it on our{' '}
                  <a href="/transparency" className="text-[#000080] hover:text-[#FF9933] font-semibold transition-colors underline">
                    Transparency Page
                  </a>
                  .
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#000080] mb-2">Bug Reports</h3>
                <p className="text-gray-700 mb-2">
                  Found a bug? Report it on{' '}
                  <a
                    href="https://github.com/125kcybersingh/Digital-Khalsa-Web/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#000080] hover:text-[#FF9933] font-semibold transition-colors underline"
                  >
                    GitHub Issues
                  </a>
                  .
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#000080] mb-2">Privacy & Legal</h3>
                <p className="text-gray-700">
                  For privacy-related inquiries, please see our{' '}
                  <a href="/privacy" className="text-[#000080] hover:text-[#FF9933] font-semibold transition-colors underline">
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
            </div>
          </section>

          {/* Back Link */}
          <div className="text-center mt-8">
            <Link
              href="/"
              className="inline-block text-[#000080] hover:text-[#FF9933] font-semibold transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

