import React from 'react';
import { ChevronLeft } from 'lucide-react';
import Link  from 'next/link';
import { Certificate } from '@prisma/client';
import AppreciationCertificate from '@/components/certificate-verification/AppreciationCertificate';
import ParticipationCertificateList from '@/components/certificate-verification/ParticipationCertitificate';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default async function Certificates_Page({ params }: { params: { category: string } }) {

  const { category } = await params;
  const certificateData: Certificate[] = await getCertificateData(category);

  const appreciationCertificates = certificateData.filter(cert => cert.cop === false);
  const participationCertificates = certificateData.filter(cert => cert.cop === true);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
        <div className="fixed inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-blue/10 rounded-full blur-[100px]" />
          <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-primary-purple/10 rounded-full blur-[100px]" />
        </div>
  
        <Navbar />

        <main className="relative z-10 container mx-auto px-4 py-20 min-h-[80vh]">
            <div className='mt-6 mb-12'>
            {appreciationCertificates.length > 0 && (
                <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mt-4 mb-8 flex items-center">
                    <span className="text-blue-400 mr-2">★</span>
                    Appreciation Certificates
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {appreciationCertificates.map((cert, index) => (
                    <AppreciationCertificate key={index} certificate={cert} />
                    ))}
                </div>
                </div>
            )}
            
            {participationCertificates.length > 0 && (
                <div>
                <ParticipationCertificateList certificates={participationCertificates} />
                </div>
            )}

            {certificateData.length === 0 && (
                <div className="text-center py-12">
                <p className="text-gray-400">No certificates found in this category.</p>
                </div>
            )}
            </div>
        </main>

        <div className="relative z-10">
          <Footer />
        </div>
    </div>
  );
};


export async function getCertificateData(categoryName: string) {
  try {
    console.log('Fetching certificate data for category:', categoryName);
    const response = await fetch(`${process.env.API_URL}/api/certificate-verification/${categoryName}`);
    if (!response.ok) throw new Error('Failed to fetch certificate data');

    const data = await response.json();

    if (!data) {
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching certificate data:', error);
    return [];
  }
}