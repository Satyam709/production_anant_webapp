import { Blog } from '@prisma/client';
import { Check, Trash2 } from 'lucide-react';
import React from 'react';

import { formatDate } from '@/helpers/formatDate';
import { placeholder } from '@/lib/images/placeholder';

interface BlogCardProps {
  blog: Blog;
  onEdit?: (id: string) => void;
  onDelete: (id: string) => void;
  onAccept?: (id: string) => void;
  onOpen?: (id: string) => void;
  type: 'published' | 'draft';
}

const BlogCard: React.FC<BlogCardProps> = ({
  blog,
  onEdit,
  onDelete,
  onAccept,
  onOpen,
  type,
}) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full">
      {(blog.cover_picture || placeholder) && (
        <div
          className="h-40 overflow-hidden"
          onClick={() => onOpen && onOpen(blog.id)}
        >
          <img
            src={blog.cover_picture || placeholder}
            alt={blog.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      )}

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2">
          {blog.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-3">
          {blog.description}
        </p>

        <div className="mt-auto">
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3">
            {type === 'published' ? (
              <>
                <span>Published: {formatDate(blog.createdAt || '')}</span>
              </>
            ) : (
              <>
                <span>Last edited: {formatDate(blog.updatedAt || '')}</span>
                <span className="mx-2">•</span>
                <span>{blog.isVerified == true ? 'Published' : 'Draft'}</span>
              </>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            {/* {onEdit && (
                <button 
                  onClick={() => onEdit(blog.id)}
                  className="p-2 text-blue-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-600 rounded-full transition-colors"
                  aria-label="Edit blog"
                >
                  <Edit size={18} />
                </button>
              )} */}

            {type === 'draft' && onAccept && (
              <button
                onClick={() => onAccept(blog.id)}
                className="p-2 text-green-500 hover:text-green-600 hover:bg-green-50 dark:hover:bg-gray-600 rounded-full transition-colors"
                aria-label="Accept draft"
              >
                <Check size={18} />
              </button>
            )}

            <button
              onClick={() => onDelete(blog.id)}
              className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-gray-600 rounded-full transition-colors"
              aria-label="Delete blog"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
