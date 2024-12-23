import React from 'react';
import { Users, Brain, Trophy } from 'lucide-react';
import FeatureCard from "@/components/ui/FeatureCard";

const About = () => {
  return (
    <div id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">About Anant</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Where mathematical minds converge to explore, innovate, and solve complex problems
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Users className="h-12 w-12 text-primary-cyan/70" />}
            title="Community"
            description="Join a vibrant community of mathematical enthusiasts, researchers, and problem solvers"
          />
          <FeatureCard
            icon={<Brain className="h-12 w-12 text-primary-purple/70" />}
            title="Learning"
            description="Engage in workshops, seminars, and collaborative projects to enhance your mathematical skills"
          />
          <FeatureCard
            icon={<Trophy className="h-12 w-12 text-primary-pink/70" />}
            title="Competitions"
            description="Participate in mathematical competitions, hackathons, and problem-solving challenges"
          />
        </div>
      </div>
    </div>
  );
};

export default About;