'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import TeamCreateForm from '@/components/compete/TeamCreateForm'
import TeamInvitationsList from '@/components/compete/TeamInvitationsList'
import TeamList from '@/components/compete/TeamList'
import GradientButton from '@/components/ui/GradientButton'
import { Pending_requests, Team, User } from '@prisma/client'

type InvitationWithDetails = Pending_requests & {
  team: Team & { team_leader: User }
  user: User
}

export default function MyTeamsPage() {
  const router = useRouter()
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [invitations, setInvitations] = useState<InvitationWithDetails[]>([])

  useEffect(() => {
    fetchInvitations()
  }, [])

  const fetchInvitations = async () => {
    try {
      const response = await fetch('/api/teams/invitations')
      if (!response.ok) throw new Error('Failed to fetch invitations')
      const data = await response.json()
      setInvitations(data)
    } catch (error) {
      console.error('Error fetching invitations:', error)
    }
  }

  const handleCreateTeam = async (formData: { team_name: string }) => {
    setLoading(true)
    try {
      const response = await fetch('/api/teams/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Failed to create team')
      }

      const data = await response.json()
      router.push(`/team/${data.team_id}`)
    } catch (error) {
      console.error('Error creating team:', error)
    } finally {
      setLoading(false)
      setShowCreateForm(false)
    }
  }

  const handleAcceptInvitation = async (requestId: string) => {
    try {
      const response = await fetch(`/api/teams/invitations/${requestId}/accept`, {
        method: 'POST',
      })
      if (!response.ok) throw new Error('Failed to accept invitation')
      fetchInvitations()
    } catch (error) {
      console.error('Error accepting invitation:', error)
    }
  }

  const handleRejectInvitation = async (requestId: string) => {
    try {
      const response = await fetch(`/api/teams/invitations/${requestId}/reject`, {
        method: 'POST',
      })
      if (!response.ok) throw new Error('Failed to reject invitation')
      fetchInvitations()
    } catch (error) {
      console.error('Error rejecting invitation:', error)
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="fixed inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-blue/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-primary-purple/10 rounded-full blur-[100px]" />
      </div>
      
      <Navbar />
      
      <main className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 mt-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500">My Teams</h1>
          <p className="text-gray-400 mb-8">
            Create or join teams to participate in competitions together!
          </p>
          {!showCreateForm && (
            <GradientButton onClick={() => setShowCreateForm(true)}>
              Create Team
            </GradientButton>
          )}
        </div>
        <div className="max-w-4xl mx-auto">

          {showCreateForm ? (
            <div className="mb-12">
              <TeamCreateForm 
                onSubmit={handleCreateTeam}
                loading={loading}
                onCancel={() => setShowCreateForm(false)} 
              />
            </div>
          ) : (
            <div className="space-y-12">
              {/* My Teams Section */}
              <section>
                <h2 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500">Teams I&apos;m Part Of</h2>
                <TeamList />
              </section>

              {/* Team Invitations Section */}
              <section>
                <h2 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500">Team Invitations</h2>
                <TeamInvitationsList 
                  invitations={invitations}
                  onAccept={handleAcceptInvitation}
                  onReject={handleRejectInvitation}
                />
              </section>
            </div>
          )}
        </div>
      </main>
      
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  )
}
