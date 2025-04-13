"use client";
import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface HomeGallerySectionProps {
  photos: string[];
}

const HomeGallerySection = ({ photos }: HomeGallerySectionProps) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-200">Photo Gallery</h2>
          <Link href="/photos" className="text-[#f5c722] hover:text-[#f7d452] flex items-center">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden rounded-lg group bg-black/20 backdrop-blur-sm border border-blue-900/50 hover:border-blue-800/50 transition-all"
            >
              <img
                src={photo}
                alt={`Gallery photo ${index + 1}`}
                className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeGallerySection;
