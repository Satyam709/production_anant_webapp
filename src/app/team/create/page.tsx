'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import TeamCreateForm from '@/components/compete/TeamCreateForm'

export default function CreateTeamPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

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
        throw new Error('Failed to create team')
      }

      const data = await response.json()
      router.push(`/team/${data.team_id}`)
    } catch (error) {
      console.error('Error creating team:', error)
    } finally {
      setLoading(false)
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
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Create a New Team</h1>
          <TeamCreateForm 
            onSubmit={handleCreateTeam} 
            loading={loading} 
            onCancel={() => router.back()}
          />
        </div>
      </main>
      
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  )
}
