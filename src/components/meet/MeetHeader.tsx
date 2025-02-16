import React from 'react';
import { Video, Calendar, Clock } from 'lucide-react';

const MeetHeader = () => {
  return (
    <div className="text-center mb-16">
      <h1 className="text-5xl font-bold mb-6 mt-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500">
        Meetings
      </h1>
      <p className="text-gray-400 max-w-2xl mx-auto">
        All your upcoming meetings in one place.
      </p>
      {/* <div className="flex justify-center gap-4 mt-8">
        <button className="flex items-center gap-2 px-6 py-2 rounded-lg bg-blue-500/10 text-cyan-400 border border-blue-500/20 hover:bg-blue-500/20 transition-all">
          <Video size={18} />
          Join Meeting
        </button>
        <button className="flex items-center gap-2 px-6 py-2 rounded-lg bg-blue-500/10 text-cyan-400 border border-blue-500/20 hover:bg-blue-500/20 transition-all">
          <Calendar size={18} />
          Schedule
        </button>
        <button className="flex items-center gap-2 px-6 py-2 rounded-lg bg-blue-500/10 text-cyan-400 border border-blue-500/20 hover:bg-blue-500/20 transition-all">
          <Clock size={18} />
          Upcoming
        </button>
      </div> */}
    </div>
  );
};

export default MeetHeader;