'use client';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface SideBarItemsProps {
  name: string;
  href: string;
  icon: LucideIcon;
}

function SideBarItems(item: SideBarItemsProps) {
  const path = usePathname();
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
        path === item.href
          ? 'bg-primary-purple/20 text-white border border-primary-purple/30'
          : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
      }`}
    >
      <Icon className="h-5 w-5" />
      {item.name}
    </Link>
  );
}

export default SideBarItems;
