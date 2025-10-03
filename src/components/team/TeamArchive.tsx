"use client";

import React, { useState } from "react";
import { Linkedin, GitHub, Instagram, ChevronDown, Archive, Calendar } from "react-feather";
import Link from "next/link";
import Image from "next/image";
import { Globe } from "lucide-react";
import { TeamMember } from "@/lib/actions/AnantTeam";
import { position_options, club_dept_options } from "@prisma/client";
import { positionTextMap } from "./OfficeBearers";

interface TeamArchiveProps {
  allTeamData: Record<string, TeamMember[]>;
  availableYears: string[];
  officeBearerPositions: position_options[];
}

// Archive Office Bearer Card Component
const ArchiveOfficeBearerCard: React.FC<{ member: TeamMember }> = ({ member }) => {
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
      <p className="text-sm text-gray-300 mt-1">{positionTextMap[member.position as position_options]}</p>
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

// Archive Executive Member Card Component
const ArchiveExecutiveMemberCard: React.FC<{ member: TeamMember }> = ({ member }) => {

  const teamText: Record<club_dept_options, string> = {
    [club_dept_options.Tech]: "Tech Team",
    [club_dept_options.Content]: "Content/Newsletter Team",
    [club_dept_options.PR]: "PR/Social Media Team",
    [club_dept_options.Sponsorship]: "Sponsorship Team",
    [club_dept_options.Management]: "Management Team",
    [club_dept_options.Education_Outreach]: "Education & Outreach Team",
    [club_dept_options.General]: "General Team",
  };

  return (
    <div className="group bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 shadow-xl rounded-2xl p-6 border border-gray-600 flex flex-col items-center text-center h-full min-h-[280px] transition-all transform hover:scale-105 hover:shadow-2xl duration-300">
      {/* Profile Image */}
      <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden shadow-md ring-2 ring-gray-500 group-hover:ring-blue-500 transition-shadow duration-300">
        <Image
          src={member.imageURL || "/default_profile.png"}
          alt={member.name}
          width={96}
          height={96}
          className="rounded-full object-cover"
        />
      </div>

      {/* Member Info */}
      <h4 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors duration-300">
        {member.name}
      </h4>
      <p className="text-sm text-gray-300 mt-1">
        {member.club_dept && member.club_dept.length > 0 ? teamText[member.club_dept[0]] : "General Team"}
      </p>
      {member.email && (
        <p className="text-xs text-gray-400">
          {member.email}
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
              className="text-blue-500 hover:text-blue-700 transition-colors duration-200"
              size={20}
            />
          </Link>
        )}
        {member.github && (
          <Link
            href={member.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHub
              className="text-gray-300 hover:text-gray-500 transition-colors duration-200"
              size={20}
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
              size={20}
            />
          </Link>
        )}
      </div>
    </div>
  );
};

const showCurrentYear = false; // Set to true to include current year in archive

// Team Archive Component
const TeamArchive: React.FC<TeamArchiveProps> = ({ 
  allTeamData, 
  availableYears, 
  officeBearerPositions 
}) => {
  if (availableYears.length === 0) return null;

  // Sort years in descending order
  availableYears.sort((a, b) => (a > b ? -1 : 1));
  // Determine active year (most recent)
  const activeYear = availableYears[0] || "";
  
  // If not showing current year, filter it out from available years
  availableYears = !showCurrentYear && activeYear ? availableYears.filter(year => year !== activeYear) : availableYears;
  const [selectedYear, setSelectedYear] = useState<string>(availableYears[0] || "");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  
  if (!selectedYear || !allTeamData[selectedYear]) return null;

  const selectedTeamData = allTeamData[selectedYear];
  
  // Filter office bearers and executive heads
  const officeBearers = selectedTeamData.filter(member => 
    member.position && officeBearerPositions.includes(member.position)
  );
  
  const executiveHeads = selectedTeamData.filter(member => 
    !member.position || !officeBearerPositions.includes(member.position)
  );

  // Group executive team by department
  const teamText: Record<club_dept_options, string> = {
    [club_dept_options.Tech]: "Tech Team",
    [club_dept_options.Content]: "Content/Newsletter Team",
    [club_dept_options.PR]: "PR/Social Media Team",
    [club_dept_options.Sponsorship]: "Sponsorship Team",
    [club_dept_options.Management]: "Management Team",
    [club_dept_options.Education_Outreach]: "Education & Outreach Team",
    [club_dept_options.General]: "General Team",
  };

  const groupedExecutiveTeam = executiveHeads.reduce(
    (acc: Record<string, TeamMember[]>, member) => {
      const dept = member.club_dept && member.club_dept.length > 0 ? member.club_dept[0] : club_dept_options.General;
      const teamName = teamText[dept];
      if (!acc[teamName]) {
        acc[teamName] = [];
      }
      acc[teamName].push(member);
      return acc;
    },
    {}
  );

  const teamOrder = [
    "Tech Team",
    "Education & Outreach Team",
    "Content/Newsletter Team",
    "PR/Social Media Team",
    "Management Team",
    "Sponsorship Team",
    "General Team",
  ];

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
            <div className="flex gap-2 flex-wrap">
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
        {officeBearers.length > 0 && (
          <div className="mb-16">
            <h3 className="text-3xl font-bold mb-8 text-center text-gray-200">
              Office Bearers - {selectedYear}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {officeBearers.map((member) => (
                <div key={member.id} className="w-full">
                  <ArchiveOfficeBearerCard member={member} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Archive Executive Team */}
        {executiveHeads.length > 0 && (
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
                      <div key={member.id} className="w-full">
                        <ArchiveExecutiveMemberCard member={member} />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamArchive;
