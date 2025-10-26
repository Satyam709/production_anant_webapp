import { Infinity } from 'lucide-react';
import React from 'react';

const Page404 = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="flex justify-center mb-8">
          <Infinity className="w-32 h-32 text-cyan-400 animate-pulse" />
        </div>

        <h1 className="text-8xl font-bold text-white mb-4">
          4<span className="text-cyan-400">0</span>4
        </h1>

        <h2 className="text-2xl text-gray-300 mb-8">
          This equation has no real solution
        </h2>

        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          The page you're looking for seems to have diverged to infinity.
          Perhaps it's in another dimension?
        </p>

        <div className="mt-12 text-gray-500">
          <p>Error Code: ∞ × 404</p>
        </div>
      </div>
    </div>
  );
};

export default Page404;
