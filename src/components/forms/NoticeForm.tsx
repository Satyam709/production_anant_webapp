import { category } from '@prisma/client';
import { Bell, Loader, Plus,Trash2 } from 'lucide-react';
import React, { useEffect,useState } from 'react';

import { DeleteNotice } from '@/lib/actions/DeleteNotice';

import GradientButton from '../ui/GradientButton';
import Modal from '../ui/Modal';
import StatusModal from '../ui/StatusModal';

type Notice = {
  id: string;
  headline: string;
  body: string;
  category: category;
  postedOn: Date;
  link: string;
};

interface StatusMessage {
  type: 'success' | 'error' | 'confirm';
  title: string;
  message: string;
}

// Mock data
const imageLinks = {
  Technical:
    'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=1000',
  General:
    'https://tls.or.tz/wp-content/uploads/2023/02/imprtant-notice-icon.png',
  Sponsorship:
    'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1000',
};

const NoticeForm = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [formData, setFormData] = useState<Omit<Notice, 'id' | 'postedOn'>>({
    headline: '',
    body: '',
    category: 'General',
    link: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [statusModal, setStatusModal] = useState<StatusMessage | null>(null);
  const [deleteNoticeId, setDeleteNoticeId] = useState('');

  useEffect(() => {
    async function load_data() {
      const res = await fetch('/api/notices/');
      const parsed_response = await res.json();
      const notices = parsed_response.notices;

      const modified_notices = notices.map((notice: any) => {
        return {
          id: notice.notice_id,
          headline: notice.headline,
          body: notice.body,
          category: notice.category,
          postedOn: new Date(notice.postedOn),
          link: notice.link,
        };
      });

      setNotices(modified_notices);
    }
    load_data();
  }, [refresh]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const createNotice = await fetch('/api/notices/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!createNotice.ok) {
        const ErrorMsg = await createNotice.json();
        throw new Error(ErrorMsg);
      }

      setSuccess('Notice created successfully!');
      setRefresh(!refresh);

      setFormData({
        headline: '',
        body: '',
        category: 'General',
        link: '',
      });
      setIsModalOpen(false);
    } catch (err: any) {
      setError(err || 'Failed to create notice');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const del_notice = await DeleteNotice(deleteNoticeId);
      if (!del_notice.success) {
        throw new Error('Failed to delete notice');
      }
      setNotices(notices.filter((notice) => notice.id !== deleteNoticeId));
      setStatusModal({
        type: 'success',
        title: 'Notice Deleted',
        message: 'The notice has been deleted successfully.',
      });
      setSuccess('Deleted Notice Successfully');
    } catch (err) {
      setError('Failed to delete notice');
    }
  };

  const confirmDelete = (notice_id: string) => {
    setDeleteNoticeId(notice_id);
    setStatusModal({
      type: 'confirm',
      title: 'Delete Notice',
      message:
        'Are you sure you want to delete this notice? This action cannot be undone.',
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openCreateModal = () => {
    setFormData({
      headline: '',
      body: '',
      category: 'General',
      link: '',
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
        <GradientButton onClick={openCreateModal}>
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
        {notices &&
          notices.map((notice) => (
            <div
              key={notice.id}
              className="backdrop-blur-xl bg-black/30 rounded-lg border border-gray-800 overflow-hidden hover:border-primary-blue/50 transition-all duration-200"
            >
              {imageLinks[notice.category] && (
                <div className="relative h-48">
                  <img
                    src={imageLinks[notice.category]}
                    alt={notice.headline}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              )}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`px-2 py-1 text-xs rounded-full border ${getCategoryColor(notice.category)}`}
                  >
                    {notice.category}
                  </span>
                  <span className="text-sm text-gray-400">
                    {notice.postedOn.toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {notice.headline}
                </h3>
                {notice.link && (
                  <p className="text-blue-500 text-md my-1">
                    <a href={notice.link}>View Attached File</a>
                  </p>
                )}
                <p className="text-gray-300 text-sm line-clamp-3">
                  {notice.body}
                </p>
                <div className="mt-4 flex justify-end space-x-2 border-t border-gray-800 pt-4">
                  <button
                    onClick={() => confirmDelete(notice.id)}
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
        title={'Create Notice'}
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

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Link
            </label>
            <input
              type="text"
              name="link"
              value={formData.link}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                       focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                       text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-200"
              placeholder="Enter notice link (optional)"
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

export default NoticeForm;
