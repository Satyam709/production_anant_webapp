'use client';

import { position_options } from '@prisma/client';
import React, { useState } from 'react';
import { Archive, Calendar, ChevronDown } from 'react-feather';

import Members from '@/components/team/Members';
import OfficeBearers from '@/components/team/OfficeBearers';
import { TeamMember } from '@/lib/actions/AnantTeam';

interface TeamArchiveProps {
  allTeamData: Record<string, TeamMember[]>;
  availableYears: string[];
  officeBearerPositions: position_options[];
}

const showCurrentYear = false; // Set to true to include current year in archive

// Team Archive Component
const TeamArchive: React.FC<TeamArchiveProps> = ({
  allTeamData,
  availableYears,
  officeBearerPositions,
}) => {
  if (availableYears.length === 0) return null;

  // Sort years in descending order
  availableYears.sort((a, b) => (a > b ? -1 : 1));
  // Determine active year (most recent)
  const activeYear = availableYears[0] || '';

  // If not showing current year, filter it out from available years
  availableYears =
    !showCurrentYear && activeYear
      ? availableYears.filter((year) => year !== activeYear)
      : availableYears;
  const [selectedYear, setSelectedYear] = useState<string>(
    availableYears[0] || ''
  );
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  if (!selectedYear || !allTeamData[selectedYear]) return null;

  const selectedTeamData = allTeamData[selectedYear];

  // Filter office bearers and executive heads
  const officeBearers = selectedTeamData.filter(
    (member) =>
      member.position && officeBearerPositions.includes(member.position)
  );

  const executiveHeads = selectedTeamData.filter(
    (member) =>
      !member.position || !officeBearerPositions.includes(member.position)
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
          Honoring our past leaders and contributors who have shaped Anant
          Society over the years.
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
          <OfficeBearers members={officeBearers}></OfficeBearers>
        )}

        {/* Archive Executive Team */}
        {executiveHeads.length > 0 && (
          <Members members={executiveHeads}></Members>
        )}
      </div>
    </section>
  );
};

export default TeamArchive;
