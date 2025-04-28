import React from 'react';
import { Calendar, User, Tag, Clock } from 'lucide-react';
import {Blog} from "@prisma/client";
import { placeholder } from '@/lib/images/placeholder';
import Image from 'next/image';
import { BlogPreview } from './BlogPreview';
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
    <article className="max-w-4xl mx-auto">
      {/* Category and Date */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center justify-between mb-8">
        <div className="flex items-center gap-1 bg-cyan-500/90 px-3 py-1 rounded-full max-w-fit">
          <Tag size={14} className="text-white" />
          <span className="text-sm font-medium text-white">{category}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <Calendar size={16} />
          <span className="text-sm">{formatDate(createdAt)}</span>
        </div>
      </div>

      {/* Title and Description */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">{title}</h1>
        <p className="text-xl text-gray-300 leading-relaxed">{description}</p>
      </header>

      {/* Cover Image */}
      <div className="relative h-[500px] mb-12 rounded-xl overflow-hidden">
        <Image
          src={cover_picture || placeholder}
          alt={title}
          width={1200}
          height={600}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Blog Content */}
      <div className="prose-container">
        <BlogPreview content={body}></BlogPreview>

        {/* Author Information */}
        <footer className="mt-16 pt-8 border-t border-gray-800/50">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <User size={20} className="text-cyan-500" />
              <span className="text-gray-300">By <span className="text-white font-medium">{writtenBy.name}</span></span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={20} className="text-cyan-500" />
              <span className="text-gray-300">Updated <span className="text-white">{formatDate(updatedAt)}</span></span>
            </div>
          </div>
        </footer>
    </div>
  </article>
  );
};

function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default BlogPost;
