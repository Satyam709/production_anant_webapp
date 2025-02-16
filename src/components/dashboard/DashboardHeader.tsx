import React from 'react';
import { Trophy, Calendar, Users, Bell, BarChart3, UserPlus, Send } from 'lucide-react';

type Props = {
  activeTab: 'overview' | 'competitions' | 'events' | 'meetings' | 'notices' | 'teams' | 'shop';
};

const tabConfig = {
  overview: {
    title: 'Dashboard Overview',
    description: 'Monitor and manage all your activities from one place',
    icon: BarChart3,
  },
  competitions: {
    title: 'Manage Competitions',
    description: 'Create and manage coding competitions',
    icon: Trophy,
  },
  events: {
    title: 'Manage Events',
    description: 'Create and manage club events',
    icon: Calendar,
  },
  meetings: {
    title: 'Manage Meetings',
    description: 'Schedule and organize team meetings',
    icon: Users,
  },
  notices: {
    title: 'Manage Notices',
    description: 'Create and publish important announcements',
    icon: Bell,
  },
  teams: {
    title: 'Team Management',
    description: 'Create and manage your teams',
    icon: UserPlus,
  },
  shop : {
    title: 'Shop',
    description: 'Manage your shop',
    icon: Send,
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