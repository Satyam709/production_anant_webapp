// components/sponsors/SponsorHeader.tsx
import React from 'react';

const SponsorHeader = () => {
  return (
    <div className="text-center mb-16">
      <h1 className="text-5xl font-bold mb-6 mt-12 bg-clip-text text-transparent bg-gradient-to-r from-primary-blue via-primary-cyan to-primary-purple">
        Our Partners
      </h1>
      <p className="text-gray-400 max-w-2xl mx-auto">
        We are proud to be supported by these industry-leading organizations 
        who help make our community events possible.
      </p>
    </div>
  );
};
export default SponsorHeader;