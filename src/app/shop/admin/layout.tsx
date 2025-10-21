import { Settings } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import LogoutButton from '@/components/merch/clientUi/LogoutButton';
import SideBar from '@/components/merch/clientUi/SideBar';
import isAdmin from '@/lib/actions/Admin';

const AdminLayout: React.FC<{ children: React.ReactNode }> = async ({
  children,
}) => {
  if (!(await isAdmin())) {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Background Elements */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/5 via-primary-purple/5 to-black"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-primary-cyan/5 to-transparent"></div>
      </div>

      {/* Admin Layout */}
      <div className="relative flex">
        {/* Sidebar */}
        <div className="fixed inset-y-0 left-0 w-64 bg-gray-900/50 backdrop-blur-md border-r border-gray-800">
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="p-6 border-b border-gray-800">
              <Link href="/admin" className="flex items-center gap-2">
                <Settings className="h-6 w-6 text-primary-cyan" />
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-cyan to-primary-purple">
                  Admin Panel
                </span>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4">
              <SideBar></SideBar>
            </nav>

            {/* Logout */}
            <LogoutButton></LogoutButton>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-64">
          <main className="p-8">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
