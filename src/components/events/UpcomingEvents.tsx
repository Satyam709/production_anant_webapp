'use client'

import React, { useEffect, useState } from 'react'
import EventCard from './EventCard'
import { Events } from '@prisma/client'

const UpcomingEvents = () => {
  const [events, setEvents] = useState<Events[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events')
        if (!response.ok) throw new Error('Failed to fetch events')
        const data = await response.json()
        // Filter for upcoming events
        const now = new Date()
        const upcomingEvents = data.filter((event: Events) => 
          new Date(event.conductedOn) > now
        )
        setEvents(upcomingEvents)
      } catch (error) {
        console.error('Error fetching events:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  if (loading) {
    return (
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-10 text-center">Upcoming Events</h2>
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-blue"></div>
        </div>
      </section>
    )
  }

  return (
    <section className="mb-20">
      <h2 className="text-3xl font-bold mb-10 text-center">Upcoming Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <EventCard
            key={event.event_id}
            id={event.event_id}
            title={event.eventName}
            date={new Date(event.conductedOn).toLocaleDateString()}
            time={new Date(event.conductedOn).toLocaleTimeString()}
            venue={event.venue}
            description={event.description}
            image={event.imageURL || '/event-default.jpg'}
            registrationDeadline={event.registration_deadline}
          />
        ))}
      </div>
    </section>
  )
}

export default UpcomingEvents