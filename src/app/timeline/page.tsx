"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const timelineEvents = [
  {
    date: '1st Jan 2025',
    title: 'Anant came into existence',
    description: 'The beginning of our journey',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    date: '25th Feb 2025',
    title: 'Website hosted',
    description: 'Our digital presence established',
    gradient: 'from-cyan-500 to-blue-500'
  }
];

export default function Timeline()
{
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 w-full h-full opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto relative">
        <motion.h1 
          className="text-5xl font-bold text-center mb-20"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text">
            Our Journey
          </span>
        </motion.h1>

        <div className="relative">
          {/* Vertical line */}
          <motion.div 
            className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-cyan-400 via-purple-400 to-cyan-400"
            style={{ height: 'calc(100% - 4rem)' }}
            initial={{ height: 0 }}
            animate={{ height: 'calc(100% - 4rem)' }}
            transition={{ duration: 1.5, delay: 0.5 }}
          ></motion.div>
          
          {timelineEvents.map((event, index) => (
            <motion.div
              key={event.date}
              className={`mb-24 flex items-center ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: index * 0.5 + 0.5 }}
            >
              <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                <motion.div
                  className="bg-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${event.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
                  
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text">
                    {event.title}
                  </h3>
                  <p className="text-gray-300 mt-3 text-lg">{event.description}</p>
                  <div className="flex items-center mt-4 text-sm text-cyan-300 justify-end gap-2">
                    {event.date}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </motion.div>
              </div>
              
              <div className="relative flex items-center justify-center">
                <motion.div 
                  className="w-12 h-12 bg-gray-800 rounded-full border-2 border-cyan-400 z-10 shadow-lg shadow-cyan-500/20"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.5 + 1 }}
                >
                {index%2==0 && <ArrowLeft className="w-6 h-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-purple-400" />}
                {index%2==1 && <ArrowRight className="w-6 h-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-cyan-400" />}
                </motion.div>
              </div>
              
              <div className="w-1/2"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
