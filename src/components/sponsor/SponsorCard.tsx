// components/sponsors/SponsorCard.tsx
'use client';

import { Sponsor } from '@prisma/client';
import { Award, Calendar, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link'; // <--- Import Link
import React from 'react';

import { placeholder } from '@/lib/images/placeholder';
import GradientButton from '@/components/ui/GradientButton'; 

const SponsorCard: React.FC<Sponsor> = (sponsor) => {
  // We don't need useRouter anymore
  
  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all flex flex-col h-full group">
      {/* 1. Make the Image Area Clickable via Link */}
      <Link href={`/sponsor/${sponsor.id}`} className="relative h-48 bg-white/5 p-4 block">
        <Image
          src={sponsor.imageUrl || placeholder}
          alt={sponsor.name}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex-grow">
          <div className="flex justify-between items-start">
             {/* 2. Make the Title Clickable via Link */}
             <Link href={`/sponsor/${sponsor.id}`}>
                <h3 className="text-xl font-bold mb-3 hover:text-primary-blue transition-colors">
                  {sponsor.name}
                </h3>
             </Link>
             
              {sponsor.link && (
                  <a href={sponsor.link} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white">
                      <ExternalLink size={16} />
                  </a>
              )}
          </div>

          <div className="space-y-3 mb-6 text-gray-400">
            <div className="flex items-center gap-2">
              <Award size={16} className="text-yellow-500" />
              <span className="font-medium text-gray-300">{sponsor.category}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-primary-purple" />
              <span>Event: {sponsor.event}</span>
            </div>
          </div>
        </div>

        {/* 3. Wrap the Button in a Link */}
        <Link href={`/sponsor/${sponsor.id}`} className="block w-full">
            {/* Note: If GradientButton is a <button>, React might warn about nesting. 
                Ideally, GradientButton should accept an 'as="div"' prop or just be a styled div here. 
                But this usually works fine for functionality. */}
            <GradientButton className="w-full">
              View Profile
            </GradientButton>
        </Link>
      </div>
    </div>
  );
};

export default SponsorCard;