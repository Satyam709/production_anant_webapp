import React from 'react'
import Image from 'next/image'
import { Calendar, Clock, MapPin } from 'lucide-react'
import GradientButton from '../ui/GradientButton'

interface EventCardProps {
  title: string
  date: string
  time: string
  venue: string
  description: string
  image: string
  registrationLink?: string
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  date,
  time,
  venue,
  description,
  image,
  registrationLink
}) => {
  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all">
      <div className="relative h-48">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
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
        <p className="text-gray-400 mb-4">{description}</p>
        {registrationLink && (
          <GradientButton href={registrationLink}>
            Register Now
          </GradientButton>
        )}
      </div>
    </div>
  )
}
export default EventCard