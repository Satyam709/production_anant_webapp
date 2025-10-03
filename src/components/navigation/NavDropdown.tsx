"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

interface DropdownItem {
  label: string;
  href: string;
}

interface NavDropdownProps {
  label: string;
  items: DropdownItem[];
}

const NavDropdown: React.FC<NavDropdownProps> = ({ label, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150); 
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        className="flex items-center gap-1 text-gray-300 hover:text-white px-3 py-2 rounded-xl 
          text-sm font-medium transition-all duration-300 ease-out hover:bg-gradient-to-r 
          from-primary-blue/10 to-primary-purple/10"
      >
        {label}
        <ChevronDown
          size={16}
          className={`transition-transform duration-300 ease-out ${
            isOpen ? 'rotate-180' : 'group-hover:rotate-180'
          }`}
        />
      </button>

      <div
        className={`absolute top-full left-0 mt-1 w-48 rounded-xl bg-black/90 backdrop-blur-sm 
          border border-gray-800 shadow-lg overflow-hidden transform transition-all duration-300 
          ease-out origin-top ${
            isOpen 
              ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'
          }`}
      >
        <div className="py-2">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="block px-4 py-2 text-sm text-gray-300 hover:text-white 
                transition-all duration-300 ease-out hover:bg-gradient-to-r 
                from-primary-blue/10 to-primary-purple/10"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavDropdown;