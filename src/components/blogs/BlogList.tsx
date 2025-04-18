import React from 'react';
import BlogCard_Dashboard from "./BlogCard_Dashboard"
import {Blog} from "@prisma/client"

interface BlogListProps {
  title: string;
  blogs: Blog[];
  onEdit?: (id: string) => void;
  onDelete: (id: string) => void;
  onAccept?: (id: string) => void;
}

const BlogList: React.FC<BlogListProps> = ({
  title,
  blogs,
  onEdit,
  onDelete,
  onAccept
}) => {
  if (blogs.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">{title}</h2>
        <p className="text-gray-500 dark:text-gray-400 italic">No blogs found</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all duration-300">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map(blog => (
          <BlogCard_Dashboard
            key={blog.id}
            blog={blog}
            onEdit={onEdit}
            onDelete={onDelete}
            onAccept={onAccept}
            type={blog.isVerified==true ? "published" : "draft"}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogList;