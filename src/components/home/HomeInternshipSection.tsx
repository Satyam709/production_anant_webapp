"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { InternshipWithUser } from "@/types/internship";
import InternshipCard from "@/components/internship/InternshipCard";

export default function HomeInternshipSection() {
  const [internships, setInternships] = useState<InternshipWithUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const response = await fetch("/api/internships?limit=3");
        const data = await response.json();
        setInternships(data);
      } catch (error) {
        console.error("Error fetching internships:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, []);

  if (loading || internships.length === 0) return null;

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-200">
            Latest Internships
          </h2>
          <Link
            href="/internship"
            className="text-[#00E0FF] hover:text-[#f7d452] flex items-center"
          >
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {internships.map((internship) => (
            <InternshipCard key={internship.id} internship={internship} />
          ))}
        </div>
      </div>
    </section>
  );
}
