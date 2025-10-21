import { Competitions } from '@prisma/client';
import { Calendar, Trophy, Users } from 'lucide-react';
import React from 'react';

interface CompetitionDetailsProps {
  competition: Competitions;
  onJoin: () => void;
}

const CompetitionDetails: React.FC<CompetitionDetailsProps> = ({
  competition,
  onJoin,
}) => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-4 mt-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500">
        {competition.competitionName}
      </h1>

      <div className="flex items-center gap-4 text-gray-400 mb-8">
        <div className="flex items-center gap-2">
          <Calendar size={18} />
          <span>{new Date(competition.conductedOn).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <Trophy size={18} />
          <span>Prize: {competition.prize}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users size={18} />
          <span>Max Team Size: {competition.max_team_size}</span>
        </div>
      </div>

      <div className="prose prose-invert max-w-none mb-8">
        <p className="text-gray-300">{competition.description}</p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Details</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <h3 className="font-medium">Conducted By</h3>
                <p className="text-gray-400">{competition.conductedBy}</p>
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Venue</h3>
                <p className="text-gray-400">{competition.venue}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <h3 className="font-medium">Registration Deadline</h3>
                <p className="text-gray-400">
                  {new Date(
                    competition.registration_deadline
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-12">
        <button
          onClick={onJoin}
          className="px-6 py-2 rounded-lg bg-blue-500/10 text-cyan-400 border border-blue-500/20 hover:bg-blue-500/20 transition-all"
        >
          Join Competition
        </button>
      </div>
    </div>
  );
};

export default CompetitionDetails;
