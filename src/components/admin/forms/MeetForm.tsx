import React, { useState, useRef } from 'react';
import { CalendarClock, Users, Link as LinkIcon, Loader } from 'lucide-react';
import axios from 'axios';
import GradientButton from '@/components/ui/GradientButton';

const MeetForm = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [meetLink, setMeetLink] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const dateRef = useRef<HTMLInputElement>(null);
  const timeRef = useRef<HTMLInputElement>(null);

  const handlePickerClick = (ref: React.RefObject<HTMLInputElement>) => {
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
    try {
      const response = await axios.post('/api/meetings', {
        title,
        date,
        time,
        meetLink,
        description
      });
      console.log('Meeting created:', response.data);
      setTitle('');
      setDate('');
      setTime('');
      setMeetLink('');
      setDescription('');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="backdrop-blur-xl bg-black/30 p-8 rounded-2xl border border-gray-800 shadow-xl">
      <div className="flex items-center space-x-3 mb-6">
        <Users className="h-6 w-6 text-primary-cyan" />
        <h2 className="text-xl font-semibold text-white">Schedule Meeting</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Meeting Title */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Meeting Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                       focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                       text-white placeholder-gray-500 backdrop-blur-sm"
            placeholder="Enter meeting title"
            required
          />
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date Selector */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Date
            </label>
            <div
              className="relative cursor-pointer"
              onClick={() => handlePickerClick(dateRef)}
            >
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CalendarClock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                ref={dateRef}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full pl-10 px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                           focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                           text-white placeholder-gray-500 backdrop-blur-sm"
                required
              />
            </div>
          </div>

          {/* Time Selector */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Time
            </label>
            <div
              className="relative cursor-pointer"
              onClick={() => handlePickerClick(timeRef)}
            >
              <input
                type="time"
                ref={timeRef}
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                           focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                           text-white placeholder-gray-500 backdrop-blur-sm"
                required
              />
            </div>
          </div>
        </div>

        {/* Meeting Link */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Meeting Link
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <LinkIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="url"
              value={meetLink}
              onChange={(e) => setMeetLink(e.target.value)}
              className="w-full pl-10 px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                         focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                         text-white placeholder-gray-500 backdrop-blur-sm"
              placeholder="Enter meeting link (Google Meet, Zoom, etc.)"
              required
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                       focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                       text-white placeholder-gray-500 backdrop-blur-sm"
            placeholder="Enter meeting description"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <GradientButton type="submit" disabled={loading}>
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
