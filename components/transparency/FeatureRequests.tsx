'use client';

import { useEffect, useState } from 'react';
import { supabase, type FeatureRequest } from '@/lib/supabase';

export default function FeatureRequests() {
  const [requests, setRequests] = useState<FeatureRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    submitter_name: '',
    submitter_email: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, []);

  async function fetchRequests() {
    try {
      const { data, error } = await supabase
        .from('feature_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (error) {
      console.error('Error fetching feature requests:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { error } = await supabase.from('feature_requests').insert([
        {
          title: formData.title,
          description: formData.description,
          submitter_name: formData.submitter_name || null,
          submitter_email: formData.submitter_email || null,
          status: 'submitted',
        },
      ]);

      if (error) throw error;

      setFormData({ title: '', description: '', submitter_name: '', submitter_email: '' });
      setShowForm(false);
      fetchRequests();
      alert('Feature request submitted! Thank you for your feedback.');
    } catch (error) {
      console.error('Error submitting feature request:', error);
      alert('Error submitting request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  function getStatusColor(status: string) {
    switch (status) {
      case 'submitted':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'under-review':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'planned':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'in-progress':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'declined':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  }

  const filteredRequests = filterStatus === 'all'
    ? requests
    : requests.filter(r => r.status === filterStatus);

  const statusCounts = requests.reduce((acc, req) => {
    acc[req.status] = (acc[req.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF9933]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Submit Button */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filterStatus === 'all'
                ? 'bg-[#000080] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All ({requests.length})
          </button>
          {Object.entries(statusCounts).map(([status, count]) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg font-semibold transition capitalize ${
                filterStatus === status
                  ? 'bg-[#000080] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status.replace('-', ' ')} ({count})
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 bg-[#FF9933] text-white rounded-lg font-semibold hover:bg-[#e88a2e] transition"
        >
          {showForm ? 'Cancel' : '+ Submit Request'}
        </button>
      </div>

      {/* Submission Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-md border-2 border-[#FF9933] p-6">
          <h3 className="text-2xl font-bold text-[#000080] mb-4">Submit Feature Request</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Feature Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933]"
                placeholder="Brief title for your feature request"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933]"
                placeholder="Describe the feature you'd like to see..."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Name (Optional)
                </label>
                <input
                  type="text"
                  value={formData.submitter_name}
                  onChange={(e) => setFormData({ ...formData, submitter_name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933]"
                  placeholder="How should we credit you?"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  value={formData.submitter_email}
                  onChange={(e) => setFormData({ ...formData, submitter_email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933]"
                  placeholder="For updates on your request"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-[#000080] text-white rounded-lg font-semibold hover:bg-[#000066] transition disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : 'Submit Feature Request'}
            </button>
          </form>
        </div>
      )}

      {/* Feature Requests List */}
      {filteredRequests.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">
            {filterStatus === 'all'
              ? 'No feature requests yet. Be the first to submit one!'
              : `No ${filterStatus.replace('-', ' ')} requests.`}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <div
              key={request.id}
              className="bg-white rounded-lg shadow-md border-2 border-gray-100 p-6 hover:border-[#FF9933] transition"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#000080] mb-1">{request.title}</h3>
                  <p className="text-sm text-gray-500">
                    Submitted {new Date(request.created_at).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                    {request.submitter_name && ` by ${request.submitter_name}`}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold border capitalize ${getStatusColor(
                    request.status
                  )}`}
                >
                  {request.status.replace('-', ' ')}
                </span>
              </div>

              <p className="text-gray-700 mb-4 whitespace-pre-wrap">{request.description}</p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="text-sm text-gray-500">
                  {request.upvotes} upvotes
                </div>
                {request.github_issue_url ? (
                  <a
                    href={request.github_issue_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                    </svg>
                    View on GitHub
                  </a>
                ) : (
                  <span className="text-sm text-gray-400 italic">No GitHub issue yet</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
