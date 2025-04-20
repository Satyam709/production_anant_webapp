"use server";
import React from "react";
import { Calendar, Clock, MapPin, Trophy, User, Users } from "lucide-react";
import Register_Button from "@/components/events/Register_Button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSession } from "@/lib/actions/Sessions";
import { notFound } from "next/navigation";

async function EventDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const response = await getEvents(id);
  const event = response.data;

  if (!event) {
    notFound();
  }
  
  const isRegistrationOpen = new Date() < new Date(event.registration_deadline);
  const session = await getSession();
  const isLoggedin = session?.user? true : false;

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            <img
              src={event.imageURL == "" ? null : event.imageURL}
              alt={event.eventName}
              className="w-full h-[400px] object-cover rounded-xl shadow-2xl mb-8"
            />
            {!isRegistrationOpen && (
              <div className="absolute bottom-4 right-4 z-20 bg-red-500 text-white px-4 py-2 rounded-full">
                Registration Closed
              </div>
            )}
          </div>

          <div className="bg-gray-800 rounded-xl p-8 shadow-xl">
            <h1 className="text-4xl font-bold mb-6">{event.eventName}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Users className="w-6 h-6 text-cyan-400" />
                  <span>Conducted by: {event.conductedBy}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-6 h-6 text-cyan-400" />
                  <span>Date: {formatDate(event.conductedOn)}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-6 h-6 text-cyan-400" />
                  <span>
                    Registration Deadline:{" "}
                    {formatDate(event.registration_deadline)}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-6 h-6 text-cyan-400" />
                  <span>Venue: {event.venue}</span>
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Trophy className="w-6 h-6 text-yellow-400 mr-2" />
                  Prize Distribution
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="text-yellow-400">1st Prize:</div>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      {event.first_prize_id || "TBD"}
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-gray-400">2nd Prize:</div>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      {event.second_prize_id || "TBD"}
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-bronze-400">3rd Prize:</div>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      {event.third_prize_id || "TBD"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">About the Event</h3>
              <p className="text-gray-300 leading-relaxed">
                {event.description}
              </p>
            </div>

            {event.prize && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-2">Prize Pool</h3>
                <p className="text-cyan-400 text-lg">{event.prize}</p>
              </div>
            )}

            <Register_Button
              event_id={id}
              isRegistrationOpen={isRegistrationOpen}
              isLoggedin={isLoggedin}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default EventDetails;

async function getEvents(id: string) {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/events/${id}`);
    if (!res.ok) {
      return [];
    }
    const data = await res.json();
    return data;
  } catch (err) {
    return [];
  }
}
