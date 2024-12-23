import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-black/50 p-8 rounded-lg backdrop-blur-sm hover:transform hover:-translate-y-1 transition-all border border-gray-800 hover:border-gray-700">
      <div className="relative">
        {icon}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-blue/5 via-primary-cyan/5 to-primary-purple/5 blur-xl"></div>
      </div>
      <h3 className="text-xl font-semibold mb-4 mt-4 text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

export default FeatureCard;