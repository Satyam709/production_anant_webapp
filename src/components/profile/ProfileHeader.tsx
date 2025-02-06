import React from 'react';
import { Camera, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';

interface ProfileHeaderProps {
  name: string;
  email: string;
  location: string;
  avatarUrl?: string | undefined;
  onAvatarChange?: (file: File) => void;
}

const ProfileHeader = ({ name, email, location, avatarUrl, onAvatarChange }: ProfileHeaderProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onAvatarChange) {
      onAvatarChange(file);
    }
  };

  return (
    <div className="relative mb-8">
      <div className="h-32 bg-gradient-to-r from-primary-blue/20 via-primary-purple/20  rounded-t-2xl" />
      <div className="px-6 pb-6">
        <div className="relative -mt-16 flex items-end space-x-6">
          <div className="relative group">
            <div className="h-32 w-32 rounded-full border-2 border-cyan-900 overflow-hidden backdrop-blur-sm bg-gray-900/50 transition-transform group-hover:scale-105">
              <Image
                src={avatarUrl || '/anant_logo.png'}
                alt={name}
                width={128}
                height={128}
                className="h-full w-full object-cover"
              />
            </div>
            <label className="absolute bottom-0 right-0 p-2 bg-black/50 rounded-full cursor-pointer hover:bg-black/70 transition-colors">
              <Camera className="h-5 w-5 text-white" />
              <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
            </label>
          </div>
          
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold text-white truncate">{name}</h2>
            <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-2 text-gray-400">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-1" />
                <span>{email}</span>
              </div>
              <div className="hidden sm:block text-gray-500">•</div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;