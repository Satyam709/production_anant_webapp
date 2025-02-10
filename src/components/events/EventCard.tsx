'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Calendar, Clock, MapPin } from 'lucide-react'
import GradientButton from '../ui/GradientButton'

interface EventCardProps {
  id: string
  title: string
  date: string
  time: string
  venue: string
  description: string
  image: string
  registrationDeadline: Date
}

const EventCard: React.FC<EventCardProps> = ({
  id,
  title,
  date,
  time,
  venue,
  description,
  image,
  registrationDeadline
}) => {
  const router = useRouter()
  const isRegistrationOpen = new Date(registrationDeadline) > new Date()

  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all flex flex-col">
      <div className="relative h-48 cursor-pointer" onClick={() => router.push(`/events/${id}`)}>
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex-grow">
          <h3 className="text-xl font-semibold mb-3 cursor-pointer hover:text-primary-blue" 
              onClick={() => router.push(`/events/${id}`)}>{title}</h3>
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-gray-400">
              <Calendar size={16} />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Clock size={16} />
              <span>{time}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <MapPin size={16} />
              <span>{venue}</span>
            </div>
          </div>
          <p className="text-gray-400 mb-4 line-clamp-2">{description}</p>
        </div>
        <GradientButton 
          onClick={() => router.push(`/events/${id}`)} 
          disabled={!isRegistrationOpen}
        >
          {isRegistrationOpen ? 'View Details' : 'Registration Closed'}
        </GradientButton>
      </div>
    </div>
  )
}

export default EventCard