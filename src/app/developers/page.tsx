"use client";
import { developers } from "@/data/devs";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface CommitData {
  month: string;
  commits: number;
}

interface DeveloperCardProps {
  dev: {
    id: number;
    name: string;
    role: string;
    image: string;
    github: string;
    linkedin: string;
    contributions: string[];
    commitHistory?: number[];
  };
  loading: boolean;
  index: number;
  rank: number;
}

const months = ["Dec", "Jan", "Feb", "Mar", "Apr"];

const DeveloperCard = ({ dev, loading, index, rank }: DeveloperCardProps) => {
  // Convert the commit history array to the format required by the chart
  const commitData: CommitData[] = (dev.commitHistory || Array(5).fill(0)).map(
    (commits, i) => ({
      month: months[i],
      commits: commits,
    })
  );

  const totalCommits = (dev.commitHistory || []).reduce(
    (sum, count) => sum + count,
    0
  );

  return (
    <motion.div
      key={dev.id}
      className="relative bg-black/40 backdrop-blur rounded-2xl p-8 border border-white/[0.1]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="absolute -top-3 -right-3 bg-purple-500/80 text-white rounded-full px-3 py-1 text-sm font-semibold backdrop-blur-sm">
        Rank #{rank + 1}
      </div>
      <motion.div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <motion.div
          className="relative w-40 h-40 group"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500/50 to-purple-500/50 rounded-2xl blur-xl opacity-50"
            whileHover={{ opacity: 0.7 }}
          />
          <motion.img
            src={dev.image}
            alt={dev.name}
            className="relative w-full h-full object-cover rounded-2xl border-2 border-white/10 transition-all duration-300 group-hover:border-purple-500/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>

        <div className="flex-1">
          <h3 className="text-2xl font-bold text-white mb-2 text-center md:text-left">
            {dev.name}
          </h3>
          <p className="text-purple-400 mb-4 text-center md:text-left">
            {dev.role}
          </p>

          {loading ? (
            <motion.div className="grid grid-cols-1 gap-4 mb-6">
              <motion.div className="bg-white/5 rounded-xl p-4 animate-pulse">
                <div className="h-4 bg-white/10 rounded w-20 mb-2"></div>
                <div className="h-6 bg-white/10 rounded w-12"></div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 gap-4 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <p className="text-sm text-gray-400">Total Commits</p>
                <p className="text-2xl font-bold text-white">
                  {totalCommits.toLocaleString()}
                </p>
              </motion.div>
            </motion.div>
          )}

          {/* Commit Activity Chart */}
          <div className="mt-6 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={commitData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis domain={[0, 50]} stroke="#9CA3AF" />
                <Tooltip
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "0.5rem",
                    color: "#E5E7EB",
                  }}
                />
                <Bar 
                  dataKey="commits" 
                  fill="#8B5CF6" 
                  radius={[4, 4, 0, 0]}
                  onMouseOver={() => {
                    document.body.style.cursor = 'pointer';
                  }}
                  onMouseOut={() => {
                    document.body.style.cursor = 'default';
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Social Links */}
          <motion.div className="flex gap-4 justify-center md:justify-start mt-6">
            <a
              href={dev.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors p-2 bg-white/5 rounded-lg hover:bg-white/10"
            >
              <FaGithub size={24} />
            </a>
            <a
              href={dev.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors p-2 bg-white/5 rounded-lg hover:bg-white/10"
            >
              <FaLinkedin size={24} />
            </a>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function DevelopersPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const sortedDevelopers = [...developers].sort((a, b) => {
    const aTotal = (a.commitHistory || []).reduce(
      (sum, count) => sum + count,
      0
    );
    const bTotal = (b.commitHistory || []).reduce(
      (sum, count) => sum + count,
      0
    );
    return bTotal - aTotal;
  });

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="relative isolate">
        {/* Background shapes and gradients */}
        <div
          className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
          aria-hidden="true"
        >
          <div
            className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
            style={{
              clipPath:
                "polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)",
            }}
          />
        </div>

        <div
          className="absolute inset-x-0 top-16 -z-10 transform-gpu overflow-hidden blur-3xl"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>

        <div className="relative">
          <Navbar />

          {/* Hero Section */}
          <div className="relative py-20">
            <div className="container mx-auto px-4">
              <motion.h1
                className="text-4xl md:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-6 p-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Our Developers
              </motion.h1>
              <motion.p
                className="text-gray-300 text-xl text-center max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Meet the passionate developers shaping the future of Anant
              </motion.p>
            </div>
          </div>

          {/* Main Content Section */}
          <div className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {sortedDevelopers.map((dev, index) => (
                <DeveloperCard
                  key={`${dev.name}-${dev.id}`}
                  dev={dev}
                  loading={loading}
                  index={index}
                  rank={index}
                />
              ))}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
