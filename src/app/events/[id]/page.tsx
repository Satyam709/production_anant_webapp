'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import EventDetails from '@/components/events/EventDetails'
import { Events } from '@prisma/client'

export default function EventPage() {
  const params = useParams()
  const [event, setEvent] = useState<Events | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/events/${params.id}`)
        if (!response.ok) throw new Error('Failed to fetch event')
        const data = await response.json()
        setEvent(data)
      } catch (error) {
        console.error('Error fetching event:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchEvent()
    }
  }, [params.id])

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
        ) : event ? (
          <EventDetails event={event} />
        ) : (
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold">Event not found</h2>
          </div>
        )}
      </main>
      
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  )
}
