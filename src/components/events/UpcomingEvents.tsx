import React from 'react'
import EventCard from './EventCard'
import { upcomingEvents } from '@/constants/events-data'

const UpcomingEvents = () => {
  return (
    <section className="mb-20">
      <h2 className="text-3xl font-bold mb-10 text-center">Upcoming Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {upcomingEvents.map((event, index) => (
          <EventCard key={index} {...event} />
        ))}
      </div>
    </section>
  )
}
export default UpcomingEvents