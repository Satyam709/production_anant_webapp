import React, { useState } from 'react';
import { Users, UserPlus, Send, Plus } from 'lucide-react';
import GradientButton from '../ui/GradientButton';

interface Team {
  id: string;
  name: string;
  members: string[];
  description?: string;
  createdAt: Date;
}

interface Invitation {
  id: string;
  teamName: string;
  from: string;
  role: string;
  sentAt: Date;
}

const TeamDashboard = () => {
  const [teams, setTeams] = useState<Team[]>([
    {
      id: '1',
      name: 'Web Development Team',
      members: ['21CS101', '21CS102', '21CS103'],
      description: 'Frontend and Backend development team',
      createdAt: new Date('2024-02-15'),
    },
    {
      id: '2',
      name: 'AI Research Group',
      members: ['21CS201', '21CS202', '21CS204', '21CS205'],
      description: 'Research on machine learning algorithms',
      createdAt: new Date('2024-01-20'),
    },
  ]);

  const [memberTeams, setMemberTeams] = useState<Team[]>([
    {
      id: '4',
      name: 'Competitive Programming',
      members: ['21CS401', '21CS402', '21CS403', '21CS404'],
      description: 'Practice and compete in coding contests',
      createdAt: new Date('2024-02-01'),
    },
  ]);

  const [invitations, setInvitations] = useState<Invitation[]>([
    {
      id: '1',
      teamName: 'Cloud Computing Team',
      from: 'Prof. Sarah Johnson',
      role: 'Member',
      sentAt: new Date('2024-03-10'),
    },
  ]);

  const [newTeamName, setNewTeamName] = useState('');
  const [newMemberRoll, setNewMemberRoll] = useState('');
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  const createTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTeamName.trim()) {
      const newTeam: Team = {
        id: Date.now().toString(),
        name: newTeamName,
        members: [],
        createdAt: new Date(),
      };
      setTeams([...teams, newTeam]);
      setNewTeamName('');
    }
  };

  const addMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTeam && newMemberRoll.trim()) {
      const updatedTeams = teams.map(team => {
        if (team.id === selectedTeam.id) {
          return {
            ...team,
            members: [...team.members, newMemberRoll],
          };
        }
        return team;
      });
      setTeams(updatedTeams);
      setNewMemberRoll('');
      setSelectedTeam(null);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Teams Leading Section */}
        <div className="backdrop-blur-xl bg-black/30 p-8 rounded-2xl border border-gray-800 shadow-xl">
          <div className="flex items-center gap-2 mb-6">
            <Users className="text-primary-cyan" size={24} />
            <h2 className="text-xl font-semibold text-white">Teams You Lead</h2>
          </div>
          <div className="space-y-4">
            {teams.map(team => (
              <div key={team.id} className="bg-gray-900/50 p-4 rounded-lg border border-gray-800/30 hover:border-primary-blue/50 transition-all duration-200">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-white text-lg">{team.name}</h3>
                    <p className="text-gray-400 text-sm">{team.description}</p>
                  </div>
                  <button
                    onClick={() => setSelectedTeam(team)}
                    className="text-primary-cyan hover:text-primary-blue text-sm bg-gray-900/50 px-3 py-1 rounded-md transition-colors"
                  >
                    Add Member
                  </button>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex -space-x-2">
                    {team.members.slice(0, 3).map((member, idx) => (
                      <div
                        key={idx}
                        className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-blue to-primary-cyan border-2 border-gray-900 flex items-center justify-center text-xs text-white"
                      >
                        {member.slice(-2)}
                      </div>
                    ))}
                    {team.members.length > 3 && (
                      <div className="w-8 h-8 rounded-full bg-gray-700 border-2 border-gray-900 flex items-center justify-center text-xs text-white">
                        +{team.members.length - 3}
                      </div>
                    )}
                  </div>
                  <span className="text-gray-400 text-sm">Created {formatDate(team.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Teams Member Of Section */}
        <div className="backdrop-blur-xl bg-black/30 p-8 rounded-2xl border border-gray-800 shadow-xl">
          <div className="flex items-center gap-2 mb-6">
            <UserPlus className="text-primary-cyan" size={24} />
            <h2 className="text-xl font-semibold text-white">Teams You're Part Of</h2>
          </div>
          <div className="space-y-4">
            {memberTeams.map(team => (
              <div key={team.id} className="bg-gray-900/50 p-4 rounded-lg border border-gray-800/30 hover:border-primary-blue/50 transition-all duration-200">
                <div className="mb-2">
                  <h3 className="font-medium text-white text-lg">{team.name}</h3>
                  <p className="text-gray-400 text-sm">{team.description}</p>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex -space-x-2">
                    {team.members.slice(0, 3).map((member, idx) => (
                      <div
                        key={idx}
                        className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-blue to-primary-cyan border-2 border-gray-900 flex items-center justify-center text-xs text-white"
                      >
                        {member.slice(-2)}
                      </div>
                    ))}
                    {team.members.length > 3 && (
                      <div className="w-8 h-8 rounded-full bg-gray-700 border-2 border-gray-900 flex items-center justify-center text-xs text-white">
                        +{team.members.length - 3}
                      </div>
                    )}
                  </div>
                  <span className="text-gray-400 text-sm">Joined {formatDate(team.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Create Team Section */}
        <div className="backdrop-blur-xl bg-black/30 p-8 rounded-2xl border border-gray-800 shadow-xl">
          <div className="flex items-center gap-2 mb-6">
            <Plus className="text-primary-cyan" size={24} />
            <h2 className="text-xl font-semibold text-white">Create New Team</h2>
          </div>
          <form onSubmit={createTeam} className="space-y-4">
            <div>
              <label htmlFor="teamName" className="block text-sm font-medium mb-2 text-gray-300">
                Team Name
              </label>
              <input
                type="text"
                id="teamName"
                value={newTeamName}
                onChange={(e) => setNewTeamName(e.target.value)}
                className="w-full px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                         focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                         text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-200"
                placeholder="Enter team name"
              />
            </div>
            <GradientButton type="submit">
              <div className="flex items-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>Create Team</span>
              </div>
            </GradientButton>
          </form>
        </div>

        {/* Team Invitations Section */}
        <div className="backdrop-blur-xl bg-black/30 p-8 rounded-2xl border border-gray-800 shadow-xl">
          <div className="flex items-center gap-2 mb-6">
            <Send className="text-primary-cyan" size={24} />
            <h2 className="text-xl font-semibold text-white">Team Invitations</h2>
          </div>
          <div className="space-y-4">
            {invitations.map(invitation => (
              <div key={invitation.id} className="bg-gray-900/50 p-4 rounded-lg border border-gray-800/30 hover:border-primary-blue/50 transition-all duration-200">
                <div className="mb-3">
                  <h3 className="font-medium text-white text-lg">{invitation.teamName}</h3>
                  <p className="text-gray-400 text-sm">
                    Invited by {invitation.from} • Role: {invitation.role}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">
                    Sent {formatDate(invitation.sentAt)}
                  </span>
                  <div className="space-x-2">
                    <button className="bg-gradient-to-r from-primary-blue to-primary-cyan hover:from-primary-blue/90 hover:to-primary-cyan/90 text-white px-4 py-2 rounded-md text-sm transition-colors">
                      Accept
                    </button>
                    <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm transition-colors">
                      Decline
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {invitations.length === 0 && (
              <p className="text-gray-400 text-sm">No pending invitations</p>
            )}
          </div>
        </div>
      </div>

      {/* Add Member Modal */}
      {selectedTeam && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900/90 rounded-lg p-6 max-w-md w-full border border-gray-800">
            <h2 className="text-xl font-semibold mb-4 text-white">
              Add Member to {selectedTeam.name}
            </h2>
            <form onSubmit={addMember} className="space-y-4">
              <div>
                <label htmlFor="rollNumber" className="block text-sm font-medium mb-2 text-gray-300">
                  Roll Number
                </label>
                <input
                  type="text"
                  id="rollNumber"
                  value={newMemberRoll}
                  onChange={(e) => setNewMemberRoll(e.target.value)}
                  className="w-full px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                           focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                           text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-200"
                  placeholder="Enter roll number"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setSelectedTeam(null)}
                  className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <GradientButton type="submit">
                  Add Member
                </GradientButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamDashboard;