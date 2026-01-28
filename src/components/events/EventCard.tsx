'use client';
import { Events } from '@prisma/client';
import { Calendar, Clock, MapPin } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { placeholder } from '@/lib/images/placeholder';
import GradientButton from '../ui/GradientButton';

const EventCard: React.FC<Events> = (event) => {
  console.log('card data', event);

  const router = useRouter();
  const isRegistrationOpen = new Date(event.registration_deadline) > new Date();

  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all flex flex-col">
      {/* Event Image */}
      <div
        className="relative h-48 cursor-pointer"
        onClick={() => router.push(`/events/${event.event_id}`)}
      >
        <Image
          src={event.imageURL || placeholder}
          alt={event.eventName}
          fill
          className="object-cover"
        />
      </div>

      {/* Event Details */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex-grow">
          {/* Event Title */}
          <h3
            className="text-xl font-semibold mb-3 cursor-pointer hover:text-primary-blue"
            onClick={() => router.push(`/events/${event.event_id}`)}
          >
            {event.eventName}
          </h3>

          {/* Event Info */}
          <div className="space-y-2 mb-4 text-gray-400">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{new Date(event.conductedOn).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>
                {new Date(event.conductedOn).toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>{event.venue || 'Venue not specified'}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full">
          <GradientButton
            onClick={() => router.push(`/events/${event.event_id}`)}
            disabled={!isRegistrationOpen}
            className="flex-1"
          >
            {isRegistrationOpen ? 'View Details' : 'Registration Closed'}
          </GradientButton>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
