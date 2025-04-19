"use client";
import React from 'react';
import { User } from 'lucide-react';
import {NewsLetter} from "@prisma/client"
import { placeholder } from '@/lib/images/placeholder';
import { useRouter } from 'next/navigation';

const NewsLetterCard: React.FC<NewsLetter> = ({
  id,
  title,
  description,
  cover_picture,
  userID,
}) => {

  const router = useRouter();

  return (
<div className="p-4">
  <div
    className="bg-gray-900 rounded-xl overflow-hidden shadow-lg 
               hover:shadow-cyan-500/30 hover:scale-[1.02] hover:ring-1 hover:ring-cyan-400/30 
               transition-all duration-300 cursor-pointer transform"
    onClick={() => router.push(`/newsletter/${id}`)}
  >
    <div className="p-3 pb-0">
      <img
        src={cover_picture || placeholder}
        alt={title}
        className="w-full h-48 object-cover rounded-lg"
      />
    </div>
    <div className="p-6 pt-4">
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 mb-4 line-clamp-3">{description}</p>
      <div className="flex items-center gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <User size={16} className="text-cyan-500" />
          <span>{userID}</span>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default NewsLetterCard;