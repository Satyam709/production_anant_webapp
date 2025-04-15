"use client";
import React from "react";
import { ArrowRight } from "lucide-react";
import PhotoSlideshow from "@/components/shared/PhotoSlideshow";

interface WelcomeSectionProps {
  photos: string[];
}

const WelcomeSection = ({ photos }: WelcomeSectionProps) => {
  return (
    <section className="py-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-200 mb-6">
              Welcome To &quot;Anant&quot; The Mathematical Society NIT
              Kurukshetra
            </h2>
            <p className="text-lg text-blue-100 mb-6">
              As part of the Department of Mathematics, we host competitions,
              talks, workshops, and sessions year-round. Join us as we navigate
              the exciting world of math and empower students for success on
              campus and beyond!
            </p>
            <a
              href="/about"
              className="inline-flex items-center px-5 py-3 text-[#f5c722] hover:text-[#f7d452] transition-colors font-medium"
            >
              Read More <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
          <div className="md:w-1/2">
            <PhotoSlideshow photos={photos} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
