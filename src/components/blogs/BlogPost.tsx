import React from 'react';
import { Calendar, User, Tag, Clock } from 'lucide-react';
import {Blog} from "@prisma/client";
import { placeholder } from '@/lib/images/placeholder';

type BlogProp = Blog & {
  writtenBy: { name: string };
};

const BlogPost: React.FC<BlogProp> = ({
  title,
  description,
  cover_picture,
  body,
  writtenBy,
  createdAt,
  updatedAt,
  category,
}) => {
  return (
    <article className="max-w-4xl mx-auto my-4 bg-gray-900 rounded-2xl overflow-hidden shadow-xl">
    {/* Cover Image */}
    <div className="h-[400px] mb-8">
      <img
        src={cover_picture || placeholder}
        alt={title}
        className="w-full h-full object-cover"
      />
    </div>

    {/* Title and Description */}
    <div className="px-8">
      <div className="flex items-center gap-2 mb-6">
        <div className="flex items-center gap-1 bg-cyan-500/90 px-3 py-1 rounded-full">
          <Tag size={14} className="text-white" />
          <span className="text-sm font-medium text-white">{category}</span>
        </div>
      </div>
      <h1 className="text-3xl font-bold text-white mb-4">{title}</h1>
      <p className="text-l text-gray-300 mb-8">{description}</p>
    </div>

    {/* Blog Content */}
    <div className="max-w-4xl mx-auto px-6 sm:px-6 lg:px-8 py-16">
        <div 
            className="prose prose-invert prose-cyan max-w-none text-lg leading-relaxed  opacity-80
                    [&_img]:mx-auto [&_img]:my-12 [&_img]:rounded-lg [&_img]:max-w-2xl 
                    [&_img]:w-full [&_img]:shadow-xl"
            dangerouslySetInnerHTML={{ __html: body }}
        />

      {/* Author and Date Information */}
      <div className="mt-16 pt-8 border-t border-gray-800">
        <div className="grid gap-4">
          <div className="flex items-center gap-2">
            <User size={20} className="text-cyan-500" />
            <span className="text-gray-300">Written by <span className="text-white font-medium">{writtenBy.name}</span></span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={20} className="text-cyan-500" />
            <span className="text-gray-300">Published on <span className="text-white">{formatDate(createdAt)}</span></span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={20} className="text-cyan-500" />
            <span className="text-gray-300">Last updated <span className="text-white">{formatDate(updatedAt)}</span></span>
          </div>
        </div>
      </div>
    </div>
  </article>
  );
};

function formatDate(date: any) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default BlogPost;