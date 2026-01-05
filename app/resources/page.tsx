export default function ResourcesPage() {
  return (
    <main className="min-h-screen">
      {/* Resources Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[#000080] to-[#FF9933]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Sikh Family Cybersecurity Resources
            </h1>
            <p className="text-xl text-white/90 mb-4">
              Comprehensive guides, crisis hotlines, and support services for Sikh families facing online threats, grooming, bullying, and abuse.
            </p>
            <p className="text-lg text-white/80">
              Protecting our Sangat. One resource at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Crisis Resources - Quick Access */}
      <section className="py-12 bg-red-50 border-b-4 border-red-500">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-red-800 mb-6 text-center">
              🚨 IMMEDIATE CRISIS RESOURCES
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="font-bold text-lg mb-3 text-red-700">US</h3>
                <ul className="space-y-2 text-sm">
                  <li><strong>Emergency:</strong> 911</li>
                  <li><strong>Childhelp:</strong> 1-800-4-A-CHILD</li>
                  <li><strong>NCMEC CyberTipline:</strong> 1-800-843-5678</li>
                  <li><strong>Crisis Text Line:</strong> Text HOME to 741741</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="font-bold text-lg mb-3 text-red-700">UK</h3>
                <ul className="space-y-2 text-sm">
                  <li><strong>Emergency:</strong> 999</li>
                  <li><strong>Childline:</strong> 0800 1111</li>
                  <li><strong>NSPCC:</strong> 0808 800 5000</li>
                  <li><strong>Rape Crisis:</strong> 0808 802 9999</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="font-bold text-lg mb-3 text-red-700">Canada</h3>
                <ul className="space-y-2 text-sm">
                  <li><strong>Emergency:</strong> 911</li>
                  <li><strong>Kids Help Phone:</strong> 1-800-668-6868</li>
                  <li><strong>Cybertip.ca:</strong> 1-866-658-9022</li>
                  <li><strong>Text:</strong> Text TALK to 741741</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Threat Categories Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-[#000080] mb-4 text-center">
              The 6 Threat Categories
            </h2>
            <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
              Sikh families face unique cybersecurity threats. Here's what we're protecting against.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Threat 1: Financial Fraud */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="text-3xl mb-3">💰</div>
                <h3 className="text-xl font-bold text-[#000080] mb-2">Financial Fraud</h3>
                <p className="text-gray-600 text-sm mb-2">
                  <strong>Target:</strong> Elderly parents (60+)
                </p>
                <p className="text-gray-600 text-sm">
                  Romance scams, government imposter calls, identity theft targeting Sikh elders.
                </p>
              </div>

              {/* Threat 2: Identity Theft */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="text-3xl mb-3">🆔</div>
                <h3 className="text-xl font-bold text-[#000080] mb-2">Identity Theft</h3>
                <p className="text-gray-600 text-sm mb-2">
                  <strong>Target:</strong> Young adults, professionals
                </p>
                <p className="text-gray-600 text-sm">
                  Fake profiles, phishing, account takeovers affecting Sikh professionals.
                </p>
              </div>

              {/* Threat 3: Religious Hate */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="text-3xl mb-3">⚔️</div>
                <h3 className="text-xl font-bold text-[#000080] mb-2">Religious Hate & Harassment</h3>
                <p className="text-gray-600 text-sm mb-2">
                  <strong>Target:</strong> Activists, visible Sikhs
                </p>
                <p className="text-gray-600 text-sm">
                  Death threats, doxxing, surveillance targeting Sikh community members.
                </p>
              </div>

              {/* Threat 4: Online Grooming */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="text-3xl mb-3">🕷️</div>
                <h3 className="text-xl font-bold text-[#000080] mb-2">Online Grooming</h3>
                <p className="text-gray-600 text-sm mb-2">
                  <strong>Target:</strong> Children 12-15
                </p>
                <p className="text-gray-600 text-sm">
                  500K predators active daily. Sextortion, CSAM production targeting Sikh youth.
                </p>
              </div>

              {/* Threat 5: School Bullying */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="text-3xl mb-3">🏫</div>
                <h3 className="text-xl font-bold text-[#000080] mb-2">School Bullying</h3>
                <p className="text-gray-600 text-sm mb-2">
                  <strong>Target:</strong> Students with visible articles of faith
                </p>
                <p className="text-gray-600 text-sm">
                  77.5% of Sikh students bullied. Physical assault, cyberbullying, religious harassment.
                </p>
              </div>

              {/* Threat 6: Sexual Abuse */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="text-3xl mb-3">🛡️</div>
                <h3 className="text-xl font-bold text-[#000080] mb-2">Sexual Abuse</h3>
                <p className="text-gray-600 text-sm mb-2">
                  <strong>Target:</strong> Women/girls of all ages
                </p>
                <p className="text-gray-600 text-sm">
                  40% less likely to report. Cultural silence, family isolation, underreporting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Pillars */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-[#000080] mb-4 text-center">
              Content Pillars
            </h2>
            <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
              Resources organized by audience and need.
            </p>

            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-2xl font-bold text-[#000080] mb-3">1. Elder Protection (60+)</h3>
                <p className="text-gray-700 mb-2">
                  IRS/government scams, romance fraud, verification tactics, phone security.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Goal:</strong> Protect elderly from financial fraud
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-2xl font-bold text-[#000080] mb-3">2. Family Account Security (35-60)</h3>
                <p className="text-gray-700 mb-2">
                  Passwords, 2FA, phishing, email security, identity protection.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Goal:</strong> Secure family digital ecosystem
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-2xl font-bold text-[#000080] mb-3">3. Youth Online Safety (10-35)</h3>
                <p className="text-gray-700 mb-2">
                  Grooming recognition, sextortion awareness, cyberbullying, school bullying response, consent education.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Goal:</strong> Prevent exploitation & harassment
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-2xl font-bold text-[#000080] mb-3">4. Religious Safety & Harassment</h3>
                <p className="text-gray-700 mb-2">
                  School bullying, hate campaigns, doxxing, mental health, legal options.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Goal:</strong> Combat hate while supporting mental health
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-2xl font-bold text-[#000080] mb-3">5. Diaspora-Specific Security</h3>
                <p className="text-gray-700 mb-2">
                  Money transfer safety, cross-border exploitation, property fraud.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Goal:</strong> Secure diaspora family networks
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-2xl font-bold text-[#000080] mb-3">6. Sexual Abuse & Grooming Education</h3>
                <p className="text-gray-700 mb-2">
                  Grooming prevention, abuse reporting, cultural barriers, trauma-informed healing.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Goal:</strong> Break silence, enable reporting, facilitate healing
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reporting & Support Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-[#000080] mb-4 text-center">
              Reporting & Support Resources
            </h2>
            <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
              Step-by-step guides for reporting abuse, grooming, and harassment. Culturally-specific support services.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-[#FF9933] to-[#000080] rounded-xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Law Enforcement Reporting</h3>
                <ul className="space-y-2 text-white/90">
                  <li>• When and how to report to police</li>
                  <li>• What documentation to bring</li>
                  <li>• FBI ICAC Task Force (US)</li>
                  <li>• RCMP coordination (Canada)</li>
                  <li>• UK National Crime Agency</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-[#000080] to-[#FF9933] rounded-xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Social Media Platform Reporting</h3>
                <ul className="space-y-2 text-white/90">
                  <li>• Facebook/Instagram/Meta</li>
                  <li>• TikTok, Snapchat, Discord</li>
                  <li>• YouTube, WhatsApp, X (Twitter)</li>
                  <li>• Step-by-step reporting guides</li>
                  <li>• NCMEC CyberTipline process</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-[#000080] mb-4">Culturally-Specific Support</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Al-Hurraya</strong> (UK) - Sikh/South Asian sexual abuse support</li>
                  <li>• <strong>MANAVI</strong> (US/New Jersey) - South Asian women/children</li>
                  <li>• <strong>Notts SVSS</strong> (UK) - Sexual violence support</li>
                  <li>• <strong>UNITED SIKHS</strong> - UMEED Helpline</li>
                  <li>• <strong>Sikh Coalition</strong> (US) - Bullying expertise, legal resources</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-[#000080] mb-4">Legal Resources & Remedies</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Restraining orders</li>
                  <li>• Title VI complaints (US schools)</li>
                  <li>• Human rights commissions</li>
                  <li>• School bullying reporting procedures</li>
                  <li>• Documentation & preservation guidelines</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Note about extensive content */}
      <section className="py-12 bg-[#000080] text-white">
        <div className="container mx-auto px-6 text-center">
          <p className="text-lg mb-2">
            This resources page is being continuously expanded with detailed guides, printable resources, and multi-language content.
          </p>
          <p className="text-white/80">
            Content strategy and detailed resources available in <code className="bg-white/20 px-2 py-1 rounded">/public/resources/</code>
          </p>
        </div>
      </section>
    </main>
  );
}

