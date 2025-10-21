import { redirect } from 'next/navigation';
import React from 'react';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import ProfileLayout from '@/components/profile/ProfileLayout';
import { getUserInfo } from '@/lib/actions/Profile';
import { isAuthenticated } from '@/lib/actions/Sessions';

const Profile = async () => {
  if (!(await isAuthenticated())) {
    redirect('/login');
  }
  const user = await getUserInfo();

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="fixed inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-blue/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-primary-purple/10 rounded-full blur-[100px]" />
      </div>

      <div className="fixed inset-0 pointer-events-none"></div>

      <Navbar />

      <main className="relative z-10 container mx-auto px-4 py-20">
        {user ? (
          <ProfileLayout userInfo={user} />
        ) : (
          <div className="flex flex-col items-center justify-center h-[50vh] text-gray-400">
            <h1 className="text-3xl font-semibold text-white">
              User Not Found
            </h1>
            <p className="text-lg mt-2 text-gray-500">
              The profile you are looking for does not exist.
            </p>
          </div>
        )}
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
};

export default Profile;
