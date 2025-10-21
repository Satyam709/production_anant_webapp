import { Meeting } from '@prisma/client';
import { Calendar, Clock, MapPin, QrCode,Video } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import GradientButton from '@/components/ui/GradientButton';
import { placeholder } from '@/lib/images/placeholder';

const MeetCard: React.FC<Meeting> = (meet) => {
  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all flex flex-col">
      {/* Image Section */}
      <div className="relative h-48 flex justify-center">
        {/* remaining */}
        <Image
          src={placeholder}
          alt={meet.topic_of_discussion || 'Meet'}
          width={200}
          height={200}
          className="object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-semibold mb-3">
            {meet.topic_of_discussion}
          </h3>
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-gray-400">
              <Calendar size={16} />
              <span>
                {new Intl.DateTimeFormat('en-US', {
                  weekday: 'short',
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                }).format(new Date(meet.starts))}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Clock size={16} />
              <span>
                {new Intl.DateTimeFormat('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: true,
                }).format(new Date(meet.starts))}
              </span>
            </div>

            <div className="flex items-center gap-2 text-gray-400">
              <MapPin size={16} />
              <span>{meet.venue}</span>
            </div>
          </div>
          <p className="text-gray-400">{meet.topic_of_discussion}</p>
        </div>
      </div>
    </div>
  );
};

export default MeetCard;
