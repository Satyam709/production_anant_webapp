import React from 'react';

const MathSymbols = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Integration Symbol */}
      <div className="absolute top-1/4 left-1/4 text-4xl text-primary-cyan/20 animate-float">
        ∫
      </div>
      
      {/* Sigma */}
      <div className="absolute top-1/3 right-1/4 text-4xl text-primary-purple/20 animate-float-delayed">
        Σ
      </div>
      
      {/* Pi */}
      <div className="absolute bottom-1/4 left-1/3 text-4xl text-primary-blue/20 animate-float">
        π
      </div>
      
      {/* Partial Derivative */}
      <div className="absolute top-2/3 right-1/3 text-4xl text-primary-pink/20 animate-float-delayed">
        ∂
      </div>
      
      {/* Square Root */}
      <div className="absolute bottom-1/3 left-1/5 text-4xl text-primary-cyan/20 animate-float">
        √
      </div>
      
      {/* Infinity */}
      <div className="absolute top-1/2 right-1/5 text-4xl text-primary-purple/20 animate-float-delayed">
        ∞
      </div>
    </div>
  );
};

export default MathSymbols;