import React, { useState } from 'react';
import { Bell, Loader, Upload, Pencil, Trash2, Plus } from 'lucide-react';
import GradientButton from '../ui/GradientButton';
import Modal from '../ui/Modal';

type Notice = {
  id: string;
  headline: string;
  body: string;
  category: 'General' | 'Technical' | 'Sponsorship';
  image: string;
  postedOn: Date;
};

// Mock data
const mockNotices: Notice[] = [
  {
    id: '1',
    headline: 'Important: New Project Guidelines',
    body: 'Please review the updated project guidelines for all ongoing and future projects.',
    category: 'Technical',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=1000',
    postedOn: new Date('2025-03-10'),
  },
  {
    id: '2',
    headline: 'Upcoming Sponsorship Opportunities',
    body: 'New sponsorship opportunities available for the upcoming tech conference.',
    category: 'Sponsorship',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1000',
    postedOn: new Date('2025-03-12'),
  },
];

const NoticeForm = () => {
  const [notices, setNotices] = useState<Notice[]>(mockNotices);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const [formData, setFormData] = useState<Omit<Notice, 'id' | 'postedOn'>>({
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
      
      if (editingNotice) {
        setNotices(notices.map(notice => 
          notice.id === editingNotice.id 
            ? { ...formData, id: notice.id, postedOn: notice.postedOn } 
            : notice
        ));
        setSuccess('Notice updated successfully!');
      } else {
        const newNotice = {
          ...formData,
          id: Date.now().toString(),
          postedOn: new Date(),
        };
        setNotices([...notices, newNotice]);
        setSuccess('Notice created successfully!');
      }

      setFormData({
        headline: '',
        body: '',
        category: 'General',
        image: '',
      });
      setIsModalOpen(false);
      setEditingNotice(null);
    } catch (err: any) {
      setError(editingNotice ? 'Failed to update notice' : 'Failed to create notice');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (notice: Notice) => {
    setEditingNotice(notice);
    setFormData({
      headline: notice.headline,
      body: notice.body,
      category: notice.category,
      image: notice.image,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setNotices(notices.filter(notice => notice.id !== id));
      setSuccess('Notice deleted successfully!');
    } catch (err) {
      setError('Failed to delete notice');
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const openCreateModal = () => {
    setEditingNotice(null);
    setFormData({
      headline: '',
      body: '',
      category: 'General',
      image: '',
    });
    setIsModalOpen(true);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Technical':
        return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'Sponsorship':
        return 'text-green-400 bg-green-400/10 border-green-400/20';
      default:
        return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Create Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <Bell className="h-6 w-6 text-primary-cyan" />
          <h2 className="text-xl font-semibold text-white">Notices</h2>
        </div>
        <GradientButton onClick={openCreateModal} type="button">
          <div className="flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>Create Notice</span>
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

      {/* Notices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notices.map(notice => (
          <div
            key={notice.id}
            className="backdrop-blur-xl bg-black/30 rounded-lg border border-gray-800 overflow-hidden hover:border-primary-blue/50 transition-all duration-200"
          >
            {notice.image && (
              <div className="relative h-48">
                <img
                  src={notice.image}
                  alt={notice.headline}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            )}
            <div className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-2 py-1 text-xs rounded-full border ${getCategoryColor(notice.category)}`}>
                  {notice.category}
                </span>
                <span className="text-sm text-gray-400">
                  {notice.postedOn.toLocaleDateString()}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{notice.headline}</h3>
              <p className="text-gray-300 text-sm line-clamp-3">{notice.body}</p>
              <div className="mt-4 flex justify-end space-x-2 border-t border-gray-800 pt-4">
                <button
                  onClick={() => handleEdit(notice)}
                  className="p-2 text-gray-400 hover:text-primary-cyan transition-colors"
                >
                  <Pencil className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(notice.id)}
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
        title={editingNotice ? 'Edit Notice' : 'Create Notice'}
      >
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
                  <Bell className="h-5 w-5" />
                )}
                <span>
                  {loading
                    ? editingNotice
                      ? 'Updating...'
                      : 'Creating...'
                    : editingNotice
                    ? 'Update Notice'
                    : 'Create Notice'}
                </span>
              </div>
            </GradientButton>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default NoticeForm;