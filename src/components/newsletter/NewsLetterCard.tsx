import React from 'react';
import { Download, Trash2 } from 'lucide-react';
import { NewsLetter } from '@prisma/client';
import {formatDate} from '@/helpers/formatDate';

interface NewsletterCardProps {
  newsletter: NewsLetter;
  onDelete: (id: string) => void;
  deleteopt?: boolean;
}

const NewsletterCard: React.FC<NewsletterCardProps> = ({ newsletter, onDelete, deleteopt }) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:bg-gray-750 hover:border-gray-600 group">
      <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors duration-300">
            {newsletter.title}
          </h2>
          {newsletter.category && <p className="text-gray-400">
            {newsletter.category} : {1.1}
          </p>}
          <p className="text-gray-400">
            Published: {formatDate(newsletter.publisedAt)}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <a 
            href={newsletter.fileUrl}
            className="flex items-center justify-center bg-gray-700 hover:bg-emerald-600 text-white py-3 px-6 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 shadow-sm"
            download
          >
            <Download className="h-5 w-5 mr-2" />
            <span>Download</span>
          </a>
          
          {deleteopt && <button
            onClick={() => onDelete(newsletter.id)}
            className="flex items-center justify-center bg-gray-700 hover:bg-red-600 text-white py-3 px-4 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 shadow-sm"
            aria-label="Delete newsletter"
          >
            <Trash2 className="h-5 w-5" />
          </button>
          }
        </div>
      </div>
    </div>
  );
};

export default NewsletterCard;