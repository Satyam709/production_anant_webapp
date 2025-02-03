import React from 'react';
import { Target, Star, Award } from 'lucide-react';

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

const StatItem = ({ icon, label, value }: StatItemProps) => (
  <div className="flex flex-col items-center p-4 bg-black/20 rounded-lg backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-colors">
    <div className="mb-2 text-primary-cyan">{icon}</div>
    <div className="text-m  text-white">{label}</div>
    <div className="text-sm font-bold  text-gray-400">{value}</div>
  </div>
);

const ProfileStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <StatItem
        icon={<Target className="h-6 w-6" />}
        label="Joined"
        value={'Aug 2024'}
      />
      <StatItem
        icon={<Award className="h-6 w-6" />}
        label="Role"
        value={'Tech Executive'}
      />
      <StatItem
        icon={<Star className="h-6 w-6" />}
        label="Puzzles Solved"
        value={256}
      />
    </div>
  );
};

export default ProfileStats;