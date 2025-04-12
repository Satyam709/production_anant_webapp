"use client";
import React from "react";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import Link from "next/link";

interface Event {
  id: string;
  title: string;
  date: string;
  venue: string;
  image: string;
  description: string;
}

interface HomeEventsSectionProps {
  events: Event[];
}

const HomeEventsSection = ({ events }: HomeEventsSectionProps) => {
  return (
    <section className="py-24 bg-black/10 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-200">
            Upcoming Events
          </h2>
          <Link href="/events" className="text-[#f5c722] hover:text-[#f7d452] flex items-center">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-black/20 backdrop-blur-sm rounded-xl overflow-hidden border border-blue-900/50 hover:border-blue-800/50 transition-all"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-100 mb-2">
                  {event.title}
                </h3>
                <div className="flex items-center text-blue-200/80 mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center text-blue-200/80 mb-4">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{event.venue}</span>
                </div>
                <p className="text-blue-100 mb-4 line-clamp-2">
                  {event.description}
                </p>
                <Link
                  href={`/events/${event.id}`}
                  className="inline-flex items-center text-[#f5c722] hover:text-[#f7d452]"
                >
                  Read More <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeEventsSection;
