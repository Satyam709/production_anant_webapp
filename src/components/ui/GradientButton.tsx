'use client';
import GSAP from 'gsap';
import React, { useEffect, useState } from 'react';

interface GradientButtonProps {
  href?: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const GradientButton: React.FC<GradientButtonProps> = ({
  href,
  children,
  onClick,
  className = '',
  disabled = false,
  type = 'submit',
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
    inline-flex items-center px-6 py-3 
    text-base font-medium rounded-md text-white 
    bg-black border border-gray-800
    hover:border-primary-cyan/50 
    transition-all duration-300
    relative
    overflow-hidden
    group
    ${className}
  `;

  const content = (
    <>
      <div className="absolute inset-0 bg-gradient-to-r from-primary-blue/10 via-primary-cyan/10 to-primary-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10">{children}</div>
    </>
  );

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
    <button
      type={type}
      onClick={handleClick}
      className={buttonClassName}
      disabled={disabled}
    >
      {content}
    </button>
  );
};

export default GradientButton;
