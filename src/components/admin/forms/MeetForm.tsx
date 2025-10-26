import type { Prisma } from '@prisma/client';
import axios from 'axios';
import { CalendarClock, Loader,Users } from 'lucide-react';
import React, { type RefObject,useRef, useState } from 'react';

import GradientButton from '@/components/ui/GradientButton';

type MeetFormInput = Omit<
  Prisma.MeetingCreateInput,
  'hostID' | 'conductor' | 'attendees'
>;

const MeetForm = () => {
  const [formData, setFormData] = useState<MeetFormInput>({
    venue: '',
    starts: new Date(),
    duration: 60,
    topic_of_discussion: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const startsDateRef = useRef<HTMLInputElement | null>(null);

  const handleDateClick = (ref: RefObject<HTMLInputElement | null>) => {
    if (ref.current) {
      if (typeof ref.current.showPicker === 'function') {
        ref.current.showPicker();
      } else {
        ref.current.focus();
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const payload = {
        ...formData,
        starts: new Date(formData.starts).toISOString(),
        duration: parseInt(String(formData.duration)),
      };

      const response = await axios.post('/api/meetings/create', payload);

      if (response.data.error) {
        setError(response.data.error);
      } else {
        setSuccess(response.data.response || 'Meeting scheduled successfully!');
        // Reset form
        setFormData({
          venue: '',
          starts: new Date(),
          duration: 60,
          topic_of_discussion: '',
        });
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to schedule meeting');
      console.error('Error scheduling meeting:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'duration') {
      setFormData((prev) => ({ ...prev, [name]: parseInt(value) }));
    } else if (name === 'starts') {
      setFormData((prev) => ({ ...prev, starts: new Date(e.target.value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
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
            <div
              className="relative cursor-pointer"
              onClick={() => handleDateClick(startsDateRef)}
            >
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CalendarClock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="datetime-local"
                ref={startsDateRef}
                name="starts"
                value={
                  formData.starts instanceof Date
                    ? formData.starts.toISOString().slice(0, 16)
                    : ''
                }
                onChange={handleInputChange}
                className="w-full pl-10 px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                  appearance-none focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                  text-white placeholder-gray-500 backdrop-blur-sm"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Duration (minutes)
            </label>
            <input
              type="number"
              name="duration"
              value={String(formData.duration)}
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
            value={formData.topic_of_discussion || ''}
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
