'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect,useState } from 'react';

interface PhotoSlideshowProps {
  photos: string[];
  width?: number;
  height?: number;
  showGalleryLink?: boolean;
  className?: string;
}

export default function PhotoSlideshow({
  photos,
  width = 800,
  height = 450,
  showGalleryLink = true,
  className = '',
}: PhotoSlideshowProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [photos.length]);

  return (
    <div
      className={`relative aspect-video rounded-xl overflow-hidden shadow-xl ${className}`}
    >
      <Image
        src={photos[currentPhotoIndex]}
        alt={`Photo ${currentPhotoIndex + 1}`}
        width={width}
        height={height}
        className="w-full p-1 h-full object-cover rounded-xl shadow-2xl"
        priority
      />

      {/* Gradient Overlay */}
      <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/60 to-transparent p-4">
        {showGalleryLink && (
          <Link href="/gallery" className="text-[#00E0FF] hover:text-[#f7d452]">
            View All Photos
          </Link>
        )}

        {/* Navigation Dots */}
        <div className="absolute bottom-4 right-4 flex gap-2">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPhotoIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentPhotoIndex
                  ? 'bg-[#00E0FF] w-4'
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to photo ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
