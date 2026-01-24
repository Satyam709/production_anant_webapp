// FormDropdown.tsx
'use client';

import { ChevronDown } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface FormDropdownProps {
  label: string;
  options: string[];
  value: string | null | undefined;
  onSelect: (option: string) => void;
}

const FormDropdown: React.FC<FormDropdownProps> = ({
  label,
  options,
  value,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={toggleDropdown}
        className="w-full flex justify-between items-center pl-10 pr-3 py-2.5 bg-black/30 border border-gray-700 rounded-lg text-white transition-all duration-300 ease-out focus:outline-none"
      >
        {value || label}
        <ChevronDown
          size={16}
          className={`transition-transform duration-300 ease-out ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div className="absolute mt-1 w-full max-h-[300px] overflow-y-auto bg-zinc-900 border border-gray-800 rounded-xl shadow-lg z-50 transform transition-all duration-300 ease-out origin-top">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleOptionClick(option)}
              className="px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gradient-to-r from-primary-blue/10 to-primary-purple/10 cursor-pointer transition-all duration-300 ease-out"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FormDropdown;
