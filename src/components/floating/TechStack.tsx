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
    { name: 'Python', color: 'text-primary-blue' },
    { name: 'R', color: 'text-primary-cyan' },
    { name: 'Julia', color: 'text-primary-purple' },
    { name: 'MATLAB', color: 'text-primary-pink' },
    { name: 'LaTeX', color: 'text-primary-blue' },
    { name: 'Jupyter', color: 'text-primary-cyan' }
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
          className={`absolute text-sm font-mono ${tech.color}/20 animate-float`}
          style={{
            top: tech.top,
            left: tech.left,
            animationDelay: tech.delay
          }}
        >
          {tech.name}
        </div>
      ))}
    </div>
  );
};

export default TechStack;