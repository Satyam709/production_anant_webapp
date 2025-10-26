import { Trophy, Users } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const CompHeader = () => {
  return (
    <div className="text-center mb-16">
      <h1 className="text-4xl font-bold mb-4">Competitions</h1>
      <p className="text-gray-400 mb-8">
        Form teams, participate in competitions, and showcase your skills !
      </p>

      <div className="flex justify-center gap-4">
        <Link
          href="/compete"
          className="flex items-center gap-2 px-6 py-2 rounded-lg bg-[#0A0A0A]/80 backdrop-blur-sm border border-gray-800"
        >
          <Trophy size={18} className="text-primary-blue" />
          <span>Active Competitions</span>
        </Link>
        <Link
          href="/dashboard"
          className="flex items-center gap-2 px-6 py-2 rounded-lg bg-[#0A0A0A]/80 backdrop-blur-sm border border-gray-800"
        >
          <Users size={18} className="text-primary-blue" />
          <span>My Teams</span>
        </Link>
        {/* <Link href="/dashboard" className="flex items-center gap-2 px-6 py-2 rounded-lg bg-[#0A0A0A]/80 backdrop-blur-sm border border-gray-800">
          <Bell size={18} className="text-primary-blue" />
          <span>Invitations</span>
        </Link> */}
      </div>
    </div>
  );
};

export default CompHeader;
