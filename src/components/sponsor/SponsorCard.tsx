'use client';

import { Sponsor } from '@prisma/client';
import { Award, Calendar, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { placeholder } from '@/lib/images/placeholder';
import GradientButton from '@/components/ui/GradientButton';

const SponsorCard: React.FC<Sponsor> = (sponsor) => {
  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all flex flex-col h-full group">
      {/* Image Area Clickable via Link */}
      <Link
        href={`/sponsor/${sponsor.id}`}
        // Changed padding (p-4) to zero (p-0) so the image hits the edges
        className="relative h-48 bg-white/5 block p-0"
      >
        <Image
          src={sponsor.imageUrl || placeholder}
          alt={sponsor.name}
          fill
          // Changed from object-contain to object-cover
          // Removed padding from the image class itself
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* ... rest of the card details (unchanged) ... */}
      <div className="p-6 flex-1 flex flex-col">
        {/* ... content ... */}
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <Link href={`/sponsor/${sponsor.id}`}>
              <h3 className="text-xl font-bold mb-3 hover:text-primary-blue transition-colors">
                {sponsor.name}
              </h3>
            </Link>

            {sponsor.link && (
              <a
                href={sponsor.link}
                target="_blank"
                rel="noreferrer"
                className="text-gray-500 hover:text-white"
              >
                <ExternalLink size={16} />
              </a>
            )}
          </div>

          <div className="space-y-3 mb-6 text-gray-400">
            <div className="flex items-center gap-2">
              <Award size={16} className="text-yellow-500" />
              <span className="font-medium text-gray-300">
                {sponsor.category}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-primary-purple" />
              <span>Event: {sponsor.event}</span>
            </div>
          </div>
        </div>
        <Link href={`/sponsor/${sponsor.id}`} className="block w-full">
          <GradientButton className="w-full">View Profile</GradientButton>
        </Link>
      </div>
    </div>
  );
};

export default SponsorCard;
