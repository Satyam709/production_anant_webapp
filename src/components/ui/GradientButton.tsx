"use client"
import React from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";


interface GradientButtonProps {
  href?: string;
  children: React.ReactNode;
  className?: string; 
  onClick?: () => void;
}

const GradientButton: React.FC<GradientButtonProps> = ({
  href,
  children,
  className,
  onClick,
}) => {
  const combinedclassName = `
    inline-flex justify-center px-6 py-3 
    text-base font-medium rounded-md text-white 
    bg-black border border-gray-800
    hover:border-primary-cyan/50 
    transition-all duration-300
    relative
    overflow-hidden
    group
    ${className}
  `;

  gsap.registerPlugin(ScrollToPlugin);

  const content = (
    <>
      <div className="absolute inset-0 bg-gradient-to-r from-primary-blue/10 via-primary-cyan/10 to-primary-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10">{children}</div>
    </>
  );

  if (href) {
    return (
      <button
        onClick={() =>
          gsap.to(window, {
            duration: 1,
            scrollTo: { y: href, autoKill: true },
            ease: "power3",
          })
        }
        className={className}
      >
        {content}
      </button>
    );
  }

  return (
    <button className={combinedclassName} onClick={onClick}>
      {content}
    </button>
  );
};

export default GradientButton;
