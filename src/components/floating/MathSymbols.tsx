'use client';
import React, { useEffect,useState } from 'react';

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
    { symbol: '∫', color: '#00E0FF' }, // Integral - Cyan
    { symbol: 'Σ', color: '#A259FF' }, // Summation - Purple
    { symbol: 'π', color: '#0046FF' }, // Pi - Blue
    { symbol: '∂', color: '#FF59E6' }, // Partial Derivative - Pink
    { symbol: '√', color: '#00E0FF' }, // Square Root - Cyan
    { symbol: '∞', color: '#A259FF' }, // Infinity - Purple
    { symbol: '∆', color: '#FF6B00' }, // Delta - Orange
    { symbol: '∇', color: '#00FF94' }, // Nabla (del operator) - Mint Green
    { symbol: '⊕', color: '#FFD500' }, // Direct Sum - Yellow
    { symbol: '⊗', color: '#FF007C' }, // Tensor Product - Magenta
    { symbol: '∀', color: '#8C52FF' }, // For all - Violet
    { symbol: '∃', color: '#FF1493' }, // There exists - Deep Pink
    { symbol: 'ℝ', color: '#00BFFF' }, // Real numbers - Deep Sky Blue
    { symbol: 'ℤ', color: '#FF4500' }, // Integers - Orange Red
    { symbol: 'ℕ', color: '#1E90FF' }, // Natural numbers - Dodger Blue
    { symbol: 'ℚ', color: '#32CD32' }, // Rational numbers - Lime Green
    { symbol: 'ℂ', color: '#7B68EE' }, // Complex numbers - Medium Slate Blue
    { symbol: '≡', color: '#708090' }, // Identical to - Slate Gray
    { symbol: '≈', color: '#20B2AA' }, // Approximately Equal - Light Sea Green
    { symbol: '⊨', color: '#C71585' }, // Entails - Medium Violet Red
  ];

  const [symbolsWithPositions, setSymbolsWithPositions] = useState<
    SymbolPosition[]
  >([]);

  useEffect(() => {
    const positions = symbols.map((item, index) => ({
      ...item,
      top: `${Math.floor(Math.random() * 100)}%`,
      left: `${Math.floor(Math.random() * 100)}%`,
      rotation: `${Math.floor(Math.random() * 360)}deg`,
      delay: `${index * 0.5}s`,
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
