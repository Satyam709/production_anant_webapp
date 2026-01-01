import { Sponsor } from '@prisma/client';
import React from 'react';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import SponsorCard from '@/components/sponsor/SponsorCard';
import SponsorHeader from '@/components/sponsor/SponsorHeader';
import { getSponsors } from '@/lib/actions/Sponsor';


const groupSponsorsByYear = (sponsors: Sponsor[]) => {
  const groups: Record<string, Sponsor[]> = {};

  sponsors.forEach((sponsor) => {
    const year = sponsor.year 
      ? sponsor.year.toString() 
      : new Date(sponsor.createdAt).getFullYear().toString();

    if (!groups[year]) {
      groups[year] = [];
    }
    groups[year].push(sponsor);
  });

  // Return entries sorted by year descending (2025, then 2024...)
  return Object.entries(groups).sort((a, b) => Number(b[0]) - Number(a[0]));
};
export default async function SponsorPage() {
  // Call the server action instead of prisma directly
  const sponsors = await getSponsors();

  const sponsorsByYear = groupSponsorsByYear(sponsors);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Background Blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-blue/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-primary-purple/10 rounded-full blur-[100px]" />
      </div>

      <Navbar />

      <main className="relative z-10 container mx-auto px-4 py-20">
        <SponsorHeader />

        {sponsorsByYear.length === 0 ? (
          <div className="text-center text-gray-500 py-20 text-xl">
            No sponsors found.
          </div>
        ) : (
          sponsorsByYear.map(([year, yearSponsors]) => (
            <section key={year} className="mb-24">
              {/* Year Divider */}
              <div className="flex items-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-500">
                  {year}
                </h2>
                <div className="h-[1px] bg-gradient-to-r from-gray-700 to-transparent flex-1 ml-6"></div>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {yearSponsors.map((sponsor) => (
                  <SponsorCard key={sponsor.id} {...sponsor} />
                ))}
              </div>
            </section>
          ))
        )}
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
