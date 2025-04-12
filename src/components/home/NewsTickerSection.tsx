"use client";
import React, { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { motion, useAnimationFrame } from "framer-motion";

export interface NewsItem {
  id: string | number;
  title: string;
  created_at: string;
}

interface NewsTickerSectionProps {
  news: NewsItem[];
}

const NewsTickerSection = ({ news }: NewsTickerSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Repeated news for infinite scroll effect
  const repeatedNews = [...news, ...news];

  // Use framer-motion animation frame for seamless movement
  const x = useRef(0);
  const speed = 0.3; // pixels per frame

  useAnimationFrame(() => {
    if (containerRef.current) {
      x.current -= speed;
      if (containerRef.current.scrollWidth / 2 + x.current < 0) {
        x.current = 0;
      }
      containerRef.current.style.transform = `translateX(${x.current}px)`;
    }
  });

  if (!news || news.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-black/40 via-black/20 to-black/40 backdrop-blur-sm text-white border-y border-blue-900/50 transition-all duration-300">
      <div className="container mx-auto px-4 py-4">
        {/* Top ticker row */}
        <div className="flex items-center overflow-hidden relative">
          <div className="mr-4 px-3 py-1 bg-[#f5c722] text-blue-950 font-bold rounded">
            LATEST
          </div>

          {/* Smooth circular marquee */}
          <div className="relative flex-1 overflow-hidden h-[32px]">
            <div
              ref={containerRef}
              className="flex whitespace-nowrap gap-12 absolute will-change-transform pl-[50px] md:pl-[100px]"
            >
              {repeatedNews.map((item, index) => (
                <Link
                  key={`${item.id}-${index}`}
                  href={`/notices/${item.id}`}
                  className="text-blue-100 text-lg hover:underline"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Expand toggle */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="ml-4 text-white hover:text-yellow-400 transition-transform"
            aria-label="Toggle Expand News List"
          >
            <ChevronDown
              className={`w-6 h-6 transform transition-transform ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Expanded full list */}
        {isExpanded && (
          <div className="mt-4 max-h-52 overflow-y-auto pr-2 space-y-3 text-sm text-blue-100 border-t border-blue-900 pt-3">
            {news.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-start gap-3"
              >
                <Link
                  href={`/notices/${item.id}`}
                  className="hover:text-yellow-300 transition-colors underline"
                >
                  {item.title}
                </Link>
                <span className="text-xs text-blue-400 whitespace-nowrap">
                  {new Date(item.created_at).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsTickerSection;
