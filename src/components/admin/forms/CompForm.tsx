import React, { useState, useRef } from 'react';
import { Trophy, CalendarClock, Clock, Loader } from 'lucide-react';
import axios from 'axios';
import GradientButton from '@/components/ui/GradientButton';

const CompForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [registrationDeadline, setRegistrationDeadline] = useState('');
  const [loading, setLoading] = useState(false);

  const startDateRef = useRef<HTMLInputElement>(null);
  const registrationDeadlineRef = useRef<HTMLInputElement>(null);

  const handleDateClick = (ref: React.RefObject<HTMLInputElement>) => {
    if (ref.current) {
      // If avl, use showPicker() for a better UX 
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
      const response = await axios.post('/api/competitions', {
        competitionName: title,
        description,
        conductedOn: startDate,
        registration_deadline: registrationDeadline,
      });
      console.log('Competition created:', response.data);
      // Reset the form
      setTitle('');
      setDescription('');
      setStartDate('');
      setRegistrationDeadline('');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="backdrop-blur-xl bg-black/30 p-8 rounded-2xl border border-gray-800 shadow-xl">
      <div className="flex items-center space-x-3 mb-6">
        <Trophy className="h-6 w-6 text-primary-cyan" />
        <h2 className="text-xl font-semibold text-white">Create Competition</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Competition Title */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Competition Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                       focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                       text-white placeholder-gray-500 backdrop-blur-sm"
            placeholder="Enter competition title"
            required
          />
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
            placeholder="Enter competition description"
            required
          />
        </div>

        {/* Date Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Start Date */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Start Date
            </label>
            <div
              className="relative cursor-pointer"
              onClick={() => handleDateClick(startDateRef)}
            >
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CalendarClock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                ref={startDateRef}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full pl-10 px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg 
                           appearance-none focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                           text-white placeholder-gray-500 backdrop-blur-sm
                           [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert(1)"
                required
              />
            </div>
          </div>

          {/* Registration Deadline */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Registration Deadline
            </label>
            <div
              className="relative cursor-pointer"
              onClick={() => handleDateClick(registrationDeadlineRef)}
            >
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Clock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                ref={registrationDeadlineRef}
                value={registrationDeadline}
                onChange={(e) => setRegistrationDeadline(e.target.value)}
                className="w-full pl-10 px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg 
                           appearance-none focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                           text-white placeholder-gray-500 backdrop-blur-sm
                           [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert(1)"
                required
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <GradientButton type="submit" disabled={loading}>
            <div className="flex items-center space-x-2">
              {loading ? (
                <Loader className="h-5 w-5 animate-spin" />
              ) : (
                <Trophy className="h-5 w-5" />
              )}
              <span>{loading ? 'Creating...' : 'Create Competition'}</span>
            </div>
          </GradientButton>
        </div>
      </form>
    </div>
  );
};

export default CompForm;
