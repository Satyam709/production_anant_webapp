import React from 'react'
import { members } from '@/constants/team'

const Members = () => {
  return (
    <section className="mb-20">
      <h2 className="text-3xl font-bold mb-10 text-center">Members</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.entries(members).map(([department, membersList]) => (
          <div key={department} className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
            <h3 className="text-xl font-semibold mb-4 text-primary-cyan">{department}</h3>
            <ul className="space-y-2">
              {membersList.map((member) => (
                <li key={member.name} className="text-gray-400">
                  {member.name} - {member.roll}
                </li>
              ))}
            </ul>
            
          </div>
        ))}
      </div>
    </section>
  )
}
export default Members