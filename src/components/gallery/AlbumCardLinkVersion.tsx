import { Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface AlbumCardProps {
  name: string;
  coverImage?: string;
  link: string;
  description?: string | null;
}

export const AlbumCard: React.FC<AlbumCardProps> = ({
  name,
  coverImage,
  link,
  description,
}) => {
  return (
    <Link
      className="group relative overflow-hidden rounded-lg bg-gray-900/50 backdrop-blur-sm border border-gradient-middle/20 hover:border-gradient-middle/50 transition-all duration-300 cursor-pointer"
      href={link}
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
        {description && (
          <p className="text-gray-300 text-sm mt-1 line-clamp-2">
            {description}
          </p>
        )}
      </div>
    </Link>
  );
};
