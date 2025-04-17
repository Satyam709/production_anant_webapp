"use client";
import React from 'react';
import { Calendar, User, Tag } from 'lucide-react';
import {Blog} from "@prisma/client"
import { placeholder } from '@/lib/images/placeholder';
import { useRouter } from 'next/navigation';

const BlogCard: React.FC<Blog> = ({
  id,
  title,
  description,
  cover_picture,
  userID,
  category
}) => {

  const router = useRouter();

  return (
<div className="p-4">
  <div
    className="bg-gray-900 rounded-xl overflow-hidden shadow-lg 
               hover:shadow-cyan-500/30 hover:scale-[1.02] hover:ring-1 hover:ring-cyan-400/30 
               transition-all duration-300 cursor-pointer transform"
    onClick={() => router.push(`/blogs/${id}`)}
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
      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-800 text-cyan-400 border border-cyan-500/20 mb-4">
        {category}
      </div>
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

export default BlogCard;