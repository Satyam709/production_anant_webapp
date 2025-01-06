import React from 'react'
import MemberCard from './MemberCard'
import { executiveHeads } from '@/constants/team'

const ExecutiveHeads = () => {
  return (
    <section className="mb-20">
      <h2 className="text-3xl font-bold mb-10 text-center">Executive Heads</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {executiveHeads.map((member) => (
          <MemberCard key={member.name} {...member} />
        ))}
      </div>
    </section>
  )
}
export default ExecutiveHeads