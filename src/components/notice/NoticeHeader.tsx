import React from 'react';

const NoticeHeader = () => {
  return (
    <div className="text-center mb-16">
      <h1 className="text-5xl font-bold mb-6 mt-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500">
        Notices
      </h1>
      <p className="text-gray-400 max-w-2xl mx-auto">
        Stay updated with the latest announcements, updates, and important
        information.
      </p>
    </div>
  );
};

export default NoticeHeader;
