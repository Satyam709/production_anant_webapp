"use client";
import React, { useState, useEffect } from 'react';

interface TechPosition {
  name: string;
  color: string; 
  top: string;
  left: string;
  delay: string;
}

const TechStack = () => {
  const technologies = [
    { name: 'Python', color: '#0046FF' }, // Blue
    { name: 'R', color: '#00E0FF' },     // Cyan
    { name: 'Julia', color: '#A259FF' }, // Purple
    { name: 'MATLAB', color: '#FF59E6' }, // Pink
    { name: 'LaTeX', color: '#0046FF' }, // Blue
    { name: 'Jupyter', color: '#00E0FF' }, // Cyan
  ];

  const [techWithPositions, setTechWithPositions] = useState<TechPosition[]>([]);

  useEffect(() => {
    const positions = technologies.map((tech, index) => ({
      ...tech,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${index * 0.5}s`
    }));
    setTechWithPositions(positions);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {techWithPositions.map((tech, index) => (
        <div
          key={tech.name}
          className="absolute text-sm font-mono animate-float opacity-20"
          style={{
            top: tech.top,
            left: tech.left,
            animationDelay: tech.delay,
            color: tech.color,
          }}
        >
          {tech.name}
        </div>
      ))}
    </div>
  );
};

export default TechStack;