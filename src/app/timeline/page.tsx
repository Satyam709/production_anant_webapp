"use client";

import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { timelineEvents } from "./../../data/timeline.json";


export default function Timeline() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-24 sm:py-24 px-4 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 w-full h-full opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-500 rounded-full filter blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <motion.h1
            className="text-4xl sm:text-5xl font-bold text-center mb-12 sm:mb-20"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text">
              Our Journey
            </span>
          </motion.h1>

          <div className="relative">
            {/* Vertical line - hidden on mobile, shown on larger screens */}
            <motion.div
              className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-cyan-400 via-purple-400 to-cyan-400 hidden sm:block"
              style={{ height: "calc(100% - 4rem)" }}
              initial={{ height: 0 }}
              animate={{ height: "calc(100% - 4rem)" }}
              transition={{ duration: 1.5, delay: 0.5 }}
            ></motion.div>

            {/* Mobile vertical line */}
            <motion.div
              className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 via-purple-400 to-cyan-400 sm:hidden"
              initial={{ height: 0 }}
              animate={{ height: "100%" }}
              transition={{ duration: 1.5, delay: 0.5 }}
            ></motion.div>

            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.date}
                className={`mb-12 sm:mb-24 flex items-start sm:items-center ${
                  index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                } flex-row`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: index * 0.5 + 0.5 }}
              >

                {/* Content */}
                <div
                  className={`flex-1 pl-6 sm:pl-12 sm:pr-12 ${
                    index % 2 === 0 ? "sm:text-right" : ""
                  }`}
                >
                  <motion.div
                    className="bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden group"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Gradient overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${event.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
                    ></div>

                    <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text">
                      {event.title}
                    </h3>
                    <p className="text-gray-300 mt-2 sm:mt-3 text-base sm:text-lg">
                      {event.description}
                    </p>
                    <div className={`flex items-center mt-3 sm:mt-4 text-sm text-cyan-300 ${
                      index % 2 === 0 ? "sm:justify-end" : "justify-start"
                    } gap-2`}>
                      {event.date}
                    </div>
                  </motion.div>
                </div>

                {/* Empty space for desktop layout */}
                <div className="hidden sm:block sm:w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}