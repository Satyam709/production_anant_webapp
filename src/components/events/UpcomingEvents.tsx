import React from "react";
import EventCard from "./EventCard";
import { Events } from "@prisma/client";

interface UpcomingEventsProps {
  events: Events[];
}

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ events }) => {

  return (
    <section className="mb-20">
      <h2 className="text-3xl font-bold mb-10 text-center">Upcoming Events</h2>

      {!events || events.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center text-gray-500">
          <p className="text-xl font-semibold">
            No upcoming events at the moment.
          </p>
          <p className="text-md">Stay tuned for updates!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <EventCard key={event.event_id} {...event} />
          ))}
        </div>
      )}
    </section>
  );
};

export default UpcomingEvents;
