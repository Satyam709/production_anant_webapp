import React, { useState } from 'react';
import { Users, Loader } from 'lucide-react';
import GradientButton from '../ui/GradientButton';

type Meeting = {
  venue: string;
  starts: Date;
  duration: number;
  topic_of_discussion: string;
};

const MeetForm = () => {
  const [formData, setFormData] = useState<Meeting>({
    venue: '',
    starts: new Date(),
    duration: 60,
    topic_of_discussion: '',
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
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess('Meeting scheduled successfully!');
      setFormData({
        venue: '',
        starts: new Date(),
        duration: 60,
        topic_of_discussion: '',
      });
    } catch (err: any) {
      setError('Failed to schedule meeting');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'duration') {
      setFormData(prev => ({ ...prev, [name]: parseInt(value) }));
    } else if (name === 'starts') {
      setFormData(prev => ({ ...prev, starts: new Date(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="backdrop-blur-xl bg-black/30 p-8 rounded-2xl border border-gray-800 shadow-xl">
      <div className="flex items-center space-x-3 mb-6">
        <Users className="h-6 w-6 text-primary-cyan" />
        <h2 className="text-xl font-semibold text-white">Schedule Meeting</h2>
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
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Venue
          </label>
          <input
            type="text"
            name="venue"
            value={formData.venue}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                     focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                     text-white placeholder-gray-500 backdrop-blur-sm"
            placeholder="Enter meeting venue"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Start Date & Time
            </label>
            <input
              type="datetime-local"
              name="starts"
              value={formData.starts instanceof Date ? formData.starts.toISOString().slice(0, 16) : ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                       focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                       text-white placeholder-gray-500 backdrop-blur-sm"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Duration (minutes)
            </label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              min="15"
              step="15"
              className="w-full px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                       focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                       text-white placeholder-gray-500 backdrop-blur-sm"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Topic of Discussion
          </label>
          <textarea
            name="topic_of_discussion"
            value={formData.topic_of_discussion}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                     focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                     text-white placeholder-gray-500 backdrop-blur-sm"
            placeholder="Enter topic of discussion"
            required
          />
        </div>

        <div className="flex justify-end">
          <GradientButton disabled={loading}>
            <div className="flex items-center space-x-2">
              {loading ? (
                <Loader className="h-5 w-5 animate-spin" />
              ) : (
                <Users className="h-5 w-5" />
              )}
              <span>{loading ? 'Scheduling...' : 'Schedule Meeting'}</span>
            </div>
          </GradientButton>
        </div>
      </form>
    </div>
  );
};

export default MeetForm;