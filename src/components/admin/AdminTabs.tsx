import React, { useState } from 'react';
import NoticeForm from './forms/NoticeForm';
import MeetingForm from './forms/MeetForm';
import CompetitionForm from './forms/CompForm';

const tabs = [
  { id: 'notices', label: 'Notices' },
  { id: 'meetings', label: 'Meetings' },
  { id: 'competitions', label: 'Competitions' }
];

const AdminTabs = () => {
  const [activeTab, setActiveTab] = useState('notices');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'notices':
        return <NoticeForm />;
      case 'meetings':
        return <MeetingForm />;
      case 'competitions':
        return <CompetitionForm />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="border-b border-gray-800 mb-8">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors
                ${activeTab === tab.id
                  ? 'border-primary-cyan text-primary-cyan'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="transition-all duration-300 ease-in-out">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default AdminTabs;