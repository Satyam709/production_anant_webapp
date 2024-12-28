"use client";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { User, LogIn } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm z-50 border border-gray-800 rounded-3xl shadow-lg w-[50%] tbs:w-auto px-4 items-center">
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
          <div className="hidden tbs:block items-center">
            <div className="ml-10 flex items-center space-x-6">
              <NavLink href="#home">Home</NavLink>
              <NavLink href="#about">About</NavLink>
              <NavLink href="#events">Events</NavLink>
              <NavLink href="#team">Team</NavLink>
              <LoginButton />
            </div>
          </div>
        </div>
        <div className="tbs:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center p-2 rounded-3xl text-gray-400 hover:text-white focus:outline-none"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="tbs:hidden border-gray-800 items-center">
          <div className="px-2 pt-2 pb-3 items-center sm:px-3">
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

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    className="text-gray-300 hover:text-white px-3 py-2 rounded-3xl text-sm font-medium transition-all"
  >
    {children}
  </a>
);

const MobileNavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    className="text-gray-300 hover:text-white block px-3 py-2 rounded-3xl text-base font-medium transition-all"
  >
    {children}
  </a>
);

const LoginButton = ({ isMobile = true }) => {
  const { data: session } = useSession();
  return (
    <button
      className={`${
        isMobile ? "block" : "hidden"
      } text-gray-300 hover:text-white px-3 py-2 rounded-3xl text-sm font-medium transition-all`}
      onClick={() => signIn(undefined, { callbackUrl: "/" })}
    >
      {session?.user ? <User /> : "Login"}
    </button>
  );
};
export default Navbar;
