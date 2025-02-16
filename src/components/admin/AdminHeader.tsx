import React from 'react';
import { Shield } from 'lucide-react';

const AdminHeader = ({isAdmin}:{isAdmin:boolean} ) => {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center space-x-4 mb-6 mt-12">
        <Shield className="h-10 w-10 text-primary-cyan" />
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
      </div>
      <p className="text-gray-400 max-w-2xl text-center mx-auto">
        Manage Notices, Events, Meetings and Competitions
      </p>
    </div>
  );
};

export default AdminHeader;