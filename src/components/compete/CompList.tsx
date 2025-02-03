import React from 'react';
import CompetitionCard from './CompCard';

const competitions = [
  {
    id: "1",
    title: "Hackathon 2024",
    date: "March 15-17, 2024",
    teamSize: "2-4 members",
    prize: "$5 in prizes",
    description: "48-hour hackathon focused on AI and ML solutions for real-world problems.",
    image: "/codemathon.png",
  },
  {
    id: "2",
    title: "Hackathon 2024",
    date: "March 15-17, 2024",
    teamSize: "2-4 members",
    prize: "$5 in prizes",
    description: "48-hour hackathon focused on AI and ML solutions for real-world problems.",
    image: "/codemathon.png",
  },
  {
    id: "3",
    title: "Hackathon 2024",
    date: "March 15-17, 2024",
    teamSize: "2-4 members",
    prize: "$5 in prizes",
    description: "48-hour hackathon focused on AI and ML solutions for real-world problems.",
    image: "/codemathon.png",
  },
];

const CompList = () => {
  return (
    <section className="mb-20">
      <h2 className="text-3xl font-bold mb-10 text-center">Active Competitions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {competitions.map((competition) => (
          <CompetitionCard key={competition.id} {...competition} />
        ))}
      </div>
    </section>
  );
};

export default CompList;