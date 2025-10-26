import React from 'react';

interface AchievementCardProps {
  title: string;
  description: string;
  date: string;
}

const typeColors = {
  gold: 'from-yellow-400/20 to-yellow-600/20 border-yellow-500/30',
  silver: 'from-gray-300/20 to-gray-500/20 border-gray-400/30',
  bronze: 'from-orange-400/20 to-orange-600/20 border-orange-500/30',
};

const AchievementCard = ({
  title,
  description,
  date,
}: AchievementCardProps) => {
  return (
    <div
      className={`
      relative p-6 rounded-lg border backdrop-blur-sm
      hover:border-opacity-50 transition-all duration-300
      transform hover:-translate-y-1
    `}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
          <p className="text-gray-400 text-sm mb-4">{description}</p>
          <div className="text-sm text-gray-500">{date}</div>
        </div>
      </div>
    </div>
  );
};

export default AchievementCard;
