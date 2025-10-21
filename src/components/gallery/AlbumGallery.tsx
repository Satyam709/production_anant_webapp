'use client';
import { ChevronLeft } from 'lucide-react';
import React, { useState } from 'react';

import { AlbumType } from '@/types/common';

import { AlbumCard } from './AlbumCard';
import { ImageGrid } from './ImageGrid';
import { ImageViewer } from './ImageViewer';

type AlbumGalleryProps = {
  albums: AlbumType[];
};

export const AlbumGallery: React.FC<AlbumGalleryProps> = ({ albums }) => {
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumType | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(-1);

  const handleNext = () => {
    if (selectedAlbum && currentImageIndex < selectedAlbum.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-7xl mx-auto">
        {selectedAlbum ? (
          <div className="space-y-6">
            <button
              onClick={() => setSelectedAlbum(null)}
              className="flex items-center space-x-2 text-primary-cyan hover:text-primary-blue transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back to Albums</span>
            </button>

            <div>
              <h1 className="text-3xl font-bold bg-hero-gradient bg-clip-text text-transparent">
                {selectedAlbum.name}
              </h1>
              <p className="text-primary-cyan/80 mt-1">
                {selectedAlbum.images.length} photos • Created on{' '}
                {new Date(selectedAlbum.createdAt).toLocaleDateString()}
              </p>
            </div>

            <ImageGrid
              images={selectedAlbum.images}
              onImageClick={(index) => setCurrentImageIndex(index)}
            />

            {currentImageIndex !== -1 && (
              <ImageViewer
                images={selectedAlbum.images}
                currentIndex={currentImageIndex}
                onClose={() => setCurrentImageIndex(-1)}
                onNext={handleNext}
                onPrevious={handlePrevious}
              />
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {albums.map((album) => (
                <AlbumCard
                  key={album.id}
                  name={album.name}
                  imageCount={album.images.length}
                  coverImage={album.images[0]?.url}
                  onClick={() => setSelectedAlbum(album)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
