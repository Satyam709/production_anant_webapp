import React, { useMemo } from 'react';

const symbols = [
  { symbol: '∫', color: 'text-primary-cyan' },
  { symbol: 'Σ', color: 'text-primary-purple' },
  { symbol: 'π', color: 'text-primary-blue' },
  { symbol: '∂', color: 'text-primary-pink' },
  { symbol: '√', color: 'text-primary-cyan' },
  { symbol: '∞', color: 'text-primary-purple' },
  { symbol: 'θ', color: 'text-primary-blue' },
  { symbol: 'λ', color: 'text-primary-pink' },
];

const LoginSymbols = () => {
  const symbolsWithPositions = useMemo(() => 
    symbols.map((item, index) => ({
      ...item,
      top: `${Math.floor(Math.random() * 100)}%`,
      left: `${Math.floor(Math.random() * 100)}%`,
      rotation: `${Math.floor(Math.random() * 360)}deg`,
      delay: `${index * 0.5}s`
    })), 
    [] 
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {symbolsWithPositions.map((item, index) => (
        <div
          key={index}
          className={`absolute ${item.color}/20 text-4xl font-math animate-float`}
          style={{
            top: item.top,
            left: item.left,
            transform: `rotate(${item.rotation})`,
            animationDelay: item.delay
          }}
        >
          {item.symbol}
        </div>
      ))}
    </div>
  );
};

export default LoginSymbols;