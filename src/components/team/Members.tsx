import React from "react";
import { AnantTeam } from "@/data/AnantTeam";
import { Linkedin, GitHub, Instagram } from "react-feather";
import Link from "next/link";
import Image from "next/image";

// MemberCard Component
const MemberCard: React.FC<{
  member: {
    ID: string;
    Title: string;
    Team: string;
    mail?: string;
    photo: string;
    Linkedin?: string;
    "Git Hub"?: string;
    "insta link"?: string;
  };
}> = ({ member }) => {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 shadow-xl rounded-2xl p-6 border border-gray-600 flex flex-col items-center text-center h-full transition-all transform hover:scale-105 hover:shadow-2xl duration-300">
      {/* Profile Image */}
      <div className="relative w-28 h-28 mb-4 rounded-full overflow-hidden shadow-md">
        <Image
          src={member.photo}
          alt={member.Title}
          width={112}
          height={112}
          className="rounded-full object-cover"
        />
      </div>

      {/* Member Info */}
      <h4 className="text-xl font-semibold text-white">{member.Title}</h4>
      <p className="text-sm text-gray-300 mt-1">{member.Team}</p>
      {member.mail && <p className="text-xs text-gray-400">{member.mail}</p>}

      {/* Social Links */}
      <div className="flex gap-4 justify-center mt-4">
        {member["Linkedin"] && (
          <Link
            href={member["Linkedin"]}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin
              className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
              size={22}
            />
          </Link>
        )}
        {member["Git Hub"] && (
          <Link
            href={member["Git Hub"]}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHub
              className="text-gray-300 hover:text-gray-500 transition-colors duration-200"
              size={22}
            />
          </Link>
        )}
        {member["insta link"] && (
          <Link
            href={member["insta link"]}
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

// Members Component
const Members: React.FC = () => {
  return (
    <section className="mb-20 px-6">
      <h2 className="text-4xl font-extrabold mb-12 text-center text-gray-200">
        Executive Heads
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {AnantTeam.map((member) => (
          <MemberCard key={member.ID} member={member} />
        ))}
      </div>
    </section>
  );
};

export default Members;
