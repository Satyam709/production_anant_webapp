'use client';
import React, { useState } from 'react';
import ProfileHeader from "@/components/profile/ProfileHeader"
import ProfileStats from "@/components/profile/ProfileStats"
import ProfileTabs from "@/components/profile/ProfileTabs"
import ProfileInfo from "@/components/profile/ProfileInfo"
import AchievementCard from './AchievementCard';
import { getUserInfoType } from '@/lib/actions/Profile';
const tabs = [
  { id: 'profile', label: 'Profile' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'competitions', label: 'Competitions' },
  { id: 'contributions', label: 'Contributions' },
];



const ProfileLayout =  ({userInfo}:{userInfo:getUserInfoType}) => {
  const [activeTab, setActiveTab] = useState('profile');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileInfo userInfo={userInfo}/>;
      case 'achievements':
        return (
          <div className="space-y-4 animate-fadeIn">
            <AchievementCard
              title="Coders Carnival Winner"
              description="First place Coders Carnival 2k24"
              date="March 15, 2024"
              points={500}
              type="gold"
            />
            <AchievementCard
              title="Algorithm Master"
              description="Completed advanced algorithm puzzle series"
              date="February 28, 2024"
              points={300}
              type="silver"
            />
            <AchievementCard
              title="Participation Award"
              description="Participated in all events at TechFest 2k24"
              date="January 10, 2024"
              points={200}
              type="bronze"
            />
          </div>
        );
      case 'competitions':
        return (
          <div className="text-center text-gray-400 py-12 animate-fadeIn">
            <h3 className="text-xl font-semibold mb-4">Coming Soon</h3>
            <p>Competition history will be displayed here</p>
          </div>
        );
        case 'contributions':
          return (
            <div className="text-center text-gray-400 py-12 animate-fadeIn">
              <h3 className="text-xl font-semibold mb-4">Coming Soon</h3>
              <p>All your contributions will be displayed here</p>
            </div>
          );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProfileHeader
          name={userInfo?.name || "Name"}
          email={`${userInfo?.roll_number}@nitkkr.ac.in`}
          location="NIT Kurukshetra"
          avatarUrl={userInfo?.imageURL || undefined}
        />
        <ProfileStats />
        <ProfileTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        <div className="transition-all duration-300 ease-in-out">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout