'use client';
import { Events } from '@prisma/client';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import EventCard from '@/components/events/EventCardDashboard';

interface HomeEventsSectionProps {
  events: Events[];
}

const HomeEventsSection = ({ events }: HomeEventsSectionProps) => {
  return (
    <section className="py-24 bg-black/10 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-200">
            Upcoming Events
          </h2>
          <Link
            href="/events"
            className="text-[#00E0FF] hover:text-[#f7d452] flex items-center"
          >
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <EventCard key={event.event_id} {...event} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeEventsSection;
