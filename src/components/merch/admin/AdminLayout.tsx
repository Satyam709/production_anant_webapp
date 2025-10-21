import { LogOut, Package, Settings, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();

  const navItems = [
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingBag },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

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
              <ul className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                          router.pathname === item.href
                            ? 'bg-primary-purple/20 text-white border border-primary-purple/30'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-gray-800">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-300"
              >
                <LogOut className="h-5 w-5" />
                Logout
              </button>
            </div>
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
