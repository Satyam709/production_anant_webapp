import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { team } from '@/constants/team';
import Image from 'next/image';
const Team = () => {
  return (
    <div id="team" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Team</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Meet the brilliant minds behind Anant
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div key={index} className="bg-gray-800/50 rounded-lg p-6 text-center hover:transform hover:-translate-y-1 transition-all">
              <Image
                src={member.image}
                alt={member.name}
                width={128}
                height={128}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
              <p className="text-gray-400 mb-4">{member.role}</p>
              <div className="flex justify-center space-x-4">
                <a href={member.social.linkedin} className="text-gray-400 hover:text-blue-500">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href={member.social.github} className="text-gray-400 hover:text-blue-500">
                  <Github className="h-5 w-5" />
                </a>
                <a href={member.social.email} className="text-gray-400 hover:text-blue-500">
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;