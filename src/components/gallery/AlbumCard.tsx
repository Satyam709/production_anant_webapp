import React from 'react';
import { Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface AlbumCardProps {
  name: string;
  imageCount: number;
  coverImage?: string;
  onClick: () => void;
}

export const AlbumCard: React.FC<AlbumCardProps> = ({ name, imageCount, coverImage, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="group relative overflow-hidden rounded-lg bg-gray-900/50 backdrop-blur-sm border border-gradient-middle/20 hover:border-gradient-middle/50 transition-all duration-300 cursor-pointer"
    >
      {coverImage ? (
        <div className="aspect-square w-full overflow-hidden">
          <Image 
            src={coverImage} 
            alt={name}
            width={300}
            height={300} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      ) : (
        <div className="aspect-square w-full flex items-center justify-center bg-gradient-radial from-gradient-start/10 via-gradient-middle/10 to-gradient-end/10">
          <ImageIcon className="w-16 h-16 text-gradient-middle/60" />
        </div>
      )}
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-white font-medium truncate">{name}</h3>
        <p className="text-primary-cyan/80 text-sm">{imageCount} photos</p>
      </div>
    </div>
  );
};