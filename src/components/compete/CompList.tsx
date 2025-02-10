'use client'

import React, { useEffect, useState } from 'react';
import CompCard from './CompCard';
import { Competitions } from '@prisma/client';

const CompList = () => {
  const [competitions, setCompetitions] = useState<Competitions[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const response = await fetch('/api/competitions')
        if (!response.ok) throw new Error('Failed to fetch competitions')
        const data = await response.json()
        // Filter for active competitions
        const now = new Date()
        const activeCompetitions = data.filter((comp: Competitions) => 
          new Date(comp.registration_deadline) > now
        )
        setCompetitions(activeCompetitions)
      } catch (error) {
        console.error('Error fetching competitions:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCompetitions()
  }, [])

  if (loading) {
    return (
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-10 text-center">Active Competitions</h2>
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-blue"></div>
        </div>
      </section>
    )
  }

  return (
    <section className="mb-20">
      <h2 className="text-3xl font-bold mb-10 text-center">Active Competitions</h2>
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
    </section>
  );
};

export default CompList;