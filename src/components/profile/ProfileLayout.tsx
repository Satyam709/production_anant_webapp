'use client';
import React, { useCallback,useState } from 'react';

import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileInfo from '@/components/profile/ProfileInfo';
import ProfileStats from '@/components/profile/ProfileStats';
import ProfileTabs from '@/components/profile/ProfileTabs';
import { getUserInfoType } from '@/lib/actions/Profile';
import { UpdateProfileImage } from '@/lib/actions/Profile'; // Import the new server action

import AchievementCard from './AchievementCard';
import ActivityCard from './ActivityCard';

const tabs = [
  { id: 'profile', label: 'Profile' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'activities', label: 'Activities' },
];

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

const ProfileLayout = ({ userInfo }: { userInfo: getUserInfoType }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(
    userInfo?.imageURL || undefined
  ); // Local state for avatar URL
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleAvatarChange = useCallback(async (file: File) => {
    setUploadError(null); // Clear any previous errors
    try {
      // Call the server action to upload the image and update the URL in the database
      const newAvatarUrl = await UpdateProfileImage(file);
      if (newAvatarUrl) {
        // Update the avatarUrl state with the new URL returned from the server action
        setAvatarUrl(newAvatarUrl);
        console.log('Avatar uploaded and URL saved:', newAvatarUrl);
      } else {
        setUploadError(
          'Failed to save avatar. Avatar can only be set once or upload failed.'
        );
        console.error(
          'Failed to save avatar. Avatar can only be set once or upload failed.'
        );
      }
    } catch (error) {
      setUploadError('Error uploading avatar: ' + (error as any).message);
      console.error('Error uploading avatar:', error);
    }
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileInfo userInfo={userInfo} />;
      case 'achievements':
        return (
          <div className="space-y-4 animate-fadeIn">
            {userInfo?.first_prize_comp?.map((competition, index) => (
              <AchievementCard
                key={index}
                title={`1st Prize Winner Of ${competition.competitionName}`}
                description={`First prize in ${competition.competitionName} competition`}
                date={
                  competition?.conductedOn
                    ? formatDate(competition.conductedOn)
                    : 'Feb 29, 2024'
                }
                type="gold"
              />
            ))}
            {userInfo?.first_prize?.map((event, index) => (
              <AchievementCard
                key={index}
                title={`1st Prize Winner Of ${event.eventName}`}
                description={`First prize in ${event.eventName} event`}
                date={
                  event?.conductedOn
                    ? formatDate(event.conductedOn)
                    : 'Feb 29, 2024'
                }
                type="gold"
              />
            ))}
            {userInfo?.second_prize_comp?.map((competition, index) => (
              <AchievementCard
                key={index}
                title={`2nd Prize Winner Of ${competition.competitionName}`}
                description={`Second prize in ${competition.competitionName} competition`}
                date={
                  competition?.conductedOn
                    ? formatDate(competition.conductedOn)
                    : 'Feb 29, 2024'
                }
                type="silver"
              />
            ))}
            {userInfo?.second_prize?.map((event, index) => (
              <AchievementCard
                key={index}
                title={`2nd Prize Winner Of ${event.eventName}`}
                description={`Second prize in ${event.eventName} event`}
                date={
                  event?.conductedOn
                    ? formatDate(event.conductedOn)
                    : 'Feb 29, 2024'
                }
                type="silver"
              />
            ))}
            {userInfo?.third_prize_comp?.map((competition, index) => (
              <AchievementCard
                key={index}
                title={`3rd Prize Winner Of ${competition.competitionName}`}
                description={`Third prize in ${competition.competitionName} competition`}
                date={
                  competition?.conductedOn
                    ? formatDate(competition.conductedOn)
                    : 'Feb 29, 2024'
                }
                type="silver"
              />
            ))}
            {userInfo?.third_prize?.map((event, index) => (
              <AchievementCard
                key={index}
                title={`3rd Prize Winner Of ${event.eventName}`}
                description={`Third prize in ${event.eventName} event`}
                date={
                  event?.conductedOn
                    ? formatDate(event.conductedOn)
                    : 'Feb 29, 2024'
                }
                type="bronze"
              />
            ))}
          </div>
        );
      case 'activities':
        return (
          <div className="space-y-4 animate-fadeIn">
            {userInfo?.compititions_participated?.map((competition, index) => (
              <ActivityCard
                key={index}
                title={`Compitition Participated!`}
                description={`Participated in ${competition.competitionName} competition`}
                date={
                  competition?.conductedOn
                    ? formatDate(competition.conductedOn)
                    : 'Feb 29, 2024'
                }
              />
            ))}
            {userInfo?.events_participated?.map((event, index) => (
              <ActivityCard
                key={index}
                title={`Event Participated!`}
                description={`Participated in ${event.eventName} event`}
                date={
                  event?.conductedOn
                    ? formatDate(event.conductedOn)
                    : 'Feb 29, 2024'
                }
              />
            ))}
            {userInfo?.meetings_attended?.map((meet, index) => (
              <ActivityCard
                key={index}
                title={`Attended Meeting`}
                description={`Attended meeting with ID: ${meet.meeting_id}`}
                date={meet?.starts ? formatDate(meet.starts) : 'Feb 29, 2024'}
              />
            ))}
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
          name={userInfo?.name || 'Name'}
          email={`${userInfo?.roll_number}@nitkkr.ac.in`}
          location="NIT Kurukshetra"
          avatarUrl={avatarUrl}
          onAvatarChange={handleAvatarChange}
        />
        {uploadError && <div className="text-red-500 mt-2">{uploadError}</div>}
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

export default ProfileLayout;
