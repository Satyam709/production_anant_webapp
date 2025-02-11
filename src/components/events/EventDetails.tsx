import React from 'react';
import Image from 'next/image';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Events, User } from '@prisma/client';
import GradientButton from '../ui/GradientButton';

interface EventDetailsProps {
  event: Events & {
    createdBy?: User;
    first_prize?: User | null;
    second_prize?: User | null;
    third_prize?: User | null;
  };
}

const EventDetails: React.FC<EventDetailsProps> = ({ event }) => {
  // console.log('Event:', event);
  
  const isRegistrationOpen = new Date(event.registration_deadline) > new Date();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800">
        {/* Event Image */}
        <div className="relative h-64 w-full">
          <Image
            src={event.imageURL || '/event-default.jpg'}
            alt={event.eventName || 'Event Image'}
            fill
            className="object-cover"
          />
        </div>

        {/* Event Content */}
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6">{event.eventName}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="text-primary-blue" size={24} />
                <div>
                  <p className="font-semibold">Date</p>
                  <p className="text-gray-400">
                    {new Date(event.conductedOn).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="text-primary-blue" size={24} />
                <div>
                  <p className="font-semibold">Time</p>
                  <p className="text-gray-400">
                    {new Date(event.conductedOn).toLocaleTimeString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="text-primary-blue" size={24} />
                <div>
                  <p className="font-semibold">Venue</p>
                  <p className="text-gray-400">{event.venue}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">About the Event</h3>
              <p className="text-gray-400">{event.description}</p>
            </div>
          </div>

          {/* Prize Details */}
          {(event.first_prize ||
            event.second_prize ||
            event.third_prize ||
            event.prize) && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Prizes</h3>
              <div className="bg-black/30 rounded-lg p-6 border border-gray-800">
                {event.prize && (
                  <p className="text-gray-400 mb-4">{event.prize}</p>
                )}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {event.first_prize && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500">
                        1
                      </div>
                      <span>{event.first_prize.name}</span>
                    </div>
                  )}
                  {event.second_prize && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-400/20 flex items-center justify-center text-gray-400">
                        2
                      </div>
                      <span>{event.second_prize.name}</span>
                    </div>
                  )}
                  {event.third_prize && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500">
                        3
                      </div>
                      <span>{event.third_prize.name}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Registration Button */}
          <div className="flex gap-4">
            <GradientButton
              disabled={!isRegistrationOpen}
            >
              {isRegistrationOpen ? 'Register Now' : 'Registration Closed'}
            </GradientButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
