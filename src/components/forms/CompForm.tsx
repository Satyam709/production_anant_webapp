import React, { useState } from 'react';
import { Trophy, Loader, Upload } from 'lucide-react';
import GradientButton from '../ui/GradientButton';

type Competition = {
  competitionName: string;
  conductedBy: string;
  conductedOn: Date;
  registration_deadline: Date;
  venue: string;
  prize: string;
  description: string;
  min_team_size: number;
  max_team_size: number;
  banner_image: string;
};

const CompForm = () => {
  const [formData, setFormData] = useState<Competition>({
    competitionName: '',
    conductedBy: '',
    conductedOn: new Date(),
    registration_deadline: new Date(),
    venue: '',
    prize: '',
    description: '',
    min_team_size: 1,
    max_team_size: 4,
    banner_image: '',
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
      setSuccess('Competition created successfully!');
      setFormData({
        competitionName: '',
        conductedBy: '',
        conductedOn: new Date(),
        registration_deadline: new Date(),
        venue: '',
        prize: '',
        description: '',
        min_team_size: 1,
        max_team_size: 4,
        banner_image: '',
      });
    } catch (err: any) {
      setError('Failed to create competition');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="backdrop-blur-xl bg-black/30 p-8 rounded-2xl border border-gray-800 shadow-xl">
      <div className="flex items-center space-x-3 mb-6">
        <Trophy className="h-6 w-6 text-primary-cyan" />
        <h2 className="text-xl font-semibold text-white">Create Competition</h2>
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
                       text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-200"
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
                       text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-200"
              placeholder="Enter conducting organization"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Banner Image URL
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="url"
              name="banner_image"
              value={formData.banner_image}
              onChange={handleInputChange}
              className="flex-1 px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                       focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                       text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-200"
              placeholder="Enter banner image URL"
            />
            <button
              type="button"
              className="px-4 py-2.5 bg-gray-800 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors duration-200"
            >
              <Upload className="h-5 w-5" />
            </button>
          </div>
          {formData.banner_image && (
            <div className="mt-2 relative rounded-lg overflow-hidden h-40">
              <img
                src={formData.banner_image}
                alt="Competition banner preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Competition Date
            </label>
            <input
              type="datetime-local"
              name="conductedOn"
              value={formData.conductedOn instanceof Date ? formData.conductedOn.toISOString().slice(0, 16) : ''}
              onChange={(e) => setFormData(prev => ({ ...prev, conductedOn: new Date(e.target.value) }))}
              className="w-full px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                       focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                       text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-200"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Registration Deadline
            </label>
            <input
              type="datetime-local"
              name="registration_deadline"
              value={formData.registration_deadline instanceof Date ? formData.registration_deadline.toISOString().slice(0, 16) : ''}
              onChange={(e) => setFormData(prev => ({ ...prev, registration_deadline: new Date(e.target.value) }))}
              className="w-full px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                       focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                       text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-200"
              required
            />
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
                       text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-200"
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
              value={formData.prize}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                       focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                       text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-200"
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
                       text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-200"
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
              min={formData.min_team_size}
              className="w-full px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                       focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                       text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-200"
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
                     text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-200"
            placeholder="Enter competition description"
            required
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