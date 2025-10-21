import { Events } from '@prisma/client';
import React from 'react';

import EventCard from './EventCard';

interface PastEventsProps {
  events: Events[];
}

const PastEvents: React.FC<PastEventsProps> = ({ events }) => {
  return (
    <section className="mb-20">
      <h2 className="text-3xl font-bold mb-10 text-center">Past Events</h2>

      {!events || events.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center text-gray-500">
          <p className="text-xl font-semibold">No past events available.</p>
          <p className="text-md">
            Check back later for updates on past events!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </div>
      )}
    </section>
  );
};

export default PastEvents;
