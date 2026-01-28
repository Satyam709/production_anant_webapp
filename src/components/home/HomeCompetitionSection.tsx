'use client';
import { Competitions } from '@prisma/client';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import CompCard from '@/components/compete/CompCard';

interface HomeCompetitionsSectionProps {
  competitions: Competitions[];
}

const HomeCompetitionsSection = ({ competitions }: HomeCompetitionsSectionProps) => {
  return (
    <section className="py-24 bg-black/10 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-200">
            Upcoming Competitions
          </h2>
          <Link
            href="/compete"
            className="text-[#00E0FF] hover:text-[#f7d452] flex items-center"
          >
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {competitions.map((competition) => (
            <CompCard
              key={competition.competition_id}
              id={competition.competition_id}
              title={competition.competitionName}
              date={new Date(competition.conductedOn).toLocaleDateString()}
              teamSize={`${competition.min_team_size}-${competition.max_team_size} members`}
              prize={competition.prize || 'TBA'}
              description={competition.description}
              image={competition.imageURL || '/competition-default.jpg'}
              registrationDeadline={competition.registration_deadline}
              venue={competition.venue}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeCompetitionsSection;
