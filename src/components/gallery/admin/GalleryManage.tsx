import React, { useEffect, useState } from "react";
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
import { AlbumType } from "@/types/common";
import { placeholder } from "@/lib/images/placeholder";
import Image from "next/image";
import {
  uploadServerSideFiles,
} from "@/lib/actions/uploadthing";


const PhotoGallery = () => {
  const [albums, setAlbums] = useState<AlbumType[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumType | null>(null);
  const [isAlbumModalOpen, setIsAlbumModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

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

  const [imageFiles, setImageFiles] = useState<File[]>([]);

  useEffect(() => {
    setIsFetching(true);
    fetchAlbums().finally(() => setIsFetching(false));
  }, []);

  const fetchAlbums = async () => {
    let albums: AlbumType[] = [];
    try {
      const res = await fetch(`/api/albums`);

      if (!res.ok) throw new Error("Failed to fetch albums");
      const data = (await res.json()) as { albums: AlbumType[] };
      albums = data.albums;
    } catch (error) {
      console.log(error);
      albums = [];
    } finally {
      setAlbums(albums);
    }
  };

  const handleCreateAlbum = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Simulate API call
      const res = await fetch(`/api/albums`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: albumForm.name,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create album");
      setIsAlbumModalOpen(false);
      setAlbumForm({ name: "" });
      setStatusModal({
        type: "success",
        title: "Success",
        message: "Album created successfully",
      });
      // Fetch albums again to update the list
      await fetchAlbums();
    } catch (error: any) {
      setStatusModal({
        type: "error",
        title: "Error",
        message: error.message || "Failed to create album",
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
      const res = await fetch(`/api/albums/${selectedAlbum.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newName: albumForm.name,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to update album");

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
    } catch (error: any) {
      setStatusModal({
        type: "error",
        title: "Error",
        message: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAlbum = async () => {
    if (!albumToDelete) return;

    try {
      const res = await fetch(`/api/albums/${albumToDelete}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to update album");

      setAlbums(albums.filter((album) => album.id !== albumToDelete));
      setStatusModal({
        type: "success",
        title: "Success",
        message: "Album deleted successfully",
      });
    } catch (error: any) {
      setStatusModal({
        type: "error",
        title: "Error",
        message: error.message || "Failed to delete album",
      });
    } finally {
      setAlbumToDelete(null);
    }
  };

  const handleAddImage = async () => {
    if (!selectedAlbum) return;
    if (imageFiles.length === 0) {
      setStatusModal({
        type: "error",
        title: "Error",
        message: "Please select an image to upload",
      });
      return;
    }
    const newImages: AlbumType["images"] = [];
    const successSet = new Set();
    setLoading(true);
    try {
      const res = await uploadServerSideFiles(imageFiles);
      if (!res) {
        throw new Error("Failed to add image");
      }
      const formDataUrl: { urls: string[] } = {
        urls: [],
      };
      res.forEach((response, idx) => {
        try {
          if (response.error) throw new Error("Failed to add image");

          const newImg = {
            id: "",
            url: response.data?.ufsUrl,
          };

          successSet.add(idx);
          formDataUrl.urls.push(newImg.url);
          newImages.push(newImg);
        } catch (error) {
          console.log(error);
        }
      });

      if (successSet.size === 0) throw new Error("Failed to add image");

      // preserve the failed files
      const failedImageFiles = imageFiles.filter(
        (file, idx) => !successSet.has(idx)
      );
      setImageFiles(failedImageFiles);

      // update database
      const updateDB = await fetch(`/api/albums/${selectedAlbum.id}/images`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataUrl),
      });

      const resdata = await updateDB.json();

      if (!updateDB.ok) {
        throw new Error(resdata.error || "Failed to add image to database");
      }

      const updatedAlbum = await fetch(`/api/albums/${selectedAlbum.id}`);
      const albumData = await updatedAlbum.json();

      // update local state
      if (updatedAlbum.ok) {
        setSelectedAlbum(albumData.album);
        setAlbums(
          albums.map((album) =>
            album.id === selectedAlbum.id ? albumData.album : album
          )
        );
      }

      if (successSet.size != imageFiles.length)
        throw new Error("few images failed to add");

      setIsImageModalOpen(false);

      setStatusModal({
        type: "success",
        title: "Success",
        message: "Image added successfully",
      });
    } catch (error: any) {
      setStatusModal({
        type: "error",
        title: "Error",
        message: error.message || "Failed to add image",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = async () => {
    if (!imageToDelete || !selectedAlbum) return;

    try {
      const res = await fetch(
        `/api/albums/${selectedAlbum.id}/images/${imageToDelete}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to delete image");

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

      setSelectedAlbum({
        ...selectedAlbum,
        images: selectedAlbum.images.filter((img) => img.id !== imageToDelete),
      });

      setStatusModal({
        type: "success",
        title: "Success",
        message: "Image deleted successfully",
      });
    } catch (error: any) {
      setStatusModal({
        type: "error",
        title: "Error",
        message: error.message || "Failed to delete image",
      });
    } finally {
      setImageToDelete(null);
    }
  };

  if (isFetching) {
    return (
      <div className="w-full flex items-center justify-center">
        <Loader className="h-8 w-8 animate-spin text-primary-cyan" />
      </div>
    );
  }

  if (!albums || albums.length === 0) {
    return (
      <div className="w-full flex items-center justify-center">
        <p className="text-gray-400">No albums found</p>
      </div>
    );
  }

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
              <div
                className="relative h-48 cursor-pointer"
                onClick={() => setSelectedAlbum(album)}
              >
                <Image
                  src={album.images[0]?.url || placeholder}
                  alt={album.name}
                  layout="fill"
                  objectFit="cover"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
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
                      <Trash2 className="h-5 w-5 text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Images Grid */}
      {albums && selectedAlbum && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {selectedAlbum.images.map((image) => (
            <div
              key={image.id}
              className="group relative aspect-square rounded-lg overflow-hidden border border-gray-800 hover:border-primary-blue/50 transition-all duration-200"
            >
              <Image
                src={image.url}
                alt=""
                layout="fill"
                objectFit="cover"
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
          setImageFiles([]);
        }}
        title="Add Image"
      >
        <form onSubmit={handleAddImage} className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-center items-center">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) =>
                  setImageFiles(Array.from(e.target.files || []))
                }
                className="w-full max-w-xs text-sm text-gray-300
               file:mr-4 file:py-2 file:px-4
               file:rounded-lg file:border-0
               file:text-sm file:font-medium
               file:bg-gray-800 file:text-gray-300
               hover:file:bg-gray-700 transition-colors"
              />
            </div>

            {imageFiles.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-4">
                {imageFiles.map((file, index) => (
                  <div
                    key={index}
                    className="relative w-32 h-32 rounded-lg overflow-hidden border border-gray-600"
                  >
                    <Image
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => {
                setIsImageModalOpen(false);
                setImageFiles([]);
              }}
              className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <GradientButton
              disabled={loading}
              onClick={() => {
                handleAddImage();
              }}
            >
              <div className="flex items-center space-x-2">
                {loading ? (
                  <Loader className="h-5 w-5 animate-spin" />
                ) : (
                  <Upload className="h-5 w-5" />
                )}
                <span>{loading ? "Adding..." : "Add Images"}</span>
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
