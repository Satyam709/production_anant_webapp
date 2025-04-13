"use client";
import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface Project {
  id: number;
  title: string;
  department: string;
  image: string;
}

interface HomeProjectsSectionProps {
  projects: Project[];
}

const HomeProjectsSection = ({ projects }: HomeProjectsSectionProps) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-200">
            Projects & Internships
          </h2>
          <Link href="/projects" className="text-[#f5c722] hover:text-[#f7d452] flex items-center">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-black/20 backdrop-blur-sm rounded-xl overflow-hidden border border-blue-900/50 hover:border-blue-800/50 transition-all"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-100 mb-3">
                  {project.title}
                </h3>
                <div className="text-blue-200/80 mb-4">
                  <span className="font-medium text-blue-100">Department:</span>{" "}
                  {project.department}
                </div>
                <Link
                  href={`/projects/${project.id}`}
                  className="inline-flex items-center text-[#f5c722] hover:text-[#f7d452]"
                >
                  Read More <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeProjectsSection;
