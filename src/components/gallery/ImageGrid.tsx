import Image from 'next/image';
import React from 'react';

interface ImageGridProps {
  images: Array<{
    id: string;
    url: string;
  }>;
  onImageClick?: (index: number) => void;
}

export const ImageGrid: React.FC<ImageGridProps> = ({
  images,
  onImageClick,
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image, index) => (
        <div
          key={image.id}
          className="group relative aspect-square overflow-hidden rounded-lg bg-gray-900/50 backdrop-blur-sm border border-gradient-middle/20 hover:border-gradient-middle/50 transition-all duration-300 cursor-pointer"
          onClick={() => onImageClick?.(index)}
        >
          <Image
            src={image.url}
            alt=""
            width={300}
            height={300}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      ))}
    </div>
  );
};
