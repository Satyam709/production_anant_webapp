import React from 'react';

const ProductSkeleton = () => {
  return (
    <div className="bg-gray-900/30 rounded-2xl overflow-hidden backdrop-blur-sm border border-gray-800 animate-pulse">
      <div className="relative aspect-[4/5] bg-gray-800/50"></div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="w-20 h-6 bg-gray-800/50 rounded-full"></div>
          <div className="w-24 h-6 bg-gray-800/50 rounded-full"></div>
        </div>
        <div className="w-3/4 h-7 bg-gray-800/50 rounded-lg mb-2"></div>
        <div className="mt-2 flex items-center justify-between">
          <div className="w-20 h-8 bg-gray-800/50 rounded-lg"></div>
          <div className="w-24 h-6 bg-gray-800/50 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
