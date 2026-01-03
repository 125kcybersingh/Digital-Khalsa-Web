'use client';

import { useEffect, useState } from 'react';
import { supabase, type TimesheetEntry } from '@/lib/supabase';

export default function Timesheet() {
  const [entries, setEntries] = useState<TimesheetEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [groupBy, setGroupBy] = useState<'week' | 'month'>('week');

  useEffect(() => {
    fetchEntries();
  }, []);

  async function fetchEntries() {
    try {
      const { data, error } = await supabase
        .from('timesheet_entries')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      setEntries(data || []);
    } catch (error) {
      console.error('Error fetching timesheet:', error);
    } finally {
      setLoading(false);
    }
  }

  function getCategoryColor(category: string) {
    switch (category) {
      case 'development':
        return 'bg-blue-100 text-blue-800';
      case 'design':
        return 'bg-purple-100 text-purple-800';
      case 'research':
        return 'bg-green-100 text-green-800';
      case 'testing':
        return 'bg-red-100 text-red-800';
      case 'documentation':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  function getTotalHours() {
    return entries.reduce((sum, entry) => sum + entry.hours, 0).toFixed(2);
  }

  function getHoursByCategory() {
    const categoryHours: Record<string, number> = {};
    entries.forEach((entry) => {
      categoryHours[entry.category] = (categoryHours[entry.category] || 0) + entry.hours;
    });
    return categoryHours;
  }

  function groupEntriesByPeriod() {
    const grouped: Record<string, TimesheetEntry[]> = {};

    entries.forEach((entry) => {
      const date = new Date(entry.date);
      let key: string;

      if (groupBy === 'week') {
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        key = weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      } else {
        key = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      }

      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(entry);
    });

    return grouped;
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF9933]"></div>
      </div>
    );
  }

  const categoryHours = getHoursByCategory();
  const groupedEntries = groupEntriesByPeriod();

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-[#FF9933] to-[#000080] rounded-lg p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Total Hours Logged</h3>
          <p className="text-4xl font-bold">{getTotalHours()}</p>
          <p className="text-sm opacity-90 mt-2">Across {entries.length} entries</p>
        </div>

        <div className="bg-white rounded-lg p-6 border-2 border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-[#000080]">Hours by Category</h3>
          <div className="space-y-2">
            {Object.entries(categoryHours)
              .sort(([, a], [, b]) => b - a)
              .map(([category, hours]) => (
                <div key={category} className="flex justify-between items-center">
                  <span className="capitalize text-gray-700">{category}</span>
                  <span className="font-semibold text-[#000080]">{hours.toFixed(1)}h</span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Group By Toggle */}
      <div className="flex justify-end gap-2">
        <button
          onClick={() => setGroupBy('week')}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            groupBy === 'week'
              ? 'bg-[#000080] text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          By Week
        </button>
        <button
          onClick={() => setGroupBy('month')}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            groupBy === 'month'
              ? 'bg-[#000080] text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          By Month
        </button>
      </div>

      {/* Timesheet Entries */}
      {entries.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No timesheet entries yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedEntries).map(([period, periodEntries]) => {
            const periodTotal = periodEntries.reduce((sum, e) => sum + e.hours, 0);
            return (
              <div key={period} className="bg-white rounded-lg shadow-md border-2 border-gray-100 p-6">
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
                  <h3 className="text-lg font-bold text-[#000080]">{period}</h3>
                  <span className="text-lg font-semibold text-[#FF9933]">
                    {periodTotal.toFixed(1)} hours
                  </span>
                </div>
                <div className="space-y-3">
                  {periodEntries.map((entry) => (
                    <div
                      key={entry.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`px-2 py-1 rounded text-xs font-semibold ${getCategoryColor(
                              entry.category
                            )}`}
                          >
                            {entry.category}
                          </span>
                          <span className="text-sm text-gray-500">
                            {new Date(entry.date).toLocaleDateString('en-US', {
                              weekday: 'short',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        </div>
                        <p className="text-gray-700">{entry.description}</p>
                      </div>
                      <div className="text-right ml-4">
                        <p className="text-lg font-bold text-[#000080]">{entry.hours}h</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
