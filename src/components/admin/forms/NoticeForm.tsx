import React, { useState } from 'react';
import { Bell, Loader } from 'lucide-react';
import axios from 'axios';
import GradientButton from '@/components/ui/GradientButton';

const NoticeForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/api/notices', { 
        headline: title, 
        body: content 
      });
      console.log('Notice created:', response.data);
      setTitle('');
      setContent('');
    } catch (err) {
      console.error(err);
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

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Notice Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                     focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                     text-white placeholder-gray-500 backdrop-blur-sm"
            placeholder="Enter notice title"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Notice Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="w-full px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                     focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                     text-white placeholder-gray-500 backdrop-blur-sm"
            placeholder="Enter notice content"
            required
          />
        </div>

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