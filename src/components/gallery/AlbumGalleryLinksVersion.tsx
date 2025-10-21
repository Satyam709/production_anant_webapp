import { GDriveGallery } from '@prisma/client';

import { AlbumCard } from './AlbumCardLinkVersion';

type AlbumGalleryProps = {
  albums: GDriveGallery[];
};

export const AlbumGallery: React.FC<AlbumGalleryProps> = ({ albums }) => {
  return (
    <div className="min-h-screen text-white p-6">
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {albums.map((album) => (
            <AlbumCard
              key={album.id}
              name={album.title}
              coverImage={album.coverImage || '/anant_logo.png'}
              link={album.link}
              description={album.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
