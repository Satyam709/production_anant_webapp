"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface NewsTickerSectionProps {
  news: string[];
}

const NewsTickerSection = ({ news }: NewsTickerSectionProps) => {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % news.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [news.length]);

  return (
    <div className="bg-gradient-to-r from-black/40 via-black/20 to-black/40 backdrop-blur-sm text-white py-4 overflow-hidden border-y border-blue-900/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center">
          <div className="mr-4 px-3 py-1 bg-[#f5c722] text-blue-950 font-bold rounded">LATEST</div>
          <div className="overflow-hidden whitespace-nowrap flex-1 text-lg">
            <div className="relative">
              <motion.div
                key={currentNewsIndex}
                initial={{ opacity: 0, transform: "translateY(20px)" }}
                animate={{ opacity: 1, transform: "translateY(0px)" }}
                exit={{ opacity: 0, transform: "translateY(-20px)" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute left-0 right-0 text-blue-100"
              >
                {news[currentNewsIndex]}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsTickerSection;
