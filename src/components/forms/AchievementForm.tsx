import { Loader, Plus, Trash2, Trophy } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import { uploadServerSideFile } from '@/lib/actions/uploadthing';

import GradientButton from '../ui/GradientButton';
import Modal from '../ui/Modal';
import StatusModal from '../ui/StatusModal';

type Achievement = {
  id: number;
  department: string;
  achievement: string;
  description?: string;
  imageURL?: string;
  created_at: Date;
};

interface StatusMessage {
  type: 'success' | 'error' | 'confirm';
  title: string;
  message: string;
}

const AchievementForm = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Achievement | null>(null);
  const [formData, setFormData] = useState<
    Omit<Achievement, 'id' | 'created_at'>
  >({
    department: 'Mathematics',
    achievement: '',
    description: '',
    imageURL: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [statusModal, setStatusModal] = useState<StatusMessage | null>(null);
  const [deleteAchievementId, setDeleteAchievementId] = useState<number | null>(
    null
  );

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/departments/achievements');
        if (!res.ok) throw new Error('Failed to fetch achievements');
        const resData = await res.json();
        const data = resData.achievements;
        setAchievements(
          data.map((achievement: Achievement) => ({
            ...achievement,
            created_at: new Date(achievement.created_at),
          }))
        );
      } catch (error) {
        console.error('Error loading achievements:', error);
        setError('Failed to load achievements');
      }
    }
    loadData();
  }, [refresh]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (!file && !editingEvent?.imageURL) {
        setError('Please upload an image');
        return;
      }

      let imageURL: string | undefined;

      if (file) {
        const res = await uploadServerSideFile(file);
        if (!res) {
          setError('Failed to upload image');
          return;
        }
        imageURL = res.ufsUrl;
      } else if (editingEvent?.imageURL) {
        imageURL = editingEvent.imageURL;
      }

      const res = await fetch('/api/departments/achievements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          imageURL,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to create achievement');
      }

      setSuccess('Achievement created successfully!');
      setRefresh(!refresh);
      setFile(null);
      setFormData({
        department: 'Mathematics',
        achievement: '',
        description: '',
        imageURL: '',
      });
      setIsModalOpen(false);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to create achievement';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteAchievementId) return;

    try {
      const res = await fetch(
        `/api/departments/achievements?id=${deleteAchievementId}`,
        {
          method: 'DELETE',
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to delete achievement');
      }

      setAchievements(
        achievements.filter((ach) => ach.id !== deleteAchievementId)
      );
      setStatusModal({
        type: 'success',
        title: 'Achievement Deleted',
        message: 'The achievement has been deleted successfully.',
      });
      setSuccess('Deleted Achievement Successfully');
    } catch (error) {
      console.error('Error deleting achievement:', error);
      setError('Failed to delete achievement');
    }
  };

  const confirmDelete = (id: number) => {
    setDeleteAchievementId(id);
    setStatusModal({
      type: 'confirm',
      title: 'Delete Achievement',
      message:
        'Are you sure you want to delete this achievement? This action cannot be undone.',
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openCreateModal = () => {
    setFile(null);
    setEditingEvent(null);
    setFormData({
      department: 'Mathematics',
      achievement: '',
      description: '',
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
          <h2 className="text-xl font-semibold text-white">
            Mathematics Department Achievements
          </h2>
        </div>
        <GradientButton onClick={openCreateModal}>
          <div className="flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>Add Achievement</span>
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

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className="backdrop-blur-xl bg-black/30 rounded-lg border border-gray-800 overflow-hidden hover:border-primary-blue/50 transition-all duration-200"
          >
            {achievement.imageURL && (
              <div className="relative h-48">
                <Image
                  src={achievement.imageURL}
                  alt={achievement.achievement}
                  className="object-cover"
                  fill
                  sizes="100%"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            )}
            <div className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm text-gray-400">
                  {achievement.created_at.toLocaleDateString()}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {achievement.achievement}
              </h3>
              {achievement.description && (
                <p className="text-gray-300 text-sm line-clamp-3">
                  {achievement.description}
                </p>
              )}
              <div className="mt-4 flex justify-end space-x-2 border-t border-gray-800 pt-4">
                <button
                  onClick={() => confirmDelete(achievement.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Department Achievement"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Achievement
            </label>
            <input
              type="text"
              name="achievement"
              value={formData.achievement}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                       focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                       text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-200"
              placeholder="Enter achievement title"
              required
            />
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
              placeholder="Enter achievement description (optional)"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Achievement Image
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
              required={!editingEvent?.imageURL}
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
                <span>Save Achievement</span>
              </div>
            </GradientButton>
          </div>
        </form>
      </Modal>

      {/* Status Modal */}
      <StatusModal
        isOpen={statusModal !== null}
        onClose={() => setStatusModal(null)}
        title={statusModal?.title || ''}
        message={statusModal?.message || ''}
        type={statusModal?.type || 'success'}
        onConfirm={statusModal?.type === 'confirm' ? handleDelete : undefined}
      />
    </div>
  );
};

export default AchievementForm;
