import React from 'react'
import Image from 'next/image'
import { Instagram, Linkedin, Mail, Phone } from 'lucide-react'

interface MemberCardProps {
  name: string
  position: string
  image: string
  email: string
  phone?: string
  social: {
    instagram?: string
    linkedin?: string
  }
  department?: string
}

const MemberCard: React.FC<MemberCardProps> = ({
  name,
  position,
  image,
  email,
  phone,
  social,
  department
}) => {
  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-all">
      <div className="flex flex-col items-center">
        <div className="w-32 h-32 relative mb-4">
          <Image
            src={image}
            alt={name}
            width={128}
            height={128}
            className="rounded-full object-cover border-4 border-primary-blue/20"
          />
        </div>
        <h3 className="text-xl font-semibold mb-1">{name}</h3>
        <p className="text-gray-400 mb-2">{position}</p>
        {department && (
          <span className="px-3 py-1 bg-primary-blue/10 text-primary-cyan text-sm rounded-full mb-4">
            {department}
          </span>
        )}
        <div className="flex gap-3 mt-2">
          {social.instagram && (
            <a href={social.instagram} className="text-gray-400 hover:text-primary-cyan transition-colors">
              <Instagram size={20} />
            </a>
          )}
          {social.linkedin && (
            <a href={social.linkedin} className="text-gray-400 hover:text-primary-cyan transition-colors">
              <Linkedin size={20} />
            </a>
          )}
          <a href={`mailto:${email}`} className="text-gray-400 hover:text-primary-cyan transition-colors">
            <Mail size={20} />
          </a>
          {phone && (
            <a href={`tel:${phone}`} className="text-gray-400 hover:text-primary-cyan transition-colors">
              <Phone size={20} />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
export default MemberCard