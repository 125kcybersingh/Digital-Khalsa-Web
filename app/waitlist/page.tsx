import WaitlistForm from '@/components/WaitlistForm';

export default function WaitlistPage() {
  return (
    <main className="min-h-screen">
      {/* Waitlist Signup Section */}
      <section className="py-20 bg-gradient-to-br from-[#000080] to-[#FF9933]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Join the Beta
            </h1>
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
    </main>
  );
}

