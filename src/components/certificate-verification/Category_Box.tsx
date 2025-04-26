import React from 'react';
import { Award } from 'lucide-react';
import Link from 'next/link';

export default function CategoryBox({ category } : {category: string}) {
    const IconComponent = Award;

    return (
            <div
                className="bg-gray-800 rounded-xl p-6 cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:bg-gray-750 border border-gray-700 group"
            >
            <Link href={`/certificate-verification/${category}`}>
                <div className="flex items-center justify-between mb-4">
                    <IconComponent className="h-8 w-8 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{category}</h3>
                <p className="text-gray-400 text-sm">
                    View and verify {category} certificates
                </p>
            </Link>
            </div>
        );

}
