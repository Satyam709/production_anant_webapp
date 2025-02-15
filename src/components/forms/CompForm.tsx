import React, { useState } from 'react';
import { Trophy, Loader, Upload, Pencil, Trash2, Plus } from 'lucide-react';
import GradientButton from '../ui/GradientButton';
import Modal from '../ui/Modal';

type Competition = {
  id: string;
  competitionName: string;
  conductedBy: string;
  conductedOn: Date;
  registration_deadline: Date;
  venue: string;
  prize: string;
  description: string;
  min_team_size: number;
  max_team_size: number;
  imageURL: string;
};

// Mock data
const mockCompetitions: Competition[] = [
  {
    id: '1',
    competitionName: 'Code Wars 2025',
    conductedBy: 'Programming Club',
    conductedOn: new Date('2025-04-15'),
    registration_deadline: new Date('2025-04-01'),
    venue: 'Computer Lab',
    prize: '$2000 in prizes',
    description: 'Annual competitive programming contest',
    min_team_size: 1,
    max_team_size: 3,
    imageURL: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '2',
    competitionName: 'AI Challenge',
    conductedBy: 'AI/ML Club',
    conductedOn: new Date('2025-05-20'),
    registration_deadline: new Date('2025-05-10'),
    venue: 'Innovation Hub',
    prize: '$1500 for winners',
    description: 'Build innovative AI solutions',
    min_team_size: 2,
    max_team_size: 4,
    imageURL: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&q=80&w=1000',
  },
];

const CompForm = () => {
  const [competitions, setCompetitions] = useState<Competition[]>(mockCompetitions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCompetition, setEditingCompetition] = useState<Competition | null>(null);
  const [formData, setFormData] = useState<Omit<Competition, 'id'>>({
    competitionName: '',
    conductedBy: '',
    conductedOn: new Date(),
    registration_deadline: new Date(),
    venue: '',
    prize: '',
    description: '',
    min_team_size: 1,
    max_team_size: 4,
    imageURL: '',
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
      
      if (editingCompetition) {
        setCompetitions(competitions.map(comp => 
          comp.id === editingCompetition.id 
            ? { ...formData, id: comp.id } 
            : comp
        ));
        setSuccess('Competition updated successfully!');
      } else {
        const newCompetition = {
          ...formData,
          id: Date.now().toString(),
        };
        setCompetitions([...competitions, newCompetition]);
        setSuccess('Competition created successfully!');
      }

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
        imageURL: '',
      });
      setIsModalOpen(false);
      setEditingCompetition(null);
    } catch (err: any) {
      setError(editingCompetition ? 'Failed to update competition' : 'Failed to create competition');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (competition: Competition) => {
    setEditingCompetition(competition);
    setFormData(competition);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setCompetitions(competitions.filter(comp => comp.id !== id));
      setSuccess('Competition deleted successfully!');
    } catch (err) {
      setError('Failed to delete competition');
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'conductedOn' || name === 'registration_deadline') {
      setFormData(prev => ({ ...prev, [name]: new Date(value) }));
    } else if (name === 'min_team_size' || name === 'max_team_size') {
      setFormData(prev => ({ ...prev, [name]: parseInt(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const openCreateModal = () => {
    setEditingCompetition(null);
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
      imageURL: '',
    });
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header with Create Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <Trophy className="h-6 w-6 text-primary-cyan" />
          <h2 className="text-xl font-semibold text-white">Competitions</h2>
        </div>
        <GradientButton onClick={openCreateModal} type="button">
          <div className="flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>Create Competition</span>
          </div>
        </GradientButton>
      </div>

      {/* Status Messages */}
      {error && (
        <div className="mb-4 p-4 rounded-lg bg-red-500/10 border border-red-500/50 text-red-500">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 p-4 rounded-lg bg-green-500/10 border border-green-500/50 text-green-500">
          {success}
        </div>
      )}

      {/* Competitions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {competitions.map(competition => (
          <div
            key={competition.id}
            className="backdrop-blur-xl bg-black/30 rounded-lg border border-gray-800 overflow-hidden hover:border-primary-blue/50 transition-all duration-200"
          >
            <div className="relative h-48">
              <img
                src={competition.imageURL}
                alt={competition.competitionName}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white mb-2">{competition.competitionName}</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p><span className="text-gray-400">By:</span> {competition.conductedBy}</p>
                <p><span className="text-gray-400">Date:</span> {competition.conductedOn.toLocaleDateString()}</p>
                <p><span className="text-gray-400">Venue:</span> {competition.venue}</p>
                <p><span className="text-gray-400">Team Size:</span> {competition.min_team_size} - {competition.max_team_size} members</p>
                {competition.prize && (
                  <p><span className="text-gray-400">Prize:</span> {competition.prize}</p>
                )}
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => handleEdit(competition)}
                  className="p-2 text-gray-400 hover:text-primary-cyan transition-colors"
                >
                  <Pencil className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(competition.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCompetition ? 'Edit Competition' : 'Create Competition'}
      >
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
              Competition Banner Image
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="url"
                name="imageURL"
                value={formData.imageURL}
                onChange={handleInputChange}
                className="flex-1 px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                         focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                         text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-200"
                placeholder="Enter banner image URL"
              />
              <button
                type="button"
                className="px-4 py-2.5 bg-gray-800 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
              >
                <Upload className="h-5 w-5" />
              </button>
            </div>
            {formData.imageURL && (
              <div className="mt-2 relative rounded-lg overflow-hidden h-40">
                <img
                  src={formData.imageURL}
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
                Minimum Team Size
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
                Maximum Team Size
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

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <GradientButton disabled={loading}>
              <div className="flex items-center space-x-2">
                {loading ? (
                  <Loader className="h-5 w-5 animate-spin" />
                ) : (
                  <Trophy className="h-5 w-5" />
                )}
                <span>
                  {loading
                    ? editingCompetition
                      ? 'Updating...'
                      : 'Creating...'
                    : editingCompetition
                    ? 'Update Competition'
                    : 'Create Competition'}
                </span>
              </div>
            </GradientButton>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CompForm;