import React, { useState } from 'react';
import { Bell, Loader, Upload } from 'lucide-react';
import GradientButton from '../ui/GradientButton';

type Notice = {
  headline: string;
  body: string;
  category: 'General' | 'Technical' | 'Sponsorship';
  image: string;
};

const NoticeForm = () => {
  const [formData, setFormData] = useState<Notice>({
    headline: '',
    body: '',
    category: 'General',
    image: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess('Notice created successfully!');
      setFormData({
        headline: '',
        body: '',
        category: 'General',
        image: '',
      });
    } catch (err: any) {
      setError('Failed to create notice');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="backdrop-blur-xl bg-black/30 p-8 rounded-2xl border border-gray-800 shadow-xl">
      <div className="flex items-center space-x-3 mb-6">
        <Bell className="h-6 w-6 text-primary-cyan" />
        <h2 className="text-xl font-semibold text-white">Create Notice</h2>
      </div>

      {error && (
        <div className="mb-4 p-4 rounded-lg bg-red-500/10 border border-red-500/50 text-red-500 flex items-center space-x-2">
          <div className="w-1 h-full bg-red-500 rounded-full" />
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 rounded-lg bg-green-500/10 border border-green-500/50 text-green-500 flex items-center space-x-2">
          <div className="w-1 h-full bg-green-500 rounded-full" />
          <p>{success}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Headline
          </label>
          <input
            type="text"
            name="headline"
            value={formData.headline}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                     focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                     text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-200"
            placeholder="Enter notice headline"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                     focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                     text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-200"
            required
          >
            <option value="General">General</option>
            <option value="Technical">Technical</option>
            <option value="Sponsorship">Sponsorship</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Image URL
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              className="flex-1 px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                       focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                       text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-200"
              placeholder="Enter image URL"
            />
            <button
              type="button"
              className="px-4 py-2.5 bg-gray-800 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
            >
              <Upload className="h-5 w-5" />
            </button>
          </div>
          {formData.image && (
            <div className="mt-2 relative rounded-lg overflow-hidden h-40">
              <img
                src={formData.image}
                alt="Notice preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Body
          </label>
          <textarea
            name="body"
            value={formData.body}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                     focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                     text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-200"
            placeholder="Enter notice content"
            required
          />
        </div>

        <div className="flex justify-end">
          <GradientButton disabled={loading}>
            <div className="flex items-center space-x-2">
              {loading ? (
                <Loader className="h-5 w-5 animate-spin" />
              ) : (
                <Bell className="h-5 w-5" />
              )}
              <span>{loading ? 'Creating...' : 'Create Notice'}</span>
            </div>
          </GradientButton>
        </div>
      </form>
    </div>
  );
};

export default NoticeForm;