'use client';

import { Calendar, MapPin, Trophy, Users } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

import GradientButton from '@/components/ui/GradientButton';
import { placeholder } from '@/lib/images/placeholder';

interface CompetitionCardProps {
  id: string;
  title: string;
  date: string;
  teamSize: string;
  prize: string;
  description: string;
  image: string;
  registrationDeadline: Date;
  venue: string;
}

const CompCard: React.FC<CompetitionCardProps> = ({
  id,
  title,
  date,
  teamSize,
  prize,
  description,
  image,
  registrationDeadline,
  venue,
}) => {
  const router = useRouter();
  const isRegistrationOpen = new Date(registrationDeadline) > new Date();

  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all flex flex-col">
      <div
        className="relative h-48 cursor-pointer"
        onClick={() => router.push(`/compete/${id}`)}
      >
        <Image
          src={image || placeholder}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex-grow">
          <h3
            className="text-xl font-semibold mb-3 cursor-pointer hover:text-primary-blue"
            onClick={() => router.push(`/compete/${id}`)}
          >
            {title}
          </h3>
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-gray-400">
              <Calendar size={16} />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Users size={16} />
              <span>{teamSize}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Trophy size={16} />
              <span>{prize}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <MapPin size={16} />
              <span>{venue}</span>
            </div>
          </div>
          {/* <p className="text-gray-400 mb-4 line-clamp-2">{description}</p> */}
        </div>
        <GradientButton
          onClick={() => router.push(`/compete/${id}`)}
          disabled={!isRegistrationOpen}
        >
          {isRegistrationOpen ? 'View Details' : 'Registration Closed'}
        </GradientButton>
      </div>
    </div>
  );
};

export default CompCard;
