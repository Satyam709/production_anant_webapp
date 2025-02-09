import React, { useState } from 'react';
import { Bell, Loader } from 'lucide-react';
import axios from 'axios';
import GradientButton from '@/components/ui/GradientButton';

const NoticeForm = () => {
  const [headline, setHeadline] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState<'General' | 'Technical' | 'Sponsorship'>('General');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');


  const userID = 'test-user-id';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('/api/notices/create', {
        headline,
        body,
        category,
        userID,
      });

      if (response.data.error) {
        setError(response.data.error);
      } else {
        setSuccess(response.data.response || 'Notice created successfully!');
        // Reset form fields
        setHeadline('');
        setBody('');
        setCategory('General');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create notice');
      console.error('Error creating notice:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="backdrop-blur-xl bg-black/30 p-8 rounded-2xl border border-gray-800 shadow-xl">
      <div className="flex items-center space-x-3 mb-6">
        <Bell className="h-6 w-6 text-primary-cyan" />
        <h2 className="text-xl font-semibold text-white">Create Notice</h2>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded bg-red-500/10 border border-red-500/50 text-red-500">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 rounded bg-green-500/10 border border-green-500/50 text-green-500">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Notice Headline */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Notice Headline
          </label>
          <input
            type="text"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            className="w-full px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg 
                       focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50 
                       text-white placeholder-gray-500 backdrop-blur-sm"
            placeholder="Enter notice headline"
            required
          />
        </div>

        {/* Notice Body */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Notice Body
          </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={4}
            className="w-full px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg 
                       focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50 
                       text-white placeholder-gray-500 backdrop-blur-sm"
            placeholder="Enter notice content"
            required
          />
        </div>

        {/* Notice Category */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Category
          </label>
          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value as 'General' | 'Technical' | 'Sponsorship')
            }
            className="w-full px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg 
                       focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50 
                       text-white placeholder-gray-500 backdrop-blur-sm"
            required
          >
            <option value="General">General</option>
            <option value="Technical">Technical</option>
            <option value="Sponsorship">Sponsorship</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <GradientButton type="submit" disabled={loading}>
            <div className="flex items-center space-x-2">
              {loading ? <Loader className="h-5 w-5 animate-spin" /> : <Bell className="h-5 w-5" />}
              <span>{loading ? 'Creating...' : 'Create Notice'}</span>
            </div>
          </GradientButton>
        </div>
      </form>
    </div>
  );
};

export default NoticeForm;
