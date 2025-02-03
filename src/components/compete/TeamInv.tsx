import React from 'react';
import { Users, Check, X } from 'lucide-react';

const invitations = [
  {
    id: "1",
    teamName: "Code Wizards",
    competition: "Hackathon 2024",
    from: "John",
    role: "Developer",
  },
  {
    id: "2",
    teamName: "Code Wizards",
    competition: "Hackathon 2024",
    from: "Mike",
    role: "Team Lead",
  },
];

const TeamInv = () => {
  return (
    <section className="mb-20">
      <h2 className="text-3xl font-bold mb-10 text-center">Team Invitations</h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {invitations.map((invitation) => (
          <div
            key={invitation.id}
            className="bg-black/30 backdrop-blur-sm rounded-xl border border-gray-800 p-6 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-blue-500/10 rounded-full flex items-center justify-center">
                <Users className="text-cyan-400" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{invitation.teamName}</h3>
                <p className="text-gray-400">
                  {invitation.from} invited you to join as {invitation.role}
                </p>
                <p className="text-sm text-gray-500">For: {invitation.competition}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="p-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-all">
                <Check size={20} />
              </button>
              <button className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all">
                <X size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamInv;