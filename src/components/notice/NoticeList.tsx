import React from 'react';
import { Bell, Calendar, ArrowRight } from 'lucide-react';

const notices = [
  {
    id: "1",
    title: "Important Competition Update",
    date: "March 10, 2024",
    category: "Competition",
    content: "The submission deadline for TechSpardha has been extended by 24 hours.",
    priority: "high",
  },
  {
    id: "2",
    title: "New Team Formation Guidelines",
    date: "March 10, 2024",
    category: "Teams",
    content: "Updated guidelines for team formation and registration process are now available.",
    priority: "medium",
  },
  {
    id: "3",
    title: "Platform Maintenance",
    date: "March 10, 2024",
    category: "System",
    content: "Scheduled maintenance window till March end.",
    priority: "low",
  },
];

const getPriorityStyles = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'bg-red-500/10 text-red-400 border-red-500/20';
    case 'medium':
      return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
    default:
      return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
  }
};

const NoticeList = () => {
  return (
    <section className="mb-20">
      <div className="max-w-4xl mx-auto space-y-6">
        {notices.map((notice) => (
          <div
            key={notice.id}
            className="bg-black/30 backdrop-blur-sm rounded-xl border border-gray-800 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <Bell className="text-cyan-400" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{notice.title}</h3>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {notice.date}
                    </span>
                  </div>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${getPriorityStyles(notice.priority)} border`}>
                {notice.priority.charAt(0).toUpperCase() + notice.priority.slice(1)}
              </span>
            </div>
            <p className="text-gray-400 mb-4">{notice.content}</p>
            <button className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
              Read More
              <ArrowRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NoticeList;