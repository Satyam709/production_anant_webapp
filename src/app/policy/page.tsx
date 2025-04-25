"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { anantPolicy } from "@/data/policy";
import { FaChevronDown } from "react-icons/fa";

export default function PolicyPage() {
  const [anantOpen, setAnantOpen] = useState(false);
  const session = useSession();

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Background blur elements */}
      <div className="fixed inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-blue/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-primary-purple/10 rounded-full blur-[100px]" />
      </div>

      <Navbar />

      <main className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 p-3 mt-12 bg-clip-text text-transparent bg-gradient-to-r from-primary-blue via-primary-cyan to-primary-purple">
            Policy
          </h1>
        </div>


        {/* ANANT POLICY DROPDOWN */}
        <div className="mb-8 border border-white/20 rounded-lg overflow-hidden bg-white/5 backdrop-blur-sm">
          <button
            onClick={() => setAnantOpen(!anantOpen)}
            className="w-full text-left flex items-center justify-between px-6 py-4 font-semibold text-lg bg-white/10 hover:bg-white/20 transition"
          >
            <span>Anant Policy</span>
            <FaChevronDown
              className={`transition-transform duration-300 ${
                anantOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`transition-all duration-300 px-6 overflow-hidden ${
              anantOpen ? "max-h-[1000px] py-6" : "max-h-0"
            }`}
          >
            <div
              className="text-gray-100 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent"
              dangerouslySetInnerHTML={{ __html: anantPolicy }}
            />
          </div>
        </div>
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
