'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Team, User } from '@prisma/client'
import { Users } from 'lucide-react'

type TeamWithMembers = Team & {
  team_leader: User
  team_members: User[]
}

export default function TeamList() {
  const [teams, setTeams] = useState<TeamWithMembers[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch('/api/teams/my-teams')
        if (!response.ok) throw new Error('Failed to fetch teams')
        const data = await response.json()
        setTeams(data)
      } catch (error) {
        console.error('Error fetching teams:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTeams()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-blue"></div>
      </div>
    )
  }

  if (teams.length === 0) {
    return (
      <div className="bg-black/30 backdrop-blur-sm rounded-xl p-8 border border-gray-800 text-center">
        <p className="text-gray-400 mb-4">You haven&apos;t joined any teams yet.</p>
        <p className="text-sm text-gray-500">Create a team or accept an invitation to get started!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {teams.map((team) => (
        <Link
          key={team.team_id}
          href={`/compete/teams/${team.team_id}`}
          className="block bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-all"
        >
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-xl font-semibold">{team.team_name}</h3>
            <span className="px-3 py-1 rounded-full bg-primary-blue/10 text-primary-blue text-sm">
              {team.team_leader.id === team.team_leader.id ? 'Leader' : 'Member'}
            </span>
          </div>

          <div className="flex items-center gap-2 text-gray-400 mb-4">
            <Users size={16} />
            <span>{team.team_members.length + 1} members</span>
          </div>

          <div className="flex -space-x-3">
            {/* Team Leader */}
            <div className="relative w-8 h-8 rounded-full border-2 border-black/30 overflow-hidden">
              {team.team_leader.imageURL ? (
                <Image
                  src={team.team_leader.imageURL}
                  alt={team.team_leader.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-primary-blue/20 flex items-center justify-center text-sm">
                  {team.team_leader.name[0]}
                </div>
              )}
            </div>

            {/* Team Members (up to 3) */}
            {team.team_members.slice(0, 3).map((member) => (
              <div
                key={member.id}
                className="relative w-8 h-8 rounded-full border-2 border-black/30 overflow-hidden"
              >
                {member.imageURL ? (
                  <Image
                    src={member.imageURL}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center text-sm">
                    {member.name[0]}
                  </div>
                )}
              </div>
            ))}

            {/* Show count of additional members */}
            {team.team_members.length > 3 && (
              <div className="relative w-8 h-8 rounded-full border-2 border-black/30 bg-gray-800 flex items-center justify-center text-sm">
                +{team.team_members.length - 3}
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  )
}
