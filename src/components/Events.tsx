import React from "react";
import { Calendar, Clock } from "lucide-react";
import { events } from "@/constants/events";
import Image from "next/image";
const Events = () => {
  return (
    <div id="events" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Upcoming Events</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join us in our upcoming events and be part of the mathematical
            revolution
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <div
              key={index}
              className="bg-gray-800/50 rounded-lg overflow-hidden hover:transform hover:-translate-y-1 transition-all"
            >
              <Image
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover"
                width={400}
                height={200}
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <div className="flex items-center text-gray-400 mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center text-gray-400 mb-4">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{event.time}</span>
                </div>
                <p className="text-gray-400">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
