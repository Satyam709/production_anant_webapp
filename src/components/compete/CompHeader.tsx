import React from 'react';
import { Trophy, Users, Send } from 'lucide-react';

const CompHeader = () => {
  return (
    <div className="text-center mb-16">
      <h1 className="text-5xl font-bold mb-6 mt-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500">
        Competitions
      </h1>
      <p className="text-gray-400 max-w-2xl mx-auto">
        Form teams, participate in competitions, and showcase your skills on the global stage!
      </p>
      <div className="flex justify-center gap-4 mt-8">
        <button className="flex items-center gap-2 px-6 py-2 rounded-lg bg-blue-500/10 text-cyan-400 border border-blue-500/20 hover:bg-blue-500/20 transition-all">
          <Trophy size={18} />
          Active Competitions
        </button>
        <button className="flex items-center gap-2 px-6 py-2 rounded-lg bg-blue-500/10 text-cyan-400 border border-blue-500/20 hover:bg-blue-500/20 transition-all">
          <Users size={18} />
          My Teams
        </button>
        <button className="flex items-center gap-2 px-6 py-2 rounded-lg bg-blue-500/10 text-cyan-400 border border-blue-500/20 hover:bg-blue-500/20 transition-all">
          <Send size={18} />
          Invitations
        </button>
      </div>
    </div>
  );
};

export default CompHeader;