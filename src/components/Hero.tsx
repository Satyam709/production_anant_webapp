import { ArrowBigDownDash  } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import MathSymbols from '@/components/floating/MathSymbols';
import TechStack from '@/components/floating/TechStack';
import GradientButton from '@/components/ui/GradientButton';

import HeroLogo from './HeroLogo';

const Hero = () => {
  return (
    <div
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-blue/10 rounded-full blur-[100px]"></div>
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-primary-purple/10 rounded-full blur-[100px]"></div>
      </div>

      {/* Floating elements */}
      <MathSymbols />
      <TechStack />

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <div className="mb-6 relative flex flex-col sm:flex-row items-center">
          <Image
            src="/anant_logo.png" // Adjust the path as necessary
            alt="Anant Logo"
            className="h-70 w-auto pt-4 mx-auto animate-float" // Increased height
            width={150}
            height={150}
            style={{
              filter: 'drop-shadow(0 0 20px rgba(0, 224, 255, 0.3))',
              maxWidth: '100%', // Ensure it doesn't overflow
              height: 'auto', // Maintain aspect ratio
              maxHeight: '20rem',
            }}
          />
          <HeroLogo></HeroLogo>
        </div>
        {/* <p className="max-w-2xl mx-auto text-gray-500 mb-10">
          Exploring the infinite possibilities where mathematics meets
          technology
        </p> */}
        <GradientButton href="#content">
          <div className="flex flex-col items-center justify-center">
            <span>Discover More</span>
            <ArrowBigDownDash />
          </div>
        </GradientButton>
      </div>
    </div>
  );
};

export default Hero;
