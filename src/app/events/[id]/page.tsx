import React from 'react';
import { useParams } from 'next/navigation';
import { Calendar, Clock, MapPin, Trophy, User, Users } from 'lucide-react';

// Mock data - replace with your actual data fetching logic
const event = {
  eventName: "CodeInPace",
  conductedBy: "Tech Department",
  conductedOn: new Date("2024-03-11T18:55:00"),
  registration_deadline: new Date("2024-03-10T23:59:59"),
  venue: "Main Auditorium",
  description: "Join us for an exciting coding competition where participants will solve challenging algorithmic problems. Show off your coding skills and compete with the best programmers!",
  prize: "Total Prize Pool: $1000",
  imageURL: "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?auto=format&fit=crop&q=80&w=1200",
  first_prize: { name: "TBA" },
  second_prize: { name: "TBA" },
  third_prize: { name: "TBA" }
};

function EventDetails() {
  const { id } = useParams();
  const isRegistrationOpen = new Date() < new Date(event.registration_deadline);
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleRegister = () => {
    // Add your registration logic here
    console.log('Registering for event:', id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          <img
            src={event.imageURL}
            alt={event.eventName}
            className="w-full h-[400px] object-cover rounded-xl shadow-2xl mb-8"
          />
          {!isRegistrationOpen && (
            <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full">
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
                <span>Date: {formatDate(new Date(event.conductedOn))}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-6 h-6 text-cyan-400" />
                <span>Registration Deadline: {formatDate(new Date(event.registration_deadline))}</span>
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
                    {event.first_prize.name}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-gray-400">2nd Prize:</div>
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    {event.second_prize.name}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-bronze-400">3rd Prize:</div>
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    {event.third_prize.name}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">About the Event</h3>
            <p className="text-gray-300 leading-relaxed">{event.description}</p>
          </div>

          {event.prize && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2">Prize Pool</h3>
              <p className="text-cyan-400 text-lg">{event.prize}</p>
            </div>
          )}

          <button
            onClick={handleRegister}
            disabled={!isRegistrationOpen}
            className={`w-full md:w-auto px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
              isRegistrationOpen
                ? 'bg-cyan-500 hover:bg-cyan-600 text-white'
                : 'bg-gray-600 cursor-not-allowed text-gray-300'
            }`}
          >
            {isRegistrationOpen ? 'Register Now' : 'Registration Closed'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;