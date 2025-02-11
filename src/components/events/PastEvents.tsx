import React from "react";
import EventCard from "./EventCard";
import { Events } from "@prisma/client";

interface PastEventsProps {
  events: Events[];
}

const PastEvents: React.FC<PastEventsProps> = ({ events }) => {
  // Filter past events (events that have already passed)
  const now = new Date();
  const pastEvents = events.filter(
    (event) => new Date(event.conductedOn) < now
  );

  return (
    <section className="mb-20">
      <h2 className="text-3xl font-bold mb-10 text-center">Past Events</h2>

      {pastEvents.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center text-gray-500">
          <p className="text-xl font-semibold">No past events available.</p>
          <p className="text-md">
            Check back later for updates on past events!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pastEvents.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </div>
      )}
    </section>
  );
};

export default PastEvents;
