'use client';

import { useEffect, useState } from 'react';

export default function SupabaseDebug() {
  const [debug, setDebug] = useState({
    hasUrl: false,
    hasKey: false,
    urlValue: '',
  });

  useEffect(() => {
    setDebug({
      hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      urlValue: process.env.NEXT_PUBLIC_SUPABASE_URL || 'MISSING',
    });
  }, []);

  // Only show in development
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-lg text-xs max-w-sm">
      <div className="font-bold mb-2">🔍 Supabase Debug</div>
      <div>URL: {debug.hasUrl ? '✅' : '❌'} {debug.urlValue.substring(0, 30)}...</div>
      <div>Key: {debug.hasKey ? '✅' : '❌'}</div>
    </div>
  );
}
