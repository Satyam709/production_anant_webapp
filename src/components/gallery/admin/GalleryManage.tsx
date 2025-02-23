import React, { useState } from "react";
import {
  Image as ImageIcon,
  Plus,
  Pencil,
  Trash2,
  Upload,
  Loader,
  X,
} from "lucide-react";
import GradientButton from "@/components/ui/GradientButton";
import Modal from "@/components/ui/Modal";
import StatusModal from "@/components/ui/StatusModal";

interface Album {
  id: string;
  name: string;
  createdAt: Date;
  images: AlbumImage[];
}

interface AlbumImage {
  id: string;
  url: string;
  albumId: string;
}

// Mock data - replace with actual API calls later
const mockAlbums: Album[] = [
  {
    id: "1",
    name: "Tech Events 2024",
    createdAt: new Date("2024-01-15"),
    images: [
      {
        id: "1",
        url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2000",
        albumId: "1",
      },
      {
        id: "2",
        url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=2000",
        albumId: "1",
      },
    ],
  },
  {
    id: "2",
    name: "Hackathon Moments",
    createdAt: new Date("2024-02-20"),
    images: [
      {
        id: "3",
        url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=2000",
        albumId: "2",
      },
    ],
  },
];

const PhotoGallery = () => {
  const [albums, setAlbums] = useState<Album[]>(mockAlbums);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [isAlbumModalOpen, setIsAlbumModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusModal, setStatusModal] = useState<{
    type: "success" | "error" | "confirm";
    title: string;
    message: string;
  } | null>(null);
  const [albumToDelete, setAlbumToDelete] = useState<string | null>(null);
  const [imageToDelete, setImageToDelete] = useState<string | null>(null);

  const [albumForm, setAlbumForm] = useState({
    name: "",
  });

  const [imageForm, setImageForm] = useState({
    url: "",
  });

  const handleCreateAlbum = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newAlbum: Album = {
        id: Date.now().toString(),
        name: albumForm.name,
        createdAt: new Date(),
        images: [],
      };

      setAlbums([...albums, newAlbum]);
      setIsAlbumModalOpen(false);
      setAlbumForm({ name: "" });
      setStatusModal({
        type: "success",
        title: "Success",
        message: "Album created successfully",
      });
    } catch (error) {
      setStatusModal({
        type: "error",
        title: "Error",
        message: "Failed to create album",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditAlbum = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAlbum) return;

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setAlbums(
        albums.map((album) =>
          album.id === selectedAlbum.id
            ? { ...album, name: albumForm.name }
            : album
        )
      );

      setIsAlbumModalOpen(false);
      setSelectedAlbum(null);
      setAlbumForm({ name: "" });
      setStatusModal({
        type: "success",
        title: "Success",
        message: "Album updated successfully",
      });
    } catch (error) {
      setStatusModal({
        type: "error",
        title: "Error",
        message: "Failed to update album",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAlbum = async () => {
    if (!albumToDelete) return;

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setAlbums(albums.filter((album) => album.id !== albumToDelete));
      setStatusModal({
        type: "success",
        title: "Success",
        message: "Album deleted successfully",
      });
    } catch (error) {
      setStatusModal({
        type: "error",
        title: "Error",
        message: "Failed to delete album",
      });
    } finally {
      setAlbumToDelete(null);
    }
  };

  const handleAddImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAlbum) return;

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newImage: AlbumImage = {
        id: Date.now().toString(),
        url: imageForm.url,
        albumId: selectedAlbum.id,
      };

      setAlbums(
        albums.map((album) =>
          album.id === selectedAlbum.id
            ? { ...album, images: [...album.images, newImage] }
            : album
        )
      );

      setIsImageModalOpen(false);
      setImageForm({ url: "" });
      setStatusModal({
        type: "success",
        title: "Success",
        message: "Image added successfully",
      });
    } catch (error) {
      setStatusModal({
        type: "error",
        title: "Error",
        message: "Failed to add image",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = async () => {
    if (!imageToDelete || !selectedAlbum) return;

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setAlbums(
        albums.map((album) =>
          album.id === selectedAlbum.id
            ? {
                ...album,
                images: album.images.filter((img) => img.id !== imageToDelete),
              }
            : album
        )
      );

      setStatusModal({
        type: "success",
        title: "Success",
        message: "Image deleted successfully",
      });
    } catch (error) {
      setStatusModal({
        type: "error",
        title: "Error",
        message: "Failed to delete image",
      });
    } finally {
      setImageToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <ImageIcon className="h-6 w-6 text-primary-cyan" />
          <h2 className="text-xl font-semibold text-white">
            {selectedAlbum ? selectedAlbum.name : "Photo Gallery"}
          </h2>
        </div>
        <GradientButton
          onClick={() => {
            if (selectedAlbum) {
              setIsImageModalOpen(true);
            } else {
              setIsAlbumModalOpen(true);
            }
          }}
          type="button"
        >
          <div className="flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>{selectedAlbum ? "Add Image" : "Create Album"}</span>
          </div>
        </GradientButton>
      </div>

      {/* Back button when viewing album */}
      {selectedAlbum && (
        <button
          onClick={() => setSelectedAlbum(null)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <X className="h-4 w-4" />
          <span>Back to Albums</span>
        </button>
      )}

      {/* Albums Grid */}
      {!selectedAlbum && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {albums.map((album) => (
            <div
              key={album.id}
              className="backdrop-blur-xl bg-black/30 rounded-lg border border-gray-800 overflow-hidden hover:border-primary-blue/50 transition-all duration-200"
            >
              {album.images[0] && (
                <div
                  className="relative h-48 cursor-pointer"
                  onClick={() => setSelectedAlbum(album)}
                >
                  <img
                    src={album.images[0].url}
                    alt={album.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {album.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">
                    {album.images.length}{" "}
                    {album.images.length === 1 ? "image" : "images"}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedAlbum(album);
                        setAlbumForm({ name: album.name });
                        setIsAlbumModalOpen(true);
                      }}
                      className="p-2 text-gray-400 hover:text-primary-cyan transition-colors"
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => {
                        setAlbumToDelete(album.id);
                        setStatusModal({
                          type: "confirm",
                          title: "Delete Album",
                          message:
                            "Are you sure you want to delete this album? This action cannot be undone.",
                        });
                      }}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Images Grid */}
      {selectedAlbum && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {selectedAlbum.images.map((image) => (
            <div
              key={image.id}
              className="group relative aspect-square rounded-lg overflow-hidden border border-gray-800 hover:border-primary-blue/50 transition-all duration-200"
            >
              <img
                src={image.url}
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  onClick={() => {
                    setImageToDelete(image.id);
                    setStatusModal({
                      type: "confirm",
                      title: "Delete Image",
                      message:
                        "Are you sure you want to delete this image? This action cannot be undone.",
                    });
                  }}
                  className="p-2 text-white hover:text-red-500 transition-colors"
                >
                  <Trash2 className="h-6 w-6" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Album Modal */}
      <Modal
        isOpen={isAlbumModalOpen}
        onClose={() => {
          setIsAlbumModalOpen(false);
          setSelectedAlbum(null);
          setAlbumForm({ name: "" });
        }}
        title={selectedAlbum ? "Edit Album" : "Create Album"}
      >
        <form
          onSubmit={selectedAlbum ? handleEditAlbum : handleCreateAlbum}
          className="space-y-6"
        >
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Album Name
            </label>
            <input
              type="text"
              value={albumForm.name}
              onChange={(e) => setAlbumForm({ name: e.target.value })}
              className="w-full px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                       focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                       text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-200"
              placeholder="Enter album name"
              required
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => {
                setIsAlbumModalOpen(false);
                setSelectedAlbum(null);
                setAlbumForm({ name: "" });
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
                    ? selectedAlbum
                      ? "Updating..."
                      : "Creating..."
                    : selectedAlbum
                    ? "Update Album"
                    : "Create Album"}
                </span>
              </div>
            </GradientButton>
          </div>
        </form>
      </Modal>

      {/* Add Image Modal */}
      <Modal
        isOpen={isImageModalOpen}
        onClose={() => {
          setIsImageModalOpen(false);
          setImageForm({ url: "" });
        }}
        title="Add Image"
      >
        <form onSubmit={handleAddImage} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Image URL
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="url"
                value={imageForm.url}
                onChange={(e) => setImageForm({ url: e.target.value })}
                className="flex-1 px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                         focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                         text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-200"
                placeholder="Enter image URL"
                required
              />
              <button
                type="button"
                className="px-4 py-2.5 bg-gray-800 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
              >
                <Upload className="h-5 w-5" />
              </button>
            </div>
            {imageForm.url && (
              <div className="mt-2 relative rounded-lg overflow-hidden h-40">
                <img
                  src={imageForm.url}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => {
                setIsImageModalOpen(false);
                setImageForm({ url: "" });
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
                  <Upload className="h-5 w-5" />
                )}
                <span>{loading ? "Adding..." : "Add Image"}</span>
              </div>
            </GradientButton>
          </div>
        </form>
      </Modal>

      {/* Status Modal */}
      <StatusModal
        isOpen={statusModal !== null}
        onClose={() => setStatusModal(null)}
        title={statusModal?.title || ""}
        message={statusModal?.message || ""}
        type={statusModal?.type || "success"}
        onConfirm={
          statusModal?.type === "confirm"
            ? albumToDelete
              ? handleDeleteAlbum
              : imageToDelete
              ? handleDeleteImage
              : undefined
            : undefined
        }
      />
    </div>
  );
};

export default PhotoGallery;
