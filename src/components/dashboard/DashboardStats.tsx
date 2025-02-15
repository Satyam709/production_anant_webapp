import React from 'react';
import { Trophy, Calendar, Users, Bell } from 'lucide-react';

// Mock data - replace with actual API calls later
const mockStats = {
  competitions: {
    total: 12,
    active: 5,
    trend: '+2 this month',
  },
  events: {
    total: 24,
    active: 8,
    trend: '+3 this month',
  },
  meetings: {
    total: 45,
    upcoming: 12,
    trend: '+8 this week',
  },
  notices: {
    total: 67,
    recent: 15,
    trend: '+5 today',
  },
};

const DashboardStats = () => {
  const stats = [
    {
      title: 'Competitions',
      icon: Trophy,
      total: mockStats.competitions.total,
      active: mockStats.competitions.active,
      trend: mockStats.competitions.trend,
      color: 'from-purple-500/20 to-purple-600/20',
      iconColor: 'text-purple-500',
    },
    {
      title: 'Events',
      icon: Calendar,
      total: mockStats.events.total,
      active: mockStats.events.active,
      trend: mockStats.events.trend,
      color: 'from-blue-500/20 to-blue-600/20',
      iconColor: 'text-blue-500',
    },
    {
      title: 'Meetings',
      icon: Users,
      total: mockStats.meetings.total,
      active: mockStats.meetings.upcoming,
      trend: mockStats.meetings.trend,
      color: 'from-green-500/20 to-green-600/20',
      iconColor: 'text-green-500',
    },
    {
      title: 'Notices',
      icon: Bell,
      total: mockStats.notices.total,
      active: mockStats.notices.recent,
      trend: mockStats.notices.trend,
      color: 'from-orange-500/20 to-orange-600/20',
      iconColor: 'text-orange-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="p-6 rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-gray-950"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
              <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
            </div>
            <span className="text-sm text-gray-400">{stat.trend}</span>
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-1">{stat.total}</h3>
          <p className="text-gray-400 text-sm">Total {stat.title}</p>
          
          <div className="mt-4 pt-4 border-t border-gray-800">
            <p className="text-sm">
              <span className="text-white font-medium">{stat.active}</span>
              <span className="text-gray-400">
                {' '}
                {stat.title === 'Meetings' ? 'Upcoming' : 
                  stat.title === 'Notices' ? 'Recent' : 'Active'}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;