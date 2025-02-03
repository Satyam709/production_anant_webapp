import React from 'react';
import Image from 'next/image';
import { Calendar, Users, Trophy, ArrowRight } from 'lucide-react';
import GradientButton from '@/components/ui/GradientButton';

interface CompCardProps {
  id: string;
  title: string;
  date: string;
  teamSize: string;
  prize: string;
  description: string;
  image: string;
}

const CompCard: React.FC<CompCardProps> = ({
  id,
  title,
  date,
  teamSize,
  prize,
  description,
  image,
}) => {
  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all flex flex-col">
      {/* Image Section */}
      <div className="relative h-48">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex-grow">
          <h3 className="text-xl font-semibold mb-3">{title}</h3>
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
          </div>
          <p className="text-gray-400">{description}</p>
        </div>

        {/* View Details Button */}
        <div className="mt-4">
          <GradientButton >
            View Details
          </GradientButton>
        </div>
      </div>
    </div>
  );
};

export default CompCard;