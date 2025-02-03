"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import NavDropdown from "./navigation/NavDropdown";
import { navItems, shopNavItems } from "@/constants/navigation";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();
  const isShopPage = pathname?.startsWith("/shop");

  //navbar selector
  const currentNavItems = isShopPage ? shopNavItems : navItems;

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm z-50 border border-gray-800 rounded-3xl shadow-lg w-[90%] max-w-7xl transition-all duration-300">
      <div className="mx-auto px-4">
        <div className="relative flex items-center justify-between h-14">
          {/* Logo and Navigation Items */}
          <div className="flex items-center flex-1">
            <Link 
              href="/" 
              className="flex-shrink-0 mr-4 transform hover:scale-105 transition-all duration-300 ease-out"
            >
              <Image
                src="/anant_logo.png"
                alt="Anant Logo"
                className="h-8 w-auto"
                width={32}
                height={32}
                style={{ 
                  filter: "drop-shadow(0 0 10px rgba(0, 224, 255, 0.3))",
                  transition: "filter 0.3s ease-out"
                }}
              />
            </Link>
            
            <div className="hidden lg:flex items-center space-x-1 flex-1 justify-center">
              {Object.values(currentNavItems).map((item) => (
                <NavDropdown 
                  key={item.label}
                  label={item.label}
                  items={item.items}
                />
              ))}
            </div>
          </div>

          {/* Auth Button and Mobile Menu */}
          <div className="flex items-center gap-2">
            {session ? (
              <Link
                href="/dashboard"
                className="text-gray-300 hover:text-white px-3 py-1.5 rounded-3xl text-sm font-medium 
                  transition-all duration-300 ease-out hover:bg-gradient-to-r from-primary-blue/20 to-primary-purple/20
                  hover:shadow-[0_0_15px_rgba(0,224,255,0.15)] border border-transparent hover:border-gray-700"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className="text-gray-300 hover:text-white px-3 py-1.5 rounded-3xl text-sm font-medium 
                  transition-all duration-300 ease-out hover:bg-gradient-to-r from-primary-blue/20 to-primary-purple/20
                  hover:shadow-[0_0_15px_rgba(0,224,255,0.15)] border border-transparent hover:border-gray-700"
              >
                Login
              </Link>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-3xl text-gray-400 
                hover:text-white hover:bg-gradient-to-r from-primary-blue/20 to-primary-purple/20 
                focus:outline-none transition-all duration-300 ease-out"
              aria-expanded={isOpen}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-5 w-5 transform rotate-0 transition-transform duration-300" />
              ) : (
                <Menu className="h-5 w-5 transform rotate-0 transition-transform duration-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out
            ${isOpen ? 'max-h-[32rem] border-t border-gray-800' : 'max-h-0'}`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {Object.values(currentNavItems).map((section) => (
              <div key={section.label} className="px-3 py-2">
                <div className="text-gray-400 text-sm font-medium mb-2">
                  {section.label}
                </div>
                <div className="space-y-1">
                  {section.items.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gradient-to-r 
                        from-primary-blue/10 to-primary-purple/10 rounded-lg transition-all duration-300 
                        ease-out text-sm"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;