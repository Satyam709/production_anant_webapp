"use client";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm z-50 border border-gray-800 rounded-full shadow-lg w-[90%] md:w-auto px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-14">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Image
              src="/anant_logo.png"
              alt="Anant Logo"
              className="h-8 w-auto"
              style={{ filter: "drop-shadow(0 0 10px rgba(0, 224, 255, 0.3))" }}
              width={150}
              height={150}
            />
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              <NavLink href="#home">Home</NavLink>
              <NavLink href="#about">About</NavLink>
              <NavLink href="#events">Events</NavLink>
              <NavLink href="#team">Team</NavLink>
              <LoginButton />
            </div>
          </div>
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center p-2 rounded-full text-gray-400 hover:text-white focus:outline-none"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-gray-800 mt-2 rounded-b-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink href="#home">Home</MobileNavLink>
            <MobileNavLink href="#about">About</MobileNavLink>
            <MobileNavLink href="#events">Events</MobileNavLink>
            <MobileNavLink href="#team">Team</MobileNavLink>
            <LoginButton isMobile />
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all"
  >
    {children}
  </a>
);

const MobileNavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-all"
  >
    {children}
  </a>
);

const LoginButton = ({ isMobile = false }) => (
  <a
    href="#"
    className={`${
      isMobile ? "block" : "hidden"
    } text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all`}
  >
    Login
  </a>
);

export default Navbar;
