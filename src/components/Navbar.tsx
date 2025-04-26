"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import NavDropdown from "./navigation/NavDropdown";
import { navItems } from "@/constants/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSection = (sectionLabel) => {
    setActiveSection(activeSection === sectionLabel ? null : sectionLabel);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div
          className={`relative mx-auto bg-black/70 backdrop-blur-md rounded-2xl border border-gray-800/50 
          shadow-lg transition-all duration-300 ${
            scrolled ? "shadow-black/20" : "shadow-black/10"
          }`}
        >
          {/* Main Navbar Content */}
          <div className="relative flex items-center justify-between px-4 py-3">
            {/* Logo Section */}
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 group">
                <div className="relative w-8 h-8 sm:w-9 sm:h-9">
                  <Image
                    src="/anant_logo.png"
                    alt="Anant Logo"
                    fill
                    className="object-contain transform group-hover:scale-105 transition-all duration-300"
                    style={{
                      filter: "drop-shadow(0 0 10px rgba(0, 224, 255, 0.3))",
                    }}
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center justify-center flex-1 ml-8">
              {Object.values(navItems).map((item) => {
                const isSingleItem = item.items.length === 1;
                return isSingleItem ? (
                  <a
                    key={item.label}
                    href={item.items[0].href}
                    className="text-gray-300 hover:text-white px-3 py-2 rounded-xl 
          text-sm font-medium transition-all duration-300 ease-out hover:bg-gradient-to-r 
          from-primary-blue/10 to-primary-purple/10"
                  >
                    {item.label}
                  </a>
                ) : (
                  <NavDropdown
                    key={item.label}
                    label={item.label}
                    items={item.items}
                  />
                );
              })}
            </div>


            {/* Auth & Mobile Menu Button */}
            <div className="flex items-center gap-3">
              {session ? (
                <Link
                  href="/dashboard"
                  className="text-gray-300 hover:text-white px-3 py-1.5 text-sm font-medium rounded-xl
                    bg-gradient-to-r from-gray-800/50 to-gray-700/50 hover:from-primary-blue/20 hover:to-primary-purple/20
                    transition-all duration-300 border border-gray-700/50 hover:border-gray-600"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="text-gray-300 hover:text-white px-3 py-1.5 text-sm font-medium rounded-xl
                    bg-gradient-to-r from-gray-800/50 to-gray-700/50 hover:from-primary-blue/20 hover:to-primary-purple/20
                    transition-all duration-300 border border-gray-700/50 hover:border-gray-600"
                >
                  Login
                </Link>
              )}

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden inline-flex items-center justify-center p-2 rounded-xl
                  text-gray-400 hover:text-white bg-gray-800/50 hover:bg-gray-700/50
                  transition-all duration-300 border border-gray-700/50 hover:border-gray-600"
                aria-expanded={isOpen}
              >
                {isOpen ? (
                  <X className="h-5 w-5 transition-transform duration-300" />
                ) : (
                  <Menu className="h-5 w-5 transition-transform duration-300" />
                )}
              </button>
            </div>
          </div>

          {/* Enhanced Mobile Navigation Menu */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out
              ${
                isOpen ? "max-h-[85vh] border-t border-gray-800/50" : "max-h-0"
              }`}
          >
            <div className="px-2 py-3 max-h-[85vh] overflow-y-auto">
              {Object.values(navItems).map((section) => {
                const isSingleItem = section.items.length === 1;
                const item = section.items[0];

                return (
                  <div key={section.label} className="mb-2 last:mb-0">
                    {isSingleItem ? (
                      // Render as direct link if only one item
                      <Link
                        href={item.href}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl
                          bg-gradient-to-r from-gray-800/30 to-gray-700/30 
                          hover:from-primary-blue/10 hover:to-primary-purple/10
                          transition-all duration-300 text-sm font-medium text-white"
                        onClick={() => {
                          setIsOpen(false);
                          setActiveSection(null);
                        }}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <>
                        {/* Section Header */}
                        <button
                          onClick={() => toggleSection(section.label)}
                          className="w-full flex items-center justify-between px-4 py-3 rounded-xl
                            bg-gradient-to-r from-gray-800/30 to-gray-700/30 
                            hover:from-primary-blue/10 hover:to-primary-purple/10
                            transition-all duration-300"
                        >
                          <span className="text-sm font-medium text-white">
                            {section.label}
                          </span>
                          <ChevronRight
                            className={`h-4 w-4 text-gray-400 transition-transform duration-300
                              ${activeSection === section.label ? "rotate-90" : ""}`}
                          />
                        </button>

                        {/* Section Content */}
                        <div
                          className={`overflow-hidden transition-all duration-300 ease-in-out
                            ${
                              activeSection === section.label
                                ? "max-h-96 mt-2"
                                : "max-h-0"
                            }`}
                        >
                          <div className="space-y-1 pl-4">
                            {section.items.map((item) => (
                              <Link
                                key={item.label}
                                href={item.href}
                                className="flex items-center px-4 py-2.5 rounded-lg text-gray-300
                                  hover:text-white hover:bg-gradient-to-r from-primary-blue/5 to-primary-purple/5
                                  transition-all duration-300 group border border-transparent
                                  hover:border-gray-800"
                                onClick={() => {
                                  setIsOpen(false);
                                  setActiveSection(null);
                                }}
                              >
                                <span className="text-sm">{item.label}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
