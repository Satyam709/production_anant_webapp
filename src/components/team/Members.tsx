import React from "react";
import { Linkedin, GitHub, Instagram } from "react-feather";
import Link from "next/link";
import Image from "next/image";
import { AnantTeamMember, club_dept_options, User } from "@prisma/client";
import { getMail } from "@/helpers/extras";

interface Member extends AnantTeamMember, User {}

// MemberCard Component
const MemberCard: React.FC<{
  member: Member;
}> = ({ member }) => {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 shadow-xl rounded-2xl p-6 border border-gray-600 flex flex-col items-center text-center h-full transition-all transform hover:scale-105 hover:shadow-2xl duration-300">
      {/* Profile Image */}
      <div className="relative w-28 h-28 mb-4 rounded-full overflow-hidden shadow-md">
        <Image
          src={member.imageURL || "/default_profile.png"}
          alt={member.name}
          width={112}
          height={112}
          className="rounded-full object-cover"
        />
      </div>

      {/* Member Info */}
      <h4 className="text-xl font-semibold text-white">{member.name}</h4>
      <p className="text-sm text-gray-300 mt-1">
        {teamText[member.club_dept[0]]}
      </p>
      {member.roll_number && (
        <p className="text-xs text-gray-400">
          {getMail(member.roll_number + "")}
        </p>
      )}

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
  [club_dept_options.Tech]: "Tech Team",
  [club_dept_options.Content]: "Content/Newsletter Team",
  [club_dept_options.PR]: "PR/Social Media Team",
  [club_dept_options.Sponsorship]: "Sponsorship Team",
  [club_dept_options.Management]: "Management Team",
  [club_dept_options.Education_Outreach]: "Education & Outreach Team",
  [club_dept_options.General]: "General Team",
};

// Members Component
const Members = ({ members }: { members: Member[] }) => {
  return (
    <section className="mb-20 px-6" id="executive-head">
      <h2 className="text-4xl font-extrabold mb-12 text-center text-gray-200">
        Executive Heads
      </h2>

      {Object.keys(teamText).map((teamName) => {
        // filter members by team
        const teamMembers = members.filter(
          (member) => teamText[member.club_dept[0]] === teamName
        );

        if (!teamMembers || teamMembers.length === 0) {
          console.log(`No members found for ${teamName}`);
          return null; // Skip rendering if no members found
        }

        const teamDisplayName = teamText[teamName as club_dept_options];
        return (
          <div key={teamName} className="mb-16">
            <h3 className="text-2xl font-bold mb-6 text-gray-100 text-center">
              {teamDisplayName}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {teamMembers.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default Members;
