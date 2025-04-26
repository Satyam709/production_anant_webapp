"use client";
import React from "react";
import { ArrowRight, User } from "lucide-react";
import Link from "next/link";

interface Blog {
  id: number;
  title: string;
  author: string;
  image: string;
  category: string;
}

interface HomeBlogsSectionProps {
  blogs: Blog[];
}

const HomeBlogsSection = ({ blogs }: HomeBlogsSectionProps) => {
  return (
    <section className="py-24 bg-black/15 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-200">
            Latest Blogs
          </h2>
          <Link
            href="/blogs"
            className="text-[#00E0FF] hover:text-[#f7d452] flex items-center"
          >
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-black/20 backdrop-blur-sm rounded-xl overflow-hidden border border-blue-900/50 hover:border-blue-800/50 transition-all"
            >
              <div className="relative">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-[#00E0FF] text-blue-950 font-medium text-xs px-2 py-1 rounded">
                  {blog.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-100 mb-3">
                  {blog.title}
                </h3>
                <div className="flex items-center text-blue-200/80 mb-4">
                  <User className="h-4 w-4 mr-2" />
                  <span>{blog.author}</span>
                </div>
                <Link
                  href={`/blogs/${blog.id}`}
                  className="inline-flex items-center text-[#00E0FF] hover:text-[#f7d452]"
                >
                  Read More <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeBlogsSection;
