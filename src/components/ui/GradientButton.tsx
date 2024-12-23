import React from 'react';

interface GradientButtonProps {
  href?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const GradientButton: React.FC<GradientButtonProps> = ({ href, children, onClick }) => {
  const className = `
    inline-flex items-center px-6 py-3 
    text-base font-medium rounded-md text-white 
    bg-black border border-gray-800
    hover:border-primary-cyan/50 
    transition-all duration-300
    relative
    overflow-hidden
    group
  `;

  const content = (
    <>
      <div className="absolute inset-0 bg-gradient-to-r from-primary-blue/10 via-primary-cyan/10 to-primary-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10">{children}</div>
    </>
  );

  if (href) {
    return (
      <a href={href} className={className}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={className}>
      {content}
    </button>
  );
};

export default GradientButton;