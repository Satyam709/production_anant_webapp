'use server';
import { Calendar, Clock, Coins, MapPin, Trophy, Users } from 'lucide-react';
import React from 'react';
import Image from 'next/image';
import Register_Button from '@/components/compete/Register';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { getSession } from '@/lib/actions/Sessions';
import { EditorPreview } from '@/components/blogs/BlogPreview';

async function CompetitionDetails({ params }: { params: { id: string } }) {
  const { id } = await params;
  const response = await getCompi(id);
  const competition = await response.competition;
  const session = await getSession();
  const isLoggedin = session?.user ? true : false;
  const isRegistrationOpen =
    new Date() < new Date(competition.registration_deadline);

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  };

  return (
  <div>
    <Navbar />
    <div className="min-h-screen bg-[#0A0A0A] text-white p-1">
      <div className="max-w-7xl mx-auto my-32">
        <div className="relative w-full">
          <Image
            src={!competition.imageURL ? '/fallback-image.png' : competition.imageURL}
            alt={competition.competitionName}
            width={800}
            height={500}
            className="w-full h-auto object-cover rounded-xl shadow-2xl mb-8"
          />
          {!isRegistrationOpen && (
            <div className="absolute bottom-4 right-4 z-20 bg-red-500 text-white px-4 py-2 rounded-full">
              Registration Closed
            </div>
          )}
        </div>

        <div className="bg-gray-800 rounded-xl p-8 shadow-xl">
          <h1 className="text-4xl font-bold mb-6">{competition.competitionName}</h1>

          {/* Competition Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
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
                    <p className="font-semibold">
                      {formatDate(competition.registration_deadline)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="p-3 bg-gray-700/50 rounded-lg group-hover:bg-teal-500/20 transition-colors">
                    <Users className="text-teal-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Team Size</p>
                    <p className="font-semibold">
                      {competition.min_team_size} - {competition.max_team_size}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="p-3 bg-gray-700/50 rounded-lg group-hover:bg-teal-500/20 transition-colors">
                    <Calendar className="text-teal-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Event Date</p>
                    <p className="font-semibold">
                      {formatDate(competition.conductedOn)}
                    </p>
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
                    <p className="font-semibold">{competition.prize}</p>
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
                        <p className="font-semibold text-lg">
                          {competition.first_prize_name || 'TBD'}
                        </p>
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
                        <p className="font-semibold text-lg">
                          {competition.second_prize_name || 'TBD'}
                        </p>
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
                        <p className="font-semibold text-lg">
                          {competition.third_prize_name || 'TBD'}
                        </p>
                      </div>
                    </div>
                    <div className="text-amber-600 font-bold">3rd</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="mb-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-xl">
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
                About the Competition
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <EditorPreview content={competition.description} />
              </div>
            </div>
          </div>

          <Register_Button
            compi_id={competition.competition_id}
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

export default CompetitionDetails;

async function getCompi(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_URL}/api/competitions/${id}?participant=false`
    );
    if (!res.ok) {
      return [];
    }
    const data = await res.json();
    return data;
  } catch (err) {
    return [];
  }
}
