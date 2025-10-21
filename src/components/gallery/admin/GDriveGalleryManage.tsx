'use client';

import { Link as LinkIcon, Loader, Pencil, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import GradientButton from '@/components/ui/GradientButton';
import Modal from '@/components/ui/Modal';
import StatusModal from '@/components/ui/StatusModal';
import { uploadAdminServerSideFile } from '@/lib/actions/uploadthing';
import { placeholder } from '@/lib/images/placeholder';

interface GDriveGalleryItem {
  id: string;
  title: string;
  coverImage: string | null;
  description: string | null;
  link: string;
  createdAt: Date;
}

const GDriveGalleryManage = () => {
  const [galleries, setGalleries] = useState<GDriveGalleryItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGallery, setSelectedGallery] =
    useState<GDriveGalleryItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const [statusModal, setStatusModal] = useState<{
    type: 'success' | 'error' | 'confirm';
    title: string;
    message: string;
  } | null>(null);

  const [galleryToDelete, setGalleryToDelete] = useState<string | null>(null);
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);

  const [galleryForm, setGalleryForm] = useState({
    title: '',
    description: '',
    link: '',
  });

  const fetchGalleries = async () => {
    try {
      const res = await fetch('/api/gdrivegallery');
      if (!res.ok) throw new Error('Failed to fetch galleries');
      const data = await res.json();
      setGalleries(data.galleries);
    } catch (error) {
      console.error(error);
      setGalleries([]);
    }
  };

  useEffect(() => {
    setIsFetching(true);
    fetchGalleries().finally(() => setIsFetching(false));
  }, []);

  const handleCreateGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let coverImageUrl = null;
      if (coverImageFile) {
        const uploadResult = await uploadAdminServerSideFile(coverImageFile);
        if (!uploadResult) {
          throw new Error('Failed to upload cover image');
        }
        coverImageUrl = uploadResult?.ufsUrl;
      }

      const res = await fetch('/api/gdrivegallery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...galleryForm,
          coverImage: coverImageUrl,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create gallery');

      setIsModalOpen(false);
      setGalleryForm({ title: '', description: '', link: '' });
      setCoverImageFile(null);
      setStatusModal({
        type: 'success',
        title: 'Success',
        message: 'Gallery created successfully',
      });
      await fetchGalleries();
    } catch (error) {
      const err = error as Error;
      setStatusModal({
        type: 'error',
        title: 'Error',
        message: err.message || 'Failed to create gallery',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGallery) return;

    setLoading(true);
    try {
      let coverImageUrl = selectedGallery.coverImage;
      if (coverImageFile) {
        const uploadResult = await uploadAdminServerSideFile(coverImageFile);
        if (!uploadResult) {
          throw new Error('Failed to upload cover image');
        }
        coverImageUrl = uploadResult?.url;
      }

      const res = await fetch(`/api/gdrivegallery/${selectedGallery.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...galleryForm,
          coverImage: coverImageUrl,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update gallery');

      setGalleries(
        galleries.map((gallery) =>
          gallery.id === selectedGallery.id
            ? { ...gallery, ...galleryForm, coverImage: coverImageUrl }
            : gallery
        )
      );

      setIsModalOpen(false);
      setSelectedGallery(null);
      setGalleryForm({ title: '', description: '', link: '' });
      setCoverImageFile(null);
      setStatusModal({
        type: 'success',
        title: 'Success',
        message: 'Gallery updated successfully',
      });
    } catch (error) {
      const err = error as Error;
      setStatusModal({
        type: 'error',
        title: 'Error',
        message: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteGallery = async () => {
    if (!galleryToDelete) return;

    try {
      const res = await fetch(`/api/gdrivegallery/${galleryToDelete}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete gallery');

      setGalleries(
        galleries.filter((gallery) => gallery.id !== galleryToDelete)
      );
      setStatusModal({
        type: 'success',
        title: 'Success',
        message: 'Gallery deleted successfully',
      });
    } catch (error) {
      const err = error as Error;
      setStatusModal({
        type: 'error',
        title: 'Error',
        message: err.message || 'Failed to delete gallery',
      });
    } finally {
      setGalleryToDelete(null);
    }
  };

  if (isFetching) {
    return (
      <div className="w-full flex items-center justify-center">
        <Loader className="h-8 w-8 animate-spin text-primary-cyan" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <LinkIcon className="h-6 w-6 text-primary-cyan" />
          <h2 className="text-xl font-semibold text-white">Drive Gallery</h2>
        </div>
        <GradientButton onClick={() => setIsModalOpen(true)}>
          <div className="flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>Add Gallery</span>
          </div>
        </GradientButton>
      </div>

      {/* Galleries Grid */}
      {galleries && galleries.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleries.map((gallery) => (
            <div
              key={gallery.id}
              className="backdrop-blur-xl bg-black/30 rounded-lg border border-gray-800 overflow-hidden hover:border-primary-blue/50 transition-all duration-200"
            >
              <div className="relative h-48">
                <Image
                  src={gallery.coverImage || placeholder}
                  alt={gallery.title}
                  layout="fill"
                  objectFit="cover"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {gallery.title}
                </h3>
                {gallery.description && (
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                    {gallery.description}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <a
                    href={gallery.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-cyan hover:text-primary-blue transition-colors"
                  >
                    <LinkIcon className="h-5 w-5" />
                  </a>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedGallery(gallery);
                        setGalleryForm({
                          title: gallery.title,
                          description: gallery.description || '',
                          link: gallery.link,
                        });
                        setIsModalOpen(true);
                      }}
                      className="p-2 text-gray-400 hover:text-primary-cyan transition-colors"
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => {
                        setGalleryToDelete(gallery.id);
                        setStatusModal({
                          type: 'confirm',
                          title: 'Delete Gallery',
                          message:
                            'Are you sure you want to delete this gallery? This action cannot be undone.',
                        });
                      }}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="h-5 w-5 text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full flex items-center justify-center">
          <p className="text-gray-400">No galleries found</p>
        </div>
      )}

      {/* Gallery Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedGallery(null);
          setGalleryForm({ title: '', description: '', link: '' });
          setCoverImageFile(null);
        }}
        title={selectedGallery ? 'Edit Gallery' : 'Add Gallery'}
      >
        <form
          onSubmit={selectedGallery ? handleEditGallery : handleCreateGallery}
          className="space-y-6"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Title
              </label>
              <input
                type="text"
                value={galleryForm.title}
                onChange={(e) =>
                  setGalleryForm({ ...galleryForm, title: e.target.value })
                }
                className="w-full px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                         focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                         text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-200"
                placeholder="Enter gallery title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Cover Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setCoverImageFile(e.target.files ? e.target.files[0] : null)
                }
                className="w-full max-w-xs text-sm text-gray-300
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-medium
                file:bg-gray-800 file:text-gray-300
                hover:file:bg-gray-700 transition-colors"
              />
              {selectedGallery?.coverImage && !coverImageFile && (
                <p className="mt-1 text-sm text-gray-400">
                  Current image will be kept if no new image is selected
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Description
              </label>
              <textarea
                value={galleryForm.description}
                onChange={(e) =>
                  setGalleryForm({
                    ...galleryForm,
                    description: e.target.value,
                  })
                }
                className="w-full px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                         focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                         text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-200"
                placeholder="Enter gallery description"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Drive Link
              </label>
              <input
                type="url"
                value={galleryForm.link}
                onChange={(e) =>
                  setGalleryForm({ ...galleryForm, link: e.target.value })
                }
                className="w-full px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                         focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                         text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-200"
                placeholder="Enter Google Drive link"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                setSelectedGallery(null);
                setGalleryForm({ title: '', description: '', link: '' });
                setCoverImageFile(null);
              }}
              className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <GradientButton disabled={loading}>
              <div className="flex items-center space-x-2">
                {loading ? (
                  <Loader className="h-5 w-5 animate-spin" />
                ) : (
                  <Plus className="h-5 w-5" />
                )}
                <span>
                  {loading
                    ? selectedGallery
                      ? 'Updating...'
                      : 'Creating...'
                    : selectedGallery
                      ? 'Update Gallery'
                      : 'Add Gallery'}
                </span>
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
        onConfirm={
          statusModal?.type === 'confirm' && galleryToDelete
            ? handleDeleteGallery
            : undefined
        }
      />
    </div>
  );
};

export default GDriveGalleryManage;
