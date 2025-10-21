import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Link from 'next/link';
import React from 'react';

gsap.registerPlugin(ScrollToPlugin);

const TeamHeader = () => {
  const scrollToSection = (id: string) => {
    gsap.to(window, {
      duration: 1,
      scrollTo: {
        y: `#${id}`,
        offsetY: 70,
      },
      ease: 'power2.inOut',
    });
  };

  return (
    <div className="text-center mb-16">
      <h1 className="text-5xl font-bold mb-6 mt-12 bg-clip-text text-transparent bg-gradient-to-r from-primary-blue via-primary-cyan to-primary-purple">
        Team Anant
      </h1>
      <p className="text-gray-400 max-w-2xl mx-auto">
        Meet the dedicated individuals who make Anant possible
      </p>
      <div className="flex justify-center gap-4 mt-8">
        <button
          className="px-6 py-2 rounded-lg bg-primary-blue/10 text-primary-cyan border border-primary-blue/20 hover:bg-primary-blue/20 transition-all"
          onClick={() => scrollToSection('office-bearers')}
        >
          Office Bearers
        </button>
        <button
          className="px-6 py-2 rounded-lg bg-primary-blue/10 text-primary-cyan border border-primary-blue/20 hover:bg-primary-blue/20 transition-all"
          onClick={() => scrollToSection('executive-head')}
        >
          Executive Heads
        </button>
      </div>
    </div>
  );
};

export default TeamHeader;
