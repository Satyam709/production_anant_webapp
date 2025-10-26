'use server';
import React from 'react';

import Category_Box from '@/components/certificate-verification/Category_Box';
import Cert_Header from '@/components/certificate-verification/Cert_Header';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

interface category_data {
  issuedFor: string;
}

export default async function Certificate_Category() {
  const categoryData = (await getCategoryData()).categoryData;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="fixed inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-blue/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-primary-purple/10 rounded-full blur-[100px]" />
      </div>

      <Navbar />

      <main className="relative z-10 container mx-auto px-4 py-20 min-h-[80vh]">
        <Cert_Header />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryData.map((category: category_data, index: number) => (
            <Category_Box key={index} category={category.issuedFor} />
          ))}
        </div>
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}

export async function getCategoryData() {
  try {
    const response = await fetch(
      `${process.env.API_URL}/api/certificate-verification`
    );
    if (!response.ok) throw new Error('Failed to fetch category data');

    const data = await response.json();

    if (!data) {
      return {
        categoryData: [],
      };
    }

    return {
      categoryData: data as category_data[],
    };
  } catch (error) {
    console.error('Error fetching category data:', error);

    return {
      categoryData: [],
    };
  }
}
