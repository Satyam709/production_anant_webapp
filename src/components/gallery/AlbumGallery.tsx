"use client"
import React, { useState } from 'react';
import { AlbumCard } from './AlbumCard';
import { ImageGrid } from './ImageGrid';
import { ImageViewer } from './ImageViewer';
import { ChevronLeft } from 'lucide-react';

// Mock data based on your schema
const mockAlbums = [
  {
    id: '1',
    name: 'Mathematics Day 2024',
    images: [
      { id: '1', url: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800' },
      { id: '2', url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800' },
      { id: '3', url: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=800' },
    ],
    createdAt: new Date('2024-02-15'),
  },
  {
    id: '2',
    name: 'Workshop Series',
    images: [
      { id: '4', url: 'https://images.unsplash.com/photo-1596496050827-8299e0220de1?w=800' },
      { id: '5', url: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?w=800' },
    ],
    createdAt: new Date('2024-01-20'),
  },
  {
    id: '3',
    name: 'Team Building 2024',
    images: [
      { id: '6', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800' },
      { id: '7', url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800' },
    ],
    createdAt: new Date('2024-01-10'),
  },
];

export const AlbumGallery: React.FC = () => {
  const [selectedAlbum, setSelectedAlbum] = useState<typeof mockAlbums[0] | null>(null);
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
                {selectedAlbum.images.length} photos • Created on {selectedAlbum.createdAt.toLocaleDateString()}
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
              {mockAlbums.map((album) => (
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