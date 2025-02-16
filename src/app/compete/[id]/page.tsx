"use server";
import React from 'react';
import { Trophy, Users, Calendar, MapPin, Clock, Coins } from 'lucide-react';
import Register_Button from '@/components/compete/Register';

async function CompetitionDetails({ params }: { params: { id: string } }) {

  const { id } = await params;
  const response = await getCompi(id);
  const competition = response.competition;
  // console.log(competition);
  const isRegistrationOpen = new Date() < new Date(competition.registration_deadline);

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={competition.imageURL==""?null:competition.imageURL}
            alt="Hackathon background"
            className="w-full h-full object-cover opacity-20 scale-105 transform hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">
            {competition.competitionName}
          </h1>
        </div>
      </div>

      {/* Competition Details */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-xl">
          <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
            Competition Details
          </h2>
          <div className="space-y-6">
            <div className="flex items-center gap-4 group">
              <div className="p-3 bg-gray-700/50 rounded-lg group-hover:bg-teal-500/20 transition-colors">
                <Users className="text-teal-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Conducted by</p>
                <p className="font-semibold">{competition.conductedBy}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="p-3 bg-gray-700/50 rounded-lg group-hover:bg-teal-500/20 transition-colors">
                <Clock className="text-teal-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Registration Deadline</p>
                <p className="font-semibold">{formatDate(competition.registration_deadline)}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="p-3 bg-gray-700/50 rounded-lg group-hover:bg-teal-500/20 transition-colors">
                <Users className="text-teal-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Team Size</p>
                <p className="font-semibold">{competition.min_team_size} - {competition.max_team_size}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="p-3 bg-gray-700/50 rounded-lg group-hover:bg-teal-500/20 transition-colors">
                <Calendar className="text-teal-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Event Date</p>
                <p className="font-semibold">{formatDate(competition.conductedOn)}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="p-3 bg-gray-700/50 rounded-lg group-hover:bg-teal-500/20 transition-colors">
                <MapPin className="text-teal-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Venue</p>
                <p className="font-semibold">{competition.venue}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="p-3 bg-gray-700/50 rounded-lg group-hover:bg-teal-500/20 transition-colors">
                <Coins className="text-teal-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Prize Pool</p>
                <p className="font-semibold">{competition.prize} Total Prize Pool</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-xl">
          <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
            Prize Distribution
          </h2>
          <div className="space-y-6">
            <div className="group p-6 bg-gray-700/50 rounded-xl hover:bg-gray-700/70 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-yellow-500/20 rounded-lg">
                    <Trophy className="text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">First Prize</p>
                    <p className="font-semibold text-lg">{competition.first_prize_id || "TBD"}</p>
                  </div>
                </div>
                <div className="text-yellow-400 font-bold">1st</div>
              </div>
            </div>
            <div className="group p-6 bg-gray-700/50 rounded-xl hover:bg-gray-700/70 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gray-500/20 rounded-lg">
                    <Trophy className="text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Second Prize</p>
                    <p className="font-semibold text-lg">{competition.second_prize_id || "TBD"}</p>
                  </div>
                </div>
                <div className="text-gray-400 font-bold">2nd</div>
              </div>
            </div>
            <div className="group p-6 bg-gray-700/50 rounded-xl hover:bg-gray-700/70 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-amber-600/20 rounded-lg">
                    <Trophy className="text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Third Prize</p>
                    <p className="font-semibold text-lg">{competition.third_prize_id || "TBD"}</p>
                  </div>
                </div>
                <div className="text-amber-600 font-bold">3rd</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-xl">
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
            About the Competition
          </h2>
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>{competition.description}</p>
          </div>
        </div>
      </div>

    <Register_Button compi_id={competition.competition_id} isRegistrationOpen={isRegistrationOpen} />
    </div>

  );
}

export default CompetitionDetails;

async function getCompi(id: string){
  try{
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/competitions/${id}?participant=false`);
    // console.log(res);
    if(!res.ok){
      return [];
    }
    const data = await res.json(); 
    // console.log(data);
    return data;
  }
  catch(err){
    return [];
  }
}