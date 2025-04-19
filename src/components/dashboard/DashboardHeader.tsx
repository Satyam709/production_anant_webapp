import React from 'react';
import { Trophy, Calendar, Users, Bell, UserPlus, Send, ImageIcon, Newspaper, Pencil, Briefcase, Star } from 'lucide-react';

type Props = {
  activeTab: 'competitions' | 'events' | 'meetings' | 'notices' | 'teams' | 'shop' | 'gallery' | 'newsletter' | 'blogs' | 'internships' | 'achievements';
};

const tabConfig = {
  competitions: {
    title: "Manage Competitions",
    description: "Create and manage coding competitions",
    icon: Trophy,
  },
  events: {
    title: "Manage Events",
    description: "Create and manage club events",
    icon: Calendar,
  },
  meetings: {
    title: "Manage Meetings",
    description: "Schedule and organize team meetings",
    icon: Users,
  },
  notices: {
    title: "Manage Notices",
    description: "Create and publish important announcements",
    icon: Bell,
  },
  teams: {
    title: "Team Management",
    description: "Create and manage your teams",
    icon: UserPlus,
  },
  shop: {
    title: "Shop",
    description: "Manage your shop",
    icon: Send,
  },
  gallery: {
    title: "Photo Gallery",
    description: "Manage albums and photos",
    icon: ImageIcon,
  },
  newsletter: {
    title: "Newsletter",
    description: "Create newsletters",
    icon: Newspaper,
  },
  blogs: {
    title: "Blogs",
    description: "Create and manage blogs",
    icon: Pencil,
  },
  internships: {
    title: "Manage Internships",
    description: "Add and manage internship experiences",
    icon: Briefcase,
  },
  achievements: {
    title: "Department Achievements",
    description: "Add and manage department achievements",
    icon: Star,
  },
};

const DashboardHeader = ({ activeTab }: Props) => {
  const config = tabConfig[activeTab];
  const Icon = config.icon;

  return (
    <div className="flex items-start justify-between">
      <div className="flex items-start space-x-4">
        <div className="p-3 bg-gray-800/50 rounded-lg">
          <Icon className="h-6 w-6 text-primary-cyan" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">{config.title}</h1>
          <p className="text-gray-400 mt-1">{config.description}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
