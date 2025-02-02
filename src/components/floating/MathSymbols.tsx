"use client";
import React, { useState, useEffect } from 'react';

interface SymbolPosition {
  symbol: string;
  color: string;
  top: string;
  left: string;
  rotation: string;
  delay: string;
}

const MathSymbols = () => {
  const symbols = [
    { symbol: '∫', color: '#00E0FF' }, // Cyan
    { symbol: 'Σ', color: '#A259FF' }, // Purple
    { symbol: 'π', color: '#0046FF' }, // Blue
    { symbol: '∂', color: '#FF59E6' }, // Pink
    { symbol: '√', color: '#00E0FF' }, // Cyan
    { symbol: '∞', color: '#A259FF' }, // Purple
  ];

  const [symbolsWithPositions, setSymbolsWithPositions] = useState<SymbolPosition[]>([]);

  useEffect(() => {
    const positions = symbols.map((item, index) => ({
      ...item,
      top: `${Math.floor(Math.random() * 100)}%`,
      left: `${Math.floor(Math.random() * 100)}%`,
      rotation: `${Math.floor(Math.random() * 360)}deg`,
      delay: `${index * 0.5}s`
    }));
    setSymbolsWithPositions(positions);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {symbolsWithPositions.map((item, index) => (
        <div
          key={index}
          className="absolute text-4xl font-math animate-float opacity-20"
          style={{
            top: item.top,
            left: item.left,
            transform: `rotate(${item.rotation})`,
            animationDelay: item.delay,
            color: item.color, 
          }}
        >
          {item.symbol}
        </div>
      ))}
    </div>
  );
};

export default MathSymbols;