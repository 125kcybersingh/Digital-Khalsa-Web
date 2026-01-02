'use client';

import { useState, FormEvent } from 'react';
import { supabase } from '@/lib/supabase';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isNewToSikhi, setIsNewToSikhi] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Check if email already exists
      const { data: existing } = await supabase
        .from('user_profiles')
        .select('email')
        .eq('email', email)
        .single();

      if (existing) {
        setError('This email is already on the waitlist!');
        setLoading(false);
        return;
      }

      // Insert new user profile
      const { error: insertError } = await supabase
        .from('user_profiles')
        .insert([
          {
            email,
            display_name: displayName || null,
            is_new_to_sikhi: isNewToSikhi,
          },
        ]);

      if (insertError) throw insertError;

      setSuccess(true);
      setEmail('');
      setDisplayName('');
      setIsNewToSikhi(false);
    } catch (err: any) {
      console.error('Error joining waitlist:', err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-green-50 border-2 border-green-500 rounded-2xl p-8 text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold text-green-800 mb-2">You're on the list!</h3>
        <p className="text-green-700">
          We'll email you on January 5th with your beta access link.
          <br />
          Waheguru Ji Ka Khalsa, Waheguru Ji Ki Fateh!
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-[#000080] mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#FF9933] focus:outline-none transition"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label htmlFor="displayName" className="block text-sm font-semibold text-[#000080] mb-2">
            Name (Optional)
          </label>
          <input
            type="text"
            id="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#FF9933] focus:outline-none transition"
            placeholder="How should we address you?"
          />
        </div>

        <div className="flex items-start">
          <input
            type="checkbox"
            id="isNewToSikhi"
            checked={isNewToSikhi}
            onChange={(e) => setIsNewToSikhi(e.target.checked)}
            className="mt-1 w-5 h-5 text-[#FF9933] border-gray-300 rounded focus:ring-[#FF9933]"
          />
          <label htmlFor="isNewToSikhi" className="ml-3 text-sm text-gray-700">
            I'm new to Sikhi (we'll include extra guidance & context in the app)
          </label>
        </div>

        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 text-red-700 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-[#FF9933] to-[#000080] text-white px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? 'Joining...' : 'Join the Waitlist (Jan 5 Launch)'}
        </button>

        <p className="text-xs text-gray-500 text-center">
          Free forever. No ads. Built as seva for the Sangat.
        </p>
      </div>
    </form>
  );
}
