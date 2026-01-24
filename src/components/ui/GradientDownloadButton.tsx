'use client';
import GSAP from 'gsap';
import React, { useEffect, useState } from 'react';

interface GradientIconButtonProps {
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const GradientDownloadButton: React.FC<GradientIconButtonProps> = ({
  href,
  onClick,
  className = '',
  disabled = false,
}) => {
  const [gsap, setGsap] = useState<typeof GSAP>();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('gsap').then((module) => {
        const gsapInstance = module.default;
        import('gsap/ScrollToPlugin').then((plugin) => {
          gsapInstance.registerPlugin(plugin.ScrollToPlugin);
          setGsap(gsapInstance);
        });
      });
    }
  }, []);

  const buttonClassName = `
    inline-flex items-center justify-center
    w-12 h-12
    text-white rounded-md
    bg-black border border-gray-800
    hover:border-primary-cyan/50 
    transition-all duration-300
    relative overflow-hidden group
    ${className}
  `;

  const handleClick = () => {
    if (href && gsap) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: href, autoKill: true },
        ease: 'power3',
      });
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <button onClick={handleClick} className={buttonClassName} disabled={disabled}>
      <div className="absolute inset-0 bg-gradient-to-r from-primary-blue/10 via-primary-cyan/10 to-primary-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        {/* Download Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
          />
        </svg>
      </div>
    </button>
  );
};

export default GradientDownloadButton;
