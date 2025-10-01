import React, { useState } from "react";
import { Linkedin, GitHub, Instagram, ChevronDown, Archive, Calendar } from "react-feather";
import Link from "next/link";
import Image from "next/image";
import { Globe } from "lucide-react";
import { archiveTeamData, getAvailableYears, getTeamDataByYear, type YearlyTeamData } from "@/data/ArchiveTeam";

// Archive Office Bearer Card Component
const ArchiveOfficeBearerCard: React.FC<{ member: YearlyTeamData['officeBearers'][0] }> = ({
  member,
}) => {
  return (
    <div className="group bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 shadow-xl rounded-2xl p-6 border border-gray-600 flex flex-col items-center text-center h-full min-h-[300px] transition-all transform hover:scale-105 hover:shadow-2xl duration-300">
      {/* Profile Image */}
      <div className="relative w-28 h-28 mb-4 rounded-full overflow-hidden shadow-md ring-2 ring-gray-500 group-hover:ring-blue-500 transition-shadow duration-300">
        <Image
          src={member.image}
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
      {member.email && (
        <p className="text-xs text-gray-400 hover:text-gray-300 transition-colors duration-200">
          {member.email}
        </p>
      )}
      {member.phone && (
        <p className="text-xs text-gray-400 hover:text-gray-300 transition-colors duration-200">
          {member.phone}
        </p>
      )}

      {/* Social Links */}
      <div className="flex gap-4 justify-center mt-auto">
        {member.linkedin && (
          <Link
            href={member.linkedin}
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

// Archive Executive Member Card Component
const ArchiveExecutiveMemberCard: React.FC<{ member: YearlyTeamData['executiveTeam'][0] }> = ({
  member,
}) => {
  return (
    <div className="group bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 shadow-xl rounded-2xl p-6 border border-gray-600 flex flex-col items-center text-center h-full min-h-[280px] transition-all transform hover:scale-105 hover:shadow-2xl duration-300">
      {/* Profile Image */}
      <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden shadow-md ring-2 ring-gray-500 group-hover:ring-blue-500 transition-shadow duration-300">
        <Image
          src={member.photo}
          alt={member.Title}
          width={96}
          height={96}
          className="rounded-full object-cover"
        />
      </div>

      {/* Member Info */}
      <h4 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors duration-300">
        {member.Title}
      </h4>
      <p className="text-sm text-gray-300 mt-1">{member.Team}</p>
      {member.mail && <p className="text-xs text-gray-400">{member.mail}</p>}

      {/* Social Links */}
      <div className="flex gap-4 justify-center mt-auto">
        {member.Linkedin && (
          <Link
            href={member.Linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin
              className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
              size={20}
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
              size={20}
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
              size={20}
            />
          </Link>
        )}
      </div>
    </div>
  );
};

// Team Archive Component
const TeamArchive: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string>(getAvailableYears()[0] || "2024-25");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  
  const availableYears = getAvailableYears();
  const selectedTeamData = getTeamDataByYear(selectedYear);

  const teamOrder = [
    "Tech Team",
    "Education Outreach Team",
    "Content/Newsletter Team",
    "PR /Social Media Team",
    "Managment Team",
  ];

  if (!selectedTeamData) return null;

  const groupedExecutiveTeam = selectedTeamData.executiveTeam.reduce(
    (acc: Record<string, typeof selectedTeamData.executiveTeam>, member) => {
      const team = member.Team || "Uncategorized";
      if (!acc[team]) {
        acc[team] = [];
      }
      acc[team].push(member);
      return acc;
    },
    {}
  );

  return (
    <section className="mt-20 px-6" id="team-archive">
      {/* Archive Section Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Archive className="text-primary-blue" size={32} />
          <h2 className="text-4xl font-extrabold text-gray-200">
            Team Archive
          </h2>
        </div>
        <p className="text-gray-400 text-lg max-w-3xl mx-auto">
          Honoring our past leaders and contributors who have shaped Anant Society over the years.
        </p>
        
        {/* Expandable Toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-blue/20 to-primary-purple/20 border border-primary-blue/30 hover:border-primary-blue/50 transition-all duration-300 text-white hover:bg-primary-blue/30"
        >
          <Calendar size={20} />
          <span>{isExpanded ? 'Hide' : 'View'} Archive</span>
          <ChevronDown 
            className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
            size={20} 
          />
        </button>
      </div>

      {/* Archive Content - Expandable */}
      <div 
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isExpanded ? 'max-h-none opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {/* Year Selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-2 border border-gray-800">
            <div className="flex gap-2">
              {availableYears.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
                    selectedYear === year
                      ? 'bg-gradient-to-r from-primary-blue to-primary-cyan text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Archive Office Bearers */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold mb-8 text-center text-gray-200">
            Office Bearers - {selectedYear}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {selectedTeamData.officeBearers.map((member) => (
              <div key={member.id} className="w-full">
                <ArchiveOfficeBearerCard member={member} />
              </div>
            ))}
          </div>
        </div>

        {/* Archive Executive Team */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold mb-8 text-center text-gray-200">
            Executive Heads - {selectedYear}
          </h3>
          
          {teamOrder.map((teamName) => {
            const teamMembers = groupedExecutiveTeam[teamName];
            if (!teamMembers || teamMembers.length === 0) return null;

            return (
              <div key={teamName} className="mb-12">
                <h4 className="text-2xl font-semibold mb-6 text-center text-gray-300 border-b border-gray-700 pb-2">
                  {teamName}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {teamMembers.map((member) => (
                    <div key={member.ID} className="w-full">
                      <ArchiveExecutiveMemberCard member={member} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TeamArchive;