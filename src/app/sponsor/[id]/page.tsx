import { ArrowLeft, Award, Calendar, Globe } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';

import { EditorPreview } from '@/components/blogs/BlogPreview';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import GradientButton from '@/components/ui/GradientButton';
import { getSponsorById } from '@/lib/actions/Sponsor';
import { placeholder } from '@/lib/images/placeholder';

// ... SponsorDetails function and data fetching remain the same ...
export default async function SponsorDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sponsor = await getSponsorById(id);
  if (!sponsor) notFound();

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* ... background blobs and navbar ... */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-blue/10 rounded-full blur-[100px]" />
      </div>
      <Navbar />

      <main className="container mx-auto px-4 py-24 relative z-10">
        <Link
          href="/sponsor"
          className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Sponsors
        </Link>

        <div className="max-w-5xl mx-auto">
          <div className="bg-black/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 shadow-2xl">
            {/* Sponsor Hero Image/Logo Container */}
            {/* Removed padding (p-8) from container so image hits the edges */}
            <div className="relative h-64 md:h-80 w-full bg-white/5 flex items-center justify-center p-0">
              <Image
                src={sponsor.imageUrl || placeholder}
                alt={sponsor.name}
                fill
                // Changed from object-contain to object-cover
                className="object-cover"
              />
            </div>

            {/* ... Rest of the content (p-8 md:p-12) remains the same ... */}
            <div className="p-8 md:p-12">
              {/* ... header, grid, etc. ... */}
              <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
                <div>
                  <h1 className="text-4xl font-bold mb-2">{sponsor.name}</h1>
                  <span className="inline-block px-3 py-1 rounded-full bg-primary-blue/10 border border-primary-blue/20 text-primary-blue text-sm font-medium">
                    {sponsor.category}
                  </span>
                </div>

                {sponsor.link && (
                  <a href={sponsor.link} target="_blank" rel="noreferrer">
                    <GradientButton>Visit Website</GradientButton>
                  </a>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Left Column: Key Stats */}
                <div className="space-y-6 md:col-span-1">
                  <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 space-y-5">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-yellow-500/10 rounded-lg">
                        <Award className="text-yellow-500" size={24} />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-gray-400 uppercase">
                          Tier
                        </p>
                        <p className="text-lg">{sponsor.category}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-primary-purple/10 rounded-lg">
                        <Calendar className="text-primary-purple" size={24} />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-gray-400 uppercase">
                          Event
                        </p>
                        <p className="text-lg">{sponsor.event}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-cyan-500/10 rounded-lg">
                        <Globe className="text-cyan-400" size={24} />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-gray-400 uppercase">
                          Year
                        </p>
                        <p className="text-lg">
                          {new Date(sponsor.createdAt).getFullYear()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: About */}
                <div className="md:col-span-2">
                  <h3 className="text-2xl font-semibold mb-6 border-b border-gray-800 pb-2">
                    About the Sponsor
                  </h3>
                  <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {sponsor.about ? (
                      sponsor.about.startsWith('{') ||
                      sponsor.about.includes('<') ? (
                        <EditorPreview content={sponsor.about} />
                      ) : (
                        <p className="whitespace-pre-wrap leading-relaxed">
                          {sponsor.about}
                        </p>
                      )
                    ) : (
                      <p className="italic text-gray-500">
                        No additional details provided.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
