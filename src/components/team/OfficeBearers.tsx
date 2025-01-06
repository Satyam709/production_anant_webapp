import React from 'react'
import MemberCard from './MemberCard'
import { officeBearers } from '@/constants/team'

const OfficeBearers = () => {
  return (
    <section className="mb-20">
      <h2 className="text-3xl font-bold mb-10 text-center">Office Bearers</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {officeBearers.map((member) => (
          <MemberCard key={member.name} {...member} />
        ))}
      </div>
    </section>
  )
}

export default OfficeBearers