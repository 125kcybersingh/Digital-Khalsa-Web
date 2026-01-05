'use client';

import { useEffect, useState } from 'react';
import { supabase, type ChangelogEntry } from '@/lib/supabase';

export default function Changelog() {
  const [entries, setEntries] = useState<ChangelogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEntries();
  }, []);

  async function fetchEntries() {
    try {
      const { data, error } = await supabase
        .from('changelog_entries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEntries(data || []);
    } catch (error) {
      console.error('Error fetching changelog:', error);
    } finally {
      setLoading(false);
    }
  }

  function getStatusColor(status: string) {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'planned':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  }

  function getCategoryIcon(category: string) {
    switch (category) {
      case 'feature':
        return '✨';
      case 'bug-fix':
        return '🐛';
      case 'improvement':
        return '⚡';
      case 'update':
        return '📢';
      default:
        return '📝';
    }
  }

  function shareToTwitter(entry: ChangelogEntry) {
    const text = `${entry.title}\n\n${entry.description}\n\n#DigitalKhalsa`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'width=550,height=420');
    incrementShareCount(entry.id);
  }

  function shareToInstagram(entry: ChangelogEntry) {
    // Instagram doesn't have a direct share URL, so we'll copy to clipboard
    const text = `${entry.title}\n\n${entry.description}\n\n#DigitalKhalsa`;
    navigator.clipboard.writeText(text);
    alert('Text copied to clipboard! Paste it in your Instagram post/story.');
    incrementShareCount(entry.id);
  }

  async function incrementShareCount(id: string) {
    try {
      const entry = entries.find(e => e.id === id);
      if (!entry) return;

      const { error } = await supabase
        .from('changelog_entries')
        .update({ share_count: entry.share_count + 1 })
        .eq('id', id);

      if (!error) {
        setEntries(entries.map(e =>
          e.id === id ? { ...e, share_count: e.share_count + 1 } : e
        ));
      }
    } catch (error) {
      console.error('Error updating share count:', error);
    }
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF9933]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {entries.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No updates yet. Check back soon!</p>
        </div>
      ) : (
        entries.map((entry) => (
          <div
            key={entry.id}
            className={`bg-white rounded-lg shadow-md border-2 p-6 ${
              entry.is_pinned ? 'border-[#FF9933]' : 'border-gray-100'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getCategoryIcon(entry.category)}</span>
                <div>
                  <h3 className="text-xl font-bold text-[#000080]">
                    {entry.title}
                    {entry.is_pinned && (
                      <span className="ml-2 text-sm bg-[#FF9933] text-white px-2 py-1 rounded">
                        Pinned
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {new Date(entry.created_at).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(
                  entry.status
                )}`}
              >
                {entry.status.replace('-', ' ')}
              </span>
            </div>

            <p className="text-gray-700 mb-4 whitespace-pre-wrap">{entry.description}</p>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="text-sm text-gray-500">
                Shared {entry.share_count} times
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => shareToTwitter(entry)}
                  className="px-4 py-2 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1a8cd8] transition flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                  Twitter
                </button>
                <button
                  onClick={() => shareToInstagram(entry)}
                  className="px-4 py-2 bg-gradient-to-r from-[#f09433] via-[#e6683c] to-[#bc1888] text-white rounded-lg hover:opacity-90 transition flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Instagram
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
