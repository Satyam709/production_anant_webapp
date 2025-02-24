import React from "react";
import CompCard from "./CompCard";
import { Competitions } from "@prisma/client";
export const dynamic = "force-dynamic";

async function fetchActiveCompetitions(): Promise<Competitions[]> {
  try {
    const response = await fetch(`${process.env.API_URL}/api/competitions`, {
      next: { revalidate: 300 }, // Revalidate every 5min
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error("Failed to fetch competitions:", response.status);
      throw new Error("Failed to fetch competitions"+data);
    }

    // console.log("Competitions data:", data);

    if (!data || (!data.upcoming_comp && !data.past_comp)) {
      return []; // No competitions found
    }

    let activeCompetitions: Competitions[] = [];

    if (data.upcoming_comp) {
      activeCompetitions = data.upcoming_comp;
    }

    return activeCompetitions;
  } catch (error) {
    console.error("Error parsing competitions data:", error);
    return []; // Return an empty array on error
  }
}

const CompList = async () => {
  const competitions = await fetchActiveCompetitions();

  return (
    <section className="mb-20">
      <h2 className="text-3xl font-bold mb-10 text-center">
        Active Competitions
      </h2>
      {competitions.length === 0 ? (
        <div className="text-center text-gray-500">
          No active competitions found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {competitions.map((competition) => (
            <CompCard
              key={competition.competition_id}
              id={competition.competition_id}
              title={competition.competitionName}
              date={new Date(competition.conductedOn).toLocaleDateString()}
              teamSize={`${competition.min_team_size}-${competition.max_team_size} members`}
              prize={competition.prize || "TBA"}
              description={competition.description}
              image={competition.imageURL || "/competition-default.jpg"}
              registrationDeadline={competition.registration_deadline}
              venue={competition.venue}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default CompList;
