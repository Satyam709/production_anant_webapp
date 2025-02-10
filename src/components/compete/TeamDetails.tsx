import React from 'react'
import { Team, User } from '@prisma/client'
import { Users } from 'lucide-react'

interface TeamDetailsProps {
  team: Team & {
    team_leader: User
    team_members: User[]
  }
}

const TeamDetails: React.FC<TeamDetailsProps> = ({ team }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-4 mt-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500">
        {team.team_name}
      </h1>
      
      <div className="flex items-center gap-4 text-gray-400 mb-8">
        <div className="flex items-center gap-2">
          <Users size={18} />
          <span>{team.team_members.length + 1} members</span>
        </div>
      </div>

      <div className="bg-gray-800/50 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Team Members</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <p className="font-medium">{team.team_leader.name}</p>
              <p className="text-sm text-gray-400">Roll: {team.team_leader.roll_number} (Team Leader)</p>
            </div>
          </div>
          {team.team_members.map((member) => (
            <div key={member.id} className="flex items-center gap-4">
              <div className="flex-1">
                <p className="font-medium">{member.name}</p>
                <p className="text-sm text-gray-400">Roll: {member.roll_number}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TeamDetails
