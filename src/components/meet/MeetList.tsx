import React from 'react';
import MeetCard from './MeetCard';

const meetings = [
  {
    title: "Guest Lecture",
    date: "1 Feb, 2025",
    time: "2:00 PM",
    venue: "Online",
    description: "Deep dive in DSA & know how to prepare for internships.",
    image: "/guestlec.png",
    link: "#",
  },
  {
    title: "Guest Lecture",
    date: "1 Feb, 2025",
    time: "2:00 PM",
    venue: "Online",
    description: "Deep dive in DSA & know how to prepare for internships.",
    image: "/guestlec.png",
    link: "#",
  },
  {
    title: "Guest Lecture",
    date: "1 Feb, 2025",
    time: "2:00 PM",
    venue: "Online",
    description: "Deep dive in DSA & know how to prepare for internships.",
    image: "/guestlec.png",
    link: "#",
  },
];

const MeetList = () => {
  return (
    <section className="mb-20">
      <h2 className="text-3xl font-bold mb-10 text-center">Upcoming Meetings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {meetings.map((meeting, index) => (
          <MeetCard key={index} {...meeting} />
        ))}
      </div>
    </section>
  );
};

export default MeetList;