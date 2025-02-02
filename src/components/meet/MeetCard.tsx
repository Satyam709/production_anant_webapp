import React from 'react';
import Image from 'next/image';
import { Calendar, Clock, MapPin, Video, QrCode } from 'lucide-react';
import GradientButton from '@/components/ui/GradientButton';

interface MeetCardProps {
  title: string;
  date: string;
  time: string;
  venue: string;
  link: string;
  description: string;
  image: string;
}

const MeetCard: React.FC<MeetCardProps> = ({
  title,
  date,
  time,
  venue,
  link,
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
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-semibold mb-3">{title}</h3>
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-gray-400">
              <Calendar size={16} />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Clock size={16} />
              <span>{time}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <MapPin size={16} />
              <span>{venue}</span>
            </div>
          </div>
          <p className="text-gray-400">{description}</p>
        </div>

        <div className="flex justify-between items-center mt-6">
          <div className="flex flex-col items-start">
            <GradientButton >
              <Video size={16} className="mr-2" />
              Join Meeting
            </GradientButton>
          </div>

          {/* QR Code */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-black/50 rounded-lg flex items-center justify-center border border-gray-800">
              <QrCode className="w-16 h-16 text-cyan-400" /> 
              {/* replace with actual qr logic later */}
            </div>
            <span className="text-xs text-gray-400">Scan to join</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetCard;