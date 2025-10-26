import Link from 'next/link';

import Footer from '@/components/Footer';
import InternshipCard from '@/components/internship/InternshipCard';
import Navbar from '@/components/Navbar';
import { InternshipWithUser } from '@/types/internship';

async function getInternships() {
  const response = await fetch(`${process.env.API_URL}/api/internships`, {
    next: { revalidate: 300 }, // Revalidate every hour
  });

  if (!response.ok) {
    throw new Error('Failed to fetch internships');
  }

  return response.json();
}

export default async function InternshipPage() {
  const internships = (await Promise.resolve().then(() =>
    getInternships()
  )) as InternshipWithUser[];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="fixed inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-blue/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-primary-purple/10 rounded-full blur-[100px]" />
      </div>

      <Navbar />

      <main className="relative z-10 container mx-auto px-4 py-20">
        <section className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-100">
            Student Internships
          </h1>
          <p className="text-lg text-blue-200/80 max-w-2xl mx-auto">
            Explore internship experiences of our talented students at various
            prestigious organizations
          </p>
          <Link
            href="/dashboard"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-xl transition"
          >
            Add Your Internship
          </Link>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {internships.map((internship) => (
            <InternshipCard key={internship.id} internship={internship} />
          ))}
          {internships.length === 0 && (
            <div className="col-span-full text-center text-blue-200/60">
              No internships found
            </div>
          )}
        </div>
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
