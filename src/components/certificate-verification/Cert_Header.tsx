import { Award } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function CategoryBox() {
  const IconComponent = Award;

  return (
    <div className="py-8 px-4 mb-8 md:px-6 lg:px-8 border-b border-gray-700">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/certificate-verification"
          className="flex items-center justify-center"
        >
          <Award className="h-8 w-8 text-blue-400 mr-3" />
          <h1 className="text-2xl font-bold text-white">
            Certificate Verification
          </h1>
        </Link>
      </div>
    </div>
  );
}
