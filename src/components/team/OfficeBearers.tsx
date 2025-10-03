import React from "react";
import { Linkedin, GitHub, Instagram } from "react-feather";
import Link from "next/link";
import Image from "next/image";
import { officeBearersData } from "@/data/AnantTeam";
import { Globe } from "lucide-react";
import { AnantTeamMember, User } from "@prisma/client";
import { getMail } from "@/helpers/extras";

interface Member extends AnantTeamMember, User {}

// MemberCard Component (Now OfficeBearerCard)
const OfficeBearerCard: React.FC<{ member: Member }> = ({ member }) => {
  return (
    <div className="group bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 shadow-xl rounded-2xl p-6 border border-gray-600 flex flex-col items-center text-center h-full min-h-[300px] transition-all transform hover:scale-105 hover:shadow-2xl duration-300">
      {/* Profile Image */}
      <div className="relative w-28 h-28 mb-4 rounded-full overflow-hidden shadow-md ring-2 ring-gray-500 group-hover:ring-blue-500 transition-shadow duration-300">
        <Image
          src={member.imageURL || "/default_profile.png"}
          alt={member.name}
          width={112}
          height={112}
          className="rounded-full object-cover"
        />
      </div>

      {/* Member Info */}
      <h4 className="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors duration-300">
        {member.name}
      </h4>
      <p className="text-sm text-gray-300 mt-1">{member.role}</p>
      {member.roll_number && (
        <p className="text-xs text-gray-400 hover:text-gray-300 transition-colors duration-200">
          {getMail(member.roll_number + "")}
        </p>
      )}
      {member.phone && (
        <p className="text-xs text-gray-400 hover:text-gray-300 transition-colors duration-200">
          {member.phone}
        </p>
      )}

      {/* Social Links */}
      <div className="flex gap-4 justify-center mt-auto">
        {member.linkedIn && (
          <Link
            href={member.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin
              className="text-blue-500 hover:text-blue-700 transition-colors duration-200 group-hover:text-blue-400"
              size={22}
            />
          </Link>
        )}
        {member.website && (
          <Link href={member.website} target="_blank" rel="noopener noreferrer">
            <Globe
              className="text-gray-300 hover:text-gray-500 transition-colors duration-200 group-hover:text-gray-400"
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
              className="text-pink-500 hover:text-pink-700 transition-colors duration-200 group-hover:text-pink-400"
              size={22}
            />
          </Link>
        )}
      </div>
    </div>
  );
};

// OfficeBearers Component (Now using OfficeBearerCard)
const OfficeBearers: React.FC<{ members: Member[] }> = ({ members }) => {
  return (
    <section className="mb-20 px-6" id="office-bearers">
      <h2 className="text-4xl font-extrabold mb-12 text-center text-gray-200">
        Office Bearers
      </h2>

      {/* Office Bearers */}
      {members.length > 0 && (
        <div className="mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {members.map((member) => (
              <div key={member.id} className="w-full">
                <OfficeBearerCard member={member} />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default OfficeBearers;
