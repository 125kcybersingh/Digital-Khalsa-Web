import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy (Draft) | Digital Khalsa',
  description: 'Privacy Policy for Digital Khalsa - Draft version aligned with GDPR, US, and Canadian privacy laws.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#FF9933] to-[#000080] py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="mb-4">
              <span className="inline-block bg-yellow-500 text-yellow-900 px-4 py-2 rounded-lg font-bold text-sm">
                DRAFT - NOT FINAL
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              How we collect, use, and protect your information
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Draft Notice */}
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-8 rounded-r-lg">
            <h2 className="text-xl font-bold text-yellow-900 mb-2">⚠️ Draft Notice</h2>
            <p className="text-yellow-800">
              This privacy policy is a <strong>draft</strong> and has not been finalized. It is provided for review purposes only. 
              This document aligns with{' '}
              <a href="https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32016R0679" target="_blank" rel="noopener noreferrer" className="underline font-semibold">GDPR (General Data Protection Regulation)</a>,{' '}
              US privacy laws (including{' '}
              <a href="https://oag.ca.gov/privacy/ccpa" target="_blank" rel="noopener noreferrer" className="underline font-semibold">CCPA</a>), 
              and Canadian privacy laws ({' '}
              <a href="https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/" target="_blank" rel="noopener noreferrer" className="underline font-semibold">PIPEDA</a>). 
              Final legal review is pending.
            </p>
          </div>

          {/* Last Updated */}
          <div className="text-sm text-gray-600 mb-8">
            <p><strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p><strong>Effective Date:</strong> To be determined</p>
          </div>

          {/* Introduction */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-3xl font-bold text-[#000080] mb-4">1. Introduction</h2>
            <p className="text-gray-700 mb-4">
              Digital Khalsa ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains 
              how we collect, use, disclose, and safeguard your information when you use our website and services 
              (collectively, the "Service").
            </p>
            <p className="text-gray-700">
              By using our Service, you agree to the collection and use of information in accordance with this policy. 
              If you do not agree with our policies and practices, please do not use our Service.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-3xl font-bold text-[#000080] mb-4">2. Information We Collect</h2>
            
            <h3 className="text-2xl font-semibold text-[#000080] mb-3 mt-6">2.1 Information You Provide</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li><strong>Account Information:</strong> Name, email address, phone number (if provided)</li>
              <li><strong>Waitlist Information:</strong> Name, email, device preferences, referral codes</li>
              <li><strong>Feature Requests:</strong> Title, description, optional name and email</li>
              <li><strong>Communications:</strong> Messages, feedback, and other communications you send to us</li>
            </ul>

            <h3 className="text-2xl font-semibold text-[#000080] mb-3 mt-6">2.2 Automatically Collected Information</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li><strong>Usage Data:</strong> Pages visited, time spent, click patterns, and navigation paths</li>
              <li><strong>Device Information:</strong> Device type, operating system, browser type, IP address</li>
              <li><strong>Location Data:</strong> General geographic location (city/region level, not precise coordinates)</li>
              <li><strong>Cookies and Tracking:</strong> See our Cookie Policy section below</li>
            </ul>

            <h3 className="text-2xl font-semibold text-[#000080] mb-3 mt-6">2.3 Third-Party Services</h3>
            <p className="text-gray-700 mb-2">
              We use third-party services that may collect information:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong><a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-[#000080] hover:text-[#FF9933] underline">Supabase</a>:</strong> Database and authentication services</li>
              <li><strong><a href="https://www.netlify.com" target="_blank" rel="noopener noreferrer" className="text-[#000080] hover:text-[#FF9933] underline">Netlify</a>:</strong> Hosting and analytics</li>
              <li><strong><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#000080] hover:text-[#FF9933] underline">Google Services</a>:</strong> Analytics, fonts, and other services (see <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#000080] hover:text-[#FF9933] underline">Google's privacy policy</a>)</li>
            </ul>
          </section>

          {/* How We Use Information */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-3xl font-bold text-[#000080] mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-700 mb-4">We use collected information for the following purposes:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>To provide, maintain, and improve our Service</li>
              <li>To process waitlist signups and beta test invitations</li>
              <li>To respond to your inquiries, comments, and feature requests</li>
              <li>To send you updates, newsletters, and marketing communications (with your consent)</li>
              <li>To monitor and analyze usage patterns and trends</li>
              <li>To detect, prevent, and address technical issues and security threats</li>
              <li>To comply with legal obligations and enforce our terms</li>
            </ul>
          </section>

          {/* Legal Basis (GDPR) */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-3xl font-bold text-[#000080] mb-4">4. Legal Basis for Processing (GDPR)</h2>
            <p className="text-gray-700 mb-4">
              For users in the European Economic Area (EEA), we process your personal data based on:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>Consent:</strong> When you provide explicit consent (e.g., waitlist signup, newsletter)</li>
              <li><strong>Legitimate Interests:</strong> To improve our Service, prevent fraud, and ensure security</li>
              <li><strong>Contractual Necessity:</strong> To fulfill our obligations under our terms of service</li>
              <li><strong>Legal Obligations:</strong> To comply with applicable laws and regulations</li>
            </ul>
          </section>

          {/* Data Sharing */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-3xl font-bold text-[#000080] mb-4">5. Data Sharing and Disclosure</h2>
            <p className="text-gray-700 mb-4">We do not sell your personal information. We may share information in the following circumstances:</p>
            
            <h3 className="text-2xl font-semibold text-[#000080] mb-3 mt-6">5.1 Service Providers</h3>
            <p className="text-gray-700 mb-2">
              We share information with trusted third-party service providers who assist in operating our Service:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Hosting providers (<a href="https://www.netlify.com" target="_blank" rel="noopener noreferrer" className="text-[#000080] hover:text-[#FF9933] underline">Netlify</a>)</li>
              <li>Database services (<a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-[#000080] hover:text-[#FF9933] underline">Supabase</a>)</li>
              <li>Analytics providers (<a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer" className="text-[#000080] hover:text-[#FF9933] underline">Google Analytics</a>)</li>
              <li>Email service providers</li>
            </ul>

            <h3 className="text-2xl font-semibold text-[#000080] mb-3 mt-6">5.2 Legal Requirements</h3>
            <p className="text-gray-700 mb-2">We may disclose information if required by law or in response to:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Court orders, subpoenas, or legal processes</li>
              <li>Government requests or regulatory requirements</li>
              <li>Protection of rights, property, or safety of users or others</li>
            </ul>

            <h3 className="text-2xl font-semibold text-[#000080] mb-3 mt-6">5.3 Business Transfers</h3>
            <p className="text-gray-700">
              In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity.
            </p>
          </section>

          {/* Data Retention */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-3xl font-bold text-[#000080] mb-4">6. Data Retention</h2>
            <p className="text-gray-700 mb-4">
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, 
              unless a longer retention period is required or permitted by law.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>Account Data:</strong> Retained while your account is active and for a reasonable period after closure</li>
              <li><strong>Waitlist Data:</strong> Retained until you unsubscribe or request deletion</li>
              <li><strong>Analytics Data:</strong> Aggregated and anonymized data may be retained indefinitely</li>
              <li><strong>Legal Requirements:</strong> Some data may be retained to comply with legal obligations</li>
            </ul>
          </section>

          {/* Your Rights */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-3xl font-bold text-[#000080] mb-4">7. Your Privacy Rights</h2>
            
            <h3 className="text-2xl font-semibold text-[#000080] mb-3 mt-6">7.1 GDPR Rights (EEA Users)</h3>
            <p className="text-gray-700 mb-2">
              If you are in the EEA, you have the right to (under the{' '}
              <a href="https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32016R0679" target="_blank" rel="noopener noreferrer" className="text-[#000080] hover:text-[#FF9933] underline">General Data Protection Regulation</a>):
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Rectification:</strong> Correct inaccurate or incomplete data</li>
              <li><strong>Erasure:</strong> Request deletion of your personal data ("right to be forgotten")</li>
              <li><strong>Restriction:</strong> Request limitation of processing</li>
              <li><strong>Data Portability:</strong> Receive your data in a structured, machine-readable format</li>
              <li><strong>Objection:</strong> Object to processing based on legitimate interests</li>
              <li><strong>Withdraw Consent:</strong> Withdraw consent at any time (where processing is based on consent)</li>
            </ul>

            <h3 className="text-2xl font-semibold text-[#000080] mb-3 mt-6">7.2 CCPA Rights (California Users)</h3>
            <p className="text-gray-700 mb-2">
              If you are a California resident, you have the right to (under the{' '}
              <a href="https://oag.ca.gov/privacy/ccpa" target="_blank" rel="noopener noreferrer" className="text-[#000080] hover:text-[#FF9933] underline">California Consumer Privacy Act (CCPA)</a>):
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li><strong>Know:</strong> Request disclosure of categories and specific pieces of personal information collected</li>
              <li><strong>Delete:</strong> Request deletion of personal information (subject to exceptions)</li>
              <li><strong>Opt-Out:</strong> Opt-out of the sale of personal information (we do not sell your information)</li>
              <li><strong>Non-Discrimination:</strong> Exercise your rights without discrimination</li>
            </ul>

            <h3 className="text-2xl font-semibold text-[#000080] mb-3 mt-6">7.3 PIPEDA Rights (Canadian Users)</h3>
            <p className="text-gray-700 mb-2">
              If you are in Canada, you have the right to (under{' '}
              <a href="https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/" target="_blank" rel="noopener noreferrer" className="text-[#000080] hover:text-[#FF9933] underline">PIPEDA</a>):
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li><strong>Access:</strong> Request access to your personal information</li>
              <li><strong>Correction:</strong> Request correction of inaccurate information</li>
              <li><strong>Withdraw Consent:</strong> Withdraw consent for collection, use, or disclosure</li>
              <li><strong>File a Complaint:</strong> File a complaint with the{' '}
                <a href="https://www.priv.gc.ca/en/for-individuals/" target="_blank" rel="noopener noreferrer" className="text-[#000080] hover:text-[#FF9933] underline">Privacy Commissioner of Canada</a>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-[#000080] mb-3 mt-6">7.4 Exercising Your Rights</h3>
            <p className="text-gray-700 mb-2">
              To exercise any of these rights, please contact us using the information provided in the Contact section below. 
              We will respond to your request within 30 days (or as required by applicable law).
            </p>
          </section>

          {/* Cookies */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-3xl font-bold text-[#000080] mb-4">8. Cookies and Tracking Technologies</h2>
            <p className="text-gray-700 mb-4">
              We use cookies and similar tracking technologies to track activity on our Service and store certain information.
            </p>
            
            <h3 className="text-2xl font-semibold text-[#000080] mb-3 mt-6">8.1 Types of Cookies</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li><strong>Essential Cookies:</strong> Required for the Service to function (cannot be disabled)</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how users interact with our Service</li>
              <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
            </ul>

            <h3 className="text-2xl font-semibold text-[#000080] mb-3 mt-6">8.2 Cookie Management</h3>
            <p className="text-gray-700">
              You can control cookies through your browser settings. However, disabling certain cookies may limit 
              functionality of the Service.
            </p>
          </section>

          {/* Security */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-3xl font-bold text-[#000080] mb-4">9. Data Security</h2>
            <p className="text-gray-700 mb-4">
              We implement appropriate technical and organizational measures to protect your personal information against 
              unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the 
              Internet or electronic storage is 100% secure.
            </p>
            <p className="text-gray-700">
              Security measures include:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Encryption of data in transit (HTTPS/TLS)</li>
              <li>Secure database storage with access controls</li>
              <li>Regular security assessments and updates</li>
              <li>Limited access to personal information on a need-to-know basis</li>
            </ul>
          </section>

          {/* International Transfers */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-3xl font-bold text-[#000080] mb-4">10. International Data Transfers</h2>
            <p className="text-gray-700 mb-4">
              Your information may be transferred to and processed in countries other than your country of residence. 
              These countries may have data protection laws that differ from those in your country.
            </p>
            <p className="text-gray-700 mb-4">
              For EEA users, we ensure appropriate safeguards are in place for international transfers, including:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Standard Contractual Clauses (SCCs) approved by the{' '}
                <a href="https://ec.europa.eu/info/law/law-topic/data-protection/international-dimension-data-protection/standard-contractual-clauses-scc_en" target="_blank" rel="noopener noreferrer" className="text-[#000080] hover:text-[#FF9933] underline">European Commission</a>
              </li>
              <li>Adequacy decisions by the{' '}
                <a href="https://ec.europa.eu/info/law/law-topic/data-protection/international-dimension-data-protection/adequacy-decisions_en" target="_blank" rel="noopener noreferrer" className="text-[#000080] hover:text-[#FF9933] underline">European Commission</a>
              </li>
              <li>Other legally recognized transfer mechanisms</li>
            </ul>
          </section>

          {/* Children's Privacy */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-3xl font-bold text-[#000080] mb-4">11. Children's Privacy</h2>
            <p className="text-gray-700 mb-4">
              Our Service is not intended for children under the age of 13 (or 16 in the EEA). We do not knowingly 
              collect personal information from children under these ages.
            </p>
            <p className="text-gray-700">
              If you are a parent or guardian and believe your child has provided us with personal information, 
              please contact us immediately. We will delete such information upon verification.
            </p>
          </section>

          {/* Changes to Policy */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-3xl font-bold text-[#000080] mb-4">12. Changes to This Privacy Policy</h2>
            <p className="text-gray-700 mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Posting the new Privacy Policy on this page</li>
              <li>Updating the "Last Updated" date</li>
              <li>Sending you an email notification (for significant changes)</li>
              <li>Displaying a notice on our Service</li>
            </ul>
            <p className="text-gray-700 mt-4">
              Your continued use of the Service after changes become effective constitutes acceptance of the updated policy.
            </p>
          </section>

          {/* Contact */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-3xl font-bold text-[#000080] mb-4">13. Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have questions, concerns, or wish to exercise your privacy rights, please contact us:
            </p>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-700 mb-2"><strong>Digital Khalsa</strong></p>
              <p className="text-gray-700 mb-2">
                <strong>Email:</strong> Contact us via our social media channels (see Contact page)
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Website:</strong> <Link href="/contact" className="text-[#000080] hover:text-[#FF9933] underline">Contact Page</Link>
              </p>
              <p className="text-gray-700">
                <strong>Data Protection Officer:</strong> Contact information to be added
              </p>
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

