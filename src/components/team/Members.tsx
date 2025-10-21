import { club_dept_options } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { GitHub, Instagram,Linkedin } from 'react-feather';

import { TeamMember } from '@/lib/actions/AnantTeam';

// MemberCard Component

interface MemberCardProps {
  name: string;
  position?: string | null;
  email?: string | null;
  imageURL?: string | null;
  linkedIn?: string | null;
  github?: string | null;
  instagram?: string | null;
  club_dept?: string | null;
}

const MemberCard: React.FC<{
  member: MemberCardProps;
}> = ({ member }) => {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 shadow-xl rounded-2xl p-6 border border-gray-600 flex flex-col items-center text-center h-full transition-all transform hover:scale-105 hover:shadow-2xl duration-300">
      {/* Profile Image */}
      <div className="relative w-28 h-28 mb-4 rounded-full overflow-hidden shadow-md">
        <Image
          src={member.imageURL || '/default_profile.png'}
          alt={member.name}
          width={112}
          height={112}
          className="rounded-full object-cover"
        />
      </div>

      {/* Member Info */}
      <h4 className="text-xl font-semibold text-white">{member.name}</h4>
      <p className="text-sm text-gray-300 mt-1">
        {member.club_dept ? member.club_dept : 'General Team'}
      </p>
      {member.email && <p className="text-xs text-gray-400">{member.email}</p>}

      {/* Social Links */}
      <div className="flex gap-4 justify-center mt-4">
        {member.linkedIn && (
          <Link
            href={member.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin
              className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
              size={22}
            />
          </Link>
        )}
        {member.github && (
          <Link href={member.github} target="_blank" rel="noopener noreferrer">
            <GitHub
              className="text-gray-300 hover:text-gray-500 transition-colors duration-200"
              size={22}
            />
          </Link>
        )}
        {member.instagram && (
          <Link
            href={member.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram
              className="text-pink-500 hover:text-pink-700 transition-colors duration-200"
              size={22}
            />
          </Link>
        )}
      </div>
    </div>
  );
};

const teamText: Record<club_dept_options, string> = {
  [club_dept_options.Tech]: 'Tech Team',
  [club_dept_options.Content]: 'Content/Newsletter Team',
  [club_dept_options.PR]: 'PR/Social Media Team',
  [club_dept_options.Sponsorship]: 'Sponsorship Team',
  [club_dept_options.Management]: 'Management Team',
  [club_dept_options.Education_Outreach]: 'Education & Outreach Team',
  [club_dept_options.General]: 'General Team',
};

// Members Component
const Members = ({ members }: { members: TeamMember[] }) => {
  return (
    <section className="mb-20 px-6" id="executive-head">
      <h2 className="text-4xl font-extrabold mb-12 text-center text-gray-200">
        Executive Heads
      </h2>

      {Object.keys(teamText).map((teamKey) => {
        // filter members by team
        const teamMembers = members.filter(
          (member) =>
            member.club_dept &&
            member.club_dept.length > 0 &&
            member.club_dept.includes(teamKey as club_dept_options)
        );

        if (!teamMembers || teamMembers.length === 0) {
          return null; // Skip rendering if no members found
        }

        const teamDisplayName = teamText[teamKey as club_dept_options];
        return (
          <div key={teamKey} className="mb-16 ">
            <h3 className="text-2xl font-semibold mb-6 text-center text-gray-300 border-b border-gray-700 pb-2">
              {teamDisplayName}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {teamMembers.map((member) => (
                <MemberCard
                  key={member.id}
                  member={{ ...member, club_dept: teamDisplayName }}
                />
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default Members;
