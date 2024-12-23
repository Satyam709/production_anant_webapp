import React from 'react';

const TechStack = () => {
  const technologies = [
    { name: 'Python', color: 'text-primary-blue' },
    { name: 'R', color: 'text-primary-cyan' },
    { name: 'Julia', color: 'text-primary-purple' },
    { name: 'MATLAB', color: 'text-primary-pink' },
    { name: 'LaTeX', color: 'text-primary-blue' },
    { name: 'Jupyter', color: 'text-primary-cyan' }
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {technologies.map((tech, index) => (
        <div
          key={tech.name}
          className={`absolute text-sm font-mono ${tech.color}/20 animate-float`}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${index * 0.5}s`
          }}
        >
          {tech.name}
        </div>
      ))}
    </div>
  );
};

export default TechStack;