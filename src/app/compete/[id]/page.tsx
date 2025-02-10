'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Competitions } from '@prisma/client'
import CompetitionDetails from '@/components/compete/CompetitionDetails'

export default function CompetitionPage() {
  const params = useParams()
  const [competition, setCompetition] = useState<Competitions | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCompetition = async () => {
      try {
        const response = await fetch(`/api/competitions/${params.id}`)
        if (!response.ok) throw new Error('Failed to fetch competition')
        const data = await response.json()
        setCompetition(data)
      } catch (error) {
        console.error('Error fetching competition:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchCompetition()
    }
  }, [params.id])

  const handleJoinCompetition = async () => {
    try {
      const response = await fetch(`/api/competitions/${params.id}/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (!response.ok) throw new Error('Failed to join competition')
      
      // Refresh competition data after joining
      const updatedComp = await response.json()
      setCompetition(updatedComp)
    } catch (error) {
      console.error('Error joining competition:', error)
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
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-blue"></div>
          </div>
        ) : competition ? (
          <CompetitionDetails 
            competition={competition} 
            onJoin={handleJoinCompetition} 
          />
        ) : (
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold">Competition not found</h2>
          </div>
        )}
      </main>
      
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  )
}
