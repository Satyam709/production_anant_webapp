import React, { useState } from 'react';
import { Users, UserPlus, Send, Plus, Pencil, Trash2, Loader } from 'lucide-react';
import GradientButton from '../ui/GradientButton';
import Modal from '../ui/Modal';
import StatusModal from '../ui/StatusModal';

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

interface StatusMessage {
  type: 'success' | 'error' | 'confirm';
  title: string;
  message: string;
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

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [statusModal, setStatusModal] = useState<StatusMessage | null>(null);
  const [teamToDelete, setTeamToDelete] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const [newMemberRoll, setNewMemberRoll] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const createTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim()) {
      setLoading(true);
      try {
        const newTeam: Team = {
          id: Date.now().toString(),
          name: formData.name,
          description: formData.description,
          members: [],
          createdAt: new Date(),
        };
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
        setTeams([...teams, newTeam]);
        setIsCreateModalOpen(false);
        setFormData({ name: '', description: '' });
        setStatusModal({
          type: 'success',
          title: 'Team Created',
          message: 'The team has been created successfully.',
        });
      } catch (err) {
        setStatusModal({
          type: 'error',
          title: 'Error',
          message: 'Failed to create team. Please try again.',
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const editTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTeam && formData.name.trim()) {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
        const updatedTeams = teams.map(team => {
          if (team.id === selectedTeam.id) {
            return {
              ...team,
              name: formData.name,
              description: formData.description,
            };
          }
          return team;
        });
        setTeams(updatedTeams);
        setIsEditModalOpen(false);
        setSelectedTeam(null);
        setFormData({ name: '', description: '' });
        setStatusModal({
          type: 'success',
          title: 'Team Updated',
          message: 'The team has been updated successfully.',
        });
      } catch (err) {
        setStatusModal({
          type: 'error',
          title: 'Error',
          message: 'Failed to update team. Please try again.',
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const confirmDeleteTeam = (teamId: string) => {
    setTeamToDelete(teamId);
    setStatusModal({
      type: 'confirm',
      title: 'Delete Team',
      message: 'Are you sure you want to delete this team? This action cannot be undone.',
    });
  };

  const deleteTeam = async () => {
    if (teamToDelete) {
      try {
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
        setTeams(teams.filter(team => team.id !== teamToDelete));
        setStatusModal({
          type: 'success',
          title: 'Team Deleted',
          message: 'The team has been deleted successfully.',
        });
      } catch (err) {
        setStatusModal({
          type: 'error',
          title: 'Error',
          message: 'Failed to delete team. Please try again.',
        });
      } finally {
        setTeamToDelete(null);
      }
    }
  };

  const addMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTeam && newMemberRoll.trim()) {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
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
        setIsAddMemberModalOpen(false);
        setSelectedTeam(null);
        setNewMemberRoll('');
        setStatusModal({
          type: 'success',
          title: 'Member Added',
          message: 'The member has been added to the team successfully.',
        });
      } catch (err) {
        setStatusModal({
          type: 'error',
          title: 'Error',
          message: 'Failed to add member. Please try again.',
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEditClick = (team: Team) => {
    setSelectedTeam(team);
    setFormData({
      name: team.name,
      description: team.description || '',
    });
    setIsEditModalOpen(true);
  };

  const handleAddMemberClick = (team: Team) => {
    setSelectedTeam(team);
    setIsAddMemberModalOpen(true);
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
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Users className="text-primary-cyan" size={24} />
              <h2 className="text-xl font-semibold text-white">Teams You Lead</h2>
            </div>
            <GradientButton type="button" onClick={() => setIsCreateModalOpen(true)}>
              <div className="flex items-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>Create Team</span>
              </div>
            </GradientButton>
          </div>
          <div className="space-y-4">
            {teams.map(team => (
              <div key={team.id} className="bg-gray-900/50 p-4 rounded-lg border border-gray-800/30 hover:border-primary-blue/50 transition-all duration-200">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-white text-lg">{team.name}</h3>
                    <p className="text-gray-400 text-sm">{team.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEditClick(team)}
                      className="p-2 text-gray-400 hover:text-primary-cyan transition-colors"
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => confirmDeleteTeam(team.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleAddMemberClick(team)}
                      className="text-primary-cyan hover:text-primary-blue text-sm bg-gray-900/50 px-3 py-1 rounded-md transition-colors"
                    >
                      Add Member
                    </button>
                  </div>
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

      {/* Create Team Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Team"
      >
        <form onSubmit={createTeam} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Team Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                       focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                       text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-200"
              placeholder="Enter team name"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                       focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                       text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-200"
              placeholder="Enter team description"
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
              className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <GradientButton disabled={loading}>
              <div className="flex items-center space-x-2">
                {loading ? (
                  <Loader className="h-5 w-5 animate-spin" />
                ) : (
                  <Plus className="h-5 w-5" />
                )}
                <span>{loading ? 'Creating...' : 'Create Team'}</span>
              </div>
            </GradientButton>
          </div>
        </form>
      </Modal>

      {/* Edit Team Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedTeam(null);
        }}
        title="Edit Team"
      >
        <form onSubmit={editTeam} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Team Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                       focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                       text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-200"
              placeholder="Enter team name"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                       focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                       text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-200"
              placeholder="Enter team description"
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => {
                setIsEditModalOpen(false);
                setSelectedTeam(null);
              }}
              className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <GradientButton disabled={loading}>
              <div className="flex items-center space-x-2">
                {loading ? (
                  <Loader className="h-5 w-5 animate-spin" />
                ) : (
                  <Pencil className="h-5 w-5" />
                )}
                <span>{loading ? 'Updating...' : 'Update Team'}</span>
              </div>
            </GradientButton>
          </div>
        </form>
      </Modal>

      {/* Add Member Modal */}
      <Modal
        isOpen={isAddMemberModalOpen}
        onClose={() => {
          setIsAddMemberModalOpen(false);
          setSelectedTeam(null);
        }}
        title={`Add Member to ${selectedTeam?.name}`}
      >
        <form onSubmit={addMember} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Roll Number
            </label>
            <input
              type="text"
              value={newMemberRoll}
              onChange={(e) => setNewMemberRoll(e.target.value)}
              className="w-full px-4 py-2.5 bg-black/30 border border-gray-700 rounded-lg
                       focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue/50
                       text-white placeholder-gray-500 backdrop-blur-sm transition-all duration-200"
              placeholder="Enter roll number"
              required
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => {
                setIsAddMemberModalOpen(false);
                setSelectedTeam(null);
              }}
              className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <GradientButton disabled={loading}>
              <div className="flex items-center space-x-2">
                {loading ? (
                  <Loader className="h-5 w-5 animate-spin" />
                ) : (
                  <UserPlus className="h-5 w-5" />
                )}
                <span>{loading ? 'Adding...' : 'Add Member'}</span>
              </div>
            </GradientButton>
          </div>
        </form>
      </Modal>

      {/* Status Modal */}
      <StatusModal
        isOpen={statusModal !== null}
        onClose={() => setStatusModal(null)}
        title={statusModal?.title || ''}
        message={statusModal?.message || ''}
        type={statusModal?.type || 'success'}
        onConfirm={statusModal?.type === 'confirm' ? deleteTeam : undefined}
      />
    </div>
  );
};

export default TeamDashboard;