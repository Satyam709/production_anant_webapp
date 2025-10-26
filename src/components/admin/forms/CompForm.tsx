import type { Prisma } from '@prisma/client';
import axios from 'axios';
import { CalendarClock, Clock, Loader,Trophy } from 'lucide-react';
import React, { type RefObject,useRef, useState } from 'react';

import GradientButton from '@/components/ui/GradientButton';
import { uploadServerSideFile } from '@/lib/actions/uploadthing';

// type for formData, omitting 'createdBy'
type CompetitionFormInput = Omit<Prisma.CompetitionsCreateInput, 'createdBy'>;

const CompForm = () => {
  const [formData, setFormData] = useState<CompetitionFormInput>({
    competitionName: '',
    conductedBy: '',
    conductedOn: new Date(),
    registration_deadline: new Date(),
    venue: '',
    prize: '',
    description: '',
    imageURL: '',
    min_team_size: 1,
    max_team_size: 4,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const conductedOnRef = useRef<HTMLInputElement | null>(null);
  const deadlineRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);

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
    if (!file) {
      setError('Please upload an image');
      return;
    }
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await uploadServerSideFile(file);
      if (!res) {
        setError('Failed to upload image');
        return;
      }
      console.log('Image uploaded:', res);

      const response = await axios.post('/api/competitions/create', {
        ...formData,
        imageURL: res.ufsUrl,
        conductedOn: new Date(formData.conductedOn).toISOString(),
        registration_deadline: new Date(
          formData.registration_deadline
        ).toISOString(),
        min_team_size: parseInt(String(formData.min_team_size)),
        max_team_size: parseInt(String(formData.max_team_size)),
        // creator_id will be handled by the backend from the session
      });

      console.log('Competition created:', response.data);
      setSuccess('Competition created successfully!');

      setFormData({
        competitionName: '',
        conductedBy: '',
        conductedOn: new Date(),
        registration_deadline: new Date(),
        venue: '',
        prize: '',
        description: '',
        imageURL: '',
        min_team_size: 1,
        max_team_size: 4,
      });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create competition');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'min_team_size' || name === 'max_team_size') {
      setFormData((prev) => ({ ...prev, [name]: parseInt(value) })); // Parse number directly
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="backdrop-blur-xl bg-black/30 p-8 rounded-2xl border border-gray-800 shadow-xl">
      <div className="flex items-center space-x-3 mb-6">
        <Trophy className="h-6 w-6 text-primary-cyan" />
        <h2 className="text-xl font-semibold text-white">Create Competition</h2>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Competition Name
            </label>
            <input
              type="text"
              name="competitionName"
              value={formData.competitionName}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                       focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                       text-white placeholder-gray-500 backdrop-blur-sm"
              placeholder="Enter competition name"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Conducted By
            </label>
            <input
              type="text"
              name="conductedBy"
              value={formData.conductedBy}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                       focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                       text-white placeholder-gray-500 backdrop-blur-sm"
              placeholder="Enter conducting organization"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Competition Date
            </label>
            <div
              className="relative cursor-pointer"
              onClick={() => handleDateClick(conductedOnRef)}
            >
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CalendarClock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="datetime-local"
                ref={conductedOnRef}
                name="conductedOn"
                value={
                  formData.conductedOn instanceof Date
                    ? formData.conductedOn.toISOString().slice(0, 16)
                    : ''
                }
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    conductedOn: new Date(e.target.value),
                  }))
                }
                className="w-full pl-10 px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                         appearance-none focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                         text-white placeholder-gray-500 backdrop-blur-sm"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Registration Deadline
            </label>
            <div
              className="relative cursor-pointer"
              onClick={() => handleDateClick(deadlineRef)}
            >
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Clock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="datetime-local"
                ref={deadlineRef}
                name="registration_deadline"
                value={
                  formData.registration_deadline instanceof Date
                    ? formData.registration_deadline.toISOString().slice(0, 16)
                    : ''
                }
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    registration_deadline: new Date(e.target.value),
                  }))
                }
                className="w-full pl-10 px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                         appearance-none focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                         text-white placeholder-gray-500 backdrop-blur-sm"
                required
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              placeholder="Enter venue"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Prize Details
            </label>
            <input
              type="text"
              name="prize"
              value={formData.prize ?? ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                       focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                       text-white placeholder-gray-500 backdrop-blur-sm"
              placeholder="Enter prize details"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Min Team Size
            </label>
            <input
              type="number"
              name="min_team_size"
              value={formData.min_team_size}
              onChange={handleInputChange}
              min="1"
              className="w-full px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                       focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                       text-white placeholder-gray-500 backdrop-blur-sm"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Max Team Size
            </label>
            <input
              type="number"
              name="max_team_size"
              value={formData.max_team_size}
              onChange={handleInputChange}
              min={1}
              className="w-full px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                       focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                       text-white placeholder-gray-500 backdrop-blur-sm"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                     focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                     text-white placeholder-gray-500 backdrop-blur-sm"
            placeholder="Enter competition description"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Competition Image
          </label>
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setFile(e.target.files[0]);
              }
            }}
            className="w-full text-white file:bg-primary-blue file:border-none file:rounded-md file:p-2 file:text-sm file:font-bold cursor-pointer"
          />
        </div>

        <div className="flex justify-end">
          <GradientButton disabled={loading}>
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
