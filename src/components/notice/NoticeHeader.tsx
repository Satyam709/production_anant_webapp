import React from 'react';
import { Bell, Filter } from 'lucide-react';

const NoticeHeader = () => {
  return (
    <div className="text-center mb-16">
      <h1 className="text-5xl font-bold mb-6 mt-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500">
        Notices
      </h1>
      <p className="text-gray-400 max-w-2xl mx-auto">
        Stay updated with the latest announcements, updates, and important information.
      </p>
      <div className="flex justify-center gap-4 mt-8">
        <button className="flex items-center gap-2 px-6 py-2 rounded-lg bg-blue-500/10 text-cyan-400 border border-blue-500/20 hover:bg-blue-500/20 transition-all">
          <Bell size={18} />
          All Notices
        </button>
        <button className="flex items-center gap-2 px-6 py-2 rounded-lg bg-blue-500/10 text-cyan-400 border border-blue-500/20 hover:bg-blue-500/20 transition-all">
          <Filter size={18} />
          Filter
        </button>
      </div>
    </div>
  );
};

export default NoticeHeader;